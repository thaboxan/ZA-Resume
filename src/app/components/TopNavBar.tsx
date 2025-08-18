"use client";
import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cx } from "lib/cx";
import { useT } from "lib/i18n/Provider";
import { LanguageSelector } from "components/LanguageSelector";

export const TopNavBar = () => {
  const pathName = usePathname();
  const isHomePage = pathName === "/";
  const t = useT();
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem("theme");
    const initialDark = stored !== "light"; // default to dark
    setDark(initialDark);
    document.documentElement.classList.toggle("dark", initialDark);
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark", next);
    }
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
  };

  return (
  <header
      aria-label="Site Header"
      className={cx(
        "sticky top-0 z-50 flex h-[var(--top-nav-bar-height)] items-center border-b-2 border-gray-100 px-3 lg:px-12 backdrop-blur shadow-sm ring-1 ring-black/5 supports-[backdrop-filter]:bg-white/70 dark:border-neutral-800 dark:ring-white/10 dark:supports-[backdrop-filter]:bg-neutral-900/70",
        isHomePage && "bg-dot dark:bg-neutral-900"
      )}
    >
      <div className="flex h-10 w-full items-center justify-between">
    <Link href="/" className="select-none">
          <span className="sr-only">ZA-Resume</span>
          <span
      className="text-primary block text-2xl font-extrabold uppercase tracking-tight drop-shadow-sm lg:text-3xl"
            aria-label="ZA-Resume"
          >
            ZA-Resume
          </span>
        </Link>
  <nav
          aria-label="Site Nav Bar"
          className="flex items-center gap-2 text-sm font-medium"
        >
      {[
            ["/resume-builder", t("nav.builder")],
            ["/resume-parser", t("nav.parser")],
          ].map(([href, text]) => (
            <Link
              key={text}
        className="rounded-md px-2.5 py-2 text-gray-700 hover:bg-gray-100 focus-visible:bg-gray-100 lg:px-4 dark:text-gray-200 dark:hover:bg-neutral-800 dark:focus-visible:bg-neutral-800 font-semibold"
              href={href}
            >
              {text}
            </Link>
          ))}
          <LanguageSelector />
          <button
            type="button"
            onClick={toggleTheme}
            className="ml-2 inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-neutral-800"
            title={dark ? "Switch to light" : "Switch to dark"}
            aria-label="Toggle dark mode"
          >
            {dark ? (
              <MoonIcon className="h-5 w-5" />
            ) : (
              <SunIcon className="h-5 w-5" />
            )}
          </button>
          <div className="ml-1 mt-1">
            <iframe
              src="https://ghbtns.com/github-btn.html?user=thaboxan&repo=ZA-Resume&type=star&count=true"
              width="100"
              height="20"
              className="overflow-hidden border-none"
              title="GitHub"
            />
          </div>
        </nav>
      </div>
    </header>
  );
};
