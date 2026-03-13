import { cva } from "class-variance-authority";
import { cn } from "@/utils/cn";

type ButtonProps = {
  intent?: 'primary' | 'ghost' | 'default',
	size?: 'sm' | 'md' | 'lg',
} & React.ComponentProps<'button'>;

const button = cva(
  'group/btn flex items-center justify-center transition-all duration-240', 
  {
    variants: {
      intent: {
        primary: 'bg-primary text-white hover:bg-primary/90 shadow-primary/40',
        ghost: 'bg-white/65 text-foreground border-primary-ghost shadow-blue-950/40',
				default: 'px-4 py-2 bg-neutral-950 text-neutral-300',
      },
			size: {
				sm: 'py-2 px-4 text-sm font-medium gap-3 rounded-lg',
				md: 'py-2 px-4 text-lg font-medium gap-4 rounded-xl',
				lg: 'py-2 px-6 text-lg font-medium gap-4 rounded-xl', 
			},
    },
		defaultVariants: {
			intent: 'default',
		},
  }
);

const Button = ({
	intent,
	size,
	className,
  children,
  ...props
}: ButtonProps) => {
  return (
  	<button className={cn(button({ intent, size }), className)}
      			{ ...props }>
      { children }
    </button>
  )
};

export default Button