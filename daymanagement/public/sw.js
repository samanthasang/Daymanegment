// public/sw.js
const CACHE_NAME = "mountains-v1";
const OFFLINE_URL = "/offline";

// Only cache static assets during install (not dynamic routes)
const STATIC_ASSETS = [
  "/",
  "/offline",
  "/manifest.json",
  "/assets/icons/icon-48x48.png",
  "/assets/icons/icon-72x72.png",
  "/assets/icons/icon-96x96.png",
  "/assets/icons/icon-128x128.png",
  "/assets/icons/icon-144x144.png",
  "/assets/icons/icon-152x152.png",
  "/assets/icons/icon-192x192.png",
  "/assets/icons/icon-256x256.png",
  "/assets/icons/icon-384x384.png",
  "/assets/icons/icon-512x512.png",
];


// Install event
self.addEventListener('install', (event) => {
  console.log('[SW] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      for (const asset of STATIC_ASSETS) {
        try {
          const response = await fetch(asset);
          if (response.ok) {
            await cache.put(asset, response);
          }
        } catch (error) {
          console.log(`[SW] Failed to cache ${asset}:`, error);
        }
      }
    })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  // Ensure the service worker takes control immediately
  event.waitUntil(self.clients.claim());
  console.log('[SW] Activated!');
});

// Add a message handler to respond to ping messages
self.addEventListener('message', (event) => {
  console.log('[SW] Message received:', event.data);
  
  if (event.data && event.data.type === 'PING') {
    // Respond back to the client
    if (event.ports && event.ports[0]) {
      event.ports[0].postMessage({ type: 'PONG' });
    } else {
      // Fallback for clients without MessagePort
      event.source.postMessage({ type: 'PONG' });
    }
  }
});

// Fetch event with proper error handling
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests and cross-origin requests
  if (request.method !== 'GET' || url.origin !== location.origin) {
    return;
  }

  // Navigation requests - Network first, fallback to cache
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
          }
          return response;
        })
        .catch(async () => {
          const cached = await caches.match(request);
          if (cached) return cached;
          return caches.match(OFFLINE_URL);
        })
    );
    return;
  }

  // Static assets - Cache first with network fallback
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((response) => {
        if (response.ok && request.method === 'GET') {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
        }
        return response;
      });
    }).catch(() => {
      // Fallback for images that fail completely
      if (request.destination === 'image') {
        return new Response(null, { status: 404, statusText: 'Not Found' });
      }
      return new Response('Offline content unavailable', { status: 503 });
    })
  );
});