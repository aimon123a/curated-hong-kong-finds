import { useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import CategoryHero from "@/components/ui/CategoryHero";
import SectionHeader from "@/components/ui/SectionHeader";
import ArticleCard from "@/components/ui/ArticleCard";
import { getCategoryBySlug, getArticlesByCategory } from "@/data/sampleData";

const Category = () => {
  const { slug } = useParams<{ slug: string }>();
  const category = getCategoryBySlug(slug || "");
  const articles = getArticlesByCategory(slug || "");

  if (!category) {
    return (
      <Layout>
        <div className="container-editorial py-20 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            找不到此分類
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
      {/* Hero */}
      <CategoryHero
        englishTitle={category.englishTitle}
        chineseTitle={category.chineseTitle}
        description={category.description}
        imageUrl={category.imageUrl}
      />

      {/* Articles */}
      <section className="py-12 md:py-16">
        <div className="container-editorial">
          <SectionHeader
            englishTitle="ARTICLES"
            chineseTitle="相關文章"
            description={`探索${category.chineseTitle}的最新評測和推薦`}
          />

          {articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <ArticleCard
                  key={article.id}
                  id={article.id}
                  categorySlug={article.categorySlug}
                  title={article.title}
                  excerpt={article.excerpt}
                  imageUrl={article.imageUrl}
                  date={article.date}
                  isPR={article.isPR}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-muted rounded-sm">
              <p className="text-muted-foreground">
                此分類暫無文章，敬請期待！
              </p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Category;