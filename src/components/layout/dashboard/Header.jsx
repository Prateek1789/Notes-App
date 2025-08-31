import { useContext } from "react"
import { PanelLeft, ChevronRight, CircleUser } from "lucide-react"
import { ThemeContext } from "../../../context/ThemeProvider"
import ThemeToggle from "../../ui/ThemeToggle"

const Header = () => {
    const { theme } = useContext(ThemeContext);

    return (
        <header className="w-full h-full border-b border-border-line [grid-area:_header] flex items-center px-6 backdrop-blur-lg">
            <nav className="w-full min-h-1/2  flex items-center justify-between">
                <div className="flex items-center justify-center gap-4">
                    <PanelLeft size={20} />
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