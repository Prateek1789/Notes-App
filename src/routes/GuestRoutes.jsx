import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const GuestRoutes = () => {
    const { isLoggedIn } = useAuth();
    
    return isLoggedIn ? <Navigate to={'/dashboard'} replace /> : <Outlet />;
};

export default GuestRoutes