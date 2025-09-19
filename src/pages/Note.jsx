import { useState, useContext } from "react";
import { useNotes } from "@/context/NoteContext";
import { useNavigate } from "react-router-dom";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import NoteActionBar from "@/components/ui/NoteActionBar";

const NotePage = () => {
    const navigate = useNavigate();
    /* const [title, setTitle] = useState(''); */

    const navigateBack = () => navigate(-1);

    return (
        <section className="note-page w-full h-full flex flex-col overflow-scroll">
            <NoteActionBar title={''} navigate={navigateBack} />
            <SimpleEditor content='Hello World!!' />
        </section>
    );
};

export default NotePage