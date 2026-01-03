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
      className={`cursor-pointer select-none rounded-md bg-slate-900 px-4 py-2 text-sm text-white transition hover:bg-slate-800 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  );
}



