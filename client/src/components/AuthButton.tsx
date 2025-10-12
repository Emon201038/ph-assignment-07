"use client";
import React from "react";
import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

const serverUrl = process.env.NEXT_PUBLIC_API_URL;

const AuthButton = () => {
  const pathname = usePathname();
  const router = useRouter();
  const session = useSession();

  if (session?.status === "unauthenticated") return null;

  const handleLogout = async () => {
    try {
      await fetch(serverUrl + "/api/v1/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      await signOut({ callbackUrl: "/login" });
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const buttonText = (
    <div
      onClick={handleLogout}
      className="flex gap-1 justify-center items-center"
    >
      <LogOut size={15} /> Logout
    </div>
  );
  return (
    <motion.button
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * 5 }}
      className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
    >
      {buttonText}
    </motion.button>
  );
};

export default AuthButton;
