self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('wallpaper-rotator-cache').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/app.js',
        '/sw.js',
        // Add more files to cache here
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
