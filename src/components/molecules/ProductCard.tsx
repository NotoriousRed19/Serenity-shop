import { Link } from "react-router-dom";
import Badge from "../atoms/Badge";
import { useCart } from "@/context/CartContext";
import { ShoppingBag } from "lucide-react";
import { formatCOP } from "@/lib/formatCurrency";

interface ProductCardProps {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  badge?: "sale" | "new";
  concentration?: string;
  volume?: string;
}

const ProductCard = ({ id, name, brand, price, originalPrice, image, badge, concentration, volume }: ProductCardProps) => {
  const { addItem } = useCart();

  return (
    <div className="group animate-fade-in [animation-delay:400ms] relative">
      <div className="relative overflow-hidden rounded-[2rem] bg-cream-dark aspect-[4/5] mb-4 border-2 border-gold/10 shadow-[0_8px_40px_rgba(0,0,0,0.06)] group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)] group-hover:shadow-gold/10 group-hover:border-gold/30 transition-all duration-700">
        <Link to={`/producto/${id}`} className="block w-full h-full">
          <img
            src={image}
            alt={name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
          />
          {/* Subtle Overlay Glow */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        </Link>
        
        {badge && (
          <div className="absolute top-4 left-4 z-10">
            <Badge variant={badge}>{badge === "sale" ? "Oferta" : "Nuevo"}</Badge>
          </div>
        )}

        {/* Glassmorphism Add to Cart Button */}
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); addItem({ id, name, brand, price, image }); }}
          className="absolute bottom-4 right-4 w-11 h-11 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full flex items-center justify-center shadow-xl transition-all duration-500 hover:bg-gold hover:border-gold hover:scale-110 active:scale-95 z-20"
          aria-label={`Agregar ${name} al carrito`}
        >
          <ShoppingBag className="w-5 h-5" />
        </button>
      </div>

      <div className="text-center space-y-1.5 px-2">
        <div className="flex flex-col gap-0.5">
          <p className="text-[9px] font-body text-gold uppercase tracking-[0.3em] font-bold">{brand}</p>
          {(concentration || volume) && (
            <p className="text-[8px] font-body text-muted-foreground/60 uppercase tracking-widest font-medium">
              {concentration} {volume && `• ${volume}`}
            </p>
          )}
        </div>
        
        <h3 className="font-heading text-lg md:text-xl text-foreground leading-tight line-clamp-1">{name}</h3>
        
        <div className="flex items-center justify-center gap-2.5">
          {originalPrice && (
            <span className="text-[11px] font-body text-muted-foreground/50 line-through decoration-gold/20">
              {formatCOP(originalPrice)}
            </span>
          )}
          <span className="text-sm md:text-base font-body font-bold text-foreground tracking-tight">
            {formatCOP(price)}
          </span>
        </div>
      </div>
      
      {/* Decorative Hover Underline */}
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-gold/30 transition-all duration-700 group-hover:w-1/2" />
    </div>
  );
};

export default ProductCard;
