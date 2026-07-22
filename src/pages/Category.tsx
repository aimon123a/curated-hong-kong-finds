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
      id: "brandy-cake-0",
      name: "ロンシャン ブランデーケーキ",
      brand: "Longchamp",
      variant: "Longchamp ロンシャン",
      price: 140,
      originalPrice: 200,
      pairPrice: 210,
      imageUrl: "/assets/brandy/product-ronshan.jpg",
      badge: "首次試食",
    },
    {
      id: "brandy-cake-1",
      name: "いせり ブランデーケーキ 300g",
      brand: "Esery",
      variant: "Esery いせり 300g",
      price: 210,
      originalPrice: 300,
      pairPrice: 280,
      imageUrl: "/assets/brandy/product-esery.jpg",
      badge: "熱門",
    },
    {
      id: "brandy-cake-2",
      name: "THE OKURA TOKYO シャンパンケーキ",
      brand: "Hotel Okura",
      variant: "THE OKURA TOKYO 香檳蛋糕",
      price: 350,
      originalPrice: 500,
      pairPrice: 490,
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
      weight: 300,
      bundlePricing: { single: item.price, pair: item.pairPrice },
      originalPrice: item.originalPrice,
    });
    toast({
      title: "已加入購物車",
      description: `${item.name} × 1 條（可於購物車調整數量）`,
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
                {/* Brandy Cake article is rendered from articles array below */}
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
                    tags={
                      article.id === "brandy-cake"
                        ? ["白蘭地蛋糕", "日本手信", "熟成甜點", "送禮之選"]
                        : article.categorySlug === "beauty" && !(article as any).isComingSoon
                          ? ["抗背痘", "抗臭", "低刺激", "藥用沐浴露"]
                          : []
                    }
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
                        <p className="text-xs mt-1">
                          <span className="text-primary font-bold">HKD {item.price}</span>
                          <span className="text-muted-foreground line-through ml-1.5">HKD {item.originalPrice}</span>
                        </p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">2 條組合 HKD {item.pairPrice}</p>
                        <p className="text-[10px] text-muted-foreground mt-1 group-hover:text-primary transition-colors">+ 加入購物車（購物車可加減）</p>
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