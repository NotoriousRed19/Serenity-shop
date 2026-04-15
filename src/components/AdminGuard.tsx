import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface AdminGuardProps {
  children: ReactNode;
}

const AdminGuard = ({ children }: AdminGuardProps) => {
  const isAuthenticated = sessionStorage.getItem("admin_auth") === "true";

  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  return <>{children}</>;
};

export default AdminGuard;
