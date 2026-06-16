"use client";
import { useEffect, useState } from "react";

export default function SplashGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setReady(true), 900);
    return () => window.clearTimeout(t);
  }, []);

  if (!ready) {
    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "#0f172a",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 999999,
        }}
      >
        <div className="text-center">
          <div className="text-2xl">Mountains</div>
          <div className="mt-2">Loading...</div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
