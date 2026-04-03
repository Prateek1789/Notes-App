"use client"

import Link from "next/link";
import SignUpForm from "@/features/auth/components/signup-form";

const SignUpPage = () => {

  return (
		<main className="md:h-screen w-full items-center justify-center bg-background">
			<section className="w-full h-screen py-0 md:py-16 px-4 flex flex-col items-center justify-center gap-6">
				<SignUpForm />
				<p className="text-sm text-neutral-600">Already have an account?&nbsp;
					<Link href={"/login"}
								className="text-primary font-medium underline underline-offset-2">
						Sign In
					</Link>
		  	</p>
			</section>
    </main>
  )
};

export default SignUpPage