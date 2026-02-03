import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { articles, selectors } from "@/data/sampleData";
import { ArrowRight } from "lucide-react";

// Import hero background images
import beautyBg from "@/assets/hero/beauty-hero.jpg";
import homeBg from "@/assets/hero/home-hero.jpg";
import lifestyleBg from "@/assets/hero/lifestyle-hero.jpg";
import curatedBg from "@/assets/hero/curated-hero.jpg";

const heroSlides = [
  {
    id: "01",
    category: "APPEARANCE MANAGEMENT",
    title: "外在管理",
    lines: ["從護膚到健身，精選最有效的產品"],
    link: "/category/beauty",
    buttonText: "瀏覽",
    bgImage: beautyBg,
  },
  {
    id: "02",
    category: "HOME LIVING",
    title: "家居生活",
    lines: ["精選家居好物，讓每個角落都充滿品味"],
    link: "/category/kitchen",
    buttonText: "瀏覽",
    bgImage: homeBg,
  },
  {
    id: "03",
    category: "LIFESTYLE",
    title: "生活風格",
    lines: ["穿搭配件、生活小物，展現獨特品味"],
    link: "/category/lifestyle",
    buttonText: "瀏覽",
    bgImage: lifestyleBg,
  },
  {
    id: "04",
    category: "CURATED FOR YOU",
    title: "專業編輯精選",
    lines: ["深入評測每一款產品，為您提供最可靠推薦"],
    link: "/articles",
    buttonText: "瀏覽",
    bgImage: curatedBg,
  },
];

const Home = () => {
  const featuredArticles = articles.slice(0, 2);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(false);
    const timeout = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timeout);
  }, [activeIndex]);

  const activeSlide = heroSlides[activeIndex];

  return (
    <Layout hideFooter>
      <div className="h-[calc(100vh-4rem)] flex flex-col overflow-hidden">
        {/* Hero Section - takes about 45% */}
        <section className="relative flex-[0_0_45%] overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-r from-background-warm from-25% via-background-warm/60 via-45% to-transparent to-75% z-10" />
            <img 
              src={activeSlide.bgImage} 
              alt="" 
              className="absolute right-0 top-0 h-full w-2/3 object-cover object-center"
            />
          </div>

          <div className="container-editorial relative z-10 h-full flex items-center py-6">
            <div className="flex items-center gap-8 lg:gap-12 w-full">
              {/* Numbered Circles */}
              <div className="flex flex-col gap-3">
                {heroSlides.map((slide, index) => (
                  <button
                    key={slide.id}
                    onClick={() => setActiveIndex(index)}
                    className="group relative flex items-center justify-center transition-all duration-300"
                  >
                    <div
                      className={`w-10 h-10 md:w-12 md:h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                        activeIndex === index
                          ? "border-primary bg-primary text-primary-foreground scale-110"
                          : "border-foreground/30 text-foreground hover:border-primary hover:text-primary"
                      }`}
                    >
                      <span className="text-sm md:text-base font-bold tracking-wider">
                        {slide.id}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className={`transition-all duration-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
                  <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-primary mb-1 block">
                    {activeSlide.category}
                  </span>
                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2">
                    {activeSlide.title}
                  </h1>
                  <p className="text-sm md:text-base text-muted-foreground mb-4 max-w-md">
                    {activeSlide.lines[0]}
                  </p>
                  <Link
                    to={activeSlide.link}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-sm text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                  >
                    {activeSlide.buttonText}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom Section - 55% with 3 columns */}
        <section className="flex-1 bg-muted/50 border-t border-border">
          <div className="container-editorial h-full py-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-full">
              
              {/* Column 1: Featured Articles */}
              <div className="flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-xs font-semibold tracking-wider uppercase text-primary">精選文章</h2>
                  <Link to="/articles" className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1">
                    更多 <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
                <div className="space-y-2 flex-1">
                  {featuredArticles.map((article) => (
                    <Link
                      key={article.id}
                      to={`/category/${article.categorySlug}/share/${article.id}`}
                      className="block bg-card border border-border rounded-sm p-3 hover:border-primary/50 transition-colors group"
                    >
                      <div className="flex gap-3">
                        <img
                          src={article.imageUrl}
                          alt={article.title}
                          className="w-16 h-16 object-cover rounded-sm shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                            {article.title}
                          </h3>
                          <p className="text-xs text-muted-foreground mt-1">{article.date}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Column 2: SELECTor */}
              <div className="flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-xs font-semibold tracking-wider uppercase text-primary">SELECTor</h2>
                  <Link to="/selectors" className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1">
                    更多 <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
                <div className="bg-card border border-border rounded-sm p-4 flex-1 flex flex-col justify-center">
                  <div className="flex items-center gap-4">
                    {selectors.slice(0, 1).map((selector) => (
                      <Link
                        key={selector.id}
                        to={`/selector/${selector.id}`}
                        className="group flex items-center gap-3"
                      >
                        <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-primary/20 group-hover:border-primary transition-colors shrink-0">
                          <img
                            src={selector.imageUrl}
                            alt={selector.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">
                            {selector.name}
                          </h3>
                          <p className="text-xs text-muted-foreground">{selector.articleCount} 篇文章</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
                    如果你有專業知識和熱情，歡迎加入我們的團隊，分享你的專業見解與真實評測。
                  </p>
                </div>
              </div>

              {/* Column 3: About & Stats */}
              <div className="flex flex-col">
                <div className="mb-3">
                  <h2 className="text-xs font-semibold tracking-wider uppercase text-primary">關於 jaagSELECT</h2>
                </div>
                <div className="bg-primary-light rounded-sm p-4 flex-1">
                  <div className="grid grid-cols-2 gap-3 text-center h-full content-center">
                    <div>
                      <p className="text-2xl font-bold text-primary">1+</p>
                      <p className="text-[10px] text-muted-foreground">產品評測</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-primary">1+</p>
                      <p className="text-[10px] text-muted-foreground">專業編輯</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-primary">500+</p>
                      <p className="text-[10px] text-muted-foreground">月活躍讀者</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-primary">99%</p>
                      <p className="text-[10px] text-muted-foreground">讀者滿意度</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Home;
