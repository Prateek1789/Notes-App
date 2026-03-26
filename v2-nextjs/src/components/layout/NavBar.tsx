"use client"

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import Button from "../ui/Button";
import ButtonLanding from "../ui/ButtonLanding";
import FlipLink from "../ui/FlipLink";
import NoteFlowLogo from "../icons/NoteFlowLogo";

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
  	<nav className={`w-full h-auto p-px bg-line mx-w-[90rem] overflow-x-hidden ${isMobileMenuOpen && 'shadow-2xl shadow-neutral-400 dark:shadow-neutral-900'}`}>
			<div className={`navigation-container w-full h-full ${isMobileMenuOpen && 'open'} bg-white dark:bg-neutral-900 transition-all duration-300 ease-out overflow-hidden`}>
			{/* Logo container */}
			<Link href={"/"}
						className="flex items-center">
				<NoteFlowLogo />
			</Link>

			{/* Nav links */}
			<div className="w-full h-auto overflow-hidden [grid-area:links]">
				<ul className={`w-auto h-full flex flex-col justify-center items-start gap-8 md:flex-row md:justify-center md:items-center transition-all duration-300`}>
					{navLinks.map(link => {
						return (
							<li key={link.href}>
								<FlipLink 
									text={link.name} 
									href={link.href} 
									onClick={(e) => handleNavClick(e, link.href)}/>
							</li>
						)
					})}
				</ul>
			</div>
			
			{/* Hamburger menu button, only visible in screen sizes < 768px */} 
			<Button
				intent="primary"
				size="md" 
				className="relative h-full aspect-square p-0 gap-2.75 md:hidden [grid-area:menu]"
				onClick={() => setIsMobileMenuOpen(prev => !prev)}
				aria-expanded={isMobileMenuOpen}
				aria-label="Toggle Navigation Menu">
				<div className={`absolute w-5 h-0.5 -translate-y-1.75 ${isMobileMenuOpen && "translate-y-0"} rounded-full bg-white`} aria-hidden={true}></div>
				<div className={`absolute w-5 h-0.5 translate-y-2 ${isMobileMenuOpen && "translate-y-0"} rounded-full bg-white`} aria-hidden={true}></div>
			</Button>
			
			{/* Login button */}
			<div className="w-auto h-auto flex gap-2 overflow-hidden [grid-area:login]">
				<ButtonLanding 
					intent="ghost"
					size="sm"
					onClick={() => handleNavigation("/login")}>
					Login
				</ButtonLanding>

				<ButtonLanding 
					intent="primary"
					size="sm"
					onClick={() => handleNavigation("/signup")}>
					Sign Up
				</ButtonLanding>
			</div>
			</div>
  	</nav>
  )
};

export default Navbar