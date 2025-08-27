import { Link } from 'react-router-dom'
import HeroImageDark from '../../assets/Noto-Dark.png'
import Button from '../ui/Button'

const HeroSection = () => {
    return (
        <section className="hero min-h-screen w-screen flex items-center justify-center lg:bg-radial-[at_50%_170%] lg:from-black from-40% lg:to-[var(--color-Gray-800)]">
            <article className="w-[calc(100vw_-_2rem)] max-w-[80rem] h-screen flex flex-col justify-center gap-10 md:px-4 md:gap-12 xl:justify-end">
                <h1 className="text-5xl md:text-[8vw] xl:text-8xl max-w-[15ch] font-medium">✍🏻 Note-Taking, Reimagined</h1>
                <p className='text-lg md:text-lg xl:text-lg max-w-[55ch]'>
                    Simple, fast, and beautiful ✨. Noto transforms the way you capture and organize your ideas. Focus on what matters - we'll handle the rest
                </p>
                <div className='grid'>
                    <Link to={'/login'} className='w-40 md:w-60'>
                        <Button type='button' name='Get Started' width={'w-40 md:w-60'} height='h-10 md:h-12'/>
                    </Link>
                </div>
                <div className='img-container w-full max-w-[90rem] max-h-[45vh] relative md:rounded-tl-2xl md:rounded-tr-2xl lg:rounded-tl-3xl lg:rounded-tr-3xl xl:rounded-tl-4xl xl:rounded-tr-4xl overflow-hidden before:w-full before:h-full before:absolute before:inset-0 before:bg-gradient-to-b before:from-transparent before:to-black before:to-100% md:border-l md:border-t md:border-r md:border-transparent md:[background:var(--gradient-border-bg)]'>
                    <img src={HeroImageDark} 
                         alt="Noto App image" 
                         className='w-full h-auto object-cover md:rounded-tl-2xl md:rounded-tr-2xl xl:rounded-tl-4xl xl:rounded-tr-4xl object-left-top xl:object-left-top'/>
                </div>
            </article>
        </section>
    )
}

export default HeroSection