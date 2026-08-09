import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import HighlightedHeading from "@/components/article/HighlightedHeading";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { useJsonLd } from "@/hooks/useJsonLd";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/hooks/use-toast";
import { getProductDetailById } from "@/data/sampleData";
import { ChevronRight, Clock, ShoppingCart, BookOpen, Sparkles, Package, Snowflake, Timer, Coffee, Droplets, Wine } from "lucide-react";
import benjaminPhoto from "@/assets/selectors/kei.jpg";

const V2IMG = "/assets/brandy/v2";
const IMG = "/assets/brandy";

/** 日式螢光筆高亮 (your SELECT. marker style) */
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

const INDEX_ITEMS = [
  { id: "intro", title: "01 一款，兩種場合：犒賞自己或體面送禮" },
  { id: "instructions", title: "02 日本官方說明書：全文完整翻譯" },
  { id: "aging", title: "03 什麼是「育てる蛋糕」？熟成時間線解析" },
  { id: "taste", title: "04 口感與風味實測：橫切面拆解" },
  { id: "three-seconds", title: "05 三秒的秘密：酒香浮現的時間軸" },
  { id: "mood", title: "06 食用情境：夜晚，一片剛剛好" },
  { id: "specs", title: "07 商品詳細規格與注意事項" },
];

const BrandyCakeV2 = () => {
  useDocumentMeta({
    title: "ロンシャン 熟成白蘭地蛋糕評測｜越放越香濃的大人系甜點 · jaagSELECT",
    description:
      "編輯團隊實測 Longchamp 熟成白蘭地蛋糕：官方說明書全文翻譯、熟成時間線秘密、橫切面實拍與香港代購價格（HK$140／條）。",
    ogTitle: "ロンシャン 熟成白蘭地蛋糕 — 將時間與白蘭地封存",
    ogDescription: "官方說明書全文翻譯、熟成秘密與實拍評測，附香港代購價。",
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
      <div className="sticky top-16 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container-editorial py-3">
          <nav className="flex items-center gap-2 text-sm flex-wrap" aria-label="麵包屑導覽">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">首頁</Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <Link to="/category/lifestyle" className="text-muted-foreground hover:text-foreground transition-colors">飲食品味</Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <span className="text-foreground font-medium line-clamp-1">ロンシャン 熟成白蘭地蛋糕</span>
          </nav>
        </div>
      </div>

      <div className="bg-muted/30 py-8 md:py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">

          {/* Header */}
          <header className="mb-8 bg-white p-6 md:p-8 rounded-2xl border border-border shadow-sm">
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <span className="px-3 py-1 text-xs font-semibold bg-primary text-primary-foreground rounded-md">日本職人甜點</span>
              <span className="px-3 py-1 text-xs font-semibold bg-secondary text-secondary-foreground rounded-md">深度編輯評測</span>
            </div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4 leading-tight tracking-tight">
              ロンシャン 熟成白蘭地蛋糕｜<br className="hidden md:block" />
              將時間與白蘭地封存的大人系甜點
            </h1>

            <div className="bg-muted/50 border-l-4 border-primary p-4 rounded-r-lg mb-6">
              <p className="text-base text-foreground leading-relaxed">
                想找一款成熟不甜膩的日本質感手信，或是夜晚獨享的療癒甜點？這款 Longchamp 熟成白蘭地蛋糕，以扎實的奶油蛋糕底浸滿香濃白蘭地。隨着靜置時間越長，酒香與蛋糕的融合度越高。本文由 jaagSELECT 編輯團隊進行深度實測，為你完整翻譯日本官方說明書、拆解熟成風味，並提供香港直送代購指南。
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs md:text-sm text-muted-foreground pt-4 border-t border-border">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <time dateTime="2026-08-09">2026.08.09</time>
              </div>
              <span>•</span>
              <span>閱讀時間約 4 分鐘</span>
            </div>
          </header>

          {/* 01 HERO（REAL）3 欄組合圖 */}
          <figure className="mb-8 rounded-2xl overflow-hidden border border-border shadow-sm bg-white p-2">
            <div className="grid grid-cols-3 gap-2">
              <div className="relative overflow-hidden rounded-lg">
                <img src={`${IMG}/story-gift.jpg`} alt="白蘭地蛋糕作為送禮情境實拍" className="w-full aspect-[3/4] object-cover" fetchPriority="high" />
                <span className="absolute bottom-2 left-2 bg-foreground/70 text-background text-[10px] px-2 py-0.5 rounded backdrop-blur-sm">01. 體面送禮</span>
              </div>
              <div className="relative overflow-hidden rounded-lg">
                <img src={`${V2IMG}/brandy-cake-package-2.jpg`} alt="Longchamp 白蘭地蛋糕深棕色禮盒開盒實拍" className="w-full aspect-[3/4] object-cover" fetchPriority="high" />
                <span className="absolute bottom-2 left-2 bg-foreground/70 text-background text-[10px] px-2 py-0.5 rounded backdrop-blur-sm">02. 日本原裝</span>
              </div>
              <div className="relative overflow-hidden rounded-lg">
                <img src={`${IMG}/night.png`} alt="夜晚獨享一片白蘭地蛋糕的情境" className="w-full aspect-[3/4] object-cover" loading="lazy" />
                <span className="absolute bottom-2 left-2 bg-foreground/70 text-background text-[10px] px-2 py-0.5 rounded backdrop-blur-sm">03. 深夜獨享</span>
              </div>
            </div>
          </figure>

          {/* 02 30 秒速覽（REAL） */}
          <section className="bg-white border border-border rounded-2xl p-6 md:p-8 mb-10 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-primary uppercase mb-4">
              <Sparkles className="w-4 h-4" />
              <span>30 秒單品速覽 ・ SUMMARY</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] gap-6 items-start">
              <img
                src={`${V2IMG}/brandy-cake-package-1.jpg`}
                alt="ロンシャン 白蘭地蛋糕 日式包裝紙與緞帶"
                className="w-full aspect-square object-cover rounded-xl border border-border"
                loading="lazy"
              />
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">
                  ロンシャン 熟成白蘭地蛋糕（Longchamp Brandy Cake）
                </h2>
                <p className="text-muted-foreground leading-relaxed text-sm mb-4">
                  「將時間與白蘭地封存，越放越香濃的成熟系甜點。」
                </p>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {["適合送禮體面", "大人感微醺", "可常溫／冷藏保存"].map((t) => (
                    <span key={t} className="px-2.5 py-1 text-xs font-medium bg-muted text-foreground border border-border rounded-md">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-xs text-muted-foreground line-through">HK$200</span>
                  <span className="text-2xl font-bold text-foreground">HK$140 <span className="text-xs font-normal text-muted-foreground">/ 條</span></span>
                </div>
                <p className="text-xs text-muted-foreground mb-5">2 條組合價 HK$210（購物車內系統自動計算）</p>
                <button
                  type="button"
                  onClick={addToCart}
                  className="inline-flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground px-6 py-3 rounded-xl font-medium text-sm hover:bg-primary/90 transition-all shadow-sm"
                >
                  <ShoppingCart className="w-4 h-4" />
                  加入購物車
                </button>
              </div>
            </div>
          </section>

          {/* 日系目錄 INDEX */}
          <nav className="bg-muted/60 border border-border rounded-2xl p-6 mb-12" aria-label="本篇目次">
            <div className="flex items-center gap-2 text-sm font-bold text-foreground mb-3 border-b border-border pb-2">
              <BookOpen className="w-4 h-4 text-primary" />
              <span>本篇目次 ・ INDEX</span>
            </div>
            <ul className="space-y-2 text-sm text-foreground">
              {INDEX_ITEMS.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="hover:text-primary hover:underline transition-colors flex items-center gap-1.5">
                    <span className="text-primary font-medium">›</span> {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* 03 第一章（REAL） */}
          <section id="intro" className="mb-12 bg-white p-6 md:p-8 rounded-2xl border border-border shadow-sm scroll-mt-32">
            <HighlightedHeading variant="primary">01 一款，兩種場合：犒賞自己，或體面送禮</HighlightedHeading>
            <img
              src={`${V2IMG}/brandy-cake-package-1.jpg`}
              alt="復古優雅的日式包裝紙與緞帶包裹的白蘭地蛋糕禮盒"
              className="w-full aspect-[4/3] object-cover rounded-xl mb-6 border border-border"
              loading="lazy"
            />
            <p className="text-foreground leading-relaxed text-base md:text-lg">
              復古優雅的日式包裝紙配上緞帶，內層為極具厚重感的深棕色硬盒。包裝精緻，無論是獨享的夜晚，或是作為心意手信送給講究的朋友，<Mark>都顯得成熟而體面</Mark>。
            </p>
          </section>

          {/* 04 官方說明（REAL 照片 + 譯文卡） */}
          <section id="instructions" className="mb-12 bg-white p-6 md:p-8 rounded-2xl border border-border shadow-sm scroll-mt-32">
            <HighlightedHeading variant="secondary">02 日本官方說明書：全文完整翻譯</HighlightedHeading>
            <p className="text-sm text-muted-foreground mb-6">
              jaagSELECT 編輯團隊為你完整對照翻譯盒內附帶的兩張日文說明卡，清楚掌握原廠建議的品嚐細節：
            </p>

            <div className="space-y-8">
              {/* Card 1 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                <figure className="rounded-xl overflow-hidden border border-border bg-muted/40">
                  <img src={`${V2IMG}/brandy-cake-card-translation-1.jpg`} alt="ギフトブランデーケーキ 日文官方說明卡" className="w-full aspect-[4/5] object-cover" loading="lazy" />
                  <figcaption className="text-xs text-center text-muted-foreground py-1.5">日文卡片一：產品介紹</figcaption>
                </figure>
                <div className="bg-primary-light/60 border border-primary/30 rounded-xl p-5 space-y-3">
                  <div className="font-bold text-primary border-b border-primary/20 pb-1.5 flex items-center justify-between gap-2 flex-wrap">
                    <span className="text-sm">【卡片一：全文完整翻譯】</span>
                    <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded">禮物白蘭地蛋糕</span>
                  </div>
                  <p className="text-foreground leading-relaxed text-xs md:text-sm">
                    「本產品使用大量新鮮奶油與蛋黃烘焙，是充分發揮白蘭地芳醇香氣的現代風格蛋糕。直接食用固然美味，但若<Mark>放入冰箱充分冷藏後再品嚐</Mark>，風味會更上一層樓。」
                  </p>
                  <p className="text-muted-foreground leading-relaxed text-xs md:text-sm pt-2 border-t border-primary/15">
                    「無論是作為贈禮或手信，相信都能讓您十分滿意。我們已盡最大注意製作，萬一有任何不便或瑕疵，請攜帶本品至購買門市，我們將立即為您更換。」
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                <figure className="rounded-xl overflow-hidden border border-border bg-muted/40">
                  <img src={`${V2IMG}/brandy-cake-card-translation-2.jpg`} alt="ブランデーケーキのおいしいお召し上がり方 日文說明卡" className="w-full aspect-[4/5] object-cover" loading="lazy" />
                  <figcaption className="text-xs text-center text-muted-foreground py-1.5">日文卡片二：熟成與吃法</figcaption>
                </figure>
                <div className="bg-accent-light/70 border border-accent/30 rounded-xl p-5 space-y-3">
                  <div className="font-bold text-foreground border-b border-accent/30 pb-1.5 flex items-center justify-between gap-2 flex-wrap">
                    <span className="text-sm">【卡片二：全文完整翻譯】</span>
                    <span className="text-[10px] bg-accent/20 text-foreground px-2 py-0.5 rounded">美味品嚐方式</span>
                  </div>
                  <p className="text-foreground leading-relaxed text-xs md:text-sm">
                    「本店的白蘭地蛋糕，是在優質海綿蛋糕中注入滿滿白蘭地糖漿所製成。與一般的鮮奶油蛋糕不同，透過花時間讓其慢慢熟成，能品嚐到更加圓潤、芳醇的美味。」
                  </p>
                  <p className="text-foreground leading-relaxed text-xs md:text-sm">
                    「通常我們提供製造日起熟成約 1 個月的產品，但若您將其<Mark>放在冰箱冷藏靜置 2 個月、3 個月</Mark>，風味會變得<Mark>更加深邃</Mark>。（保存時請注意避免乾燥。請參照製造日期後慢慢享用。製造日：26. 6. -9／門市：ロンシャン洋菓子店）」
                  </p>
                </div>
              </div>
            </div>

            {/* EDITORIAL：保存方式流程 */}
            <div className="mt-8 bg-muted/40 border border-border rounded-2xl p-6">
              <div className="text-xs font-bold text-primary tracking-wider uppercase mb-5 text-center">
                EDITORIAL GRAPHIC ・ 保存方式
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                {[
                  { t: "未開封", d: "常溫陰涼處保存", Icon: Package },
                  { t: "開封後", d: "冷藏保存並密封", Icon: Snowflake },
                  { t: "建議", d: "盡早享用完畢", Icon: Timer },
                ].map((s) => (
                  <div key={s.t} className="bg-white border border-border rounded-xl p-4">
                    <s.Icon className="w-6 h-6 mx-auto mb-2 text-primary" strokeWidth={1.5} />
                    <div className="text-sm font-bold text-foreground mb-1">{s.t}</div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{s.d}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-center text-muted-foreground mt-4 border border-dashed border-border rounded-lg py-2">
                避免高溫與陽光直射
              </p>
            </div>
          </section>

          {/* 05 熟成時間線（EDITORIAL） */}
          <section id="aging" className="mb-12 bg-white p-6 md:p-8 rounded-2xl border border-border shadow-sm scroll-mt-32">
            <HighlightedHeading variant="secondary">03 什麼是「育てる蛋糕」？熟成時間線解析</HighlightedHeading>
            <p className="text-foreground leading-relaxed mb-6">
              日本人有一個說法，叫「育てるブランデーケーキ」——會長大的白蘭地蛋糕。意思是它買回家之後才開始熟成：酒會繼續往糕體深處走，一天一個味道。<Mark>熟成不是變甜了，而是白蘭地香氣不再急著出來</Mark>。
            </p>

            <div className="bg-muted/40 border border-border rounded-2xl p-6">
              <div className="text-xs font-bold text-primary tracking-wider uppercase mb-5 text-center">
                EDITORIAL GRAPHIC ・ 熟成三個階段演變
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                {[
                  { s: "STAGE 01", m: "1ST MONTH（出廠時）", n: 1, tag: "酒香外放直白", d: "甜味與白蘭地各自站好位置，酒感像剛開瓶般鮮明，適合喜歡直白酒感的人。" },
                  { s: "STAGE 02", m: "2ND MONTH（靜置冷藏）", n: 2, tag: "香氣開始交融", d: "酒液慢慢滲透進糕體核心，濕潤感顯著提升，吞下後 2–3 秒酒香才慢慢浮現。" },
                  { s: "STAGE 03", m: "3RD MONTH（極致熟成）", n: 3, tag: "圓潤深邃「しっとり」", d: "牛油、蛋香與白蘭地完美融為一體，烈酒感轉化為溫潤尾韻，綿密感達到頂峰。" },
                ].map((st) => (
                  <div key={st.s} className="bg-white p-4 rounded-xl border border-border flex flex-col justify-between">
                    <div>
                      <div className="text-xs font-bold text-muted-foreground mb-1">{st.s}</div>
                      <div className="text-sm font-bold text-foreground mb-2">{st.m}</div>
                      <div className="flex justify-center gap-1 mb-2">{Array.from({ length: st.n }).map((_, i) => (<Wine key={i} className="w-5 h-5 text-primary" strokeWidth={1.5} />))}</div>
                      <div className="text-xs font-semibold text-primary bg-primary/5 py-1 rounded mb-2">{st.tag}</div>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{st.d}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-center text-foreground mt-4 border border-dashed border-border rounded-lg py-2">
                不是變甜了，是酒香沒有那麼急著出來。
              </p>
            </div>
          </section>

          {/* 06 口感與風味實測（REAL） */}
          <section id="taste" className="mb-12 bg-white p-6 md:p-8 rounded-2xl border border-border shadow-sm scroll-mt-32">
            <HighlightedHeading variant="secondary">04 口感與風味實測</HighlightedHeading>

            <div className="relative rounded-2xl overflow-hidden border border-border mb-6">
              <div className="grid grid-cols-2 gap-0.5 bg-border">
                <img src={`${V2IMG}/brandy-cake-cross-section-1.jpg`} alt="白蘭地蛋糕橫切面：吸滿酒液的密實糕體" className="w-full aspect-[4/5] object-cover" loading="lazy" />
                <img src={`${V2IMG}/brandy-cake-cross-section-2.jpg`} alt="切片後的白蘭地蛋糕與整條蛋糕" className="w-full aspect-[4/5] object-cover" loading="lazy" />
              </div>

              <div className="absolute top-3 left-3 bg-background/90 backdrop-blur-md border border-border rounded-lg p-2 shadow-lg">
                <div className="text-xs font-bold text-foreground flex items-center gap-1"><Wine className="w-3.5 h-3.5" />表皮刷滿白蘭地</div>
                <span className="text-[10px] text-muted-foreground">外層吸滿芳醇酒液</span>
              </div>
              <div className="absolute bottom-3 left-3 bg-background/90 backdrop-blur-md border border-border rounded-lg p-2 shadow-lg">
                <div className="text-xs font-bold text-foreground flex items-center gap-1"><Droplets className="w-3.5 h-3.5" />しっとり 濕潤密實</div>
                <span className="text-[10px] text-muted-foreground">入口完全不乾澀</span>
              </div>
              <div className="absolute bottom-3 right-3 bg-background/90 backdrop-blur-md border border-border rounded-lg p-2 shadow-lg">
                <div className="text-xs font-bold text-foreground flex items-center gap-1"><Coffee className="w-3.5 h-3.5" />配黑咖啡極致犒賞</div>
                <span className="text-[10px] text-muted-foreground">解膩且提昇酒香</span>
              </div>
            </div>

            <ul className="space-y-4 text-foreground leading-relaxed">
              <li className="bg-muted/40 p-4 rounded-xl border border-border">
                <h3 className="font-bold text-foreground text-base mb-1">扎實濕潤的糕體（しっとり）</h3>
                <p className="text-sm">
                  傳統的老式蛋糕底，剛切開就能看到吸滿白蘭地酒液的密實橫切面，<Mark>入口完全不乾澀</Mark>。
                </p>
              </li>
              <li className="bg-muted/40 p-4 rounded-xl border border-border">
                <h3 className="font-bold text-foreground text-base mb-1">層次豐富的酒香餘韻</h3>
                <p className="text-sm">
                  入口先是濃郁的牛油與蛋香，<Mark>吞下後兩三秒，白蘭地的橡木桶香氣才從喉底慢慢浮上來</Mark>。甜度適中，尾韻乾淨，非常適合搭配黑咖啡或無糖濃茶。
                </p>
              </li>
            </ul>
          </section>

          {/* 07 三秒的秘密（EDITORIAL 時間軸） */}
          <section id="three-seconds" className="mb-12 bg-white p-6 md:p-8 rounded-2xl border border-border shadow-sm scroll-mt-32">
            <HighlightedHeading variant="secondary">05 三秒的秘密：酒香浮現的時間軸</HighlightedHeading>
            <div className="bg-muted/40 border border-border rounded-2xl p-6">
              <div className="text-xs font-bold text-primary tracking-wider uppercase mb-1 text-center">
                EDITORIAL GRAPHIC ・ 三秒的秘密
              </div>
              <p className="text-xs text-center text-muted-foreground mb-5">入口 → 吞下 → 三秒後酒香出現</p>
              <ol className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { t: "0s", d: "牛油、蛋香" },
                  { t: "1s", d: "吞下去" },
                  { t: "2s", d: "……" },
                  { t: "3s", d: "白蘭地來了。" },
                ].map((p) => (
                  <li key={p.t} className="bg-white border border-border rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-foreground mb-1">{p.t}</div>
                    <div className="h-px bg-border my-2" />
                    <p className="text-xs text-muted-foreground leading-relaxed">{p.d}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* 08 食用情境（MOOD） */}
          <section id="mood" className="mb-12 rounded-2xl overflow-hidden border border-border shadow-sm scroll-mt-32">
            <figure className="relative">
              <img src={`${IMG}/night.png`} alt="夜晚書桌上的一片白蘭地蛋糕與一杯黑咖啡" className="w-full aspect-[3/2] object-cover" loading="lazy" />
              <figcaption className="absolute inset-x-0 bottom-0 bg-foreground/60 backdrop-blur-sm text-background p-4 md:p-6">
                <div className="text-sm md:text-base font-bold mb-1">夜晚，一片剛剛好</div>
                <p className="text-xs md:text-sm leading-relaxed opacity-90">什麼都不配，只是專心感受這塊蛋糕的時間。</p>
              </figcaption>
            </figure>
          </section>

          {/* 09 商品規格（REAL + EDITORIAL） */}
          <section id="specs" className="mb-12 bg-white p-6 md:p-8 rounded-2xl border border-border shadow-sm scroll-mt-32">
            <HighlightedHeading variant="accent">07 商品詳細規格與注意事項</HighlightedHeading>
            <div className="overflow-x-auto border border-border rounded-xl bg-white">
              <table className="w-full min-w-[500px] text-sm">
                <tbody>
                  {SPECS.map(([k, v], i) => (
                    <tr key={k} className={i % 2 ? "bg-muted/40" : ""}>
                      <th scope="row" className="text-left align-top font-semibold text-muted-foreground whitespace-nowrap px-4 py-3.5 border-b border-border w-32">
                        {k}
                      </th>
                      <td className="text-foreground px-4 py-3.5 border-b border-border leading-relaxed text-xs md:text-sm">{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Epilogue */}
          <section className="mb-12 bg-white p-6 md:p-8 rounded-2xl border border-border shadow-sm">
            <blockquote className="bg-muted/40 border border-border rounded-xl p-6">
              <p className="text-foreground leading-relaxed text-base">
                「這不是我吃過最好吃的蛋糕。但它是目前，<Mark>我最想讓別人品嚐的一塊</Mark>。『最好吃』三個字，我不敢用——世界那麼大，總有更驚艷的。但如果有一天有人問我：『去日本只能帶一樣甜點回來，你會選什麼？』現在我大概會把這塊白蘭地蛋糕放進答案裡。」
              </p>
              <footer className="flex items-center gap-3 mt-6 pt-4 border-t border-border">
                <img src={benjaminPhoto} alt="Benjamin" className="w-10 h-10 rounded-full object-cover border border-border" />
                <div className="text-xs">
                  <div className="font-bold text-foreground">Benjamin</div>
                  <div className="text-muted-foreground">jaagSELECT 編輯團隊</div>
                </div>
              </footer>
            </blockquote>
          </section>

          {/* 10 CTA（REAL） */}
          <div className="bg-primary text-primary-foreground rounded-2xl p-6 md:p-8 text-center shadow-lg">
            <h3 className="text-lg font-bold mb-2">日本熟成白蘭地蛋糕（Longchamp Brandy Cake）</h3>
            <p className="text-primary-foreground/80 text-sm mb-6">
              首次試食價 HK$140／條 ・ 2 條組合價 HK$210
            </p>
            <button
              type="button"
              onClick={addToCart}
              className="inline-flex items-center justify-center gap-2 bg-background text-primary px-8 py-3.5 rounded-xl font-bold text-sm hover:bg-background/90 transition-all shadow-md"
            >
              <ShoppingCart className="w-4 h-4" />
              立即加入購物車
            </button>
            <p className="text-[11px] text-primary-foreground/70 mt-4">預訂制，約 2–3 週日本直送到港。產品含酒精成分。</p>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default BrandyCakeV2;
