import { cva } from "class-variance-authority";

export const buttonCva = cva(
    'group/btn flex items-center justify-center transition-all duration-240 disabled:cursor-not-allowed', 
    {
        variants: {
            intent: {
                primary: 'bg-primary text-white hover:bg-primary/90 shadow-primary/40 disabled:grayscale-50 disabled:shadow-none',
                ghost: 'bg-white/65 text-foreground border-primary-ghost shadow-blue-950/40',
                default: 'px-4 py-2 bg-neutral-950 text-neutral-300 disabled:bg-neutral-600 disabled:shadow-none',
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
  
export const fieldCva = cva(
	"h-12 md:h-12 w-full px-2 rounded-lg border focus:ring-2 focus:outline-2 placeholder:text-sm",
	{
    	variants: {
			state: {
				idle: "border-neutral-300 focus:border-primary focus:ring-primary focus:outline-primary",
				valid: "border-green-500 focus:ring-green-500 focus:outline-green-500",
				invalid: "border-red-500 focus:ring-red-500 focus:outline-red-500",
			}
    	},
		defaultVariants: {
			state: "idle",
		}
  	}
);