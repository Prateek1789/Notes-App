import { Link } from 'react-router-dom'
import { useTheme } from '@/context/ThemeProvider'
import HeroImageDark from '@/assets/Noto-Dark.png'
import HeroImageLight from '@/assets/Noto-Light.png'
import Button from '@/components/ui/Button'

const HeroSection = () => {
    const { theme } = useTheme();
    // const getHeroImage = () => theme === "dark" ? HeroImageDark : HeroImageLight;

    return (
        <section className="hero min-h-[90vh] w-screen flex items-center justify-center xl:pb-30 md:items-end lg:[background:var(--color-hero-gradient)]">
            <article className="w-[calc(100vw_-_2rem)] max-w-[80rem] h-screen md:h-[70vh] xl:h-[105vh] flex flex-col justify-center gap-10 md:px-4 md:gap-12 xl:justify-end">
                <h1 className="text-5xl md:text-[8vw] xl:text-8xl max-w-[15ch] font-medium">✍🏻 Note-Taking, Reimagined</h1>
                <p className='text-lg md:text-lg xl:text-lg max-w-[55ch]'>
                    Simple, fast, and beautiful ✨. Noto transforms the way you capture and organize your ideas. Focus on what matters - we'll handle the rest
                </p>
                <div className='grid'>
                    <Link to={'/login'} className='w-40 md:w-60'>
                        <Button type='button' 
                                name='Get Started' 
                                width={'w-40 md:w-60'} 
                                height='h-10 md:h-12' 
                                dark={theme === "dark" ? false : true} />
                    </Link>
                </div>
                <div className='img-container w-full max-w-[90rem] max-h-[45vh] relative md:rounded-tl-2xl md:rounded-tr-2xl lg:rounded-tl-3xl lg:rounded-tr-3xl xl:rounded-tl-4xl xl:rounded-tr-4xl overflow-hidden mask-b-from-3.5 md:border md:border-border-line'>
                    <img src={theme === "dark" ? HeroImageDark : HeroImageLight} 
                         alt="Noto App image" 
                         className='w-full h-auto object-cover md:rounded-tl-2xl md:rounded-tr-2xl xl:rounded-tl-4xl xl:rounded-tr-4xl object-left-top xl:object-left-top'/>
                </div>
            </article>
        </section>
    )
}

export default HeroSection