"use client";

import { useRouter } from "next/navigation";
import { Button } from "./Button";

export function RefreshButton() {
  const router = useRouter();
  return (
    <Button type="button" onClick={() => router.refresh()}>
      Refresh
    </Button>
  );
}



