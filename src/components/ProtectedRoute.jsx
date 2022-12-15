import { Navigate, Outlet } from "react-router-native";

const ProtectedRoute = ({ user, redirectPath = '/login' }) => {
    console.log('ProtectedRoute', user);
    if (!user) {
      return <Navigate to={redirectPath} replace />;
    }
  
    return <Outlet />;
  };
export default ProtectedRoute;
