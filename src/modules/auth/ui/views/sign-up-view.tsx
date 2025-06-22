"use client";

import Image from "next/image";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { OctagonAlertIcon } from "lucide-react";
import Link from "next/link";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const formSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string().min(8, "Confirm Password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const SignUpView = () => {
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState<boolean>(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setError(null);
    setPending(true);
    await authClient.signUp.email(
      {
        name: data.name,
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: () => {
          // Redirect to home page after successful sign up
          router.push("/");
        },

        onError: ({ error }) => {
          setError(error.message);
        },
      }
    );
    setPending(false);
  };

  const onSocial = async (provider: "github" | "google") => {
    setError(null);
    setPending(true);
    await authClient.signIn.social(
      {
        provider: provider,
        callbackURL: "/",
      },
      {
        onSuccess: () => {
          setPending(false);
        },

        onError: ({ error }) => {
          setError(error.message);
          setPending(false);
        },
      }
    );
    setPending(false);
  };

  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Let&#39;s get started</h1>
                  <p className="text-muted-foreground text-balance">
                    Create your account
                  </p>
                </div>
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Enter your name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="m@example.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Enter your password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Enter your password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {!!error && (
                  <Alert className="bg-destructive/10 border-none">
                    <OctagonAlertIcon className="h-4 w-4 !text-destructive" />
                    <AlertTitle className="text-destructive">
                      {error}
                    </AlertTitle>
                  </Alert>
                )}{" "}
                <Button type="submit" className="w-full" disabled={pending}>
                  Sign Up
                </Button>
                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:z-0 after:top-1/2 after:flex after:items-center after:border-t">
                  <span className="bg-card text-muted-foreground relative z-10 px-2">
                    or continue with
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    type="button"
                    className="w-full justify-center"
                    disabled={pending}
                    onClick={() => onSocial("google")}
                  >
                    <Image
                      src="/google.svg"
                      alt="Google logo"
                      width={20}
                      height={20}
                      className="mr-2"
                    />
                    Google
                  </Button>
                  <Button
                    variant="outline"
                    type="button"
                    className="w-full justify-center"
                    disabled={pending}
                    onClick={() => onSocial("github")}
                  >
                    <Image
                      src="/github.svg"
                      alt="GitHub logo"
                      width={20}
                      height={20}
                      className="mr-2"
                    />
                    GitHub
                  </Button>
                </div>{" "}
                <div>
                  <p className="text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link
                      href="/sign-in"
                      className="text-primary hover:underline"
                    >
                      Sign In
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </Form>{" "}
          <div className="bg-gradient-to-br from-emerald-600 via-green-700 to-teal-800 relative hidden md:flex flex-col gap-y-4 items-center justify-center overflow-hidden">
            {/* Animated wave patterns */}
            <div className="absolute inset-0">
              <div className="absolute top-0 left-0 w-full h-full opacity-30">
                <div
                  className="absolute top-16 left-8 w-24 h-24 rounded-full border-2 border-white/20 animate-ping"
                  style={{ animationDuration: "4s" }}
                ></div>
                <div
                  className="absolute top-32 right-12 w-16 h-16 rounded-full border border-white/15 animate-ping"
                  style={{ animationDuration: "3s", animationDelay: "1s" }}
                ></div>
                <div
                  className="absolute bottom-24 left-16 w-20 h-20 rounded-full border-2 border-white/25 animate-ping"
                  style={{ animationDuration: "5s", animationDelay: "2s" }}
                ></div>
              </div>
            </div>

            {/* Floating orbs with different movements */}
            <div className="absolute inset-0">
              <div className="absolute top-20 left-1/4 w-3 h-3 bg-white/30 rounded-full animate-float-slow"></div>
              <div
                className="absolute top-1/3 right-1/4 w-2 h-2 bg-white/40 rounded-full animate-float-medium"
                style={{ animationDelay: "1s" }}
              ></div>
              <div
                className="absolute bottom-1/3 left-1/3 w-4 h-4 bg-white/20 rounded-full animate-float-fast"
                style={{ animationDelay: "2s" }}
              ></div>
              <div
                className="absolute bottom-20 right-1/3 w-2.5 h-2.5 bg-white/35 rounded-full animate-float-slow"
                style={{ animationDelay: "0.5s" }}
              ></div>
            </div>

            {/* Morphing background shapes */}
            <div
              className="absolute top-8 right-8 w-12 h-12 bg-white/10 rounded-lg animate-morph"
              style={{ animationDelay: "0s" }}
            ></div>
            <div
              className="absolute bottom-12 left-8 w-8 h-8 bg-white/15 rounded-full animate-morph"
              style={{ animationDelay: "1.5s" }}
            ></div>
            <div
              className="absolute top-1/2 left-8 w-6 h-16 bg-white/8 rounded-full animate-stretch"
              style={{ animationDelay: "2s" }}
            ></div>

            {/* Central glowing effect with breathing animation */}
            <div className="absolute w-40 h-40 bg-gradient-radial from-white/20 to-transparent rounded-full blur-2xl animate-breathe"></div>
            {/* Logo with scale animation */}
            <div className="relative z-10 transform transition-all duration-500 hover:scale-125 hover:-rotate-6 animate-slide-up">
              <Image
                src="/logo.svg"
                alt="logo"
                width={100}
                height={100}
                className="my-8 drop-shadow-2xl animate-pulse"
              />
            </div>

            {/* Text with typewriter effect simulation */}
            <div className="relative z-10 text-center">
              <p className="text-2xl font-semibold text-white transform transition-all duration-700 hover:scale-110 animate-slide-up-delayed">
                Meet Ai
              </p>
              <div className="mt-2 w-0 h-0.5 bg-white/60 mx-auto rounded-full animate-expand-line"></div>
              <p className="text-sm text-white/80 mt-2 animate-fade-in-slow">
                Join the Future
              </p>
            </div>

            {/* Dynamic geometric patterns */}
            <div className="absolute top-16 left-16 w-8 h-8 border-2 border-white/25 transform rotate-45 animate-pulse-scale"></div>
            <div className="absolute bottom-20 right-16 w-6 h-6 border border-white/20 rounded-full animate-orbit"></div>
            <div className="absolute top-2/3 right-8 w-1 h-12 bg-white/30 animate-grow-shrink"></div>
          </div>
        </CardContent>
      </Card>

      <div className="text-muted-foreground *:[a]:hover:text-primary text-balance text-center text-xs  *:[a]:underline *:[a]:underline-offset-4">
        By clicking &quot;Sign Up&quot;, you agree to our{" "}
        <Link href="/">
          <span className="text-primary hover:underline">Terms of Service</span>
        </Link>{" "}
        and{" "}
        <Link href="/">
          <span className="text-primary hover:underline">Privacy Policy</span>
        </Link>
      </div>
    </div>
  );
};

export default SignUpView;
