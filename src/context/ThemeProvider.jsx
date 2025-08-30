import { useState, useEffect, createContext, useContext } from 'react'
import { getTheme, saveTheme } from '../utils/Storage'; 

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(getTheme());

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            saveTheme(theme);
        }
        else {
            document.documentElement.classList.remove('dark');
            saveTheme(theme);
        }
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            { children }
        </ThemeContext.Provider>
    )
} 