import { MoonStar, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";

const ThemeToggle = () => {
  const { setTheme } = useTheme();

  return (
    <div className="h-auto w-auto bg-line p-px">
      <div className="h-full w-auto flex items-center justify-center gap-px [clip-path:var(--clip-bevel-xs)]">
        <button type="button"
                className="w-8 h-8 flex items-center justify-center bg-white dark:bg-neutral-900 hover:bg-primary transition-colors"
                onClick={() => setTheme("light")}>
          <Sun size={14} />
        </button>
        <button type="button"
                className="w-8 h-8 flex items-center justify-center bg-white dark:bg-neutral-900 hover:bg-primary transition-colors"
                onClick={() => setTheme("system")}>
          <Monitor size={14} />
        </button>
        <button type="button"
                className="w-8 h-8 flex items-center justify-center bg-white dark:bg-neutral-900 hover:bg-primary transition-colors"
                onClick={() => setTheme("dark")}>
          <MoonStar size={14} />
        </button>
      </div>
    </div>
  )
};

export default ThemeToggle