import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import hero1 from "@/assets/hero-1.png";
import hero2 from "@/assets/hero-2.png";
import hero3 from "@/assets/hero-3.png";
import * as React from "react";
import { useEffect, useState } from "react";

const images = [
  { src: hero1, alt: "Esencia de Mármol" },
  { src: hero2, alt: "Maderas y Cítricos" },
  { src: hero3, alt: "Boutique Minimalista" }
];

const HeroSection = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 5000);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });

    return () => clearInterval(interval);
  }, [api]);

  return (
    <section className="container py-12 md:py-20 animate-fade-in">
      <div className="relative overflow-hidden rounded-[2rem] soft-shadow flex flex-col md:flex-row min-h-[500px] bg-card border border-white/20">
        <div className="md:w-3/5 relative group p-3 md:p-4">
          <Carousel setApi={setApi} className="w-full h-full" opts={{ loop: true }}>
            <CarouselContent className="h-full ml-0">
              {images.map((image, index) => (
                <CarouselItem key={index} className="h-full pl-0 basis-full">
                  <div className="w-full h-full min-h-[450px] overflow-hidden rounded-[1.5rem] relative">
                    <img
                      src={image.src}
                      alt={image.alt}
                      width={900}
                      height={600}
                      // Primera imagen: carga prioritaria para mejorar LCP
                      loading={index === 0 ? "eager" : "lazy"}
                      fetchPriority={index === 0 ? "high" : "low"}
                      decoding={index === 0 ? "sync" : "async"}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/5 pointer-events-none" />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-20">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => api?.scrollTo(index)}
                  className={`carousel-dot ${current === index ? "active" : ""}`}
                  aria-label={`Ir a la imagen ${index + 1}`}
                />
              ))}
            </div>
          </Carousel>
        </div>
        <div className="md:w-2/5 flex flex-col items-center justify-center p-10 md:p-16 text-center">
          <span className="text-[10px] uppercase tracking-[0.4em] text-primary mb-4 block">
            Esencia Exclusiva
          </span>
          {/* h1 en la homepage para SEO */}
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 leading-tight text-balance">
            Descubre tu Firma Olfativa
          </h1>
          <p className="font-body text-muted-foreground text-base mb-10 leading-relaxed max-w-xs mx-auto">
            Fragancias curadas artesanalmente para quienes buscan dejar una huella inolvidable.
          </p>
          <a
            href="#catalogo"
            className="inline-flex items-center justify-center bg-primary text-primary-foreground px-10 py-4 rounded-full text-sm font-medium tracking-widest hover:bg-primary/90 transition-all duration-300 hover:scale-105 soft-shadow"
          >
            VER COLECCIÓN
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
