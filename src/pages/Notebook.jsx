import { useParams } from "react-router-dom";
import { useNotebooks } from "../context/NotebookContext";

const Notebook = () => {
    const { activeNotebook } = useNotebooks();
    const { notebookId } = useParams();
    
    return (
        <div className="notebook w-full h-full p-2 overflow-scroll">
            <div className="w-full h-full px-2 pt-8 pb-2 flex flex-col gap-6">
                <h2 className="text-2xl text-center">{activeNotebook?.title}</h2>
                <div className="w-full min-h-120 xl:min-h-140 flex flex-col">
                    <span className="date h-10 border-b border-border-line">
                        September 8, 2025
                    </span>
                    <div className="w-full h-full note-container flex items-center justify-center">
                        {activeNotebook?.notes.length} Notes
                    </div>
                </div>
                <div className="w-full min-h-120 xl:min-h-140 flex flex-col">
                    <span className="date h-10 border-b border-border-line">
                        September 7, 2025
                    </span>
                    <div className="w-full h-full note-container flex items-center justify-center">
                        {activeNotebook?.notes.length} Notes
                    </div>
                </div>
                <div className="w-full min-h-120 xl:min-h-140 flex flex-col">
                    <span className="date h-10 border-b border-border-line">
                        September 6, 2025
                    </span>
                    <div className="w-full h-full note-container flex items-center justify-center">
                        {activeNotebook?.notes.length} Notes
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Notebook