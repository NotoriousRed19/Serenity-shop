import { Link } from "react-router-dom";
import ProductCard from "../molecules/ProductCard";
import { Product } from "@/data/products";

interface ProductGridProps {
  title: string;
  products: Product[];
  showViewAll?: boolean;
  isLoading?: boolean;
}

const ProductGrid = ({ title, products, showViewAll = true, isLoading = false }: ProductGridProps) => (
  <section id="catalogo" className="container py-12 md:py-24 animate-fade-in [animation-delay:400ms]">
    <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-16 gap-6">
      <div>
        <span className="text-[10px] uppercase tracking-[0.4em] text-gold mb-2 block font-medium">
          Selección Curada
        </span>
        <h2 className="font-heading text-4xl md:text-5xl text-foreground">{title}</h2>
      </div>
      {showViewAll && (
        <div className="flex gap-4">
          <Link 
            to="/catalogo" 
            className="text-xs uppercase tracking-widest font-medium text-muted-foreground hover:text-gold transition-colors border-b border-transparent hover:border-gold pb-1"
          >
            Ver Todo
          </Link>
        </div>
      )}
    </div>

    {isLoading ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="animate-pulse space-y-4">
            <div className="aspect-square bg-secondary rounded-[1.5rem]" />
            <div className="space-y-2 flex flex-col items-center">
              <div className="h-3 w-16 bg-secondary rounded" />
              <div className="h-5 w-32 bg-secondary rounded" />
              <div className="h-4 w-20 bg-secondary rounded" />
            </div>
          </div>
        ))}
      </div>
    ) : products.length === 0 ? (
      <div className="text-center py-20">
        <p className="font-body text-muted-foreground text-lg">No se encontraron productos.</p>
      </div>
    ) : (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 md:gap-x-8 gap-y-10 md:gap-y-16">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            brand={product.brand}
            price={product.price}
            originalPrice={product.originalPrice}
            image={product.images[0]}
            badge={product.badge}
            concentration={product.concentration}
            volume={product.volume}
          />
        ))}
      </div>
    )}
  </section>
);

export default ProductGrid;
