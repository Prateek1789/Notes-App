import ThemeToggle from "../../ui/ThemeToggle"
import SidebarToggle from "../../ui/SidebarToggle";
import Breadcrumb from "../../ui/Breadcrumb"

const Header = () => {
    return (
        <header className="w-full h-full border-b border-border-line flex items-center px-4 lg:px-6 backdrop-blur-lg">
            <nav className="w-full min-h-1/2 flex items-center justify-between text-sm lg:text-[1rem]">
                <div className="flex items-center gap-2 lg:gap-4">
                    <SidebarToggle />
                    <Breadcrumb />
                </div>
                <ThemeToggle />
            </nav>
        </header>
    );
};

export default Header