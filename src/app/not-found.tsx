import Link from "next/link";

export default function NotFound() {
  return (
    <main>
      <h1 className="text-xl font-semibold">Not found</h1>
      <p className="mt-2 text-sm text-slate-600">
        The page you’re looking for doesn’t exist.
      </p>
      <Link
        href="/dashboard"
        className="mt-4 inline-block rounded-md bg-slate-900 px-4 py-2 text-sm text-white hover:bg-slate-800"
      >
        Go to Overview
      </Link>
    </main>
  );
}



