import { useState, useEffect, createContext, useContext } from "react";

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
    const [sidebarState, setSidebarState] = useState(false);
    const [notebookModalState, setNotebookModalState] = useState(false);
    const [searchMenuState, setSearchMenuState] = useState(false);
    const [settingMenuState, setSettingMenuState] = useState(false);

    const toggleSidebar = () => setSidebarState(prev => !prev);
    const toggleSearchMenu = () => setSearchMenuState(prev => !prev);
    const toggleNotebookModal = () => setNotebookModalState(prev => !prev);
    const toggleSettingMenu = () => setSettingMenuState(prev => !prev);

    useEffect(() => {
        const width = window.innerWidth;

        if (width > 1280) {
            setSidebarState(true);
        };

    }, []);

    return (
        <DashboardContext.Provider value={{
            sidebarState, 
            toggleSidebar, 
            notebookModalState, 
            toggleNotebookModal, 
            searchMenuState, 
            toggleSearchMenu,
            settingMenuState,
            toggleSettingMenu
        }}>
            { children }
        </DashboardContext.Provider>
    );
};

export const useDashboard = () => useContext(DashboardContext); 