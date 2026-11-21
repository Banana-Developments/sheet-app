const CACHE_NAME = "sheet-app-cache-v2";
const ASSETS = ["./", "./index.html", "./manifest.json"];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("fetch", event => {
  // Запросы к Google Apps Script не кэшируем, кэшируем только файлы самого приложения
  if (event.request.url.includes("://google.com")) return;

  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request))
  );
});
