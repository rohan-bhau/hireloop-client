"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Input, Button, Card, CardHeader } from "@heroui/react";
// Gravity UI Icons
import { Eye, EyeSlash } from "@gravity-ui/icons";
// Assuming your better-auth client instance is exported from this path
import {  signIn, signUp } from "@/lib/auth-client"; 
import { FcGoogle } from "react-icons/fc";
import {Description, Label, Radio, RadioGroup} from "@heroui/react";
import { useRouter, useSearchParams } from "next/navigation";


export default function SignUpPage() {
  // Form States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("seeker")

  // Visibility States for Passwords
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Feedback States
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
    const searchParams = useSearchParams()
  const redirectTo = searchParams.get("redirect") || "/"
  const router = useRouter()

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  // Email/Password Sign Up Handler
  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);

    const { data, error: authError } = await signUp.email({
      email,
      password,
      name,
      role,
    });

    setIsLoading(false);

    if (authError) {
      setError(authError.message || "An error occurred during sign up.");
    } else {
      setSuccess("Account created successfully! Redirecting...");
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      router.push(redirectTo)
    }
  };

  // Google Sign In Handler
  const handleGoogleSignIn = async () => {
    setError("");
    try {
      await signIn.social({
        provider: "google",
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
            Create an Account
          </h1>
          <p className="text-small text-default-500">
            Enter your details to get started
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

          <form onSubmit={handleSignUp} className="flex flex-col gap-4">
            <Input
              type="text"
              label="Full Name"
              variant="bordered"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
            />

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

            {/* Confirm Password input with toggle icon */}
            <div className="relative flex items-center">
              <Input
                type={showConfirmPassword ? "text" : "password"}
                label="Confirm Password"
                variant="bordered"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full"
              />
              <button
                className="absolute right-3 z-10 focus:outline-none text-default-400 hover:text-default-600 top-[55%] -translate-y-1/2"
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                aria-label="toggle confirm password visibility"
              >
                {showConfirmPassword ? <EyeSlash className="text-xl" /> : <Eye className="text-xl" />}
              </button>
            </div>

             <div className="flex flex-col gap-4">
      <Label>Select Your Role</Label>
      <RadioGroup defaultValue="seeker" name="role" orientation="horizontal" onChange={(value)=>setRole(value)} >
        <Radio  value="seeker">
          <Radio.Control>
            <Radio.Indicator />
          </Radio.Control>
          <Radio.Content>
            <Label>Job Seeker</Label>
          </Radio.Content>
        </Radio>
        <Radio value="recruiter">
          <Radio.Control>
            <Radio.Indicator />
          </Radio.Control>
          <Radio.Content>
            <Label>Recruiter</Label>
          </Radio.Content>
        </Radio>
      </RadioGroup>
    </div>

            <Button
              type="submit"
              color="primary"
              className="w-full font-semibold mt-2"
              isLoading={isLoading}
            >
              Sign Up
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
            Sign up with Google
          </Button>

          {/* Toggle Back to Sign In */}
          <p className="text-center text-small text-default-500 mt-2">
            Already have an account?{" "}
            <Link href={`/auth/signin?redirect=${redirectTo}`} className="text-primary hover:underline font-medium">
              Sign In
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
}