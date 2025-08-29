import { Link } from "react-router-dom"
import Button from "../ui/Button"

const CallToAction = () => {
    return (
        <section className="w-screen h-auto min-h-[70vh] lg:min-h-[50vh] xl:min-h-[60vh] flex flex-col justify-center items-center text-center gap-6 py-8 px-4 md:gap-8">
            <h2 className="text-4xl max-w-[15ch] md:text-[5vw] md:max-w-[15ch] xl:text-7xl font-medium">
                Start capturing your best ideas today
            </h2>
            <p className="text-lg md:text-lg md:max-w-[50ch] xl:text-lg">
                Don’t let your thoughts slip away. Join Noto and keep everything organized, simple, and accessible anytime.
            </p>
            <div className="flex gap-4 mt-8 md:gap-8">
            <Link to={'/login'}>
                <Button type='button' name='Log In' width={'w-30 md:w-50'} height='h-10 md:h-12'/>
            </Link>
            <Link to={'/register'}>
                <Button type='button' 
                        name='Sign Up' 
                        width={'w-30 md:w-50'} 
                        height='h-10 md:h-12'
                        className='w-30 md:w-50 h-10 md:h-12 bg-transparent border border-[var(--color-Gray-500)] rounded-lg cursor-pointer hover:border-[var(--color-Gray-300)] transition-colors duration-300'/>
            </Link>
            </div>
        </section>
    )
}

export default CallToAction