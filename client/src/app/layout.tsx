import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import Navigation from "@/components/Navigation";
import { ThemeProvider } from "@/providers/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Emdadul Hoque Emon's Profile",
  description: "Full Stack Developer & UI/UX Designer",
  keywords: "Frontend, Backend, Full Stack, UI/UX, Developer",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Emdadul Hoque Emon's Portfolio",
    description: "Full Stack Developer & UI/UX Designer",
    images: ["/images/profile.png"],
  },
  twitter: {
    images: ["/images/profile.png"],
  },
  facebook: {
    admins: ["Emdadul Hoque Emon"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navigation />
            <div className="min-h-screen mt-16">{children}</div>
            <Toaster />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
