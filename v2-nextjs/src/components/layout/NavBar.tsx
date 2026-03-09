"use client"

import { useState } from "react";
import Button from "../ui/Button";

const Navbar = () => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const navLinks = [
    { name: 'Features', href: '#feature' },
    { name: 'Showcase', href: '#showcase' },
    { name: 'Developers', href: '#developer' },
  ];

	const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
    });
    }
	};

	return (
  	<nav className={`w-full ${isMobileMenuOpen && 'open'} p-2.5 px-2.5 bg-white/80 backdrop-blur-lg border border-neutral-200/70 rounded-4xl transition-all duration-300 ease-out overflow-hidden`}>
			{/* Logo container */}
			<div className="h-full p-2 px-2.5 flex items-center justify-center gap-2.5 border border-primary-ghost rounded-full [grid-area:logo]">
				<span className="text-xl font-extrabold font-grotesk uppercase flex items-baseline-last justify-center gap-0.5">
					NoteFlow
					<span className="w-2 h-2 rounded-full bg-blue-400"></span>
				</span>
			</div>

			{/* Nav links */}
			<div className="w-full h-auto overflow-hidden [grid-area:links]">
				<ul className={`w-auto h-full flex flex-col justify-center items-start gap-8 md:flex-row md:justify-center md:items-center transition-all duration-300`}>
					{navLinks.map(link => {
						return (
							<li key={link.href}>
								<a href={link.href} className="" onClick={(e) => handleNavClick(e, link.href)}>
									{link.name}
								</a>
							</li>
						)
					})}
				</ul>
			</div>
			
			{/* Hamburger menu button, only visible in screen sizes < 768px */} 
			<button className="w-14 h-full px-4 rounded-full bg-primary flex flex-col items-center justify-center gap-2.5 md:hidden [grid-area:menu]"
							onClick={() => setIsMobileMenuOpen(prev => !prev)}
							aria-expanded={isMobileMenuOpen}
							aria-label="Toggle Navigation Menu">
				<div className="w-full h-0.5 bg-white"></div>
				<div className="w-full h-0.5 bg-white"></div>
			</button>
			
			{/* Login button */}
			<div className="w-full h-auto overflow-hidden [grid-area:login]">
				<Button className={`w-full h-full md:flex justify-between md:w-auto pl-5 pr-2`}
								intent="primary"
								size={isMobileMenuOpen ? "md" : 'sm'}>
					Login
					<span className="h-full w-10 py-0.25 flex justify-center items-center rounded-full border border-blue-300/60 bg-blue-300/20">
          	<span className="text-inheret group-hover/btn:translate-x-1.5 transition-transform duration-400">
            	{"->"}
          	</span>
        	</span>
				</Button>
			</div>
  	</nav>
  )
};

export default Navbar