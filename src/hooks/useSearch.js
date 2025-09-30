import { useState, useEffect } from "react";
import { useNotes } from "@/context/NoteContext";

const useSearch = (query) => {
    const debounce = 1000;
    const { activeNotes, trashedNotes } = useNotes();
    const [result, setResult] = useState([...activeNotes]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setResult([...activeNotes.filter(note => note.title.toLowerCase().includes(query) || 
                                                     note.plainText.toLowerCase().includes(query))]);
        }, debounce);

        return () => clearTimeout(timer);
    }, [query, activeNotes, trashedNotes]);
    
    return result;
};

export default useSearch;