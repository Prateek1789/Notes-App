import { useState, useEffect, createContext, useContext } from 'react'
import { getTheme, saveTheme } from '../utils/Storage'; 

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        const savedTheme = getTheme();
        if (saveTheme) return savedTheme;

        if (window.matchMedia('(prefers-color-scheme: dark)')) return 'dark';

        return 'light';
    });

    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
        saveTheme(theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            { children }
        </ThemeContext.Provider>
    )
};