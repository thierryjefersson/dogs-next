import LoginForm from "@/components/login/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Dogs",
  description: "Logue com sua conta no site Dogs",
};

export default function LoginPage() {
  return (
    <section>
      <h1 className="title">Login</h1>
      <LoginForm />
    </section>
  );
}
