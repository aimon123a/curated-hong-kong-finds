import { useEffect, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { ChevronRight, Check, Copy, Instagram, XCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart, Order } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { supabase, OrderRow } from "@/integrations/supabase/client";

const Checkout = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { clearCart } = useCart();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const statusParam = searchParams.get("status"); // 'success' | 'cancelled'
  const orderNumberParam = searchParams.get("order");

  const [dbOrder, setDbOrder] = useState<OrderRow | null>(null);
  const [fetchingOrder, setFetchingOrder] = useState(false);

  useDocumentMeta({
    title:
      statusParam === "success"
        ? "付款成功 - 訂單確認"
        : statusParam === "cancelled"
        ? "付款已取消"
        : "訂單確認",
    description: "訂單確認頁面：透過 Stripe 安全付款完成訂單。",
    canonical: "/checkout",
  });

  const localOrder = location.state?.order as Order | undefined;

  // Fetch DB order when returning from Stripe
  useEffect(() => {
    if (!orderNumberParam) return;
    setFetchingOrder(true);
    supabase
      .from("orders")
      .select("*")
      .eq("order_number", orderNumberParam)
      .maybeSingle()
      .then(({ data }) => {
        setDbOrder((data as OrderRow) ?? null);
        setFetchingOrder(false);
      });
  }, [orderNumberParam]);

  // Clear cart on successful return
  useEffect(() => {
    if (statusParam === "success") {
      clearCart();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusParam]);

  const displayOrderNumber =
    orderNumberParam || localOrder?.orderNumber || dbOrder?.order_number || "";
  const displayAmount =
    dbOrder?.amount != null
      ? Number(dbOrder.amount)
      : localOrder?.total ?? null;
  const displayEmail = dbOrder?.email || "";
  const displayProducts = dbOrder?.products || "";
  const displayShipping = dbOrder?.shipping_address || "";

  // No context at all
  if (!statusParam && !localOrder) {
    return (
      <Layout>
        <div className="container-editorial py-20 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">找不到訂單</h1>
          <p className="text-muted-foreground mb-6">請先完成購物車結帳流程</p>
          <Link to="/cart">
            <Button>返回購物車</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const copyOrderNumber = () => {
    if (!displayOrderNumber) return;
    navigator.clipboard.writeText(displayOrderNumber);
    setCopied(true);
    toast({ title: "已複製", description: "訂單編號已複製到剪貼板" });
    setTimeout(() => setCopied(false), 2000);
  };

  const isCancelled = statusParam === "cancelled";
  const isSuccess = statusParam === "success";

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="sticky top-16 z-40 bg-muted/95 backdrop-blur-sm border-b border-border">
        <div className="container-editorial py-3">
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
              首頁
            </Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <Link to="/cart" className="text-muted-foreground hover:text-foreground transition-colors">
              購物車
            </Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <span className="text-foreground font-medium">
              {isSuccess ? "付款成功" : isCancelled ? "付款取消" : "結帳"}
            </span>
          </nav>
        </div>
      </div>

      <div className="container-editorial py-8 md:py-12">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                isCancelled ? "bg-destructive/10" : "bg-primary/10"
              }`}
            >
              {fetchingOrder ? (
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
              ) : isCancelled ? (
                <XCircle className="w-8 h-8 text-destructive" />
              ) : (
                <Check className="w-8 h-8 text-primary" />
              )}
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              {isSuccess
                ? "付款成功，感謝您的訂購！"
                : isCancelled
                ? "付款已取消"
                : "訂單已建立"}
            </h1>
            <p className="text-muted-foreground">
              {isSuccess
                ? "我們會盡快處理您的訂單，並以電郵通知您最新狀態。"
                : isCancelled
                ? "您的訂單已保留，可隨時重新完成付款。"
                : "請完成 Stripe 付款以確認訂單"}
            </p>
          </div>

          {/* Order Number */}
          {displayOrderNumber && (
            <div className="bg-card border border-border rounded-sm p-6 mb-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">訂單編號</p>
                <div className="flex items-center justify-center gap-3">
                  <span className="text-2xl font-bold text-primary tracking-wider">
                    {displayOrderNumber}
                  </span>
                  <button
                    onClick={copyOrderNumber}
                    className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                    title="複製訂單編號"
                    aria-label="複製訂單編號"
                  >
                    {copied ? (
                      <Check className="w-5 h-5 text-primary" />
                    ) : (
                      <Copy className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {displayAmount != null && (
                  <p className="mt-3 text-sm text-muted-foreground">
                    金額：<span className="font-bold text-foreground">HKD {displayAmount}</span>
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Cancelled — CTA to retry */}
          {isCancelled && (
            <div className="bg-amber-50 border border-amber-200 rounded-sm p-6 mb-6 text-sm text-amber-900">
              <p className="font-medium mb-2">如需重新付款：</p>
              <p>請聯絡我們，我們會為您產生新的 Stripe 付款連結。</p>
            </div>
          )}

          {/* Order details from DB */}
          {(displayProducts || displayShipping || displayEmail) && (
            <div className="bg-card border border-border rounded-sm p-6 mb-6">
              <h2 className="text-lg font-bold text-foreground mb-4">訂單資訊</h2>
              <div className="space-y-2 text-sm">
                {displayEmail && (
                  <div className="flex justify-between gap-4">
                    <span className="text-muted-foreground shrink-0">通知電郵：</span>
                    <span className="text-foreground text-right break-all">{displayEmail}</span>
                  </div>
                )}
                {displayProducts && (
                  <div className="flex justify-between gap-4">
                    <span className="text-muted-foreground shrink-0">商品：</span>
                    <span className="text-foreground text-right">{displayProducts}</span>
                  </div>
                )}
                {displayShipping && (
                  <div className="flex justify-between gap-4">
                    <span className="text-muted-foreground shrink-0">送貨：</span>
                    <span className="text-foreground text-right">{displayShipping}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Contact */}
          <div className="bg-muted/50 border border-border rounded-sm p-6 mb-6">
            <h2 className="text-base font-medium text-foreground mb-3">如需查詢，歡迎聯絡</h2>
            <a
              href="https://www.instagram.com/jaag_select"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:underline"
            >
              <Instagram className="w-5 h-5" />
              <span>@jaag_select</span>
            </a>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/" className="flex-1">
              <Button variant="outline" className="w-full">
                返回首頁
              </Button>
            </Link>
            <Link to="/products" className="flex-1">
              <Button className="w-full">繼續選購</Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
