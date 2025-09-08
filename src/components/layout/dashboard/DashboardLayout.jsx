import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import Header from "./Header";
import NotebookModal from "../../ui/NotebookModal";
import './layout.css'

const DashboardLayout = () => {

    return (
        <div className="container min-w-screen max-w-screen min-h-screen max-h-screen relative">
            <SideBar />
            <Header />
            <main className="w-full h-full flex items-center justify-center">
                <Outlet />
            </main>
            <NotebookModal />
        </div>
    );
};

export default DashboardLayout