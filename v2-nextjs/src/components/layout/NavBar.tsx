"use client"

import { useState, useEffect } from "react";
import Button from "../ui/Button";

const Navbar = () => {
	const mobileWidth = 640;
	const [isMobile, setIsMobile] = useState(window.innerWidth <= mobileWidth);

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

	useEffect(() => {
		const handleResize = () => {
			const width = window.innerWidth;
			setIsMobile(width <= mobileWidth);
		};

		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, []);

  return (
    <nav className="w-full h-16 py-2 px-2.5 flex justify-between items-center bg-white/80 backdrop-blur-lg border border-neutral-200/70 rounded-full">
			<div id="logo"
					 className="ml-4 flex items-center justify-center gap-2">
				{/* <span className="w-10 h-10 bg-black rounded-full"></span> */}
				<span className="text-xl font-medium flex items-baseline-last justify-center gap-0.5">
					NoteFlow
					<span className="w-2 h-2 rounded-full bg-blue-400"></span>
				</span>
			</div>

			{isMobile && 
				<button className="w-16 h-full px-4 rounded-full bg-primary flex flex-col items-center justify-center gap-2.5">
					<div className="w-full h-0.5 bg-white"></div>
					<div className="w-full h-0.5 bg-white"></div>
				</button>
			}

			{!isMobile && (
				<ul className="flex gap-8 items-center">
					{navLinks.map(link => {
						return (
							<li key={link.href}>
								<a href={link.href}
									 onClick={(e) => handleNavClick(e, link.href)}
									 className="">{link.name}</a>
							</li>
						)
					})}
				</ul>
			)}

			{!isMobile && 
				<Button className="pl-5 pr-2"
								intent="primary"
								size="sm">
					Login
					<span className="h-full w-10 py-0.25 flex place-content-center rounded-full border border-blue-300/60 bg-blue-300/20">
                            <span className="text-inheret group-hover/btn:translate-x-1.5 transition-transform duration-400">
                                {"->"}
                            </span>
                        </span>
				</Button>}
    </nav>
  )
};

export default Navbar