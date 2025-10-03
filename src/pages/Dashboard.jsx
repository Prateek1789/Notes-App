import { useNotes } from "@/context/NoteContext";
import { useNotebooks } from "@/context/NotebookContext";

import { Clock4 } from "lucide-react";
import NoteCard from "@/components/ui/NoteCard";
import NotebookCard from "@/components/ui/NotebookCard";

const NotoDashboard = () => {
    const { activeNB } = useNotebooks();
    const { activeNotes } = useNotes();

    return (
        <section className="w-full h-full">
            <section className="quick-notes w-full h-1/2 flex flex-col pt-4 gap-4">
                <span className="w-full px-4 lg:px-7 flex items-center gap-2 lg:gap-4">
                    <Clock4 size={20} />
                    <h2 className="text-base md:text-lg">Recent Notes</h2>
                </span>
                <div className="w-full h-full px-4 lg:px-6 pb-4 flex gap-4 flex-wrap overflow-scroll">
                    {activeNotes.length > 0 ? activeNotes.map(n => <NoteCard key={n.id} note={n} />) : 
                    <p className="text-sm md:text-base text-SBL-text text-center m-auto">No Notes yet. Create Notebook to add Notes.</p>}
                </div>
            </section>
            <section className="notebook w-full h-1/2 pt-4 flex flex-col items-start gap-4">
                <span className="w-full px-4 lg:px-7 flex items-center gap-2 lg:gap-4">
                    <Clock4 size={20} />
                    <h2 className="text-base md:text-lg">Recent Notebooks</h2>
                </span>
                <div className="w-full h-full px-4 lg:px-6 pb-4 flex flex-wrap gap-4 overflow-scroll">
                    {activeNB.length > 0 ? activeNB.map(nb => <NotebookCard key={nb.id} nb={nb} />) : 
                    <p className="text-sm md:text-base text-SBL-text text-center m-auto">No Notebooks yet.</p>}
                </div>
            </section>
        </section>
    );
};

export default NotoDashboard
