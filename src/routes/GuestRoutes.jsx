import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const GuestRoutes = () => {
    const { activeUser } = useAuth();
    return activeUser ? <Navigate to={'/dashboard'} replace /> : <Outlet />;
};

export default GuestRoutes