import { useNotes } from "@/context/NoteContext";
import { useNotebooks } from "@/context/NotebookContext";

import NoteCard from "@/components/ui/NoteCard";

const TrashPage = () => {
    const { trashedNotes } = useNotes();
    const { trashedNB } = useNotebooks();

    return (
        <section id="trash-page" 
                 className="w-full h-full p-4 flex gap-4">
                {trashedNotes.map(n => <NoteCard key={n.id} note={n} />)}
        </section>
    )
};

export default TrashPage