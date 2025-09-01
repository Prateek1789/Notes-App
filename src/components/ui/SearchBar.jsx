import { useContext } from "react"
import { Search } from "lucide-react"
import { ThemeContext } from "../../context/ThemeProvider"

const SearchBar = () => {
    const { theme } = useContext(ThemeContext);

    return (
        <label htmlFor="search-bar" 
               className={`w-full h-10 pl-2 ${theme === 'dark' ? 'bg-neutral-800 border-neutral-800' : 'bg-white border-border-line'} border flex items-center gap-2 rounded-lg has-focus:outline-2 has-focus:outline-blue-600`}>
            <Search className="text-neutral-500"/>
            <input type="search" 
                   name="search" 
                   className="h-full w-full rounded-lg focus:outline-none placeholder:text-neutral-500" 
                   id="search-bar" 
                   placeholder="Search notes..." />
        </label>
    )
}

export default SearchBar