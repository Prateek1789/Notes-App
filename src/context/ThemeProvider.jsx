import { useState, useEffect, createContext, useContext } from 'react'
import { getTheme, saveTheme } from '../utils/Storage'; 

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const themeState = {
        LIGHT: 'light',
        DARK: 'dark',
    };

    const [theme, setTheme] = useState(() => {

        const savedTheme = getTheme();
        if (saveTheme) return savedTheme;

        if (window.matchMedia('(prefers-color-scheme: dark)')) return themeState.DARK;

        return themeState.LIGHT;
    });

    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === themeState.DARK);
        saveTheme(theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme, themeState }}>
            { children }
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);