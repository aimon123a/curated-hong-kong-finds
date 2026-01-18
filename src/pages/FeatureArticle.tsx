import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { getArticleById, getCategoryBySlug, getSelectorById } from "@/data/sampleData";
import { ChevronRight, Clock, User, Shield, Heart, Sparkles, BadgeCheck, Check, ExternalLink, Star, ShoppingCart } from "lucide-react";

const iconMap = {
  shield: Shield,
  heart: Heart,
  sparkles: Sparkles,
  badge: BadgeCheck,
};

const FeatureArticle = () => {
  const { categorySlug, articleId } = useParams<{
    categorySlug: string;
    articleId: string;
  }>();

  const article = getArticleById(articleId || "");
  const category = getCategoryBySlug(categorySlug || "");
  const selector = article?.selectorId ? getSelectorById(article.selectorId) : null;

  if (!article || !category || !article.featureProduct) {
    return (
      <Layout>
        <div className="container-editorial py-20 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            找不到此文章
          </h1>
          <p className="text-muted-foreground">
            請確認網址是否正確，或返回首頁瀏覽。
          </p>
        </div>
      </Layout>
    );
  }

  const product = article.featureProduct;

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-muted border-b border-border">
        <div className="container-editorial py-3">
          <nav className="flex items-center gap-2 text-sm flex-wrap">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
              首頁
            </Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <Link
              to={`/category/${categorySlug}`}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {category.chineseTitle}
            </Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <span className="text-foreground font-medium line-clamp-1">
              {article.title}
            </span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary-light to-background py-12 md:py-16">
        <div className="container-editorial">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Product Image */}
            <div className="order-2 lg:order-1">
              <div className="bg-card rounded-sm p-8 md:p-12 shadow-lg">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full max-w-md mx-auto object-contain"
                />
              </div>
            </div>

            {/* Hero Content */}
            <div className="order-1 lg:order-2">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 text-xs font-medium bg-primary text-primary-foreground rounded-sm">
                  {product.productType}
                </span>
                <span className="px-3 py-1 text-xs font-medium bg-accent text-accent-foreground rounded-sm">
                  編輯推薦
                </span>
              </div>

              <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">
                {product.brand}
              </p>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2 leading-tight">
                {product.name}
              </h1>
              
              {product.subtitle && (
                <p className="text-lg text-muted-foreground mb-4">
                  {product.subtitle}
                </p>
              )}

              {product.tagline && (
                <p className="text-xl text-primary font-medium mb-6">
                  {product.tagline}
                </p>
              )}

              {/* Rating and Price */}
              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-5 h-5 ${
                          star <= Math.floor(product.rating)
                            ? "fill-primary text-primary"
                            : "text-border"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-bold text-foreground">{product.rating}</span>
                </div>
                <span className="text-2xl font-bold text-foreground">
                  HKD {product.price}
                </span>
              </div>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <time>{article.date}</time>
                </div>
                {article.author && (
                  <Link 
                    to={`/selector/${article.selectorId}`}
                    className="flex items-center gap-2 hover:text-primary transition-colors"
                  >
                    <img
                      src={article.author.imageUrl}
                      alt={article.author.name}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span>{article.author.name}</span>
                  </Link>
                )}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                {product.buyLinks?.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-6 py-3 font-medium rounded-sm inline-flex items-center justify-center gap-2 transition-colors ${
                      index === 0
                        ? "btn-primary"
                        : "btn-outline"
                    }`}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    {link.name} - HKD {link.price}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Content */}
      {article.content && (
        <section className="container-editorial py-12">
          <div
            className="max-w-3xl mx-auto prose prose-lg prose-headings:text-foreground prose-p:text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </section>
      )}

      {/* Key Points Section */}
      <section className="bg-muted py-12 md:py-16">
        <div className="container-editorial">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-4">
            為什麼選擇 {product.name}？
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
            以下是這款產品的四大核心優勢，也是它能成為「背痘終結者」的科學根據。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {product.keyPoints?.map((point, index) => {
              const IconComponent = iconMap[point.icon as keyof typeof iconMap] || Shield;
              return (
                <div
                  key={index}
                  className="bg-card border border-border rounded-sm p-6 lg:p-8"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <span className="text-xs font-medium text-primary mb-1 block">
                        特點 {index + 1}
                      </span>
                      <h3 className="text-lg font-bold text-foreground">
                        {point.title}
                      </h3>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">
                    {point.description}
                  </p>

                  <div className="space-y-3">
                    {point.details.map((detail, detailIndex) => (
                      <div
                        key={detailIndex}
                        className="bg-muted rounded-sm p-4"
                      >
                        <p className="font-medium text-foreground text-sm mb-1">
                          {detail.label}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {detail.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pros & Cons */}
      <section className="container-editorial py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Pros */}
          <div className="bg-primary-light border border-primary/20 rounded-sm p-6 lg:p-8">
            <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Check className="w-6 h-6 text-primary" />
              產品優點
            </h3>
            <ul className="space-y-3">
              {product.pros?.map((pro, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{pro}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Cons */}
          <div className="bg-accent-light border border-accent/20 rounded-sm p-6 lg:p-8">
            <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
              <span className="w-6 h-6 flex items-center justify-center text-accent font-bold">−</span>
              需要考慮的地方
            </h3>
            <ul className="space-y-3">
              {product.cons?.map((con, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="w-5 h-5 flex items-center justify-center text-accent flex-shrink-0 mt-0.5 font-bold">−</span>
                  <span className="text-foreground">{con}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Usage Guide */}
      {product.usageGuide && (
        <section className="bg-muted py-12 md:py-16">
          <div className="container-editorial">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-8">
                {product.usageGuide.title}
              </h2>
              
              <div className="bg-card border border-border rounded-sm p-6 lg:p-8">
                <ol className="space-y-4">
                  {product.usageGuide.steps.map((step, index) => (
                    <li key={index} className="flex items-start gap-4">
                      <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                        {index + 1}
                      </span>
                      <p className="text-foreground pt-1">{step}</p>
                    </li>
                  ))}
                </ol>
                
                {product.usageGuide.tips && (
                  <div className="mt-6 p-4 bg-primary-light rounded-sm">
                    <p className="text-sm text-foreground">
                      <strong>💡 小貼士：</strong> {product.usageGuide.tips}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Specifications */}
      <section className="container-editorial py-12 md:py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-8">
          產品規格
        </h2>
        
        <div className="max-w-2xl mx-auto bg-card border border-border rounded-sm overflow-hidden">
          <table className="w-full">
            <tbody>
              {product.specs?.map((spec, index) => (
                <tr key={index} className="border-b border-border last:border-b-0">
                  <td className="px-6 py-4 bg-muted font-medium text-foreground w-1/3">
                    {spec.label}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {spec.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Editor's Verdict */}
      {product.verdict && (
        <section className="bg-primary text-primary-foreground py-12 md:py-16">
          <div className="container-editorial">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                {product.verdict.title}
              </h2>
              <p className="text-lg leading-relaxed opacity-90">
                {product.verdict.content}
              </p>
              
              {/* Author */}
              {selector && (
                <Link 
                  to={`/selector/${selector.id}`}
                  className="inline-flex items-center gap-3 mt-8 hover:opacity-80 transition-opacity"
                >
                  <img
                    src={selector.imageUrl}
                    alt={selector.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-primary-foreground"
                  />
                  <div className="text-left">
                    <p className="font-medium">{selector.name}</p>
                    <p className="text-sm opacity-75">{selector.title}</p>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Buy CTA */}
      <section className="container-editorial py-12 md:py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            立即購買
          </h2>
          <p className="text-muted-foreground mb-8">
            選擇你喜歡的購買渠道，開始你的背痘護理之旅。
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {product.buyLinks?.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`px-8 py-4 font-medium rounded-sm inline-flex items-center justify-center gap-2 transition-colors ${
                  index === 0
                    ? "btn-primary text-lg"
                    : "btn-outline text-lg"
                }`}
              >
                <ExternalLink className="w-5 h-5" />
                {link.name}
                <span className="text-sm opacity-75">HKD {link.price}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {selector && (
        <section className="bg-muted py-12 md:py-16">
          <div className="container-editorial">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                更多 {selector.name} 的推薦
              </h2>
              <Link 
                to={`/selector/${selector.id}`}
                className="text-primary hover:underline"
              >
                查看所有文章 →
              </Link>
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default FeatureArticle;
