import Link from "next/link";
import SignInForm from "@/features/auth/components/signin-form";

const SignInPage = () => {
  return (
		<main className="h-screen w-full bg-background">
      <section className="relative w-full h-full px-4 flex flex-col items-center justify-center gap-6">
				<SignInForm />
				<p className="text-sm text-neutral-600">Don't have an account?&nbsp;
					<Link href={"/signup"}
								className="text-primary font-medium underline underline-offset-2">
						Sign Up for free
					</Link> 
				</p>
			</section>
    </main>
  )
};

export default SignInPage