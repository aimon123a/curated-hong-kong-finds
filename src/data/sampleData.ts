// Sample data for the yourSELECT HK website

export const categories = {
  beauty: {
    slug: "beauty",
    englishTitle: "BEAUTY APPLIANCES",
    chineseTitle: "外在管理",
    description: "精選美容家電，從護膚到美髮，專業編輯為您挑選最值得入手的產品。",
    imageUrl: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200&h=600&fit=crop",
  },
  kitchen: {
    slug: "kitchen",
    englishTitle: "KITCHEN APPLIANCES",
    chineseTitle: "廚房家電",
    description: "優質廚房電器推薦，讓烹飪變得更輕鬆、更有樂趣。",
    imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=600&fit=crop",
  },
  lifestyle: {
    slug: "lifestyle",
    englishTitle: "LIFESTYLE",
    chineseTitle: "生活風格",
    description: "提升生活品質的精選好物，為您的日常增添美感與便利。",
    imageUrl: "https://images.unsplash.com/photo-1484101403633-571e0aedb26c?w=1200&h=600&fit=crop",
  },
};

export const articles = [
  {
    id: "bk001",
    categorySlug: "beauty",
    title: "2024年最佳美容儀推薦：10款專業級護膚神器評測",
    excerpt: "從LED光療到微電流提拉，我們深入測試了市面上最受歡迎的美容儀，為您找出真正值得投資的產品。",
    imageUrl: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&h=533&fit=crop",
    date: "2024.01.15",
    isPR: false,
    author: {
      name: "陳美琪",
      title: "美容編輯",
      imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    },
    content: `
      <p>在眾多美容儀中選擇適合自己的產品並不容易。我們花了三個月時間，深入測試了市面上最受歡迎的10款美容儀，從功效、使用體驗到性價比，為您提供最詳盡的評測。</p>
      
      <h2>如何選擇適合自己的美容儀？</h2>
      <p>選購美容儀時，首先要了解自己的肌膚需求。是想要抗衰老、改善膚質，還是解決特定問題如暗瘡或色素？不同功能的美容儀針對不同需求。</p>
      
      <h2>我們的評測標準</h2>
      <p>本次評測從以下幾個維度進行評分：</p>
      <ul>
        <li>功效表現（30%）</li>
        <li>使用便利性（25%）</li>
        <li>安全性（20%）</li>
        <li>性價比（15%）</li>
        <li>品牌服務（10%）</li>
      </ul>
    `,
    products: [
      {
        id: "anken-1",
        productId: "prod-001",
        rank: 1,
        name: "YAMAN 光療美容儀 HRF-S",
        brand: "YAMAN",
        price: "3,980",
        imageUrl: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&h=600&fit=crop",
        rating: 4.8,
        description: "結合RF射頻與LED光療的專業級美容儀，能有效提拉緊緻肌膚，改善細紋和鬆弛問題。獨特的溫感設計讓護膚體驗更加舒適。",
        pros: [
          "多功能合一，性價比極高",
          "溫感設計舒適度佳",
          "見效快，使用一週即有感",
          "充電續航力強",
        ],
        cons: [
          "價格偏高",
          "需配合專用凝膠使用",
        ],
        specs: [
          { label: "產品尺寸", value: "180 x 45 x 45mm" },
          { label: "重量", value: "約220g" },
          { label: "充電時間", value: "約2.5小時" },
          { label: "使用時間", value: "約30分鐘（滿電）" },
          { label: "防水等級", value: "IPX5" },
        ],
      },
      {
        id: "anken-2",
        productId: "prod-002",
        rank: 2,
        name: "Dr.Arrivo Zeus II",
        brand: "Dr.Arrivo",
        price: "5,680",
        imageUrl: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&h=600&fit=crop",
        rating: 4.7,
        description: "日本頂級美容儀品牌，採用獨家MFIP技術，能深層滲透護膚精華，同時刺激膠原蛋白增生，是專業美容院級別的家用設備。",
        pros: [
          "獨家MFIP技術效果顯著",
          "質感高級，設計精美",
          "多種模式可選擇",
          "日本製造品質保證",
        ],
        cons: [
          "價格較高",
          "學習曲線較長",
          "機身較重",
        ],
        specs: [
          { label: "產品尺寸", value: "200 x 52 x 52mm" },
          { label: "重量", value: "約280g" },
          { label: "充電時間", value: "約3小時" },
          { label: "使用時間", value: "約45分鐘（滿電）" },
          { label: "防水等級", value: "IPX4" },
        ],
      },
      {
        id: "anken-3",
        productId: "prod-003",
        rank: 3,
        name: "NuFACE Trinity+ 微電流美容儀",
        brand: "NuFACE",
        price: "2,880",
        imageUrl: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=600&h=600&fit=crop",
        rating: 4.5,
        description: "美國知名微電流品牌，專注於面部提拉和輪廓塑造。獨特的三角形設計能精準貼合面部曲線，5分鐘即可完成日常護理。",
        pros: [
          "提拉效果即時可見",
          "使用時間短效率高",
          "FDA認證安全可靠",
          "輕巧便攜",
        ],
        cons: [
          "功能較為單一",
          "需每日使用才能維持效果",
        ],
        specs: [
          { label: "產品尺寸", value: "155 x 65 x 40mm" },
          { label: "重量", value: "約180g" },
          { label: "電源", value: "USB充電" },
          { label: "使用時間", value: "約60分鐘（滿電）" },
          { label: "認證", value: "FDA Cleared" },
        ],
      },
    ],
  },
  {
    id: "bk002",
    categorySlug: "beauty",
    title: "離子導入儀完整指南：如何讓護膚品吸收更好",
    excerpt: "深入解析離子導入技術的原理與使用方法，教您如何選擇適合的產品。",
    imageUrl: "https://images.unsplash.com/photo-1619451334792-150fd785ee74?w=800&h=533&fit=crop",
    date: "2024.01.10",
    isPR: true,
  },
  {
    id: "bk003",
    categorySlug: "beauty",
    title: "家用脫毛儀評測：5款熱門IPL脫毛機實測報告",
    excerpt: "夏天將至，是時候準備脫毛儀了！我們為您測試了市面上最熱門的五款家用脫毛機。",
    imageUrl: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=533&fit=crop",
    date: "2024.01.05",
    isPR: false,
  },
  {
    id: "bk004",
    categorySlug: "beauty",
    title: "電動潔面儀真的有用嗎？皮膚科醫生這樣說",
    excerpt: "專訪皮膚科專家，為您解答電動潔面儀的真正功效與使用注意事項。",
    imageUrl: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&h=533&fit=crop",
    date: "2023.12.28",
    isPR: false,
  },
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
};

export const getArticlesByCategory = (categorySlug: string) => {
  return articles.filter((article) => article.categorySlug === categorySlug);
};

export const getArticleById = (id: string) => {
  return articles.find((article) => article.id === id);
};

export const getProductById = (id: string) => {
  return products[id as keyof typeof products];
};

export const getCategoryBySlug = (slug: string) => {
  return categories[slug as keyof typeof categories];
};