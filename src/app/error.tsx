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
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <main>
      <div className="mx-auto max-w-2xl py-10">
        <h1 className="text-xl font-semibold">Something went wrong</h1>
        <p className="mt-2 text-sm text-slate-600">{error.message}</p>
        <button
          type="button"
          onClick={() => reset()}
          className="mt-6 rounded-md bg-slate-900 px-4 py-2 text-sm text-white hover:bg-slate-800"
        >
          Try again
        </button>
      </div>
    </main>
  );
}



