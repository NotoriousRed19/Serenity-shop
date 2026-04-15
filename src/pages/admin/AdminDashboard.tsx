import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  LogOut,
  Package,
  DollarSign,
  Tag,
  LayoutGrid,
  Loader2,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProducts, useDeleteProduct } from "@/hooks/useProducts";
import { Product } from "@/data/products";
import { toast } from "sonner";
import { formatCOP } from "@/lib/formatCurrency";

const AdminDashboard = () => {
  const { data: products = [], isLoading } = useProducts();
  const deleteProduct = useDeleteProduct();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const categories = ["Todos", "Hombre", "Mujer", "Unisex"];

  const filteredProducts = useMemo(
    () =>
      products.filter((p) => {
        const matchesCategory = selectedCategory === "Todos" || p.category === selectedCategory;
        const matchesSearch =
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.id.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      }),
    [products, selectedCategory, searchQuery]
  );

  const stats = useMemo(() => ({
    total: products.length,
    hombre: products.filter((p) => p.category === "Hombre").length,
    mujer: products.filter((p) => p.category === "Mujer").length,
    unisex: products.filter((p) => p.category === "Unisex").length,
    avgPrice: products.length > 0 ? products.reduce((s, p) => s + p.price, 0) / products.length : 0,
  }), [products]);

  const handleDelete = async (product: Product) => {
    if (!window.confirm(`¿Estás seguro de eliminar "${product.name}"?`)) return;
    setDeletingId(product.id);
    try {
      await deleteProduct.mutateAsync(product.id);
    } finally {
      setDeletingId(null);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_auth");
    toast.success("Sesión cerrada");
    navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/20 rounded-lg flex items-center justify-center">
              <LayoutGrid className="w-4 h-4 text-gold" />
            </div>
            <h1 className="font-heading text-lg text-foreground">Admin Panel</h1>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="text-xs font-body text-muted-foreground hover:text-gold transition-colors uppercase tracking-wider"
            >
              Ver tienda
            </Link>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="text-muted-foreground hover:text-destructive">
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { label: "Total", value: stats.total, icon: Package, color: "text-foreground" },
            { label: "Hombre", value: stats.hombre, icon: Tag, color: "text-blue-500" },
            { label: "Mujer", value: stats.mujer, icon: Tag, color: "text-pink-500" },
            { label: "Unisex", value: stats.unisex, icon: Tag, color: "text-purple-500" },
            { label: "Precio Prom.", value: formatCOP(stats.avgPrice), icon: DollarSign, color: "text-gold" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-card border border-border/40 rounded-2xl p-4 md:p-5 soft-shadow"
            >
              <div className="flex items-center gap-2 mb-2">
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">
                  {stat.label}
                </span>
              </div>
              <p className="font-heading text-2xl text-foreground">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar por nombre, marca o ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-card border border-border rounded-xl py-2.5 pl-10 pr-9 text-sm font-body focus:outline-none focus:ring-1 focus:ring-gold/50 focus:border-gold/50 transition-all placeholder:text-muted-foreground/40"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="flex gap-2 overflow-x-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] uppercase tracking-wider font-medium transition-all border whitespace-nowrap ${
                    selectedCategory === cat
                      ? "bg-foreground text-background border-foreground"
                      : "bg-card text-muted-foreground border-border hover:border-gold/50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <Link to="/admin/products/new">
              <Button className="gap-2 rounded-xl h-9 text-xs uppercase tracking-wider">
                <Plus className="w-4 h-4" />
                Nuevo
              </Button>
            </Link>
          </div>
        </div>

        {/* Products Table */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-gold" />
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20 space-y-4">
            <Package className="w-12 h-12 text-muted-foreground/30 mx-auto" />
            <p className="font-body text-muted-foreground">
              {products.length === 0
                ? "No hay productos. ¡Crea el primero!"
                : "No se encontraron resultados."}
            </p>
            {products.length === 0 && (
              <Link to="/admin/products/new">
                <Button className="gap-2 rounded-xl mt-2">
                  <Plus className="w-4 h-4" />
                  Crear producto
                </Button>
              </Link>
            )}
          </div>
        ) : (
          <div className="bg-card border border-border/40 rounded-2xl overflow-hidden soft-shadow">
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/30">
                    <th className="text-left text-[10px] uppercase tracking-widest text-muted-foreground font-medium p-4">Imagen</th>
                    <th className="text-left text-[10px] uppercase tracking-widest text-muted-foreground font-medium p-4">Producto</th>
                    <th className="text-left text-[10px] uppercase tracking-widest text-muted-foreground font-medium p-4">Marca</th>
                    <th className="text-left text-[10px] uppercase tracking-widest text-muted-foreground font-medium p-4">Categoría</th>
                    <th className="text-right text-[10px] uppercase tracking-widest text-muted-foreground font-medium p-4">Precio</th>
                    <th className="text-center text-[10px] uppercase tracking-widest text-muted-foreground font-medium p-4">Badge</th>
                    <th className="text-right text-[10px] uppercase tracking-widest text-muted-foreground font-medium p-4">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="border-b border-border/20 hover:bg-secondary/30 transition-colors">
                      <td className="p-4">
                        <div className="w-12 h-12 rounded-lg bg-secondary overflow-hidden">
                          {product.images[0] ? (
                            <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Package className="w-5 h-5 text-muted-foreground/30" />
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <div>
                          <p className="font-body text-sm text-foreground font-medium">{product.name}</p>
                          <p className="font-body text-[10px] text-muted-foreground">{product.id}</p>
                        </div>
                      </td>
                      <td className="p-4 font-body text-sm text-muted-foreground">{product.brand}</td>
                      <td className="p-4">
                        <span className={`text-[10px] uppercase tracking-wider font-medium px-2 py-1 rounded-md ${
                          product.category === "Hombre" ? "bg-blue-500/10 text-blue-500" :
                          product.category === "Mujer" ? "bg-pink-500/10 text-pink-500" :
                          "bg-purple-500/10 text-purple-500"
                        }`}>
                          {product.category}
                        </span>
                      </td>
                      <td className="p-4 text-right font-body text-sm">
                        {product.originalPrice && (
                          <span className="text-muted-foreground/50 line-through mr-2 text-xs">
                            {formatCOP(product.originalPrice)}
                          </span>
                        )}
                        <span className="text-foreground font-medium">{formatCOP(product.price)}</span>
                      </td>
                      <td className="p-4 text-center">
                        {product.badge ? (
                          <span className={`text-[10px] uppercase tracking-wider font-medium px-2 py-1 rounded-md ${
                            product.badge === "sale" ? "bg-destructive/10 text-destructive" : "bg-gold/10 text-gold"
                          }`}>
                            {product.badge === "sale" ? "Oferta" : "Nuevo"}
                          </span>
                        ) : (
                          <span className="text-muted-foreground/30">—</span>
                        )}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-end gap-1">
                          <Link to={`/admin/products/${product.id}/edit`}>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-muted-foreground hover:text-gold">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </Link>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                            onClick={() => handleDelete(product)}
                            disabled={deletingId === product.id}
                          >
                            {deletingId === product.id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden divide-y divide-border/20">
              {filteredProducts.map((product) => (
                <div key={product.id} className="p-4 flex items-start gap-4">
                  <div className="w-16 h-16 rounded-xl bg-secondary overflow-hidden flex-shrink-0">
                    {product.images[0] ? (
                      <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package className="w-6 h-6 text-muted-foreground/30" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="font-body text-sm text-foreground font-medium truncate">{product.name}</p>
                        <p className="font-body text-xs text-muted-foreground">{product.brand}</p>
                      </div>
                      <p className="font-body text-sm text-foreground font-medium flex-shrink-0">
                        {formatCOP(product.price)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`text-[9px] uppercase tracking-wider font-medium px-1.5 py-0.5 rounded ${
                        product.category === "Hombre" ? "bg-blue-500/10 text-blue-500" :
                        product.category === "Mujer" ? "bg-pink-500/10 text-pink-500" :
                        "bg-purple-500/10 text-purple-500"
                      }`}>
                        {product.category}
                      </span>
                      {product.badge && (
                        <span className={`text-[9px] uppercase tracking-wider font-medium px-1.5 py-0.5 rounded ${
                          product.badge === "sale" ? "bg-destructive/10 text-destructive" : "bg-gold/10 text-gold"
                        }`}>
                          {product.badge === "sale" ? "Oferta" : "Nuevo"}
                        </span>
                      )}
                      <div className="ml-auto flex gap-1">
                        <Link to={`/admin/products/${product.id}/edit`}>
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-muted-foreground">
                            <Edit className="w-3.5 h-3.5" />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive"
                          onClick={() => handleDelete(product)}
                          disabled={deletingId === product.id}
                        >
                          {deletingId === product.id ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <Trash2 className="w-3.5 h-3.5" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Results count */}
        {!isLoading && filteredProducts.length > 0 && (
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground/50 font-medium text-center">
            {filteredProducts.length} de {products.length} productos
          </p>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
