import { X, Minus, Plus, ShoppingBag, MessageCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";

// ── Configura aquí tu número de WhatsApp (código de país sin el +) ──────────
const WHATSAPP_NUMBER = "584246270071"; // ← Reemplaza con tu número real
// ────────────────────────────────────────────────────────────────────────────

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);

const buildWhatsAppMessage = (
  items: { name: string; brand: string; price: number; quantity: number }[],
  totalPrice: number
) => {
  const separator = "----------------------------";
  const date = new Date().toLocaleDateString("es-CO", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const time = new Date().toLocaleTimeString("es-CO", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const header = [
    "*ESSENZA - PERFUMES & FRAGANCIAS*",
    `Fecha: ${date}  Hora: ${time}`,
    separator,
    "*DETALLE DE MI PEDIDO*",
    separator,
  ].join("\n");

  const itemLines = items
    .map((item, idx) => {
      const subtotal = item.price * item.quantity;
      return [
        `*${idx + 1}. ${item.name}*`,
        `   _${item.brand}_`,
        `   Cantidad: ${item.quantity}`,
        `   Precio unit.: ${formatCurrency(item.price)}`,
        `   Subtotal: *${formatCurrency(subtotal)}*`,
      ].join("\n");
    })
    .join("\n\n");

  const footer = [
    separator,
    `*TOTAL A PAGAR: ${formatCurrency(totalPrice)}*`,
    separator,
    "Hola! Me gustaría realizar este pedido.",
  ].join("\n");

  const fullMessage = [header, itemLines, footer].join("\n\n");
  return encodeURIComponent(fullMessage);
};

const CartDrawer = () => {
  const { items, isOpen, setIsOpen, totalItems, totalPrice, removeItem, updateQuantity, clearCart } = useCart();

  const handleWhatsAppCheckout = () => {
    const message = buildWhatsAppMessage(items, totalPrice);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    window.open(url, "_blank", "noopener,noreferrer");
    clearCart();
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-foreground/40 z-40" onClick={() => setIsOpen(false)} />
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-background z-50 shadow-2xl flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="font-heading text-xl text-foreground">
            Carrito ({totalItems})
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-foreground hover:text-primary transition-colors"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
              <ShoppingBag className="w-12 h-12 text-muted-foreground" />
              <p className="font-body text-muted-foreground">Tu carrito está vacío</p>
              <button
                onClick={() => setIsOpen(false)}
                className="border border-foreground text-foreground px-6 py-2 text-sm font-body tracking-wider hover:bg-foreground hover:text-background transition-colors"
              >
                Seguir comprando
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover bg-secondary flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-heading text-sm text-foreground truncate">{item.name}</h3>
                  <p className="text-xs font-body text-muted-foreground uppercase tracking-widest">{item.brand}</p>
                  <div className="flex items-baseline gap-2 mt-1">
                    <p className="text-sm font-body font-medium text-foreground">
                      {formatCurrency(item.price)}
                    </p>
                    {item.quantity > 1 && (
                      <p className="text-xs font-body text-muted-foreground">
                        × {item.quantity} = {formatCurrency(item.price * item.quantity)}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-3 mt-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-7 h-7 border border-border flex items-center justify-center text-foreground hover:bg-secondary transition-colors"
                      aria-label="Reducir cantidad"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-sm font-body text-foreground w-4 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-7 h-7 border border-border flex items-center justify-center text-foreground hover:bg-secondary transition-colors"
                      aria-label="Aumentar cantidad"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="ml-auto text-xs font-body text-muted-foreground underline hover:text-foreground transition-colors"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border p-6 space-y-4">
            {/* Order summary mini */}
            <div className="bg-secondary/50 rounded-sm p-4 space-y-2">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-xs font-body text-muted-foreground">
                  <span className="truncate max-w-[60%]">{item.name} ×{item.quantity}</span>
                  <span>{formatCurrency(item.price * item.quantity)}</span>
                </div>
              ))}
              <div className="border-t border-border pt-2 flex justify-between font-body text-sm font-medium text-foreground">
                <span>Total</span>
                <span className="text-gold font-semibold">{formatCurrency(totalPrice)}</span>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <button
              id="whatsapp-checkout-btn"
              onClick={handleWhatsAppCheckout}
              className="w-full flex items-center justify-center gap-3 bg-[#25D366] text-white py-3.5 text-sm font-body tracking-wider hover:bg-[#1ebe5d] active:scale-[0.98] transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              Pedir por WhatsApp
            </button>

            <button
              onClick={() => setIsOpen(false)}
              className="w-full text-center text-sm font-body text-muted-foreground underline hover:text-foreground transition-colors"
            >
              Seguir comprando
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
