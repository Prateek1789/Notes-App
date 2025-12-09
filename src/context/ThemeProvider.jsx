import { useState, useEffect, createContext, useContext } from 'react'
import { getTheme, saveTheme } from '../utils/Storage'; 

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const savedTheme = getTheme();
    const [theme, setTheme] = useState(savedTheme);

    const applyTheme = () => {
        const isDark = theme === "system" 
            ? window.matchMedia('(prefers-color-scheme: dark)').matches 
            : theme === "dark";
        document.documentElement.classList.toggle('dark', isDark);
    };

    useEffect(() => {
        applyTheme();
        saveTheme(theme);

        if (theme !== "system") return;

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', applyTheme);
        return () => mediaQuery.removeEventListener('change', applyTheme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            { children }
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);