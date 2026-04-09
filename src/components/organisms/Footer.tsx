const Footer = () => (
  <footer className="bg-foreground text-background">
    <div className="container py-16 grid grid-cols-2 md:grid-cols-3 gap-10">
      <div>
        <h3 className="font-heading text-xl tracking-[0.2em] mb-4">GNPERFUMES</h3>
        <p className="font-body text-sm opacity-70 leading-relaxed">
          Fragancias de lujo seleccionadas para quienes buscan exclusividad y elegancia.
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
        <ul className="space-y-2 font-body text-sm opacity-70">
          <li>GNperfumescol@gmail.com</li>
          <li>+57 323 627 0962</li>
          <li>pereira-Risaralda Colombia</li>
        </ul>
      </div>
    </div>
    <div className="border-t border-background/10">
      <div className="container py-6 text-center">
        <p className="font-body text-xs opacity-40">© 2026 GNperfumes. Todos los derechos reservados.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
