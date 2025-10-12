"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginSchemaType } from "@/utils/zodSchema";
import { Form } from "./ui/form";
import { RHFInput } from "./rhf-input";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useState } from "react";

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  const handleSubmit = async (value: LoginSchemaType) => {
    const tostId = toast.loading("Signing in...");
    setIsLoading(true);
    try {
      await signIn("credentials", {
        email: value.email,
        password: value.password,
        redirect: false,
      });
      toast.success("Signed in successfully", { id: tostId });
      router.push("/dashboard");
    } catch (error) {
      toast.error("Failed to sign in", { id: tostId });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm space-y-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-medium tracking-tight text-balance">
          Welcome back
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your credentials to access your portfolio
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="space-y-4">
            <RHFInput
              control={form.control}
              name="email"
              placeholder="Enter your email"
              label="Email *"
              type="email"
            />
            <RHFInput
              control={form.control}
              name="password"
              placeholder="Enter your password"
              label="Password *"
              type="password"
            />
          </div>

          <Button disabled={isLoading} type="submit" className="w-full h-11">
            Sign in
          </Button>
        </form>
      </Form>
    </div>
  );
}
