import { useNavigate } from "react-router-dom";
import { Trash2, SquareArrowOutUpRight } from "lucide-react";

const NoteCard = ({ notebookId, id, title, createdOn, text }) => {
    const navigate = useNavigate();
    const date = new Date(createdOn).toLocaleDateString([], { dateStyle: 'medium' });
    const time = new Date(createdOn).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const displayText = `${text.slice(0, 300)}...`;

    const openNote = () => {
        navigate(`${id}`);
    };

    return (
        <article data-note-id={id}
                 className="note-card w-70 h-80 bg-card border border-border-line flex flex-col justify-center items-center rounded-xl shadow-xl">
            <div className="h-full w-full p-4">
                <header className="mb-4">
                    <h4 className="font-semibold mb-1">{title}</h4>
                    <p className="text-[0.625rem]">{`${date} • ${time}`}</p>
                </header>
                <p className="text-SBL-text text-sm ">{displayText}</p>
            </div>
            <div className="w-full h-14 p-4 rounded-b-xl flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <button type="button"
                            className="w-8 h-8  rounded-lg border border-border-line hover:border-blue-500 grid place-content-center"
                            onClick={openNote}>
                        <SquareArrowOutUpRight size={18} />
                    </button>
                    <button type="button"
                            className="w-8 h-8 bg-red-400 hover:bg-red-500 rounded-lg border border-red-500 grid place-content-center"
                            /* onClick={deleteNote} */>
                        <Trash2 size={18} color="white"/>
                    </button>
                </div>
            </div>
        </article>
    )
};
NoteCard.displayName = 'NoteCard'

export default NoteCard
