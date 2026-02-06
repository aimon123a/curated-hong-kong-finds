import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { ChevronRight, Minus, Plus, Package, Truck, MapPin, CreditCard, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/contexts/CartContext";
import senakyuSprayImage from "@/assets/products/senakyu-spray.webp";
import clearexWi380mlRefillImage from "@/assets/products/clearex-wi-380ml-refill.jpg";

interface AddOnProduct {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
}

const Cart = () => {
  const navigate = useNavigate();
  const { items, addItem, removeItem, updateQuantity, createOrder, getSubtotal } = useCart();

  // Shipping method
  const [shippingMethod, setShippingMethod] = useState<"home" | "sf-locker">("home");
  
  // Payment method
  const [paymentMethod, setPaymentMethod] = useState<"fps" | "payme">("fps");
  
  // Shipping address form
  const [address, setAddress] = useState({
    name: "",
    phone: "",
    address: "",
    district: "",
    sfLockerCode: "",
  });

  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Add-on products
  const addOnProducts: AddOnProduct[] = [
    {
      id: "senakyu",
      name: "背粒消 噴霧",
      price: 89,
      imageUrl: senakyuSprayImage,
      description: "屈臣氏有售",
    },
    {
      id: "clearex-refill",
      name: "CLEAREX-Wi 補充裝 380ml",
      price: 180,
      imageUrl: clearexWi380mlRefillImage,
      description: "環保補充裝",
    },
  ];

  // Calculate totals
  const subtotal = getSubtotal();
  const shippingFee = shippingMethod === "home" ? 40 : 15;
  const total = subtotal + shippingFee;
  const totalWeight = items.reduce((sum, item) => sum + item.weight * item.quantity, 0);

  const addToCart = (product: AddOnProduct) => {
    addItem({
      id: product.id,
      name: product.name,
      brand: "",
      variant: "",
      price: product.price,
      quantity: 1,
      imageUrl: product.imageUrl,
      weight: 200,
    });
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!address.name.trim()) {
      newErrors.name = "請輸入收件人姓名";
    }

    if (!address.phone.trim()) {
      newErrors.phone = "請輸入聯絡電話";
    } else if (!/^[0-9]{8}$/.test(address.phone)) {
      newErrors.phone = "請輸入8位數香港電話號碼";
    }

    if (shippingMethod === "home") {
      if (!address.address.trim()) {
        newErrors.address = "請輸入送貨地址";
      }
      if (!address.district.trim()) {
        newErrors.district = "請選擇區域";
      }
    } else {
      if (!address.sfLockerCode.trim()) {
        newErrors.sfLockerCode = "請輸入順豐智能櫃編號";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      alert("購物車是空的");
      return;
    }

    if (validateForm()) {
      // Create order and navigate to checkout
      const order = createOrder({
        items: [...items],
        subtotal,
        shippingFee,
        total,
        shippingMethod,
        paymentMethod,
        address,
      });
      navigate("/checkout", { state: { order } });
    }
  };

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container-editorial py-20 text-center">
          <Package className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-4">購物車是空的</h1>
          <p className="text-muted-foreground mb-6">快去選購喜歡的商品吧！</p>
          <Link to="/products">
            <Button>瀏覽產品</Button>
          </Link>
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
            <span className="text-foreground font-medium">購物車</span>
          </nav>
        </div>
      </div>

      <div className="container-editorial py-8 md:py-12">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-8">購物車</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {/* Cart Items */}
            <div className="bg-card border border-border rounded-sm overflow-hidden">
              {items.map((item, index) => (
                <div
                  key={item.id}
                  className={`p-4 flex gap-4 ${index > 0 ? "border-t border-border" : ""}`}
                >
                  {/* Image */}
                  <div className="w-20 h-20 bg-muted rounded-sm overflow-hidden shrink-0">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-contain p-2"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-foreground text-sm line-clamp-2 mb-1">
                      {item.brand && <span className="text-muted-foreground">[{item.brand}] </span>}
                      {item.name}
                    </h3>
                    {item.variant && (
                      <p className="text-xs text-muted-foreground mb-2">{item.variant}</p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      商品總重量: {item.weight * item.quantity}g
                    </p>
                  </div>

                  {/* Price & Actions */}
                  <div className="text-right shrink-0">
                    <p className="font-bold text-foreground mb-2">
                      HKD {item.price}
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-muted-foreground hover:text-destructive transition-colors text-sm"
                      >
                        刪除
                      </button>
                    </div>
                    <div className="flex items-center gap-2 mt-3 justify-end">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-7 h-7 border border-border rounded-sm flex items-center justify-center hover:border-primary transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-7 h-7 border border-border rounded-sm flex items-center justify-center hover:border-primary transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Shipping Address */}
            <div className="bg-card border border-border rounded-sm p-6">
              <div className="flex items-center gap-2 mb-6">
                <MapPin className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-bold text-foreground">運送地址</h2>
              </div>

              {/* Shipping Method Selection */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <button
                  onClick={() => setShippingMethod("home")}
                  className={`p-4 border rounded-sm text-left transition-colors ${
                    shippingMethod === "home"
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Truck className="w-4 h-4" />
                    <span className="font-medium text-foreground">到宅配送</span>
                  </div>
                  <p className="text-sm text-muted-foreground">運費 HKD 40</p>
                </button>
                <button
                  onClick={() => setShippingMethod("sf-locker")}
                  className={`p-4 border rounded-sm text-left transition-colors ${
                    shippingMethod === "sf-locker"
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Package className="w-4 h-4" />
                    <span className="font-medium text-foreground">順豐智能櫃</span>
                  </div>
                  <p className="text-sm text-muted-foreground">運費 HKD 15</p>
                </button>
              </div>

              {/* Address Form */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">收件人姓名 *</Label>
                    <Input
                      id="name"
                      value={address.name}
                      onChange={(e) => setAddress({ ...address, name: e.target.value })}
                      placeholder="請輸入姓名"
                      className={errors.name ? "border-destructive" : ""}
                    />
                    {errors.name && (
                      <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="phone">聯絡電話 *</Label>
                    <Input
                      id="phone"
                      value={address.phone}
                      onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                      placeholder="請輸入8位數電話"
                      className={errors.phone ? "border-destructive" : ""}
                    />
                    {errors.phone && (
                      <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                {shippingMethod === "home" ? (
                  <>
                    <div>
                      <Label htmlFor="district">區域 *</Label>
                      <select
                        id="district"
                        value={address.district}
                        onChange={(e) => setAddress({ ...address, district: e.target.value })}
                        className={`flex h-10 w-full rounded-md border ${errors.district ? "border-destructive" : "border-input"} bg-background px-3 py-2 text-sm`}
                      >
                        <option value="">請選擇區域</option>
                        <optgroup label="香港島">
                          <option value="central">中西區</option>
                          <option value="eastern">東區</option>
                          <option value="southern">南區</option>
                          <option value="wanchai">灣仔區</option>
                        </optgroup>
                        <optgroup label="九龍">
                          <option value="kowloon-city">九龍城區</option>
                          <option value="kwun-tong">觀塘區</option>
                          <option value="ssp">深水埗區</option>
                          <option value="wong-tai-sin">黃大仙區</option>
                          <option value="ytm">油尖旺區</option>
                        </optgroup>
                        <optgroup label="新界">
                          <option value="islands">離島區</option>
                          <option value="kwai-tsing">葵青區</option>
                          <option value="north">北區</option>
                          <option value="sai-kung">西貢區</option>
                          <option value="sha-tin">沙田區</option>
                          <option value="tai-po">大埔區</option>
                          <option value="tsuen-wan">荃灣區</option>
                          <option value="tuen-mun">屯門區</option>
                          <option value="yuen-long">元朗區</option>
                        </optgroup>
                      </select>
                      {errors.district && (
                        <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.district}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="address">詳細地址 *</Label>
                      <Input
                        id="address"
                        value={address.address}
                        onChange={(e) => setAddress({ ...address, address: e.target.value })}
                        placeholder="請輸入詳細地址（包括大廈名稱、單位等）"
                        className={errors.address ? "border-destructive" : ""}
                      />
                      {errors.address && (
                        <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.address}
                        </p>
                      )}
                    </div>
                  </>
                ) : (
                  <div>
                    <Label htmlFor="sfLockerCode">順豐智能櫃編號 *</Label>
                    <Input
                      id="sfLockerCode"
                      value={address.sfLockerCode}
                      onChange={(e) => setAddress({ ...address, sfLockerCode: e.target.value })}
                      placeholder="例如：H852M001"
                      className={errors.sfLockerCode ? "border-destructive" : ""}
                    />
                    {errors.sfLockerCode && (
                      <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.sfLockerCode}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground mt-2">
                      <a 
                        href="https://www.sf-express.com/hk/tc/dynamic_function/S.F.Network/SF_Locker/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        查找順豐智能櫃位置 →
                      </a>
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Add-on Products */}
            <div className="bg-card border border-border rounded-sm p-6">
              <h2 className="text-lg font-bold text-foreground mb-4">
                加購此區商品「運費不變」
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {addOnProducts.map((product) => (
                  <div
                    key={product.id}
                    className="border border-border rounded-sm p-3 hover:border-primary/50 transition-colors"
                  >
                    <div className="aspect-square bg-muted rounded-sm overflow-hidden mb-2">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-contain p-2"
                      />
                    </div>
                    <h3 className="text-xs font-medium text-foreground line-clamp-2 mb-1">
                      {product.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-2">{product.description}</p>
                    <p className="text-sm font-bold text-primary mb-2">
                      HKD {product.price}
                    </p>
                    <button
                      onClick={() => addToCart(product)}
                      className="w-full text-xs text-primary border border-primary rounded-sm py-1 hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      加入購物車
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-sm p-6 sticky top-24">
              {/* Summary */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">商品小計</span>
                  <span className="text-foreground">HKD {subtotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">運費</span>
                  <span className="text-foreground">HKD {shippingFee}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">出貨重量</span>
                  <span className="text-foreground">{totalWeight}g</span>
                </div>
                <div className="border-t border-border pt-3">
                  <div className="flex justify-between">
                    <span className="font-bold text-foreground">合計</span>
                    <span className="font-bold text-xl text-primary">HKD {total}</span>
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <CreditCard className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">付款方式</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setPaymentMethod("fps")}
                    className={`p-3 border rounded-sm text-center transition-colors ${
                      paymentMethod === "fps"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <span className="text-sm font-medium text-foreground">FPS 轉數快</span>
                  </button>
                  <button
                    onClick={() => setPaymentMethod("payme")}
                    className={`p-3 border rounded-sm text-center transition-colors ${
                      paymentMethod === "payme"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <span className="text-sm font-medium text-foreground">PayMe</span>
                  </button>
                </div>
              </div>

              {/* Checkout Button */}
              <Button 
                className="w-full" 
                size="lg"
                onClick={handleCheckout}
              >
                前往結帳
              </Button>

              {/* Shipping Info */}
              <div className="mt-6 pt-6 border-t border-border">
                <h4 className="text-sm font-medium text-foreground mb-2">運費估算</h4>
                <p className="text-xs text-muted-foreground mb-1">
                  收件國/地區: 香港
                </p>
                <p className="text-xs text-muted-foreground">
                  關於備貨：普通商品備貨時間約為3-7天。發貨後，郵寄到香港的收貨地址約需3到6天。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
