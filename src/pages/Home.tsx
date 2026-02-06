import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import SectionHeader from "@/components/ui/SectionHeader";
import ArticleCard from "@/components/ui/ArticleCard";
import SelectorCard from "@/components/ui/SelectorCard";
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
    lines: [
      "從護膚到健身",
      "我們精選最有效的產品",
      "助您展現最自信的一面",
    ],
    link: "/category/beauty",
    buttonText: "瀏覽外在管理",
    bgImage: beautyBg,
  },
  {
    id: "02",
    category: "HOME LIVING",
    title: "家居生活",
    lines: [
      "精選家居好物",
      "從廚房到臥室",
      "讓每個角落都充滿品味與舒適",
    ],
    link: "/category/kitchen",
    buttonText: "瀏覽家居生活",
    bgImage: homeBg,
  },
  {
    id: "03",
    category: "LIFESTYLE",
    title: "生活風格",
    lines: [
      "穿搭配件、生活小物",
      "展現獨特品味",
      "活出精彩每一天",
    ],
    link: "/category/lifestyle",
    buttonText: "瀏覽生活風格",
    bgImage: lifestyleBg,
  },
  {
    id: "04",
    category: "CURATED FOR YOU",
    title: "由專業編輯精選",
    subtitle: "最值得信賴的產品推薦",
    lines: [
      "我們深入研究每一款產品",
      "從功效、使用體驗到性價比",
      "為您提供最詳盡的評測和推薦",
    ],
    link: "/articles",
    buttonText: "瀏覽所有文章",
    bgImage: curatedBg,
  },
];

const Home = () => {
  const featuredArticles = articles.slice(0, 4);
  const [activeIndex, setActiveIndex] = useState<number>(0); // Default to 01
  const [visibleLines, setVisibleLines] = useState<number[]>([]);

  // When activeIndex changes, animate lines one by one
  useEffect(() => {
    setVisibleLines([]);
    const slide = heroSlides[activeIndex];
    const totalLines = (slide.subtitle ? 1 : 0) + slide.lines.length;
    
    const timeouts: NodeJS.Timeout[] = [];
    
    for (let i = 0; i < totalLines; i++) {
      const timeout = setTimeout(() => {
        setVisibleLines(prev => [...prev, i]);
      }, 150 * (i + 1));
      timeouts.push(timeout);
    }

    return () => timeouts.forEach(t => clearTimeout(t));
  }, [activeIndex]);

  const activeSlide = heroSlides[activeIndex];

  return (
    <Layout>
      <section className="relative min-h-[80vh] md:min-h-[85vh] overflow-hidden">
        {/* Background Image - positioned center-right */}
        <div className="absolute inset-0 transition-all duration-700">
          <div className="absolute inset-0 bg-gradient-to-r from-background-warm from-30% via-background-warm/70 via-50% to-transparent to-80% z-10" />
          <img 
            src={activeSlide.bgImage} 
            alt="" 
            className="absolute right-0 top-0 h-full w-full md:w-3/4 lg:w-2/3 object-cover object-center"
            fetchPriority="high"
            decoding="async"
          />
        </div>

        <div className="container-editorial relative z-10 py-16 md:py-24 min-h-[80vh] md:min-h-[85vh] flex items-center">
          <div className="flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-20 w-full">
            {/* Left: Numbered Circles */}
            <div className="flex flex-row lg:flex-col gap-6 lg:gap-8">
              {heroSlides.map((slide, index) => (
                <button
                  key={slide.id}
                  onClick={() => setActiveIndex(index)}
                  className={`group relative flex items-center justify-center transition-all duration-300`}
                >
                  <div
                    className={`w-14 h-14 md:w-16 md:h-16 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                      activeIndex === index
                        ? "border-primary bg-primary text-primary-foreground scale-110"
                        : "border-foreground/30 text-foreground hover:border-primary hover:text-primary hover:scale-105"
                    }`}
                  >
                    <span className="text-lg md:text-xl font-bold tracking-wider">
                      {slide.id}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Right: Content */}
            <div className="flex-1 min-h-[300px]">
              <div className="animate-fade-in" key={activeIndex}>
                {/* Category */}
                <span 
                  className={`text-xs font-semibold tracking-[0.2em] uppercase block mb-4 transition-all duration-300 ${
                    visibleLines.length > 0 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                  } text-primary`}
                >
                  {activeSlide.category}
                </span>

                {/* Title */}
                <h1 
                  className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight transition-all duration-500 ${
                    visibleLines.length > 0 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  } text-foreground`}
                >
                  {activeSlide.title}
                </h1>

                {/* Subtitle (only for slide 04) */}
                {activeSlide.subtitle && (
                  <h2 
                    className={`text-2xl md:text-3xl lg:text-4xl font-bold mb-8 leading-tight transition-all duration-500 delay-100 ${
                      visibleLines.includes(0) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    } text-primary`}
                  >
                    {activeSlide.subtitle}
                  </h2>
                )}

                {/* Lines appear one by one */}
                <div className="space-y-3 mb-10">
                  {activeSlide.lines.map((line, lineIndex) => {
                    const adjustedIndex = activeSlide.subtitle ? lineIndex + 1 : lineIndex;
                    return (
                      <p
                        key={lineIndex}
                        className={`text-lg md:text-xl transition-all duration-500 ${
                          visibleLines.includes(adjustedIndex) 
                            ? "opacity-100 translate-y-0" 
                            : "opacity-0 translate-y-4"
                        } text-muted-foreground`}
                        style={{ transitionDelay: `${adjustedIndex * 100}ms` }}
                      >
                        {line}
                      </p>
                    );
                  })}
                </div>

                {/* Button */}
                <Link
                  to={activeSlide.link}
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-sm font-medium transition-all duration-500 ${
                    visibleLines.length >= activeSlide.lines.length 
                      ? "opacity-100 translate-y-0" 
                      : "opacity-0 translate-y-4"
                  } bg-primary text-primary-foreground hover:bg-primary/90`}
                >
                  {activeSlide.buttonText}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
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
          
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
            {/* Selector Cards */}
            <div className="flex flex-wrap gap-6">
              {selectors.map((selector) => (
                <Link
                  key={selector.id}
                  to={`/selector/${selector.id}`}
                  className="group flex flex-col items-center text-center"
                >
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-primary/20 group-hover:border-primary transition-colors mb-3">
                    <img
                      src={selector.imageUrl}
                      alt={selector.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">
                    {selector.name}
                  </h3>
                  <span className="text-sm text-muted-foreground">
                    {selector.articleCount} 篇文章
                  </span>
                </Link>
              ))}
            </div>

            {/* Join Us CTA */}
            <div className="flex-1 lg:max-w-md">
              <div className="bg-card border border-border rounded-sm p-6 md:p-8">
                <h3 className="text-xl font-bold text-foreground mb-4">
                  成為 SELECTor
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  如果你在某個領域有專業知識和熱情，歡迎加入我們的團隊，與更多人分享你的專業見解與真實評測。
                </p>
                <Link
                  to="/selectors"
                  className="btn-primary inline-flex items-center gap-2 px-5 py-2.5 rounded-sm font-medium text-sm"
                >
                  了解更多
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
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
                  <p className="text-4xl font-bold text-primary mb-2">1+</p>
                  <p className="text-sm text-muted-foreground">產品評測</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-primary mb-2">1+</p>
                  <p className="text-sm text-muted-foreground">專業編輯</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-primary mb-2">500+</p>
                  <p className="text-sm text-muted-foreground">月活躍讀者</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-primary mb-2">99%</p>
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
