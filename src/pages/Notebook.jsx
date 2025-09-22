import { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useNotebooks } from "@/context/NotebookContext";
import { useNotes } from "@/context/NoteContext";
import NoteCard from "@/components/ui/NoteCard";

import { Trash2, Check, Pencil, Plus, X, ChevronLeft } from "lucide-react";

const Notebook = () => {
    const { activeNB, updateNotebook, deleteNotebook } = useNotebooks();
    const { notebookId } = useParams();
    const navigate = useNavigate();
    const currentNotebook = activeNB.find(nb => nb.id === notebookId);
    const [isEditing, setEditing] = useState(false);
    const titleRef = useRef();
    const newDate = new Date().toLocaleDateString([], { dateStyle: 'long' });
    const { activeNotes } = useNotes();
    const notesByNotebook = activeNotes.filter(n => n.notebookId === currentNotebook.id);

    const handleDelete = async () => {
        await deleteNotebook(currentNotebook.id);
        navigate('/dashboard', { replace: true });
    };

    const toggleEditMode = () => {
        setEditing(prev => !prev);
    };

    const handleUpdate = async () => {
        const update = {
            id: currentNotebook.id,
            changes: { title: titleRef.current.value }
        };
        await updateNotebook(update);
        setEditing(prev => !prev);
    };

    const composeNote = () => {
        navigate(`NewNote`);
    };

    return (
        <section className="notebook w-full h-full flex flex-col gap-8 overflow-scroll">
            <nav className="w-full h-auto px-4 lg:px-6 py-4 md:py-6 flex justify-between items-center">
                <span className="flex gap-3 items-center">
                    <button type="button" 
                            className="w-7 h-7 lg:w-8 lg:h-8 border border-border-line hover:border-SBL-text rounded-lg grid place-content-center !transition-colors"
                            aria-label="Navigate Back"
                            onClick={() => navigate(-1)}>
                        <ChevronLeft size={18} aria-hidden={true} />
                    </button>
                    { !isEditing ?  <h2 className="md:text-2xl text-center">{currentNotebook?.title}</h2> :
                                    <span className="flex gap-2 items-center">
                                        <input  type="text" 
                                                name="nb-title" 
                                                id="nb-title"
                                                ref={titleRef}
                                                defaultValue={currentNotebook?.title}
                                                autoFocus
                                                className="h-7 w-50 md:h-8 md:min-w-60 px-2 border border-border-line rounded-lg focus:ring-2 focus:outline-2 focus:ring-blue-600 focus:outline-blue-600" />
                                        <button type="button"
                                                className="w-7 h-7 lg:w-8 lg:h-8 grid place-content-center rounded-lg border border-red-300 hover:border-red-500 !transition-colors"
                                                aria-label="Cancel editing notebook title"
                                                onClick={toggleEditMode}>
                                            <X size={18} aria-hidden={true} />
                                        </button>
                                    </span> }
                </span>
                <span className="flex items-center gap-2">
                    <button type="button" 
                            className="w-7 h-7 lg:w-8 lg:h-8 border border-border-line hover:border-blue-500 rounded-lg grid place-content-center"
                            aria-label="Add Note"
                            onClick={composeNote}>
                        <Plus size={18} aria-hidden={true} />
                    </button>
                    <button type="button" 
                            className={`w-7 h-7 lg:w-8 lg:h-8 border border-border-line ${isEditing ? 'hover:border-green-400' : 'hover:border-amber-400'} rounded-lg grid place-content-center !transition-colors`}
                            aria-label={`${!isEditing ? "Edit notebook title" : "Confirm Edit"}`}
                            aria-pressed={isEditing}
                            onClick={!isEditing ? toggleEditMode : handleUpdate}>
                        { !isEditing ? <Pencil size={16} aria-hidden={true} /> : <Check size={16} aria-hidden={true}/> }
                    </button>
                    <button type="button" 
                            className="w-7 h-7 lg:w-8 lg:h-8 bg-red-400 hover:bg-red-500 border border-red-500 rounded-lg grid place-content-center !transition-colors"
                            aria-label="Delete Notebook"
                            onClick={handleDelete}>
                        <Trash2 size={16} aria-hidden={true} color="white" />
                    </button>
                </span>
            </nav>
            <div className="w-full h-full px-4 lg:px-6 overflow-scroll">
                <div className="w-full min-h-120 xl:min-h-140 flex flex-col">
                    <p className="date h-10 text-sm border-b border-border-line">{newDate}</p>
                    <div className="note-container w-full h-full flex flex-wrap gap-4 pt-6">
                        {notesByNotebook.map(n => <NoteCard key={n.id} note={n} />)}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Notebook