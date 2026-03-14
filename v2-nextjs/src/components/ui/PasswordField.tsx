"use client"

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { fieldCva } from "@/utils/inputStyles";
import { cn } from "@/utils/cn";

type InputStates = "idle" | "valid" | "invalid"

type PasswordFieldProps = {
	label?: string,
	state?: InputStates,
	error?: string,
	showToggle: boolean,
};

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
      <input type={showPassword ? "text" : "password"} 
             name={props.name} 
             id={props.id}
						 className={cn(fieldCva({ state }), className)} 
						 ref={ref}
						 aria-invalid={state == "invalid" ? true : false}
						 aria-describedby={`${props.id}-error`} 
						 { ...props } />
			{showToggle && (
      <button type="button" 
              className="absolute bottom-9 right-4 md:bottom-9 cursor-pointer"
              aria-label="Toggle Password Visibility"
              aria-pressed={showPassword}
              onClick={togglePasswordVisibility}>
        {showPassword ? (<Eye className="w-4 h-4" />) : (<EyeOff color="gray" className="w-4 h-4" />)}
      </button>)}
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