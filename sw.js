const CACHE_NAME = 'interventi-v31'; // Incrementato la versione per forzare l'aggiornamento

const ASSETS = [
  'index.html',
  'style.css',
  'logo.PNG',
  'Icon-192.png',
  'Icon-512.png',
  'icon-180.png',
  'html2pdf.bundle.min.js', // Inserita la libreria locale correttamente
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request)
      .then((response) => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(e.request, clone);
        });
        return response;
      })
      .catch(() => caches.match(e.request))
  );
});

self.addEventListener('message', (event) => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
});
