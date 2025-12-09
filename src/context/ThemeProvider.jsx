import { useState, useEffect, createContext, useContext } from 'react'
import { getTheme, saveTheme } from '../utils/Storage'; 

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const dark = "dark";
    const light = "light";
    const savedTheme = getTheme();
    const [theme, setTheme] = useState(savedTheme);

    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === dark);
        saveTheme(theme);
    }, [theme]);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        const handler = (e) => e.matches ? setTheme(dark) : setTheme(light);

        mediaQuery.addEventListener('change', handler);
        return () => mediaQuery.removeEventListener('change', handler);
    }, []);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            { children }
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
