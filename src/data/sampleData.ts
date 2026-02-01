// Sample data for the jaagSELECT HK website

import keiImage from "@/assets/selectors/kei.jpg";
import vicImage from "@/assets/selectors/vic.jpg";
import gilImage from "@/assets/selectors/gil.jpg";
import jacImage from "@/assets/selectors/jac.jpg";
import clearexWiImage from "@/assets/products/clearex-wi.png";

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
    description: "精選美容家電，從護膚到美髮，專業編輯為您挑選最值得入手的產品。",
    imageUrl: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200&h=600&fit=crop",
  },
  kitchen: {
    slug: "kitchen",
    englishTitle: "HOME LIVING",
    chineseTitle: "家居生活",
    description: "打造理想居家空間，精選實用家品、收納好物與生活質感提升的推薦。",
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

export const selectors: Selector[] = [
  {
    id: "kei",
    name: "Kei",
    englishName: "KEI",
    title: "身體護理專家",
    specialty: "身體暗瘡控制",
    bio: "擁有超過8年美容行業經驗，專注於身體肌膚護理研究。曾在多間皮膚科診所擔任顧問，對暗瘡成因及護理有深入了解。相信每個人都值得擁有健康自信的肌膚。",
    imageUrl: keiImage,
    articleCount: 12,
    expertise: ["身體暗瘡", "背部護理", "去角質", "身體乳液"],
    socialLinks: {
      instagram: "#",
    },
  },
  {
    id: "vic",
    name: "Vic",
    englishName: "VIC",
    title: "男士穿搭顧問",
    specialty: "男士服飾穿搭",
    bio: "時裝設計系畢業，曾於多個國際品牌擔任造型師。熱衷於幫助男士找到屬於自己的風格，認為好的穿搭不在於價格，而在於懂得搭配。",
    imageUrl: vicImage,
    articleCount: 18,
    expertise: ["男士西裝", "休閒穿搭", "配飾選擇", "季節穿搭"],
    socialLinks: {
      instagram: "#",
      twitter: "#",
    },
  },
  {
    id: "gil",
    name: "Gil",
    englishName: "GIL",
    title: "健身器材專家",
    specialty: "健身產品評測",
    bio: "前職業健身教練，國際認證體適能專家。10年健身經驗，親身測試過無數健身器材和補充品。致力於為大家找出性價比最高的健身好物。",
    imageUrl: gilImage,
    articleCount: 24,
    expertise: ["家用健身器材", "蛋白粉", "運動服飾", "智能手錶"],
    socialLinks: {
      instagram: "#",
    },
  },
  {
    id: "jac",
    name: "Jac",
    englishName: "JAC",
    title: "營養保健顧問",
    specialty: "口服保健品",
    bio: "註冊營養師，擁有公共衛生碩士學位。專注於功能性保健品研究，以科學角度分析各類營養補充品的功效與安全性，幫助大家做出明智的健康選擇。",
    imageUrl: jacImage,
    articleCount: 15,
    expertise: ["維他命", "益生菌", "膠原蛋白", "魚油補充"],
    socialLinks: {
      instagram: "#",
    },
  },
];

export const articles = [
  // Original beauty articles
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
  // Kei's Feature Article - Clearex Wi
  {
    id: "kei-clearex-wi",
    categorySlug: "beauty",
    selectorId: "kei",
    title: "背痘終結者｜第一三共 Clearex Wi 藥用沐浴露深度實測",
    excerpt: "這款由日本製藥巨頭第一三共研發的藥用沐浴露，憑藉雙重藥用成分與極致溫和配方，成為我的「抗痘三件套」核心產品。",
    imageUrl: clearexWiImage,
    date: "2024.01.25",
    isPR: false,
    isFeatureReview: true,
    author: {
      name: "Kei",
      title: "身體護理專家",
      imageUrl: keiImage,
    },
    content: `
      <div class="lead-text">
        <p>如果你跟我一樣，從青春期開始就飽受背痘困擾，那你一定試過無數方法——從各種偏方到昂貴的美容療程。但真正讓我找到「答案」的，是這款來自日本頂尖製藥廠的沐浴露。</p>
      </div>
    `,
    featureProduct: {
      id: "clearex-wi-main",
      productId: "prod-clearex-wi",
      name: "Clearex Wi 藥用沐浴露",
      brand: "第一三共 DAIICHI SANKYO",
      price: "168",
      imageUrl: clearexWiImage,
      rating: 4.8,
      productType: "醫藥部外品",
      subtitle: "クリアレックスWi",
      tagline: "你的「抗痘三件套」核心產品",
      keyPoints: [
        {
          title: "雙重藥用有效成分（殺菌 + 抗炎）",
          icon: "shield",
          description: "這是它與普通沐浴露最大的區別，也是解決背痘的科學根據。",
          details: [
            {
              label: "Isopropyl Methylphenol (IPMP)",
              value: "強效殺菌成分，能滲透毛孔，根除導致痤瘡（痘痘）的細菌及產生體臭的雜菌。"
            },
            {
              label: "甘草酸二鉀 (Dipotassium Glycyrrhizate)",
              value: "著名的抗炎成分，專門鎮定受紅腫影響的皮膚，防止痘痘進一步惡化。"
            }
          ]
        },
        {
          title: "極致溫和的「低刺激」配方",
          icon: "heart",
          description: "對於已經發炎的背痘皮膚，過度清潔會適得其反。Clearex Wi 的特點是：",
          details: [
            {
              label: "弱酸性",
              value: "貼近皮膚天然 pH 值，保護肌膚屏障。"
            },
            {
              label: "無香料、無著色",
              value: "減少化學添加物對敏感或受損皮膚的刺激。"
            },
            {
              label: "通過低敏測試",
              value: "官方標榜適用於敏感肌，這能大幅降低購買疑慮。"
            }
          ]
        },
        {
          title: "多功能解決方案（Acne + Odor）",
          icon: "sparkles",
          description: "除了針對背痘，它在物理層面上還解決了兩個常見問題：",
          details: [
            {
              label: "體臭/汗臭預防",
              value: "透過殺滅細菌，從根源消除汗味，非常適合運動愛好者。"
            },
            {
              label: "清潔徹底但不乾澀",
              value: "洗完後皮膚不會有緊繃感，適合日常每天使用。"
            }
          ]
        },
        {
          title: "製藥公司的專業背書",
          icon: "badge",
          description: "作為「醫藥部外品」，它在日本藥妝店通常放在專業護理區，而非一般超市區。",
          details: [
            {
              label: "藥劑師推薦",
              value: "由第一三共這種頂尖製藥廠研發，賦予了產品強大的「專業信任感」。"
            },
            {
              label: "醫藥部外品認證",
              value: "日本厚生勞動省認可的有效成分含量，品質有保證。"
            }
          ]
        }
      ],
      specs: [
        { label: "品牌", value: "第一三共 (DAIICHI SANKYO)" },
        { label: "產品名稱", value: "Clearex Wi (クリアレックスWi)" },
        { label: "產品類別", value: "醫藥部外品" },
        { label: "容量", value: "450ml" },
        { label: "主要成分", value: "IPMP、甘草酸二鉀" },
        { label: "pH值", value: "弱酸性" },
        { label: "產地", value: "日本" },
        { label: "適用對象", value: "身體暗瘡、敏感肌、運動愛好者" },
      ],
      pros: [
        "雙重藥用成分，殺菌同時抗炎",
        "弱酸性配方，溫和不刺激",
        "無香料無著色，敏感肌適用",
        "同時解決體臭問題",
        "日本製藥大廠品質保證",
      ],
      cons: [
        "香港較難購買，需代購",
        "價格比一般沐浴露稍高",
      ],
      buyLinks: [
        { name: "日本亞馬遜", url: "#", price: "168" },
        { name: "樂天市場", url: "#", price: "175" },
      ],
      usageGuide: {
        title: "建議使用方法",
        steps: [
          "運動後或大量出汗後盡快洗澡",
          "取適量沐浴露於掌心或沐浴球",
          "著重清洗背部、胸口等易出油部位",
          "輕柔按摩1-2分鐘，讓有效成分滲透",
          "以清水徹底沖洗乾淨",
        ],
        tips: "建議配合柔軟的長柄沐浴刷，能更有效清潔背部難以觸及的位置。"
      },
      verdict: {
        title: "編輯評語",
        content: "作為一個曾經飽受背痘困擾的人，我可以負責任地說：Clearex Wi 是我用過最有效的身體暗瘡護理產品之一。它不是那種誇大其詞的「神器」，而是真正以科學配方解決問題的日本製藥級產品。如果你也在尋找背痘的解決方案，這款沐浴露絕對值得一試。"
      }
    },
  },
  // Kei's Feature Article 2 - Back Acne Solution (from Word doc)
  {
    id: "kei-clearex-wi-v2",
    categorySlug: "beauty",
    selectorId: "kei",
    title: "Clearex-WI 真的有用嗎？親自產品評測",
    excerpt: "日本製藥大廠「第一三共」研發低刺激藥用沐浴露，專治身體暗瘡。旅遊日本時偶遇的背痘救星！",
    imageUrl: clearexWiProductImage,
    date: "2026.02.01",
    isPR: false,
    isFeatureReview: true,
    isShareArticle: true,
    author: {
      name: "Kei",
      title: "身體護理專家",
      imageUrl: keiImage,
    },
    content: `
      <div class="lead-text">
        <p>油脂性皮膚跟咗我29年，之前喺網上面見到啲人話呢隻予防ニキビ（暗瘡）嘅沐浴露好用就買黎試吓。</p>
      </div>
    `,
    featureProduct: {
      id: "clearex-wi-v2",
      productId: "prod-clearex-wi-v2",
      name: "CLEAREX-Wi 低刺激抗菌藥用沐浴乳",
      brand: "第一三共 DAIICHI SANKYO",
      price: "100-180",
      imageUrl: clearexWiProductImage,
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
            translation: "夏天快到了，背痘令你困擾嗎？這兩款產品在藥妝店就能買到，組合使用效果超讚！\n\n✨ 兩者都是低刺激弱酸性配方\n🎯 殺菌消炎雙管齊下\n\n用法超簡單：沐浴時使用 CLEAREX Wi，洗澡後把背粒消噴在背部，搞定！",
            imageUrl: clearexWiComboImage,
            likes: 7294,
          },
          replies: [
            {
              username: "ray",
              handle: "vt6q_7",
              date: "Jul 10, 2021",
              content: "全く同じケアをしています！まだすべすべ！ってほどではないですが、ニキビだらけで悲惨だった背中がだいぶマシになりたした☺",
              translation: "我也用同一套方法！雖然還沒完全光滑，但以前滿背都是痘真的超慘，現在已經好很多了☺",
            },
          ],
        },
        trialResults: {
          title: "試用30日的效果",
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
            { size: "200ml", price: "100 元（~1,900 円）" },
            { size: "450ml", price: "180 元（~3,500 円）" },
            { size: "補充用 380ml", price: "150 元（~2,950 円）" }
          ]
        },
        knowledge: {
          title: "背痘知識：對症下藥",
          sections: [
            {
              question: "為什麼會長背痘？",
              image: backAcneCausesImage,
              content: "背部肌膚跟臉部肌膚一樣，若皮脂腺分泌過多，容易使肌膚造成發炎反應，導致痘痘的生成。\n\n主要成因包括：\n• 皮脂腺分泌過多：夏天氣候潮濕悶熱，皮脂腺分泌更旺盛\n• 皮膚角化異常：未完全代謝的皮脂堆積形成粉刺\n• 毛囊周圍發炎：背部長時間受衣服覆蓋，處於悶熱環境\n• 痤瘡桿菌感染：毛孔封閉環境容易滋生細菌"
            },
            {
              question: "改善背痘的六大方法",
              image: backAcneTipsImage,
              content: "1. 丟掉沐浴球：沐浴球使用後很難徹底沖洗乾淨，容易細菌黴菌滋生，建議用手洗澡最安全\n\n2. 使用低敏抗菌沐浴乳：選擇無香料、不含過多油脂的沐浴乳，如 CLEAREX-Wi\n\n3. 護髮完再洗身體：避免護髮乳中的致痘成分殘留在身體上\n\n4. 定期換床單：身體的皮屑、油脂容易殘留在床單，建議每周更換\n\n5. 運動後立刻洗澡：汗水和油脂是細菌的溫床，運動完盡快清潔\n\n6. 多喝水、少吃刺激食物：身體長痘代表處於微發炎狀態，多喝水有助加速代謝"
            },
            {
              question: "容易冒痘的五大禁忌飲食",
              image: backAcneDietImage,
              content: "痘痘的產生其實和體內發炎、免疫力下降也有高度關聯：\n\n1. 精緻碳水及高糖食物：麵包、蛋糕、手搖杯等，是導致身體長期發炎的元凶\n\n2. 油炸燒烤食物：高油燥熱，刺激皮脂腺促使粉刺、痘痘生成\n\n3. 酒類：酒精含糖分偏高，攝取過量可能導致臉部泛紅、破壞膠原蛋白\n\n4. 乳製品：哈佛研究顯示，乳製品吃較多的人長痘機率增加 22%\n\n5. 麩質食物：麵條、麵包等麵粉製品，部分人對麩質不耐受容易引起發炎"
            },
            {
              question: "原來背部痘痘大部分是毛囊炎？",
              image: backAcneInfo1Image,
              content: ""
            },
            {
              question: "背部痘的成因",
              image: backAcneInfo2Image,
              content: "汗水積聚、皮脂分泌、紫外線照射和壓力都可能導致金黃色葡萄球菌和馬拉色菌繁殖，引起炎症，最終導致背部痤瘡。這正是香港濕熱天氣和加班地獄的完美組合。"
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
        title: "Kei 的真實感受",
        content: "個人感受背部明顯平滑了，發炎情況也減少了。使用了30日，真的看到了改變。對於香港這種濕熱天氣以及經常加班的打工一族，這款產品真的是救星！推薦給同樣受背痘困擾的你。"
      }
    },
  },
  // Kei's articles - Body Acne
  {
    id: "kei-001",
    categorySlug: "beauty",
    selectorId: "kei",
    title: "背部暗瘡全攻略：5款背部護理產品實測推薦",
    excerpt: "背部暗瘡讓你不敢穿露背裝？我親身測試了市面上最受歡迎的背部護理產品，找出真正有效的解決方案。",
    imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=533&fit=crop",
    date: "2024.01.20",
    isPR: false,
    author: {
      name: "Kei",
      title: "身體護理專家",
      imageUrl: keiImage,
    },
    content: `
      <p>背部暗瘡是很多人的困擾，尤其在夏天想穿露背裝時更加尷尬。作為專注身體護理多年的編輯，我深入測試了多款背部護理產品。</p>
      
      <h2>背部暗瘡成因</h2>
      <p>背部暗瘡主要由以下原因引起：</p>
      <ul>
        <li>皮脂分泌旺盛</li>
        <li>角質堆積</li>
        <li>衣物摩擦</li>
        <li>運動後未及時清潔</li>
      </ul>
      
      <h2>護理重點</h2>
      <p>針對背部暗瘡，我們需要從清潔、去角質、控油三方面入手。</p>
    `,
    products: [
      {
        id: "kei-prod-1",
        productId: "prod-kei-001",
        rank: 1,
        name: "Paula's Choice 2% BHA 身體乳液",
        brand: "Paula's Choice",
        price: "298",
        imageUrl: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600&h=600&fit=crop",
        rating: 4.9,
        description: "含有2%水楊酸的身體乳液，能深入毛孔溶解油脂和角質，同時保濕不乾燥。質地清爽，適合每日使用。",
        pros: [
          "水楊酸濃度適中有效",
          "質地清爽不黏膩",
          "保濕效果佳",
          "無香料刺激",
        ],
        cons: [
          "價格偏高",
          "需要持續使用",
        ],
        specs: [
          { label: "容量", value: "210ml" },
          { label: "主要成分", value: "2% BHA 水楊酸" },
          { label: "適用膚質", value: "油性/混合性" },
          { label: "產地", value: "美國" },
        ],
      },
      {
        id: "kei-prod-2",
        productId: "prod-kei-002",
        rank: 2,
        name: "CeraVe SA 潔膚露",
        brand: "CeraVe",
        price: "128",
        imageUrl: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&h=600&fit=crop",
        rating: 4.7,
        description: "含水楊酸和神經醯胺的潔膚露，溫和清潔同時去除老廢角質，維持肌膚屏障健康。",
        pros: [
          "性價比極高",
          "溫和不刺激",
          "含神經醯胺修護",
          "藥妝店有售",
        ],
        cons: [
          "泡沫較少",
          "清潔力中等",
        ],
        specs: [
          { label: "容量", value: "473ml" },
          { label: "主要成分", value: "水楊酸、神經醯胺" },
          { label: "適用膚質", value: "所有膚質" },
          { label: "產地", value: "美國" },
        ],
      },
    ],
  },
  // Vic's articles - Men's Fashion
  {
    id: "vic-001",
    categorySlug: "lifestyle-hidden",
    selectorId: "vic",
    title: "2024男士休閒西裝穿搭指南：8款百搭單品推薦",
    excerpt: "想要穿出質感但又不想太正式？休閒西裝是最佳選擇。教你如何選擇和搭配，從辦公室到約會都適用。",
    imageUrl: "https://images.unsplash.com/photo-1507680434567-5739c80be1ac?w=800&h=533&fit=crop",
    date: "2024.01.18",
    isPR: false,
    author: {
      name: "Vic",
      title: "男士穿搭顧問",
      imageUrl: vicImage,
    },
    content: `
      <p>休閒西裝是現代男士衣櫃中不可或缺的單品。它既能展現專業形象，又不失輕鬆隨性。今天我要為大家推薦幾款值得入手的休閒西裝和搭配建議。</p>
      
      <h2>如何選擇休閒西裝？</h2>
      <p>選購休閒西裝時要注意以下幾點：</p>
      <ul>
        <li>面料選擇：棉麻混紡最百搭</li>
        <li>版型：略寬鬆的Oversize更休閒</li>
        <li>顏色：海軍藍、卡其色最實用</li>
      </ul>
    `,
    products: [
      {
        id: "vic-prod-1",
        productId: "prod-vic-001",
        rank: 1,
        name: "UNIQLO 棉麻混紡西裝外套",
        brand: "UNIQLO",
        price: "599",
        imageUrl: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=600&fit=crop",
        rating: 4.6,
        description: "輕薄透氣的棉麻混紡面料，適合香港潮濕天氣。修身剪裁但不緊繃，正式休閒兩相宜。",
        pros: [
          "價格親民",
          "面料透氣舒適",
          "剪裁合身",
          "顏色選擇多",
        ],
        cons: [
          "容易起皺",
          "需要經常整理",
        ],
        specs: [
          { label: "面料", value: "55%棉 45%麻" },
          { label: "尺碼", value: "XS-3XL" },
          { label: "顏色", value: "海軍藍/卡其/灰色" },
          { label: "洗滌", value: "乾洗或手洗" },
        ],
      },
      {
        id: "vic-prod-2",
        productId: "prod-vic-002",
        rank: 2,
        name: "COS 羊毛混紡西裝外套",
        brand: "COS",
        price: "1,490",
        imageUrl: "https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0?w=600&h=600&fit=crop",
        rating: 4.8,
        description: "高品質羊毛混紡面料，挺括有型不易變形。簡約北歐設計，無多餘裝飾，展現低調質感。",
        pros: [
          "面料質感出眾",
          "設計簡約高級",
          "版型優秀",
          "耐穿持久",
        ],
        cons: [
          "價格較高",
          "清洗需注意",
        ],
        specs: [
          { label: "面料", value: "70%羊毛 30%聚酯纖維" },
          { label: "尺碼", value: "44-52" },
          { label: "顏色", value: "黑色/深灰/駝色" },
          { label: "產地", value: "葡萄牙" },
        ],
      },
    ],
  },
  // Gil's articles - Fitness
  {
    id: "gil-001",
    categorySlug: "lifestyle-hidden",
    selectorId: "gil",
    title: "家用健身器材推薦：10款高CP值居家訓練好物",
    excerpt: "不想去健身房？這些居家健身器材讓你在家也能練出好身材。從入門到進階，全部親測推薦。",
    imageUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=533&fit=crop",
    date: "2024.01.22",
    isPR: false,
    author: {
      name: "Gil",
      title: "健身器材專家",
      imageUrl: gilImage,
    },
    content: `
      <p>居家健身已成為很多人的選擇。但市面上健身器材琳瑯滿目，到底哪些值得買？作為資深健身教練，我為大家精選了10款高性價比的居家訓練器材。</p>
      
      <h2>如何選擇適合自己的器材？</h2>
      <p>選購前要考慮：</p>
      <ul>
        <li>訓練目標：增肌還是減脂</li>
        <li>可用空間：器材尺寸和收納</li>
        <li>預算範圍</li>
      </ul>
    `,
    products: [
      {
        id: "gil-prod-1",
        productId: "prod-gil-001",
        rank: 1,
        name: "Bowflex 可調式啞鈴 552",
        brand: "Bowflex",
        price: "2,980",
        imageUrl: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&h=600&fit=crop",
        rating: 4.9,
        description: "一對啞鈴取代15對傳統啞鈴，重量從2.3kg到24kg可調。專利快速調節系統，5秒內完成重量切換。",
        pros: [
          "節省空間一對抵15對",
          "調節快速方便",
          "品質耐用",
          "重量範圍廣",
        ],
        cons: [
          "價格較高",
          "底座較大",
        ],
        specs: [
          { label: "重量範圍", value: "2.3-24kg" },
          { label: "調節段數", value: "15段" },
          { label: "尺寸", value: "43 x 22 x 23cm" },
          { label: "保養", value: "2年" },
        ],
      },
      {
        id: "gil-prod-2",
        productId: "prod-gil-002",
        rank: 2,
        name: "TRX Pro4 懸吊訓練帶",
        brand: "TRX",
        price: "1,680",
        imageUrl: "https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=600&h=600&fit=crop",
        rating: 4.8,
        description: "專業級懸吊訓練系統，可進行超過300種訓練動作。軍用級尼龍帶，承重達350kg。",
        pros: [
          "動作變化多",
          "便攜易收納",
          "全身訓練",
          "品質頂級",
        ],
        cons: [
          "需要固定點",
          "初學者需要時間適應",
        ],
        specs: [
          { label: "承重", value: "350kg" },
          { label: "帶長", value: "可調節" },
          { label: "材質", value: "軍用級尼龍" },
          { label: "配件", value: "門錨、延伸帶、收納袋" },
        ],
      },
    ],
  },
  // Jac's articles - Supplements
  {
    id: "jac-001",
    categorySlug: "lifestyle-hidden",
    selectorId: "jac",
    title: "益生菌完整指南：6款腸道健康補充品評測",
    excerpt: "腸道健康影響全身。作為營養師，我為你評測市面上熱門的益生菌產品，教你如何選擇適合自己的。",
    imageUrl: "https://images.unsplash.com/photo-1550572017-edd951b55104?w=800&h=533&fit=crop",
    date: "2024.01.25",
    isPR: false,
    author: {
      name: "Jac",
      title: "營養保健顧問",
      imageUrl: jacImage,
    },
    content: `
      <p>益生菌是現代人維持腸道健康的重要補充品。但市面上產品眾多，菌株種類各異，該如何選擇？</p>
      
      <h2>益生菌選購要點</h2>
      <ul>
        <li>菌株種類：不同菌株功效不同</li>
        <li>活菌數量：建議每日100億以上</li>
        <li>保存方式：注意是否需要冷藏</li>
        <li>添加物：避免過多人工添加</li>
      </ul>
    `,
    products: [
      {
        id: "jac-prod-1",
        productId: "prod-jac-001",
        rank: 1,
        name: "Seed DS-01 Daily Synbiotic",
        brand: "Seed",
        price: "498",
        imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&h=600&fit=crop",
        rating: 4.9,
        description: "科研級益生菌，含24種專利菌株，530億活菌。獨特雙層膠囊技術，確保菌株活性送達腸道。",
        pros: [
          "菌株經臨床驗證",
          "活菌數量高",
          "無需冷藏",
          "環保包裝",
        ],
        cons: [
          "價格較高",
          "需訂閱購買",
        ],
        specs: [
          { label: "活菌數", value: "530億 AFU" },
          { label: "菌株數", value: "24種" },
          { label: "服用方式", value: "每日2粒" },
          { label: "規格", value: "60粒/月" },
        ],
      },
      {
        id: "jac-prod-2",
        productId: "prod-jac-002",
        rank: 2,
        name: "Culturelle 康萃樂益生菌",
        brand: "Culturelle",
        price: "238",
        imageUrl: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=600&h=600&fit=crop",
        rating: 4.6,
        description: "美國銷量第一益生菌品牌，含專利LGG菌株，經過1000+臨床研究驗證。適合全家使用。",
        pros: [
          "品牌信譽良好",
          "LGG菌株研究充分",
          "性價比高",
          "易於購買",
        ],
        cons: [
          "菌株種類單一",
          "活菌數較低",
        ],
        specs: [
          { label: "活菌數", value: "100億 CFU" },
          { label: "菌株", value: "LGG" },
          { label: "服用方式", value: "每日1粒" },
          { label: "規格", value: "30粒/盒" },
        ],
      },
    ],
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
  // Selector products
  "prod-kei-001": {
    id: "prod-kei-001",
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
    relatedArticles: ["kei-001"],
  },
  "prod-kei-002": {
    id: "prod-kei-002",
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
    relatedArticles: ["kei-001"],
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
  variants: { size: string; price: string; jpy: string }[];
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
    imageUrl: clearexWiProductImage,
    rating: 4.9,
    reviewCount: 0,
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
      { size: "200ml", price: "100", jpy: "1,900" },
      { size: "380ml 補充裝", price: "150", jpy: "2,950" },
      { size: "450ml", price: "180", jpy: "3,500" }
    ],
    relatedArticleId: "kei-clearex-wi-v2"
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

export const getSelectorById = (id: string) => {
  return selectors.find((selector) => selector.id === id);
};
