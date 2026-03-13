import { ArrowRight } from "lucide-react";
import Button from "./Button";

type PrimaryButtonProps = {
	size: "sm" | "md" | "lg",
	intent: "primary" | "ghost" | "default",
};

const ButtonLanding = ({
	size,
	intent,
	className,
	children,
	...props
}: PrimaryButtonProps
 & React.ComponentProps<"button">) => {

	const arrowWrapperSize = {
		"sm": "w-10 h-full py-1 rounded-md",
		"md": "w-12 h-full py-1.5 rounded-lg",
		"lg": "w-14 h-full py-2 rounded-lg",
	};

	const arrowSize = {
		"sm": 16,
		"md": 18,
		"lg": 20,
	};

  return (
    <Button className={className}
            intent={intent}
            size={size}
            { ...props }>
      {children}
      <span className={`${arrowWrapperSize[size]} flex justify-center border border-primary-ghost bg-inherit/80 bg-blend-lighten`}>
        <ArrowRight size={arrowSize[size]} 
					className="group-hover/btn:translate-x-2 duration-240" />
      </span>
    </Button>
  )
};

export default ButtonLanding