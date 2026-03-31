import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

const button = cva(
    'group/btn flex items-center justify-center transition-all duration-240 disabled:cursor-not-allowed', 
    {
        variants: {
            intent: {
                primary: 'bg-primary border border-blue-300 dark:border-blue-700 text-white hover:bg-primary/90 shadow-blue-300 dark:shadow-blue-900 disabled:grayscale-50 disabled:shadow-none',
                ghost: 'bg-white border border-blue-100 dark:border-gray-800 dark:bg-neutral-900 shadow-blue-950/40',
                default: 'bg-neutral-900 dark:bg-neutral-200 text-neutral-300 dark:text-neutral-800 disabled:bg-neutral-600 disabled:shadow-none',
            },
            size: {
                sm: 'py-1.75 px-4 text-sm font-base gap-2.5 rounded-md',
                md: 'py-2 px-4 text-lg font-medium gap-4 rounded-lg',
                lg: 'py-2 px-6 text-lg font-medium gap-4 rounded-xl', 
            },
        },
        defaultVariants: {
            intent: 'default',
            size: 'md',
        },
    }
);

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
  	<button className={cn(button({ intent, size }), className)}
      			{ ...props }>
      { children }
    </button>
  )
};

export default Button