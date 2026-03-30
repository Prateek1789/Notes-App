"use client"

import { useState } from "react";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { Eye, EyeOff } from "lucide-react";

type InputStates = "idle" | "valid" | "invalid"

type PasswordFieldProps = {
	label?: string,
	state?: InputStates,
	error?: string,
	showToggle: boolean,
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

const PasswordField = ({
	label = "Password",
	state = "idle",
	showToggle = true,
	error,
	className,
	ref,
	...props
}: PasswordFieldProps
 & React.ComponentProps<"input">) => {
	const [showPassword, setShowPassword] = useState(false);

	const togglePasswordVisibility = () => {
		setShowPassword(prev => !prev);
	};

  return (
		<div className="relative min-h-23 w-full max-w-md flex flex-col gap-1">
    	<label htmlFor={props.id} className="text-sm">{label}</label>
			<div className="relative w-full h-auto rounded-lg">
      	<input type={showPassword ? "text" : "password"} 
      	       name={props.name} 
      	       id={props.id}
							 className={cn(field({ state }), `${showToggle ? "pr-7.5" : ""}`, className)} 
							 ref={ref}
							 aria-invalid={state == "invalid" ? true : false}
							 aria-describedby={`${props.id}-error`} 
							 { ...props } />
				{showToggle && (
      	<button type="button" 
      	        className="absolute top-1/2 -translate-y-1/2 right-2 cursor-pointer"
      	        aria-label="Toggle Password Visibility"
      	        aria-pressed={showPassword}
      	        onClick={togglePasswordVisibility}>
      	  {showPassword ? (<Eye className="w-4 h-4" />) : (<EyeOff color="gray" className="w-4 h-4" />)}
      	</button>)}
			</div>
			{error && (
			<span id={`${props.id}-error`} 
						className="text-xs ml-auto text-red-500">
				{error}
			</span>
			)}
		</div>
  )
};

export default PasswordField