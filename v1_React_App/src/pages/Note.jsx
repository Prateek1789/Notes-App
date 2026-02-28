import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useNotes } from "@/context/NoteContext";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import NoteActionBar from "@/components/ui/NoteActionBar";

const NotePage = () => {
    const { activeNotes, createNote, updateNote, trashNote } = useNotes();
    const navigate = useNavigate();
    const { notebookId, noteId } = useParams();
    const [editor, setEditor] = useState(null);
    const currentNote = activeNotes.find(n => n.id === noteId);
    const [title, setTitle] = useState(currentNote?.title || 'Untitled');

    const navigateBack = () => navigate(-1);
    const handleTitle = (e) => setTitle(e.target.value);

    const createNewNote = () => {
        const content = {
            title,
            json: editor.getJSON(),
            text: editor.getText(),
        };
        createNote(notebookId, content);
    };

    const handleUpdate = async () => {
        const update = {
            id: noteId,
            changes: {
                title, 
                content: editor.getJSON(), 
                plainText: editor.getText(),
            }
        };
        await updateNote(update);
    };

    const handleTrash = () => {
        trashNote(noteId);
        navigate(`/dashboard/notebooks/${notebookId}`, { replace: true });
    };

    return (
        <section className="note-page w-full h-full flex flex-col overflow-scroll">
            <NoteActionBar title={title}
                           handleTitle={handleTitle}
                           goBack={navigateBack}
                           save={currentNote ? handleUpdate : createNewNote}
                           trashNote={handleTrash} />
            <SimpleEditor content={currentNote ? currentNote.content : ''} onReady={setEditor} />
        </section>
    );
};

export default NotePage