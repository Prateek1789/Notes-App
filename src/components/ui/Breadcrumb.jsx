import { ChevronRight } from "lucide-react";
import { useNotebooks } from "../../context/NotebookContext";

const Breadcrumb = () => {
    const { activeNotebook } = useNotebooks();
    const activeNote = false;

    return (
        <div className="flex items-center gap-2">
            <span className="text-SBL-text">
                Dashboard
            </span>
            { activeNotebook && (<>
                                    <ChevronRight size={18} />
                                    <span className="text-SBL-text">
                                        {activeNotebook.title}
                                    </span>
                                </>) }
            { activeNote && (<>
                                <ChevronRight size={18} />
                                <span className="text-SBL-text">
                                    Geography
                                </span>
                            </>) }
        </div>
    );
};

export default Breadcrumb