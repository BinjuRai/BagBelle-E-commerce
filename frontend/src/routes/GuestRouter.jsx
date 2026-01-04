

import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../auth/authProvider';

export default function GuestRoute() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If user is logged in, redirect based on role
  if (user) {
    if (user.role === "admin") return <Navigate to="/admin" replace />;
;
    return <Navigate to="/" replace />; // Normal users go to homepage
  }

  // If not logged in, allow access to login/register pages
  return <Outlet />;
}

