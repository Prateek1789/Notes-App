import { ArrowRight } from "lucide-react";
import Button from "./Button";

type PrimaryButtonProps = {
	size: "sm" | "md" | "lg",
	intent: "primary" | "ghost",
};

const ButtonLanding = ({
	size,
	intent,
	className,
	children,
	...props
}: PrimaryButtonProps
 & React.ComponentProps<"button">) => {

	const buttonSize = {
		sm: "py-1.5 pl-2.5 pr-1.5",
		md: "py-1.75 pl-3 pr-1.75 ",
		lg: "py-2 pl-4 pr-2",
	};

	const iconWrapperStyles = {
		intent: {
			primary: "border-blue-400",
			ghost: "border-blue-100 dark:border-gray-700",
		},
		size: {
			sm: "w-9 h-6 rounded-sm",
			md: "w-12 h-8 rounded-md",
			lg: "w-14 h-10 rounded-lg",
		}
	};

	const iconSize = {
		sm: 16,
		md: 18,
		lg: 20,
	};

  return (
    <Button 
						className={`${className} ${buttonSize[size]}`}
            intent={intent}
            size={size}
            { ...props }>
      {children}
      <span className={`relative bg-transparent overflow-hidden border ${iconWrapperStyles.size[size]} ${iconWrapperStyles.intent[intent]}`}>
        <ArrowRight 
					size={iconSize[size]} 
					className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 group-hover/btn:translate-x-[120%] group-hover/btn:delay-0 delay-200 transition-transform duration-300" />
        <ArrowRight 
					size={iconSize[size]} 
					className="absolute top-1/2 right-1/2 -translate-y-1/2 -translate-x-[200%] group-hover/btn:translate-x-1/2 group-hover/btn:delay-200 transition-transform duration-400" />
      </span>
    </Button>
  )
};

export default ButtonLanding