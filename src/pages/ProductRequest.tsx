import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { ChevronRight, Send, Check, Package, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const ProductRequest = () => {
  const [formData, setFormData] = useState({
    productName: "",
    productUrl: "",
    reason: "",
    email: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.productName.trim()) {
      newErrors.productName = "請輸入商品名稱";
    }

    if (!formData.email.trim()) {
      newErrors.email = "請輸入電郵地址";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "請輸入有效的電郵地址";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Submit form (in real app, would send to backend)
      console.log("Product request submitted:", formData);
      setIsSubmitted(true);
    }
  };

  if (isSubmitted) {
    return (
      <Layout>
        <div className="container-editorial py-20 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-4">
              申請已提交！
            </h1>
            <p className="text-muted-foreground mb-6">
              感謝您的商品推薦！我們會認真考慮您的建議，如有進一步消息會透過電郵通知您。
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/products">
                <Button variant="outline">瀏覽產品</Button>
              </Link>
              <Link to="/">
                <Button>返回首頁</Button>
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

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
            <Link to="/products" className="text-muted-foreground hover:text-foreground transition-colors">
              產品
            </Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <span className="text-foreground font-medium">商品上架申請</span>
          </nav>
        </div>
      </div>

      <div className="container-editorial py-12">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Package className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              有想要的商品？可以申請上架哦！
            </h1>
            <p className="text-muted-foreground">
              找不到想要的日本商品？告訴我們，我們會盡力為您引入！
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-card border border-border rounded-sm p-6 md:p-8">
            <div className="space-y-6">
              {/* Product Name */}
              <div>
                <Label htmlFor="productName" className="text-foreground">
                  商品名稱 <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="productName"
                  value={formData.productName}
                  onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                  placeholder="例如：DHC 維他命C補充劑"
                  className={errors.productName ? "border-destructive" : ""}
                />
                {errors.productName && (
                  <p className="text-xs text-destructive mt-1">{errors.productName}</p>
                )}
              </div>

              {/* Product URL */}
              <div>
                <Label htmlFor="productUrl" className="text-foreground">
                  商品連結（可選）
                </Label>
                <div className="relative">
                  <Input
                    id="productUrl"
                    value={formData.productUrl}
                    onChange={(e) => setFormData({ ...formData, productUrl: e.target.value })}
                    placeholder="https://www.amazon.co.jp/..."
                    className="pr-10"
                  />
                  <ExternalLink className="w-4 h-4 text-muted-foreground absolute right-3 top-1/2 -translate-y-1/2" />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  請提供日本購物網站的商品連結（如 Amazon Japan、樂天市場等）
                </p>
              </div>

              {/* Reason */}
              <div>
                <Label htmlFor="reason" className="text-foreground">
                  推薦原因（可選）
                </Label>
                <Textarea
                  id="reason"
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  placeholder="告訴我們為什麼您想要這款商品..."
                  rows={4}
                />
              </div>

              {/* Email */}
              <div>
                <Label htmlFor="email" className="text-foreground">
                  電郵地址 <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your@email.com"
                  className={errors.email ? "border-destructive" : ""}
                />
                {errors.email && (
                  <p className="text-xs text-destructive mt-1">{errors.email}</p>
                )}
                <p className="text-xs text-muted-foreground mt-1">
                  當商品上架時，我們會透過電郵通知您
                </p>
              </div>

              {/* Submit */}
              <Button type="submit" className="w-full" size="lg">
                <Send className="w-4 h-4 mr-2" />
                提交申請
              </Button>
            </div>
          </form>

          {/* FAQ */}
          <div className="mt-12">
            <h2 className="text-lg font-bold text-foreground mb-4">常見問題</h2>
            <div className="space-y-4">
              <div className="bg-muted/50 rounded-sm p-4">
                <h3 className="font-medium text-foreground mb-2">申請後多久會有回覆？</h3>
                <p className="text-sm text-muted-foreground">
                  我們會在 3-5 個工作天內審核您的申請，並透過電郵通知結果。
                </p>
              </div>
              <div className="bg-muted/50 rounded-sm p-4">
                <h3 className="font-medium text-foreground mb-2">所有商品都可以申請嗎？</h3>
                <p className="text-sm text-muted-foreground">
                  我們主要引入日本護膚、健康、家居類商品。部分受限商品（如處方藥品、酒精飲品）無法引入。
                </p>
              </div>
              <div className="bg-muted/50 rounded-sm p-4">
                <h3 className="font-medium text-foreground mb-2">上架後會有優惠嗎？</h3>
                <p className="text-sm text-muted-foreground">
                  作為感謝，成功推薦商品的顧客可享有該商品首單 9 折優惠！
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductRequest;
