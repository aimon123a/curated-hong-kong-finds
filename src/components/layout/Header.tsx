import { Link } from "react-router-dom";
import { Search, Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
              to="/category/beauty"
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors link-underline py-1"
            >
              外在管理
            </Link>
            <Link
              to="/category/kitchen"
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors link-underline py-1"
            >
              廚房家電
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
            <button className="p-2 text-foreground/70 hover:text-foreground transition-colors">
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

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-4">
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
                廚房家電
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