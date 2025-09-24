import { useState, useEffect, createContext, useContext } from "react";

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
    const [isMobile, setMobile] = useState(false);
    const [sidebarState, setSidebarState] = useState(true);
    const [notebookModalState, setNotebookModalState] = useState(false);
    const [searchMenuState, setSearchMenuState] = useState(false);
    const [settingMenuState, setSettingMenuState] = useState(false);

    const toggleSidebar = () => setSidebarState(prev => !prev);
    const toggleSearchMenu = () => {
        setSearchMenuState(prev => !prev);
        if (isMobile && sidebarState) toggleSidebar();
    };

    const toggleNotebookModal = () => {
        setNotebookModalState(prev => !prev);
        if (isMobile && sidebarState) toggleSidebar();
    };

    const toggleSettingMenu = () => {
        setSettingMenuState(prev => !prev);
        if (isMobile && sidebarState) toggleSidebar();
    };

    useEffect(() => {
        const width = window.innerWidth;
        if (width < 1280) {
            setMobile(true);
            setSidebarState(false);
        }
    }, []);

    return (
        <DashboardContext.Provider value={{
            isMobile,
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