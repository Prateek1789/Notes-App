import Link from "next/link";
import InputField from "@/components/ui/InputField";
import PasswordField from "@/components/ui/PasswordField";
import Button from "@/components/ui/Button";
import FooterBranding from "@/components/ui/FooterBranding";

const SignUpPage = () => {
  return (
		<main className="h-screen w-full grid grid-rows-[1fr_auto] grid-cols-1 justify-items-center">
      <form action="" 
						className="w-full h-auto max-w-lg p-4 py-6 flex flex-col items-center justify-center">
      	<header className="text-center flex flex-col gap-2 mb-8">
					<div className="h-full px-2.5 flex items-center justify-center gap-2.5 rounded-lg [grid-area:logo]">
						<span className="text-xl font-extrabold font-grotesk uppercase flex items-baseline-last justify-center gap-0.5">
							NoteFlow
							<span className="w-2 h-2 rounded-full bg-primary"></span>
						</span>
					</div>
          <h1 className="text-3xl font-semibold">Create an Account</h1>
          <p className="text-sm text-neutral-600">Already have an account?&nbsp;
						<Link href={"/login"}
									className="text-primary font-medium underline underline-offset-2">
							Login
						</Link>
					</p>
        </header>

        <fieldset className="w-full flex flex-col items-center border-none">
          <legend className="sr-only">Login Credentials</legend>
          <InputField id='user-name'
                      name='user_name'
											type="text"
                      label='Username'
                      placeholder='e.g John Doe'
                      state="idle"
                      autoComplete='username'
                      required />

          <InputField id='user-email'
                      name='user_email'
											type="email"
                      label='Email'
                      placeholder='e.g johndoe1437@xyz.com'
                      state="idle"
                      autoComplete='email'
                      required />
					
					<PasswordField id="user-password"
												 name="user_password"
												 state="idle"
												 showToggle={true}
												 error={""}
												 placeholder="e.g 1437-xYz-PloL" 
												 autoComplete="new-password" 
												 required />

					<PasswordField id="user-confirm-password"
												 name="user_confirm_password"
												 label="Confirm Password"
												 state="idle"
												 showToggle={false}
												 error={""}
												 placeholder="re-enter password" 
												 autoComplete="new-password" 
												 required />   
        </fieldset>

        <Button type='submit'  
                className='w-full py-2.5 max-w-md rounded-lg shadow-xl mt-2'
								intent="primary"
								size="md">
					Sign Up
				</Button>
      </form>
			<div className="h-auto w-full max-w-7xl px-2 md:px-4">
				<FooterBranding />
			</div>
    </main>
  )
};

export default SignUpPage


/* onChange={(e) => handleInput(e, username)} */
/* onChange={(e) => handleInput(e, username)} */
/* onChange={(e) => handleInput(e, password)}  */
/* onChange={(e) => handleInput(e, password)}  */