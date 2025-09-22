import { useNavigate } from "react-router-dom";
import { SquareArrowOutUpRight, Trash2 } from "lucide-react";
import { useNotebooks } from "@/context/NotebookContext";

const NotebookCard = ({ id, title, createdOn }) => {
    const { deleteNotebook } = useNotebooks();
    const navigate = useNavigate();
    const date = new Date(createdOn).toLocaleDateString([], { dateStyle: 'medium' });
    const time = new Date(createdOn).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'});
    
    const openNotebook = () => {
        navigate(`/dashboard/notebooks/${id}`);
    };

    const handleDelete = async () => {
        await deleteNotebook(id);
    };

    return (
        <div data-nb-id={id}
             className="nb-card w-full max-w-92 h-50 p-4 flex flex-col justify-between bg-card dark:border  border-border-line rounded-xl shadow-xl">
            <span className="flex flex-col gap-1">
                <h4>{title}</h4>
                <p className="text-xs text-SBL-text">{`${date} • ${time}`}</p>
            </span>
            <div className="flex items-center justify-between">
                <button type="button"
                        className="w-30 h-10 flex items-center justify-center gap-2 border border-border-line rounded-lg hover:border-blue-500 !transition-colors"
                        aria-label={`Open ${title}`}
                        onClick={openNotebook}>
                    Open
                    <SquareArrowOutUpRight size={18} aria-hidden={true} />
                </button>
                <button type="button"
                        className="w-10 h-10 bg-red-400 border border-red-500 hover:bg-red-500 flex items-center justify-center gap-2 rounded-lg !transition-colors"
                        aria-label={`Delete ${title}`}
                        onClick={handleDelete}>
                    <Trash2 size={18} color="white" aria-hidden={true} />
                </button>
            </div>
        </div>
    )
};
NotebookCard.displayName = 'NotebookCard';

export default NotebookCard