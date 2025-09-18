import { useState, useEffect, createContext, useContext, useReducer } from "react";
import { useParams } from "react-router-dom";
import { useNotebooks } from "./NotebookContext";
import { dbWorkerCall } from "@/lib/WorkerClient";

const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
    const [notes, setNotes] = useState([]);
    const { notebooks } = useNotebooks();
    const { notebookId } = useParams();
    const activeNotebook = notebooks?.find(nb => nb.id === notebookId);

    const getNotes = async () => {
        if (activeNotebook) {
            const result = await dbWorkerCall("getNotesByNotebook", { notebookId: activeNotebook.id });
            result.sort((a, b) => {
                const dateA = new Date(a.createdOn);
                const dateB = new Date(b.createdOn);
                return dateB - dateA;
            });
            if (result) setNotes(result);
        };
    };

    const createNote = async ({ title, content, notebookId }) => {
        const note = {
            id: crypto.randomUUID(),
            notebookId, 
            userId: activeNotebook.userId,
            title,
            content,
            createdOn: new Date().toISOString(),
            updatedOn: new Date().toISOString(),
            isTrashed: false,
        };
        await dbWorkerCall('addNote', note);
        setNotes(prev => [note, ...prev]);
    };

    const updateNote = async ({ id , changes }) => {
        await dbWorkerCall('updateNote', { id, changes });
        setNotes(prev => prev.map(n => n.id === id ? { ...n, ...changes } : n));
    };

    const replaceNote = async (note) => {
        await dbWorkerCall('replaceNote', note);
        setNotes(prev => prev.map(n => n.id === note.id ? note : n));
    };

    const trashNote = async ({ id }) => {
        await dbWorkerCall("updateNote", { id, changes: { isTrashed: true } });
        setNotes(prev => prev.map(n => n.id === id ? { ...n, ...changes } : n));
    };

    const restoreNote = async ({ id }) => {
        await dbWorkerCall('updateNote', { id, changes: { isTrashed: false } });
        setNotes(prev => prev.map(n => n.id === id ? { ...n, ...changes } : n));
    };

    const deleteNote = async (id) => {
        await dbWorkerCall("deleteNote", { id });
        setNotes(prev => prev.filter(n => n.id !== id));
    };

    useEffect(() => {
        getNotes();
    }, []);

    return (
        <NoteContext.Provider value={{ 
            notes,
            createNote,
            updateNote,
            replaceNote,
            trashNote,
            restoreNote,
            deleteNote
        }}>
            { children }
        </NoteContext.Provider>
    );
};

export const useNotes = () => useContext(NoteContext);


// const ACTIONS = { OPEN_NOTE: 'OPEN', BOOKMARK_NOTE: 'BOOKMARK' };
/* export const useNotes = () => {
    // const [state, dispatch] = useReducer(noteReducer, );
    const { state, dispatch } = useContext(NoteContext);

    if (!state) throw new Error('Note context must be used withing its Provider');

    const createNote = (note) => dispatch({ type: ACTIONS.CREATE_NOTE, payload: note });
    const updateNote = (info) => dispatch({ type: ACTIONS.UPDATE_NOTE, payload: info });
    const deleteNote = (note) => dispatch({ type: ACTIONS.DELETE_NOTE, payload: note });
    const trashNote = (note) => dispatch({ type: ACTIONS.TRASH_NOTE, payload: note });
    const restoreNote = (note) => dispatch({ type: ACTIONS.RESTORE_NOTE, payload: note });
    const bookmarkNote = (note) => dispatch({ type: ACTIONS.BOOKMARK_NOTE, payload: note });

    return { state, createNote, updateNote, deleteNote }
}; */