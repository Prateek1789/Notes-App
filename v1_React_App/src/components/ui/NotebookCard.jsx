import { useNavigate } from "react-router-dom";
import { SquareArrowOutUpRight, Trash2, RefreshCcw } from "lucide-react";
import { useNotebooks } from "@/context/NotebookContext";

const NotebookCard = ({ nb }) => {
    const { restoreNotebook, trashNotebook, deleteNotebook } = useNotebooks();
    const navigate = useNavigate();
    const date = new Date(nb.createdOn).toLocaleDateString([], { dateStyle: 'medium' });
    const time = new Date(nb.createdOn).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'});
    
    const openNotebook = () => {
        navigate(`notebooks/${nb.id}`);
    };

    const handleRestore = () => {
        restoreNotebook(nb.id);
    };

    const handleTrash = () => {
        trashNotebook(nb.id);
    };

    const handleDelete = async () => {
        await deleteNotebook(nb.id);
    };

    return (
        <article aria-labelledby={`notebook-title`}
                 data-nb-id={nb.id}
                 className="nb-card w-full md:w-[calc((100%/2)-0.5rem)] lg:w-[calc((100%/3)-0.5rem)] xl:w-[calc((100%/4)-0.5rem)] h-35 md:h-40 p-4 flex flex-col justify-between bg-card dark:border  border-border-line rounded-xl shadow-xl">
            <span className="flex flex-col gap-1">
                <h4 id="note-title">{nb.title}</h4>
                <p className="text-xs text-SBL-text">{`${date} • ${time}`}</p>
            </span>
            <div className="flex items-center justify-between">
                {!nb.isTrashed && (
                    <button type="button"
                            className="w-30 h-10 flex items-center justify-center gap-2 border border-border-line rounded-lg hover:border-blue-500 !transition-colors"
                            aria-label={`Open ${nb.title}`}
                            onClick={openNotebook}>
                        Open
                        <SquareArrowOutUpRight size={18} aria-hidden={true} />
                    </button>
                )}
                <span className="flex items-center gap-2 ml-auto">
                <button type="button"
                        className="w-10 h-10 bg-red-400 border border-red-500 hover:bg-red-500 flex items-center justify-center gap-2 rounded-lg !transition-colors"
                        aria-label={!nb.isTrashed ? `Send ${nb.title} to Trash` : `Restore ${nb.title}`}
                        onClick={!nb.isTrashed ? handleTrash : handleRestore}>
                    {!nb.isTrashed ? <Trash2 size={18} color="white" aria-hidden={true} /> : 
                                     <RefreshCcw size={18} color="white" aria-hidden={true} /> }
                </button>
                {nb.isTrashed && (
                    <button type="button"
                            className="w-10 h-10 bg-red-400 border border-red-500 hover:bg-red-500 flex items-center justify-center gap-2 rounded-lg !transition-colors"
                            aria-label={`Delete ${nb.title}`}
                            onClick={handleDelete}>
                        <Trash2 size={18} color="white" aria-hidden={true} />
                    </button>
                )}
                </span>
            </div>
        </article>
    )
};
NotebookCard.displayName = 'NotebookCard';

export default NotebookCard