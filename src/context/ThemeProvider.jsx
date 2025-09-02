import { useState, useEffect, createContext, useContext } from 'react'
import { getTheme, saveTheme } from '../utils/Storage'; 

export const THEME_STATE = {
    LIGHT: 'light',
    DARK: 'dark',
};

const ThemeContext = createContext();

export const useTheme = () => {
    return useContext(ThemeContext);
}

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {

        const savedTheme = getTheme();
        if (saveTheme) return savedTheme;

        if (window.matchMedia('(prefers-color-scheme: dark)')) return THEME_STATE.DARK;

        return THEME_STATE.LIGHT;
    });

    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === THEME_STATE.DARK);
        saveTheme(theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            { children }
        </ThemeContext.Provider>
    )
};