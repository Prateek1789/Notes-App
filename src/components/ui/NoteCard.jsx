import { useNavigate } from "react-router-dom";
import { useNotes } from "@/context/NoteContext";
import { Trash2, SquareArrowOutUpRight } from "lucide-react";

const NoteCard = ({ id, title, createdOn, text }) => {
    const { trashNote } = useNotes();
    const navigate = useNavigate();
    const date = new Date(createdOn).toLocaleDateString([], { dateStyle: 'medium' });
    const time = new Date(createdOn).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const displayText = window.innerWidth < 768 ? `${text.slice(0, 150)}...` : `${text.slice(0, 300)}...`;

    const openNote = () => {
        navigate(`${id}`);
    };

    const handleTrashNote = async () => {
        await trashNote(id);
    };

    return (
        <article data-note-id={id}
                 className="note-card w-full md:w-70 h-auto md:h-80 p-4 bg-card border border-border-line flex flex-col items-center gap-4 rounded-xl shadow-xl">
            <div className="h-full w-full">
                <header className="mb-4">
                    <h4 className="font-semibold mb-1">{title}</h4>
                    <p className="text-[0.625rem]">{`${date} • ${time}`}</p>
                </header>
                <p className="text-SBL-text text-sm ">{displayText}</p>
            </div>
            <div className="w-full h-auto rounded-b-xl flex items-center justify-between">
                <button type="button"
                        className="w-30 h-10 flex items-center justify-center gap-2 rounded-lg border border-border-line hover:border-blue-500"
                        onClick={openNote}>
                    Open
                    <SquareArrowOutUpRight size={18} />
                </button>
                <button type="button"
                        className="w-8 h-8 bg-red-400 hover:bg-red-500 rounded-lg border border-red-500 grid place-content-center"
                        onClick={handleTrashNote}>
                    <Trash2 size={18} color="white"/>
                </button>
            </div>
        </article>
    )
};
NoteCard.displayName = 'NoteCard'

export default NoteCard
