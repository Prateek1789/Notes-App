import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { useDashboard } from "@/context/DashboardContext";
import useSearch from "@/hooks/useSearch";

import { X, Notebook, Zap} from "lucide-react";
import SearchBar from "./SearchBar";

const SearchModal = () => {
    const modalRef = useRef();
    const searchBarRef = useRef();
    const { notebookId } = useParams();
    const { searchMenuState, toggleSearchMenu } = useDashboard();
    const [query, setQuery] = useState('');
    const result = useSearch(query);
    const linkRefs = useRef([]);
    const [focusIdx, setFocusIdx] = useState(-1);
   
    const handleQuery = () => {
        setQuery(searchBarRef.current.value);
    };

    const openNote = () => notebookId ? navigate(`${note.id}`) : navigate(`/notebooks/${note.notebookId}/${note.id}`);

    const handleKeydown = (e) => {
        if (!searchMenuState) {
            return;
        }

        if (e.key === 'Escape') {
            e.preventDefault();
            if (!searchBarRef.current.value) {
                toggleSearchMenu();
            }
            else {
                searchBarRef.current.value = '';
                handleQuery();
            }
        }

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            let nextIdx = focusIdx + 1;
            console.log(`Next IDX: ${nextIdx}, Focus iDX: ${focusIdx}`);

            if (nextIdx < result.length) {
                setFocusIdx(nextIdx);
                linkRefs.current[nextIdx]?.focus();
            }
        }

        if (e.key === 'ArrowUp') {
            e.preventDefault();
            const prevIdx = focusIdx - 1;

            if (prevIdx > -1) {
                setFocusIdx(prevIdx);
                linkRefs.current[prevIdx]?.focus();
            }
        }
    };

    useEffect(() => {
        if (searchMenuState) {
            modalRef.current.showModal();
            searchBarRef.current.focus();
        }
        else {
            modalRef.current.close();
            searchBarRef.current.blur();
            setFocusIdx(-1);
        }
    }, [searchMenuState]);

    return (
        <dialog className="w-auto h-auto left-1/2 top-1/2 gap-2 open:w-[90%] open:max-w-150 open:max-h-100 open:flex open:flex-col -translate-1/2 bg-sidebar text-text border border-border-line rounded-2xl backdrop:bg-neutral-900/5 backdrop:backdrop-blur-xs relative"
                ref={modalRef}
                onKeyDown={handleKeydown}>
            <header className="flex flex-col gap-2 px-2 pt-2">
                <SearchBar placeholder={'Search for notes or notebooks...'} 
                           ref={searchBarRef} 
                           onChange={handleQuery} />
            </header>
            <section className="h-full w-full px-2 pt-1 pb-2 flex flex-col items-center rounded-xl overflow-scroll">
                {result.map((item, idx) => {
                    return (
                        <Link key={idx} 
                              className="h-12 w-full px-3 flex items-center gap-3 rounded-xl cursor-pointer hover:bg-sidebar-btn focus:bg-sidebar-btn focus:outline-2 focus:ring-blue-600 focus:outline-blue-600"
                              ref={el => linkRefs.current[idx] = el}
                              to={notebookId ? `${item.id}` : `dashboard/notebooks/${item.notebookId}/${item.id}`}
                              onClick={toggleSearchMenu}>
                            <Zap size={16} color="oklch(62.3% 0.214 259.815)" />
                            {item.plainText?.length > 70 ? `${item.plainText?.slice(0, 40).trim()}...` : item.plainText}
                        </Link>
                    )
                })}
            </section>
            <button type="button"
                        className="absolute right-[0.75rem] bottom-[0.75rem] rounded-full cursor-pointer"
                        onClick={toggleSearchMenu}>
                    <X size={20} />
            </button>
        </dialog>
    );
};

export default SearchModal