import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Plus, Pencil, Trash2, LogOut, Search, RefreshCw, Mail, Check, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";
import {
  supabase,
  OrderRow,
  ORDER_STATUSES,
  OrderStatus,
} from "@/integrations/supabase/client";
import OrderFormDialog from "./OrderFormDialog";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

const statusVariant: Record<OrderStatus, string> = {
  等待入貨: "bg-amber-100 text-amber-900 border-amber-200",
  已到港: "bg-blue-100 text-blue-900 border-blue-200",
  已發貨: "bg-emerald-100 text-emerald-900 border-emerald-200",
};

const AdminDashboard = () => {
  useDocumentMeta({
    title: "訂單管理 | jaagSELECT CRM",
    description: "jaagSELECT 內部訂單與客戶管理後台。",
  });

  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState<string>("");
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | OrderStatus>("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<OrderRow | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<OrderRow | null>(null);
  const [trackingEdits, setTrackingEdits] = useState<Record<string, string>>({});
  const [savingTracking, setSavingTracking] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        navigate("/admin/login", { replace: true });
        return;
      }
      setUserEmail(data.user.email ?? "");
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_evt, session) => {
      if (!session) navigate("/admin/login", { replace: true });
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });
    setLoading(false);
    if (error) {
      toast({ title: "載入失敗", description: error.message, variant: "destructive" });
      return;
    }
    setOrders((data ?? []) as OrderRow[]);
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return orders.filter((o) => {
      if (statusFilter !== "all" && o.status !== statusFilter) return false;
      if (!q) return true;
      return (
        o.order_number.toLowerCase().includes(q) ||
        o.customer_name.toLowerCase().includes(q) ||
        o.phone.toLowerCase().includes(q) ||
        o.email.toLowerCase().includes(q) ||
        o.products.toLowerCase().includes(q) ||
        (o.sf_tracking ?? "").toLowerCase().includes(q)
      );
    });
  }, [orders, search, statusFilter]);

  const stats = useMemo(() => {
    const by: Record<OrderStatus, number> = {
      等待入貨: 0,
      已到港: 0,
      已發貨: 0,
    };
    orders.forEach((o) => (by[o.status] = (by[o.status] ?? 0) + 1));
    return by;
  }, [orders]);

  const handleQuickStatus = async (row: OrderRow, status: OrderStatus) => {
    if (status === "已發貨" && !row.sf_tracking) {
      toast({
        title: "無法更改狀態",
        description: "請先填入順豐單號，才可將狀態設為已發貨。",
        variant: "destructive",
      });
      return;
    }

    const { error } = await supabase.from("orders").update({ status }).eq("id", row.id);
    if (error) {
      toast({ title: "更新失敗", description: error.message, variant: "destructive" });
      return;
    }
    setOrders((prev) => prev.map((o) => (o.id === row.id ? { ...o, status } : o)));

    // Send shipped email if newly shipped
    if (status === "已發貨" && row.status !== "已發貨" && row.sf_tracking) {
      supabase.functions
        .invoke("send-order-shipped", {
          body: {
            to: row.email,
            orderId: row.id,
            orderNumber: row.order_number,
            customerName: row.customer_name,
            amount: row.amount,
            shippingAddress: row.shipping_address,
            products: row.products,
            sfTracking: row.sf_tracking,
          },
        })
        .then(() => {
          toast({ title: "已寄出發貨通知電郵" });
          fetchOrders();
        })
        .catch((err) => console.error("Shipped email failed:", err));
    }
  };

  const handleSaveTracking = async (row: OrderRow) => {
    const value = (trackingEdits[row.id] ?? "").trim();
    if (value === (row.sf_tracking ?? "")) {
      setTrackingEdits((prev) => {
        const next = { ...prev };
        delete next[row.id];
        return next;
      });
      return;
    }
    setSavingTracking(row.id);
    const { error } = await supabase
      .from("orders")
      .update({ sf_tracking: value || null })
      .eq("id", row.id);
    setSavingTracking(null);
    if (error) {
      toast({ title: "更新失敗", description: error.message, variant: "destructive" });
      return;
    }
    setOrders((prev) =>
      prev.map((o) => (o.id === row.id ? { ...o, sf_tracking: value || null } : o))
    );
    setTrackingEdits((prev) => {
      const next = { ...prev };
      delete next[row.id];
      return next;
    });
    toast({ title: "順豐單號已更新" });
  };

  const handleResend = async (row: OrderRow, kind: "confirmation" | "shipped") => {
    if (kind === "shipped" && !row.sf_tracking) {
      toast({
        title: "無法寄送",
        description: "請先填入順豐單號。",
        variant: "destructive",
      });
      return;
    }
    const fn = kind === "confirmation" ? "send-order-confirmation" : "send-order-shipped";
    const { error } = await supabase.functions.invoke(fn, {
      body: {
        to: row.email,
        orderId: row.id,
        orderNumber: row.order_number,
        customerName: row.customer_name,
        amount: row.amount,
        shippingAddress: row.shipping_address,
        products: row.products,
        sfTracking: row.sf_tracking,
      },
    });
    if (error) {
      toast({ title: "寄送失敗", description: error.message, variant: "destructive" });
      fetchOrders();
      return;
    }
    toast({
      title: kind === "confirmation" ? "已重新寄出下單確認電郵" : "已重新寄出發貨通知電郵",
      description: row.email,
    });
    fetchOrders();
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    const { error } = await supabase.from("orders").delete().eq("id", deleteTarget.id);
    if (error) {
      toast({ title: "刪除失敗", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "訂單已刪除" });
      setOrders((prev) => prev.filter((o) => o.id !== deleteTarget.id));
    }
    setDeleteTarget(null);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold tracking-tight">
              jaag<span className="text-primary">SELECT</span>
              <span className="ml-2 text-sm font-normal text-muted-foreground">
                訂單管理系統
              </span>
            </h1>
            <p className="text-xs text-muted-foreground">{userEmail}</p>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-1.5" />
            登出
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <StatCard label="訂單總數" value={orders.length} tone="neutral" />
          <StatCard label="等待入貨" value={stats["等待入貨"]} tone="amber" />
          <StatCard label="已到港" value={stats["已到港"]} tone="blue" />
          <StatCard label="已發貨" value={stats["已發貨"]} tone="emerald" />
        </div>

        {/* Toolbar */}
        <div className="flex flex-col md:flex-row md:items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="搜尋訂單編號、客戶、電話、Email、順豐單號..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as any)}>
            <SelectTrigger className="w-full md:w-[160px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部狀態</SelectItem>
              {ORDER_STATUSES.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={fetchOrders} disabled={loading}>
            <RefreshCw className={`w-4 h-4 mr-1.5 ${loading ? "animate-spin" : ""}`} />
            重新整理
          </Button>
          <Button
            onClick={() => {
              setEditing(null);
              setDialogOpen(true);
            }}
          >
            <Plus className="w-4 h-4 mr-1.5" />
            新增訂單
          </Button>
        </div>

        {/* Table */}
        <div className="border border-border rounded-lg bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>訂單編號</TableHead>
                  <TableHead>客戶</TableHead>
                  <TableHead>聯絡方式</TableHead>
                  <TableHead>商品</TableHead>
                  <TableHead className="text-right">金額</TableHead>
                  <TableHead>送貨</TableHead>
                  <TableHead>順豐單號</TableHead>
                  <TableHead>狀態</TableHead>
                  <TableHead>寄信</TableHead>
                  <TableHead className="text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={10} className="text-center py-10 text-muted-foreground">
                      載入中...
                    </TableCell>
                  </TableRow>
                ) : filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-10 text-muted-foreground">
                      {orders.length === 0
                        ? "還沒有訂單，點選右上「新增訂單」開始。"
                        : "沒有符合條件的訂單。"}
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((o) => (
                    <TableRow key={o.id}>
                      <TableCell className="font-mono text-xs">{o.order_number}</TableCell>
                      <TableCell>
                        <div className="font-medium">{o.customer_name}</div>
                        <div className="text-xs text-muted-foreground">{o.phone}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-xs">{o.email}</div>
                        {o.ig_handle && (
                          <div className="text-xs text-muted-foreground">{o.ig_handle}</div>
                        )}
                      </TableCell>
                      <TableCell className="max-w-[220px]">
                        <div className="text-xs line-clamp-2">{o.products}</div>
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        HKD {Number(o.amount).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <div className="text-xs">{o.shipping_method}</div>
                        <div className="text-xs text-muted-foreground line-clamp-1">
                          {o.shipping_address}
                        </div>
                      </TableCell>
                      <TableCell>
                        {(() => {
                          const editingVal = trackingEdits[o.id];
                          const isDirty = editingVal !== undefined && editingVal !== (o.sf_tracking ?? "");
                          return (
                            <div className="flex items-center gap-1">
                              <Input
                                value={editingVal ?? o.sf_tracking ?? ""}
                                onChange={(e) =>
                                  setTrackingEdits((prev) => ({ ...prev, [o.id]: e.target.value }))
                                }
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    e.preventDefault();
                                    handleSaveTracking(o);
                                  }
                                }}
                                placeholder="—"
                                className="h-8 w-[130px] text-xs font-mono"
                              />
                              {isDirty && (
                                <>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0"
                                    disabled={savingTracking === o.id}
                                    onClick={() => handleSaveTracking(o)}
                                    aria-label="儲存順豐單號"
                                  >
                                    <Check className="w-4 h-4 text-emerald-600" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0"
                                    onClick={() =>
                                      setTrackingEdits((prev) => {
                                        const next = { ...prev };
                                        delete next[o.id];
                                        return next;
                                      })
                                    }
                                    aria-label="取消"
                                  >
                                    <X className="w-4 h-4 text-muted-foreground" />
                                  </Button>
                                </>
                              )}
                            </div>
                          );
                        })()}
                      </TableCell>
                      <TableCell>
                        <Select
                          value={o.status}
                          onValueChange={(v) => handleQuickStatus(o, v as OrderStatus)}
                        >
                          <SelectTrigger
                            className={`h-8 w-[110px] text-xs border ${statusVariant[o.status]}`}
                          >
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
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                aria-label="重新寄出電郵"
                                title="重新寄出電郵"
                              >
                                <Mail className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleResend(o, "confirmation")}>
                                重新寄出下單確認
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleResend(o, "shipped")}
                                disabled={!o.sf_tracking}
                              >
                                重新寄出發貨通知
                                {!o.sf_tracking && (
                                  <span className="ml-2 text-xs text-muted-foreground">
                                    （需順豐單號）
                                  </span>
                                )}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setEditing(o);
                              setDialogOpen(true);
                            }}
                            aria-label="編輯訂單"
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setDeleteTarget(o)}
                            aria-label="刪除訂單"
                          >
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>

      <OrderFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        order={editing}
        onSaved={fetchOrders}
      />

      <AlertDialog open={!!deleteTarget} onOpenChange={(o) => !o && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>確定要刪除此訂單？</AlertDialogTitle>
            <AlertDialogDescription>
              訂單 {deleteTarget?.order_number}（{deleteTarget?.customer_name}）將被永久刪除，無法復原。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>刪除</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

const StatCard = ({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: "neutral" | "amber" | "blue" | "emerald";
}) => {
  const toneClass = {
    neutral: "text-foreground",
    amber: "text-amber-700",
    blue: "text-blue-700",
    emerald: "text-emerald-700",
  }[tone];
  return (
    <div className="border border-border bg-card rounded-lg px-4 py-3">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className={`text-2xl font-bold tracking-tight ${toneClass}`}>{value}</p>
    </div>
  );
};

export default AdminDashboard;
