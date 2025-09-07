import { useState, useContext } from "react"
import { THEME_STATE, useTheme } from "../../../context/ThemeProvider"
import { useAuth } from "../../../context/AuthContext"
import { useNotebooks } from "../../../context/NotebookContext"
import { DashboardContext } from "../../../context/DashboardContext"
import SearchBar from "../../ui/SearchBar"
import { Zap, Plus, NotebookTabs, Notebook, LogOut, Settings } from "lucide-react"

const SideBar = () => {
    const [userMenu, setUserMenu] = useState(false);
    const { theme } = useTheme();
    const { isSidebarActive, setNotebookModalState } = useContext(DashboardContext);
    const { notebooks, setActiveNotebook } = useNotebooks();
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
                    <ul className={`flex flex-col ${theme === THEME_STATE.DARK ? 'text-neutral-400' : 'text-neutral-600'}`}>
                        <li className="w-full">
                            <button type="button" 
                                    className={`w-full h-10 rounded-lg px-2 flex items-center gap-2 cursor-pointer ${theme === THEME_STATE.DARK ? 'hover:text-neutral-200 hover:bg-neutral-800' : 'hover:text-neutral-900 hover:bg-neutral-200'} transition-colors duration-200`}>
                                <Plus size={16} />
                                Create Note
                            </button>
                        </li>
                        <li className="w-full">
                            <button type="button" 
                                    className={`w-full h-10 rounded-lg px-2 flex items-center gap-2 cursor-pointer ${theme === THEME_STATE.DARK ? 'hover:text-neutral-200 hover:bg-neutral-800' : 'hover:text-neutral-900 hover:bg-neutral-200'} transition-colors duration-200`}
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
                                            className={`h-10 w-full px-2 flex items-center gap-2 rounded-lg relative ${theme === THEME_STATE.DARK ? 'text-neutral-400 hover:bg-neutral-900 has-checked:bg-neutral-800 has-checked:text-text' : 'text-neutral-600 hover:bg-neutral-100 has-checked:bg-neutral-200 has-checked:text-text'} cursor-pointer`}
                                            onClick={() => setActiveNotebook(notebook)}>
                                        <Notebook size={16} />
                                        {notebook.title} 
                                        <input type="radio"
                                               name="notebook" 
                                               id={`NB-${notebook.id}`} 
                                               className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-1/2 hidden" 
                                               /* checked={activeNotebook === notebook.title ? true : false} *//>
                                        </label>
                                    </li>);
                        })}
                    </ul>
                </div>
                <div className={`w-full p-2 flex items-center gap-2 rounded-xl mt-auto cursor-pointer bg-neutral-900 ${userMenu ? 'bg-neutral-800' : ''} ${theme === THEME_STATE.DARK ? 'hover:bg-neutral-800' : 'hover:bg-neutral-300'} transition-colors relative`}
                     onClick={() => setUserMenu(!userMenu)}>
                    <div className="w-6 h-6 rounded-full bg-blue-500 text-white text-sm grid place-content-center">
                        {activeUser.username[0]}
                    </div>
                    <p>{activeUser.username}</p>
                    <div className={`user-menu w-full h-auto p-1.5 ${!userMenu ? 'hidden' : 'flex' } flex-col absolute left-0 -top-[205%] ${theme === THEME_STATE.DARK ? 'bg-neutral-800' : 'bg-neutral-50'} border border-border-line rounded-xl`}>
                        <button type="button" 
                                className={`h-8 flex items-center gap-2 rounded-lg px-2 ${theme === THEME_STATE.DARK ? 'hover:bg-neutral-700' : 'hover:bg-neutral-200'} cursor-pointer`}>
                            <Settings size={16}/>
                            Settings
                        </button>
                        <button type="button" 
                                className={`h-8 flex items-center gap-2 rounded-lg px-2 ${theme === THEME_STATE.DARK ? 'hover:bg-neutral-700' : 'hover:bg-neutral-200'} cursor-pointer`}
                                onClick={logout}>
                            <LogOut size={16}/>
                            Log out
                        </button>
                    </div>
                </div>
            </div>
        </aside>
    )
}

export default SideBar