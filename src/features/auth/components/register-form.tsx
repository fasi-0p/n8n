"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

const registerSchema = z
  .object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(3, "Password is required"),
    confirmPassword: z.string().min(3, "Re-enter password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const router = useRouter();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const signInGithub = async () => {
    await authClient.signIn.social(
      { provider: "github" },
      {
        onSuccess: () => {
          router.push("/");
        },
        onError: (ctx) => {
          toast.error(ctx.error?.message || "Something went wrong");
        },
      }
    );
  };

  const signInGoogle = async () => {
    await authClient.signIn.social(
      { provider: "google" },
      {
        onSuccess: () => {
          router.push("/");
        },
        onError: (ctx) => {
          toast.error(ctx.error?.message || "Something went wrong");
        },
      }
    );
  };

  const onSubmit = async (values: RegisterFormValues) => {
    await authClient.signUp.email(
      {
        name: values.email,
        email: values.email,
        password: values.password,
        callbackURL: "/",
      },
      {
        onSuccess: () => {
          router.push("/");
        },
        onError: (ctx) => {
          toast.error(ctx.error.message || "Failed to create account");
        },
      }
    );
  };

  const isPending = form.formState.isSubmitting;

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

          {/* Social buttons */}
          <div className="flex flex-col gap-3">
            <Button
              onClick={signInGithub}
              variant="outline"
              className="w-full flex items-center justify-center gap-2 bg-slate-900/50 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white transition-all"
              type="button"
              disabled={isPending}
            >
              <FaGithub className="h-4 w-4" />
              Github
            </Button>

            <Button
              onClick={signInGoogle}
              variant="outline"
              className="w-full flex items-center justify-center gap-2 bg-slate-900/50 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white transition-all"
              type="button"
              disabled={isPending}
            >
              <FaGoogle className="h-4 w-4" />
              Google
            </Button>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-700/50" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#1e293b] px-2 text-slate-500 font-medium tracking-wider">
                Or continue with email
              </span>
            </div>
          </div>

          {/* Fields */}
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-300">Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="m@example.com"
                      {...field}
                      className="bg-slate-900/50 border-slate-700 text-slate-200 placeholder:text-slate-600 focus-visible:ring-orange-500"
                    />
                  </FormControl>
                  <FormMessage className="text-rose-400" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-300">Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      {...field}
                      className="bg-slate-900/50 border-slate-700 text-slate-200 placeholder:text-slate-600 focus-visible:ring-orange-500"
                    />
                  </FormControl>
                  <FormMessage className="text-rose-400" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-300">Confirm password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      {...field}
                      className="bg-slate-900/50 border-slate-700 text-slate-200 placeholder:text-slate-600 focus-visible:ring-orange-500"
                    />
                  </FormControl>
                  <FormMessage className="text-rose-400" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold shadow-lg shadow-orange-500/25 transition-all mt-2"
              disabled={isPending}
            >
              {isPending ? "Setting up workspace..." : "Create Account"}
            </Button>
          </div>

          {/* Footer */}
          <p className="text-center text-sm text-slate-400 font-medium pt-2">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-orange-400 hover:text-orange-300 transition-colors underline-offset-4 hover:underline"
            >
              Log in
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
}

export default RegisterForm;
