import { Link } from "react-router-dom";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema, type LoginFormData } from "../schemas";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import { useLogin } from "../hooks";

import { useNavigate } from "react-router-dom";

import { useAuthStore } from "@/store/auth.store";

import { getErrorMessage } from "@/lib/error";

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const loginMutation = useLogin();

  const navigate = useNavigate();

  const setToken = useAuthStore((state) => state.setToken);

  const setUser = useAuthStore((state) => state.setUser);

  async function onSubmit(data: LoginFormData) {
    console.log("Login submitted", data);

    loginMutation.mutate(data, {
      onSuccess: (response) => {
        setToken(response.data.accessToken);

        setUser(response.data.user);

        navigate("/", {
          replace: true,
        });
      },
    });
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Welcome Back</CardTitle>

        <CardDescription>Sign in to AgentOS</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input type="email" placeholder="Email" {...register("email")} />

            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <Input
              type="password"
              placeholder="Password"
              {...register("password")}
            />

            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>
          {loginMutation.isError && (
            <p className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-600">
              {getErrorMessage(loginMutation.error).message}
            </p>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? "Signing In..." : "Sign In"}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm">
          Don't have an account?{" "}
          <Link to="/auth/register" className="font-medium underline">
            Register
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
