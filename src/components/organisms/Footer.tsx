import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const [tapCount, setTapCount] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navigate = useNavigate();

  const handleSecretTap = () => {
    const newCount = tapCount + 1;
    setTapCount(newCount);

    // Reset tap count after 2 seconds of inactivity
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setTapCount(0), 2000);

    
    if (newCount >= 5) {
      setTapCount(0);
      navigate("/admin");
    }
  };

  return (
    <footer className="bg-foreground text-background">
      <div className="container py-16 grid grid-cols-2 md:grid-cols-3 gap-10">
        <div>
          <h3 className="font-heading text-xl tracking-[0.2em] mb-4">GNPERFUMES</h3>
          <p className="font-body text-sm opacity-70 leading-relaxed">
            Fragancias de nicho y lujo cuidadosamente seleccionadas para quienes valoran estilos selectivos y sofisticados
          </p>
        </div>
        <div>
          <h4 className="font-body text-xs uppercase tracking-widest mb-4 opacity-50">Tienda</h4>
          <ul className="space-y-2">
            {["Mujer", "Hombre", "Unisex", "Novedades"].map((item) => (
              <li key={item}>
                <a href="#" className="font-body text-sm opacity-70 hover:opacity-100 transition-opacity">{item}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-body text-xs uppercase tracking-widest mb-4 opacity-50">Contacto</h4>
          <ul className="space-y-3 font-body text-sm opacity-80">
            <li className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-gold shrink-0" />
              <a href="mailto:GNperfumescol@gmail.com" className="hover:text-gold transition-colors">GNperfumescol@gmail.com</a>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-gold shrink-0" />
              <a href="tel:+573236270962" className="hover:text-gold transition-colors">+57 323 627 0962</a>
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-gold shrink-0" />
              <span>Pereira, Risaralda - Colombia</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-background/10">
        <div className="container py-6 text-center">
          <p
            className="font-body text-xs opacity-40 cursor-default select-none"
            onClick={handleSecretTap}
          >
            © 2026 GNperfumes. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
