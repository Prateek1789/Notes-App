import { createStore } from "zustand";
import { UserState, UserSlice, createUserSlice } from "./user.slice";
import { NotebookState, NotebookSlice, createNotebookSlice } from "./notebook.slice";

export type Store = UserSlice & NotebookSlice;

export const createAppStore = (
  user: UserState, 
  notebook: NotebookState
) => createStore<Store>()((...a) => ({
  ...createUserSlice(user)(...a),
  ...createNotebookSlice(notebook)(...a),
}));