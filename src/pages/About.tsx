import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const About = () => {
  return (
    <Layout>
      <div className="container-editorial py-12 md:py-20">
        {/* Hero Section */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-4 block">
            ABOUT US
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            關於 jaagSELECT
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            為香港消費者提供最可靠、最詳盡的產品評測與推薦
          </p>
        </div>

        {/* Mission Section */}
        <section className="max-w-4xl mx-auto mb-16">
          <div className="bg-primary-light rounded-sm p-8 md:p-12">
            <h2 className="text-2xl font-bold mb-6 text-primary">我們的使命</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              jaagSELECT HK 致力於成為香港消費者最信賴的產品評測平台。在資訊氾濫的時代，我們深知選擇困難的痛苦。因此，我們組建了一支由各領域專家組成的編輯團隊，為您嚴選最值得購買的產品。
            </p>
            <p className="text-muted-foreground leading-relaxed">
              無論是護膚美容、家居生活還是個人風格，我們都以最嚴謹的態度進行測試和分析，確保每一篇評測都能為您提供真實、有價值的參考。
            </p>
          </div>
        </section>

        {/* Values Section */}
        <section className="max-w-4xl mx-auto mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">我們的核心價值</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-muted p-6 rounded-sm">
              <h3 className="text-lg font-bold mb-3 text-primary">認真嚴謹</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                每一篇評測都經過編輯的親身測試，從產品成分、使用體驗到性價比，為您提供全方位的分析。
              </p>
            </div>
            <div className="bg-muted p-6 rounded-sm">
              <h3 className="text-lg font-bold mb-3 text-primary">真實客觀</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                我們堅持獨立評測，不受品牌贊助影響。所有推薦都基於真實使用體驗，確保內容的可信度。
              </p>
            </div>
            <div className="bg-muted p-6 rounded-sm">
              <h3 className="text-lg font-bold mb-3 text-primary">用心推薦</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                我們理解每位讀者的需求不同，因此會根據不同膚質、生活習慣提供個性化的產品建議。
              </p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="max-w-4xl mx-auto mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">我們的團隊</h2>
          <p className="text-muted-foreground leading-relaxed text-center max-w-2xl mx-auto mb-8">
            jaagSELECT 的編輯團隊由對生活充滿熱情的人組成，包括美容達人、健身教練、生活風格博主等。每位 SELECTor 都在其擅長領域擁有豐富經驗，為您帶來最用心的產品推薦。
          </p>
          <div className="text-center">
            <Link
              to="/selectors"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              認識我們的 SELECTor
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="max-w-4xl mx-auto">
          <div className="bg-foreground text-background rounded-sm p-8 md:p-12 text-center">
            <h2 className="text-2xl font-bold mb-4">與我們聯繫</h2>
            <p className="text-background/70 mb-6">
              有任何問題或合作洽談，歡迎透過以下方式聯繫我們
            </p>
            <a
              href="https://instagram.com/jaag_select"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Instagram: @jaag_select
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default About;
