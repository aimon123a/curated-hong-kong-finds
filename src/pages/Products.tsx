import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { ChevronRight } from "lucide-react";
import { productDetails } from "@/data/sampleData";
import clearexWiProductImage from "@/assets/articles/clearex-wi-product.jpg";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

const Products = () => {
  useDocumentMeta({
    title: "產品目錄 - Clearex Wi 香港代購｜日本藥用沐浴露",
    description: "精選日本優質產品，Clearex Wi 低刺激抗菌藥用沐浴露香港代購。由編輯團隊親自測試推薦。",
    canonical: "/products",
  });

  return (
    <Layout>
      {/* Breadcrumb - Sticky */}
      <div className="sticky top-16 z-40 bg-muted/95 backdrop-blur-sm border-b border-border">
        <div className="container-editorial py-3">
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
              首頁
            </Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <span className="text-foreground font-medium">
              產品
            </span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-background-warm py-12 md:py-16">
        <div className="container-editorial">
          <span className="text-xs font-semibold tracking-editorial uppercase text-primary mb-4 block">
            ALL PRODUCTS
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            產品目錄
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            精選日本優質產品，由我們的編輯團隊親自測試推薦。每款產品均經過嚴格篩選，確保品質與效果。
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 md:py-16">
        <div className="container-editorial">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {productDetails.map((product) => (
              <Link
                key={product.id}
                to={`/products/${product.id}`}
                className="group bg-card border border-border rounded-sm overflow-hidden hover:border-primary transition-colors"
              >
                {/* Image */}
                <div className="aspect-square bg-white p-4">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="p-4">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                    {product.brand}
                  </p>
                  <h3 className="font-medium text-foreground text-sm mb-2 line-clamp-2 min-h-[2.5rem]">
                    {product.name}
                  </h3>
                  <p className="text-primary font-bold">
                    HKD {product.variants[0].price}
                    {product.variants.length > 1 && '~'}
                  </p>
                  <div className="flex items-center gap-1 mt-2">
                    <span className="text-xs text-primary">★ {product.rating}</span>
                    <span className="text-xs text-muted-foreground">
                      ({product.reviewCount}則評價)
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {productDetails.length === 0 && (
            <div className="text-center py-12 bg-muted rounded-sm">
              <p className="text-muted-foreground">
                產品目錄即將上線，敬請期待！
              </p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Products;
