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
  const [data, setData] = useState<CampaignInsights | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  const disconnect = useCallback(() => {
    esRef.current?.close();
    esRef.current = null;
    setLive(false);
  }, []);

  const connect = useCallback(() => {
    if (!url) return;
    disconnect();

    setError(null);
    const es = new EventSource(url);
    esRef.current = es;

    es.onopen = () => setLive(true);
    es.onmessage = (evt) => {
      try {
        const parsed = JSON.parse(evt.data) as CampaignInsights;
        setData(parsed);
        setLastUpdated(parsed.timestamp ?? new Date().toISOString());
        setLive(true);
      } catch {
        setError("Failed to parse live metrics event.");
      }
    };
    es.onerror = () => {
      setLive(false);
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

  return { live, data, error, lastUpdated, connect, disconnect };
}

