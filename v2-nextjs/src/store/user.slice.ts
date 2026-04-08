import { StateCreator } from "zustand";
import { User } from "@/types";

export type UserState = User | null;

export type UserActions = {
  setUser: (user: User) => void,
  updateUsername: (newName: string) => void,
};

export type UserSlice = {
  user: UserState,
  actions: UserActions,
};

export const createUserSlice = (initialState: UserState): StateCreator<UserSlice> => ((set) => ({
  user: initialState,
  actions: {
    setUser: (user) => set({ user }),
    updateUsername: (newName) => set(state => ({ 
      user: state.user ? { ...state.user, user_name: newName } : null 
    })),
  }
}));