import { Link } from "react-router-dom"
import { THEME_STATE, useTheme } from "../context/ThemeProvider"
import Button from "../components/ui/Button"

const NotoDashboard = () => {
    const { theme } = useTheme();

    return (
        <main className="w-full h-full flex flex-col items-center justify-center gap-8 [grid-area:_main]">
            <h1 className="text-4xl">Noto Dashboard</h1>
            <Link to='/'>
                <Button type="button" name="Got to Home" dark={theme === THEME_STATE.DARK ? false : true} />
            </Link>
        </main>
    )
}

export default NotoDashboard