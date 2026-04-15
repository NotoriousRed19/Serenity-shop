import { Link } from "react-router-dom";
import categoryMujer from "@/assets/category-mujer.png";
import categoryHombre from "@/assets/category-hombre.png";
import categoryUnisex from "@/assets/category-unisex.png";

const categories = [
  { name: "Mujer", image: categoryMujer, description: "Florales, orientales y frescas", slug: "Mujer" },
  { name: "Hombre", image: categoryHombre, description: "Amaderadas, cítricas y especiadas", slug: "Hombre" },
  { name: "Unisex", image: categoryUnisex, description: "Fragancias sin género", slug: "Unisex" },
];

const CategorySection = () => (
  <section className="container py-20 animate-fade-in [animation-delay:200ms]">
    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
      <div>
        <span className="text-[10px] uppercase tracking-[0.4em] text-gold mb-2 block font-medium">
          Nuestras Esencias
        </span>
        <h2 className="font-heading text-4xl md:text-5xl text-foreground">Explora por Categoría</h2>
      </div>
      <p className="font-body text-muted-foreground text-sm max-w-xs md:text-right">
        Encuentra la fragancia perfecta que se adapte a tu estilo y personalidad.
      </p>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
      {categories.map((cat) => (
        <Link 
          key={cat.name} 
          to={`/catalogo?category=${cat.slug}`} 
          className="group relative block overflow-hidden rounded-2xl soft-shadow aspect-[3/4]"
        >
          <img
            src={cat.image}
            alt={`Perfumes para ${cat.name}`}
            loading="lazy"
            width={600}
            height={800}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-opacity duration-500 opacity-60 group-hover:opacity-80" />
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white transform transition-transform duration-500 group-hover:translate-y-[-8px]">
            <h3 className="font-heading text-3xl mb-2">{cat.name}</h3>
            <p className="font-body text-sm text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
              {cat.description}
            </p>
            <div className="mt-4 h-0.5 w-0 bg-gold group-hover:w-full transition-all duration-700" />
          </div>
        </Link>
      ))}
    </div>
  </section>
);

export default CategorySection;
