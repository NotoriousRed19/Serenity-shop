import { Search, ShoppingBag, Menu } from "lucide-react";
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
      <div className="container flex items-center justify-between py-4 md:py-6">
        {/* Mobile: Left - Menu Button */}
        <div className="flex md:hidden flex-1">
          <button
            className="text-foreground p-2 -ml-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menú"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Desktop: Left - Search/Links placeholder if needed, but let's stick to current structure */}
        <div className="hidden md:flex items-center gap-4 flex-1">
          <button className="text-foreground hover:text-primary transition-colors" aria-label="Buscar">
            <Search className="w-5 h-5" />
          </button>
        </div>

        {/* Center: Logo */}
        <div className="flex justify-center">
          <Link to="/" onClick={() => setMobileOpen(false)}>
            <Logo />
          </Link>
        </div>

        {/* Right: Cart */}
        <div className="flex items-center justify-end gap-2 md:gap-4 flex-1">
          <button
            className="relative text-foreground hover:text-primary transition-colors p-2 -mr-2"
            aria-label="Carrito"
            onClick={toggleCart}
          >
            <ShoppingBag className="w-6 h-6 md:w-5 md:h-5" />
            {totalItems > 0 && (
              <span className="absolute top-1 right-1 md:-top-1 md:-right-1 bg-primary text-primary-foreground text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-body shadow-sm">
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
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-lg px-6 py-8 space-y-6 animate-in slide-in-from-top duration-300">
          <div className="pb-4 border-b border-border">
            <button className="w-full flex items-center justify-center gap-2 py-3 bg-secondary/50 rounded-xl text-sm font-body text-foreground">
              <Search className="w-4 h-4" /> Buscar Fragancia
            </button>
          </div>
          <nav className="space-y-4">
            {mobileNavItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className="block text-lg font-heading text-foreground hover:text-primary transition-colors border-b border-border/50 pb-2"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
