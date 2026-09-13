import { Outlet, Navigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const AuthLayout = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
