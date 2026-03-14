import { fieldCva } from "@/utils/inputStyles";
import { cn } from "@/utils/cn";

type FieldStates = "idle" | "valid" | "invalid";

type InputFieldProps = {
  label: string,
  state?: FieldStates,
  error?: string,
};

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
             className={cn(fieldCva({ state }), className)}
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