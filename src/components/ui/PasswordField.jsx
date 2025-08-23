import { useState, forwardRef } from "react"
import {Eye, EyeOff } from 'lucide-react'

const PasswordInput = forwardRef(({ label = 'Password', state, error, showToggle = true, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const getStyles = () => {
        switch(state) {
            case 'valid': return 'border-green-500 focus:ring-green-500 focus:outline-green-500'
            case 'invalid': return 'border-red-500 focus:ring-red-500 focus:outline-red-500';
            default: return 'border-input focus:ring-blue-600 focus:outline-blue-600';
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <label htmlFor={props.id} className="h-23 w-full max-w-md flex flex-col gap-1 text-sm relative">
            {label}
            <input type={showPassword ? "text" : "password"}
                   ref={ref} 
                   className={`h-10 md:h-12 px-2 rounded-lg border focus:ring-2 focus:outline-2 ${getStyles()}`}
                   {...props} />
            {showToggle && (
            <button type="button" 
                    className="absolute bottom-10 right-4 md:bottom-9 cursor-pointer"
                    aria-label="Toggle Password Visibility"
                    aria-pressed={showPassword}
                    onClick={togglePasswordVisibility}>
                {showPassword ? (<Eye className="w-4 h-4" />) : (<EyeOff color="gray" className="w-4 h-4" />)}
            </button>
            )}
            {error && <span className="text-xs ml-auto text-red-500">{error}</span>}
        </label>
    )
});

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput