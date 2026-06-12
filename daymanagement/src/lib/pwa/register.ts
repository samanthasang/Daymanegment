// lib/pwa/register.ts
export function registerServiceWorker() {
  if (typeof window === "undefined") return;

  if ("serviceWorker" in navigator) {
    // Wait for window load to avoid competing with other resources
    window.addEventListener("load", () => {
      // Use a timeout to ensure the service worker doesn't block the main thread
      setTimeout(() => {
        navigator.serviceWorker
          .register("/sw.js", { scope: "/" })
          .then((registration) => {
            console.log(
              "Service Worker registered with scope:",
              registration.scope
            );

            // Check for updates every minute
            setInterval(() => {
              registration.update();
            }, 60 * 1000);
          })
          .catch((error) => {
            console.error("Service Worker registration failed:", error);
          });
      }, 1000);
    });
  }
}

// Optional: Add helper functions for service worker communication
export async function getServiceWorkerRegistration() {
  if ("serviceWorker" in navigator) {
    const registration = await navigator.serviceWorker.getRegistration("/");
    return registration;
  }
  return null;
}

export async function unregisterServiceWorkers() {
  if ("serviceWorker" in navigator) {
    const registrations = await navigator.serviceWorker.getRegistrations();
    await Promise.all(
      registrations.map((registration) => registration.unregister())
    );
    console.log("All service workers unregistered");
  }
}
