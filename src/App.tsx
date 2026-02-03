import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Article from "./pages/Article";
import Articles from "./pages/Articles";
import FeatureArticle from "./pages/FeatureArticle";
import FeatureArticleV2 from "./pages/FeatureArticleV2";
import Product from "./pages/Product";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import ProductRequest from "./pages/ProductRequest";
import Selectors from "./pages/Selectors";
import Selector from "./pages/Selector";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:productId" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product-request" element={<ProductRequest />} />
          <Route path="/category/:slug" element={<Category />} />
          <Route path="/category/:categorySlug/article/:articleId" element={<Article />} />
          <Route path="/category/:categorySlug/review/:articleId" element={<FeatureArticle />} />
          <Route path="/category/:categorySlug/share/:articleId" element={<FeatureArticleV2 />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/selectors" element={<Selectors />} />
          <Route path="/selector/:selectorId" element={<Selector />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<Privacy />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
