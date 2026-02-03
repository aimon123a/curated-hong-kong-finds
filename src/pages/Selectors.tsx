import Layout from "@/components/layout/Layout";
import SectionHeader from "@/components/ui/SectionHeader";
import SelectorCard from "@/components/ui/SelectorCard";
import { selectors } from "@/data/sampleData";

const Selectors = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-primary-light py-16 md:py-24">
        <div className="container-editorial">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold tracking-editorial uppercase text-primary mb-4 block">
              MEET OUR SELECTORS
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              SELECTor
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl">
              我們的專業編輯團隊，各自專精於不同領域。
              憑藉豐富經驗和專業知識，為您挑選最值得推薦的產品。
            </p>
          </div>
        </div>
      </section>

      {/* Selectors Grid */}
      <section className="py-12 md:py-16">
        <div className="container-editorial">
          <SectionHeader
            englishTitle="OUR EXPERTS"
            chineseTitle="專業編輯團隊"
            description="每位 SELECTor 都在其專業領域擁有豐富經驗"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {selectors.map((selector) => (
              <SelectorCard key={selector.id} selector={selector} />
            ))}
          </div>
        </div>
      </section>

      {/* Join Us CTA */}
      <section className="py-12 md:py-16 bg-muted">
        <div className="container-editorial text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            成為 SELECTor
          </h2>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            如果你在某個領域有專業知識和熱情，歡迎加入我們的團隊，
            與更多人分享你的專業見解與真實評測。
          </p>
          <a
            href="/contact"
            className="btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-sm font-medium"
          >
            了解更多
          </a>
        </div>
      </section>
    </Layout>
  );
};

export default Selectors;
