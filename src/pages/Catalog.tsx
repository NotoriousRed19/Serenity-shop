import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, X, Loader2 } from "lucide-react";
import AnnouncementBar from "@/components/atoms/AnnouncementBar";
import Header from "@/components/organisms/Header";
import ProductGrid from "@/components/organisms/ProductGrid";
import Footer from "@/components/organisms/Footer";
import CartDrawer from "@/components/organisms/CartDrawer";
import { usePageMeta } from "@/hooks/usePageMeta";
import { useProducts } from "@/hooks/useProducts";

const Catalog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlQuery = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(urlQuery);
  const selectedCategory = searchParams.get("category") || "Todos";

  const { data: products = [], isLoading } = useProducts();

  // Sincronizar estado local con la URL cuando cambia (ej. desde el buscador del movil)
  useEffect(() => {
    setSearchQuery(urlQuery);
  }, [urlQuery]);

  usePageMeta({
    title: `Catálogo ${selectedCategory !== "Todos" ? `| ${selectedCategory}` : ""} | GNperfumes`,
    description: "Explora el catálogo completo de GNperfumes. Fragancias de lujo: Eau de Parfum, Extrait de Parfum y más.",
  });

  const filteredProducts = useMemo(() =>
    products.filter((p) => {
      const matchesCategory = selectedCategory === "Todos" || p.category === selectedCategory;
      const matchesSearch = 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.brand.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    }), [products, selectedCategory, searchQuery]);

  const categories = ["Todos", "Hombre", "Mujer", "Unisex"];

  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Header />
      
      <div className="pt-24 md:pt-32 container">
        {/* Filter & Search Header */}
        <div className="max-w-4xl mx-auto mb-16 space-y-8">
          <div className="text-center space-y-4">
            <h1 className="font-heading text-4xl md:text-5xl text-foreground">Nuestro Catálogo</h1>
            <p className="font-body text-muted-foreground text-sm max-w-lg mx-auto">
              Explora nuestra colección curada de fragancias de lujo seleccionadas para los gustos más exigentes.
            </p>
          </div>

          <div className="bg-secondary/30 backdrop-blur-md border border-border/50 rounded-3xl p-6 md:p-8 soft-shadow">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              {/* Text Search */}
              <div className="relative w-full md:flex-1 group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-gold transition-colors" />
                <input
                  type="text"
                  placeholder="Buscar fragancia o marca..."
                  value={searchQuery}
                  onChange={(e) => {
                    const val = e.target.value;
                    setSearchQuery(val);
                    setSearchParams(
                      (prev) => {
                        if (val) prev.set("q", val);
                        else prev.delete("q");
                        return prev;
                      },
                      { replace: true }
                    );
                  }}
                  className="w-full bg-background border border-border rounded-xl py-3 pl-12 pr-10 text-sm font-body focus:outline-none focus:ring-1 focus:ring-gold/50 focus:border-gold/50 transition-all placeholder:text-muted-foreground/50"
                />
                {searchQuery && (
                  <button 
                    onClick={() => {
                      setSearchQuery("");
                      setSearchParams(
                        (prev) => {
                          prev.delete("q");
                          return prev;
                        },
                        { replace: true }
                      );
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Category Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSearchParams(cat === "Todos" ? {} : { category: cat })}
                    className={`px-5 py-2.5 rounded-xl text-[10px] uppercase tracking-[0.2em] font-medium transition-all duration-300 border ${
                      selectedCategory === cat
                        ? "bg-foreground text-background border-foreground shadow-md -translate-y-0.5"
                        : "bg-background/50 text-muted-foreground border-border hover:border-gold hover:text-gold hover:-translate-y-0.5"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Search Results Count */}
            <div className="mt-4 flex justify-center md:justify-start">
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
              ) : (
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground/60 font-medium">
                  Mostrando {filteredProducts.length} productos
                </p>
              )}
            </div>
          </div>
        </div>

        <ProductGrid 
          title={selectedCategory === "Todos" && !searchQuery ? "Selección Completa" : "Resultados encontrados"} 
          products={filteredProducts} 
          showViewAll={false}
          isLoading={isLoading}
        />
      </div>

      <Footer />
      <CartDrawer />
    </div>
  );
};

export default Catalog;
