"use client";

import type { ButtonHTMLAttributes } from "react";

export function Button({
  className = "",
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { className?: string }) {
  return (
    <button
      {...props}
      className={`rounded-md bg-slate-900 px-4 py-2 text-sm text-white hover:bg-slate-800 disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  );
}



