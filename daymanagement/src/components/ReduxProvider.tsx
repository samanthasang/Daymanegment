// components/ReduxProvider.tsx
"use client";

import { Provider } from "react-redux";
import { useEffect, useState } from "react";
import { store } from "@/lib/store";

interface ReduxProviderProps {
  children: React.ReactNode;
}

export function ReduxProvider({ children }: ReduxProviderProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // During SSR, render children without Redux Provider
  // Redux will automatically hydrate on the client
  if (!mounted) {
    // Optional: Return a loading skeleton or just the children
    return <>{children}</>;
  }

  return <Provider store={store}>{children}</Provider>;
}
