import { useEffect, useRef } from "react";
import { useDashboard } from "../../context/DashboardContext";
import { X } from "lucide-react";
import SearchBar from "./SearchBar";

const SearchModal = () => {
    const modalRef = useRef();
    const searchBarRef = useRef();
    const { searchModalState, setSearchModalState } = useDashboard();

    useEffect(() => {
        if (searchModalState) {
            modalRef.current.showModal();
            searchBarRef.current.focus();
        }
        else {
            modalRef.current.close();
            searchBarRef.current.blur();
        }
    }, [searchModalState]);

    return (
        <dialog className="w-auto h-auto left-1/2 top-1/2 p-2 gap-2 open:w-[90%] open:max-w-150 open:h-100 open:flex open:flex-col -translate-1/2 bg-sidebar text-text border border-border-line rounded-3xl backdrop:bg-neutral-900/5 backdrop:backdrop-blur-xs relative"
                ref={modalRef} >
            <header className="flex flex-col gap-1">
                <SearchBar placeholder={'Search notes...'} ref={searchBarRef} />
                <button type="button"
                        className={`absolute right-[0.75rem] bottom-[0.75rem] rounded-sm cursor-pointer`}
                        onClick={() => setSearchModalState(false)}>
                    <X size={18} />
                </button>
            </header>
            <section className="h-full w-full flex justify-center items-center rounded-2xl">
                <p>Searching...</p>
            </section>
        </dialog>   
    );
};

export default SearchModal