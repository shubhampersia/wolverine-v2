import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect } from "react";
import Index from "./pages/Index.tsx";
import About from "./pages/About.tsx";
import Services from "./pages/Services.tsx";
import Industries from "./pages/Industries.tsx";
import ServiceDetail from "./pages/ServiceDetail.tsx";
import IndustryDetail from "./pages/IndustryDetail.tsx";
import Blogs from "./pages/Blogs.tsx";
import BlogDetail from "./pages/BlogDetail.tsx";
import Contact from "./pages/Contact.tsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:serviceKey" element={<ServiceDetail />} />
          <Route path="/industries" element={<Industries />} />
          <Route path="/industries/:industryKey" element={<IndustryDetail />} />
          <Route path="/blog" element={<Blogs />} />
          <Route path="/blog/:blogKey" element={<BlogDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
