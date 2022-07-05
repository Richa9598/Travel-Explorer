import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext, { AuthContextType } from './AuthContext';

const ProtectedRoute = () => {
  const auth = useContext(AuthContext) as AuthContextType;
  if (!auth.isLoggedIn) {
    return <Navigate to='/login' replace />;
  }

  return <Outlet />;
};
export default ProtectedRoute;