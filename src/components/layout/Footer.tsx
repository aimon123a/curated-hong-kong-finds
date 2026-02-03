import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background mt-20">
      <div className="container-editorial py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="inline-block mb-4">
              <span className="text-xl font-bold tracking-tight">
                jaag<span className="text-primary-light">SELECT</span>
              </span>
              <span className="text-xs text-background/60 font-medium ml-2">HK</span>
            </Link>
            <p className="text-sm text-background/70 leading-relaxed max-w-md">
              由專業編輯精選，為您帶來最值得信賴的產品推薦。
              我們深入研究每一款產品，讓您的選擇更加輕鬆。
            </p>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-sm font-semibold tracking-editorial uppercase mb-4">
              CATEGORIES
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/category/beauty"
                  className="text-sm text-background/70 hover:text-background transition-colors"
                >
                  外在管理
                </Link>
              </li>
              <li>
                <Link
                  to="/category/kitchen"
                  className="text-sm text-background/70 hover:text-background transition-colors"
                >
                  家居用品
                </Link>
              </li>
              <li>
                <Link
                  to="/category/lifestyle"
                  className="text-sm text-background/70 hover:text-background transition-colors"
                >
                  生活風格
                </Link>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="text-sm font-semibold tracking-editorial uppercase mb-4">
              ABOUT
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-sm text-background/70 hover:text-background transition-colors"
                >
                  關於我們
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-sm text-background/70 hover:text-background transition-colors"
                >
                  私隱政策
                </Link>
              </li>
              <li>
                <a
                  href="https://instagram.com/jaag_select"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-background/70 hover:text-background transition-colors inline-flex items-center gap-1"
                >
                  Instagram: @jaag_select
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-background/20 mt-10 pt-6">
          <p className="text-xs text-background/50 text-center">
            © 2024 jaagSELECT HK. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;