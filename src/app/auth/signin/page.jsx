"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Input, Button, Card, CardHeader } from "@heroui/react";
// Gravity UI Icons
import { Eye, EyeSlash } from "@gravity-ui/icons";
// Auth client instance 
import { signIn } from "@/lib/auth-client"; 
import { FcGoogle } from "react-icons/fc";
import { useRouter, useSearchParams } from "next/navigation";

export default function SignInPage() {
  // Form States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter()

  const searchParams = useSearchParams()
  const redirectTo = searchParams.get("redirect") || "/"

  // Visibility States for Password
  const [showPassword, setShowPassword] = useState(false);

  // Feedback States
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  // Email/Password Sign In Handler
  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    const { data, error: authError } = await signIn.email({
      email,
      password,
      // callbackURL: "/", // Where to redirect your users upon successful entry
    });

    setIsLoading(false);
    router.push(redirectTo)

    if (authError) {
      setError(authError.message || "Invalid email or password.");
    } else {
      setSuccess("Welcome back! Redirecting...");
      setEmail("");
      setPassword("");
          router.push(redirectTo)
    }
  };

  // Google Sign In Handler
  const handleGoogleSignIn = async () => {
    setError("");
    try {
      await signIn.social({
        provider: "google",
        // callbackURL: "/dashboard",
      });
          router.push(redirectTo)
    } catch (err) {
      setError("Failed to initialize Google sign-in.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 dark:bg-zinc-900">
      <Card className="w-full max-w-md p-6 shadow-xl border">
        <CardHeader className="flex flex-col items-center gap-1 pb-6">
          <h1 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100">
            Welcome Back
          </h1>
          <p className="text-small text-default-500">
            Sign in to manage your account
          </p>
        </CardHeader>

        <div className="flex flex-col gap-4">
          {/* Error Message Feedback */}
          {error && (
            <div className="rounded-lg bg-danger-50 p-3 text-small text-danger border border-danger-200">
              {error}
            </div>
          )}

          {/* Success Message Feedback */}
          {success && (
            <div className="rounded-lg bg-success-50 p-3 text-small text-success border border-success-200">
              {success}
            </div>
          )}

          <form onSubmit={handleSignIn} className="flex flex-col gap-4">
            <Input
              type="email"
              label="Email Address"
              variant="bordered"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />

            {/* Password input with toggle icon inside a relative container */}
            <div className="relative flex items-center">
              <Input
                type={showPassword ? "text" : "password"}
                label="Password"
                variant="bordered"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full"
              />
              <button
                className="absolute right-3 z-10 focus:outline-none text-default-400 hover:text-default-600 top-[55%] -translate-y-1/2"
                type="button"
                onClick={togglePasswordVisibility}
                aria-label="toggle password visibility"
              >
                {showPassword ? <EyeSlash className="text-xl" /> : <Eye className="text-xl" />}
              </button>
            </div>

            <Button
              type="submit"
              color="primary"
              className="w-full font-semibold mt-2"
              isLoading={isLoading}
            >
              Sign In
            </Button>
          </form>

          <div className="flex items-center my-2">
            <div className="flex-1 border-t border-default-200" />
            <span className="px-3 text-tiny text-default-400 uppercase">Or</span>
            <div className="flex-1 border-t border-default-200" />
          </div>

          {/* Google Sign In Button */}
          <Button
            variant="bordered"
            className="w-full font-medium"
            startContent={<FcGoogle className="text-lg" />}
            onClick={handleGoogleSignIn}
          >
            Sign in with Google
          </Button>

          {/* Toggle Back to Sign Up */}
          <p className="text-center text-small text-default-500 mt-2">
            Don't have an account yet?{" "}
            <Link href={`/auth/signup?redirect=${redirectTo}`} className="text-primary hover:underline font-medium">
              Sign Up
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
}