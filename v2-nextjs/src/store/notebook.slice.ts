import { StateCreator } from "zustand";
import { Notebooks } from "@/types";

export type NotebookState = Notebooks[] | [];

interface NotebookActions {
  create: (nb: Notebooks) => void; 
  update: (id: number, title: string) => void;
  setTrash: (id: number) => void;
  delete: (id: number) => void;
  setNotebooks: (nb: Notebooks[]) => void;
};

export interface NotebookSlice {
  notebooks: NotebookState;
  notebookActions: NotebookActions;
};

export const createNotebookSlice = (initialState: NotebookState): StateCreator<NotebookSlice> => ((set) => ({
  notebooks: initialState,
  notebookActions: {
    create: (nb) => set(state => ({ 
      notebooks: [nb, ...state.notebooks] 
    })),
    update: (id, title) => set(state => ({
      notebooks: state.notebooks.map(nb => nb.id === id ? { ...nb, title } : nb)
    })),
    setTrash: (id) => set(state => ({
      notebooks: state.notebooks.map(nb => nb.id === id ? { ...nb, is_trashed: !nb.is_trashed } : nb)
    })),
    delete: (id) => set(state => ({
      notebooks: state.notebooks.filter(nb => nb.id !== id)
    })),
    setNotebooks: (nb) => set({ notebooks: nb })
  }
}))