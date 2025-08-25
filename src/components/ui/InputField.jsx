import { forwardRef } from "react"

const InputField = forwardRef(({ label, type = 'text', state = 'idle', error, ...props }, ref) => {
    const getStyles = () => {
        switch(state) {
            case 'valid': return 'border-green-500 focus:ring-green-500 focus:outline-green-500';
            case 'invalid': return 'border-red-500 focus:ring-red-500 focus:outline-red-500';
            default: return 'border-input focus:ring-blue-600 focus:outline-blue-600';
        }
    };

    return (
        <label htmlFor={props.id} className="min-h-23 w-full max-w-md flex flex-col gap-1 text-sm">
            {label}
            <input type={type}
                   ref={ref} 
                   className={`h-12 md:h-12 px-2 rounded-lg border focus:ring-2 focus:outline-2 ${getStyles()}`}
                   {...props} />
            {error && <span className="text-xs ml-auto text-red-500">{error}</span>}
        </label>
    )
});

InputField.displayName = 'InputField';

export default InputField