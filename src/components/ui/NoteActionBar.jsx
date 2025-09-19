import { Trash2, Check, X, ChevronLeft } from "lucide-react";

const NoteActionBar = ({ title, navigate, addNote, trashNote }) => {
    return (
        <nav className="note-action-bar w-full h-auto border-b border-border-line md:border-0 flex justify-between items-center py-4 md:py-6 px-4 lg:px-6">
            <button type="button" 
                    className="w-7 h-7 lg:w-8 lg:h-8 border border-border-line hover:border-SBL-text rounded-lg grid place-content-center !transition-colors"
                    aria-label="Navigate back"
                    onClick={navigate}>
                <ChevronLeft size={18} aria-hidden={true} />
            </button>
            <h4 className="note-title px-4 md:text-lg lg:text-xl">{title || 'New Note'}</h4>
            <ul className="action-list flex items-center gap-2">
                <li>
                    <button type="button" 
                            className={`w-7 h-7 lg:w-8 lg:h-8 border border-border-line hover:border-green-400 rounded-lg grid place-content-center !transition-colors`}
                            aria-label="Edit Notebook Title"
                            /* aria-pressed={false} */
                            /* onClick={addNote} */>
                        <Check size={16} aria-hidden={true}/> 
                    </button>
                </li>
                <li>
                    <button type="button" 
                            className="w-7 h-7 lg:w-8 lg:h-8 bg-red-400 hover:bg-red-500 border border-red-500 rounded-lg grid place-content-center !transition-colors"
                            aria-label="Delete Notebook"
                            /* onClick={trashNote} */>
                        <Trash2 size={16} aria-hidden={true} color="white" />
                    </button>
                </li>
            </ul>
        </nav>
    )
};
NoteActionBar.displayName = 'NoteActionBar'

export default NoteActionBar