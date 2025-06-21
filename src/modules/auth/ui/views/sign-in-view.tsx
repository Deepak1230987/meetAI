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
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

const SignInView = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setError(null);
    setPending(true);
    await authClient.signIn.email(
      {
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: () => {
          router.push("/");
        },

        onError: ({ error }) => {
          setError(error.message);
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
                  <h1 className="text-2xl font-bold">Welcome Back</h1>
                  <p className="text-muted-foreground text-balance">
                    Login to your account
                  </p>
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
                  {!!error && (
                    <Alert className="bg-destructive/10 border-none">
                      <OctagonAlertIcon className="h-4 w-4 !text-destructive" />
                      <AlertTitle className="text-destructive">
                        {error}
                      </AlertTitle>
                    </Alert>
                  )}
                  <Button type="submit" className="w-full" disabled={pending}>
                    Sign In
                  </Button>

                  <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:z-0 after:top-1/2 after:flex after:items-center after:border-t">
                    <span className="bg-card text-muted-foreground relative z-10 px-2">
                      or continue with
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      variant="outline"
                      className="w-full justify-center"
                      disabled={pending}
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
                      className="w-full justify-center"
                      disabled={pending}
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
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Don&#39;t have an account?{" "}
                      <Link
                        href="/sign-up"
                        className="text-primary hover:underline"
                      >
                        Sign Up
                      </Link>
                    </p>
                  </div>
                
              </div>
            </form>
          </Form>{" "}
          <div className="bg-radial from-green-700 to-green-900 relative hidden md:flex flex-col gap-y-4 items-center justify-center overflow-hidden">
            {/* Animated background particles */}
            <div className="absolute inset-0">
              <div className="absolute top-10 left-10 w-2 h-2 bg-white/20 rounded-full animate-pulse"></div>
              <div
                className="absolute top-20 right-16 w-1 h-1 bg-white/30 rounded-full animate-ping"
                style={{ animationDelay: "1s" }}
              ></div>
              <div
                className="absolute bottom-20 left-20 w-1.5 h-1.5 bg-white/25 rounded-full animate-pulse"
                style={{ animationDelay: "2s" }}
              ></div>
              <div
                className="absolute bottom-32 right-12 w-1 h-1 bg-white/20 rounded-full animate-ping"
                style={{ animationDelay: "0.5s" }}
              ></div>
              <div
                className="absolute top-1/3 left-1/4 w-1 h-1 bg-white/15 rounded-full animate-pulse"
                style={{ animationDelay: "1.5s" }}
              ></div>
              <div
                className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-white/25 rounded-full animate-ping"
                style={{ animationDelay: "3s" }}
              ></div>
            </div>

            {/* Animated circular glow behind logo */}
            <div className="absolute w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>

            {/* Logo with hover animation */}
            <div className="relative z-10 transform transition-all duration-300 hover:scale-110 hover:rotate-3">
              <Image
                src="/logo.svg"
                alt="logo"
                width={100}
                height={100}
                className="my-8 drop-shadow-2xl animate-bounce"
                style={{ animationDuration: "3s" }}
              />
            </div>

            {/* Text with slide-in animation */}
            <div className="relative z-10 text-center">
              <p className="text-2xl font-semibold text-white transform transition-all duration-500 hover:scale-105 animate-fade-in">
                Meet Ai
              </p>
              <div className="mt-2 w-16 h-0.5 bg-white/50 mx-auto rounded-full animate-pulse"></div>
            </div>

            {/* Floating geometric shapes */}
            <div
              className="absolute top-12 right-8 w-6 h-6 border border-white/20 rotate-45 animate-spin"
              style={{ animationDuration: "20s" }}
            ></div>
            <div
              className="absolute bottom-16 left-12 w-4 h-4 border border-white/15 rotate-12 animate-spin"
              style={{
                animationDuration: "15s",
                animationDirection: "reverse",
              }}
            ></div>
          </div>
        </CardContent>
      </Card>

      <div className="text-muted-foreground *:[a]:hover:text-primary text-balance text-center text-xs  *:[a]:underline *:[a]:underline-offset-4">
        By clicking &quot;Sign In&quot;, you agree to our{" "}
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

export default SignInView;
