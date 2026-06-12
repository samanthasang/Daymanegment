"use client";

import React, { useState, useEffect, useCallback } from "react";
import type { BeforeInstallPromptEvent, InstallPromptProps } from "@/types/pwa";

export default function InstallPrompt({
  onInstall,
  onDismiss,
}: InstallPromptProps) {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isStandalone, setIsStandalone] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [isIOS, setIsIOS] = useState<boolean>(false);

  // Check if app is already installed or running standalone
  useEffect(() => {
    // Check for standalone mode
    const isInStandaloneMode =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone === true;
    setIsStandalone(isInStandaloneMode);

    // Detect iOS
    const iOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIOS(iOS);

    // Check if user dismissed the prompt before
    const promptDismissed = localStorage.getItem("installPromptDismissed");
    if (
      promptDismissed &&
      Date.now() - parseInt(promptDismissed) < 7 * 24 * 60 * 60 * 1000
    ) {
      setIsVisible(false);
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = useCallback(async () => {
    if (!deferredPrompt) return;

    try {
      // Show the install prompt
      await deferredPrompt.prompt();

      // Wait for user's choice
      const { outcome } = await deferredPrompt.userChoice;

      if (outcome === "accepted") {
        console.log("User accepted the install prompt");
        onInstall?.();
        setIsVisible(false);
      } else {
        console.log("User dismissed the install prompt");
        onDismiss?.();
      }

      // Clear the deferred prompt (can't be used again)
      setDeferredPrompt(null);
    } catch (error) {
      console.error("Error showing install prompt:", error);
    }
  }, [deferredPrompt, onInstall, onDismiss]);

  const handleDismiss = useCallback(() => {
    setIsVisible(false);
    localStorage.setItem("installPromptDismissed", Date.now().toString());
    onDismiss?.();
  }, [onDismiss]);

  // Don't show if already installed or user dismissed
  if (isStandalone || !isVisible) return null;

  // iOS specific prompt (no beforeinstallprompt event)
  if (isIOS && !isStandalone) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t p-4 z-50 animate-slide-up">
        <div className="max-w-md mx-auto">
          <div className="flex justify-between items-start mb-3">
            <h3 className="font-semibold text-lg">Install App</h3>
            <button
              onClick={handleDismiss}
              className="text-gray-400 hover:text-gray-600"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
          <p className="text-gray-600 mb-3">
            To install this app on your iOS device:
          </p>
          <ol className="text-sm text-gray-500 space-y-2 mb-4 list-decimal list-inside">
            <li>
              Tap the Share button <span className="inline-block mx-1">📤</span>
            </li>
            <li>
              Scroll down and tap{" "}
              <span className="font-semibold">"Add to Home Screen"</span>
            </li>
            <li>
              Tap <span className="font-semibold">"Add"</span> in the top right
              corner
            </li>
          </ol>
          <button
            onClick={handleDismiss}
            className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium"
          >
            Dismiss
          </button>
        </div>
      </div>
    );
  }

  // Android/Desktop install prompt
  if (deferredPrompt) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t p-4 z-50 animate-slide-up">
        <div className="max-w-md mx-auto">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="font-semibold text-lg">Install App</h3>
              <p className="text-sm text-gray-500">Get a better experience</p>
            </div>
            <button
              onClick={handleDismiss}
              className="text-gray-400 hover:text-gray-600"
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          <div className="space-y-3 mb-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="text-green-500">✓</span>
              <span>Access offline</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="text-green-500">✓</span>
              <span>Fast loading</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="text-green-500">✓</span>
              <span>Home screen shortcut</span>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleInstallClick}
              className="flex-1 bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors"
            >
              Install
            </button>
            <button
              onClick={handleDismiss}
              className="flex-1 border border-gray-300 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Later
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
