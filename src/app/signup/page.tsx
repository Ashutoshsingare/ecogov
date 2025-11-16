import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Chrome } from 'lucide-react';
import { AnimatedWrapper } from "@/components/shared/AnimatedWrapper";
import Logo from "@/components/shared/Logo";
import SignupForm from "@/components/auth/SignupForm";

export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <AnimatedWrapper className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center">
            <div className="mb-4 flex justify-center">
              <Logo />
            </div>
            <CardTitle className="text-2xl">Create an Account</CardTitle>
            <CardDescription>Join EcoGov and start making a difference today.</CardDescription>
          </CardHeader>
          <CardContent>
            <SignupForm />
          </CardContent>
        </Card>
      </AnimatedWrapper>
    </div>
  );
}
