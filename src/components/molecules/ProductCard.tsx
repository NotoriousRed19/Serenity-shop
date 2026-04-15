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
}

const ProductCard = ({ id, name, brand, price, originalPrice, image, badge }: ProductCardProps) => {
  const { addItem } = useCart();

  return (
    <div className="group animate-fade-in [animation-delay:400ms] p-2 rounded-[2rem] border border-transparent hover:border-border/40 hover:bg-white/40 transition-all duration-500 soft-shadow hover:shadow-xl">
      <Link to={`/producto/${id}`} className="relative block overflow-hidden rounded-[1.5rem] bg-cream-dark aspect-square mb-6">
        <img
          src={image}
          alt={name}
          loading="lazy"
          width={533}
          height={533}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {badge && <div className="absolute top-4 left-4"><Badge variant={badge}>{badge === "sale" ? "Oferta" : "Nuevo"}</Badge></div>}
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); addItem({ id, name, brand, price, image }); }}
          className="absolute bottom-3 right-3 md:bottom-4 md:right-4 w-10 h-10 md:w-12 md:h-12 bg-white text-gold rounded-full flex items-center justify-center shadow-lg transition-all duration-500 hover:bg-gold hover:text-white opacity-100 md:opacity-0 md:group-hover:opacity-100 md:translate-y-4 md:group-hover:translate-y-0 active:scale-90"
          aria-label={`Agregar ${name} al carrito`}
        >
          <ShoppingBag className="w-5 h-5" />
        </button>
      </Link>
      <div className="text-center space-y-2 pb-4">
        <p className="text-[10px] font-body text-gold uppercase tracking-[0.3em] font-medium">{brand}</p>
        <h3 className="font-heading text-xl text-foreground leading-tight px-4">{name}</h3>
        <div className="flex items-center justify-center gap-3 pt-2">
          {originalPrice && (
            <span className="text-sm font-body text-muted-foreground/60 line-through decoration-gold/30">
              {formatCOP(originalPrice)}
            </span>
          )}
          <span className="text-base font-body font-semibold text-foreground tracking-tight">
            {formatCOP(price)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
