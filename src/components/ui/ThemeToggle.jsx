import { useContext } from "react"
import { Sun, MoonStar } from "lucide-react"
import { ThemeContext } from "../../context/ThemeProvider";

const ThemeToggle = () => {
    const { theme, setTheme } = useContext(ThemeContext);

    return (
        <button aria-label="Toggle Theme"
                className="w-8 h-8 bg-transparent border border-border-line rounded-lg grid place-content-center cursor-pointer"
                onClick={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')}>
            { theme === 'dark' ? <Sun size={20} /> : <MoonStar size={20}/> }
        </button>
    )
}

export default ThemeToggle