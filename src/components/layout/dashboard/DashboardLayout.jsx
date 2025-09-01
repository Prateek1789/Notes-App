import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import Header from "./Header";
import './layout.css'

const DashboardLayout = () => {
    return (
        <div className="container min-w-screen min-h-screen max-w-screen">
            <SideBar />
            <Header />
            <Outlet />
        </div>
    );
};

export default DashboardLayout