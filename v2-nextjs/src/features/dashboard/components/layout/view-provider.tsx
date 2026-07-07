import { useState, createContext, useContext } from "react";

type View = "main" | "noteList";

interface ViewContextType {
  view: View
  setView: React.Dispatch<React.SetStateAction<View>>
};

const ViewContext = createContext<ViewContextType | null>(null);

export const ViewProvider = ({ 
	children 
}: { 
	children: React.ReactNode 
}) => {
	const [view, setView] = useState<View>("main");

  return (
    <ViewContext value={{ view, setView }}>
      {children}
    </ViewContext>
  )
};

export const useView = () => {
  const context = useContext(ViewContext);
  if (!context) throw new Error("useViewContext must be used within ViewProvider");
  return context;
};