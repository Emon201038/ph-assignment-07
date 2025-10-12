"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, FolderKanban, FileText } from "lucide-react";
import AuthButton from "./AuthButton";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Projects", href: "/dashboard/projects", icon: FolderKanban },
  { name: "Blogs", href: "/dashboard/blogs", icon: FileText },
];

export function DashboardHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-16 z-50 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <nav className="flex items-center gap-px">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === "/dashboard"
                  ? pathname === item.href
                  : pathname?.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    isActive
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <AuthButton />
        </div>
      </div>
    </header>
  );
}
