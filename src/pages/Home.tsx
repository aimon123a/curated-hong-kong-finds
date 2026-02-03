import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import SectionHeader from "@/components/ui/SectionHeader";
import ArticleCard from "@/components/ui/ArticleCard";
import SelectorCard from "@/components/ui/SelectorCard";
import { articles, categories, selectors } from "@/data/sampleData";
import { ArrowRight } from "lucide-react";

const heroSlides = [
  {
    id: "01",
    category: "APPEARANCE MANAGEMENT",
    title: "外在管理",
    subtitle: "打造最佳形象的秘訣",
    description: "從護膚到健身，我們精選最有效的產品，助您展現最自信的一面。",
    link: "/category/beauty",
    buttonText: "瀏覽外在管理",
  },
  {
    id: "02",
    category: "HOME LIVING",
    title: "家居生活",
    subtitle: "品質居家的理想選擇",
    description: "精選家居好物，從廚房到臥室，讓每個角落都充滿品味與舒適。",
    link: "/category/kitchen",
    buttonText: "瀏覽家居生活",
  },
  {
    id: "03",
    category: "LIFESTYLE",
    title: "生活風格",
    subtitle: "定義個人風格的態度",
    description: "穿搭配件、生活小物，展現獨特品味，活出精彩每一天。",
    link: "/category/lifestyle",
    buttonText: "瀏覽生活風格",
  },
  {
    id: "04",
    category: "CURATED FOR YOU",
    title: "由專業編輯精選",
    subtitle: "最值得信賴的產品推薦",
    description: "我們深入研究每一款產品，從功效、使用體驗到性價比，為您提供最詳盡的評測和推薦。",
    link: "/articles",
    buttonText: "瀏覽所有文章",
  },
];

const Home = () => {
  const featuredArticles = articles.slice(0, 4);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const activeSlide = heroSlides[currentSlide];

  return (
    <Layout>
      {/* Hero Section with Carousel */}
      <section className="bg-background-warm py-16 md:py-24 relative overflow-hidden">
        <div className="container-editorial">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            {/* Content */}
            <div className="max-w-2xl transition-opacity duration-500">
              <span className="text-xs font-semibold tracking-editorial uppercase text-primary mb-4 block">
                {activeSlide.category}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-2 leading-tight">
                {activeSlide.title}
              </h1>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-6 leading-tight">
                {activeSlide.subtitle}
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-xl">
                {activeSlide.description}
              </p>
              <Link
                to={activeSlide.link}
                className="btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-sm font-medium"
              >
                {activeSlide.buttonText}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Slide Indicators */}
            <div className="flex lg:flex-col gap-4 lg:gap-6">
              {heroSlides.map((slide, index) => (
                <button
                  key={slide.id}
                  onClick={() => setCurrentSlide(index)}
                  className={`flex items-center gap-3 text-left transition-all duration-300 group ${
                    currentSlide === index ? "opacity-100" : "opacity-40 hover:opacity-70"
                  }`}
                >
                  <span
                    className={`text-sm font-bold tracking-wider ${
                      currentSlide === index ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {slide.id}
                  </span>
                  <div className="hidden lg:block">
                    <span
                      className={`text-sm font-medium block ${
                        currentSlide === index ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {slide.title}
                    </span>
                    {currentSlide === index && (
                      <div className="h-0.5 bg-primary mt-1 w-full" />
                    )}
                  </div>
                </button>
              ))}
            </div>
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