import { useState, useContext } from "react"
import { PanelLeft, ChevronRight, CircleUser } from "lucide-react"
import { ThemeContext } from "../../../context/ThemeProvider"
import { DashboardContext } from "../../../context/DashboardContext"
import ThemeToggle from "../../ui/ThemeToggle"

const Header = () => {
    const { theme } = useContext(ThemeContext);
    const { isSidebarActive, setSidebarActive } = useContext(DashboardContext);

    return (
        <header className="w-full h-full border-b border-border-line [grid-area:_header] flex items-center px-2 lg:px-6 backdrop-blur-lg">
            <nav className="w-full min-h-1/2 flex items-center justify-between text-sm lg:text-[1rem]">
                <div className="flex items-center gap-2 lg:gap-4">
                    <PanelLeft className="size-5 lg:size-6 cursor-pointer"
                               onClick={() => setSidebarActive(!isSidebarActive)} />
                    <span className={`${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}`}>Dashboard</span>
                    <ChevronRight size={18} />
                    <span className={`${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}`}>Homework</span>
                    <ChevronRight size={18} />
                    <span className={`${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}`}>Geography</span>
                </div>
                <ul className="flex items-center gap-4">
                    <li><ThemeToggle /></li>
                    {/* <li className="flex items-center gap-3">
                        Razr1789
                        <span className="w-9 h-9 rounded-full bg-blue-500 grid place-content-center">
                            <CircleUser />
                        </span>
                    </li> */}
                </ul>
            </nav>
        </header>
    )
}

export default Header