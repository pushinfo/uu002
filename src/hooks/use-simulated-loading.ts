"use client";

import { useEffect, useState } from "react";

export function useSimulatedLoading(ms = 480) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), ms);
    return () => window.clearTimeout(timer);
  }, [ms]);

  return loading;
}
