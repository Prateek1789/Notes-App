import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import NoteFlowLogo from "@/components/icons/NoteFlowLogo";

const SignUpSuccessCard = () => {
  return (
    <Card className="h-70 w-full max-w-sm">
      <CardHeader className="h-full w-full place-content-center gap-2 text-center">
          <span aria-hidden={true} className="mx-auto mb-4"><NoteFlowLogo /></span>
          <CardTitle className="text-xl font-medium">Thank you for Signing Up!</CardTitle>
          <CardDescription>
            We've sent a verification link to your inbox. Please click the link to activate your NoteFlow account.
          </CardDescription>
        </CardHeader>
    </Card>
  )
};

export default SignUpSuccessCard