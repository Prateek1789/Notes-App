import { forwardRef } from "react"

const InputField = forwardRef(({ label, type = 'text', error, ...props }, ref) => {
    return (
        <label htmlFor={props.id} className="h-24 w-full max-w-md flex flex-col gap-1 text-sm">
            {label}
            <input type={type}
                   ref={ref} 
                   className={`h-10 md:h-12 px-2 rounded-lg border border-input focus:ring-2 focus:ring-blue-600 focus:outline-2 focus:outline-blue-600 ${error ? 'border-red-600 bg-red-300 focus:border-red-600 focus:ring-red-600 focus:outline-red-600' : ''}`}
                   {...props} />
            {error && <span className="text-xs ml-auto text-red-600">{error}</span>}
        </label>
    )
})

export default InputField