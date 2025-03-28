import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, Outlet } from "react-router-dom";

// Protects routes by allowing access only to authenticated users
const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return null; // Show nothing while checking authentication
  }

  if (isAuthenticated) {
    return <Outlet />;
  }

  return <Navigate to="/" replace />; // Redirect if not logged in
};

export default ProtectedRoute;
