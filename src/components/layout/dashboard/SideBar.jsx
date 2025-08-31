import { useContext } from "react"
import { ThemeContext } from "../../../context/ThemeProvider"

const SideBar = () => {
    const { theme } = useContext(ThemeContext);

    return (
        <aside className={`w-full h-full [grid-area:_sidebar] border-r border-border-line ${theme === 'dark' ? 'bg-sidebar' : 'bg-neutral-50'} p-6 flex`}>
            <span className="w-full text-center text-4xl font-semibold">Noto</span>
        </aside>
    )
}

export default SideBar