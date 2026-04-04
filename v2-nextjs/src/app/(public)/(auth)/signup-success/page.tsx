import { redirect } from "next/navigation";
import SignUpSuccessCard from "@/features/auth/components/signup-success";

const SignUpSuccessPage = async ({ 
  searchParams 
}: { 
  searchParams: Promise<{ verified?: string }> 
}) => {
  const { verified } = await searchParams;

  if (verified !== "true") {
    redirect("/signup");
  };

  return (
    <main className="w-full h-screen bg-background">
      <section className="w-full h-full flex items-center justify-center">
        <SignUpSuccessCard />
      </section>
    </main>
  )
};

export default SignUpSuccessPage