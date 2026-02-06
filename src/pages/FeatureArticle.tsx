import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { getArticleById, getCategoryBySlug, getSelectorById } from "@/data/sampleData";
import { ChevronRight, Clock, Check, AlertCircle, Lightbulb, Star, Share2, Bookmark } from "lucide-react";
import ReviewerProfile from "@/components/article/ReviewerProfile";
import ArticleTableOfContents from "@/components/article/ArticleTableOfContents";
import HighlightedHeading from "@/components/article/HighlightedHeading";
import VeryGoodBadge from "@/components/article/VeryGoodBadge";
import ProductCTABox from "@/components/article/ProductCTABox";
import FeedbackSection from "@/components/article/FeedbackSection";

const iconMap = {
  shield: AlertCircle,
  heart: Star,
  sparkles: Lightbulb,
  badge: Check,
};

interface FeatureArticleProps {
  fixedCategorySlug?: string;
  fixedArticleId?: string;
}

const FeatureArticle = ({ fixedCategorySlug, fixedArticleId }: FeatureArticleProps = {}) => {
  const params = useParams<{
    categorySlug: string;
    articleId: string;
  }>();

  const categorySlug = fixedCategorySlug || params.categorySlug;
  const articleId = fixedArticleId || params.articleId;

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

  // Table of Contents items
  const tocItems = [
    { id: "intro", title: "前言：我的背痘困擾", level: 2 },
    { id: "what-is-it", title: `${product.name} 是什麼？`, level: 2 },
    { id: "key-features", title: "四大核心特點解析", level: 2 },
    { id: "my-experience", title: "我的真實使用體驗", level: 2 },
    { id: "pros-cons", title: "優點與需注意的地方", level: 2 },
    { id: "how-to-use", title: "正確使用方法", level: 2 },
    { id: "who-should-use", title: "適合什麼人使用？", level: 2 },
    { id: "verdict", title: "總結與建議", level: 2 },
  ];

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-muted/50 border-b border-border">
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

      <div className="container-editorial py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Main Content */}
          <article className="lg:col-span-8">
            {/* Article Header */}
            <header className="mb-8">
              {/* Category & Meta */}
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <span className="px-3 py-1 text-xs font-medium bg-primary text-primary-foreground rounded-sm">
                  {product.productType}
                </span>
                <span className="px-3 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-sm">
                  深度分享
                </span>
              </div>

              {/* Title */}
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4 leading-tight">
                {article.title}
              </h1>

              {/* Subtitle */}
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                終於找到一款真正有效的藥用沐浴露！分享我使用{product.name}三個月後的真實感受。
              </p>

              {/* Meta Info */}
              <div className="flex items-center justify-between flex-wrap gap-4 pb-6 border-b border-border">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <time>{article.date}</time>
                  </div>
                  <span>•</span>
                  <span>閱讀時間約 8 分鐘</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <button className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-sm transition-colors">
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-sm transition-colors">
                    <Bookmark className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </header>

            {/* Hero Image */}
            <div className="bg-card border border-border rounded-sm p-6 md:p-10 mb-10">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full max-w-md mx-auto object-contain"
              />
              <p className="text-center text-sm text-muted-foreground mt-4">
                {product.brand} {product.name} - {product.subtitle}
              </p>
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              
              {/* Introduction */}
              <section id="intro" className="mb-12">
                <HighlightedHeading id="intro" variant="primary">
                  前言：我的背痘困擾
                </HighlightedHeading>
                
                <p className="text-foreground leading-relaxed mb-4">
                  相信不少香港人都有類似的經歷：明明臉部皮膚已經控制得不錯，但背部和胸口卻總是冒出惱人的痘痘。尤其在香港這種潮濕悶熱的天氣，加上每天運動健身後大量出汗，背痘問題更是難以根治。
                </p>
                
                <p className="text-foreground leading-relaxed mb-4">
                  我試過無數沐浴露、去角質產品，甚至求醫開藥，但效果都不太理想。直到半年前在日本藥妝店偶然發現了這款來自第一三共的藥用沐浴露，情況才開始有明顯改善。
                </p>

                <div className="bg-muted/50 border-l-4 border-primary p-4 my-6">
                  <p className="text-muted-foreground text-sm italic">
                    「這不是一篇業配文，純粹想分享我的個人經驗。如果你也飽受背痘困擾，希望這篇分享能給你一些參考。」
                  </p>
                </div>
              </section>

              {/* What is it */}
              <section id="what-is-it" className="mb-12">
                <HighlightedHeading id="what-is-it" variant="primary">
                  {product.name} 是什麼？
                </HighlightedHeading>
                
                <p className="text-foreground leading-relaxed mb-4">
                  Clearex Wi（クリアレックスWi）是日本知名製藥公司「第一三共」(Daiichi Sankyo) 研發的藥用沐浴露。在日本，這類產品屬於「醫藥部外品」，意味著它含有經過認證的有效成分，專門針對皮膚問題。
                </p>
                
                <p className="text-foreground leading-relaxed mb-4">
                  與一般超市沐浴露不同，Clearex Wi 在日本藥妝店通常放在專業護理區，需要藥劑師推薦。這也是為什麼它比普通沐浴露稍貴，但以「藥用」級別的效果來說，我覺得非常值得。
                </p>

                <VeryGoodBadge rating="藥用認證 ✓" className="mb-4" />
              </section>

              {/* Key Features */}
              <section id="key-features" className="mb-12">
                <HighlightedHeading id="key-features" variant="primary">
                  四大核心特點解析
                </HighlightedHeading>
                
                <p className="text-foreground leading-relaxed mb-6">
                  經過這幾個月的使用和研究，我總結出這款產品之所以有效的四個關鍵原因：
                </p>

                <div className="space-y-6">
                  {product.keyPoints?.map((point, index) => {
                    const IconComponent = iconMap[point.icon as keyof typeof iconMap] || AlertCircle;
                    return (
                      <div
                        key={index}
                        className="bg-card border border-border rounded-sm overflow-hidden"
                      >
                        <div className="bg-secondary/5 px-5 py-3 border-b border-border flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center">
                            <IconComponent className="w-4 h-4 text-secondary" />
                          </div>
                          <div>
                            <span className="text-xs text-secondary font-medium">
                              特點 {index + 1}
                            </span>
                            <h3 className="font-bold text-foreground">
                              {point.title}
                            </h3>
                          </div>
                        </div>
                        
                        <div className="p-5">
                          <p className="text-muted-foreground leading-relaxed mb-4">
                            {point.description}
                          </p>

                          <div className="bg-muted/50 rounded-sm p-4 space-y-3">
                            {point.details.map((detail, detailIndex) => (
                              <div key={detailIndex} className="flex items-start gap-2">
                                <Check className="w-4 h-4 text-primary mt-1 shrink-0" />
                                <div>
                                  <span className="font-medium text-foreground text-sm">
                                    {detail.label}：
                                  </span>
                                  <span className="text-muted-foreground text-sm">
                                    {detail.value}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* My Experience */}
              <section id="my-experience" className="mb-12">
                <HighlightedHeading id="my-experience" variant="secondary">
                  我的真實使用體驗
                </HighlightedHeading>
                
                <p className="text-foreground leading-relaxed mb-4">
                  坦白說，剛開始使用時我並沒有太大期望。畢竟之前試過太多「有效」的產品，結果都令人失望。
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
                  <div className="bg-primary/5 border border-primary/20 rounded-sm p-4 text-center">
                    <p className="text-2xl font-bold text-primary mb-1">第1週</p>
                    <p className="text-sm text-muted-foreground">沒有明顯變化，但洗感舒適</p>
                  </div>
                  <div className="bg-primary/10 border border-primary/30 rounded-sm p-4 text-center">
                    <p className="text-2xl font-bold text-primary mb-1">第3週</p>
                    <p className="text-sm text-muted-foreground">新痘痘減少，舊痘開始消退</p>
                  </div>
                  <div className="bg-primary/20 border border-primary/40 rounded-sm p-4 text-center">
                    <p className="text-2xl font-bold text-primary mb-1">第8週</p>
                    <p className="text-sm text-muted-foreground">背部明顯光滑，基本沒有新痘</p>
                  </div>
                </div>
                
                <p className="text-foreground leading-relaxed mb-4">
                  大約使用到第三週，我開始注意到新冒出的痘痘明顯減少了。原本每天運動後背部都會冒出幾顆紅腫的痘痘，現在這種情況幾乎消失了。
                </p>
                
                <p className="text-foreground leading-relaxed">
                  持續使用兩個月後，背部的舊痘疤也逐漸淡化。雖然不能說完全消失，但整體膚況改善非常明顯。我終於可以穿露背的衣服而不感到尷尬了。
                </p>
              </section>

              {/* Pros & Cons */}
              <section id="pros-cons" className="mb-12">
                <HighlightedHeading id="pros-cons" variant="primary">
                  優點與需注意的地方
                </HighlightedHeading>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Pros */}
                  <div className="bg-primary/5 border border-primary/20 rounded-sm p-5">
                    <h4 className="font-bold text-foreground mb-4 flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                        <Check className="w-3 h-3 text-primary-foreground" />
                      </div>
                      我喜歡的地方
                    </h4>
                    <ul className="space-y-3">
                      {product.pros?.map((pro, index) => (
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
                      需要留意的地方
                    </h4>
                    <ul className="space-y-3">
                      {product.cons?.map((con, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <AlertCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                          <span className="text-foreground">{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              {/* How to Use */}
              {product.usageGuide && (
                <section id="how-to-use" className="mb-12">
                  <HighlightedHeading id="how-to-use" variant="secondary">
                    正確使用方法
                  </HighlightedHeading>
                  
                  <p className="text-foreground leading-relaxed mb-6">
                    正確的使用方法會直接影響效果。以下是我總結的最佳使用流程：
                  </p>
                  
                  <div className="bg-card border border-border rounded-sm p-6">
                    <ol className="space-y-4">
                      {product.usageGuide.steps.map((step, index) => (
                        <li key={index} className="flex items-start gap-4">
                          <span className="w-7 h-7 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center font-bold text-sm shrink-0">
                            {index + 1}
                          </span>
                          <p className="text-foreground pt-0.5">{step}</p>
                        </li>
                      ))}
                    </ol>
                    
                    {product.usageGuide.tips && (
                      <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-sm flex items-start gap-3">
                        <Lightbulb className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <p className="text-sm text-foreground">
                          <strong>小貼士：</strong> {product.usageGuide.tips}
                        </p>
                      </div>
                    )}
                  </div>
                </section>
              )}

              {/* Who should use */}
              <section id="who-should-use" className="mb-12">
                <HighlightedHeading id="who-should-use" variant="primary">
                  適合什麼人使用？
                </HighlightedHeading>
                
                <p className="text-foreground leading-relaxed mb-4">
                  根據我的經驗和產品特性，以下類型的人可能會特別受惠：
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    "經常運動健身、容易出汗的人",
                    "背部或胸口長期有痘痘困擾",
                    "嘗試過多種產品但效果不佳",
                    "皮膚敏感、不適合強力清潔產品",
                    "想要同時解決體臭問題",
                    "需要每天使用的溫和型產品",
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 bg-muted/50 rounded-sm">
                      <Check className="w-4 h-4 text-primary shrink-0" />
                      <span className="text-sm text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Product CTA Box */}
              <ProductCTABox
                productName={product.name}
                brand={product.brand}
                imageUrl={product.imageUrl}
                price={product.price}
                buyLinks={product.buyLinks}
                note="如果你想嘗試這款產品，可以透過以下渠道購買。我個人是在日本藥妝店直接購買，但網購也是不錯的選擇。"
              />

              {/* Verdict */}
              <section id="verdict" className="mb-12">
                <HighlightedHeading id="verdict" variant="accent">
                  總結與建議
                </HighlightedHeading>
                
                {product.verdict && (
                  <div className="bg-muted border border-border rounded-sm p-6">
                    <p className="text-foreground leading-relaxed mb-4">
                      {product.verdict.content}
                    </p>
                    
                    <div className="flex items-center gap-3 pt-4 border-t border-border">
                      <div className="flex items-center gap-1">
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
                      <span className="font-bold text-foreground">{product.rating} / 5</span>
                      <span className="text-muted-foreground text-sm">個人評價</span>
                    </div>
                  </div>
                )}
              </section>

              {/* Specifications */}
              <section className="mb-12">
                <HighlightedHeading variant="secondary" as="h3">
                  產品規格
                </HighlightedHeading>
                
                <div className="bg-card border border-border rounded-sm overflow-hidden">
                  <table className="w-full text-sm">
                    <tbody>
                      {product.specs?.map((spec, index) => (
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

              {/* Feedback */}
              <FeedbackSection />
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-6 space-y-6">
              {/* Reviewer Profile */}
              {selector && (
                <ReviewerProfile
                  id={selector.id}
                  name={selector.name}
                  title={selector.title}
                  imageUrl={selector.imageUrl}
                  bio={selector.bio}
                  expertise={selector.expertise}
                  socialLinks={selector.socialLinks}
                />
              )}

              {/* Table of Contents */}
              <ArticleTableOfContents items={tocItems} />

              {/* Related Articles Placeholder */}
              <div className="bg-card border border-border rounded-sm p-5">
                <h4 className="font-bold text-foreground mb-4">相關文章</h4>
                <ul className="space-y-3">
                  <li>
                    <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors block">
                      → 背痘護理完全指南：從預防到治療
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors block">
                      → 運動後皮膚護理的五個重點
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors block">
                      → 日本藥妝必買：痘痘護理篇
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </Layout>
  );
};

export default FeatureArticle;
