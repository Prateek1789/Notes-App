import { Sun, MoonStar } from "lucide-react"
import { THEME_STATE, useTheme } from "../../context/ThemeProvider";

const ThemeToggle = () => {
    const { theme, setTheme } = useTheme();

    return (
        <button aria-label="Toggle Theme"
                className="w-8 h-8 bg-transparent border border-border-line rounded-lg grid place-content-center cursor-pointer"
                onClick={() => setTheme(prev => prev === THEME_STATE.DARK ? THEME_STATE.LIGHT : THEME_STATE.DARK)}>
            { theme === THEME_STATE.DARK ? <Sun size={20} /> : <MoonStar size={20}/> }
        </button>
    )
}

export default ThemeToggle