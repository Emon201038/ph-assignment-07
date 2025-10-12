import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.token) {
    redirect("/login?redirect=/dashboard");
  }
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-balance md:text-4xl">
          Welcome back, {session?.user.name}
        </h1>
        <p className="mt-2 text-muted-foreground text-pretty">
          Here&apos;s what&apos;s happening with your portfolio today
        </p>
      </div>
    </div>
  );
}
