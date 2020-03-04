var cacheName = "sgtoilet-cache-" + Date.now();
var filesToCache = [
  "/",
  "/index.html",
  "/bundle.js",
  "/bundle.css",
  "https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css",
  "https://fonts.googleapis.com/css?family=Montserrat&display=swap"
];
self.addEventListener("install", function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
});
