import { useRef } from "react"
import Button from "../components/ui/Button"
import InputField from "../components/ui/InputField"
import Password from "../components/ui/PasswordField"

const LoginPage = () => {
    const userNameRef = useRef();
    const passwordRef = useRef();

    return (
        <form action="" className="w-full h-full max-w-lg p-4 py-6 flex flex-col items-center gap-3">
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
                            ref={userNameRef}
                            autoComplete='username'
                            required/>

                <Password   id='user-password'
                            name='user_password'
                            placeholder='Your password'
                            ref={passwordRef}
                            autoComplete='current-password'
                            required />            
            </fieldset>

            <Button type='submit' 
                    name='Log In' 
                    width='w-full'/>

            <p className="text-sm mt-4 text-[var(--color-Gray-400)]">Don't have an account? 
                <a href="http://" className="text-blue-500 lg:hover:text-blue-400 font-semibold"> Sign up</a>
            </p>
        </form>
    )
}

export default LoginPage