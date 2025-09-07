import { useState, useContext } from "react"
import { useAuth } from "../../../context/AuthContext"
import { useNotebooks } from "../../../context/NotebookContext"
import { DashboardContext } from "../../../context/DashboardContext"
import SearchBar from "../../ui/SearchBar"
import { Zap, Plus, NotebookTabs, Notebook, LogOut, Settings } from "lucide-react"

const SideBar = () => {
    const [userMenu, setUserMenu] = useState(false);
    const { isSidebarActive, setNotebookModalState } = useContext(DashboardContext);
    const { notebooks, activeNotebook, setActiveNotebook } = useNotebooks();
    const { activeUser, logout } = useAuth();

    return (
        <aside className={`${isSidebarActive ? 'w-65  p-4' : 'w-0 p-0'} h-full border-r border-border-line bg-sidebar flex overflow-x-hidden [transition:width_240ms_ease]`}>
            <div className="w-full h-full flex flex-col gap-2">
                <span className="logo w-full h-10 text-4xl flex items-center gap-2 font-semibold">
                    Noto
                </span>
                <SearchBar />
                <div className="quick-actions w-full py-2 mt-4 flex flex-col gap-4">
                    <span className="flex items-center gap-2">
                        <Zap size={20}/>
                        <h3 className="text-lg font-semibold">Quick Actions</h3>
                    </span>
                    <ul className="flex flex-col text-SBL-text">
                        <li className="w-full">
                            <button type="button" 
                                    className="w-full h-10 rounded-lg px-2 flex items-center gap-2 cursor-pointer hover:text-button-text-1 hover:bg-sidebar-btn transition-colors">
                                <Plus size={16} />
                                Create Note
                            </button>
                        </li>
                        <li className="w-full">
                            <button type="button" 
                                    className="w-full h-10 rounded-lg px-2 flex items-center gap-2 cursor-pointer hover:text-button-text-1 hover:bg-sidebar-btn transition-colors"
                                    onClick={() => setNotebookModalState(true)}>
                                <Plus size={16} />
                                Create Notebook
                            </button>
                        </li>
                    </ul>
                </div>
                <div className="w-full min-h-10 flex flex-col gap-4 mt-8 overflow-hidden">
                    <span className="w-full flex items-center gap-2">
                        <NotebookTabs size={20}/>
                        <h3 className="text-lg font-semibold">Notebooks</h3>
                    </span>
                    <ul className="flex flex-col">
                        {notebooks.map((notebook, idx) => {
                            return (<li key={idx}>
                                    <label htmlFor={`NB-${notebook.id}`} 
                                           className="h-10 w-full px-2 flex items-center gap-2 rounded-lg relative text-SBL-text has-checked:bg-sidebar-btn has-checked:text-text hover:bg-SBL-hover cursor-pointer">
                                        <Notebook size={16} />
                                        {notebook.title} 
                                        <input type="radio"
                                               name="notebook" 
                                               id={`NB-${notebook.id}`} 
                                               className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-1/2 hidden"
                                               onChange={() => setActiveNotebook(notebook)} 
                                               checked={activeNotebook?.title === notebook.title} />
                                        </label>
                                    </li>);
                        })}
                    </ul>
                </div>
                <div className={`w-full flex flex-col items-center gap-2 rounded-lg mt-auto`}>
                    <div className={`w-full h-auto p-1.5 ${!userMenu ? 'hidden' : 'flex bg-SBL-hover' } flex-col border border-border-line rounded-lg`}>
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
                            className={`h-10 w-full px-2 flex items-center gap-2 rounded-lg cursor-pointer hover:bg-sidebar-btn ${userMenu && 'bg-sidebar-btn'} transition-colors`}
                            onClick={() => setUserMenu(!userMenu)}>
                        <span className="w-6 h-6 rounded-full bg-blue-500 text-white text-sm grid place-content-center">
                            {activeUser.username[0]}
                        </span>
                        {activeUser.username}
                    </button>
                </div>
            </div>
        </aside>
    )
}

export default SideBar