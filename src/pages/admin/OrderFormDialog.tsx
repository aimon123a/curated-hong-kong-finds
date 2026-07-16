import { useEffect, useState } from "react";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mail } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import {
  supabase,
  OrderRow,
  ORDER_STATUSES,
  SHIPPING_METHODS,
  generateOrderNumber,
} from "@/integrations/supabase/client";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order: OrderRow | null;
  onSaved: () => void;
}

const schema = z.object({
  order_number: z.string().trim().min(1, "必填").max(50),
  customer_name: z.string().trim().min(1, "必填").max(100),
  phone: z.string().trim().min(1, "必填").max(30),
  email: z.string().trim().email("Email 格式不正確").max(255),
  ig_handle: z.string().trim().max(100).optional().or(z.literal("")),
  shipping_method: z.enum(["到宅配送", "順豐智能櫃"]),
  shipping_address: z.string().trim().min(1, "必填").max(300),
  products: z.string().trim().min(1, "必填").max(1000),
  amount: z.coerce.number().min(0, "不可為負數"),
  sf_tracking: z.string().trim().max(50).optional().or(z.literal("")),
  status: z.enum(["等待入貨", "已到港", "已發貨"]),
});

type FormState = z.input<typeof schema>;

const emptyForm = (): FormState => ({
  order_number: generateOrderNumber(),
  customer_name: "",
  phone: "",
  email: "",
  ig_handle: "",
  shipping_method: "順豐智能櫃",
  shipping_address: "",
  products: "",
  amount: 0 as unknown as number,
  sf_tracking: "",
  status: "等待入貨",
});

const OrderFormDialog = ({ open, onOpenChange, order, onSaved }: Props) => {
  const [form, setForm] = useState<FormState>(emptyForm());
  const [saving, setSaving] = useState(false);
  const isEdit = !!order;

  useEffect(() => {
    if (!open) return;
    if (order) {
      setForm({
        order_number: order.order_number,
        customer_name: order.customer_name,
        phone: order.phone,
        email: order.email,
        ig_handle: order.ig_handle ?? "",
        shipping_method: order.shipping_method,
        shipping_address: order.shipping_address,
        products: order.products,
        amount: order.amount,
        sf_tracking: order.sf_tracking ?? "",
        status: order.status,
      });
    } else {
      setForm(emptyForm());
    }
  }, [open, order]);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const first = parsed.error.errors[0];
      toast({
        title: "資料驗證失敗",
        description: `${first.path.join(".")}: ${first.message}`,
        variant: "destructive",
      });
      return;
    }
    if (parsed.data.status === "已發貨" && !parsed.data.sf_tracking) {
      toast({
        title: "無法儲存",
        description: "狀態為已發貨時，順豐單號必須填寫。",
        variant: "destructive",
      });
      return;
    }
    setSaving(true);
    const payload = {
      ...parsed.data,
      ig_handle: parsed.data.ig_handle || null,
      sf_tracking: parsed.data.sf_tracking || null,
    };

    const { error } = isEdit
      ? await supabase.from("orders").update(payload).eq("id", order!.id)
      : await supabase.from("orders").insert(payload);

    setSaving(false);
    if (error) {
      toast({ title: "儲存失敗", description: error.message, variant: "destructive" });
      return;
    }

    // Trigger emails
    const emailPayload = {
      to: payload.email,
      orderNumber: payload.order_number,
      customerName: payload.customer_name,
      amount: payload.amount,
      shippingAddress: payload.shipping_address,
      products: payload.products,
      sfTracking: payload.sf_tracking,
    };
    if (!isEdit) {
      supabase.functions
        .invoke("send-order-confirmation", { body: emailPayload })
        .catch((err) => console.error("Confirmation email failed:", err));
    } else {
      const becameShipped =
        payload.status === "已發貨" &&
        !!payload.sf_tracking &&
        (order!.status !== "已發貨" || (order!.sf_tracking ?? "") !== payload.sf_tracking);
      if (becameShipped) {
        supabase.functions
          .invoke("send-order-shipped", { body: emailPayload })
          .catch((err) => console.error("Shipped email failed:", err));
        toast({ title: "已寄出發貨通知電郵" });
      }
    }

    toast({ title: isEdit ? "訂單已更新" : "訂單已建立" });
    onSaved();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEdit ? "編輯訂單" : "新增訂單"}</DialogTitle>
          <DialogDescription>
            所有必填欄位務必填寫，特別是客戶電郵（將用於自動發信通知）。
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="order_number">訂單編號</Label>
              <Input
                id="order_number"
                value={form.order_number}
                onChange={(e) => update("order_number", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">訂單狀態</Label>
              <Select
                value={form.status}
                onValueChange={(v) => update("status", v as FormState["status"])}
              >
                <SelectTrigger id="status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {ORDER_STATUSES.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="customer_name">客戶姓名 *</Label>
              <Input
                id="customer_name"
                value={form.customer_name}
                onChange={(e) => update("customer_name", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">聯絡電話 *</Label>
              <Input
                id="phone"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                客戶電郵 *
                <span className="text-xs text-primary font-normal">
                  （必填 — 自動發信通知使用）
                </span>
              </Label>
              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                required
                placeholder="customer@example.com"
              />
              <p className="text-xs text-muted-foreground">
                此電郵地址未來將用於串接 Resend 自動發送訂單通知，請務必準確填寫。
              </p>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="ig_handle">IG / 備用聯絡帳號</Label>
              <Input
                id="ig_handle"
                value={form.ig_handle ?? ""}
                onChange={(e) => update("ig_handle", e.target.value)}
                placeholder="@customer_ig"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="shipping_method">送貨方式 *</Label>
              <Select
                value={form.shipping_method}
                onValueChange={(v) =>
                  update("shipping_method", v as FormState["shipping_method"])
                }
              >
                <SelectTrigger id="shipping_method">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SHIPPING_METHODS.map((m) => (
                    <SelectItem key={m} value={m}>
                      {m}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="sf_tracking">順豐單號</Label>
              <Input
                id="sf_tracking"
                value={form.sf_tracking ?? ""}
                onChange={(e) => update("sf_tracking", e.target.value)}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="shipping_address">
                送貨地址 / 智能櫃編號 *
              </Label>
              <Textarea
                id="shipping_address"
                value={form.shipping_address}
                onChange={(e) => update("shipping_address", e.target.value)}
                rows={2}
                required
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="products">購買商品 *</Label>
              <Textarea
                id="products"
                value={form.products}
                onChange={(e) => update("products", e.target.value)}
                rows={3}
                required
                placeholder="例：CLEAREX-Wi x1、背粒消 x1"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">訂單金額 (HKD) *</Label>
              <Input
                id="amount"
                type="number"
                min="0"
                step="0.01"
                value={form.amount}
                onChange={(e) => update("amount", e.target.value as unknown as number)}
                required
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={saving}
            >
              取消
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? "儲存中..." : isEdit ? "更新訂單" : "建立訂單"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default OrderFormDialog;
