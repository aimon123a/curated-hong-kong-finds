// Sample data for the jaagSELECT HK website

import ansonImage from "@/assets/selectors/kei.jpg";
import vicImage from "@/assets/selectors/vic.jpg";
import gilImage from "@/assets/selectors/gil.jpg";
import jacImage from "@/assets/selectors/jac.jpg";
import kurageYuyuImage from "@/assets/selectors/kurage-yuyu.png";
import clearexWiImage from "@/assets/products/clearex-wi.png";
import clearexWiMainImage from "@/assets/products/clearex-wi-bottle-only.png";
import clearexWi200mlImage from "@/assets/products/clearex-wi-200ml.webp";
import clearexWi380mlRefillImage from "@/assets/products/clearex-wi-380ml-refill.jpg";
import clearexWiAntiAcneSetImage from "@/assets/products/clearex-wi-anti-acne-set.jpg";

// Clearex Wi article images
import clearexWiProductImage from "@/assets/articles/clearex-wi-product.jpg";
import clearexWiStoreImage from "@/assets/articles/clearex-wi-store.jpg";
import clearexWiBeforeAfterImage from "@/assets/articles/clearex-wi-before-after.jpg";
import clearexWiComboImage from "@/assets/articles/clearex-wi-combo.jpg";
import clearexWiSizesImage from "@/assets/articles/clearex-wi-sizes.jpg";
import backAcneInfo1Image from "@/assets/articles/back-acne-info-1.jpg";
import backAcneInfo2Image from "@/assets/articles/back-acne-info-2.jpg";
import backAcneCausesImage from "@/assets/articles/back-acne-causes.jpg";
import backAcneTipsImage from "@/assets/articles/back-acne-tips.jpg";
import backAcneDietImage from "@/assets/articles/back-acne-diet.jpg";
import comingSoonPreviewImage from "@/assets/articles/coming-soon-preview.png";

// Hero images for categories
import beautyHeroImage from "@/assets/hero/beauty-hero.jpg";
import homeHeroImage from "@/assets/hero/home-hero.jpg";
import lifestyleHeroImage from "@/assets/hero/lifestyle-hero.jpg";

export interface Selector {
  id: string;
  name: string;
  englishName: string;
  title: string;
  specialty: string;
  bio: string;
  imageUrl: string;
  articleCount: number;
  expertise: string[];
  socialLinks?: {
    instagram?: string;
    twitter?: string;
  };
}

export const categories = {
  beauty: {
    slug: "beauty",
    englishTitle: "BEAUTY APPLIANCES",
    chineseTitle: "外在管理",
    description: "精選美容家電，從護膚到美髮，編輯團隊為您挑選最值得入手的產品。",
    imageUrl: beautyHeroImage,
  },
  "home-living": {
    slug: "home-living",
    englishTitle: "HOME LIVING",
    chineseTitle: "家居生活",
    description: "打造理想居家空間，精選實用家品、收納好物與生活質感提升的推薦。",
    imageUrl: homeHeroImage,
  },
  lifestyle: {
    slug: "lifestyle",
    englishTitle: "LIFESTYLE",
    chineseTitle: "生活風格",
    description: "提升生活品質的精選好物，為您的日常增添美感與便利。",
    imageUrl: lifestyleHeroImage,
  },
};

export const selectors: Selector[] = [
  {
    id: "anson",
    name: "Benjamin",
    englishName: "BENJAMIN",
    title: "身體護理專員",
    specialty: "身體暗瘡控制",
    bio: "擁有超過29年生暗瘡經驗，專注於身體肌膚護理研究。曾在瞼部降落火箭 (月球表面) ，對暗瘡成因及護理有深入了解。希望自己都值得擁有健康自信的肌膚。",
    imageUrl: ansonImage,
    articleCount: 2,
    expertise: ["身體暗瘡", "背部護理", "去角質", "身體乳液"],
    socialLinks: {
      instagram: "#",
    },
  },
];

export const articles = [
  // Brandy Cake feature article
  {
    id: "brandy-cake",
    slug: "brandy-cake",
    categorySlug: "lifestyle",
    selectorId: "anson",
    title: "「大人」的甜點，屬於自己的贅沢時刻",
    excerpt: "一塊外表平凡的白蘭地蛋糕，和它吞下去之後才浮現的酒香。",
    imageUrl: "/assets/brandy/night.png",
    date: "2026.07.22",
    isPR: false,
    isFeatureReview: true,
    isShareArticle: false,
    author: {
      name: "Benjamin",
      title: "生活品格",
      imageUrl: ansonImage,
    },
  },
  // Coming Soon placeholder article
  {
    id: "coming-soon-001",
    slug: "coming-soon",
    categorySlug: "home-living",
    selectorId: "anson",
    title: "「？？？」 親自評測中，敬請期待",
    excerpt: "敬請期待我們的下一篇深度評測文章！",
    imageUrl: comingSoonPreviewImage,
    date: "2026.02.03",
    isPR: false,
    isFeatureReview: true,
    isShareArticle: true,
    isComingSoon: true,
    author: {
      name: "Benjamin",
      title: "身體護理專家",
      imageUrl: ansonImage,
    },
  },
  // Benjamin's Feature Article 2 - Back Acne Solution (from Word doc)
  {
    id: "anson-clearex-wi-v2",
    slug: "clearex-wi",
    categorySlug: "beauty",
    selectorId: "anson",
    title: "第一三共 Clearex-WI 真的有用嗎？親自評測",
    excerpt: "日本製藥大廠「第一三共」研發低刺激藥用沐浴露，專治身體暗瘡。旅遊日本時偶遇的背痘救星！",
    imageUrl: clearexWiProductImage,
    date: "2026.02.01",
    isPR: false,
    isFeatureReview: true,
    isShareArticle: true,
    author: {
      name: "Benjamin",
      title: "身體護理專家",
      imageUrl: ansonImage,
    },
    content: `
      <div class="lead-text">
        <p>油脂性皮膚跟咗我29年，之前喺網上面見到啲人話呢隻予防ニキビ（暗瘡）嘅沐浴露好用就買黎試吓。</p>
      </div>
    `,
    featureProduct: {
      id: "clearex-wi-v2",
      productId: "clearex-wi",
      name: "CLEAREX-Wi 低刺激抗菌藥用沐浴乳",
      brand: "第一三共 DAIICHI SANKYO",
      price: "100-220",
      imageUrl: clearexWiMainImage,
      rating: 4.9,
      productType: "醫藥部外品",
      subtitle: "クリアレックスWi",
      tagline: "去痘計劃，正式啟動！",
      // Custom article content from Word doc
      articleContent: {
        heroImages: [clearexWiProductImage, clearexWiStoreImage],
        intro: {
          title: "前言：與背痘奮鬥的日子",
          content: "油性肌膚伴隨了我29年，之前在網上看到有人推薦這款專門預防暗瘡的沐浴露，便決定購入試用。"
        },
        // New: Japanese recommendation section with Twitter embed data
        japaneseRecommendation: {
          title: "日本網友真實評價",
          intro: "說到我認識 CLEAREX 的契機，其實也是來自社交媒體上的分享。不少用戶都表示：「真的有效！」",
          mainTweet: {
            tweetUrl: "https://x.com/curage_yuyu/status/1413406216072568835",
            username: "くらげゆゆちゃん",
            handle: "curage_yuyu",
            date: "午後3:54 · 2021年7月9日",
            content: "夏に向けて背中ニキビで悩んでる人には、ドラストとかでも買えるこの2つのダブル使いが特におすすめ。どっちも低刺激で弱酸性なのに、ニキビの元を殺菌しつつ炎症も抑えてくれる。ボディーソープとしてクリアレックスを使って、お風呂上がりにセナキュアを背中にスプレーするだけでOK。",
            translation: "夏天快到了，背痘令你困擾嗎？這兩款產品在藥妝店就能買到，特別推薦組合使用！\n\n✨ 兩者都是低刺激弱酸性配方\n🎯 殺菌消炎雙管齊下\n\n用法超簡單：沐浴時使用 CLEAREX Wi，洗澡後把背粒消噴在背部就OK！",
            imageUrl: clearexWiComboImage,
            likes: 7294,
            avatarUrl: kurageYuyuImage,
          },
          replies: [
            {
              username: "ray",
              handle: "vt6q_7",
              date: "Jul 10, 2021",
              content: "全く同じケアをしています！まだすべすべ！ってほどではないですが、ニキビだらけで悲惨だった背中がだいぶマシになりたした☺",
              translation: "我也用同一套方法！雖然還沒完全光滑，但以前滿背都是痘真的超慘，現在已經好很多了☺",
            },
            {
              username: "くらげゆゆちゃん",
              handle: "curage_yuyu",
              date: "Jul 9, 2021",
              content: "ちなみにうちは使い始めて二週間くらいで目に見えて赤みが減りました。今も使い続けてますがすべすべです。背中ニキビ跡も目立ちにくくなってきたので、引き続き使っていきます☺",
              translation: "順帶一提，我用了大約兩週後紅腫明顯減少了。現在還在持續使用，皮膚超光滑！背痘痕跡也越來越不明顯，會繼續用下去☺",
              avatarUrl: kurageYuyuImage,
            },
          ],
        },
        trialResults: {
          title: "個人試用30日的效果",
          subtitle: "CLEAREX-Wi + 背粒消",
          image: clearexWiBeforeAfterImage,
          content: "個人感受背部明顯平滑了，發炎情況也減少了。參考日本用家的使用心得，CLEAREX-Wi 低刺激抗菌藥用沐浴乳搭配在屈臣氏購買的背粒消，雙管齊下，即使長出新痘痘也能很快消炎，非常舒適。",
          recommendation: "對於因夏季即將來臨而為背部痘痘煩惱的人，特別推薦這兩個即使在藥妝店也能買到的產品組合使用。兩者皆為低刺激性且弱酸性，能同時殺菌引發背部痘的源頭並抑制發炎。",
          usage: "只需將 CLEAREX Wi 作為沐浴乳使用，並在沐浴後將 背粒消 噴在背部即可。"
        },
        comboImage: clearexWiComboImage,
        productSizes: {
          image: clearexWiSizesImage,
          title: "CLEAREX-Wi 低刺激抗菌藥用沐浴乳",
          description: "含有殺菌成分和消炎成分，能夠有效殺菌清潔，解決引起體臭、痘痘等肌膚問題的細菌。",
          variants: [
            { size: "200ml", price: "100 元（~2,000 円）" },
            { size: "450ml", price: "220 元（~4,400 円）" },
            { size: "補充用 380ml", price: "180 元（~3,600 円）" }
          ]
        },
        knowledge: {
          title: "背痘知識：對症下藥",
          sections: [
            {
              question: "原來背部痘痘大部分是毛囊炎？",
              image: backAcneInfo1Image,
              content: ""
            },
            {
              question: "背部痘的成因",
              image: backAcneInfo2Image,
              content: "汗水積聚、皮脂分泌、紫外線照射和壓力都可能導致金黃色葡萄球菌和馬拉色菌繁殖，引起炎症，最終導致背部痤瘡。這正是香港濕熱天氣和加班地獄的完美組合。"
            },
            {
              question: "改善背痘的六大方法",
              content: "1. 丟掉沐浴球：沐浴球使用後很難徹底沖洗乾淨，容易細菌黴菌滋生，建議用手洗澡最安全\n\n2. 使用低敏抗菌沐浴乳：選擇無香料、不含過多油脂的沐浴乳，如 CLEAREX-Wi\n\n3. 護髮完再洗身體：避免護髮乳中的致痘成分殘留在身體上\n\n4. 定期換床單：身體的皮屑、油脂容易殘留在床單，建議每周更換\n\n5. 運動後立刻洗澡：汗水和油脂是細菌的溫床，運動完盡快清潔\n\n6. 多喝水、少吃刺激食物：身體長痘代表處於微發炎狀態，多喝水有助加速代謝"
            },
            {
              question: "容易冒痘的五大禁忌飲食",
              content: "痘痘的產生其實和體內發炎、免疫力下降也有高度關聯：\n\n1. 精緻碳水及高糖食物：麵包、蛋糕、手搖杯等，是導致身體長期發炎的元凶\n\n2. 油炸燒烤食物：高油燥熱，刺激皮脂腺促使粉刺、痘痘生成\n\n3. 酒類：酒精含糖分偏高，攝取過量可能導致臉部泛紅、破壞膠原蛋白\n\n4. 乳製品：哈佛研究顯示，乳製品吃較多的人長痘機率增加 22%\n\n5. 麩質食物：麵條、麵包等麵粉製品，部分人對麩質不耐受容易引起發炎"
            }
          ]
        },
        features: {
          title: "CLEAREX-Wi 特徵",
          subtitle: "對付背痘 殺菌消炎",
          list: [
            {
              point: "含有殺菌成分異丙基甲基苯酚",
              detail: "殺菌和淨化導致皮膚問題（如異味和痤瘡）的細菌。"
            },
            {
              point: "含有甘草酸二鉀作為抗發炎成分",
              detail: "創造清潔的皮膚環境，預防皮膚問題。"
            },
            {
              point: "低過敏配方，弱酸性，無香料",
              detail: "經過敏測試。我們考慮了它對皮膚的溫和程度。※無法保證所有人都不會過敏。"
            }
          ]
        },
        hashtags: ["#ClearexWi", "#背痘救星"]
      },
      keyPoints: [
        {
          title: "殺菌成分異丙基甲基苯酚 (IPMP)",
          icon: "shield",
          description: "殺菌和淨化導致皮膚問題（如異味和痤瘡）的細菌。",
          details: [
            {
              label: "功效",
              value: "深層滲透毛孔，根除導致痘痘的細菌"
            },
            {
              label: "額外好處",
              value: "同時消除體臭來源的雜菌"
            }
          ]
        },
        {
          title: "甘草酸二鉀抗發炎成分",
          icon: "heart",
          description: "創造清潔的皮膚環境，預防皮膚問題。",
          details: [
            {
              label: "功效",
              value: "鎮定發炎紅腫的皮膚"
            },
            {
              label: "額外好處",
              value: "防止痘痘進一步惡化"
            }
          ]
        },
        {
          title: "低過敏配方",
          icon: "sparkles",
          description: "弱酸性、無香料，經過敏測試。我們考慮了它對皮膚的溫和程度。",
          details: [
            {
              label: "弱酸性",
              value: "貼近皮膚天然 pH 值"
            },
            {
              label: "無香料",
              value: "減少對敏感皮膚的刺激"
            }
          ]
        }
      ],
      specs: [
        { label: "品牌", value: "第一三共 (DAIICHI SANKYO)" },
        { label: "產品名稱", value: "CLEAREX-Wi (クリアレックスWi)" },
        { label: "產品類別", value: "醫藥部外品" },
        { label: "容量選擇", value: "200ml / 450ml / 380ml 補充用" },
        { label: "主要成分", value: "異丙基甲基苯酚、甘草酸二鉀" },
        { label: "pH值", value: "弱酸性" },
        { label: "產地", value: "日本" },
        { label: "適用對象", value: "背部暗瘡、敏感肌、運動愛好者" },
      ],
      pros: [
        "雙重藥用成分：殺菌同時抗炎",
        "弱酸性配方，溫和不刺激",
        "無香料，敏感肌適用",
        "同時解決體臭問題",
        "日本製藥大廠出品，品質保證",
        "30日試用明顯見效",
      ],
      cons: [
        "香港較難購買，需代購或日本藥妝店購入",
        "價格比一般沐浴露稍高",
      ],
      buyLinks: [
        { name: "日本亞馬遜", url: "#", price: "180" },
        { name: "樂天市場", url: "#", price: "175" },
      ],
      usageGuide: {
        title: "建議使用方法",
        steps: [
          "運動後或大量出汗後盡快洗澡",
          "取適量 CLEAREX Wi 於掌心或沐浴球",
          "著重清洗背部、胸口等易出油部位",
          "輕柔按摩讓有效成分滲透",
          "以清水徹底沖洗乾淨",
          "沐浴後將 背粒消 噴在背部（可選）"
        ],
        tips: "雙管齊下效果更佳！配合背粒消使用，就算有新痘都好快消炎。"
      },
      verdict: {
        title: "Benjamin 的真實感受",
        content: "個人感受背部明顯平滑了，發炎情況也減少了。使用了30日，真的看到了改變。對於香港這種濕熱天氣以及經常加班的打工一族，這款產品真的是救星！推薦給同樣受背痘困擾的你。"
      }
    },
  },
  // Future articles (saved for later):
  // - Gil: "家用健身器材推薦：10款高CP值居家訓練好物"
  // - Jac: "益生菌完整指南：6款腸道健康補充品評測"
];

export const products = {
  "prod-001": {
    id: "prod-001",
    name: "YAMAN 光療美容儀 HRF-S",
    brand: "YAMAN",
    price: "3,980",
    originalPrice: "4,580",
    imageUrl: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=600&h=600&fit=crop",
    ],
    rating: 4.8,
    reviewCount: 128,
    description: "YAMAN HRF-S 是一款結合多種先進技術的專業級美容儀。採用RF射頻技術深層加熱真皮層，促進膠原蛋白再生；搭配LED紅光療法，改善膚質和膚色。獨特的離子導入功能，讓護膚精華更深層滲透。",
    features: [
      "RF射頻技術：深層加熱，促進膠原蛋白增生",
      "LED紅光療法：改善膚質，提亮膚色",
      "EMS微電流：提拉緊緻，雕塑輪廓",
      "離子導入：加強精華吸收",
      "溫感護理：舒適溫熱，放鬆肌膚",
    ],
    specs: [
      { label: "產品名稱", value: "YAMAN 光療美容儀 HRF-S" },
      { label: "產品尺寸", value: "180 x 45 x 45mm" },
      { label: "重量", value: "約220g" },
      { label: "充電時間", value: "約2.5小時" },
      { label: "使用時間", value: "約30分鐘（滿電）" },
      { label: "防水等級", value: "IPX5" },
      { label: "電壓", value: "AC100-240V 50/60Hz" },
      { label: "產地", value: "日本" },
      { label: "保養", value: "一年原廠保養" },
    ],
    buyLinks: [
      { name: "官方網站", url: "#", price: "3,980" },
      { name: "HKTVmall", url: "#", price: "4,080" },
      { name: "Amazon", url: "#", price: "4,200" },
    ],
    relatedArticles: ["bk001"],
  },
  "prod-002": {
    id: "prod-002",
    name: "Dr.Arrivo Zeus II",
    brand: "Dr.Arrivo",
    price: "5,680",
    originalPrice: null,
    imageUrl: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&h=600&fit=crop",
    ],
    rating: 4.7,
    reviewCount: 86,
    description: "日本頂級美容儀品牌Dr.Arrivo推出的旗艦級產品，採用獨家MFIP技術，結合中頻脈衝與離子導入，能深層滲透護膚精華。",
    features: [
      "獨家MFIP技術",
      "中頻脈衝技術",
      "LED光療",
      "溫熱導入",
    ],
    specs: [
      { label: "產品尺寸", value: "200 x 52 x 52mm" },
      { label: "重量", value: "約280g" },
      { label: "充電時間", value: "約3小時" },
      { label: "使用時間", value: "約45分鐘（滿電）" },
      { label: "防水等級", value: "IPX4" },
      { label: "產地", value: "日本" },
    ],
    buyLinks: [
      { name: "官方網站", url: "#", price: "5,680" },
    ],
    relatedArticles: ["bk001"],
  },
  "prod-003": {
    id: "prod-003",
    name: "NuFACE Trinity+ 微電流美容儀",
    brand: "NuFACE",
    price: "2,880",
    originalPrice: "3,280",
    imageUrl: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=600&h=600&fit=crop",
    ],
    rating: 4.5,
    reviewCount: 215,
    description: "NuFACE Trinity+ 是美國FDA認證的專業微電流美容儀，專注於面部提拉和輪廓塑造，被譽為「5分鐘瘦臉神器」。",
    features: [
      "微電流提拉技術",
      "FDA認證",
      "5分鐘快速護理",
      "人體工學設計",
    ],
    specs: [
      { label: "產品尺寸", value: "155 x 65 x 40mm" },
      { label: "重量", value: "約180g" },
      { label: "電源", value: "USB充電" },
      { label: "使用時間", value: "約60分鐘（滿電）" },
      { label: "認證", value: "FDA Cleared" },
      { label: "產地", value: "美國" },
    ],
    buyLinks: [
      { name: "官方網站", url: "#", price: "2,880" },
      { name: "Sephora", url: "#", price: "2,980" },
    ],
    relatedArticles: ["bk001"],
  },
  // Selector products
  "prod-anson-001": {
    id: "prod-anson-001",
    name: "Paula's Choice 2% BHA 身體乳液",
    brand: "Paula's Choice",
    price: "298",
    originalPrice: "350",
    imageUrl: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600&h=600&fit=crop",
    images: ["https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600&h=600&fit=crop"],
    rating: 4.9,
    reviewCount: 342,
    description: "含有2%水楊酸的身體乳液，專門針對身體暗瘡和毛孔粗大問題。",
    features: ["2% BHA 水楊酸", "無香料配方", "保濕不黏膩", "適合每日使用"],
    specs: [
      { label: "容量", value: "210ml" },
      { label: "主要成分", value: "2% BHA 水楊酸" },
      { label: "適用膚質", value: "油性/混合性" },
      { label: "產地", value: "美國" },
    ],
    buyLinks: [
      { name: "官方網站", url: "#", price: "298" },
      { name: "Lookfantastic", url: "#", price: "320" },
    ],
    relatedArticles: ["anson-001"],
  },
  "prod-anson-002": {
    id: "prod-anson-002",
    name: "CeraVe SA 潔膚露",
    brand: "CeraVe",
    price: "128",
    originalPrice: null,
    imageUrl: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&h=600&fit=crop",
    images: ["https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&h=600&fit=crop"],
    rating: 4.7,
    reviewCount: 567,
    description: "含水楊酸和神經醯胺的潔膚露，溫和清潔同時去除老廢角質。",
    features: ["水楊酸去角質", "神經醯胺修護", "溫和配方", "大容量"],
    specs: [
      { label: "容量", value: "473ml" },
      { label: "主要成分", value: "水楊酸、神經醯胺" },
      { label: "適用膚質", value: "所有膚質" },
      { label: "產地", value: "美國" },
    ],
    buyLinks: [
      { name: "萬寧", url: "#", price: "128" },
      { name: "屈臣氏", url: "#", price: "135" },
    ],
    relatedArticles: ["anson-001"],
  },
  "prod-vic-001": {
    id: "prod-vic-001",
    name: "UNIQLO 棉麻混紡西裝外套",
    brand: "UNIQLO",
    price: "599",
    originalPrice: "799",
    imageUrl: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=600&fit=crop",
    images: ["https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=600&fit=crop"],
    rating: 4.6,
    reviewCount: 189,
    description: "輕薄透氣的棉麻混紡面料西裝外套，適合香港潮濕天氣。",
    features: ["棉麻混紡透氣", "修身剪裁", "多色選擇", "易打理"],
    specs: [
      { label: "面料", value: "55%棉 45%麻" },
      { label: "尺碼", value: "XS-3XL" },
      { label: "顏色", value: "海軍藍/卡其/灰色" },
      { label: "洗滌", value: "乾洗或手洗" },
    ],
    buyLinks: [
      { name: "UNIQLO官網", url: "#", price: "599" },
      { name: "門市", url: "#", price: "599" },
    ],
    relatedArticles: ["vic-001"],
  },
  "prod-vic-002": {
    id: "prod-vic-002",
    name: "COS 羊毛混紡西裝外套",
    brand: "COS",
    price: "1,490",
    originalPrice: null,
    imageUrl: "https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0?w=600&h=600&fit=crop",
    images: ["https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0?w=600&h=600&fit=crop"],
    rating: 4.8,
    reviewCount: 76,
    description: "高品質羊毛混紡面料，簡約北歐設計。",
    features: ["羊毛混紡", "簡約設計", "葡萄牙製造", "挺括有型"],
    specs: [
      { label: "面料", value: "70%羊毛 30%聚酯纖維" },
      { label: "尺碼", value: "44-52" },
      { label: "顏色", value: "黑色/深灰/駝色" },
      { label: "產地", value: "葡萄牙" },
    ],
    buyLinks: [
      { name: "COS官網", url: "#", price: "1,490" },
    ],
    relatedArticles: ["vic-001"],
  },
  "prod-gil-001": {
    id: "prod-gil-001",
    name: "Bowflex 可調式啞鈴 552",
    brand: "Bowflex",
    price: "2,980",
    originalPrice: "3,480",
    imageUrl: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&h=600&fit=crop",
    images: ["https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&h=600&fit=crop"],
    rating: 4.9,
    reviewCount: 423,
    description: "一對啞鈴取代15對傳統啞鈴，專利快速調節系統。",
    features: ["15段重量調節", "快速切換", "節省空間", "2年保養"],
    specs: [
      { label: "重量範圍", value: "2.3-24kg" },
      { label: "調節段數", value: "15段" },
      { label: "尺寸", value: "43 x 22 x 23cm" },
      { label: "保養", value: "2年" },
    ],
    buyLinks: [
      { name: "官方網站", url: "#", price: "2,980" },
      { name: "Fitness First", url: "#", price: "3,180" },
    ],
    relatedArticles: ["gil-001"],
  },
  "prod-gil-002": {
    id: "prod-gil-002",
    name: "TRX Pro4 懸吊訓練帶",
    brand: "TRX",
    price: "1,680",
    originalPrice: null,
    imageUrl: "https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=600&h=600&fit=crop",
    images: ["https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=600&h=600&fit=crop"],
    rating: 4.8,
    reviewCount: 312,
    description: "專業級懸吊訓練系統，可進行超過300種訓練動作。",
    features: ["300+訓練動作", "軍用級尼龍", "350kg承重", "便攜收納"],
    specs: [
      { label: "承重", value: "350kg" },
      { label: "帶長", value: "可調節" },
      { label: "材質", value: "軍用級尼龍" },
      { label: "配件", value: "門錨、延伸帶、收納袋" },
    ],
    buyLinks: [
      { name: "TRX官網", url: "#", price: "1,680" },
    ],
    relatedArticles: ["gil-001"],
  },
  "prod-jac-001": {
    id: "prod-jac-001",
    name: "Seed DS-01 Daily Synbiotic",
    brand: "Seed",
    price: "498",
    originalPrice: null,
    imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&h=600&fit=crop",
    images: ["https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&h=600&fit=crop"],
    rating: 4.9,
    reviewCount: 256,
    description: "科研級益生菌，含24種專利菌株，530億活菌。",
    features: ["24種菌株", "530億活菌", "雙層膠囊", "無需冷藏"],
    specs: [
      { label: "活菌數", value: "530億 AFU" },
      { label: "菌株數", value: "24種" },
      { label: "服用方式", value: "每日2粒" },
      { label: "規格", value: "60粒/月" },
    ],
    buyLinks: [
      { name: "Seed官網", url: "#", price: "498" },
    ],
    relatedArticles: ["jac-001"],
  },
  "prod-jac-002": {
    id: "prod-jac-002",
    name: "Culturelle 康萃樂益生菌",
    brand: "Culturelle",
    price: "238",
    originalPrice: "280",
    imageUrl: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=600&h=600&fit=crop",
    images: ["https://images.unsplash.com/photo-1559757175-5700dde675bc?w=600&h=600&fit=crop"],
    rating: 4.6,
    reviewCount: 789,
    description: "美國銷量第一益生菌品牌，含專利LGG菌株。",
    features: ["專利LGG菌株", "1000+臨床研究", "適合全家", "易購買"],
    specs: [
      { label: "活菌數", value: "100億 CFU" },
      { label: "菌株", value: "LGG" },
      { label: "服用方式", value: "每日1粒" },
      { label: "規格", value: "30粒/盒" },
    ],
    buyLinks: [
      { name: "萬寧", url: "#", price: "238" },
      { name: "屈臣氏", url: "#", price: "245" },
    ],
    relatedArticles: ["jac-001"],
  },
};

// Product Details for Product Page (similar to hommi.jp)
export interface ProductDetail {
  id: string;
  name: string;
  brand: string;
  categorySlug: string;
  categoryName: string;
  subcategory: string;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  addedCount: number;
  fullDescription: string;
  functions: string;
  usage: string;
  features: { title: string; description: string }[];
  pros: string[];
  cons: string[];
  specs: { label: string; value: string }[];
  variants: { size: string; price: string; jpy: string; imageUrl?: string }[];
  relatedArticleId?: string;
}

export const productDetails: ProductDetail[] = [
  {
    id: "clearex-wi",
    name: "CLEAREX-Wi 低刺激抗菌藥用沐浴乳",
    brand: "第一三共",
    categorySlug: "beauty",
    categoryName: "外在管理",
    subcategory: "沐浴露",
    imageUrl: clearexWiMainImage,
    rating: 4.9,
    reviewCount: 1,
    addedCount: 5,
    fullDescription: "第一三共 CLEAREX-Wi 沐浴露。含有殺菌和消炎成分的溫和型潔凈沐浴露。弱酸性的藥用沐浴露，適合敏感的皮膚護理。用於預防各種細菌引起的痤瘡和異味，從臉部到全身都可以使用。",
    functions: "清潔肌膚，消毒殺菌，防止體味，汗味和粉刺。",
    usage: "取適量產品於掌心或者浴球，然後充分起泡塗抹於肌膚上，最後沖洗乾淨。",
    features: [
      {
        title: "含有殺菌成分異丙基甲基苯酚",
        description: "可以消毒和清潔引起皮膚問題（如異味和痤瘡）的細菌。"
      },
      {
        title: "甘草酸二鉀作為抗炎成分",
        description: "為肌膚創建一個乾淨的環境同時防止肌膚產生問題。"
      },
      {
        title: "低過敏配方，弱酸性，無香料",
        description: "經過敏測試，全身可用，並且可以去除腋下和腳部的異味。"
      }
    ],
    pros: [
      "雙重藥用成分：殺菌同時抗炎",
      "弱酸性配方，溫和不刺激",
      "無香料，敏感肌適用",
      "同時解決體臭問題",
      "日本製藥大廠出品，品質保證",
      "30日試用明顯見效"
    ],
    cons: [
      "香港較難購買，需代購或日本藥妝店購入",
      "價格比一般沐浴露稍高"
    ],
    specs: [
      { label: "品牌", value: "第一三共 (DAIICHI SANKYO)" },
      { label: "產品名稱", value: "CLEAREX-Wi (クリアレックスWi)" },
      { label: "產品類別", value: "醫藥部外品" },
      { label: "容量選擇", value: "200ml / 450ml / 380ml 補充用" },
      { label: "主要成分", value: "異丙基甲基苯酚、甘草酸二鉀" },
      { label: "pH值", value: "弱酸性" },
      { label: "產地", value: "日本" },
      { label: "適用對象", value: "背部暗瘡、敏感肌、運動愛好者" }
    ],
    variants: [
      { size: "200ml", price: "100", jpy: "2,000", imageUrl: clearexWi200mlImage },
      { size: "380ml 補充裝", price: "180", jpy: "3,600", imageUrl: clearexWi380mlRefillImage },
      { size: "450ml", price: "220", jpy: "4,400", imageUrl: clearexWiMainImage },
      { size: "抗痘套裝", price: "320", jpy: "6,400", imageUrl: clearexWiAntiAcneSetImage }
    ],
    relatedArticleId: "anson-clearex-wi-v2"
  },
  {
    id: "brandy-cake",
    name: "日本白蘭地蛋糕",
    brand: "jaagSELECT",
    categorySlug: "lifestyle",
    categoryName: "生活風格",
    subcategory: "甜點",
    imageUrl: "/assets/brandy/night.png",
    rating: 4.8,
    reviewCount: 3,
    addedCount: 12,
    fullDescription: "編輯團隊親身試吃、熟成 16 天後的三款日本白蘭地蛋糕。每一款代表著不同的個性、場合與價位——由日常小酌、送禮致意，到隆重款待，皆有對應之選。",
    functions: "適合佐茶、佐酒、餽贈。開盒後建議冷藏靜置 7–14 日以達到最佳熟成狀態。",
    usage: "室溫回溫 15 分鐘後品嚐；搭配紅茶、Highball 或黑咖啡最能突顯酒香層次。",
    features: [
      { title: "Longchamp ロンシャン", description: "經典入門之選。糕體綿密、酒感直接明快，適合日常自享。" },
      { title: "Esery いせり 300g", description: "熟成派代表。酒香內斂而綿長，糕體濕潤度極高，深受回購者喜愛。" },
      { title: "THE OKURA TOKYO 香檳蛋糕", description: "隆重款待之選。以香檳取代白蘭地，氣泡感留在舌尖，適合正式送禮。" }
    ],
    pros: [
      "三種個性、三種價位，總有一款合心水",
      "編輯團隊親自試吃、熟成日記全程記錄",
      "日本直送，附精緻禮盒包裝",
      "熟成 7–16 日風味最佳"
    ],
    cons: [
      "含酒精，兒童及孕婦不宜",
      "開箱後需冷藏，賞味期限較短"
    ],
    specs: [
      { label: "產地", value: "日本" },
      { label: "熟成建議", value: "冷藏 7–16 日" },
      { label: "包裝", value: "原廠禮盒" },
      { label: "備貨時間", value: "7–14 日" }
    ],
    variants: [
      { size: "Longchamp 1條", price: "200", jpy: "3,800", imageUrl: "/assets/brandy/product-ronshan.jpg" },
      { size: "Longchamp 2條", price: "300", jpy: "7,200", imageUrl: "/assets/brandy/product-ronshan.jpg" },
      { size: "Esery 1條", price: "300", jpy: "5,800", imageUrl: "/assets/brandy/product-esery.jpg" },
      { size: "Esery 2條", price: "400", jpy: "11,600", imageUrl: "/assets/brandy/product-esery.jpg" },
      { size: "Hotel Okura 1條", price: "500", jpy: "11,800", imageUrl: "/assets/brandy/product-okura.jpg" },
      { size: "Hotel Okura 2條", price: "700", jpy: "23,600", imageUrl: "/assets/brandy/product-okura.jpg" }
    ],
    relatedArticleId: "brandy-cake"
  }
];

export const getProductDetailById = (id: string): ProductDetail | undefined => {
  return productDetails.find((product) => product.id === id);
};

export const getArticlesByCategory = (categorySlug: string) => {
  return articles.filter((article) => article.categorySlug === categorySlug);
};

export const getArticleById = (id: string) => {
  return articles.find((article) => article.id === id);
};

export const getArticlesBySelector = (selectorId: string) => {
  return articles.filter((article) => article.selectorId === selectorId);
};

export const getProductById = (id: string) => {
  return products[id as keyof typeof products];
};

export const getCategoryBySlug = (slug: string) => {
  return categories[slug as keyof typeof categories];
};

export const getArticleBySlug = (slug: string) => {
  return articles.find((article) => article.slug === slug);
};

export const getSelectorById = (id: string) => {
  return selectors.find((selector) => selector.id === id);
};
