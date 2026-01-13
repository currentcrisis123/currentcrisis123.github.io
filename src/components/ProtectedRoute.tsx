import { useUser } from '@clerk/clerk-react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const { isSignedIn, isLoaded } = useUser();
  
  if (!isLoaded) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!isSignedIn) {
    return <Navigate to="/overview" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
