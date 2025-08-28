import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { 
    useUsernameValidation, 
    useEmailValidation, 
    usePasswordValidation, 
    useConfirmPassword 
} from "../hooks/useFormAuth"
import Button from "../components/ui/Button"
import InputField from "../components/ui/InputField"
import Password from "../components/ui/PasswordField"
import CreateUser from "../utils/CreateUser"

const SignupPage = () => {
    const navigate = useNavigate();
    const delay = 1200;

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [submitAttempt, setSubmitAttempt] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    
    const [usernameState, usernameError] = useUsernameValidation(formData.username, submitAttempt);
    const [emailState, emailError] = useEmailValidation(formData.email, submitAttempt, delay);
    const [passwordState, passwordError] = usePasswordValidation(formData.password, submitAttempt, delay);
    const [confirmPasswordState, confirmPasswordError] = useConfirmPassword(formData.password, formData.confirmPassword, submitAttempt, delay);


    const handleFormData = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({...prev, [name]: value}));
        if (submitAttempt) setSubmitAttempt(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitAttempt(true);

        const check = formData.username && 
                      emailState === 'valid' && 
                      passwordState === 'valid' && 
                      confirmPasswordState === 'valid';

        if (check) {
            setIsLoading(true);
            try {
                const result = await CreateUser(formData.username, formData.email, formData.password);
                console.log(result.message);
                navigate('/dashboard');
            }
            catch (error) {
                console.log('Sign up failed: ', error.message);
            }
            finally {
                setIsLoading(false);
            }
        };
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
                            disabled={isLoading}
                            required/>

                <InputField id='user-email'
                            name='email'
                            label='Email'
                            placeholder='e.g johndoe4575@gmail.com'
                            value={formData.email}
                            error={emailError}
                            state={emailState}
                            onChange={handleFormData}
                            autoComplete="email"
                            disabled={isLoading}
                            required/>            

                <Password   id='user-password'
                            name='password'
                            placeholder='Your password'
                            value={formData.password}
                            error={passwordError}
                            state={passwordState}
                            onChange={handleFormData}
                            autoComplete='new-password'
                            disabled={isLoading}
                            required /> 

                <Password   id='confirm-passwprd'
                            name='confirmPassword'
                            label='Confirm Password'
                            placeholder='re-enter password'
                            value={formData.confirmPassword}
                            error={confirmPasswordError}
                            state={confirmPasswordState}
                            onChange={handleFormData}
                            autoComplete='new-password'
                            showToggle={false}
                            disabled={isLoading}
                            required />           
            </fieldset>

            <Button type='submit' 
                    name='Create Account' 
                    width='w-full'
                    onClick={handleSubmit}/>

            <p className="text-sm mt-4 text-[var(--color-Gray-400)]">Already have an account?
                <Link to='/login' className="text-blue-500 lg:hover:text-blue-400 font-semibold"> Log in</Link> 
            </p>
        </form>
        </main>
    )
}

export default SignupPage