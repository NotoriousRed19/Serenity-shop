import { Search, User, ShoppingBag, Menu } from "lucide-react";
import Logo from "../atoms/Logo";
import NavLinks from "../molecules/NavLinks";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Link } from "react-router-dom";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems, toggleCart } = useCart();

  const mobileNavItems = [
    { label: "Inicio", to: "/" },
    { label: "Catálogo", to: "/catalogo" },
    { label: "Novedades", to: "/novedades" },
    { label: "Contacto", to: "/#contacto" },
  ];

  return (
    <header className="sticky top-0 z-50 glass">
      <div className="container flex items-center justify-between py-6">
        <div className="flex items-center gap-4">
          <button
            className="md:hidden text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menú"
          >
            <Menu className="w-5 h-5" />
          </button>
          <button className="text-foreground hover:text-primary transition-colors" aria-label="Buscar">
            <Search className="w-5 h-5" />
          </button>
        </div>

        <Link to="/">
          <Logo />
        </Link>

        <div className="flex items-center gap-4">
          <button className="text-foreground hover:text-primary transition-colors" aria-label="Cuenta">
            <User className="w-5 h-5" />
          </button>
          <button
            className="relative text-foreground hover:text-primary transition-colors"
            aria-label="Carrito"
            onClick={toggleCart}
          >
            <ShoppingBag className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-body">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="container hidden md:flex justify-center pb-4">
        <NavLinks />
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background px-6 py-4 space-y-3">
          {mobileNavItems.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              onClick={() => setMobileOpen(false)}
              className="block text-sm font-body text-foreground hover:text-primary transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
