import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useNotebooks } from "@/context/NotebookContext";

import { Trash2, Check, Pencil, Plus, ChevronLeft } from "lucide-react";

const Notebook = () => {
    const { notebooks, updateNotebook, deleteNotebook } = useNotebooks();
    const { notebookId } = useParams();
    const navigate = useNavigate();
    const activeNotebook = notebooks.find(nb => nb.id === notebookId);
    const [isEditing, setEditing] = useState(false);
    const titleRef = useRef();
    
    const handleDelete = async () => {
        await deleteNotebook(activeNotebook.id);
        navigate('/dashboard', { replace: true });
    };

    const toggleEditMode = () => {
        setEditing(prev => !prev);
    };

    const handleUpdate = async () => {
        activeNotebook.title = titleRef.current.value;
        await updateNotebook(activeNotebook);
        setEditing(prev => !prev);
    };

    return (
        <div className="notebook w-full h-full py-2 px-2 lg:px-4 overflow-scroll">
            <div className="w-full h-full px-2 pt-4 pb-2 flex flex-col gap-12">
                <div className="w-full min-h-10 flex justify-between items-center">
                    <span className="flex gap-3 items-center">
                        <button type="button" 
                                className="w-8 h-8 border border-border-line rounded-lg grid place-content-center"
                                aria-label="Delete Notebook">
                            <ChevronLeft size={20} aria-hidden={true} />
                        </button>
                        { !isEditing ? <h2 className="text-xl md:text-2xl text-center">{activeNotebook?.title}</h2> :
                                       <input type="text" 
                                              name="nb-title" 
                                              id="nb-title"
                                              ref={titleRef}
                                              defaultValue={activeNotebook?.title}
                                              autoFocus
                                              className="h-10 min-w-60 px-2 border border-border-line rounded-lg focus:ring-2 focus:outline-2 focus:ring-blue-600 focus:outline-blue-600" /> }
                    </span>
                    <span className="flex items-center gap-2">
                        <button type="button" 
                                className="w-8 h-8 border border-border-line rounded-lg grid place-content-center"
                                aria-label="Edit Notebook Title">
                            <Plus size={18} aria-hidden={true} />
                        </button>
                        <button type="button" 
                                className="w-8 h-8 border border-border-line rounded-lg grid place-content-center"
                                aria-label="Edit Notebook Title"
                                aria-pressed={isEditing}
                                onClick={!isEditing ? toggleEditMode : handleUpdate}>
                            { !isEditing ? <Pencil size={16} aria-hidden={true} /> : <Check size={16} aria-hidden={true}/> }
                        </button>
                        <button type="button" 
                                className="w-8 h-8 border border-border-line rounded-lg grid place-content-center"
                                aria-label="Delete Notebook"
                                onClick={handleDelete}>
                            <Trash2 size={16} aria-hidden={true} />
                        </button>
                    </span>
                </div>
                <div className="w-full h-full overflow-scroll">
                    <div className="w-full min-h-120 xl:min-h-140 flex flex-col">
                        <p className="date h-10 text-sm border-b border-border-line">September 8, 2025</p>
                        <div className="note-container w-full h-full pt-6">
                            <button type="button"
                                    className="w-50 h-50 rounded-lg border border-border-line border-dashed grid place-content-center">
                                <Plus size={30} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Notebook