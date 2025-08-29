import { Link } from "react-router-dom"
import Button from "../components/ui/Button"

const NotoDashboard = () => {
    return (
        <main className="w-full h-full flex flex-col items-center justify-center gap-8">
            <h1 className="text-[9vw]">Noto Dashboard</h1>
            <Link to='/'>
                <Button type="button" name="Got to Home"/>
            </Link>
        </main>
    )
}

export default NotoDashboard