import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { ChevronRight, Minus, Plus, Package, Truck, MapPin, CreditCard, AlertCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/contexts/CartContext";
import senakyuSprayImage from "@/assets/products/senakyu-spray.webp";
import clearexWi380mlRefillImage from "@/assets/products/clearex-wi-380ml-refill.jpg";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { supabase, generateOrderNumber, ShippingMethod } from "@/integrations/supabase/client";

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

  useDocumentMeta({
    title: "購物車 - 確認訂單",
    description: "查看購物車內商品、選擇順豐到付或智能櫃配送、透過 Stripe 安全付款。滿 HKD 500 免運費。",
    canonical: "/cart",
  });

  // Shipping method
  const [shippingMethod, setShippingMethod] = useState<"home" | "sf-locker">("home");
  
  // Shipping address form
  const [address, setAddress] = useState({
    name: "",
    phone: "",
    email: "",
    igHandle: "",
    address: "",
    district: "",
    districtLabel: "",
    sfLockerCode: "",
    sfLockerLabel: "",
  });

  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  // Add-on products
  const addOnProducts: AddOnProduct[] = [
    {
      id: "senakyu",
      name: "背粒消 噴霧",
      price: 98,
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
  const isFreeShipping = subtotal >= 500;
  const shippingFee = isFreeShipping ? 0 : (shippingMethod === "home" ? 40 : 15);
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

    if (!address.email.trim()) {
      newErrors.email = "請輸入電郵地址（訂單通知使用）";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address.email.trim())) {
      newErrors.email = "電郵格式不正確";
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

  const handleCheckout = async () => {
    if (items.length === 0) {
      alert("購物車是空的");
      return;
    }

    if (!validateForm()) return;

    setSubmitting(true);

    // Compose shipping address string for CRM
    const shippingAddressText =
      shippingMethod === "home"
        ? `${address.districtLabel || address.district} ${address.address}`.trim()
        : `順豐智能櫃：${address.sfLockerLabel || address.sfLockerCode}`;

    const productsText = items
      .map((it) => `${it.brand ? `[${it.brand}] ` : ""}${it.name}${it.variant ? `（${it.variant}）` : ""} x${it.quantity}`)
      .join("、");

    const orderNumber = generateOrderNumber();

    // Insert into Supabase CRM (non-blocking on error — customer still sees checkout)
    const { data: inserted, error: dbError } = await supabase
      .from("orders")
      .insert({
        order_number: orderNumber,
        customer_name: address.name.trim(),
        phone: address.phone.trim(),
        email: address.email.trim(),
        ig_handle: address.igHandle.trim() || null,
        shipping_method: (shippingMethod === "home" ? "到宅配送" : "順豐智能櫃") as ShippingMethod,
        shipping_address: shippingAddressText,
        products: productsText,
        amount: total,
        status: "等待入貨",
      })
      .select("id")
      .single();

    if (dbError) {
      console.error("Failed to write order to CRM:", dbError);
    } else {
      // Fire-and-forget confirmation email
      supabase.functions
        .invoke("send-order-confirmation", {
          body: {
            to: address.email.trim(),
            orderId: inserted?.id,
            orderNumber,
            customerName: address.name.trim(),
            amount: total,
            shippingAddress: shippingAddressText,
            products: productsText,
          },
        })
        .catch((err) => console.error("Email send failed:", err));
    }

    // Local order (localStorage) for the checkout confirmation page
    const order = createOrder({
      items: [...items],
      subtotal,
      shippingFee,
      total,
      shippingMethod,
      paymentMethod: "stripe",
      address: {
        name: address.name,
        phone: address.phone,
        address: shippingMethod === "home" ? `${address.districtLabel} ${address.address}`.trim() : "",
        district: address.district,
        sfLockerCode: address.sfLockerCode,
      },
    });
    // Preserve the DB-side order number in the local order too
    order.orderNumber = orderNumber;

    // Create Stripe Checkout session and redirect
    try {
      const { data: sessionData, error: sessionError } = await supabase.functions.invoke(
        "create-checkout-session",
        {
          body: {
            order_id: inserted?.id,
            order_number: orderNumber,
            amount: total,
            customer_email: address.email.trim(),
            success_url: `${window.location.origin}/checkout?order=${encodeURIComponent(orderNumber)}&status=success`,
            cancel_url: `${window.location.origin}/checkout?order=${encodeURIComponent(orderNumber)}&status=cancelled`,
          },
        },
      );
      if (sessionError || !sessionData?.url) {
        console.error("Stripe checkout session failed:", sessionError, sessionData);
        alert("建立付款連結失敗，請稍後再試或聯絡我們。");
        setSubmitting(false);
        return;
      }
      // Redirect to Stripe Checkout
      window.location.href = sessionData.url;
    } catch (err) {
      console.error("Stripe checkout error:", err);
      alert("建立付款連結失敗，請稍後再試或聯絡我們。");
      setSubmitting(false);
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
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4">購物車</h1>

        {/* Free shipping banner */}
        <div className="bg-primary/10 border border-primary/30 rounded-sm px-4 py-2.5 mb-8 flex items-center gap-2">
          <Truck className="w-4 h-4 text-primary shrink-0" />
          <p className="text-sm text-primary font-medium">購滿 HKD 500 包郵</p>
        </div>

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
                  <p className="text-sm text-muted-foreground">{isFreeShipping ? <span className="text-primary font-medium">免運費</span> : "運費 HKD 40"}</p>
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
                  <p className="text-sm text-muted-foreground">{isFreeShipping ? <span className="text-primary font-medium">免運費</span> : "運費 HKD 15"}</p>
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

                {/* Email + IG */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email" className="flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-primary" />
                      電郵地址 *
                      <span className="text-xs text-muted-foreground font-normal">（訂單通知）</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={address.email}
                      onChange={(e) => setAddress({ ...address, email: e.target.value })}
                      placeholder="you@example.com"
                      className={errors.email ? "border-destructive" : ""}
                    />
                    {errors.email && (
                      <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="igHandle">
                      Instagram 帳號
                      <span className="text-xs text-muted-foreground font-normal ml-1">（選填 · 方便聯絡）</span>
                    </Label>
                    <Input
                      id="igHandle"
                      value={address.igHandle}
                      onChange={(e) => setAddress({ ...address, igHandle: e.target.value })}
                      placeholder="@your_ig"
                    />
                  </div>
                </div>


                {shippingMethod === "home" ? (
                  <>
                    <div>
                      <Label htmlFor="district">區域 *</Label>
                      <select
                        id="district"
                        value={address.district}
                        onChange={(e) => {
                          const label = e.target.selectedOptions[0]?.text ?? "";
                          setAddress({ ...address, district: e.target.value, districtLabel: e.target.value ? label : "" });
                        }}
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
                    <select
                      id="sfLockerCode"
                      value={address.sfLockerCode}
                      onChange={(e) => {
                          const label = e.target.selectedOptions[0]?.text ?? "";
                          setAddress({ ...address, sfLockerCode: e.target.value, sfLockerLabel: e.target.value ? label : "" });
                        }}
                      className={`flex h-10 w-full rounded-md border ${errors.sfLockerCode ? "border-destructive" : "border-input"} bg-background px-3 py-2 text-sm`}
                    >
                      <option value="">請選擇智能櫃</option>
                      <optgroup label="香港島">
                        <option value="H852H001">H852H001 - 中環站</option>
                        <option value="H852H002">H852H002 - 金鐘站</option>
                        <option value="H852H003">H852H003 - 銅鑼灣站</option>
                        <option value="H852H004">H852H004 - 灣仔站</option>
                        <option value="H852H005">H852H005 - 北角站</option>
                        <option value="H852H006">H852H006 - 太古站</option>
                        <option value="H852H007">H852H007 - 鰂魚涌站</option>
                        <option value="H852H008">H852H008 - 筲箕灣站</option>
                        <option value="H852H009">H852H009 - 西灣河站</option>
                        <option value="H852H010">H852H010 - 香港仔</option>
                      </optgroup>
                      <optgroup label="九龍">
                        <option value="H852K001">H852K001 - 旺角站</option>
                        <option value="H852K002">H852K002 - 尖沙咀站</option>
                        <option value="H852K003">H852K003 - 油麻地站</option>
                        <option value="H852K004">H852K004 - 深水埗站</option>
                        <option value="H852K005">H852K005 - 九龍塘站</option>
                        <option value="H852K006">H852K006 - 觀塘站</option>
                        <option value="H852K007">H852K007 - 黃大仙站</option>
                        <option value="H852K008">H852K008 - 紅磡站</option>
                        <option value="H852K009">H852K009 - 九龍灣站</option>
                        <option value="H852K010">H852K010 - 鑽石山站</option>
                      </optgroup>
                      <optgroup label="新界">
                        <option value="H852N001">H852N001 - 沙田站</option>
                        <option value="H852N002">H852N002 - 大圍站</option>
                        <option value="H852N003">H852N003 - 荃灣站</option>
                        <option value="H852N004">H852N004 - 屯門站</option>
                        <option value="H852N005">H852N005 - 元朗站</option>
                        <option value="H852N006">H852N006 - 大埔墟站</option>
                        <option value="H852N007">H852N007 - 粉嶺站</option>
                        <option value="H852N008">H852N008 - 上水站</option>
                        <option value="H852N009">H852N009 - 將軍澳站</option>
                        <option value="H852N010">H852N010 - 青衣站</option>
                        <option value="H852N011">H852N011 - 天水圍站</option>
                        <option value="H852N012">H852N012 - 馬鞍山站</option>
                      </optgroup>
                    </select>
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
                        找不到你的智能櫃？查看完整列表 →
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
                    className="border border-border rounded-sm p-3 hover:border-primary/50 transition-colors flex flex-col"
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
                    <div className="mt-auto">
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
                  <span className={isFreeShipping ? "text-primary font-medium" : "text-foreground"}>
                    {isFreeShipping ? "免運費" : `HKD ${shippingFee}`}
                  </span>
                </div>
                {!isFreeShipping && (
                  <p className="text-xs text-primary">
                    再買 HKD {500 - subtotal} 即可享免運費
                  </p>
                )}
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

              {/* Payment Method — Stripe only */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <CreditCard className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">付款方式</span>
                </div>
                <div className="p-3 border border-primary/40 bg-primary/5 rounded-sm">
                  <p className="text-sm font-medium text-foreground">Stripe 安全付款</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    支援 Visa / Mastercard / American Express 等信用卡，全程加密處理。
                  </p>
                </div>
              </div>

              {/* Checkout Button */}
              <Button 
                className="w-full" 
                size="lg"
                onClick={handleCheckout}
                disabled={submitting}
              >
                {submitting ? "處理中…" : "前往結帳"}
              </Button>

              {/* Shipping Info */}
              <div className="mt-6 pt-6 border-t border-border">
                <h4 className="text-sm font-medium text-foreground mb-2">運費估算</h4>
                <p className="text-xs text-muted-foreground mb-1">
                  收件國/地區: 香港
                </p>
                <p className="text-xs text-muted-foreground">
                  關於備貨：普通商品備貨時間約為7-14天。發貨後，郵寄到香港的收貨地址約需3到6天。
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
