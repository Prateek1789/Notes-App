import { useNavigate } from "react-router-dom";
import { useNotes } from "@/context/NoteContext";
import { Trash2, SquareArrowOutUpRight, RefreshCcw } from "lucide-react";

const NoteCard = ({ note }) => {
    const { trashNote, restoreNote, deleteNote } = useNotes();
    const navigate = useNavigate();
    const date = new Date(note.createdOn).toLocaleDateString([], { dateStyle: 'medium' });
    const time = new Date(note.createdOn).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const displayText = window.innerWidth < 768 ? `${note.plainText.slice(0, 150)}...` : `${note.plainText.slice(0, 300)}...`;

    const openNote = () => navigate(`${note.id}`);
    const handleTrashNote = async () => await trashNote(note.id);
    const handleRestore = async () => await restoreNote(note.id);
    const handleDelete = async () => await deleteNote(note.id);

    return (
        <article data-note-id={note.id}
                 className="note-card w-full md:w-70 h-auto md:h-80 p-4 bg-card border border-border-line flex flex-col items-center gap-3 rounded-xl shadow-xl">
            <div className="h-full w-full">
                <header className="mb-4">
                    <h4 className="font-semibold mb-1">{note.title}</h4>
                    <p className="text-[0.625rem]">{`${date} • ${time}`}</p>
                </header>
                <p className="text-SBL-text text-sm ">{displayText}</p>
            </div>
            <div className="w-full h-auto rounded-b-xl flex items-center justify-between">
                {!note.isTrashed && (
                    <button type="button"
                            className="w-30 h-10 flex items-center justify-center gap-2 rounded-lg border border-border-line hover:border-blue-500"
                            onClick={openNote}>
                        Open
                        <SquareArrowOutUpRight size={18} />
                    </button>
                )}
                <span className="flex items-center gap-2 ml-auto">
                    <button type="button"
                            className="w-8 h-8 bg-red-400 hover:bg-red-500 rounded-lg border border-red-500 grid place-content-center"
                            onClick={!note.isTrashed ? handleTrashNote : handleRestore}>
                        {!note.isTrashed ? <Trash2 size={18} color="white" /> : <RefreshCcw size={18} color="white" />}
                    </button>
                    {note.isTrashed && (
                        <button type="button"
                                className="w-8 h-8 bg-red-400 hover:bg-red-500 rounded-lg border border-red-500 grid place-content-center"
                                onClick={handleDelete}>
                            <Trash2 size={18} color="white" />
                        </button>
                    )}
                </span>
            </div>
        </article>
    )
};
NoteCard.displayName = 'NoteCard'

export default NoteCard
