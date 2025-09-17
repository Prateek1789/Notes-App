import { useState, useEffect, createContext, useContext } from "react";
import { useAuth } from "./AuthContext";
import { dbWorkerCall } from "@/lib/WorkerClient";

const NotebookContext = createContext();

export const NotebookProvider = ({ children }) => {
    const { user } = useAuth();
    const [notebooks, setNotebooks] = useState([]);

    const getNotebooks = async () => {
        const result = await dbWorkerCall("getNotebooks", { userId: user.id });
        result.sort((a, b) => {
            const dateA = new Date(a.createdOn);
            const dateB = new Date(b.createdOn);

            return dateB - dateA;
        });
        setNotebooks(result);
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
        setNotebooks(prev => [notebook, ...prev]);
    };

    const updateNotebook = async (notebook) => {
        await dbWorkerCall('updateNotebook', notebook);
        setNotebooks(prev => prev.map(nb => nb.id === notebook.id ? notebook : nb));
    };

    const deleteNotebook = async (id) => {
        await dbWorkerCall('deleteNotebook', { id });
        setNotebooks(prev => prev.filter(nb => nb.id !== id));
    };

    useEffect(() => {
        getNotebooks();
    }, [user]);

    return (
        <NotebookContext.Provider value={{ 
            notebooks, 
            createNotebook, 
            updateNotebook, 
            deleteNotebook, 
        }}>
            { children }
        </NotebookContext.Provider>
    );
};

export const useNotebooks = () => useContext(NotebookContext);