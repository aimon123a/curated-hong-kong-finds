import { useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import CategoryHero from "@/components/ui/CategoryHero";
import SectionHeader from "@/components/ui/SectionHeader";
import ArticleCard from "@/components/ui/ArticleCard";
import { getCategoryBySlug, getArticlesByCategory, productDetails } from "@/data/sampleData";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { ShoppingCart } from "lucide-react";

const Category = () => {
  const { slug } = useParams<{ slug: string }>();
  const category = getCategoryBySlug(slug || "");
  const articles = getArticlesByCategory(slug || "");
  const { addItem } = useCart();
  const { toast } = useToast();

  useDocumentMeta({
    title: category ? `${category.chineseTitle} - 產品評測與推薦` : undefined,
    description: category ? category.description : undefined,
    canonical: slug ? `/category/${slug}` : undefined,
  });

  // Get CLEAREX-Wi product for quick add buttons
  const clearexProduct = productDetails.find(p => p.id === "clearex-wi");

  const handleQuickAdd = (variantIndex: number) => {
    if (!clearexProduct) return;
    const variant = clearexProduct.variants[variantIndex];
    addItem({
      id: `${clearexProduct.id}-${variantIndex}`,
      name: clearexProduct.name,
      brand: clearexProduct.brand,
      variant: variant.size,
      price: parseInt(variant.price),
      quantity: 1,
      imageUrl: variant.imageUrl || clearexProduct.imageUrl,
      weight: 200,
    });
    toast({
      title: "已加入購物車",
      description: `${clearexProduct.name} (${variant.size})`,
    });
  };

  const brandyItems = [
    {
      id: "brandy-ronshan",
      name: "ロンシャン ブランデーケーキ",
      brand: "Longchamp",
      variant: "標準裝",
      price: 188,
      imageUrl: "/assets/brandy/product-ronshan.jpg",
      badge: "推薦",
    },
    {
      id: "brandy-esery",
      name: "いせり ブランデーケーキ 300g",
      brand: "Esery",
      variant: "300g",
      price: 288,
      imageUrl: "/assets/brandy/product-esery.jpg",
      badge: "熱門",
    },
    {
      id: "brandy-okura",
      name: "THE OKURA TOKYO シャンパンケーキ",
      brand: "Hotel Okura",
      variant: "標準裝",
      price: 588,
      imageUrl: "/assets/brandy/product-okura.jpg",
      badge: "推薦",
    },
  ];

  const handleBrandyAdd = (index: number) => {
    const item = brandyItems[index];
    addItem({
      id: item.id,
      name: item.name,
      brand: item.brand,
      variant: item.variant,
      price: item.price,
      quantity: 1,
      imageUrl: item.imageUrl,
      weight: 400,
    });
    toast({
      title: "已加入購物車",
      description: `${item.name}`,
    });
  };

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

          {(articles.length > 0 || slug === "lifestyle") ? (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {slug === "lifestyle" && (
                  <ArticleCard
                    id="brandy-cake"
                    slug="brandy-cake"
                    categorySlug="lifestyle"
                    title="「大人」的甜點，屬於自己的贅沢時刻"
                    excerpt="一塊外表平凡的白蘭地蛋糕，吞下去之後才浮現的酒香——三種價位，三種選擇。"
                    imageUrl="/assets/brandy/night.png"
                    date="2026.07.22"
                    isShareArticle
                    tags={["白蘭地蛋糕", "日本手信", "熟成"]}
                  />
                )}
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
                    tags={article.categorySlug === "beauty" && !(article as any).isComingSoon ? ["抗背痘", "抗臭", "低刺激", "藥用沐浴露"] : []}
                  />
                ))}
              </div>

              {/* Quick Add-to-Cart Section */}
              {slug === "beauty" && clearexProduct && (
                <div className="bg-card border border-border rounded-sm p-6">
                  <h3 className="text-base font-bold text-foreground mb-4 flex items-center gap-2">
                    <ShoppingCart className="w-4 h-4 text-primary" />
                    快速加入購物車
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {clearexProduct.variants.map((variant, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuickAdd(index)}
                        className="relative border border-border rounded-sm p-3 hover:border-primary hover:bg-primary/5 transition-colors text-left group"
                      >
                        {variant.size === "450ml" && (
                          <span className="absolute -top-2 right-2 px-1.5 py-0.5 text-[10px] font-bold bg-orange-500 text-white rounded-sm">熱門</span>
                        )}
                        {variant.size === "抗痘套裝" && (
                          <span className="absolute -top-2 right-2 px-1.5 py-0.5 text-[10px] font-bold bg-primary text-primary-foreground rounded-sm">推薦</span>
                        )}
                        <p className="text-sm font-medium text-foreground">{variant.size}</p>
                        <p className="text-xs text-primary font-bold mt-1">HKD {variant.price}</p>
                        <p className="text-[10px] text-muted-foreground mt-1 group-hover:text-primary transition-colors">+ 加入購物車</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {slug === "lifestyle" && (
                <div className="bg-card border border-border rounded-sm p-6">
                  <h3 className="text-base font-bold text-foreground mb-4 flex items-center gap-2">
                    <ShoppingCart className="w-4 h-4 text-primary" />
                    快速加入購物車
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {brandyItems.map((item, index) => (
                      <button
                        key={item.id}
                        onClick={() => handleBrandyAdd(index)}
                        className="relative border border-border rounded-sm p-3 hover:border-primary hover:bg-primary/5 transition-colors text-left group"
                      >
                        <span className={`absolute -top-2 right-2 px-1.5 py-0.5 text-[10px] font-bold rounded-sm ${item.badge === "熱門" ? "bg-orange-500 text-white" : "bg-primary text-primary-foreground"}`}>
                          {item.badge}
                        </span>
                        <p className="text-sm font-medium text-foreground line-clamp-1">{item.name}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{item.brand}</p>
                        <p className="text-xs text-primary font-bold mt-1">HKD {item.price}</p>
                        <p className="text-[10px] text-muted-foreground mt-1 group-hover:text-primary transition-colors">+ 加入購物車</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}
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