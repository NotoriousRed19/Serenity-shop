import { Mail, MapPin, Phone, MessageCircle, Instagram, Share2 } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import contactStore from "@/assets/contact-store.png";

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const ContactSection = () => {
  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5 text-gold" />,
      label: "Correo electrónico",
      value: "GNperfumescol@gmail.com",
      href: "mailto:GNperfumescol@gmail.com",
    },
    {
      icon: <Phone className="w-5 h-5 text-gold" />,
      label: "Teléfono / WhatsApp",
      value: "+57 323 627 0962",
      href: "https://wa.me/573236270962",
    },
    {
      icon: <MapPin className="w-5 h-5 text-gold" />,
      label: "Ubicación",
      value: "Pereira - Risaralda, Colombia",
      href: "#",
    },
  ];

  return (
    <section id="contacto" className="py-24 bg-background overflow-hidden scroll-mt-24">
      <div className="container px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Visual Panel */}
          <div className="flex-1 w-full order-2 lg:order-1 animate-fade-in">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gold/5 rounded-2xl blur-2xl group-hover:bg-gold/10 transition-all duration-700" />
              <div className="relative overflow-hidden rounded-2xl soft-shadow aspect-[4/5] lg:aspect-square">
                <img
                  src={contactStore}
                  alt="GNperfumes Boutique"
                  className="w-full h-full object-cover transition-transform duration-[7000ms] ease-in-out group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
              </div>
            </div>
          </div>

          {/* Content Panel */}
          <div className="flex-1 space-y-10 order-1 lg:order-2 animate-fade-in [animation-delay:200ms]">
            <div className="space-y-4">
              <span className="text-[10px] uppercase tracking-[0.4em] text-gold font-medium block">
                Nuestra Esencia
              </span>
              <h2 className="font-heading text-4xl md:text-5xl text-foreground !leading-tight">
                GNperfumes: <br />
                <span className="italic font-playfair">Exclusividad</span>  & Elegancia
              </h2>
              <p className="font-body text-muted-foreground leading-relaxed max-w-lg">
                En GNperfumes no solo ofrecemos fragancias; creamos experiencias olfativas que reflejan tu esencia y elevan tu identidad. Nacimos de la pasión por la perfumería de nicho y de lujo, con el propósito de traer a Colombia las fragancias más exclusivas del mundo.<br/>

Cada perfume de nuestra colección ha sido cuidadosamente seleccionado para quienes buscan algo más que lo convencional, para quienes entienden que el verdadero lujo está en los detalles.
              </p>
            </div>

            <div className="space-y-8">
              {contactInfo.map((info, idx) => (
                <a
                  key={idx}
                  href={info.href}
                  className="flex items-start gap-5 group transition-all"
                >
                  <div className="p-3 rounded-full bg-secondary/50 group-hover:bg-gold/10 transition-colors">
                    {info.icon}
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">
                      {info.label}
                    </p>
                    <p className="font-body text-foreground group-hover:text-gold transition-colors">
                      {info.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href="https://wa.me/573236270962"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-foreground text-background px-8 py-4 rounded-full text-xs uppercase tracking-widest font-medium hover:bg-gold hover:text-foreground transition-all duration-500 shadow-xl hover:shadow-gold/20 active:scale-95"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp
              </a>

              <Popover>
                <PopoverTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="h-12 w-12 rounded-full border-gold/30 hover:border-gold hover:bg-gold/5 flex items-center justify-center p-0 transition-all duration-500 group shadow-lg hover:shadow-gold/10"
                    title="Nuestras Redes"
                  >
                    <Share2 className="w-5 h-5 text-gold group-hover:scale-110 transition-transform" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent 
                  className="w-48 p-2 rounded-2xl bg-background/80 backdrop-blur-xl border-gold/10 shadow-2xl animate-fade-in"
                  align="start"
                  sideOffset={8}
                >
                  <div className="flex flex-col gap-1">
                    <a
                      href="https://www.instagram.com/gnperfumescol?igsh=Mmg0NXo1ODNzMzJs"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-gold/10 transition-colors group"
                    >
                      <div className="w-8 h-8 rounded-full bg-secondary/50 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                        <Instagram className="w-4 h-4 text-gold" />
                      </div>
                      <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground group-hover:text-foreground transition-colors">Instagram</span>
                    </a>
                    <a
                      href="https://www.tiktok.com/@gnperfumescol?_r=1&_t=ZS-95Yr8tZYVSG"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-gold/10 transition-colors group"
                    >
                      <div className="w-8 h-8 rounded-full bg-secondary/50 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                        <TikTokIcon className="w-4 h-4 text-gold" />
                      </div>
                      <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground group-hover:text-foreground transition-colors">TikTok</span>
                    </a>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;
