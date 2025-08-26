import { useState, useEffect, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"

import useLogin from "../hooks/useLogin"
import Button from "../components/ui/Button"
import InputField from "../components/ui/InputField"
import Password from "../components/ui/PasswordField"

const LoginPage = () => {
    const navigate = useNavigate();
    const username = useRef('');
    const password = useRef('');
    const [subAttempt, setSubAttempt] = useState(false);
    const [uniqueError, commonError, success] = useLogin(username.current, password.current, subAttempt);

    const handleUsername = (e) => {
        username.current = e.target.value;
        if (subAttempt) setSubAttempt(false);
    }

    const handlePassword = (e) => {
        password.current = e.target.value;
        if (subAttempt) setSubAttempt(false);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        setSubAttempt(true);
    }

    useEffect(() => {
        if (success) navigate('/dashboard');
    }, [success, navigate]);

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
                                state={uniqueError.username || commonError ? 'invalid' : 'idle'}
                                error={uniqueError.username}
                                onChange={handleUsername}
                                autoComplete='username'
                                required/>

                    <Password   id='user-password'
                                name='user_password'
                                placeholder='Your password'
                                state={uniqueError.password || commonError ? 'invalid' : 'idle'}
                                error={uniqueError.password || commonError}
                                onChange={handlePassword}
                                autoComplete='current-password'
                                required />            
                </fieldset>

                <Button type='submit' 
                        name='Log In' 
                        width='w-full'
                        onClick={onSubmit}/>

                <p className="text-sm mt-4 text-[var(--color-Gray-400)]">Don't have an account?  
                    <Link to='/register' className="text-blue-500 lg:hover:text-blue-400 font-semibold"> Sign up</Link>
                </p>
            </form>
        </main>
    )
}

export default LoginPage