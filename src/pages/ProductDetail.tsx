import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ShoppingBag, ArrowLeft, Minus, Plus } from "lucide-react";
import { getProductById } from "@/data/products";
import { useCart } from "@/context/CartContext";
import AnnouncementBar from "@/components/atoms/AnnouncementBar";
import Header from "@/components/organisms/Header";
import Footer from "@/components/organisms/Footer";
import CartDrawer from "@/components/organisms/CartDrawer";
import { Button } from "@/components/ui/button";
import { usePageMeta } from "@/hooks/usePageMeta";

const formatPrice = (amount: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const product = getProductById(id || "");
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // SEO: título dinámico por producto
  usePageMeta({
    title: product
      ? `${product.name} — ${product.brand} | Essenza`
      : "Producto | Essenza",
    description: product
      ? `${product.name} de ${product.brand}. ${product.concentration} · ${product.volume}. ${product.description.slice(0, 120)}...`
      : undefined,
  });

  // JSON-LD Structured Data para rich results en Google
  useEffect(() => {
    if (!product) return;

    const schema = {
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.name,
      brand: { "@type": "Brand", name: product.brand },
      description: product.description,
      image: product.images,
      sku: product.id,
      offers: {
        "@type": "Offer",
        priceCurrency: "USD",
        price: product.price.toFixed(2),
        availability: "https://schema.org/InStock",
        seller: { "@type": "Organization", name: "Essenza" },
      },
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "product-jsonld";
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      const existing = document.getElementById("product-jsonld");
      if (existing) document.head.removeChild(existing);
    };
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="font-heading text-3xl text-foreground">Producto no encontrado</h1>
          <Button variant="outline" onClick={() => navigate("/")}>
            Volver al inicio
          </Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        brand: product.brand,
        price: product.price,
        image: product.images[0],
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Header />

      <section className="container py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm font-body text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
          {/* Gallery */}
          <div className="space-y-4">
            <div className="aspect-square bg-secondary overflow-hidden">
              <img
                src={product.images[selectedImage]}
                alt={`${product.name} — ${product.brand}`}
                className="w-full h-full object-cover"
                width={600}
                height={600}
              />
            </div>
            <div className="grid grid-cols-3 gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`aspect-square bg-secondary overflow-hidden border-2 transition-colors ${
                    selectedImage === i ? "border-foreground" : "border-transparent"
                  }`}
                  aria-label={`Ver imagen ${i + 1} de ${product.name}`}
                >
                  <img src={img} alt={`${product.name} — vista ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div>
              <p className="text-xs font-body text-muted-foreground uppercase tracking-widest mb-2">
                {product.brand}
              </p>
              <h1 className="font-heading text-3xl md:text-4xl text-foreground">{product.name}</h1>
            </div>

            <div className="flex items-center gap-3">
              {product.originalPrice && (
                <span className="text-lg font-body text-muted-foreground line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              <span className="text-2xl font-body font-medium text-foreground">
                {formatPrice(product.price)}
              </span>
              {product.badge === "sale" && (
                <span className="text-xs font-body bg-destructive text-destructive-foreground px-2 py-1 uppercase tracking-wider">
                  Oferta
                </span>
              )}
            </div>

            <p className="font-body text-muted-foreground leading-relaxed">{product.description}</p>

            <div className="flex gap-6 text-sm font-body text-muted-foreground">
              <span>{product.concentration}</span>
              <span>{product.volume}</span>
            </div>

            {/* Fragrance Notes */}
            <div className="border-t border-border pt-6 space-y-4">
              <h2 className="font-heading text-xl text-foreground">Notas de Fragancia</h2>
              <div className="space-y-3">
                {[
                  { label: "Notas de salida", notes: product.notes.top },
                  { label: "Notas de corazón", notes: product.notes.heart },
                  { label: "Notas de fondo", notes: product.notes.base },
                ].map((group) => (
                  <div key={group.label}>
                    <p className="text-xs font-body text-muted-foreground uppercase tracking-widest mb-1">
                      {group.label}
                    </p>
                    <p className="font-body text-foreground">{group.notes.join(" · ")}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Add to cart */}
            <div className="border-t border-border pt-6 space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-sm font-body text-muted-foreground">Cantidad</span>
                <div className="flex items-center border border-border">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-10 h-10 flex items-center justify-center text-foreground hover:bg-secondary transition-colors"
                    aria-label="Reducir cantidad"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-body text-foreground" aria-live="polite">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-10 h-10 flex items-center justify-center text-foreground hover:bg-secondary transition-colors"
                    aria-label="Aumentar cantidad"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <Button
                onClick={handleAddToCart}
                className="w-full h-12 text-base font-body uppercase tracking-widest"
                aria-label={`Agregar ${product.name} al carrito`}
              >
                <ShoppingBag className="w-5 h-5 mr-2" />
                Agregar al carrito
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <CartDrawer />
    </div>
  );
};

export default ProductDetail;
