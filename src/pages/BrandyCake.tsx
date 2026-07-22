import { useEffect, useState } from "react";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import Layout from "@/components/layout/Layout";
import "./BrandyCake.css";

const IMG = "/assets/brandy";
const CART_URL = "https://jaagselect.com/cart";
const IG_URL = "https://instagram.com/jaag_select";

const DIARY = [
  {
    date: "DAY 1 ・ 開箱即食",
    body: "酒感最外放。吞下去之後，白蘭地的香氣浮得快、走得也快，像剛開瓶。糕體濕潤，甜和酒各自站好自己的位置——這一晚的它，最「囂張」。",
  },
  {
    date: "DAY 7 ・ 熟成進行中",
    body: "酒慢慢滲進糕體。濕潤感比第一天更明顯，酒香不再浮在表面，要咬開才釋放出來。甜和酒開始交融，不再打架——我開始明白「熟成」兩個字的意思。",
  },
  {
    date: "DAY 16 ・ 我最喜歡的狀態",
    body: "濕潤度是最高峰，糕體綿密。酒香沉了下來，甜與烈完全交融，每一口都圓潤完整。如果沒有人告訴你，你可能以為它剛焗好——但香氣的層次，完全是另一回事。",
  },
];

const BrandyCake = () => {
  useDocumentMeta({
    title: "「大人」的甜點，屬於自己的贅沢時刻 — jaagSELECT",
    description: "一塊外表平凡的白蘭地蛋糕，和它吞下去之後才浮現的酒香。",
    canonical: "/brandy-cake",
  });

  const [progress, setProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [diaryIdx, setDiaryIdx] = useState(0);
  const [showCta, setShowCta] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? (h.scrollTop / max) * 100 : 0);
      setScrolled(h.scrollTop > 40);
      setShowTop(h.scrollTop > 900);
      const products = document.getElementById("products");
      const pastHero = h.scrollTop > window.innerHeight * 0.8;
      const productsTop = products ? products.getBoundingClientRect().top : Infinity;
      setShowCta(pastHero && productsTop > window.innerHeight * 0.6);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".bc-reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <Layout>
    <div className="bc-root">
      <div className="bc-progress" style={{ width: `${progress}%` }} />


      {/* HERO */}
      <section className="bc-hero">
        <div className="bc-hero-bg">
          <img className="bc-tinted" src={`${IMG}/night.png`} alt="夜深的窗邊，一碟蛋糕與一杯茶" />
        </div>
        <div className="bc-hero-veil" />
        <div className="bc-hero-inner">
          <div className="bc-kicker">生活品格 ・ Vol.01</div>
          <h1>
            「大人」的甜點，<br />
            <span className="bc-accent">屬於自己的贅沢時刻。</span>
          </h1>
          <div className="bc-hero-cta">
            <a className="bc-btn-ghost" href="#ch1">
              慢慢讀 <span>↓</span>
            </a>
            <a className="bc-quiet" href="#products">
              趕時間？直接看三種選擇
            </a>
          </div>
        </div>
      </section>

      <main className="bc-main">
        {/* 前言 */}
        <div className="bc-col bc-reveal">
          <div className="bc-about">
            <div className="bc-a-head">前言</div>
            <p>
              去年開始，我家雪櫃門邊多了一個習慣：總會放著一兩盒從日本帶回來的蛋糕。不是特別愛吃甜，只是每次去日本都覺得——應該還有更好吃的吧。於是一直買，一直試。有些吃完就忘了，有些第二天已經想不起品牌。直到有天晚上，哥哥把一盒沒有人期待的蛋糕，放上了餐桌。
            </p>
          </div>
        </div>

        {/* TOC */}
        <div className="bc-col bc-reveal">
          <nav className="bc-toc">
            <div className="bc-toc-title">本篇目次 ・ INDEX</div>
            <ol>
              <li><a href="#ch1"><span className="bc-num">01</span>一切，由一盒手信開始<span className="bc-jp">きっかけ</span></a></li>
              <li><a href="#ch2"><span className="bc-num">02</span>第一次吃的印象<span className="bc-jp">一口目</span></a></li>
              <li><a href="#ch3"><span className="bc-num">03</span>熟成<span className="bc-jp">育てる</span></a></li>
              <li><a href="#ch4"><span className="bc-num">04</span>我會推薦給誰<span className="bc-jp">誰に</span></a></li>
              <li><a href="#products"><span className="bc-num">05</span>三種場合的選擇<span className="bc-jp">贈り物</span></a></li>
              <li><a href="#note"><span className="bc-num">06</span>今夜、という名の場面<span className="bc-jp">エピローグ</span></a></li>
            </ol>
          </nav>
        </div>

        {/* CH.1 */}
        <section className="bc-chapter" id="ch1">
          <div className="bc-col">
            <div className="bc-ch-head bc-reveal">
              <div className="bc-ch-kicker"><span className="bc-num">01</span><span className="bc-jp">きっかけ ・ THE ENCOUNTER</span></div>
              <h2>一切，由一盒沒有人期待的手信開始。</h2>
            </div>
            <figure className="bc-reveal" style={{ marginTop: 0 }}>
              <img className="bc-tinted" src={`${IMG}/story-gift.jpg`} alt="餐桌上，雙手把包裝好的禮盒遞給另一雙手" loading="lazy" />
            </figure>
            <div className="bc-prose bc-reveal">
              <p className="bc-dropcap">有位長輩，長年住在日本。</p>
              <p>香港人自問識食，但講到「識揀日本嘢」，我始終佩服這些長駐當地的大人——他們帶回來的手信，從來不是機場免稅店最顯眼的那一排，而是當地人真正在吃的東西。</p>
              <p>這款白蘭地蛋糕，就是他私藏多年的心頭好。早幾年，他甚至認真研究過怎樣把它帶來香港。</p>
              <p>一個在日本住了那麼多年、什麼好東西沒見過的大人，願意為一塊蛋糕動這個念頭——</p>
              <p>直到最近他回港，行李裡帶了一盒。</p>
              <p>說真的，我當時沒有任何期待。日本手信甜點我吃得多了：太甜的，吃一口要配一大杯濃茶解膩；標榜「甘さ控えめ」的，又往往淡得像有誠意的海綿。</p>
              <p><strong>我對這一類東西的標準，早被訓練得很低。</strong></p>
            </div>
          </div>
        </section>

        {/* CH.2 */}
        <section className="bc-chapter" id="ch2">
          <div className="bc-col">
            <div className="bc-ch-head bc-reveal">
              <div className="bc-ch-kicker"><span className="bc-num">02</span><span className="bc-jp">一口目 ・ THE FIRST BITE</span></div>
              <h2>我們甚至沒有看盒上的名字，<br />就隨便拿來吃了。</h2>
            </div>
            <figure className="bc-reveal" style={{ marginTop: 0 }}>
              <img className="bc-tinted" src={`${IMG}/story-cut.jpg`} alt="切開的白蘭地蛋糕，露出濕潤金黃的糕體" loading="lazy" />
            </figure>
            <div className="bc-prose bc-reveal">
              <p>那天晚上，只當它是普通的日本蛋糕手信。切開，入口——嗯，合格的瑪德蓮式蛋糕：該甜的甜，該濕潤的濕潤。沒有失望，也沒有驚喜。</p>
              <p>然後，兩三秒之後。</p>
              <p>酒味不是第一時間出來的。是吞下去之後，才從喉嚨深處慢慢浮上來。我本來已經準備去沖茶——按照經驗，吃完日本甜點，總要配點茶解膩。</p>
              <p><strong>結果發現，不用。甜味自己退了。</strong>酒意也不嗆，只餘一點溫，從喉底慢慢落到胸口。餘韻乾淨得像什麼都沒發生過。</p>
              <p>我稱之為「大人味」甜點。</p>
              <p>酒香是濃郁醇厚的：糕體吸足了白蘭地，散發出優雅的橡木桶香氣與水果的甘甜。入喉時有烈酒的微醺感，尾韻則轉為溫潤的香醇——濃，而不烈。</p>
              <p>口感也有別於一般海綿蛋糕。白蘭地糖漿賦予糕體濕潤的質地，咬落紮實，卻不乾澀。</p>
              <p>做得講究的，糕體會以上好的牛油與杏仁粉烘焙——酒香之中，便融著濃郁的奶香與堅果香，整體風味更圓潤飽滿。</p>
              <p>我跟哥哥對望了一眼，沒有說話。</p>
              <p>隔了幾秒，他又切了一片。</p>
              <p>我也是。</p>
              <p>那一刻我已經想好：這個味道，要寫出來，讓更多人吃到。</p>
              <p>但我必須先老實說一件事——</p>
            </div>
          </div>
        </section>

        {/* THE PHOTO IS THE TEXT */}
        <div className="bc-breath bc-breath-photo">
          <figure className="bc-frame bc-reveal" style={{ margin: 0 }}>
            <img loading="lazy" src={`${IMG}/real-photo-v2.jpg`} alt="書桌上的白蘭地蛋糕實拍照" />
          </figure>
          <div className="bc-b-caption bc-reveal">那天，我們沒有打算拍照。所以它只有這張。</div>
        </div>

        {/* after the photo */}
        <section className="bc-chapter">
          <div className="bc-col">
            <div className="bc-prose bc-reveal">
              <p className="bc-pull"><strong>實物，其實不如照片吸引。</strong>它外表平凡到，我們一開始以為只是普通蛋糕——這正是它被低估的原因。那層不起眼的表皮，塗的是白蘭地酒液。誰會想到，平凡的外表底下，藏著這樣的玄機。</p>
              <p>所以如果你收到之後，第一眼看下去心想「就這樣？」——是的，就這樣。切一片，吃下去，等一等。</p>
            </div>
          </div>
        </section>

        {/* CH.3 */}
        <section className="bc-chapter" id="ch3">
          <div className="bc-col">
            <div className="bc-ch-head bc-reveal">
              <div className="bc-ch-kicker"><span className="bc-num">03</span><span className="bc-jp">育てる ・ IT GETS BETTER</span></div>
              <h2>熟成。</h2>
            </div>
            <figure className="bc-full bc-reveal" style={{ marginTop: 0 }}>
              <img className="bc-tinted" src={`${IMG}/craft.jpg`} alt="職人以錫紙包裹蛋糕，黑白照片" loading="lazy" />
            </figure>
            <div className="bc-prose bc-reveal">
              <p>我一直不知道，蛋糕，原來也會變。</p>
              <p>因為它最佳賞味期限較久，我沒有急著吃完，隔幾天切一片。就是這樣無心的慢吃，讓我發現——</p>
            </div>
            <div className="bc-diary bc-reveal" id="diary">
              <div className="bc-d-tabs" role="tablist">
                {DIARY.map((_, i) => (
                  <button
                    key={i}
                    className={`bc-d-tab ${diaryIdx === i ? "active" : ""}`}
                    role="tab"
                    onClick={() => setDiaryIdx(i)}
                  >
                    {i === 0 ? "DAY 1" : i === 1 ? "DAY 7" : "DAY 16"}
                  </button>
                ))}
              </div>
              <div className="bc-d-body">
                <div className="bc-d-date">{DIARY[diaryIdx].date}</div>
                <p>{DIARY[diaryIdx].body}</p>
              </div>
            </div>
            <div className="bc-prose bc-reveal">
              <p>我沒有做實驗。只是一直忘記吃。</p>
              <p>結果，它越來越好。</p>
              <p>為了確認那一晚不是巧合，後來我又買了一條。味道一樣。</p>
              <p>日本人有一個說法，叫「育てるブランデーケーキ」——會長大的白蘭地蛋糕。意思是，它買回家之後才開始熟成：酒會繼續往糕體深處走，一天一個味道。放，也是吃法的一部分。</p>
              <p>第一次看到這個說法，我笑了一下。蛋糕，還可以養？</p>
              <p>後來才知道，它的做法，本來就是為「放」而設的：蛋糕焗好之後趁熱掃上白蘭地，再用錫紙緊緊包好，讓酒慢慢滲進去。日本做它的老舖，幾十年都是這樣——人手一條一條浸酒、錫紙包好、入盒慢熟。最有名的一間，1956 年已經這樣做；一瓶 720ml 的白蘭地，只夠浸十幾條。</p>
            </div>
            <div className="bc-prose bc-reveal">
              <p>兩星期後，還真可以。</p>
            </div>
          </div>
        </section>

        {/* CH.4 */}
        <section className="bc-chapter" id="ch4">
          <div className="bc-col">
            <div className="bc-ch-head bc-reveal">
              <div className="bc-ch-kicker"><span className="bc-num">04</span><span className="bc-jp">誰に ・ WHO IT'S FOR</span></div>
              <h2>我會推薦給誰。</h2>
            </div>
            <div className="bc-prose bc-reveal">
              <p>先講我自己的食法，很簡單：夜晚，屋企，一個人，什麼都不配。切一片，慢慢吃，讓那三秒鐘在安靜裡完成。這是屬於我的犒賞時間。</p>
              <p>會喜歡它的人，我大概想得出三種。</p>
            </div>
            <div className="bc-who">
              <div className="bc-who-item bc-reveal">
                <figure className="bc-w-img"><img className="bc-tinted" loading="lazy" src={`${IMG}/persona-wine.jpg`} alt="晚上的聚會，一位穿晚禮服的女士拿著蛋糕與酒杯" /></figure>
                <div>
                  <div className="bc-w-no">一</div>
                  <h3>愛酒的人</h3>
                  <p>會立刻懂。帶了一件回公司，同事吃完第一句話是：「邊度買？我有個朋友超級喜歡酒，他一定會瘋掉。」</p>
                </div>
              </div>
              <div className="bc-who-item bc-reveal">
                <figure className="bc-w-img"><img className="bc-tinted" loading="lazy" src={`${IMG}/persona-sweet.jpg`} alt="深夜的餐桌，一小件蛋糕與一杯黑咖啡" /></figure>
                <div>
                  <div className="bc-w-no">二</div>
                  <h3>對甜品又愛又恨的人</h3>
                  <p>嫌甜膩、怕負擔，但又戒不掉。這塊蛋糕的甜，是有出口的。切一小片，配黑咖啡——罪惡感剛好，滿足感也剛好。</p>
                </div>
              </div>
              <div className="bc-who-item bc-reveal">
                <figure className="bc-w-img"><img className="bc-tinted" loading="lazy" src={`${IMG}/persona-gift.jpg`} alt="餐桌前，一人把禮盒遞給另一人" /></figure>
                <div>
                  <div className="bc-w-no">三</div>
                  <h3>想送一份特別禮物的人</h3>
                  <p>「對方大概率沒收過」——這六個字，本身就值回票價。而且它放得住，還會越放越好：這份禮物，不急。</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CH.5 */}
        <section className="bc-chapter bc-products" id="products">
          <div className="bc-col-wide">
            <div className="bc-col">
              <div className="bc-ch-head bc-reveal">
                <div className="bc-ch-kicker"><span className="bc-num">05</span><span className="bc-jp">贈り物 ・ THREE OCCASIONS</span></div>
                <h2>三種場合，三種選擇。</h2>
              </div>
              <div className="bc-prose bc-reveal">
                <p>三款的共同點：都放得住，都會隨時間變好。分別在於場合——和你想說的話，有多重。</p>
              </div>
            </div>
            <div className="bc-p-grid">
              <div className="bc-p-card bc-reveal">
                <div className="bc-p-img"><img loading="lazy" src={`${IMG}/product-ronshan.jpg`} alt="ロンシャン ブランデーケーキ" /></div>
                <div className="bc-p-scene">
                  <h3>「只是想知道，為什麼大家一直買它。」</h3>
                </div>
                <div className="bc-p-name">ロンシャン ブランデーケーキ<br />日常之選</div>
                <p className="bc-p-note">故事的開始，長輩帶回來的，就是這一塊。價錢親民，風味猶存——那晚那一塊，故事的開始。</p>
                <div className="bc-p-taste"><span className="bc-t-label">味道</span>牛油、雞蛋、砂糖的老式蛋糕底，浸足白蘭地利口酒。牛油香先出來，甜味老實，酒感直白——那晚打動我們的，就是它。</div>
                <div className="bc-p-price"><span className="bc-hkd">HK$188 <small>起</small></span></div>
                <a className="bc-p-cta" href={CART_URL}>預訂這一條</a>
              </div>
              <div className="bc-p-card feat bc-reveal">
                <div className="bc-p-img"><img loading="lazy" src={`${IMG}/product-esery.jpg`} alt="いせり ブランデーケーキ" /></div>
                <div className="bc-p-scene">
                  <h3>「將時間與白蘭地封存，釀造一封最濃郁的心意。」</h3>
                </div>
                <div className="bc-p-name">いせり ブランデーケーキ 300g<br />しっとり濕潤・禮盒裝</div>
                <p className="bc-p-note">日本人退職、異動時答謝同事的「お世話になりました」之選。夠體面但不誇張，收的人沒有壓力，送的人很有分寸。</p>
                <div className="bc-p-taste"><span className="bc-t-label">味道</span>國產牛油之外，加了杏仁粉和蜂蜜，糕體更細更潤，日本人叫「しっとり」。酒香圓，收得乾淨。放幾天，味道還會變深。</div>
                <div className="bc-p-price"><span className="bc-hkd">HK$288 <small>起</small></span></div>
                <a className="bc-p-cta" href={CART_URL}>預訂這一條</a>
              </div>
              <div className="bc-p-card bc-reveal">
                <div className="bc-p-img"><img loading="lazy" src={`${IMG}/product-okura.jpg`} alt="THE OKURA TOKYO シャンパンケーキ" /></div>
                <div className="bc-p-scene">
                  <h3>「有些禮物，送的不只是蛋糕。」</h3>
                </div>
                <div className="bc-p-name">THE OKURA TOKYO<br />オークラ東京のシャンパンケーキ</div>
                <p className="bc-p-note">長輩、合作很久的人、老師、婚禮——這種場合才輪到它出場。老牌飯店的招牌洋菓子，連包裝都帶著老派的體面。</p>
                <div className="bc-p-taste"><span className="bc-t-label">味道</span>用的不是白蘭地，是 Pommery 香檳：原瓶在酒店專用酒窖熟成三年，才成為這塊蛋糕的酒。酒感換成香檳的清雅，收尾最乾淨。</div>
                <div className="bc-p-price"><span className="bc-hkd">HK$588 <small>起</small></span></div>
                <a className="bc-p-cta" href={CART_URL}>預訂這一條</a>
              </div>
            </div>
            <div className="bc-col">
              <p className="bc-p-foot bc-reveal">※ 全部預訂制，約 2–3 週到港。價格以落單頁為準。<br />※ 產品含酒精成分。口味因人而異，以上只是個人的食後感。</p>
            </div>
          </div>
        </section>

        {/* ENDING */}
        <section className="bc-s-note" id="note">
          <div className="bc-col">
            <h2 className="bc-reveal">
              這不是我吃過最好吃的蛋糕。<br />
              但它是目前，<span className="bc-accent">我最想讓別人品嚐的一塊。</span>
            </h2>
            <div className="bc-prose bc-reveal">
              <p>「最好吃」三個字，我不敢用——世界那麼大，總有更驚艷的。但如果有一天有人問我：「去日本只能帶一樣甜點回來，你會選什麼？」現在，我大概會把這塊白蘭地蛋糕，放進答案裡。</p>
            </div>
            <figure className="bc-reveal">
              <img className="bc-tinted" src={`${IMG}/night.png`} alt="夜深的窗邊，一碟蛋糕與一杯茶" loading="lazy" />
            </figure>
            <div className="bc-cta-row bc-reveal">
              <a className="bc-btn-solid" href={CART_URL}>由一條開始 →</a>
              <a className="bc-btn-line" href={IG_URL} target="_blank" rel="noreferrer">有疑問？IG @jaag_select 找我聊</a>
            </div>
            <div className="bc-sign bc-reveal">
              <span className="bc-line" />
              <div className="bc-sign-row">
                <img className="bc-sign-avatar" src={`${IMG}/anson-avatar-bw.png`} alt="Benjamin" />
                <div className="bc-sign-text">
                  <span className="bc-who-name">Benjamin</span>
                  <span className="bc-what">jaagSELECT</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <button
        className={`bc-to-top ${showTop ? "show" : ""}`}
        aria-label="回到頂部"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        ↑
      </button>

      <div className={`bc-sticky-cta ${showCta ? "show" : ""}`} aria-hidden={!showCta}>
        <span className="bc-sticky-label">ブランデーケーキ</span>
        <a
          className="bc-sticky-btn"
          href="#products"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          查看三種預訂方案
        </a>
      </div>
    </div>
    </Layout>
  );
};

export default BrandyCake;
