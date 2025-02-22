
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

type ProtectedRouteProps = {
  children: React.ReactNode;
  allowedRoles?: ("admin" | "editor")[];
};

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user, isAdmin, isEditor } = useAuth();
  
  console.log('ProtectedRoute check:', {
    user: !!user,
    isAdmin,
    isEditor,
    allowedRoles
  });

  if (!user) {
    console.log('No user found, redirecting to /auth');
    return <Navigate to="/auth" replace />;
  }

  // If roles are required, check if user has any of the allowed roles
  if (allowedRoles && allowedRoles.length > 0) {
    const hasAllowedRole = allowedRoles.some(role => {
      if (role === "admin") return isAdmin;
      if (role === "editor") return isEditor;
      return false;
    });

    console.log('Role check result:', { hasAllowedRole, allowedRoles, isAdmin, isEditor });

    if (!hasAllowedRole) {
      console.log('User lacks required roles, redirecting to /');
      return <Navigate to="/" replace />;
    }
  }

  return <>{children}</>;
}
