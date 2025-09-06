import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoutes = () => {
    const { activeUser } = useAuth();
    const location = useLocation();

    return !activeUser && location.pathname !== '/login' ? <Navigate to={'/login'} replace /> : <Outlet />;
}

export default ProtectedRoutes