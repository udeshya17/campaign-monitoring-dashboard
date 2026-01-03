import type { ApiErrorResponse } from "@/types/api";

function isApiErrorResponse(x: unknown): x is ApiErrorResponse {
  return (
    !!x &&
    typeof x === "object" &&
    "error" in x &&
    typeof (x as { error?: unknown }).error === "string"
  );
}

export function BackendErrorPanel({ error }: { error: unknown }) {
  const payload = error as unknown;
  const body = isApiErrorResponse(payload)
    ? payload
    : typeof payload === "string"
      ? { error: payload }
      : { error: "Unknown error", details: payload };

  return (
    <div className="rounded-xl border border-red-200 bg-red-50 p-4">
      <div className="text-sm font-semibold text-red-800">{body.error}</div>
      {"message" in body && typeof body.message === "string" ? (
        <div className="mt-1 text-sm text-red-700">{body.message}</div>
      ) : null}
    </div>
  );
}


