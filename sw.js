const CACHE_NAME = 'interventi-v11';
const ASSETS = [
  'index.html',
  'style.css',
  'logo.PNG',
  'Icon-192.png',
  'Icon-512.png',
  'icon-180.png'
];

// Installazione della PWA e salvataggio dei file in cache
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Attivazione e pulizia di vecchie cache se aggiorni l'app
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

// Gestione offline: prova a caricare dalla rete, se fallisce usa la cache
self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request).catch(() => {
      return caches.match(e.request);
    })
  );
});
