import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { getArticleById, getCategoryBySlug, getSelectorById } from "@/data/sampleData";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { useJsonLd } from "@/hooks/useJsonLd";
import { ChevronRight, Clock, Check, AlertCircle, Lightbulb, Star, Share2, Bookmark } from "lucide-react";
import ReviewerProfile from "@/components/article/ReviewerProfile";
import ArticleTableOfContents from "@/components/article/ArticleTableOfContents";
import HighlightedHeading from "@/components/article/HighlightedHeading";
import VeryGoodBadge from "@/components/article/VeryGoodBadge";
import FeedbackSection from "@/components/article/FeedbackSection";
import TwitterEmbed from "@/components/article/TwitterEmbed";

const iconMap = {
  shield: AlertCircle,
  heart: Star,
  sparkles: Lightbulb,
  badge: Check,
};

// Helper component to render text with CLEAREX Wi links
const TextWithProductLinks = ({ text, productId = "clearex-wi" }: { text: string; productId?: string }) => {
  // Define link targets: keyword -> { display, url }
  const linkMap: Array<{ pattern: RegExp; display: string; url: string }> = [
    { pattern: /CLEAREX[- ]?Wi/gi, display: "CLEAREX-Wi", url: `/products/${productId}` },
    { pattern: /背粒消/g, display: "背粒消", url: `/products/${productId}?variant=3` },
  ];

  // Build a combined regex
  const combined = new RegExp(`(${linkMap.map(l => l.pattern.source).join('|')})`, 'gi');
  const parts = text.split(combined).filter(Boolean);

  if (parts.length <= 1 && parts[0] === text) {
    return <>{text}</>;
  }

  return (
    <>
      {parts.map((part, index) => {
        const match = linkMap.find(l => l.pattern.test(part));
        // Reset lastIndex after test
        linkMap.forEach(l => { l.pattern.lastIndex = 0; });
        if (match) {
          return (
            <Link key={index} to={match.url} className="text-blue-600 hover:text-blue-800 hover:underline font-medium">
              {part}
            </Link>
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </>
  );
};

interface FeatureArticleV2Props {
  fixedCategorySlug?: string;
  fixedArticleId?: string;
}

const FeatureArticleV2 = ({ fixedCategorySlug, fixedArticleId }: FeatureArticleV2Props = {}) => {
  const params = useParams<{
    categorySlug: string;
    articleId: string;
  }>();

  const categorySlug = fixedCategorySlug || params.categorySlug;
  const articleId = fixedArticleId || params.articleId;

  const article = articleId ? getArticleById(articleId) : null;
  const category = categorySlug ? getCategoryBySlug(categorySlug) : null;
  const selector = article?.selectorId ? getSelectorById(article.selectorId) : null;

  // Dynamic page title & meta for SEO
  useDocumentMeta({
    title: article?.title,
    description: article ? `${article.excerpt} | Clearex Wi 香港評測` : undefined,
    canonical: article ? `/${(article as any).slug || articleId}` : undefined,
  });

  useJsonLd(article ? {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.excerpt,
    "image": article.imageUrl,
    "datePublished": article.date,
    "author": {
      "@type": "Person",
      "name": article.author?.name || "jaagSELECT 編輯部",
    },
    "publisher": {
      "@type": "Organization",
      "name": "jaagSELECT HK",
      "url": "https://jaagselect.com",
    },
  } : null);

  // Early return with loading state to prevent white screen flashes
  if (!categorySlug || !articleId) {
    return (
      <Layout>
        <div className="container-editorial py-20 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/3 mx-auto mb-4"></div>
            <div className="h-4 bg-muted rounded w-1/2 mx-auto"></div>
          </div>
        </div>
      </Layout>
    );
  }

  // Handle Coming Soon articles
  if (article && (article as any).isComingSoon) {
    return (
      <Layout>
        {/* Breadcrumb */}
        <div className="bg-muted border-b border-border sticky top-0 z-40">
          <div className="container-editorial py-3">
            <nav className="flex items-center gap-2 text-sm">
              <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                首頁
              </Link>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
              <Link
                to={`/category/${categorySlug}`}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {category?.chineseTitle || categorySlug}
              </Link>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
              <span className="text-foreground font-medium line-clamp-1">
                敬請期待
              </span>
            </nav>
          </div>
        </div>

        {/* Coming Soon Content */}
        <div className="container-editorial py-20">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <img
                src={article.imageUrl}
                alt="敬請期待"
                className="w-full max-w-md mx-auto rounded-sm"
              />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              親自評測中，敬請期待
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              我們正在認真測試這款產品，完整評測即將推出，敬請期待！
            </p>
            <Link
              to={`/category/${categorySlug}`}
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium"
            >
              ← 返回{category?.chineseTitle || "分類"}
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

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
  const articleContent = product.articleContent;

  // Table of Contents items - reordered (knowledge moved to end)
  const tocItems = [
    { id: "intro", title: "前言", level: 2 },
    { id: "japanese-recommendation", title: "日本網友推薦", level: 2 },
    { id: "trial-results", title: "個人試用30日效果", level: 2 },
    { id: "product-specs", title: "商品概要", level: 2 },
    { id: "features", title: "產品特徵", level: 2 },
    { id: "pros-cons", title: "優點與注意事項", level: 2 },
    { id: "how-to-use", title: "使用方法", level: 2 },
    { id: "verdict", title: "總結", level: 2 },
    { id: "knowledge", title: "背痘知識", level: 2 },
  ];

  return (
    <Layout>
      {/* Breadcrumb - Sticky (Freeze Pane) */}
      <div className="sticky top-16 z-40 bg-muted/95 backdrop-blur-sm border-b border-border">
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
                  個人分享
                </span>
              </div>

              {/* Title */}
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4 leading-tight">
                <TextWithProductLinks text={article.title} />
              </h1>

              {/* Subtitle */}
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                {article.excerpt}
              </p>

              {/* Badge before meta */}
              <VeryGoodBadge rating="背痘救星 ✓" className="mb-4" />

              {/* Meta Info */}
              <div className="flex items-center justify-between flex-wrap gap-4 pb-6 border-b border-border">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <time>{article.date}</time>
                  </div>
                  <span>•</span>
                  <span>閱讀時間約 30 秒</span>
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

            {/* Hero Image - First image only */}
            {articleContent?.heroImages?.[0] && (
              <div className="bg-white border border-border rounded-sm overflow-hidden mb-10">
                <img
                  src={articleContent.heroImages[0]}
                  alt={`${product.name}`}
                  className="w-full h-auto object-cover"
                  fetchPriority="high"
                  decoding="async"
                />
              </div>
            )}

            {/* Article Content - Reordered */}
            <div className="prose prose-lg max-w-none">
              
              {/* 1. Introduction */}
              <section id="intro" className="mb-12">
                <HighlightedHeading id="intro" variant="primary">
                  {articleContent?.intro?.title || "前言"}
                </HighlightedHeading>
                
                <p className="text-foreground leading-relaxed mb-4 text-lg">
                  <TextWithProductLinks text={articleContent?.intro?.content || ""} />
                </p>

                {/* Second hero image placed after intro text */}
                {articleContent?.heroImages?.[1] && (
                  <div className="bg-white border border-border rounded-sm overflow-hidden mt-6">
                    <img
                      src={articleContent.heroImages[1]}
                      alt={`${product.name} 商店實拍`}
                      className="w-full h-auto object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                )}
              </section>

              {/* 2. Japanese Recommendation - Twitter Embed Section */}
              {articleContent?.japaneseRecommendation && (
                <section id="japanese-recommendation" className="mb-12">
                  <HighlightedHeading id="japanese-recommendation" variant="secondary">
                    {articleContent.japaneseRecommendation.title}
                  </HighlightedHeading>
                  
                  {/* Intro text */}
                  <p className="text-foreground leading-relaxed mb-6">
                    {articleContent.japaneseRecommendation.intro}
                  </p>

                  {/* Twitter Embed with Translation */}
                  {articleContent.japaneseRecommendation.mainTweet && (
                    <TwitterEmbed
                      tweetUrl={articleContent.japaneseRecommendation.mainTweet.tweetUrl}
                      username={articleContent.japaneseRecommendation.mainTweet.username}
                      handle={articleContent.japaneseRecommendation.mainTweet.handle}
                      date={articleContent.japaneseRecommendation.mainTweet.date}
                      content={articleContent.japaneseRecommendation.mainTweet.content}
                      translation={articleContent.japaneseRecommendation.mainTweet.translation}
                      likes={articleContent.japaneseRecommendation.mainTweet.likes}
                      avatarUrl={articleContent.japaneseRecommendation.mainTweet.avatarUrl}
                      replies={articleContent.japaneseRecommendation.replies}
                    />
                  )}

                  {/* Inspiration Note - Combo Product Image with Purchase Link */}
                  {articleContent.japaneseRecommendation.mainTweet?.imageUrl && (
                    <div className="mt-8 bg-accent/10 border border-accent/30 rounded-sm p-5">
                      <p className="text-sm font-medium text-foreground mb-4 flex items-center gap-2">
                        💡 我們的「抗痘套裝」靈感正是來自這位日本網友的推薦！
                      </p>
                      <div className="bg-white border border-border rounded-sm overflow-hidden mb-4">
                        <img
                          src={articleContent.japaneseRecommendation.mainTweet.imageUrl}
                          alt="CLEAREX-Wi + 背粒消 抗痘套裝組合"
                          className="w-full max-w-sm mx-auto h-auto object-contain p-4"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        沐浴時使用 CLEAREX-Wi 殺菌清潔，洗澡後噴上背粒消鎮定消炎，雙管齊下效果更佳。
                      </p>
                      <Link
                        to={`/products/${product.productId || "clearex-wi"}?variant=3`}
                        className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-sm font-medium text-sm hover:bg-primary/90 transition-all shadow-md hover:shadow-lg"
                      >
                        <span>🛒</span>
                        查看抗痘套裝
                      </Link>
                    </div>
                  )}
                </section>
              )}

              {/* 3. Trial Results - 30 Day Experience */}
              <section id="trial-results" className="mb-12">
                <HighlightedHeading id="trial-results" variant="secondary">
                  個人試用30日的效果
                </HighlightedHeading>
                
                <Link
                  to={`/products/${product.productId || "clearex-wi"}?variant=3`}
                  className="inline-flex items-center gap-2 mb-6"
                >
                  <span className="inline-flex items-center gap-1 bg-muted text-muted-foreground text-xs font-medium px-2.5 py-1 rounded-full border border-border">🔻 發炎</span>
                  <span className="inline-flex items-center gap-1 bg-muted text-muted-foreground text-xs font-medium px-2.5 py-1 rounded-full border border-border">🔻 凹凸</span>
                  <span className="inline-flex items-center gap-1 bg-primary/10 text-primary text-xs font-medium px-2.5 py-1 rounded-full border border-primary/30">✨ 光滑</span>
                </Link>

                {articleContent?.trialResults?.image && (
                  <div className="bg-white border border-border rounded-sm overflow-hidden mb-6">
                    <img
                      src={articleContent.trialResults.image}
                      alt="30日試用效果"
                      className="w-full h-auto"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                )}
                
                {/* Trial results content with same style as verdict */}
                <div className="bg-muted border border-border rounded-sm p-6">
                  <p className="text-foreground leading-relaxed">
                    <TextWithProductLinks text={articleContent?.trialResults?.content || ""} />
                  </p>
                </div>
              </section>

              {/* 4. Product Specifications (商品概要) - Moved up */}
              <section id="product-specs" className="mb-12">
                <HighlightedHeading id="product-specs" variant="primary">
                  商品概要
                </HighlightedHeading>

{articleContent?.productSizes?.image && (
                  <div className="bg-white border border-border rounded-sm overflow-hidden mb-6">
                    <img
                      src={articleContent.productSizes.image}
                      alt={articleContent.productSizes.title}
                      className="w-full max-w-md mx-auto"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                )}
                
                <h3 className="text-lg font-bold text-primary mb-3">
                  <TextWithProductLinks text={articleContent?.productSizes?.title || ""} />
                </h3>
                
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {articleContent?.productSizes?.description}
                </p>
                
                {/* Price table and Buy Button wrapped together */}
                <div className="bg-card border-2 border-primary/30 rounded-sm overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-muted/50 border-b border-border">
                        <th className="px-4 py-3 text-left font-semibold text-foreground">容量</th>
                        <th className="px-4 py-3 text-left font-semibold text-foreground">價格</th>
                      </tr>
                    </thead>
                    <tbody>
                      {articleContent?.productSizes?.variants?.map((variant: { size: string; price: string }, index: number) => (
                        <tr key={index} className="border-b border-border last:border-b-0">
                          <td className="px-4 py-3 font-medium text-foreground">{variant.size}</td>
                          <td className="px-4 py-3 text-muted-foreground">{variant.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  
                  {/* Buy Button inside the box */}
                  <div className="p-4 bg-muted/30 border-t border-border">
                    <Link
                      to={`/products/${product.productId || "clearex-wi"}`}
                      className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-sm font-bold text-base hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl"
                    >
                      <span className="inline-flex items-center gap-1">↗</span>
                      前往產品購入
                    </Link>
                  </div>
                </div>
              </section>

              {/* Knowledge Section - Moved to after verdict */}

              {/* 6. Features */}
              <section id="features" className="mb-12">
                <HighlightedHeading id="features" variant="primary">
                  {articleContent?.features?.title}
                </HighlightedHeading>
                
                <div className="bg-accent/10 border border-accent/30 rounded-sm px-4 py-2 mb-6 inline-block">
                  <span className="font-bold text-accent-foreground">
                    {articleContent?.features?.subtitle}
                  </span>
                </div>
                
                <div className="space-y-4">
                  {articleContent?.features?.list?.map((feature: { point: string; detail: string }, index: number) => (
                    <div key={index} className="bg-card border border-border rounded-sm p-5">
                      <div className="flex items-start gap-3">
                        <span className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm shrink-0">
                          {index + 1}
                        </span>
                        <div>
                          <h4 className="font-bold text-foreground mb-2">{feature.point}</h4>
                          <p className="text-muted-foreground text-sm">{feature.detail}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Hashtags */}
                {articleContent?.hashtags && (
                  <div className="flex flex-wrap gap-2 mt-6">
                    {articleContent.hashtags.map((tag: string, index: number) => (
                      <span key={index} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </section>

              {/* 7. Pros & Cons */}
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
                      {product.pros?.map((pro: string, index: number) => (
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
                      {product.cons?.map((con: string, index: number) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <AlertCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                          <span className="text-foreground">{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              {/* 8. How to Use */}
              {product.usageGuide && (
                <section id="how-to-use" className="mb-12">
                  <HighlightedHeading id="how-to-use" variant="secondary">
                    正確使用方法
                  </HighlightedHeading>
                  
                  <div className="bg-card border border-border rounded-sm p-6">
                    <ol className="space-y-4">
                      {product.usageGuide.steps.map((step: string, index: number) => (
                        <li key={index} className="flex items-start gap-4">
                          <span className="w-7 h-7 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center font-bold text-sm shrink-0">
                            {index + 1}
                          </span>
                          <p className="text-foreground pt-0.5">
                            <TextWithProductLinks text={step} />
                          </p>
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


              {/* 9. Verdict */}
              <section id="verdict" className="mb-12">
                <HighlightedHeading id="verdict" variant="accent">
                  總結與建議
                </HighlightedHeading>
                
                {product.verdict && (
                  <div className="bg-muted border border-border rounded-sm p-6">
                    <p className="text-foreground leading-relaxed mb-4">
                      <TextWithProductLinks text={product.verdict.content} />
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


              {/* Knowledge Section - Moved to end */}
              <section id="knowledge" className="mb-12">
                <HighlightedHeading id="knowledge" variant="secondary">
                  {articleContent?.knowledge?.title}
                </HighlightedHeading>
                
                <div className="space-y-8">
                  {articleContent?.knowledge?.sections?.map((section: { question: string; image: string; content: string }, index: number) => (
                    <div key={index} className="bg-white border border-border rounded-sm overflow-hidden">
                      <div className="bg-secondary/5 px-5 py-3 border-b border-border">
                        <h3 className="font-bold text-foreground">{section.question}</h3>
                      </div>
                      {section.image && (
                        <div className="p-4">
                          <img
                            src={section.image}
                            alt={section.question}
                            className="w-full h-auto rounded-sm"
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                      )}
                      {section.content && (
                        <div className="px-5 pb-5">
                          <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                            {section.content}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>

              {/* Feedback */}
              <FeedbackSection />
            </div>
          </article>

          {/* Sidebar - Reordered: TOC -> Selector -> Related Articles */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-24 space-y-6">
              {/* 1. Table of Contents - FIRST */}
              <ArticleTableOfContents items={tocItems} />

              {/* 2. Reviewer Profile - SECOND */}
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

              {/* 3. Related Articles - THIRD (Only existing articles) */}
              <div className="bg-card border border-border rounded-sm p-5">
                <h4 className="font-bold text-foreground mb-4">相關文章</h4>
                <ul className="space-y-3">
                  <li>
                    <Link 
                      to="/clearex-wi"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors block"
                    >
                      → Clearex-WI 真的有用嗎？親自產品評測
                    </Link>
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

export default FeatureArticleV2;
