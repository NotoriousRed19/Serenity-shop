import AnnouncementBar from "@/components/atoms/AnnouncementBar";
import Header from "@/components/organisms/Header";
import HeroSection from "@/components/organisms/HeroSection";
import CategorySection from "@/components/organisms/CategorySection";
import ProductGrid from "@/components/organisms/ProductGrid";
import ContactSection from "@/components/organisms/ContactSection";
import Footer from "@/components/organisms/Footer";
import CartDrawer from "@/components/organisms/CartDrawer";
import { useProducts } from "@/hooks/useProducts";

const Index = () => {
  const { data: products = [], isLoading } = useProducts();

  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Header />
      <HeroSection />
      <CategorySection />
      <ProductGrid title="Nuevos Productos" products={products.slice(0, 8)} isLoading={isLoading} />
      <ContactSection />
      <Footer />
      <CartDrawer />
    </div>
  );
};

export default Index;
