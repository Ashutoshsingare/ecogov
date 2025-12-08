"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Chrome } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/firebase";
import { initiateEmailSignIn } from "@/firebase/non-blocking-login";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(1, { message: "Password is required." }),
});

export default function LoginForm() {
    const auth = useAuth();
    const { toast } = useToast();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        // We are not awaiting the result here.
        // The onAuthStateChanged listener in FirebaseProvider will handle the redirect.
        initiateEmailSignIn(auth, values.email, values.password);
        
        // Optimistically show success and navigate. Error handling will be managed globally
        // or through the onAuthStateChanged listener's error state.
        toast({
            title: "Logging in...",
            description: "You will be redirected shortly.",
        });

        // It's often better to let the auth state listener handle the redirect.
        // But for a simpler UX, we can optimistically navigate.
        // A more robust solution might wait for the user object to be available in a global state.
        setTimeout(() => router.push('/dashboard'), 1500); 

        // No need to setIsLoading(false) here if we redirect away,
        // but it's good practice if there's a chance of staying on the page.
    }

    async function onGoogleLogin() {
        setIsGoogleLoading(true);
        try {
            await signInWithPopup(auth, new GoogleAuthProvider());
            // onAuthStateChanged will trigger, and the provider will update the user state.
            // Redirection can be handled in a component that observes the user state.
            toast({
                title: "Logged in with Google!",
                description: "Welcome back.",
            });
            router.push('/dashboard');
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: error.message,
            });
        } finally {
            setIsGoogleLoading(false);
        }
    }

  return (
    <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
             <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="email">Email</Label>
                  <FormControl>
                    <Input id="email" type="email" placeholder="m@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="password">Password</Label>
                  <FormControl>
                    <Input id="password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-end">
                <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                    Forgot password?
                </Link>
            </div>
            <div className="pt-4 flex flex-col gap-4">
                 <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Login
                </Button>
                <div className="relative w-full">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-4 w-full">
                    <Button variant="outline" onClick={onGoogleLogin} disabled={isGoogleLoading}>
                        {isGoogleLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Chrome className="mr-2 h-4 w-4" />}
                        Google
                    </Button>
                </div>
                <p className="text-center text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="font-medium text-primary hover:underline">
                    Sign up
                </Link>
                </p>
            </div>
        </form>
    </FormProvider>
  );
}
