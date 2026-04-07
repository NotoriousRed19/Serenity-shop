interface BadgeProps {
  children: React.ReactNode;
  variant?: "sale" | "new";
}

const Badge = ({ children, variant = "sale" }: BadgeProps) => {
  const styles = {
    sale: "bg-primary text-primary-foreground",
    new: "bg-foreground text-background",
  };

  return (
    <span className={`absolute top-3 left-3 px-3 py-1 text-xs font-body uppercase tracking-wider ${styles[variant]}`}>
      {children}
    </span>
  );
};

export default Badge;
