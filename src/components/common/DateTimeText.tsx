"use client";

import { useMemo } from "react";

function formatLocal(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(d);
}

export function DateTimeText({ iso }: { iso: string }) {
  const text = useMemo(() => formatLocal(iso), [iso]);
  return <span>{text}</span>;
}


