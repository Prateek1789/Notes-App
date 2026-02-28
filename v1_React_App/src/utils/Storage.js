const THEME_KEY = 'theme';

export const saveTheme = (theme) => {
    localStorage.setItem(THEME_KEY, theme);
};

export const getTheme = () => {
    return localStorage.getItem(THEME_KEY) || '';
};