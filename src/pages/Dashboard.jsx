import { Link } from "react-router-dom"
import { THEME_STATE, useTheme } from "../context/ThemeProvider"
import Button from "../components/ui/Button"

const NotoDashboard = () => {
    const { theme } = useTheme();

    return (
        <section className="w-full h-full [grid-area:_main] gird grid-cols-1 grid-rows-2">
            <section className="quick-notes w-full h-1/2 flex flex-col p-4 gap-4">
                <span className="text-2xl">{/* Quick Notes */}</span>
                <div className="w-full h-full flex items-center justify-center text-2xl border-border-line rounded-xl">Quick Notes</div>
            </section>
            <section className="notebook w-full h-1/2 flex flex-col p-4 gap-4">
                <span className="text-2xl">{/* Notebooks */}</span>
                <div className="w-full h-full flex items-center justify-center text-2xl border-border-line rounded-xl">Notebooks</div>
            </section>
        </section>
    );
}

export default NotoDashboard