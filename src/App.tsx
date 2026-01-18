import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Article from "./pages/Article";
import Product from "./pages/Product";
import Selectors from "./pages/Selectors";
import Selector from "./pages/Selector";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename="/curated-hong-kong-finds">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:slug" element={<Category />} />
          <Route path="/category/:categorySlug/article/:articleId" element={<Article />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/selectors" element={<Selectors />} />
          <Route path="/selector/:selectorId" element={<Selector />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
