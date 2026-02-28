import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoutes = () => {
    const { isLoggedIn } = useAuth();
    const location = useLocation();

    return !isLoggedIn && location.pathname !== '/login' ? <Navigate to={'/login'} replace /> : <Outlet /> ;
}

export default ProtectedRoutes