"use client";
import Link from "next/link";
import { useT } from "lib/i18n/Provider";

export const Footer = () => {
  const t = useT();
  return (
    <footer className="mt-16 border-t border-gray-200 dark:border-neutral-800">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-gray-600 dark:text-gray-300">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center md:text-left">
            Made with <span aria-hidden className="mx-1">❤️</span> in South Africa • {new Date().getFullYear()}
          </p>
          <nav className="flex flex-wrap items-center justify-center gap-4">
            <Link className="hover:underline" href="/resume-builder">{t("nav.builder")}</Link>
            <Link className="hover:underline" href="/resume-parser">{t("nav.parser")}</Link>
            <a className="hover:underline" href="https://github.com/thaboxan/ZA-Resume" target="_blank" rel="noreferrer">GitHub</a>
          </nav>
        </div>
      </div>
    </footer>
  );
};
