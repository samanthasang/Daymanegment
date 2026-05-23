"use client";
import { useEffect, useState, useCallback } from "react";

// Define the event type for better type safety
type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
};

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      // Prevent the default mini-infobar
      e.preventDefault();
      const installEvent = e as BeforeInstallPromptEvent;
      setDeferredPrompt(installEvent);
      setIsInstallable(true);
      console.log("installEvent ", installEvent);

      console.log("beforeinstallprompt event fired");
    };

    console.log("beforeinstallprompt ");
    window.addEventListener("beforeinstallprompt", handler);

    // Cleanup the event listener
    return () => {
      console.log("removeEventListener ");
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstallClick = useCallback(async () => {
    console.log("deferredPrompt ", deferredPrompt);
    if (!deferredPrompt) return;

    try {
      await deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      const choiceResult = await deferredPrompt.userChoice;

      console.log(
        `User response to PWA installation prompt: ${choiceResult.outcome}`
      );

      // Clear the deferred prompt once the user has responded
      setDeferredPrompt(null);
      setIsInstallable(false);
    } catch (error) {
      console.error("Error during PWA installation prompt:", error);
    }
  }, [deferredPrompt]);

  console.log("deferredPrompt ", deferredPrompt);

  // This component renders nothing if the PWA is not installable
  if (!isInstallable || !deferredPrompt) {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        bottom: 20, // Adjusted for better visibility
        left: 20,
        right: 20,
        padding: "16px 20px",
        background: "#1C2733", // Darker background matching theme_color
        color: "#FFFFFF", // White text
        borderRadius: "12px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 1000, // Ensure it's above other content
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)", // Added shadow for depth
      }}
    >
      <span
        style={{ marginRight: "20px", fontSize: "1rem", fontWeight: "500" }}
      >
        Install "Mountains" for the best experience!
      </span>
      <button
        onClick={handleInstallClick}
        style={{
          padding: "10px 20px",
          borderRadius: "8px",
          border: "none",
          background: "#FFFFFF", // White button
          color: "#1C2733", // Dark text for contrast
          fontWeight: "bold",
          fontSize: "0.9rem",
          cursor: "pointer",
          transition: "background-color 0.3s ease",
        }}
        onMouseOver={(e) => (e.currentTarget.style.background = "#e0e0e0")} // Subtle hover effect
        onMouseOut={(e) => (e.currentTarget.style.background = "#FFFFFF")}
      >
        Install
      </button>
    </div>
  );
}
