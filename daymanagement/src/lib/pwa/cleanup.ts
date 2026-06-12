// lib/pwa/cleanup.ts
export async function cleanupServiceWorkers() {
  if (typeof window === "undefined") return;

  // 1. Unregister all service workers
  const registrations = await navigator.serviceWorker.getRegistrations();
  await Promise.all(
    registrations.map((registration) => registration.unregister())
  );

  // 2. Clear all caches
  if ("caches" in window) {
    const cacheNames = await caches.keys();
    await Promise.all(cacheNames.map((cacheName) => caches.delete(cacheName)));
  }

  // 3. Clear all storage
  if ("storage" in navigator && navigator.storage) {
    await navigator.storage.estimate(); // Just to check
    // Optionally: await navigator.storage.persist();
  }

  console.log("All service workers and caches cleared");

  // 4. Reload the page to start fresh
  window.location.reload();
}

// Optional: Add a reset button in development
export function addResetButton() {
  if (process.env.NODE_ENV === "development") {
    const button = document.createElement("button");
    button.textContent = "Reset PWA";
    button.style.position = "fixed";
    button.style.bottom = "10px";
    button.style.right = "10px";
    button.style.zIndex = "9999";
    button.style.padding = "10px";
    button.style.backgroundColor = "red";
    button.style.color = "white";
    button.style.border = "none";
    button.style.borderRadius = "5px";
    button.onclick = cleanupServiceWorkers;
    document.body.appendChild(button);
  }
}
