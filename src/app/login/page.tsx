import { AnimatedWrapper } from "@/components/shared/AnimatedWrapper";
import Logo from "@/components/shared/Logo";
import LoginForm from "@/components/auth/LoginForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";


export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
       <AnimatedWrapper className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center">
            <div className="mb-4 flex justify-center">
              <Logo />
            </div>
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <CardDescription>Enter your credentials to access your account.</CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
      </AnimatedWrapper>
    </div>
  );
}
