import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Eye, EyeOff, ShieldCheck, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/lib/supabaseClient";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const emailFormatted = `${username.trim()}@gnperfumes.internal`;
      
      const { error } = await supabase.auth.signInWithPassword({
        email: emailFormatted,
        password: password,
      });

      if (error) {
        toast.error("Credenciales incorrectas o usuario no encontrado");
      } else {
        toast.success("Acceso concedido");
        navigate("/admin/dashboard");
      }
    } catch (err) {
      toast.error("Error al conectar con el servidor");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Background decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gold/5 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="bg-card border border-border/50 rounded-3xl p-8 md:p-10 soft-shadow backdrop-blur-sm">
          {/* Logo / Icon */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/20 rounded-2xl flex items-center justify-center mb-4">
              <ShieldCheck className="w-8 h-8 text-gold" />
            </div>
            <h1 className="font-heading text-2xl md:text-3xl text-foreground text-center">
              Panel Administrativo
            </h1>
            <p className="font-body text-sm text-muted-foreground mt-2 text-center">
              Ingresa tus credenciales para acceder
            </p>
          </div>

         
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
             
              <div className="space-y-2">
                <label htmlFor="admin-username" className="text-xs font-body text-muted-foreground uppercase tracking-widest">
                  Usuario
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    id="admin-username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Ingresa tu usuario"
                    className="w-full bg-background border border-border rounded-xl py-3.5 pl-12 pr-4 text-sm font-body focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold/50 transition-all placeholder:text-muted-foreground/40"
                    autoFocus
                    required
                  />
                </div>
              </div>

              
              <div className="space-y-2">
                <label htmlFor="admin-password" className="text-xs font-body text-muted-foreground uppercase tracking-widest">
                  Contraseña
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    id="admin-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Ingresa la contraseña"
                    className="w-full bg-background border border-border rounded-xl py-3.5 pl-12 pr-12 text-sm font-body focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold/50 transition-all placeholder:text-muted-foreground/40"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading || !password || !username}
              className="w-full h-12 text-sm font-body uppercase tracking-widest rounded-xl bg-foreground text-background hover:bg-foreground/90 transition-all"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                  Verificando...
                </span>
              ) : (
                "Acceder"
              )}
            </Button>
          </form>

          
          <div className="mt-6 text-center">
            <a
              href="/"
              className="text-xs font-body text-muted-foreground hover:text-gold transition-colors uppercase tracking-widest"
            >
              ← Volver a la tienda
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
