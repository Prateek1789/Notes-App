import { useState } from "react"
import { useAuth } from "../../../context/AuthContext"
import { useDashboard } from "../../../context/DashboardContext"
import SidebarToggle from "../../ui/SidebarToggle"
import NotebookCollapseMenu from "../../ui/NotebookCollapsMenu"
import { Search, Trash2, Plus, Feather, LogOut, Settings } from "lucide-react"

const SideBar = () => {
    const [userMenu, setUserMenu] = useState(false);
    const { sidebarState, setNotebookModalState, setSearchModalState } = useDashboard();
    const { activeUser, logout } = useAuth();

    return (
        <aside className={`h-full ${sidebarState ? 'w-65' : 'w-0 p-0'} absolute z-10 xl:static border-r border-border-line bg-sidebar flex flex-col overflow-x-hidden transition-[width]`}>
            <div className="w-full h-20 px-4 flex items-center justify-between border-b border-border-line">
                <span className="text-3xl">Noto</span>
                <SidebarToggle modifier={'block xl:hidden'} />
            </div>
            <div className="actons w-65 h-[calc(100%_-_5rem_-3.5rem)] flex flex-col py-2 overflow-hidden">
                <ul className="w-full h-auto rounded-lg px-2">
                    <li className="">
                        <button type="button" 
                                className="w-full h-12 rounded-lg px-2 flex items-center gap-2 cursor-pointer hover:text-button-text-1 hover:bg-sidebar-btn transition-colors"
                                onClick={() => setSearchModalState(true)}>
                            <Search size={18} />
                            Search Notes
                        </button>
                    </li>
                    <li className="">
                        <button type="button" 
                                className="w-full h-12 rounded-lg px-2 flex items-center gap-2 cursor-pointer hover:text-button-text-1 hover:bg-sidebar-btn transition-colors">
                            <Feather size={18} />
                            Quick Note
                        </button>
                    </li>
                    <li className="">
                        <button type="button" 
                                className="w-full h-12 rounded-lg px-2 flex items-center gap-2 cursor-pointer hover:text-button-text-1 hover:bg-sidebar-btn transition-colors"
                                onClick={() => setNotebookModalState(true)}>
                            <Plus size={18} />
                            Add Notebook
                        </button>
                    </li>
                    <li className="">
                        <button type="button" 
                                className="w-full h-12 rounded-lg px-2 flex items-center gap-2 cursor-pointer hover:text-button-text-1 hover:bg-sidebar-btn transition-colors"
                                onClick={() => {}}>
                            <Trash2 size={18} />
                            Trash
                        </button>
                    </li>
                    <li>
                        <NotebookCollapseMenu />
                    </li>
                </ul>
            </div>
            <div className="w-full h-auto p-2 relative">
                <div className={`w-[calc(100%_-_1rem)] p-1.5 ${!userMenu ? 'hidden' : 'flex bg-SBL-hover' } absolute left-2 top-[-120%] flex-col border border-border-line rounded-lg`}>
                    <button type="button" 
                            className="h-8 flex items-center gap-2 rounded-md px-2 hover:bg-sidebar-btn cursor-pointer">
                        <Settings size={16}/>
                        Settings
                    </button>
                    <button type="button" 
                            className="h-8 flex items-center gap-2 rounded-md px-2 hover:bg-sidebar-btn cursor-pointer"
                            onClick={logout}>
                        <LogOut size={16}/>
                        Log out
                    </button>
                </div>
                <button type="button"
                        className={`h-12 w-full px-2 flex items-center gap-2 rounded-lg cursor-pointer hover:bg-sidebar-btn ${userMenu && 'bg-sidebar-btn'} transition-colors`}
                        onClick={() => setUserMenu(!userMenu)}>
                    <span className="w-6 h-6 rounded-full bg-blue-500 text-white text-sm grid place-content-center">
                        {activeUser.username[0]}
                    </span>
                    {activeUser.username}
                </button>
            </div>
        </aside>
    )
}

export default SideBar