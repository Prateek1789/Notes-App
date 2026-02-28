import { useState, forwardRef } from "react"
import { useEmailValidation } from "../../hooks/useFormAuth";

const EmailInput = forwardRef(({ label, validate = true, submit, setSubmit, ...props }, ref) => {
    const [email, setEmail] = useState('');
    const [emailState, emailError] = useEmailValidation(email, submit);

    const handleEmail = (e) => {
        if (validate) {
            setEmail(e.target.value);
            if (submit) setSubmit(false);
        }
    };

    const getStyles = () => {
        switch(emailState) {
            case 'valid': return 'border-green-500 focus:ring-green-500 focus:outline-green-500';
            case 'invalid': return 'border-red-500 focus:ring-red-500 focus:outline-red-500';
            default: return 'border-input focus:ring-blue-600 focus:outline-blue-600';
        }
    };

    return (
        <label htmlFor={props.id} className="min-h-23 w-full max-w-md flex flex-col gap-1 text-sm">
            {label}
            <input type='email'
                   ref={ref} 
                   className={`h-12 md:h-12 px-2 rounded-lg border focus:ring-2 focus:outline-2 ${getStyles()}`}
                   onChange={handleEmail}
                   {...props} />
            {emailError && <span className="text-xs ml-auto text-red-500">{emailError}</span>}
        </label>
    )
});

EmailInput.displayName = 'EmailInput';

export default EmailInput