import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import HighlightedHeading from "@/components/article/HighlightedHeading";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { useJsonLd } from "@/hooks/useJsonLd";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/hooks/use-toast";
import { getProductDetailById } from "@/data/sampleData";
import { ChevronRight, Clock, ShoppingCart } from "lucide-react";
import benjaminPhoto from "@/assets/selectors/kei.jpg";

const V2IMG = "/assets/brandy/v2";

const Mark = ({ children }: { children: React.ReactNode }) => (
  <mark className="jp-marker">{children}</mark>
);

const SPECS: Array<[string, string]> = [
  ["商品名稱", "ロンシャン ブランデーケーキ（Longchamp Brandy Cake）"],
  ["主要成份", "雞蛋、砂糖、麵粉、新鮮奶油、白蘭地利口酒、杏仁粉"],
  ["保存方式", "請存放在陰涼避光處，開封後建議冷藏並密封保存"],
  ["賞味期限", "未開啟製造日起約 1–3 個月（隨熟成時間呈現不同風味）"],
  ["產地／來源", "日本原裝直送"],
  ["注意事項", "本產品含有較高酒精成分，孕婦、兒童及酒精過敏者不宜食用"],
];

const BrandyCakeV2 = () => {
  useDocumentMeta({
    title: "ロンシャン 熟成白蘭地蛋糕評測｜越放越香濃的大人系甜點 · jaagSELECT",
    description:
      "編輯團隊實測 Longchamp 熟成白蘭地蛋糕：官方吃法翻譯、熟成時間秘密、糕體橫切面實拍與香港代購價格（HK$140／條）。",
    ogTitle: "ロンシャン 熟成白蘭地蛋糕 — 將時間與白蘭地封存",
    ogDescription: "官方吃法翻譯、熟成秘密與實拍評測，附香港代購價。",
    ogType: "article",
    canonical: "/brandy-cake-v2",
  });

  useJsonLd({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "ロンシャン 熟成白蘭地蛋糕 深度評測",
    inLanguage: "zh-HK",
    author: { "@type": "Person", name: "Benjamin" },
    publisher: { "@type": "Organization", name: "jaagSELECT" },
    mainEntityOfPage: { "@type": "WebPage", "@id": "https://jaagselect.com/brandy-cake-v2" },
  });

  const { addItem } = useCart();

  const addToCart = () => {
    const product = getProductDetailById("brandy-cake");
    if (!product) return;
    const v = product.variants[0];
    const hasBundle = !!(v.singlePrice && v.pairPrice);
    addItem({
      id: `${product.id}-0`,
      name: product.name,
      brand: product.brand,
      variant: v.size,
      price: hasBundle ? v.singlePrice! : parseInt(v.price),
      quantity: 1,
      imageUrl: v.imageUrl || product.imageUrl,
      weight: 300,
      ...(hasBundle && {
        bundlePricing: { single: v.singlePrice!, pair: v.pairPrice! },
        originalPrice: v.originalSingle,
      }),
    });
    toast({ title: "已加入購物車", description: `${product.name} × 1 條（可於購物車調整數量）` });
  };

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="sticky top-16 z-40 bg-muted/95 backdrop-blur-sm border-b border-border">
        <div className="container-editorial py-3">
          <nav className="flex items-center gap-2 text-sm flex-wrap">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">首頁</Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <Link to="/category/lifestyle" className="text-muted-foreground hover:text-foreground transition-colors">飲食品味</Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <span className="text-foreground font-medium line-clamp-1">ロンシャン 熟成白蘭地蛋糕</span>
          </nav>
        </div>
      </div>

      <div className="container-editorial py-8 md:py-12">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <header className="mb-8">
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <span className="px-3 py-1 text-xs font-medium bg-primary text-primary-foreground rounded-sm">日本甜點</span>
              <span className="px-3 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-sm">單品評測</span>
            </div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4 leading-tight">
              ロンシャン 熟成白蘭地蛋糕｜<br className="hidden md:block" />
              將時間與白蘭地封存的大人系甜點
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              一款外表平凡的日本熟成蛋糕，吞下去兩三秒後，酒香才從喉底慢慢浮上來。
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground pb-6 border-b border-border">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <time dateTime="2026-08-09">2026.08.09</time>
              </div>
              <span>•</span>
              <span>閱讀時間約 3 分鐘</span>
            </div>
          </header>

          {/* Hero photo */}
          <figure className="bg-white border border-border rounded-xl overflow-hidden mb-8">
            <img src={`${V2IMG}/brandy-cake-package-2.jpg`} alt="ロンシャン 白蘭地蛋糕 深棕色禮盒開盒實拍" className="w-full h-[280px] md:h-[420px] object-cover object-center" fetchPriority="high" />
          </figure>

          {/* 30-second summary card */}
          <section className="bg-white border border-border rounded-xl p-6 md:p-8 mb-12 shadow-sm">
            <div className="text-xs font-medium tracking-widest text-muted-foreground mb-3">30 秒單品速覽 ・ SUMMARY</div>
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">
              ロンシャン 熟成白蘭地蛋糕（Longchamp Brandy Cake）
            </h2>
            <p className="text-foreground leading-relaxed mb-5">
              「將時間與白蘭地封存，越放越香濃的成熟系甜點。」
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {["適合送禮體面", "大人感微醺", "可常溫／冷藏長期保存"].map((t) => (
                <span key={t} className="px-3 py-1 text-xs font-medium bg-muted text-foreground border border-border rounded-full">
                  {t}
                </span>
              ))}
            </div>
            <div className="flex items-end gap-3 mb-1">
              <span className="text-sm text-muted-foreground line-through">HK$200</span>
              <span className="text-3xl font-bold text-foreground">HK$140<span className="text-base font-normal text-muted-foreground"> / 條</span></span>
            </div>
            <p className="text-sm text-muted-foreground mb-6">2 條組合價 HK$210（購物車內自訂數量，系統自動計算）</p>
            <button
              type="button"
              onClick={addToCart}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-primary text-primary-foreground px-8 py-3 rounded-sm font-medium text-sm hover:bg-primary/90 transition-all shadow-md hover:shadow-lg"
            >
              <ShoppingCart className="w-4 h-4" />
              加入購物車
            </button>
          </section>

          {/* Section 1 */}
          <section className="mb-12">
            <HighlightedHeading variant="primary">一款，兩種場合：犒賞自己，或體面送禮</HighlightedHeading>
            <img src={`${V2IMG}/brandy-cake-package-1.jpg`} alt="復古優雅的日式包裝紙與緞帶包裹的白蘭地蛋糕禮盒" className="w-full object-cover rounded-xl mb-6" loading="lazy" />
            <p className="text-foreground leading-relaxed text-lg">
              復古優雅的日式包裝紙配上緞帶，內層為極具厚重感的深棕色硬盒。
              <Mark>整條送禮體面而不誇張</Mark>，收的人沒有壓力，送的人很有分寸。
            </p>
          </section>

          {/* Section 2 */}
          <section className="mb-12">
            <HighlightedHeading variant="secondary">日本官方說明書翻譯</HighlightedHeading>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <figure className="rounded-xl overflow-hidden border border-border bg-white">
                <img src={`${V2IMG}/brandy-cake-card-translation-1.jpg`} alt="ギフトブランデーケーキ 日文官方說明卡" className="w-full object-cover" loading="lazy" />
              </figure>
              <figure className="rounded-xl overflow-hidden border border-border bg-white">
                <img src={`${V2IMG}/brandy-cake-card-translation-2.jpg`} alt="ブランデーケーキのおいしいお召し上がり方 日文說明卡" className="w-full object-cover" loading="lazy" />
              </figure>
            </div>

            <div className="mt-6 space-y-4">
              <blockquote className="bg-white border-l-4 border-primary border border-border rounded-xl p-5 md:p-6">
                <div className="text-sm font-bold text-primary mb-2">【官方建議吃法】</div>
                <p className="text-foreground leading-relaxed">
                  嚴選優質新鮮奶油與蛋黃烘焙，並讓糕體充分吸收芳醇的白蘭地糖漿。直接食用固然美味，但
                  <Mark>強烈建議放入冰箱充分冰鎮後再品嚐</Mark>，風味會更上一層樓。
                </p>
              </blockquote>
              <blockquote className="bg-white border-l-4 border-secondary border border-border rounded-xl p-5 md:p-6">
                <div className="text-sm font-bold text-foreground mb-2">【熟成時間的秘密】</div>
                <p className="text-foreground leading-relaxed">
                  與普通鮮奶油蛋糕不同，這款蛋糕會隨時間慢慢熟成。出廠時雖已經過 1 個月的初步熟成，但若
                  <Mark>放在冰箱冷藏靜置 2 至 3 個月</Mark>，酒香與糕體的<Mark>融合度會更深邃</Mark>。
                </p>
              </blockquote>
            </div>
          </section>

          {/* Section 3 */}
          <section className="mb-12">
            <HighlightedHeading variant="secondary">口感與風味實測</HighlightedHeading>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">
              <div className="space-y-4">
                <img src={`${V2IMG}/brandy-cake-cross-section-1.jpg`} alt="白蘭地蛋糕橫切面：吸滿酒液的密實糕體" className="w-full object-cover rounded-xl" loading="lazy" />
                <img src={`${V2IMG}/brandy-cake-cross-section-2.jpg`} alt="切片後的白蘭地蛋糕與整條蛋糕" className="w-full object-cover rounded-xl" loading="lazy" />
              </div>
              <ul className="space-y-5">
                <li>
                  <h3 className="text-base md:text-lg font-bold text-foreground mb-2">扎實濕潤的糕體（しっとり）</h3>
                  <p className="text-foreground leading-relaxed">
                    傳統的老式蛋糕底，剛切開就能看到吸滿白蘭地酒液的密實橫切面，<Mark>入口完全不乾澀</Mark>。
                  </p>
                </li>
                <li>
                  <h3 className="text-base md:text-lg font-bold text-foreground mb-2">層次豐富的酒香餘韻</h3>
                  <p className="text-foreground leading-relaxed">
                    入口先是濃郁的牛油與蛋香，<Mark>吞下後兩三秒，白蘭地的橡木桶香氣才從喉底慢慢浮上來</Mark>。甜度適中，尾韻乾淨，非常適合搭配黑咖啡或無糖濃茶。
                  </p>
                </li>
              </ul>
            </div>
          </section>

          {/* Spec table */}
          <section className="mb-12">
            <HighlightedHeading variant="accent">商品規格</HighlightedHeading>
            <div className="overflow-x-auto border border-border rounded-xl bg-white">
              <table className="w-full min-w-[560px] text-sm">
                <tbody>
                  {SPECS.map(([k, v], i) => (
                    <tr key={k} className={i % 2 ? "bg-muted/40" : ""}>
                      <th scope="row" className="text-left align-top font-medium text-muted-foreground whitespace-nowrap px-4 py-3 border-b border-border w-36">
                        {k}
                      </th>
                      <td className="text-foreground px-4 py-3 border-b border-border leading-relaxed">{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Epilogue */}
          <section className="mb-12">
            <blockquote className="bg-muted/50 border border-border rounded-xl p-6 md:p-8">
              <p className="text-foreground leading-loose text-lg">
                這不是我吃過最好吃的蛋糕。但它是目前，<Mark>我最想讓別人品嚐的一塊</Mark>。「最好吃」三個字，我不敢用——世界那麼大，總有更驚艷的。但如果有一天有人問我：「去日本只能帶一樣甜點回來，你會選什麼？」現在我大概會把這塊白蘭地蛋糕放進答案裡。
              </p>
              <footer className="flex items-center gap-3 mt-6 pt-6 border-t border-border">
                <img src={benjaminPhoto} alt="Benjamin" className="w-10 h-10 rounded-full object-cover" />
                <div className="text-sm">
                  <div className="font-medium text-foreground">Benjamin</div>
                  <div className="text-muted-foreground">jaagSELECT 編輯團隊</div>
                </div>
              </footer>
            </blockquote>
          </section>

          {/* Bottom CTA */}
          <div className="bg-white border border-border rounded-xl p-6 text-center">
            <p className="text-foreground mb-4">
              首次試食價 HK$140／條・2 條組合 HK$210
            </p>
            <button
              type="button"
              onClick={addToCart}
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-sm font-medium text-sm hover:bg-primary/90 transition-all shadow-md hover:shadow-lg"
            >
              <ShoppingCart className="w-4 h-4" />
              加入購物車
            </button>
            <p className="text-xs text-muted-foreground mt-3">預訂制，約 2–3 週到港。產品含酒精成分。</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BrandyCakeV2;
