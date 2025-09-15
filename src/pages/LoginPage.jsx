import { useState, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { THEME_STATE, useTheme } from "../context/ThemeProvider"
import { useAuth } from "../context/AuthContext"

import Button from "../components/ui/Button"
import InputField from "../components/ui/InputField"
import Password from "../components/ui/PasswordField"

const LoginPage = () => {
    const username = useRef('');
    const password = useRef('');
    const { login } = useAuth();
    const { theme } = useTheme();
    const navigate = useNavigate();
    const [authError, setAuthError] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);

    const handleInput = (e, field) => {
        field.current = e.target.value;
        setAuthError('');
        setIsDisabled(!username.current || !password.current);
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            await login(username.current, password.current);
            navigate('/dashboard', { replace: true });
        } catch (error) {
            setAuthError('Invalid Credentials');
            console.error('Login failed: ', error.message);
        };
    };

    return (
        <main className="h-full w-full flex items-center justify-center">
            <form action="" className="w-full h-auto max-w-lg p-4 py-6 flex flex-col items-center gap-3">
                <header className="text-center flex flex-col gap-2">
                    <h1 className="text-3xl font-semibold md:text-4xl">Log in to your Account</h1>
                    <p className="mb-2 text-[var(--color-Gray-300)]">Welcome Back! Please enter your log in credentials</p>
                </header>

                <fieldset className="w-full flex flex-col items-center border-none">
                    <legend className="sr-only">Login Credentials</legend>

                    <InputField id='user-name'
                                name='user_name'
                                label='Username'
                                placeholder='e.g John Doe'
                                state={authError ? 'invalid' : 'idle'}
                                onChange={(e) => handleInput(e, username)}
                                autoComplete='username'
                                required/>

                    <Password   id='user-password'
                                name='user_password'
                                placeholder='Your password'
                                state={authError ? 'invalid' : 'idle'}
                                error={authError}
                                onChange={(e) => handleInput(e, password)}
                                autoComplete='current-password'
                                required />            
                </fieldset>

                <Button type='submit' 
                        name='Log In' 
                        width='w-full'
                        onClick={onSubmit}
                        dark={theme === THEME_STATE.DARK ? false : true} 
                        disabled={isDisabled} />

                <p className="text-sm mt-4 text-[var(--color-Gray-400)]">Don't have an account?  
                    <Link to='/register' className="text-blue-500 lg:hover:text-blue-400 font-semibold"> Sign up</Link>
                </p>
            </form>
        </main>
    )
}

export default LoginPage