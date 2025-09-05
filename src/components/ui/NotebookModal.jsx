import { useEffect, useRef, useContext } from "react";
import { X } from "lucide-react";
import InputField from "./InputField"
import Button from "./Button"
import { THEME_STATE, useTheme } from "../../context/ThemeProvider";
import { DashboardContext } from "../../context/DashboardContext";
import { useNotebooks } from "../../context/NotebookContext";

const NotebookModal = () => {
    const modalRef = useRef();
    const nameInputRef = useRef();
    const { theme } = useTheme();
    const { createNotebook } = useNotebooks();
    const { notebookModalState, setNotebookModalState } = useContext(DashboardContext);

    const addNote = () => {
        const notebook = {
            id: Date.now().toString(),
            title: nameInputRef.current.value,
            notes: []
        }
        createNotebook(notebook);
        setNotebookModalState(false);
    }

    useEffect(() => {
        if (notebookModalState) {
            modalRef.current.showModal();
            nameInputRef.current.focus();
        }
        else {
            modalRef.current.close();
            nameInputRef.current.blur();
        }
    }, [notebookModalState]);

    return (
        <dialog className={`w-auto h-auto left-1/2 top-1/2 p-4 gap-4 open:w-120 open:h-63 open:flex open:flex-col -translate-1/2 bg-sidebar text-text border border-border-line rounded-xl backdrop:bg-neutral-900/5 backdrop:backdrop-blur-xs relative`} 
                ref={modalRef} >
            <header className="flex flex-col gap-1">
                <h3 className="text-lg font-semibold">Create Notebook</h3>
                <p className="text-neutral-500 text-sm">Create a new Notebook to store your notes</p>
            </header>
            <button type="button"
                    className="absolute right-4 top-4 rounded-sm cursor-pointer"
                    onClick={() => setNotebookModalState(false)}>
                <X size={20} />
            </button>
            <InputField label='Name' placeholder='My Notebook' ref={nameInputRef}/>
            <footer className="-mt-2 flex gap-2">
                <Button name={'Create'} 
                        width='w-40' 
                        height='h-12' 
                        dark={theme === THEME_STATE.DARK ? false : true} 
                        onClick={addNote}/>
            </footer>
        </dialog>   
    );
};

export default NotebookModal