import Button from "../components/ui/Button"

const WelcomePage = () => {
    const signIn = () => console.log('Signin button clicked'); // Demo code to test event handler
    const signUp = () => console.log('Signup button clicked'); // Demo code to test event handler

    return (
        <article className="w-full min-h-10 p-2 flex flex-col items-center justify-cente gap-2 md:gap-4 text-center">
            <h1 className="text-5xl md:text-7xl lg:text-8xl">Welcome to Noto</h1>
            <p className="text-sm max-w-[38ch] mb-6 md:text-xl md:max-w-[45ch]">
                Where your thoughts find clarity. Capture, organize, and revisit your ideas effortlessly.
            </p>
            <div className="w-full flex flex-col items-center justify-center gap-4">
                <Button type='button' 
                        name='Login' 
                        onClick={signIn}/>

                <span className="w-60 text-xs max-w-md md:w-80 text-[var(--color-Gray-400)] flex gap-2 items-center lg:text-sm">
                    <span className="h-[1px] w-full bg-[var(--color-Gray-700)]"></span>
                    OR
                    <span className="h-[1px] w-full bg-[var(--color-Gray-700)]"></span>
                </span>

                <Button type='button' 
                        name='Signup' 
                        onClick={signUp}/>
            </div>
        </article>
    )
}

export default WelcomePage