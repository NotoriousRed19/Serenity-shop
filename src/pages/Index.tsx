import AnnouncementBar from "@/components/atoms/AnnouncementBar";
import Header from "@/components/organisms/Header";
import HeroSection from "@/components/organisms/HeroSection";
import CategorySection from "@/components/organisms/CategorySection";
import ProductGrid from "@/components/organisms/ProductGrid";
import ContactSection from "@/components/organisms/ContactSection";
import Footer from "@/components/organisms/Footer";
import CartDrawer from "@/components/organisms/CartDrawer";

const Index = () => (
  <div className="min-h-screen bg-background">
    <AnnouncementBar />
    <Header />
    <HeroSection />
    <CategorySection />
    <ProductGrid title="Nuevos Productos" />
    <ContactSection />
    <Footer />
    <CartDrawer />
  </div>
);

export default Index;
