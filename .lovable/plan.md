# /brandy-cake（V1）實物照片與文案更新

以 `BrandyCakeV1.tsx` 為基礎修改，路由 `/brandy-cake` 與 `/brandy-cake-v1` 同步生效。

## 圖片準備

新上傳的實物照存到 `public/assets/brandy/v3/`：
- `package-1.jpg`（緞帶包裝）、`package-2.jpg`（開盒）、`package-3.jpg`（禮盒正面）
- `cross-section-1.jpg`（切片實拍）、`cross-section-4.jpg`（手寫注釋切面）
- `card-1.jpg`、`card-2.jpg`（日文說明卡，作為說明段落的配圖）
- `aging.png`（熟成三階段圖解）— 會用 AI 修圖把「1st Month／剛開封」「2nd Month／一個月後」「3rd Month／兩個月後」改成單行的「第一個月」「第二個月」「第三個月」，其餘版面、插畫與底色不變。

尺寸處理：所有新圖沿用現有 `figure` 全寬樣式（`width:100%`，細邊框，`margin: 3.6em 0`）。直度照片（package-1／package-2）以左右兩欄並排呈現，採 3:4 直幅、`object-contain` 配奶油底色，確保實物完整不被裁切。

## 內容修改

1. **商品資訊縮短＋可滾動**：`bc-p-note` 與 `bc-p-taste` 兩段文字精簡（保留關鍵：故事來源、自用／送禮兩用、味道描述），並包在一個 `max-height` 約 220px、`overflow-y: auto` 的容器內，加上細滾動條與底部漸層提示，有興趣的讀者可自行滑動。

2. **商品資訊與前言之間**：加入 `package-3.jpg`（禮盒正面）全寬圖。

3. **01 THE ENCOUNTER**：於「直到最近他回港，行李裡帶了一盒。」與「說真的，我當時沒有任何期待。」之間插入 package-1 + package-2 並排雙圖。

4. **02 一口目**：把原本的 AI 圖 `story-cut.jpg` 換成 `cross-section-1.jpg`。

5. **02 刪文**：移除「做得講究的，糕體會以上好的牛油與杏仁粉烘焙……」與「那一刻我已經想好：這個味道，要寫出來，讓更多人吃到。」兩句。

6. **店家說明（新段落）**：在「隔了幾秒，他又切了一片。我也是。」之後，加入兩張說明卡的中文翻譯區塊——左圖（card-1／card-2 實拍）右譯文的引用卡樣式，沿用頁面既有的細線＋奶油底風格；指定句子以 `<strong>` 加粗（「充分發揮白蘭地芳醇香氣的現代風格蛋糕」、「若您將其放在冰箱冷藏靜置 2 個月、3 個月，風味會變得更加深邃。」）。

7. **03 熟成**：`craft.jpg` 換成修圖後的 `aging.png`。

8. **熟成日記分頁**：DAY 1／DAY 7／DAY 16 改為「第一個月／第二個月／第三個月」，並套用新的第二、第三個月文案。

9. **切面照與說明搬移**：`real-photo-v2.jpg` 換成 `cross-section-4.jpg`；說明文字改為「經過時間的沉澱，酒液慢慢浸透糕體；隨著酒香的完美融合，帶來了味覺層次的昇華。」；整個圖＋說明區塊從 02 之後搬到 03 段落「後來才知道，它的做法……讓酒慢慢滲進去。」之後。

## 技術細節

- 只改 `src/pages/BrandyCakeV1.tsx` 與 `src/pages/BrandyCake.css`（新增並排圖 grid、可滾動商品資訊、說明卡樣式），不影響 V2／legacy。
- 新增 CSS：`.bc-p-scroll`、`.bc-pair`（響應式，手機改為上下堆疊）、`.bc-note-card`。
- 目次（INDEX）與 SEO meta 不變。
