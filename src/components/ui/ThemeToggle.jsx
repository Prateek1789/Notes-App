import { useState, useEffect } from "react"
import { Sun, MoonStar } from "lucide-react"

const ThemeToggle = () => {
    const [isLight, setIsLight] = useState(true);

    useEffect(() => {
        document.documentElement.classList.toggle('dark');
    }, [isLight]);

    return (
        <button className="w-8 h-8 bg-transparent border border-border-line rounded-lg grid place-content-center cursor-pointer"
                onClick={() => setIsLight(!isLight)}>
            {isLight ? <MoonStar size={20}/> : <Sun size={20} />}
        </button>
    )
}

export default ThemeToggle