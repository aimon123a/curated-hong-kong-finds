import Layout from "@/components/layout/Layout";

const Privacy = () => {
  return (
    <Layout>
      <div className="container-editorial py-12 md:py-20">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-4 block">
              PRIVACY POLICY
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              私隱政策
            </h1>
            <p className="text-muted-foreground">
              最後更新日期：2024年1月
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <section className="mb-10">
              <h2 className="text-xl font-bold mb-4 text-foreground">1. 簡介</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                jaagSELECT HK（以下簡稱「我們」）非常重視您的私隱。本私隱政策旨在說明我們如何收集、使用、披露和保護您的個人資料。
              </p>
              <p className="text-muted-foreground leading-relaxed">
                使用我們的網站即表示您同意本私隱政策所述的做法。如您不同意本政策，請勿使用我們的服務。
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-bold mb-4 text-foreground">2. 我們收集的資料</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                我們可能收集以下類型的資料：
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>瀏覽資料：包括您的 IP 地址、瀏覽器類型、訪問時間及瀏覽的頁面</li>
                <li>裝置資料：包括裝置類型、操作系統及唯一裝置識別碼</li>
                <li>Cookie 資料：用於改善您的瀏覽體驗</li>
                <li>您主動提供的資料：如訂閱電子報時提供的電郵地址</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-bold mb-4 text-foreground">3. 資料使用目的</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                我們使用收集的資料作以下用途：
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>提供及維護我們的服務</li>
                <li>改善及個人化用戶體驗</li>
                <li>分析網站使用情況以優化內容</li>
                <li>發送您訂閱的電子報或通知（如適用）</li>
                <li>防止欺詐及保障網站安全</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-bold mb-4 text-foreground">4. Cookie 政策</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                我們使用 Cookie 及類似技術來收集資料並改善服務。Cookie 是存儲在您裝置上的小型文字檔案。
              </p>
              <p className="text-muted-foreground leading-relaxed">
                您可以透過瀏覽器設定拒絕或刪除 Cookie，但這可能會影響您使用我們網站的部分功能。
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-bold mb-4 text-foreground">5. 資料共享</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                我們不會出售您的個人資料。我們可能在以下情況下共享您的資料：
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>與協助我們運營網站的第三方服務供應商（如分析工具）</li>
                <li>為遵守法律義務或回應法律程序</li>
                <li>為保護我們的權利、私隱、安全或財產</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-bold mb-4 text-foreground">6. 資料安全</h2>
              <p className="text-muted-foreground leading-relaxed">
                我們採取適當的技術及組織措施保護您的個人資料，防止未經授權的訪問、使用或披露。然而，請注意互聯網上的資料傳輸並非絕對安全，我們無法保證資料的絕對安全。
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-bold mb-4 text-foreground">7. 您的權利</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                根據《個人資料（私隱）條例》，您有權：
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>查閱我們持有的關於您的個人資料</li>
                <li>要求更正不準確的個人資料</li>
                <li>要求刪除您的個人資料（在某些情況下）</li>
                <li>撤回對處理您個人資料的同意</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-bold mb-4 text-foreground">8. 第三方連結</h2>
              <p className="text-muted-foreground leading-relaxed">
                我們的網站可能包含指向第三方網站的連結。我們對這些網站的私隱做法概不負責。我們建議您在訪問任何第三方網站時查閱其私隱政策。
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-bold mb-4 text-foreground">9. 政策更新</h2>
              <p className="text-muted-foreground leading-relaxed">
                我們可能會不時更新本私隱政策。更新後的政策將在本頁面發布，並註明最後更新日期。我們建議您定期查閱本政策以了解最新資訊。
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4 text-foreground">10. 聯絡我們</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                如您對本私隱政策有任何疑問或想行使您的資料權利，請透過以下方式聯絡我們：
              </p>
              <p className="text-muted-foreground">
                Instagram：
                <a 
                  href="https://instagram.com/jaag_select" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline ml-1"
                >
                  @jaag_select
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Privacy;
