import { useState } from "react";
import { Trash2, Check, X, PencilLine, ChevronLeft } from "lucide-react";

const NoteActionBar = ({ title, handleTitle, goBack, save, trashNote }) => {
    const [titleEdit, setTitleEdit] = useState(false);
    const toggleTitleEdit = () => setTitleEdit(prev => !prev);

    return (
        <nav className="note-action-bar w-full h-auto border-b border-border-line md:border-0 flex justify-between items-center py-4 md:py-6 px-4 lg:px-6">
            <button type="button" 
                    className="w-7 h-7 lg:w-8 lg:h-8 border border-border-line hover:border-SBL-text rounded-lg grid place-content-center !transition-colors"
                    aria-label="Navigate back"
                    onClick={goBack}>
                <ChevronLeft size={18} aria-hidden={true} />
            </button>
            {!titleEdit ? <span className="flex items-baseline-last">
                            <h4 className="note-title px-4 md:text-lg lg:text-xl">{title}</h4>
                            <button type="button"
                                    className="text-neutral-500 hover:text-text transition-colors"
                                    aria-label="Edit note title"
                                    aria-pressed={titleEdit}
                                    onClick={toggleTitleEdit}>
                                <PencilLine size={14} aria-hidden={true} />
                            </button>
                          </span> :
                          <span className="flex items-center gap-2">
                                <input type="text"
                                       name="note-title" 
                                       id="note-title-input" 
                                       className="h-7 w-45 md:h-8 md:w-60 px-2 border border-border-line rounded-lg focus:outline-2 focus:outline-blue-600"
                                       placeholder="Enter Title..."
                                       onChange={handleTitle}
                                       defaultValue={title}
                                       autoFocus />
                                <button type="button"
                                        className="p-0.5 md:p-1 rounded-md border border-blue-500"
                                        aria-label="Accept title changes"
                                        aria-pressed={!titleEdit}
                                        onClick={toggleTitleEdit}>
                                    <Check size={16} aria-hidden={true} />
                                </button>
                                <button type="button"
                                        className="p-0.5 md:p-1 rounded-md border border-red-400"
                                        aria-label="Cancel title changes"
                                        aria-pressed={!titleEdit}
                                        onClick={toggleTitleEdit}>
                                    <X size={16} aria-hidden={true} />
                                </button>
                          </span> }
            <ul className="action-list flex items-center gap-2">
                <li>
                    <button type="button" 
                            className={`w-7 h-7 lg:w-8 lg:h-8 border border-border-line hover:border-green-400 rounded-lg grid place-content-center !transition-colors`}
                            aria-label="Save Note"
                            onClick={save}>
                        <Check size={16} aria-hidden={true} /> 
                    </button>
                </li>
                <li>
                    <button type="button" 
                            className="w-7 h-7 lg:w-8 lg:h-8 bg-red-400 hover:bg-red-500 border border-red-500 rounded-lg grid place-content-center !transition-colors"
                            aria-label="Send note to Trash"
                            onClick={trashNote}>
                        <Trash2 size={16} aria-hidden={true} color="white" />
                    </button>
                </li>
            </ul>
        </nav>
    )
};
NoteActionBar.displayName = 'NoteActionBar'

export default NoteActionBar