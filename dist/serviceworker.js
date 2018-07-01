const cacheName = "cachev1";
const cacheFiles = [
  "../converter.js",
  "../static/img/cb.jpeg",
  "../static/styles.css",
  "../converter.html",
  "../dist/index.html",
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
    console.log('installing cache files');

      return cache.addAll(cacheFiles);
    })
  );
});



self.addEventListener("fetch", e => {
  e.respondWith(
    caches.open(cacheName).then(cache => {
      caches.match(e.request).then(response => {
        if (response) {
          console.log('response', response);
          console.log("[Service worker] Found in Cache", e.request.url);
          return response;
        }

        return fetch(e.request).then(response => {
          if (response) {
            let responseClone = response.clone();
            cache.put(e.request, responseClone);
            return response;
          }
        });
      });
    })
  );
});
