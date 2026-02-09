import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SectionHeader from "@/components/ui/SectionHeader";
import ArticleCard from "@/components/ui/ArticleCard";
import { articles } from "@/data/sampleData";
import { ChevronRight } from "lucide-react";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

const Articles = () => {
  useDocumentMeta({
    title: "所有文章 - Clearex Wi 評測｜背痘沐浴露推薦",
    description: "瀏覽 jaagSELECT HK 全部評測文章。Clearex Wi 真實評測、背痘護理知識、日本藥用沐浴露推薦。",
    canonical: "/articles",
  });

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
            <span className="text-foreground font-medium">
              所有文章
            </span>
          </nav>
        </div>
      </div>

      {/* Articles */}
      <section className="py-12 md:py-16">
        <div className="container-editorial">
          <SectionHeader
            englishTitle="ALL ARTICLES"
            chineseTitle="所有文章"
            description="瀏覽我們的全部評測文章"
          />

          {articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
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
                暫無文章，敬請期待！
              </p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Articles;
