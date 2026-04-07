import ProductCard from "../molecules/ProductCard";
import { products as allProducts, Product } from "@/data/products";

interface ProductGridProps {
  title: string;
  products?: Product[];
}

const ProductGrid = ({ title, products = allProducts }: ProductGridProps) => (
  <section id="catalogo" className="container py-12 md:py-24 animate-fade-in [animation-delay:400ms]">
    <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-16 gap-6">
      <div>
        <span className="text-[10px] uppercase tracking-[0.4em] text-gold mb-2 block font-medium">
          Selección Curada
        </span>
        <h2 className="font-heading text-4xl md:text-5xl text-foreground">{title}</h2>
      </div>
      <div className="flex gap-4">
        <button className="text-xs uppercase tracking-widest font-medium text-muted-foreground hover:text-gold transition-colors border-b border-transparent hover:border-gold pb-1">
          Ver Todo
        </button>
      </div>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
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
        />
      ))}
    </div>
  </section>
);

export default ProductGrid;
