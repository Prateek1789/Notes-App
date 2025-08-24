import { Link } from "react-router-dom";
import Button from "../components/ui/Button"

const WelcomePage = () => {
    return (
        <main className="h-full w-full flex items-center justify-center">
            <article className="w-full min-h-10 p-2 flex flex-col items-center justify-cente gap-2 md:gap-4 text-center">
                <h1 className="text-5xl md:text-7xl lg:text-8xl">Welcome to Noto</h1>
                <p className="text-sm max-w-[38ch] mb-6 md:text-xl md:max-w-[45ch]">
                    Where your thoughts find clarity. Capture, organize, and revisit your ideas effortlessly.
                </p>
                <div className="w-full flex flex-col items-center justify-center gap-4">
                    <Link to='/login'>
                        <Button type='button' name='Login'/>
                    </Link>
                
                    <span className="w-60 text-xs max-w-md md:w-80 text-[var(--color-Gray-400)] flex gap-2 items-center lg:text-sm">
                        <span className="h-[1px] w-full bg-[var(--color-Gray-700)]"></span>
                        OR
                        <span className="h-[1px] w-full bg-[var(--color-Gray-700)]"></span>
                    </span>

                    <Link to='/register'>
                        <Button type='button' name='Signup' />
                    </Link>
                </div>
            </article>
        </main>
    )
}

export default WelcomePage