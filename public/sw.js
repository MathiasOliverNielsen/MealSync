// const CACHE_NAME = 'mealsync-v1';
// const urlsToCache = ['/', '/recipes', '/meal-plan', '/shopping-list'];

// // Install - cache initial resources
// self.addEventListener('install', (event) => {
//   event.waitUntil(
//     caches.open(CACHE_NAME).then((cache) => {
//       return cache.addAll(urlsToCache);
//     }),
//   );
//   self.skipWaiting();
// });

// // Activate - clean up old caches
// self.addEventListener('activate', (event) => {
//   event.waitUntil(
//     caches.keys().then((cacheNames) => {
//       return Promise.all(
//         cacheNames.map((cacheName) => {
//           if (cacheName !== CACHE_NAME) {
//             return caches.delete(cacheName);
//           }
//         }),
//       );
//     }),
//   );
//   self.clients.claim();
// });

// // Fetch - cache-first strategy, but skip non-http schemes
// self.addEventListener('fetch', (event) => {
//   const { request } = event;
//   const url = new URL(request.url);

//   // Skip caching for non-http/https schemes (chrome-extension, etc.)
//   if (!url.protocol.startsWith('http')) {
//     return;
//   }

//   // Skip caching for API calls to themealdb
//   if (url.hostname === 'www.themealdb.com') {
//     event.respondWith(fetch(request));
//     return;
//   }

//   // Cache-first strategy for other requests
//   event.respondWith(
//     caches
//       .match(request)
//       .then((response) => {
//         if (response) {
//           return response;
//         }
//         return fetch(request).then((response) => {
//           if (!response || response.status !== 200 || response.type === 'error') {
//             return response;
//           }
//           const responseToCache = response.clone();
//           caches.open(CACHE_NAME).then((cache) => {
//             cache.put(request, responseToCache);
//           });
//           return response;
//         });
//       })
//       .catch(() => {
//         // Return cached response or offline page
//         return caches.match(request);
//       }),
//   );
// });
