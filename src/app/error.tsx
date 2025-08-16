"use client";
import { useEffect } from "react";
import Link from "next/link";
import { useT } from "lib/i18n/Provider";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useT();
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <div className="mx-auto max-w-2xl p-6 text-center">
      <h2 className="text-2xl font-semibold text-red-600">{t("error.title") || "Something went wrong"}</h2>
      {error?.digest && (
        <p className="mt-2 text-sm text-gray-500">Ref: {error.digest}</p>
      )}
      <div className="mt-6 flex justify-center gap-3">
        <button
          onClick={() => reset()}
          className="btn-primary"
        >
          {t("error.retry") || "Try again"}
        </button>
        <Link href="/" className="rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100">
          {t("error.home") || "Go home"}
        </Link>
      </div>
    </div>
  );
}
