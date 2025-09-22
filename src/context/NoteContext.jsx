import { useState, useEffect, createContext, useContext } from "react";
import { useAuth } from "./AuthContext";
import { dbWorkerCall } from "@/lib/WorkerClient";

const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
    const { user } = useAuth();
    const [notes, setNotes] = useState([]);
    const [activeNotes, setActiveNotes] = useState([]);
    const [trashedNotes, setTrashedNotes] = useState([]);

    const getAllNotes = async () => {
        const result = await dbWorkerCall("getUserNotes", { userId: user.id });
        result.sort((a, b) => {
            const dateA = new Date(a.createdOn);
            const dateB = new Date(b.createdOn);
            return dateB - dateA
        });
        setNotes(result);
    };

    const createNote = async (notebookId, content) => {
        const note = {
            id: crypto.randomUUID(),
            notebookId,
            userId: user.id,
            title: content.title,
            content: content.json,
            plainText: content.text,
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

    const trashNote = async (id) => {
        await dbWorkerCall("updateNote", { id, changes: { isTrashed: true } });
        setNotes(prev => prev.map(n => n.id === id ? { ...n, isTrashed: true } : n));
    };

    const restoreNote = async (id) => {
        await dbWorkerCall('updateNote', { id, changes: { isTrashed: false } });
        setNotes(prev => prev.map(n => n.id === id ? { ...n, isTrashed: false } : n));
    };

    const deleteNote = async (id) => {
        await dbWorkerCall("deleteNote", { id });
        setNotes(prev => prev.filter(n => n.id !== id));
    };

    useEffect(() => {
        getAllNotes();
    }, []);

    useEffect(() => {
        setActiveNotes(notes.filter(n => n.isTrashed !== true));
        setTrashedNotes(notes.filter(n => n.isTrashed === true));
    }, [notes]);

    return (
        <NoteContext.Provider value={{ 
            activeNotes,
            trashedNotes,
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
