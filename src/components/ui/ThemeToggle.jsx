import { Sun, MoonStar } from "lucide-react"
import { useTheme } from "../../context/ThemeProvider";

const ThemeToggle = () => {
    const { theme, setTheme, themeState } = useTheme();

    return (
        <button aria-label="Toggle Theme"
                className="w-8 h-8 bg-transparent border border-border-line rounded-lg grid place-content-center cursor-pointer"
                onClick={() => setTheme(prev => prev === themeState.DARK ? themeState.LIGHT : themeState.DARK)}>
            { theme === themeState.DARK ? <Sun size={20} /> : <MoonStar size={20}/> }
        </button>
    )
};
ThemeToggle.displayName = 'ThemeToggle';

export default ThemeToggle