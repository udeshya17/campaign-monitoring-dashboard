"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { CampaignInsights } from "@/types/insights";

export function useLiveCampaignInsights(args: {
  url: string | null;
  autoConnect?: boolean;
}) {
  const { url, autoConnect = true } = args;
  const esRef = useRef<EventSource | null>(null);

  const [live, setLive] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [data, setData] = useState<CampaignInsights | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  const disconnect = useCallback(() => {
    esRef.current?.close();
    esRef.current = null;
    setLive(false);
    setConnecting(false);
  }, []);

  const connect = useCallback(() => {
    if (!url) {
      setError("Missing NEXT_PUBLIC_API_BASE_URL (needed for SSE in browser).");
      setLive(false);
      setConnecting(false);
      return;
    }
    disconnect();

    setConnecting(true);
    setError(null);
    const es = new EventSource(url);
    esRef.current = es;

    es.onopen = () => {
      setLive(true);
      setConnecting(false);
      setError(null);
    };
    es.onmessage = (evt) => {
      try {
        const parsed = JSON.parse(evt.data) as CampaignInsights;
        setData(parsed);
        setLastUpdated(parsed.timestamp ?? new Date().toISOString());
        setLive(true);
        setConnecting(false);
        setError(null);
      } catch {
        setError("Failed to parse live metrics event.");
        setConnecting(false);
      }
    };
    es.onerror = () => {
      setLive(false);
      setConnecting(false);
      setError("Live stream disconnected. Retrying…");
      // Let EventSource auto-reconnect; we keep state to show offline momentarily.
    };
  }, [disconnect, url]);

  useEffect(() => {
    if (!autoConnect) return;
    if (!url) return;
    connect();
    return () => disconnect();
  }, [autoConnect, connect, disconnect, url]);

  return { live, connecting, data, error, lastUpdated, connect, disconnect };
}

