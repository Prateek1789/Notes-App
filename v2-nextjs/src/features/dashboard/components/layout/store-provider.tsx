"use client"

import { useRef, useContext, createContext } from "react";
import { useStore, StoreApi } from "zustand";
import { createAppStore, Store } from "@/store/app-store";
import { User, Notebooks } from "@/types";

type StoreType = StoreApi<Store> | null;

const StoreContext = createContext<StoreType>(null);

type ProviderProps = {
  user: User | null,
  notebooks: Notebooks[] | [],
};

export const AppStoreProvider = ({
  user,
  notebooks,
  children
}: { children: React.ReactNode }
 & ProviderProps) => {
  const storeRef = useRef<StoreType>(null);

  if (!storeRef.current) {
    storeRef.current = createAppStore(user, notebooks);
  };

  return (
    <StoreContext value={storeRef.current}>
      { children }
    </StoreContext>
  )
};

export const useAppStore = <T,>(selector: (state: Store) => T) => {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useAppStore must be used within AppStoreProvider");
  return useStore(context, selector);
};