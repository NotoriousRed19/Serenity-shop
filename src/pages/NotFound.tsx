import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { usePageMeta } from "@/hooks/usePageMeta";

const NotFound = () => {
  const location = useLocation();

  usePageMeta({
    title: "Página no encontrada | Essenza",
    description: "La página que buscas no existe. Vuelve al catálogo de Essenza.",
  });

  useEffect(() => {
    console.error("404 — Ruta no encontrada:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background text-center px-6 gap-6">
      <span className="text-[10px] uppercase tracking-[0.4em] text-primary font-medium">Error 404</span>
      <h1 className="font-heading text-5xl md:text-7xl text-foreground">Página no encontrada</h1>
      <p className="font-body text-muted-foreground max-w-sm leading-relaxed">
        La página que buscas no existe o fue movida. Explora nuestra colección de fragancias.
      </p>
      <Link
        to="/"
        className="inline-flex items-center justify-center bg-primary text-primary-foreground px-8 py-3 rounded-full text-sm font-medium tracking-widest hover:bg-primary/90 transition-all duration-300 hover:scale-105"
      >
        Volver al inicio
      </Link>
    </div>
  );
};

export default NotFound;
