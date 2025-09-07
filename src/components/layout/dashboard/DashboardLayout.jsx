import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import Header from "./Header";
import NotebookModal from "../../ui/NotebookModal";
import './layout.css'

const DashboardLayout = () => {

    return (
        <div className="container min-w-screen min-h-screen max-w-screen">
            <SideBar />
            <Header />
            <main className="w-full h-full [grid-area:_main] gird grid-cols-1 grid-rows-2">
                <Outlet />
            </main>
            <NotebookModal />
        </div>
    );
};

export default DashboardLayout