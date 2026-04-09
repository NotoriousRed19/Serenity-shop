import { Mail, MapPin, Phone, MessageCircle } from "lucide-react";
import contactStore from "@/assets/contact-store.png";

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
                <span className="italic font-playfair">Exclusividad</span> en cada gota.
              </h2>
              <p className="font-body text-muted-foreground leading-relaxed max-w-lg">
                En GNperfumes, no solo vendemos fragancias; curamos experiencias olfativas que definen tu identidad. 
                Nacimos de la pasión por la perfumería de nicho y de lujo, buscando traer a Colombia 
                las esencias más exclusivas del mundo. Cada perfume en nuestra colección ha sido seleccionado 
                meticulosamente para quienes no se conforman con lo ordinario.
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

            <div className="pt-4">
              <a
                href="https://wa.me/573236270962"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-foreground text-background px-8 py-4 rounded-full text-xs uppercase tracking-widest font-medium hover:bg-gold hover:text-foreground transition-all duration-500 shadow-xl hover:shadow-gold/20 active:scale-95"
              >
                <MessageCircle className="w-5 h-5" />
                Contactar por WhatsApp
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;
