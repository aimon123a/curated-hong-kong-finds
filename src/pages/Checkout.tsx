import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { ChevronRight, Check, Copy, Instagram, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart, Order } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import paymeQR from "@/assets/payment/payme-qr.jpg";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  // Get order from location state
  const order = location.state?.order as Order | undefined;

  if (!order) {
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
    navigator.clipboard.writeText(order.orderNumber);
    setCopied(true);
    toast({
      title: "已複製",
      description: "訂單編號已複製到剪貼板",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConfirmPayment = () => {
    clearCart();
    toast({
      title: "感謝您的訂購！",
      description: "我們會盡快處理您的訂單",
    });
    navigate("/");
  };

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
            <span className="text-foreground font-medium">結帳</span>
          </nav>
        </div>
      </div>

      <div className="container-editorial py-8 md:py-12">
        <div className="max-w-2xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              訂單已建立
            </h1>
            <p className="text-muted-foreground">
              請按照以下指示完成付款
            </p>
          </div>

          {/* Order Number Box */}
          <div className="bg-card border border-border rounded-sm p-6 mb-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">訂單編號（付款時請備註）</p>
              <div className="flex items-center justify-center gap-3">
                <span className="text-2xl font-bold text-primary tracking-wider">
                  {order.orderNumber}
                </span>
                <button
                  onClick={copyOrderNumber}
                  className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                  title="複製訂單編號"
                >
                  {copied ? (
                    <Check className="w-5 h-5 text-primary" />
                  ) : (
                    <Copy className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Payment Instructions */}
          <div className="bg-card border border-border rounded-sm p-6 mb-6">
            <h2 className="text-lg font-bold text-foreground mb-4">付款方式</h2>

            {order.paymentMethod === "fps" ? (
              <div className="space-y-4">
                <div className="bg-muted/50 rounded-sm p-4">
                  <h3 className="font-medium text-foreground mb-3">FPS 轉數快</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">電話號碼：</span>
                      <span className="font-medium text-foreground">9888 9808</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">收款人：</span>
                      <span className="font-medium text-foreground">Axxxx Wong</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">付款金額：</span>
                      <span className="font-bold text-primary">HKD {order.total}</span>
                    </div>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground space-y-2">
                  <p className="font-medium text-amber-700 bg-amber-50 border border-amber-200 rounded-sm px-3 py-2">
                    ⚠️ 請在付款時備註訂單編號：<span className="font-bold text-foreground">{order.orderNumber}</span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    付款完成後，請將截圖發送
                    <a
                      href="https://www.instagram.com/jaag_select"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-primary font-medium hover:underline"
                    >
                      <Instagram className="w-4 h-4" />
                      @jaag_select
                    </a>
                    以確認您的訂單。
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-muted/50 rounded-sm p-4">
                  <h3 className="font-medium text-foreground mb-3">PayMe</h3>
                  <div className="flex flex-col items-center">
                    <img
                      src={paymeQR}
                      alt="PayMe QR Code"
                      className="w-48 h-48 rounded-sm mb-4 border border-border"
                    />
                    <div className="text-center text-sm">
                      <p className="text-muted-foreground mb-1">付款金額：</p>
                      <p className="font-bold text-primary text-xl">HKD {order.total}</p>
                    </div>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground space-y-2">
                  <p className="font-medium text-amber-700 bg-amber-50 border border-amber-200 rounded-sm px-3 py-2">
                    ⚠️ 請在付款時備註訂單編號：<span className="font-bold text-foreground">{order.orderNumber}</span>
                  </p>
                  <p>掃描 QR Code 後，請輸入正確金額並完成付款。</p>
                  <p className="flex items-center gap-1.5">
                    付款完成後，請將截圖發送
                    <a
                      href="https://www.instagram.com/jaag_select"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-primary font-medium hover:underline"
                    >
                      <Instagram className="w-4 h-4" />
                      @jaag_select
                    </a>
                    以確認您的訂單。
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="bg-card border border-border rounded-sm p-6 mb-6">
            <h2 className="text-lg font-bold text-foreground mb-4">訂單摘要</h2>
            <div className="space-y-3">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-12 h-12 object-contain bg-muted rounded-sm"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground line-clamp-1">
                      {item.name}
                    </p>
                    {item.variant && (
                      <p className="text-xs text-muted-foreground">{item.variant}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">
                      HKD {item.price} × {item.quantity}
                    </p>
                  </div>
                </div>
              ))}
              <div className="border-t border-border pt-3 mt-3 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">商品小計</span>
                  <span>HKD {order.subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">運費</span>
                  <span>HKD {order.shippingFee}</span>
                </div>
                <div className="flex justify-between font-bold text-base pt-2 border-t border-border">
                  <span>合計</span>
                  <span className="text-primary">HKD {order.total}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Shipping Info */}
          <div className="bg-card border border-border rounded-sm p-6 mb-6">
            <h2 className="text-lg font-bold text-foreground mb-4">配送資訊</h2>
            <div className="text-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">收件人：</span>
                <span className="text-foreground">{order.address.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">電話：</span>
                <span className="text-foreground">{order.address.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">運送方式：</span>
                <span className="text-foreground">
                  {order.shippingMethod === "home" ? "到宅配送" : "順豐智能櫃"}
                </span>
              </div>
              {order.shippingMethod === "home" ? (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">地址：</span>
                  <span className="text-foreground text-right">{order.address.address}</span>
                </div>
              ) : (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">智能櫃編號：</span>
                  <span className="text-foreground">{order.address.sfLockerCode}</span>
                </div>
              )}
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-muted/50 border border-border rounded-sm p-6 mb-6">
            <h2 className="text-base font-medium text-foreground mb-3">如需更多資訊，歡迎查詢</h2>
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

          {/* Confirm Button */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => navigate("/cart")}
            >
              返回購物車
            </Button>
            <Button
              className="flex-1"
              onClick={handleConfirmPayment}
            >
              我已完成付款
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
