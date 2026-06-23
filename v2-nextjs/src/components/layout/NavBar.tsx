"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { 
	useState, 
	createContext, 
	useContext 
} from "react"
import { 
	motion, 
	Variants,
	stagger, 
	AnimatePresence 
} from "motion/react"
import { useIsMobile } from "@/hooks/use-mobile"
import ButtonHero from "../ui/button-hero"
import FlipLink from "../ui/flip-link"
import NoteFlowLogo from "../icons/NoteFlowLogo"

interface NavigationContextType {
	isMenuOpen: boolean;
	toggleNavMenu: () => void;
	handleNavClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
};

const navLinks = [
  { name: "Features", href: "#feature" },
  { name: "Showcase", href: "#showcase" },
  { name: "Developers", href: "#developer" },
];

const navButtons = [
  { name: "Sign In", href: "/login", type: "default" },
  { name: "Sign Up", href: "/signup", type: "outline" },
];

const NavbarContext = createContext<NavigationContextType | null>(null);

export default function Navbar() {
  const router = useRouter();
	const isMobile = useIsMobile();
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleNavMenu = () => setIsMenuOpen(prev => !prev);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const targetId = href.replace("#", "")
    const element = document.getElementById(targetId)

    if (element) {
			if (isMenuOpen) toggleNavMenu();

      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    };
  };

  return (
		<NavbarContext value={{ isMenuOpen, toggleNavMenu, handleNavClick }}>
    	<nav className={`relative mx-w-[90rem] flex h-12 w-full items-center justify-between bg-background px-1`}>
      	<Link 
					href={"/"} 
					className="flex items-center"
				>
        	<NoteFlowLogo />
      	</Link>

				{/* ---- Desktop Navigation ---- */}
				{ !isMobile && (
					<>
						<ul className={`w-auto h-auto hidden md:flex items-center justify-center gap-4`}>
							{navLinks.map(link => {
								return (
									<li key={link.href}>
										<FlipLink 
											text={link.name} 
											href={link.href} 
											onClick={(e) => handleNavClick(e, link.href)} />
									</li>
								)
							})}
						</ul>
						<div className="w-auto h-auto hidden md:flex items-center gap-2">
							{navButtons.map(btn => {
								return (
									<ButtonHero
										key={btn.name}
										variant={btn.type === "default" ? "default" : "outline"}
										size="xs"
										onClick={() => router.push(btn.href)}
									>
										{btn.name}
									</ButtonHero>
								)
							})}
						</div>
					</>
				)}

				{/* ---- Hamburger Menu and Trigger for mobile screens ---- */}
				{ isMobile && (<HamburgerMenuTrigger />) }
				<AnimatePresence initial={false}>
					{ (isMenuOpen && isMobile)&& (<HamburgerMenu />)}
				</AnimatePresence>
    	</nav>
		</NavbarContext>
  )
};

const useNavContext = () => {
	const context = useContext(NavbarContext);
	if (!context) throw new Error("useNavContext must be used inside NavbarContext Provider");
	return context;
};

const triggerVariants: Variants = {
	closedTop: { y: [7, 7, 0], rotate: [45, 0, 0] },
	openTop: { y: [0, 7, 7], rotate: [0, 0, 45] },
	closedBottom: { y: [-7, -7, 0], rotate: [-45, 0, 0] },
	openBottom: { y: [0, -7, -7], rotate: [0, 0, -45] },
};

const HamburgerMenuTrigger = () => {
	const { isMenuOpen, toggleNavMenu } = useNavContext();

  return (
    <motion.button 
			onClick={toggleNavMenu}
			className="relative mr-0.5 flex h-8 w-8 flex-col items-center justify-center gap-3 rounded-sm"
		>
      <motion.span 
				variants={triggerVariants}
				initial={false}
				animate={isMenuOpen ? "openTop" : "closedTop"}
				transition={{ type: "keyframes" }}
				className="h-0.5 w-5 rounded-lg bg-foreground"
			></motion.span>
      <motion.span
				variants={triggerVariants} 
				initial={false}
				animate={isMenuOpen ? "openBottom" : "closedBottom"}
				transition={{ type: "keyframes" }}
				className="h-0.5 w-5 rounded-lg bg-foreground"
			></motion.span>
    </motion.button>
  )
};

const listVariants: Variants = {
	hidden: { 
		opacity: 0 
	},
	visible: { 
		opacity: 1, 
		transition: { 
			delayChildren: stagger(0.1, { startDelay: 0.2 }), 
		}
	}
};

const itemVariants: Variants = {
	hidden: { opacity: 0, y: -6 },
	visible: { opacity: 1, y: 0 }
};

const HamburgerMenu = () => {
	const router = useRouter();
	const { isMenuOpen, handleNavClick } = useNavContext();

  return (
    <motion.div 
			initial={{ clipPath: "inset(0 0 100% 0)" }}
			animate={{ clipPath: "inset(0 0 0 0)" }}
			exit={{ 
				clipPath: "inset(0 0 100% 0)", 
				transition: { delay: 0.1 } }
			}
			transition={{ type: "keyframes", duration: 0.25 }}
			className="h-[calc(100vh-3.5rem)] w-full bg-background absolute top-full left-0 flex flex-col items-center justify-center gap-8"
		>
      <motion.ul
				variants={listVariants}
				initial={"hidden"}
				animate={isMenuOpen ? "visible" : "hidden"} 
				className="flex flex-col items-center justify-center gap-8"
			>
        {navLinks.map((link) => {
          return (
            <motion.li 
							key={link.name}
							variants={itemVariants}
							transition={{ type: "keyframes" }}
						>
              <FlipLink 
								text={link.name} 
								href={link.href}
								className="text-lg" 
								onClick={(e) => handleNavClick(e, link.href)} />
            </motion.li>
          )
        })}
      </motion.ul>
			<div className="w-auto h-auto flex flex-col items-center gap-6">
				{navButtons.map(btn => {
					return (
						<ButtonHero
							key={btn.name}
							variant={btn.type === "default" ? "default" : "outline"}
							size="sm"
							onClick={() => router.push(btn.href)}
						>
							{btn.name}
						</ButtonHero>
					)
				})}
			</div>
    </motion.div>
  )
};