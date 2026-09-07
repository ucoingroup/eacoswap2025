// EACOswap Service Worker - PWA Offline Cache
const CACHE_NAME = 'eacoswap-v1';
const CACHE_ASSETS = [
  './',
  './index.html',
  './styles.css',
  './js/app.js',
  './manifest.json'
];

// Install: pre-cache core assets
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(CACHE_ASSETS).catch(function(err) {
        console.warn('[SW] Some assets failed to cache:', err);
      });
    })
  );
  self.skipWaiting();
});

// Activate: clean old caches
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(names) {
      return Promise.all(
        names.map(function(name) {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch: cache-first for static assets, network-first for API calls
self.addEventListener('fetch', function(event) {
  var request = event.request;

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  var url = new URL(request.url);

  // Network-first for API calls (always fresh data)
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request).then(function(response) {
        if (response && response.status === 200) {
          var respClone = response.clone();
          caches.open(CACHE_NAME).then(function(cache) {
            cache.put(request, respClone).catch(function(){});
          });
        }
        return response;
      }).catch(function() {
        return caches.match(request);
      })
    );
    return;
  }

  // Cache-first for static assets
  event.respondWith(
    caches.match(request).then(function(cached) {
      if (cached) return cached;
      return fetch(request).then(function(response) {
        if (response && response.status === 200 && response.type === 'basic') {
          var respClone = response.clone();
          caches.open(CACHE_NAME).then(function(cache) {
            cache.put(request, respClone).catch(function(){});
          });
        }
        return response;
      }).catch(function() {
        // Offline fallback
        if (request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});

// Handle messages from page (skipWaiting trigger)
self.addEventListener('message', function(event) {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
