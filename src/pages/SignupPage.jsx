import { useState, useRef } from "react"
import { useEmailValidation, usePasswordValidation, useConfirmPassword } from "../hooks/useFormAuth"

import Button from "../components/ui/Button"
import InputField from "../components/ui/InputField"
import Password from "../components/ui/PasswordField"

const SignupPage = () => {
    const delay = 1200;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [submitAttempt, setSubmitAttempt] = useState(false);
    const [emailState, emailError] = useEmailValidation(email, submitAttempt, delay);
    const [passwordState, passwordError] = usePasswordValidation(password, submitAttempt, delay);
    const [confirmPasswordState, confirmPasswordError] = useConfirmPassword(password, confirmPassword, submitAttempt, delay);

    const userNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    const handleEmail = (e) => {
        setEmail(e.target.value);
        if (submitAttempt) setSubmitAttempt(false);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
        if (submitAttempt) setSubmitAttempt(false);
    };

    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
        if (submitAttempt) setSubmitAttempt(false);
    };   

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitAttempt(true);
    };

    return (
        <form action="" className="w-full h-full max-w-lg p-4 py-6 rounded-2xl flex flex-col items-center gap-3">
            <header className="text-center flex flex-col gap-2">
                <h1 className="text-3xl font-semibold md:text-4xl">Create an account</h1>
                <p className="mb-2 text-[var(--color-Gray-300)]">Welcome! Please enter your details</p>
            </header>

            <fieldset className="w-full flex flex-col items-center border-none">
                <legend className="sr-only">User Details</legend>

                <InputField id='user-name'
                            name='user_name'
                            label='Username'
                            placeholder='e.g John Doe'
                            ref={userNameRef}
                            autoComplete="username"
                            required/>

                <InputField id='user-email'
                            name='user_email'
                            label='Email'
                            placeholder='e.g johndoe4575@gmail.com'
                            error={emailError}
                            state={emailState}
                            ref={emailRef}
                            onChange={handleEmail}
                            autoComplete="email"
                            required/>            

                <Password   id='user-password'
                            name='user_password'
                            placeholder='Your password'
                            error={passwordError}
                            state={passwordState}
                            ref={passwordRef}
                            onChange={handlePassword}
                            autoComplete='new-password'
                            required /> 

                <Password   id='confirm-passwprd'
                            name='confirm_password'
                            label='Confirm Password'
                            placeholder='re-enter password'
                            error={confirmPasswordError}
                            state={confirmPasswordState}
                            ref={confirmPasswordRef}
                            onChange={handleConfirmPassword}
                            autoComplete='current-password'
                            showToggle={false}
                            required />           
            </fieldset>

            <Button type='submit' 
                    name='Create Account' 
                    width='w-full'
                    onClick={handleSubmit}/>

            <p className="text-sm mt-4 text-[var(--color-Gray-400)]">Already have an account? 
                <a href="http://" className="text-blue-500 lg:hover:text-blue-400 font-semibold"> Log in</a>
            </p>
        </form>
    )
}

export default SignupPage