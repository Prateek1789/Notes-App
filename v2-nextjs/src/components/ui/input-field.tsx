import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

type FieldStates = "idle" | "valid" | "invalid";

type InputFieldProps = {
  label: string,
  state?: FieldStates,
  error?: string,
};

const field = cva(
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

const InputField = ({
	type,
  label,
	placeholder,
  state = "idle",
  error,
  className,
	ref,
  ...props
}: InputFieldProps
& React.ComponentProps<"input">) => {

	return (
    <label htmlFor={props.id}
           className="min-h-23 w-full max-w-md flex flex-col gap-1 text-sm">
      {label}
      <input type={type}
						 placeholder={placeholder}
						 id={props.id} 
             className={cn(field({ state }), className)}
             ref={ref}
						 aria-invalid={state == "invalid" ? true : false}
						 aria-describedby={`${props.id}-error`}
						 { ...props } />
      {error && (
				<span id={`${props.id}-error`} 
							className="text-xs ml-auto text-red-500">
					{error}
				</span>
			)}
    </label>
  )
};

export default InputField