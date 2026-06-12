/* eslint-disable no-restricted-globals */
const CACHE_NAME = "next-app-precache-v1";
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
  "/offline",
  "/manifest.json",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      await cache.addAll(PRECACHE_URLS);
      self.skipWaiting();
    })()
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (request.method !== "GET") return;

  // Navigation requests: network first, fallback to cache/offline
  if (request.mode === "navigate") {
    event.respondWith(
      (async () => {
        try {
          const networkResponse = await fetch(request);
          return networkResponse;
        } catch (err) {
          // If offline, check if the request is in our list, else show /offline
          const cached = await caches.match(request);
          if (cached) return cached;
          return await caches.match("/offline");
        }
      })()
    );
    return;
  }

  // Static assets/API: cache first, then network
  event.respondWith(
    (async () => {
      const cached = await caches.match(request);
      if (cached) return cached;

      try {
        const response = await fetch(request);
        if (response && response.status === 200 && response.type === "basic") {
          const cache = await caches.open(CACHE_NAME);
          cache.put(request, response.clone());
        }
        return response;
      } catch (err) {
        return cached || Response.error();
      }
    })()
  );
});
