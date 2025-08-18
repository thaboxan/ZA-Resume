import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl p-6 text-center">
      <h2 className="text-2xl font-semibold">Page not found</h2>
  <p className="mt-2 text-gray-600 dark:text-gray-300">The page you’re looking for doesn’t exist or has been moved.</p>
      <div className="mt-6">
        <Link href="/" className="btn-primary">Go home</Link>
      </div>
    </div>
  );
}
