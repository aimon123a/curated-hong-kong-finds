import { Link, useNavigate } from "react-router-dom";
import { Search, Menu, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { articles, products } from "@/data/sampleData";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Focus input when search opens
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  // Close search on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSearchOpen(false);
        setSearchQuery("");
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  // Search results
  const searchResults = searchQuery.trim().length > 0 ? {
    articles: articles.filter(
      (a) =>
        a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 3),
    products: Object.values(products).filter(
      (p: any) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 3),
  } : { articles: [], products: [] };

  const hasResults = searchResults.articles.length > 0 || searchResults.products.length > 0;

  const handleResultClick = (url: string) => {
    setSearchOpen(false);
    setSearchQuery("");
    navigate(url);
  };

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="container-editorial">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight">
              jaag<span className="text-primary">SELECT</span>
            </span>
            <span className="text-xs text-muted-foreground font-medium">HK</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/products"
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors link-underline py-1"
            >
              產品
            </Link>
            <Link
              to="/category/beauty"
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors link-underline py-1"
            >
              外在管理
            </Link>
            <Link
              to="/category/kitchen"
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors link-underline py-1"
            >
              家居生活
            </Link>
            <Link
              to="/category/lifestyle"
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors link-underline py-1"
            >
              生活風格
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button 
              className="p-2 text-foreground/70 hover:text-foreground transition-colors"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <Search className="w-5 h-5" />
            </button>
            
            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-foreground/70 hover:text-foreground transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Search Panel */}
        {searchOpen && (
          <div className="py-4 border-t border-border animate-fade-in">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="搜尋產品、文章..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-muted border border-border rounded-sm text-sm focus:outline-none focus:border-primary transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Search Results */}
            {searchQuery.trim().length > 0 && (
              <div className="mt-4 space-y-4">
                {hasResults ? (
                  <>
                    {/* Articles */}
                    {searchResults.articles.length > 0 && (
                      <div>
                        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                          文章
                        </h4>
                        <div className="space-y-2">
                          {searchResults.articles.map((article) => (
                            <button
                              key={article.id}
                              onClick={() => handleResultClick(`/category/${article.categorySlug}/share/${article.id}`)}
                              className="w-full text-left p-3 bg-muted/50 hover:bg-muted rounded-sm transition-colors"
                            >
                              <p className="text-sm font-medium text-foreground line-clamp-1">
                                {article.title}
                              </p>
                              <p className="text-xs text-muted-foreground line-clamp-1 mt-1">
                                {article.excerpt}
                              </p>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Products */}
                    {searchResults.products.length > 0 && (
                      <div>
                        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                          產品
                        </h4>
                        <div className="space-y-2">
                          {searchResults.products.map((product: any) => (
                            <button
                              key={product.id}
                              onClick={() => handleResultClick(`/products/${product.id}`)}
                              className="w-full text-left p-3 bg-muted/50 hover:bg-muted rounded-sm transition-colors flex items-center gap-3"
                            >
                              <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="w-10 h-10 object-contain bg-white rounded-sm"
                              />
                              <div>
                                <p className="text-sm font-medium text-foreground line-clamp-1">
                                  {product.brand} {product.name}
                                </p>
                                <p className="text-xs text-primary">
                                  HKD {product.price}
                                </p>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    找不到相關結果
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-4">
              <Link
                to="/products"
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors px-2 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                產品
              </Link>
              <Link
                to="/category/beauty"
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors px-2 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                外在管理
              </Link>
              <Link
                to="/category/kitchen"
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors px-2 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                家居生活
              </Link>
              <Link
                to="/category/lifestyle"
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors px-2 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                生活風格
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
