import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { getProductById, getArticleById } from "@/data/sampleData";
import { ChevronRight, Star, ExternalLink, Check, ShoppingCart } from "lucide-react";

const Product = () => {
  const { productId } = useParams<{ productId: string }>();
  const product = getProductById(productId || "");
  const [selectedImage, setSelectedImage] = useState(0);

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
      {/* Breadcrumb */}
      <div className="bg-muted border-b border-border">
        <div className="container-editorial py-3">
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
              首頁
            </Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <span className="text-foreground font-medium line-clamp-1">
              {product.name}
            </span>
          </nav>
        </div>
      </div>

      <div className="container-editorial py-8 md:py-12">
        {/* Product Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
          {/* Image Gallery */}
          <div>
            <div className="bg-muted rounded-sm p-8 aspect-square flex items-center justify-center mb-4">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="max-w-full max-h-full object-contain"
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-sm overflow-hidden border-2 transition-colors ${
                      selectedImage === index
                        ? "border-primary"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} - ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <p className="text-sm text-muted-foreground uppercase tracking-wide mb-2">
              {product.brand}
            </p>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1 text-primary">
                <Star className="w-5 h-5 fill-current" />
                <span className="font-semibold">{product.rating.toFixed(1)}</span>
              </div>
              <span className="text-muted-foreground text-sm">
                ({product.reviewCount} 則評價)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-bold text-foreground">
                HKD {product.price}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-muted-foreground line-through">
                  HKD {product.originalPrice}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Features */}
            <div className="mb-8">
              <h3 className="font-semibold text-foreground mb-3">主要特點</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Buy Links */}
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground mb-3">購買渠道</h3>
              {product.buyLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-between p-4 rounded-sm border transition-colors ${
                    index === 0
                      ? "bg-primary text-primary-foreground border-primary hover:bg-primary/90"
                      : "bg-card border-border hover:border-primary"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <ShoppingCart className="w-4 h-4" />
                    <span className="font-medium">{link.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold">HKD {link.price}</span>
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Specifications */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-foreground mb-6 pb-4 border-b border-border">
            產品規格
          </h2>
          <div className="border border-border rounded-sm overflow-hidden">
            <table className="w-full text-sm">
              <tbody>
                {product.specs.map((spec, index) => (
                  <tr key={index} className="border-b border-border last:border-b-0">
                    <td className="px-4 py-3 bg-muted font-medium text-foreground w-1/3">
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
        {product.relatedArticles && product.relatedArticles.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-foreground mb-6 pb-4 border-b border-border">
              相關評測
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {product.relatedArticles.map((articleId) => {
                const article = getArticleById(articleId);
                if (!article) return null;
                return (
                  <Link
                    key={articleId}
                    to={`/category/${article.categorySlug}/article/${article.id}`}
                    className="flex gap-4 group"
                  >
                    <div className="w-32 h-24 flex-shrink-0 overflow-hidden rounded-sm">
                      <img
                        src={article.imageUrl}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {article.date}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
};

export default Product;