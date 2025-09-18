import { useParams } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useNotebooks } from "@/context/NotebookContext";
import { useNotes } from "@/context/NoteContext";

const Breadcrumb = () => {
    const { notes } = useNotes();
    const { notebooks } = useNotebooks();
    const { notebookId, newNote, noteId } = useParams();
    const activeNotebook = notebooks.find(nb => nb.id === notebookId)?.title;
    const activeNote = notes.find(n => n.id === noteId)?.title || newNote;

    const breadCrumbLink = (linkName) => {
        return (
            <>
            <ChevronRight size={18} /><span className="text-SBL-text">{linkName}</span>
            </>
        );
    };

    return (
        <div className="flex items-center gap-2">
            <span className="text-SBL-text">Dashboard</span>
            { activeNotebook && breadCrumbLink(activeNotebook) }
            { activeNote && breadCrumbLink(activeNote) }
        </div>
    );
};

export default Breadcrumb