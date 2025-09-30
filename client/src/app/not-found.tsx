"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-[70dvh] flex items-center justify-center px-4">
      <section
        aria-labelledby="portfolio-not-found-title"
        className="w-full max-w-2xl mx-auto text-center space-y-8"
      >
        <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-muted-foreground">
          <Search className="h-3.5 w-3.5" aria-hidden="true" />
          <span>{"We couldn't find that portfolio item"}</span>
        </div>

        <div className="space-y-3">
          <h1
            id="portfolio-not-found-title"
            className="text-4xl sm:text-5xl font-bold tracking-tight"
          >
            {"404 – Not Found"}
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg">
            {
              "The portfolio page or item you’re looking for doesn’t exist, was moved, or the URL has a typo."
            }
          </p>
        </div>

        <div className="flex justify-center">
          <Image
            src="/images/notFound.png"
            alt="Abstract lost illustration for 404"
            width={420}
            height={220}
            className="rounded-lg border bg-muted object-cover"
            priority
          />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button className="w-full sm:w-auto flex justify-center items-center gap-1 py-1 px-2 bg-gradient-to-l from-pink-500 via-purple-600 to-purple-800 rounded-md">
            <Link
              href="/"
              className="flex justify-center items-center gap-1 py-1 bg-transparent px-1 w-full h-full"
            >
              <Home className="mr-2 h-4 w-4" aria-hidden="true" />
              {"Go Home"}
            </Link>
          </button>
          <button className="w-full sm:w-auto flex justify-center items-center gap-1 py-1 px-2 bg-gradient-to-l from-pink-500 via-purple-600 to-purple-800 rounded-md">
            <Link
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.history.back();
              }}
              className="flex justify-center items-center gap-1 py-1 bg-transparent px-1 w-full h-full"
            >
              <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
              {"Go Back"}
            </Link>
          </button>
        </div>

        <p className="text-xs text-muted-foreground">
          {
            "Tip: Check the URL for typos or navigate from the portfolio overview."
          }
        </p>
      </section>
    </main>
  );
}
