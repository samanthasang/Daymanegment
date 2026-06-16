const CACHE_VERSION = "v3";
const PRECACHE = `next-precache-${CACHE_VERSION}`;
const RUNTIME_CHUNKS = `next-chunks-${CACHE_VERSION}`;
const OFFLINE_URL = "/"; // Define OFFLINE_URL for navigation fallback

// Files to precache (add more as needed)
const PRECACHE_URLS = [
  "/",
  "/todos",
  "/goals",
  "/habits",
  "/timers",
  "/reminders",
  "/installments",
  "/visits",
  "/spends",
  "/friends",
  "/shares",
  "/offline", // Ensure this is a valid path in your app
  "/manifest.json",
  "/assets/icons/icon-48x48.png",
  "/assets/icons/icon-96x96.png",
  "/assets/icons/icon-114x114.png",
  "/assets/icons/icon-144x144.png",
  "/assets/icons/icon-192x192.png",
  "/assets/icons/icon-256x256.png",
  "/assets/icons/icon-384x384.png",
  "/assets/icons/icon-512x512.png",
];

// Install event: cache shell/resources
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(PRECACHE).then((cache) => {
      // Precache the offline fallback page first
      return cache.addAll([OFFLINE_URL]).then(() => {
        // Then precache the rest of the static assets
        return cache.addAll(PRECACHE_URLS.filter((url) => url !== OFFLINE_URL));
      });
    })
  );
  self.skipWaiting();
});

// Activate event: cleanup old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => ![PRECACHE, RUNTIME_CHUNKS].includes(key))
            .map((key) => caches.delete(key))
        )
      )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // Ignore requests from other origins
  if (url.origin !== location.origin) {
    return;
  }

  // Handle navigation requests (page refreshes with query params)
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request).catch(async () => {
        // Try to fetch the requested URL. If it fails (e.g., offline),
        // fall back to the OFFLINE_URL.
        const cached = await caches.match(OFFLINE_URL);
        return cached || new Response("Offline", { status: 503 }); // Or a more specific offline page
      })
    );
    return;
  }

  // Handle Next.js static chunks
  if (url.pathname.startsWith("/_next/static/chunks/")) {
    event.respondWith(
      caches
        .open(RUNTIME_CHUNKS)
        .then(
          (cache) =>
            fetch(request)
              .then((response) => {
                // Save to cache if successful
                if (response.status === 200) {
                  cache.put(request, response.clone());
                }
                return response;
              })
              .catch(() => cache.match(request)) // Fallback to cache if network fails
        )
        .catch(() => caches.match(OFFLINE_URL)) // Fallback to app shell if cache fails
    );
    return;
  }

  // Handle precached assets (for direct matches in PRECACHE_URLS)
  // This part is less critical for navigation issues but good for static assets.
  if (PRECACHE_URLS.includes(url.pathname)) {
    event.respondWith(
      caches
        .open(PRECACHE)
        .then((cache) => cache.match(request).catch(() => fetch(request))) // Try cache, then network
        .catch(() => caches.match(OFFLINE_URL)) // Fallback to app shell if cache fails
    );
    return;
  }

  // Default strategy for other requests: Network, then Cache, then App Shell fallback
  event.respondWith(
    fetch(request)
      .then((response) => {
        // For non-navigation GET requests, cache them if successful
        if (request.method === "GET" && response.ok) {
          // Decide which cache to use, RUNTIME_CHUNKS is generally for dynamic/app-specific assets
          caches
            .open(RUNTIME_CHUNKS)
            .then((cache) => cache.put(request, response.clone()))
            .catch(console.error); // Log caching errors
        }
        return response;
      })
      .catch(
        () =>
          caches
            .match(request) // Try cache if network fails
            .then((response) => response || caches.match(OFFLINE_URL)) // Fallback to app shell
      )
  );
});
