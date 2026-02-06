import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import ArticleCard from "@/components/ui/ArticleCard";
import SectionHeader from "@/components/ui/SectionHeader";
import { getSelectorById, getArticlesBySelector } from "@/data/sampleData";
import { ChevronRight, Instagram, Twitter } from "lucide-react";

const Selector = () => {
  const { selectorId } = useParams<{ selectorId: string }>();
  const selector = getSelectorById(selectorId || "");
  const selectorArticles = getArticlesBySelector(selectorId || "");

  if (!selector) {
    return (
      <Layout>
        <div className="container-editorial py-20 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            找不到此 SELECTor
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
            <Link
              to="/selectors"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              SELECTor
            </Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <span className="text-foreground font-medium">
              {selector.name}
            </span>
          </nav>
        </div>
      </div>

      {/* Profile Header */}
      <section className="py-12 md:py-16 bg-background-warm">
        <div className="container-editorial">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Image */}
            <div className="lg:col-span-4">
              <div className="aspect-square max-w-sm mx-auto lg:mx-0 overflow-hidden rounded-sm">
                <img
                  src={selector.imageUrl}
                  alt={selector.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Info */}
            <div className="lg:col-span-8">
              <span className="text-xs font-semibold tracking-editorial uppercase text-primary mb-2 block">
                {selector.englishName} · SELECTor
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                {selector.name}
              </h1>
              <p className="text-lg text-primary font-medium mb-4">
                {selector.title}
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6 max-w-xl">
                {selector.bio}
              </p>

              {/* Expertise Tags */}
              <div className="mb-6">
                <p className="text-sm font-medium text-foreground mb-2">專業領域</p>
                <div className="flex flex-wrap gap-2">
                  {selector.expertise.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-primary-light text-primary text-sm rounded-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stats & Social */}
              <div className="flex items-center gap-6">
                <div>
                  <p className="text-2xl font-bold text-primary">{selector.articleCount}</p>
                  <p className="text-sm text-muted-foreground">篇文章</p>
                </div>
                {selector.socialLinks && (
                  <div className="flex items-center gap-3">
                    {selector.socialLinks.instagram && (
                      <a
                        href={selector.socialLinks.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Instagram className="w-5 h-5" />
                      </a>
                    )}
                    {selector.socialLinks.twitter && (
                      <a
                        href={selector.socialLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Twitter className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Articles */}
      <section className="py-12 md:py-16">
        <div className="container-editorial">
          <SectionHeader
            englishTitle={`ARTICLES BY ${selector.englishName}`}
            chineseTitle={`${selector.name} 的文章`}
            description={`探索 ${selector.name} 的專業評測和推薦`}
          />

          {selectorArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {selectorArticles.map((article) => (
                <ArticleCard
                  key={article.id}
                  id={article.id}
                  slug={(article as any).slug}
                  categorySlug={article.categorySlug}
                  title={article.title}
                  excerpt={article.excerpt}
                  imageUrl={article.imageUrl}
                  date={article.date}
                  isPR={article.isPR}
                  isFeatureReview={(article as any).isFeatureReview}
                  isShareArticle={(article as any).isShareArticle}
                  isComingSoon={(article as any).isComingSoon}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-muted rounded-sm">
              <p className="text-muted-foreground">
                此 SELECTor 暫無文章，敬請期待！
              </p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Selector;
