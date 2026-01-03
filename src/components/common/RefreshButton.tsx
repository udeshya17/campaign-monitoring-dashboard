"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./Button";

export function RefreshButton() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  return (
    <Button
      type="button"
      onClick={() => startTransition(() => router.refresh())}
      disabled={pending}
      className="inline-flex items-center gap-2"
    >
      {pending ? (
        <>
          <span className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-white/40 border-t-white" />
          Refreshing…
        </>
      ) : (
        "Refresh"
      )}
    </Button>
  );
}



