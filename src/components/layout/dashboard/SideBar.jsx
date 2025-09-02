import { useState, useContext } from "react"
import { THEME_STATE, useTheme } from "../../../context/ThemeProvider"
import { DashboardContext } from "../../../context/DashboardContext"
import SearchBar from "../../ui/SearchBar"
import { Zap, Plus, NotebookTabs, Notebook } from "lucide-react"

const SideBar = () => {
    const { theme } = useTheme();
    const { isSidebarActive, notebooks } = useContext(DashboardContext);

    return (
        <aside className={`${isSidebarActive ? 'w-65  p-4' : 'w-0 p-0'} h-full [grid-area:_sidebar] border-r border-border-line ${theme === THEME_STATE.DARK ? 'bg-sidebar' : 'bg-neutral-50'} flex overflow-x-hidden [transition:width_240ms_ease]`}>
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
                    <ul className={`flex flex-col px-2 gap-3 ${theme === THEME_STATE.DARK ? 'text-neutral-400' : 'text-neutral-600'}`}>
                        <li className="">
                            <button type="button" className={`flex items-center gap-2 cursor-pointer ${theme === THEME_STATE.DARK ? 'hover:text-neutral-200' : 'hover:text-neutral-900'} transition-colors duration-200`}>
                                <Plus size={18} />
                                Create Note
                            </button>
                        </li>
                        <li className="">
                            <button type="button" className={`flex items-center gap-2 cursor-pointer ${theme === THEME_STATE.DARK ? 'hover:text-neutral-200' : 'hover:text-neutral-900'} transition-colors duration-200`}>
                                <Plus size={18} />
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
                    <ul className="flex flex-col px-2">
                        {notebooks.map((notebook, idx) => {
                            return (<li key={idx}>
                                    <label htmlFor={`notebook-${idx}`} 
                                            className={`h-10 w-full px-2 flex items-center gap-2 rounded-lg relative ${theme === THEME_STATE.DARK ? 'hover:bg-neutral-900 has-checked:bg-neutral-800' : 'hover:bg-white has-checked:bg-neutral-200'} cursor-pointer`}>
                                        <Notebook size={16} />
                                        {notebook} 
                                        <input type="radio" 
                                               name="notebook" 
                                               id={`notebook-${idx}`} 
                                               className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-1/2 hidden" />
                                        </label>
                                    </li>);
                        })}
                    </ul>
                </div>
            </div>  
        </aside>
    )
}

export default SideBar