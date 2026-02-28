import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { NotebookTabs, Notebook, ChevronDown } from "lucide-react";
import { useNotebooks } from "@/context/NotebookContext";
import { useDashboard } from "@/context/DashboardContext";

const NotebookCollapseMenu = () => {
    const { isMobile, sidebarState, toggleSidebar } = useDashboard();
    const { activeNB } = useNotebooks();
    const { notebookId } = useParams();
    const navigate = useNavigate();
    const [menuState, setMenuState] = useState(true);

    const toggleMenu = () => setMenuState(prev => !prev);
    
    const navigateTo = (id) => {
        navigate(`/dashboard/notebooks/${id}`);
        if (isMobile && sidebarState) toggleSidebar();
    };

    return (
        <div className={`w-full min-h-12 grid ${menuState ? 'grid-rows-[3rem_auto] bg-SBL-hover' : 'grid-rows-1'} [grid-template-areas:'head'_'main'] rounded-lg  overflow-hidden`}>
            <button type="button"
                    className="w-full h-12 rounded-lg px-2 flex items-center gap-2 cursor-pointer hover:text-button-text-1 hover:bg-sidebar-btn transition-colors [grid-area:head]"
                    onClick={toggleMenu}>
                <NotebookTabs size={18}/>
                Notebooks
                <ChevronDown size={18} className={`ml-auto translate-y-0.5 ${menuState && 'rotate-180'} !transition`}/>
            </button>
            <ul className={`w-full h-full [grid-area:main] ${!menuState ? 'hidden' : 'block p-1'}`}>
                {activeNB.map((notebook, idx) => {
                    return (
                        <li key={idx}>
                            <label htmlFor={`NB-${notebook.id}`} 
                                   className="h-10 w-full px-2 flex items-center gap-2 rounded-lg relative text-sm text-SBL-text has-checked:bg-sidebar-btn has-checked:text-text hover:bg-sidebar-btn cursor-pointer">
                                <Notebook size={14} />
                                {notebook.title} 
                                <input  type="radio"
                                        name="notebook" 
                                        id={`NB-${notebook.id}`} 
                                        className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-1/2 hidden"
                                        onChange={() => navigateTo(notebook.id)} 
                                        checked={notebook.id == notebookId}/>
                            </label>
                        </li>)
                })}
            </ul>
        </div>
    );
};

export default NotebookCollapseMenu