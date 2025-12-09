import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useUsernameValidation, useEmailValidation, usePasswordValidation, useConfirmPassword } from "../hooks/useFormAuth"
import { useTheme } from "../context/ThemeProvider"
import { useAuth } from "../context/AuthContext"

import Button from "../components/ui/Button"
import InputField from "../components/ui/InputField"
import Password from "../components/ui/PasswordField"

const SignupPage = () => {
    const { theme } = useTheme();
    const { register } = useAuth();
    const navigate = useNavigate();
    const delay = 1000;
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
    });
    const [authError, setAuthError] = useState('');
    const [submitAttempt, setSubmitAttempt] = useState(false);
    const [usernameState, usernameError] = useUsernameValidation(formData.username, submitAttempt);
    const [emailState, emailError] = useEmailValidation(formData.email, submitAttempt, delay);
    const [passwordState, passwordError] = usePasswordValidation(formData.password, submitAttempt, delay);
    const [confirmPasswordState, confirmPasswordError] = useConfirmPassword(formData.password, formData.confirmPassword, submitAttempt, delay);

    const handleFormData = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({...prev, [name]: value}));
        if (submitAttempt) setSubmitAttempt(false);
        setAuthError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitAttempt(true);

        const check = formData.username && 
                      emailState === 'valid' && 
                      passwordState === 'valid' && 
                      confirmPasswordState === 'valid';

        if (check) {
            try {
                await register(formData);
                navigate("/dashboard");
            } catch (error) {
                setAuthError('User Already exists');
                console.error('Sign up failed: ', error.message);
            };
        }
    };

    return (
        <main className="h-full w-full flex items-center justify-center">
        <form action="" className="w-full h-auto max-w-lg p-4 py-6 rounded-2xl flex flex-col items-center gap-3">
            <header className="text-center flex flex-col gap-2">
                <h1 className="text-3xl font-semibold md:text-4xl">Create an account</h1>
                <p className="mb-2 text-[var(--color-Gray-300)]">Welcome! Please enter your details</p>
            </header>

            <fieldset className="w-full flex flex-col items-center border-none">
                <legend className="sr-only">User Details</legend>

                <InputField id='user-name'
                            name='username'
                            label='Username'
                            placeholder='e.g John Doe'
                            value={formData.username}
                            error={usernameError}
                            state={usernameState}
                            onChange={handleFormData}
                            autoComplete="username"
                            required/>

                <InputField id='user-email'
                            name='email'
                            label='Email'
                            placeholder='e.g johndoe4575@gmail.com'
                            value={formData.email}
                            error={emailError}
                            state={authError ? 'invalid' : emailState}
                            onChange={handleFormData}
                            autoComplete="email"
                            required/>            

                <Password   id='user-password'
                            name='password'
                            placeholder='Your password'
                            value={formData.password}
                            error={passwordError}
                            state={passwordState}
                            onChange={handleFormData}
                            autoComplete='new-password'
                            required /> 

                <Password   id='confirm-passwprd'
                            name='confirmPassword'
                            label='Confirm Password'
                            placeholder='re-enter password'
                            value={formData.confirmPassword}
                            error={confirmPasswordError || authError}
                            state={confirmPasswordState}
                            onChange={handleFormData}
                            autoComplete='new-password'
                            showToggle={false}
                            required />           
            </fieldset>

            <Button type='submit' 
                    name='Create Account' 
                    width='w-full'
                    onClick={handleSubmit}
                    dark={theme === "dark" ? false : true} 
                    disabled={!formData.username || !formData.email || !formData.password || !formData.confirmPassword} />

            <p className="text-sm mt-4 text-[var(--color-Gray-400)]">Already have an account?
                <Link to='/login' className="text-blue-500 lg:hover:text-blue-400 font-semibold"> Log in</Link> 
            </p>
        </form>
        </main>
    )
}

export default SignupPage