import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SectionHeader from "@/components/ui/SectionHeader";
import ArticleCard from "@/components/ui/ArticleCard";
import SelectorCard from "@/components/ui/SelectorCard";
import { articles, categories, selectors } from "@/data/sampleData";
import { ArrowRight } from "lucide-react";
const Home = () => {
  const featuredArticles = articles.slice(0, 4);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-background-warm py-16 md:py-24">
        <div className="container-editorial">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold tracking-editorial uppercase text-primary mb-4 block">
              CURATED FOR YOU
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              由專業編輯精選
              <br />
              <span className="text-primary">最值得信賴的產品推薦</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl">
              我們深入研究每一款產品，從功效、使用體驗到性價比，為您提供最詳盡的評測和推薦。
            </p>
            <Link
              to="/category/beauty"
              className="btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-sm font-medium"
            >
              瀏覽外在管理
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 md:py-16">
        <div className="container-editorial">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.values(categories).map((category) => (
              <Link
                key={category.slug}
                to={`/category/${category.slug}`}
                className="group relative h-48 md:h-64 overflow-hidden rounded-sm"
              >
                <img
                  src={category.imageUrl}
                  alt={category.chineseTitle}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="text-xs font-semibold tracking-editorial uppercase text-primary-light block mb-1">
                    {category.englishTitle}
                  </span>
                  <h3 className="text-xl font-bold text-background">
                    {category.chineseTitle}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-12 md:py-16 bg-muted">
        <div className="container-editorial">
          <SectionHeader
            englishTitle="FEATURED ARTICLES"
            chineseTitle="精選文章"
            description="編輯團隊為您挑選的熱門產品評測"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredArticles.map((article) => (
              <ArticleCard
                key={article.id}
                id={article.id}
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

          <div className="text-center mt-10">
            <Link
              to="/articles"
              className="btn-outline inline-flex items-center gap-2 px-6 py-3 rounded-sm font-medium"
            >
              查看更多文章
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* SELECTor Section */}
      <section className="py-12 md:py-16 bg-background-warm">
        <div className="container-editorial">
          <SectionHeader
            englishTitle="MEET OUR SELECTORS"
            chineseTitle="SELECTor"
            description="由各領域專家為您精選推薦"
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {selectors.map((selector) => (
              <SelectorCard key={selector.id} selector={selector} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/selectors"
              className="btn-outline inline-flex items-center gap-2 px-6 py-3 rounded-sm font-medium"
            >
              查看所有 SELECTor
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-12 md:py-16">
        <div className="container-editorial">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeader
                englishTitle="ABOUT US"
                chineseTitle="關於 jaagSELECT"
              />
              <p className="text-muted-foreground leading-relaxed mb-6">
                jaagSELECT HK 是一個專注於產品評測和推薦的平台。我們的編輯團隊由各領域的專家組成，致力於為香港消費者提供最可靠的購物指南。
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                每一篇評測都經過嚴謹的測試和分析，確保為您呈現最真實的產品表現。我們相信，好的選擇能讓生活更美好。
              </p>
              <Link
                to="/about"
                className="text-primary font-medium inline-flex items-center gap-1 link-underline"
              >
                了解更多
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="bg-primary-light rounded-sm p-8 md:p-12">
              <div className="grid grid-cols-2 gap-8 text-center">
                <div>
                  <p className="text-4xl font-bold text-primary mb-2">500+</p>
                  <p className="text-sm text-muted-foreground">產品評測</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-primary mb-2">50+</p>
                  <p className="text-sm text-muted-foreground">專業編輯</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-primary mb-2">100K+</p>
                  <p className="text-sm text-muted-foreground">月活躍讀者</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-primary mb-2">98%</p>
                  <p className="text-sm text-muted-foreground">讀者滿意度</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;