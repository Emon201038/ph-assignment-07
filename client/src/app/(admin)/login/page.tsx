import { LoginForm } from "@/components/login-form";
import { auth } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await auth();
  if (session?._id) {
    redirect("/dashboard");
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <LoginForm />
    </main>
  );
}
