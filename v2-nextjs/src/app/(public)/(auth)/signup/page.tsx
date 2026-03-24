"use client"

import Link from "next/link";
import { useState, FocusEvent, ChangeEvent } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, SignUpSchemaTypes } from "@/schema/auth.validation";

import InputField from "@/components/ui/InputField";
import PasswordField from "@/components/ui/PasswordField";
import Button from "@/components/ui/Button";
import FooterBranding from "@/components/ui/FooterBranding";

type FieldStates = "idle" | "valid" | "invalid";
type FieldStateObject = Record<keyof SignUpSchemaTypes, FieldStates>;

const SignUpPage = () => {
	const { 
		register, 
		handleSubmit,
		clearErrors,
		trigger,
		formState: { 
			errors, 
			isSubmitting,
		} 
	} = useForm<SignUpSchemaTypes>({
		resolver: zodResolver(signUpSchema),
		mode: "onSubmit",
		reValidateMode: "onSubmit",
	});

	const [fieldStates, setFieldStates] = useState<FieldStateObject>({
		user_name: "idle",
		user_email: "idle",
		user_password: "idle",
		user_confirm_password: "idle",
	});

	const onSubmit: SubmitHandler<SignUpSchemaTypes> = (formData: SignUpSchemaTypes) => {
		console.log(formData); // To test correct form data
	};

	const onErrors = (currentErrors: typeof errors) => {
		setFieldStates(prev => {
			const updated = prev;
			(Object.keys(updated) as Array<keyof SignUpSchemaTypes>).forEach(key => {
				if (currentErrors[key]) updated[key] = "invalid";
			});
			return updated;
		});
	};

	const handleBlurValidation = async (e: FocusEvent<HTMLInputElement>) => {
		const key = e.target.name as keyof SignUpSchemaTypes;
		if (!e.target.value) return;

		const isValid = await trigger(key);
		setFieldStates(prev => ({ ...prev, [key]: isValid ? "valid" : "invalid" }));
	};
	
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const key = e.target.name as keyof SignUpSchemaTypes;

		if (errors[key]) clearErrors(key);
		if (fieldStates[key] !== "idle") setFieldStates(prev => ({ ...prev, [key]: "idle" }));
	};

  return (
		<main className="h-screen w-full grid grid-rows-[1fr_auto] grid-cols-1 justify-items-center">
      <form action="" 
						className="w-full h-auto max-w-lg p-4 py-6 flex flex-col items-center justify-center"
						onSubmit={handleSubmit(onSubmit, onErrors)}
						noValidate>
      	<header className="text-center flex flex-col gap-2 mb-8">
					<div className="h-full px-2.5 flex items-center justify-center gap-2.5 rounded-lg [grid-area:logo]">
						<span className="text-xl font-extrabold font-grotesk uppercase flex items-baseline-last justify-center gap-0.5">
							NoteFlow
							<span className="w-2 h-2 rounded-full bg-primary"></span>
						</span>
					</div>
          <h1 className="text-3xl font-medium">Create an Account</h1>
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
											type="text"
                      label='Username'
                      placeholder='e.g HitIer'
                      state={fieldStates.user_name}
											error={errors.user_name?.message}
                      autoComplete='name'
                      { ...register("user_name", {
												onBlur: handleBlurValidation,
												onChange: handleChange
											}) } />

          <InputField id='user-email'
											type="email"
                      label='Email'
                      placeholder='e.g hitier1437@xyz.com'
                      state={fieldStates.user_email}
											error={errors.user_email?.message}
                      autoComplete='email'
                      { ...register("user_email", {
												onBlur: handleBlurValidation,
												onChange: handleChange
											}) } />
					
					<PasswordField id="new-password"
												 showToggle={true}
												 state={fieldStates.user_password}
												 error={errors.user_password?.message}
												 placeholder="e.g 1437-xYz-PloL"
												 autoComplete="new-password" 
												 { ...register("user_password", {
													onBlur: handleBlurValidation,
													onChange: handleChange
												 }) } />

					<PasswordField id="new-confirm-password"
												 label="Confirm Password"
												 showToggle={false}
												 state={fieldStates.user_confirm_password}
												 error={errors.user_confirm_password?.message}
												 placeholder="re-enter password"
												 autoComplete="new-password" 
												 { ...register("user_confirm_password", {
													onBlur: handleBlurValidation,
													onChange: handleChange
												 }) } />
        </fieldset>

        <Button type='submit'  
                className='w-full py-2.5 max-w-md rounded-lg shadow-xl mt-2'
								intent="primary"
								size="md"
								disabled={isSubmitting}>
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