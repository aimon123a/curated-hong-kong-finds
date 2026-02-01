import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { getProductDetailById } from "@/data/sampleData";
import { ChevronRight, Star, Check, AlertCircle, ShoppingCart, Heart, Truck, CreditCard, Package } from "lucide-react";

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const product = getProductDetailById(productId || "");
  const [selectedSize, setSelectedSize] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <Layout>
        <div className="container-editorial py-20 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            找不到此產品
          </h1>
          <p className="text-muted-foreground">
            請確認網址是否正確，或返回首頁瀏覽。
          </p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Breadcrumb - Sticky */}
      <div className="sticky top-16 z-40 bg-muted/95 backdrop-blur-sm border-b border-border">
        <div className="container-editorial py-3">
          <nav className="flex items-center gap-2 text-sm flex-wrap">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
              首頁
            </Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <Link to="/products" className="text-muted-foreground hover:text-foreground transition-colors">
              產品
            </Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <Link to={`/category/${product.categorySlug}`} className="text-muted-foreground hover:text-foreground transition-colors">
              {product.categoryName}
            </Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <span className="text-foreground font-medium line-clamp-1">
              {product.name}
            </span>
          </nav>
        </div>
      </div>

      <div className="container-editorial py-8 md:py-12">
        {/* Product Overview - 2 Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
          {/* Left: Image Gallery */}
          <div className="space-y-4">
            <div className="bg-card border border-border rounded-sm p-8 aspect-square flex items-center justify-center">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="max-w-full max-h-full object-contain"
              />
            </div>
            
            {/* Wishlist prompt */}
            <Link 
              to="/product-request"
              className="text-sm text-primary text-center block hover:underline"
            >
              有想要的商品？可以申請上架哦！
            </Link>
          </div>

          {/* Right: Product Info */}
          <div>
            {/* Title */}
            <h1 className="text-xl md:text-2xl font-bold text-foreground mb-3">
              {product.brand} {product.name}
            </h1>

            {/* Rating & Wishlist */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${
                      star <= Math.floor(product.rating)
                        ? "fill-primary text-primary"
                        : "text-border"
                    }`}
                  />
                ))}
                <span className="text-sm text-muted-foreground ml-1">
                  {product.reviewCount}人評價
                </span>
              </div>
              <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Heart className="w-4 h-4" />
                收藏
              </button>
            </div>

            {/* Free shipping notice */}
            <div className="bg-primary/10 border border-primary/30 rounded-sm px-4 py-2 mb-6">
              <p className="text-sm text-primary flex items-center gap-2">
                <Truck className="w-4 h-4" />
                購滿 HKD 500 免運費寄香港
              </p>
            </div>

            {/* Price */}
            <div className="mb-6">
              <p className="text-sm text-muted-foreground mb-1">價格：</p>
              <p className="text-3xl font-bold text-primary">
                HKD {product.variants[selectedSize].price}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                ≈ {product.variants[selectedSize].jpy} 日元 (JPY) 匯率僅供參考
              </p>
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <p className="text-sm font-medium text-foreground mb-3">規格</p>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((variant, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedSize(index)}
                    className={`px-4 py-2 rounded-sm border text-sm transition-colors ${
                      selectedSize === index
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    {variant.size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border border-border rounded-sm">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  -
                </button>
                <span className="px-4 py-2 font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  +
                </button>
              </div>
              
              <Link 
                to="/cart"
                className="flex-1 bg-primary text-primary-foreground px-6 py-3 rounded-sm font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-4 h-4" />
                加入購物車
              </Link>
            </div>

            {/* Added count */}
            <p className="text-sm text-muted-foreground mb-6">
              {product.addedCount}人已加入購物車
            </p>

            {/* Shipping & Payment info */}
            <div className="space-y-3 text-sm text-muted-foreground border-t border-border pt-6">
              <p className="flex items-start gap-2">
                <Package className="w-4 h-4 shrink-0 mt-0.5" />
                <span>關於備貨：普通商品備貨時間約為3-7天。發貨後，郵寄到香港的收貨地址約需2到4天。</span>
              </p>
              <p className="flex items-start gap-2">
                <CreditCard className="w-4 h-4 shrink-0 mt-0.5" />
                <span>支付方式：信用卡 · PayPal · 轉數快 · 八達通</span>
              </p>
            </div>
          </div>
        </div>

        {/* Product Introduction */}
        <section className="mb-12">
          <div className="border-l-4 border-primary pl-4 mb-6">
            <h2 className="text-xl font-bold text-foreground">產品介紹</h2>
          </div>

          <div className="bg-card border border-border rounded-sm overflow-hidden">
            <div className="p-6 space-y-4">
              {/* Category breadcrumb */}
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">分類：</span>
                <Link to={`/category/${product.categorySlug}`} className="text-primary hover:underline">
                  {product.categoryName}
                </Link>
                <span className="text-muted-foreground">{'>'}</span>
                <span className="text-primary">{product.subcategory}</span>
              </div>

              {/* Brand */}
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">品牌：</span>
                <span className="text-primary">{product.brand}</span>
                <span className="text-muted-foreground">{'>'}</span>
                <span className="text-primary">{product.name}</span>
              </div>

              {/* Description */}
              <div className="pt-4 border-t border-border">
                <p className="text-foreground leading-relaxed mb-4">
                  {product.fullDescription}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Product Features */}
        <section className="mb-12">
          <div className="border-l-4 border-secondary pl-4 mb-6">
            <h2 className="text-xl font-bold text-foreground">產品特點</h2>
          </div>

          <div className="space-y-4">
            {product.features.map((feature, index) => (
              <div key={index} className="bg-card border border-border rounded-sm p-5 flex items-start gap-3">
                <span className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm shrink-0">
                  {index + 1}
                </span>
                <div>
                  <h4 className="font-bold text-foreground mb-1">{feature.title}</h4>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Product Functions */}
        <section className="mb-12">
          <div className="border-l-4 border-accent pl-4 mb-6">
            <h2 className="text-xl font-bold text-foreground">產品功能</h2>
          </div>

          <div className="bg-muted/50 border border-border rounded-sm p-6">
            <p className="text-foreground leading-relaxed">
              {product.functions}
            </p>
          </div>
        </section>

        {/* How to Use */}
        <section className="mb-12">
          <div className="border-l-4 border-primary pl-4 mb-6">
            <h2 className="text-xl font-bold text-foreground">使用方法</h2>
          </div>

          <div className="bg-card border border-border rounded-sm p-6">
            <p className="text-foreground leading-relaxed">
              {product.usage}
            </p>
          </div>
        </section>

        {/* Pros & Cons */}
        <section className="mb-12">
          <div className="border-l-4 border-primary pl-4 mb-6">
            <h2 className="text-xl font-bold text-foreground">優點與需注意的地方</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pros */}
            <div className="bg-primary/5 border border-primary/20 rounded-sm p-5">
              <h4 className="font-bold text-foreground mb-4 flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                  <Check className="w-3 h-3 text-primary-foreground" />
                </div>
                優點
              </h4>
              <ul className="space-y-3">
                {product.pros.map((pro, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span className="text-foreground">{pro}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cons */}
            <div className="bg-accent/5 border border-accent/20 rounded-sm p-5">
              <h4 className="font-bold text-foreground mb-4 flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center">
                  <AlertCircle className="w-3 h-3 text-accent-foreground" />
                </div>
                需注意的地方
              </h4>
              <ul className="space-y-3">
                {product.cons.map((con, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <AlertCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span className="text-foreground">{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Specifications */}
        <section className="mb-12">
          <div className="border-l-4 border-secondary pl-4 mb-6">
            <h2 className="text-xl font-bold text-foreground">產品規格</h2>
          </div>

          <div className="bg-card border border-border rounded-sm overflow-hidden">
            <table className="w-full text-sm">
              <tbody>
                {product.specs.map((spec, index) => (
                  <tr key={index} className="border-b border-border last:border-b-0">
                    <td className="px-4 py-3 bg-muted/50 font-medium text-foreground w-1/3">
                      {spec.label}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {spec.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Related Articles */}
        {product.relatedArticleId && (
          <section className="mb-12">
            <div className="border-l-4 border-primary pl-4 mb-6">
              <h2 className="text-xl font-bold text-foreground">相關評測</h2>
            </div>

            <Link
              to={`/category/${product.categorySlug}/share/${product.relatedArticleId}`}
              className="block bg-card border border-border rounded-sm p-6 hover:border-primary transition-colors group"
            >
              <p className="text-primary font-medium group-hover:underline">
                → {product.name} 真的有用嗎？親自產品評測
              </p>
            </Link>
          </section>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetail;
