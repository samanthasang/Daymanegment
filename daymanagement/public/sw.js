const CACHE_NAME = "app-cache-v1";
const OFFLINE_URL = "/offline";

// Assets to always cache
const PRECACHE_URLS = [
  "/",
  "/todos",
  "/goals",
  "/habbits",
  "/timers",
  "/reminders",
  "/installments",
  "/visits",
  "/spends",
  "/friends",
  "/shares",
  "/offline",
  "./manifest.json",
];

// Install: precache shell assets we know at build time
self.addEventListener("install", (event) => {
  console.log("[Service Worker] Installing...");
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("[Service Worker] Opened cache");
        return cache.addAll(PRECACHE_URLS);
      })
      .then(() => {
        console.log("[Service Worker] Pre-cached assets successfully");
        return self.skipWaiting(); // Skip waiting for the old service worker to terminate
      })
      .catch((err) => {
        console.error("[Service Worker] Failed to pre-cache assets:", err);
      })
  );
});

// Activate: clean old caches
self.addEventListener("activate", (event) => {
  console.log("[Service Worker] Activating...");
  event.waitUntil(
    caches
      .keys()
      .then(async (keys) => {
        await Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => {
              console.log("[Service Worker] Deleting old cache:", key);
              return caches.delete(key);
            })
        );
      })
      .then(() => {
        console.log("[Service Worker] Cleaned old caches");
        return self.clients.claim(); // Become the active service worker for all clients
      })
  );
});

// Helper: cache-first for CSS/JS/fonts/images/static assets
async function cacheFirst(request) {
  // *** ADDED THIS CHECK ***
  // Ignore chrome-extension:// URLs - these cannot be cached and should be fetched directly.
  if (request.url.startsWith("chrome-extension://")) {
    console.log(
      "[Service Worker] Ignoring chrome-extension:// URL:",
      request.url
    );
    return fetch(request); // Just proceed with the request without caching.
  }
  // *** END OF ADDED CHECK ***

  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      console.log("[Service Worker] Cache hit for:", request.url);
      return cachedResponse;
    }

    console.log("[Service Worker] Fetching from network for:", request.url);
    const networkResponse = await fetch(request);

    // Only cache successful responses
    if (networkResponse && networkResponse.ok) {
      // Check if the response is cacheable (e.g., not a redirect, not an error)
      if (networkResponse.type === "basic" || networkResponse.type === "cors") {
        const cache = await caches.open(CACHE_NAME);
        console.log("[Service Worker] Caching new resource:", request.url);
        cache.put(request, networkResponse.clone());
      }
    }
    return networkResponse;
  } catch (error) {
    console.error(
      "[Service Worker] Fetch or cache error for:",
      request.url,
      error
    );
    // Fallback for cache-first if fetch fails (e.g., user is offline)
    // You might want to return a specific offline asset here if applicable
    const offlineResponse = await caches.match(OFFLINE_URL);
    if (offlineResponse) {
      return offlineResponse;
    }
    // If offline page isn't cached, return a basic offline message
    return new Response("Network error and offline page not found.", {
      status: 503,
      statusText: "Service Unavailable",
      headers: { "Content-Type": "text/plain" },
    });
  }
}

// Helper: network-first for navigations, fallback to offline page
async function networkFirstNavigation(request) {
  try {
    console.log(
      "[Service Worker] Network-first fetch for navigation:",
      request.url
    );
    const response = await fetch(request);
    // If the fetch is successful, it's likely a valid response, return it.
    // We don't cache navigations in this strategy, as they are often dynamic.
    return response;
  } catch (e) {
    console.error(
      "[Service Worker] Network request failed for navigation:",
      request.url,
      e
    );
    // If network request fails, try to get the offline page from cache.
    const cached = await caches.match(OFFLINE_URL);
    if (cached) {
      console.log(
        "[Service Worker] Falling back to offline page for navigation:",
        request.url
      );
      return cached;
    }
    // If offline page itself isn't available, return a plain response.
    return new Response(
      "Offline. Could not reach the server or load the offline page.",
      {
        status: 503,
        statusText: "Service Unavailable",
        headers: { "Content-Type": "text/plain" },
      }
    );
  }
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // 1. Bypass WebSocket connections for HMR (Hot Module Replacement)
  // These are typically used by development servers (like Next.js)
  if (request.protocol === "ws:" || request.protocol === "wss:") {
    console.log(
      "[Service Worker] Bypassing WebSocket connection:",
      request.url
    );
    // Do nothing, letting the browser handle it directly.
    return;
  }

  // 2. Handle navigation requests (HTML pages)
  // 'navigate' mode is for main HTML document requests.
  if (request.mode === "navigate") {
    console.log("[Service Worker] Handling navigation request:", request.url);
    event.respondWith(networkFirstNavigation(request));
    return;
  }

  // 3. Handle static assets (CSS, JS, fonts, images, manifest.json, _next/static/)
  // We use cacheFirst for assets that we want to serve offline.
  if (url.protocol === "http:" || url.protocol === "https:") {
    // List of destinations that should generally be served from cache first
    const cacheableDestinations = [
      "style", // CSS
      "script", // JavaScript
      "font", // Fonts
      "image", // Images
      "audio", // Audio files
      "video", // Video files
      "object", // <object> elements
    ];

    // Explicitly include paths or types we want to cache
    const isStaticAsset =
      url.pathname.startsWith("/_next/static/") || // Next.js static assets
      request.destination === "manifest" || // Manifest file
      cacheableDestinations.includes(request.destination);

    if (isStaticAsset) {
      console.log(
        "[Service Worker] Applying cacheFirst to asset:",
        request.url
      );
      event.respondWith(cacheFirst(request));
    } else {
      // For other HTTP(S) requests not explicitly handled above,
      // let them go to the network. You might want to refine this.
      console.log(
        "[Service Worker] Fetching non-cached HTTP(S) request:",
        request.url
      );
      event.respondWith(fetch(request));
    }
  } else {
    // For non-HTTP(S) requests (like chrome-extension://, blob:, etc.),
    // it's usually best to just let the browser handle them.
    console.log("[Service Worker] Fetching non-HTTP(S) request:", request.url);
    event.respondWith(fetch(request));
  }
});
