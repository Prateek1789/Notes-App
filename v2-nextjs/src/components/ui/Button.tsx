import { buttonCva } from "@/utils/inputStyles";
import { cn } from "@/utils/cn";

type ButtonProps = {
  intent?: 'primary' | 'ghost' | 'default',
	size?: 'sm' | 'md' | 'lg',
} & React.ComponentProps<'button'>;

const Button = ({
	intent,
	size,
	className,
  children,
  ...props
}: ButtonProps) => {
  return (
  	<button className={cn(buttonCva({ intent, size }), className)}
      			{ ...props }>
      { children }
    </button>
  )
};

export default Button