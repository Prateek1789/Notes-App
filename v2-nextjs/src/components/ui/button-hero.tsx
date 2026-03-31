import { ArrowRight } from "lucide-react";
import { Button } from "./button";

type HeroButtonProps = {
	size: "xs" | "sm" | "lg" | "default" | "icon" | "icon-xs" | "icon-sm" | "icon-lg",
	variant: "default" | "ghost" | "outline" | "secondary",
};

type ButtonSize = {
	[key: string]: string | number,
};

type HeroButtonIconWrapperProps = {
	variant: {
		[key: string]: string
		default: string,
		outline: string,
		ghost: string,
	},
	size: {
		[key: string]: string,
		xs: string,
		sm: string,
		lg: string,
	}
};

const ButtonHero = ({
	size,
	variant,
	className,
	children,
	...props
}: HeroButtonProps
 & React.ComponentProps<"button">) => {

	const buttonSize: ButtonSize = {
		xs: "text-sm py-4.25 pr-1.25 font-base",
		sm: "text-base py-6 pr-2 rounded-lg",
		lg: "text-lg py-7 pr-2 pl-4",
	};

	const iconWrapperStyles: HeroButtonIconWrapperProps = {
		variant: {
			default: "border-blue-400",
			outline: "border-border dark:border-input",
			ghost: "border-none"
		},
		size: {
			xs: "w-8 h-6 rounded-sm",
			sm: "w-10 h-8 rounded-sm",
			lg: "w-12 h-10 rounded-md",
		}
	};

	const iconSize: ButtonSize = {
		xs: 16,
		sm: 18,
		lg: 20,
	};

  return (
    <Button 
			className={`${className} ${buttonSize[size]} gap-2`}
      variant={variant}
      size={size}
      { ...props }>
      {children}
      <span className={`relative bg-transparent overflow-hidden border ${iconWrapperStyles.size[size]} ${iconWrapperStyles.variant[variant]}`}>
        <ArrowRight 
					size={iconSize[size]} 
					className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 group-hover/button:translate-x-[130%] group-hover/button:delay-0 delay-220 transition-transform duration-300" />
        <ArrowRight 
					size={iconSize[size]} 
					className="absolute top-1/2 right-1/2 -translate-y-1/2 -translate-x-[200%] group-hover/button:translate-x-1/2 group-hover/button:delay-200 transition-transform duration-400" />
      </span>
    </Button>
  )
};

export default ButtonHero