import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

interface NavItem {
  label: string;
  to: string;
  children?: string[];
}

const navItems: NavItem[] = [
  { label: "Inicio", to: "/" },
  { label: "Catálogo", to: "/catalogo" },
  { label: "Novedades", to: "/novedades" },
  { label: "Contacto", to: "/#contacto" },
];

const NavLinks = () => {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <nav className="hidden md:flex items-center gap-8">
      {navItems.map((item) => (
        <div
          key={item.label}
          className="relative"
          onMouseEnter={() => item.children && setOpen(item.label)}
          onMouseLeave={() => setOpen(null)}
        >
          <Link
            to={item.to}
            className="flex items-center gap-1 text-sm font-body text-foreground hover:text-primary transition-colors tracking-wide"
          >
            {item.label}
            {item.children && <ChevronDown className="w-3 h-3" />}
          </Link>
          {item.children && open === item.label && (
            <div className="absolute top-full left-0 mt-2 bg-background border border-border shadow-lg py-2 min-w-[160px] z-50">
              {item.children.map((child) => (
                <Link
                  key={child}
                  to="#"
                  className="block px-4 py-2 text-sm font-body text-foreground hover:bg-secondary transition-colors"
                >
                  {child}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  );
};

export default NavLinks;
