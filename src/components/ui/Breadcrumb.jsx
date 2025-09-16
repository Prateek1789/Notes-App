import { useParams } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useNotebooks } from "@/context/NotebookContext";

const Breadcrumb = () => {
    const { notebooks } = useNotebooks();
    const { notebookId } = useParams();
    const activeNotebook = notebooks.find(nb => nb.id === notebookId)?.title;
    const activeNote = false;

    const breadCrumbLink = (linkName) => {
        return (
            <>
            <ChevronRight size={18} /><span className="text-SBL-text">{linkName}</span>
            </>
        );
    };

    return (
        <div className="flex items-center gap-2">
            <span className="text-SBL-text">
                Dashboard
            </span>
            { activeNotebook && breadCrumbLink(activeNotebook) }
            { activeNote && breadCrumbLink(activeNote) }
        </div>
    );
};

export default Breadcrumb