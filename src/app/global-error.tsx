"use client";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="mx-auto max-w-2xl p-6 text-center">
          <h2 className="text-2xl font-semibold text-red-600">Something went wrong</h2>
          {error?.digest && (
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Ref: {error.digest}</p>
          )}
          <div className="mt-6 flex justify-center gap-3">
            <button onClick={() => reset()} className="btn-primary">Try again</button>
          </div>
        </div>
      </body>
    </html>
  );
}
