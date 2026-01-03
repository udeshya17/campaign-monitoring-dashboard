import { envServer } from "@/config/env.server";
import type { ApiErrorResponse } from "@/types/api";

export class ApiError extends Error {
  status: number;
  path: string;
  retryAfter?: number;
  payload?: unknown;

  constructor(args: {
    message: string;
    status: number;
    path: string;
    retryAfter?: number;
    payload?: unknown;
  }) {
    super(args.message);
    this.name = "ApiError";
    this.status = args.status;
    this.path = args.path;
    this.retryAfter = args.retryAfter;
    this.payload = args.payload;
  }
}

async function parseJsonSafe(res: Response): Promise<unknown> {
  const text = await res.text();
  if (!text) return undefined;
  try {
    return JSON.parse(text) as unknown;
  } catch {
    return text;
  }
}

export async function apiFetch<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const url = `${envServer.API_BASE_URL}${path.startsWith("/") ? "" : "/"}${path}`;

  const res = await fetch(url, {
    ...init,
    headers: {
      Accept: "application/json",
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const payload = (await parseJsonSafe(res)) as ApiErrorResponse | unknown;
    const retryAfterHeader = res.headers.get("retry-after");
    const retryAfter = retryAfterHeader ? Number(retryAfterHeader) : undefined;
    throw new ApiError({
      message: `API request failed (${res.status}) for ${path}`,
      status: res.status,
      path,
      retryAfter: Number.isFinite(retryAfter) ? retryAfter : undefined,
      payload,
    });
  }

  return (await res.json()) as T;
}



