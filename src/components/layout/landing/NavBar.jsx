import { Menu, Sun } from "lucide-react"
import ThemeToggle from "../../ui/ThemeToggle"
import Button from "../../ui/Button"

const NavBar = () => {
    return (
        <header className="w-full h-auto bg-navbar flex justify-center items-center fixed px-4 md:px-8 top-0 left-0 z-50 backdrop-blur-lg border-b border-border-line">
            <nav className="w-full max-w-[90rem] h-15 xl:h-20 flex items-center justify-between">
                <span className="logo text-xl xl:text-4xl font-bold">Noto</span>
                <ul className="flex items-center justify-center gap-4">
                    <li><ThemeToggle /></li>
                    <li><Button name={'Log In'} height="h-8" width='w-20' dark={true}/></li>
                    <li><Button name={'Sign Up'} height="h-8" width='w-20' /></li>
                </ul>
            </nav>
        </header>
    )
}

export default NavBar