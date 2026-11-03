import type { Metadata } from "next";
import { LoginForm } from "@/features/auth/login-form";

export const metadata: Metadata = {
  title: "Staff sign in",
  description: "Sign in to the Ember and Rice service dashboard.",
};

export default function LoginPage() {
  return <LoginForm />;
}
