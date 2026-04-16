interface BadgeProps {
  children: React.ReactNode;
  variant?: "sale" | "new";
}

const Badge = ({ children, variant = "sale" }: BadgeProps) => {
  const styles = {
    sale: "bg-destructive/10 text-destructive border-destructive/20",
    new: "bg-gold/10 text-gold border-gold/20",
  };

  return (
    <span className={`px-2.5 py-1 text-[9px] font-body font-bold uppercase tracking-[0.2em] backdrop-blur-md border rounded-full ${styles[variant]} shadow-sm`}>
      {children}
    </span>
  );
};

export default Badge;
