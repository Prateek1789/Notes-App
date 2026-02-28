import { useState, useEffect, createContext, useContext } from "react";
import { useAuth } from "./AuthContext";
import { dbWorkerCall } from "@/lib/WorkerClient";

const NotebookContext = createContext();

export const NotebookProvider = ({ children }) => {
    const { user } = useAuth();
    const [allNotebooks, setAllNotebooks] = useState([]);
    const [activeNB, setActiveNB] = useState([]);
    const [trashedNB, setTrashedNB] = useState([]);

    const getNotebooks = async () => {
        const result = await dbWorkerCall("getNotebooks", { userId: user.id });
        result.sort((a, b) => {
            const dateA = new Date(a.createdOn);
            const dateB = new Date(b.createdOn);

            return dateB - dateA;
        });
        setAllNotebooks(result);
    };

    const createNotebook = async (title) => {
        const notebook = {
            id: crypto.randomUUID(),
            userId: user.id,
            title,
            createdOn: new Date().toISOString(),
            isTrashed: false,
        };

        await dbWorkerCall('addNotebook', notebook);
        setAllNotebooks(prev => [notebook, ...prev]);
    };

    const updateNotebook = async ({ id, changes }) => {
        await dbWorkerCall('updateNotebook', { id, changes });
        setAllNotebooks(prev => prev.map(nb => nb.id === id ? { ...nb, ...changes } : nb));
    };

    const replaceNotebook = async (notebook) => {
        await dbWorkerCall("replaceNotebook", notebook);
        setAllNotebooks(prev => prev.map(nb => nb.id === notebook.id ? notebook : nb));
    };

    const restoreNotebook = async (id) => {
        await dbWorkerCall('updateNotebook', { id, changes: { isTrashed: false } });
        setAllNotebooks(prev => prev.map(nb => nb.id === id ? { ...nb, isTrashed: false } : nb));
    };

    const trashNotebook = async (id) => {
        await dbWorkerCall("updateNotebook", { id, changes: { isTrashed: true } });
        setAllNotebooks(prev => prev.map(nb => nb.id === id ? { ...nb, isTrashed: true } : nb));
    };

    const deleteNotebook = async (id) => {
        await dbWorkerCall('deleteNotebook', { id });
        setAllNotebooks(prev => prev.filter(nb => nb.id !== id));
    };

    useEffect(() => {
        getNotebooks();
    }, [user]);

    useEffect(() => {
        setActiveNB(allNotebooks.filter(nb => nb.isTrashed !== true ));
        setTrashedNB(allNotebooks.filter(nb => nb.isTrashed === true));
    }, [allNotebooks]);

    return (
        <NotebookContext.Provider value={{ 
            activeNB,
            trashedNB, 
            createNotebook, 
            updateNotebook,
            replaceNotebook,
            trashNotebook,
            restoreNotebook, 
            deleteNotebook, 
        }}>
            { children }
        </NotebookContext.Provider>
    );
};

export const useNotebooks = () => useContext(NotebookContext);