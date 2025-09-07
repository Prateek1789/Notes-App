import { useContext } from "react"
import { PanelLeft } from "lucide-react"
import { DashboardContext } from "../../../context/DashboardContext"
import ThemeToggle from "../../ui/ThemeToggle"
import Breadcrumb from "../../ui/Breadcrumb"

const Header = () => {
    const { isSidebarActive, setSidebarActive } = useContext(DashboardContext);

    return (
        <header className="w-full h-full border-b border-border-line flex items-center px-2 lg:px-6 backdrop-blur-lg">
            <nav className="w-full min-h-1/2 flex items-center justify-between text-sm lg:text-[1rem]">
                <div className="flex items-center gap-2 lg:gap-4">
                    <PanelLeft className="size-5 lg:size-6 cursor-pointer"
                               onClick={() => setSidebarActive(!isSidebarActive)} />
                    <Breadcrumb />
                </div>
                <ThemeToggle />
            </nav>
        </header>
    );
};

export default Header