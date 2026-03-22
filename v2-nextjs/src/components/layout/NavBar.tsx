"use client"

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ButtonLanding from "../ui/ButtonLanding";
import ThemeToggle from "../ui/ThemeToggle";

const Navbar = () => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const router = useRouter();

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

	const handleNavigation = (href: string) => {
		router.push(href);
	};

	useEffect(() => {
		const handleResize = (e: Event) => {
			const target = e.target as Window;
			setIsMobileMenuOpen(prev => target.innerWidth >= 768 ? false : prev);
		};

		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	});

	return (
  	<nav className={`w-full h-auto p-px bg-line mx-w-[90rem]`}>
			<div className={`navigation-container w-full h-full ${isMobileMenuOpen && 'open'} bg-white dark:bg-neutral-900 transition-all duration-300 ease-out overflow-hidden`}>
			{/* Logo container */}
			<div className="h-full px-2.5 flex items-center justify-center gap-2.5 rounded-lg [grid-area:logo]">
				<span className="text-xl font-extrabold font-grotesk uppercase flex items-baseline-last justify-center gap-0.5">
					NoteFlow
					<span className="w-2 h-2 rounded-full bg-primary"></span>
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
			<button className="w-12 h-full px-2.5 rounded-lg bg-primary flex flex-col items-center justify-center gap-2.75 md:hidden [grid-area:menu]"
							onClick={() => setIsMobileMenuOpen(prev => !prev)}
							aria-expanded={isMobileMenuOpen}
							aria-label="Toggle Navigation Menu">
				<div className="w-full h-0.5 bg-white"></div>
				<div className="w-full h-0.5 bg-white"></div>
			</button>
			
			{/* Login button */}
			<div className="w-full h-auto flex items-center gap-4 overflow-hidden [grid-area:login] ">
				<ThemeToggle />
				<ButtonLanding className="w-full pl-3 pr-1.75 py-1.75 justify-between"
							   intent="primary"
							   size="sm"
								 onClick={() => handleNavigation("/login")}>
					Login
				</ButtonLanding>
			</div>
			</div>
  	</nav>
  )
};

export default Navbar