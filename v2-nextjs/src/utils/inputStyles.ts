import { cva } from "class-variance-authority";

export const buttonCva = cva(
    'group/btn flex items-center justify-center transition-all duration-240 disabled:cursor-not-allowed', 
    {
        variants: {
            intent: {
                primary: 'bg-primary text-white hover:bg-primary/90 shadow-primary/40 dark:shadow-primary/30 disabled:grayscale-50 disabled:shadow-none',
                ghost: 'bg-white dark:bg-neutral-900 border-primary-ghost/15 shadow-blue-950/40',
                default: 'px-4 py-2 bg-neutral-900 dark:bg-neutral-200 text-neutral-300 dark:text-neutral-800 disabled:bg-neutral-600 disabled:shadow-none',
            },
            size: {
                sm: 'py-2 px-4 text-sm font-medium gap-3 rounded-md',
                md: 'py-2 px-4 text-lg font-medium gap-4 rounded-lg',
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
				idle: "border-idle focus:border-focus focus:ring-focus-ring focus:outline-focus-ring",
				valid: "border-valid focus:ring-valid-focus focus:outline-valid-focus",
				invalid: "border-invalid focus:ring-invalid-focus focus:outline-invalid-focus",
			}
    	},
		defaultVariants: {
			state: "idle",
		}
  	}
);