import { useState, useEffect, useRef } from "react";
import { SunMoon, Sun, MoonStar, Monitor } from "lucide-react"
import { useTheme } from "../../context/ThemeProvider";

const ThemeToggle = () => {
    const toggleBTNRef = useRef(null);
    const menuRef = useRef(null);
    const [menuState, setMenuState] = useState(false);
    const { theme, setTheme } = useTheme();
    const themes = ['light', 'dark', 'system'];
    const themeIcons = {
        'light':  <Sun size={16} />,
        'dark': <MoonStar size={16} />,
        'system': <Monitor size={16} />,
    };

    const toggleMenu = () => setMenuState(prev => !prev);

    const handleThemeChange = (theme) => {
        setTheme(theme.toLowerCase());
        toggleMenu();
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!toggleBTNRef.current?.contains(e.target)) setMenuState(false);
        };

        if (menuState) document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, [menuState]);

    return (
        <div className="h-12 relative flex justify-center items-center rounded-md">
            <button ref={toggleBTNRef}
                    aria-label="Toggle Theme"
                    className="w-8 h-8 bg-transparent border border-border-line rounded-lg grid place-content-center cursor-pointer"
                    onClick={toggleMenu}>
                <SunMoon size={20} />
            </button>
            <div ref={menuRef}
                 className={`p-1 ${menuState ? "block" : "hidden"} absolute top-full right-0 bg-card border border-border-line rounded-lg shadow-lg`}>
                {themes.map((itm, idx) => {
                    return (
                        <button key={idx}
                                type="button"
                                className={`w-full flex items-center 
                                            gap-2 rounded-md px-2 py-1 
                                            cursor-pointer relative 
                                            hover:bg-sidebar-btn capitalize
                                            ${itm === theme ? "bg-sidebar-btn" : ""}`}
                                onClick={() => handleThemeChange(itm)}>
                            {themeIcons[itm]}
                            {itm}
                        </button>
                    )
                })}
            </div>
        </div>
    )
};
ThemeToggle.displayName = 'ThemeToggle';

export default ThemeToggle