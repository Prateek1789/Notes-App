"use client"

import { ChangeEvent } from "react";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginSchemaTypes } from "@/features/auth/auth.schema";

import InputField from "@/components/ui/input-field";
import PasswordField from "@/components/ui/password-field";
import { Button } from "@/components/ui/button";
import FooterBranding from "@/components/ui/footer-branding";

const LoginPage = () => {
	const {
		register,
		handleSubmit,
		clearErrors, 
		setError,
		formState: { 
			errors,
			isSubmitting 
		} 
	} = useForm<LoginSchemaTypes>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			user_email: "",
			user_password: "",
		},
		reValidateMode: "onSubmit",
	});

	/* A basic function which mimics a server response */ 
	const checkData = (data: LoginSchemaTypes): Promise<boolean> => {
		return new Promise((resolve, reject) => {
			const serverData:LoginSchemaTypes = {
				user_email: "rtx5090",
				user_password: "hello-world",
			};

			setTimeout(() => {
				if (serverData.user_email === data.user_email && 
						serverData.user_password === data.user_password) {
					resolve(true);
				}
				else {
					reject(false);
				}
			}, 800);
		})
	};

	/* A test function to test the functionality of the form and its validations */
	const onSubmit: SubmitHandler<LoginSchemaTypes> = async (formData) => {
		try {
			const response = await checkData(formData);
			if (response) console.log(formData)
			else throw new Error("Invalid email or password");
		}
		catch (err: unknown) {
			if (err instanceof Error) {
				setError("user_password", {
					type: "custom",
					message: err.message
				});
			}
			else {
				setError("user_password", {
					type: "custom",
					message: "Invalid email or password",
				})
			}
		};
	};

	/* Function to clear errors for specific field as the user types again */
	const handleErrors = (e: ChangeEvent<HTMLInputElement>) => {
		const key = e.target.name as keyof LoginSchemaTypes;
		if (errors[key]) {
			clearErrors(key);
			return;
		}
	};

  return (
		<main className="h-screen w-full grid grid-rows-[1fr_auto] grid-cols-1 justify-items-center">
      <form action="" 
						className="w-full h-auto max-w-lg p-4 py-6 flex flex-col items-center justify-center"
						onSubmit={handleSubmit(onSubmit)}
						noValidate>
      	<header className="text-center flex flex-col gap-2 mb-8">
					<div className="h-full px-2.5 flex items-center justify-center gap-2.5 rounded-lg [grid-area:logo]">
						<span className="text-xl font-extrabold font-grotesk uppercase flex items-baseline-last justify-center gap-0.5">
							NoteFlow
							<span className="w-2 h-2 rounded-full bg-primary"></span>
						</span>
					</div>
          <h1 className="text-3xl font-semibold">Welcome Back</h1>
          <p className="text-sm text-neutral-600">Don't have an account?&nbsp;
						<Link href={"/signup"}
									className="text-primary font-medium underline underline-offset-2">
							Sign Up for free
						</Link> 
					</p>
        </header>

        <fieldset className="w-full flex flex-col items-center border-none">
          <legend className="sr-only">Login Credentials</legend>
          <InputField id='user-email'
											type="email"
                      label='Email'
                      placeholder='e.g johndoe1437@xyz.com'
											error={errors.user_email?.message}
                      autoComplete='current-email'
                      { ...register("user_email", {
												onChange: handleErrors,
											}) } />
					
					<PasswordField id="user-password"
												 placeholder="e.g 1437-xYz-PloL" 
												 showToggle={true}
												 error={errors.user_password?.message}
												 autoComplete="current-password" 
												 { ...register("user_password", {
													onChange: handleErrors,
												 }) } />      
        </fieldset>

        <Button type='submit'  
                className='w-full py-2.5 max-w-md rounded-lg shadow-xl mt-2'
								variant="default"
								size="lg"
								disabled={isSubmitting}>
					Login
				</Button>
      </form>
			<div className="h-auto w-full max-w-7xl px-2 md:px-4">
				<FooterBranding />
			</div>
    </main>
  )
};

export default LoginPage