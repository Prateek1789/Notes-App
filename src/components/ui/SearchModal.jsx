import { useEffect, useRef } from "react";
import { useDashboard } from "../../context/DashboardContext";
import { X, Notebook} from "lucide-react";
import SearchBar from "./SearchBar";

const SearchModal = () => {
    const modalRef = useRef();
    const searchBarRef = useRef();
    const { searchMenuState, toggleSearchMenu } = useDashboard();
    // Placeholder data 
    const things = [
        'Liquor', 
        'Vegetable', 
        'Papaya', 
        'Mango', 
        'Neon', 
        'Columbus', 
        'Computer Science', 
        'Geograpgy', 
        'Mathematic', 
        'History'
    ];

    useEffect(() => {
        if (searchMenuState) {
            modalRef.current.showModal();
            searchBarRef.current.focus();
        }
        else {
            modalRef.current.close();
            searchBarRef.current.blur();
        }
    }, [searchMenuState]);

    return (
        <dialog className="w-auto h-auto left-1/2 top-1/2 p-2 gap-2 open:w-[90%] open:max-w-150 open:h-100 open:flex open:flex-col -translate-1/2 bg-sidebar text-text border border-border-line rounded-2xl backdrop:bg-neutral-900/5 backdrop:backdrop-blur-xs relative"
                ref={modalRef} >
            <header className="flex flex-col gap-1">
                <SearchBar placeholder={'Search notes...'} ref={searchBarRef} />
                <button type="button"
                        className="absolute right-[0.75rem] bottom-[0.75rem] rounded-full cursor-pointer"
                        onClick={toggleSearchMenu}>
                    <X size={20} />
                </button>
            </header>
            <section className="h-full w-full flex justify-center rounded-xl overflow-scroll">
                <ul className="w-full">
                    {things.map((thing, idx) => {
                        return (
                            <li key={idx}
                                className="h-12 w-full px-4 flex items-center gap-2 rounded-xl cursor-pointer hover:bg-SBL-hover"
                                onClick={() => {/* Should open note page */}}>
                                <Notebook size={16}/>
                               {thing}
                            </li>
                        );
                    })}
                </ul>
            </section>
        </dialog>   
    );
};

export default SearchModal