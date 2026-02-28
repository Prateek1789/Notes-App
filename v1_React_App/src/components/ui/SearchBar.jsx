import { forwardRef } from "react"
import { Search } from "lucide-react"

const SearchBar = forwardRef(({ placeholder, ...props }, ref) => {
    return (
        <label htmlFor="search-bar" 
               className="w-full h-12 pl-2 bg-SBL-hover border-border-line border flex items-center gap-2 rounded-xl has-focus:outline-2 has-focus:outline-blue-600">
            <Search className="text-neutral-500"/>
            <input type="search" 
                   name="search" 
                   className="h-full w-full rounded-xl pr-2 focus:outline-none placeholder:text-neutral-500" 
                   id="search-bar" 
                   placeholder={placeholder} 
                   ref={ref}
                   {...props} />
        </label>
    );
});

export default SearchBar