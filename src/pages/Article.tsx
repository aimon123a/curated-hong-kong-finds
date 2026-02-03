import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import ProductSection from "@/components/article/ProductSection";
import TableOfContents from "@/components/article/TableOfContents";
import { getArticleById, getCategoryBySlug } from "@/data/sampleData";
import { ChevronRight, Clock, User } from "lucide-react";

const Article = () => {
  const { categorySlug, articleId } = useParams<{
    categorySlug: string;
    articleId: string;
  }>();
  const [activeProductId, setActiveProductId] = useState<string>("");

  const article = getArticleById(articleId || "");
  const category = getCategoryBySlug(categorySlug || "");

  // Handle scroll spy for table of contents
  useEffect(() => {
    const products = (article as any)?.products;
    if (!products) return;

    const handleScroll = () => {
      const productSections = products.map((p: any) => ({
        id: p.id,
        element: document.getElementById(p.id),
      }));

      for (const section of productSections) {
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveProductId(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [article]);

  if (!article || !category) {
    return (
      <Layout>
        <div className="container-editorial py-20 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            找不到此文章
          </h1>
          <p className="text-muted-foreground">
            請確認網址是否正確，或返回首頁瀏覽。
          </p>
        </div>
      </Layout>
    );
  }

  const products = (article as any).products;
  const tocItems = products?.map((p: any) => ({
    id: p.id,
    rank: p.rank,
    name: p.name,
  })) || [];

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-muted border-b border-border">
        <div className="container-editorial py-3">
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
              首頁
            </Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <Link
              to={`/category/${categorySlug}`}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {category.chineseTitle}
            </Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <span className="text-foreground font-medium line-clamp-1">
              {article.title}
            </span>
          </nav>
        </div>
      </div>

      <div className="container-editorial py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <article className="lg:col-span-8">
            {/* Header */}
            <header className="mb-8">
              <span className="category-badge bg-primary-light text-primary mb-4">
                {category.chineseTitle}
              </span>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4 leading-tight">
                {article.title}
              </h1>
              <p className="text-muted-foreground mb-6">
                {article.excerpt}
              </p>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <time>{article.date}</time>
                </div>
                {article.author && (
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{article.author.name}</span>
                  </div>
                )}
              </div>
            </header>

            {/* Featured Image */}
            <div className="aspect-editorial overflow-hidden rounded-sm mb-8">
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Article Content */}
            {article.content && (
              <div
                className="prose prose-lg max-w-none mb-12"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            )}

            {/* Product Sections */}
            {products && products.length > 0 && (
              <div className="mt-12">
                <h2 className="text-xl font-bold text-foreground mb-6 pb-4 border-b border-border">
                  產品排名
                </h2>
                {products.map((product: any) => (
                  <ProductSection
                    key={product.id}
                    id={product.id}
                    productId={product.productId}
                    rank={product.rank}
                    name={product.name}
                    brand={product.brand}
                    price={product.price}
                    imageUrl={product.imageUrl}
                    rating={product.rating}
                    description={product.description}
                    pros={product.pros}
                    cons={product.cons}
                    specs={product.specs}
                  />
                ))}
              </div>
            )}
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-4">
            {/* Table of Contents */}
            {tocItems.length > 0 && (
              <TableOfContents items={tocItems} activeId={activeProductId} />
            )}

            {/* Author Card */}
            {article.author && (
              <div className="mt-6 bg-card border border-border rounded-sm p-4">
                <div className="flex items-center gap-3">
                  <img
                    src={article.author.imageUrl}
                    alt={article.author.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-foreground">
                      {article.author.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {article.author.title}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </Layout>
  );
};

export default Article;