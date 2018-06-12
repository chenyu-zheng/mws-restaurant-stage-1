const CACHE_NAME = 'restaurant-reviews';
const urlsToCache = [
  '/',
  '/restaurant.html',
  '/css/styles.css',
  '/js/main.js',
  '/js/dbhelper.js',
  '/js/restaurant_info.js',
  '/data/restaurants.json',
  '/img/my_favicon.ico',
  '/img/1.jpg',
  '/img/2.jpg',
  '/img/3.jpg',
  '/img/4.jpg',
  '/img/5.jpg',
  '/img/6.jpg',
  '/img/7.jpg',
  '/img/8.jpg',
  '/img/9.jpg',
  '/img/10.jpg'
];

/**
 * Open the cache, and add resources to the cache when installing the service worker.
 */
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(function (cache) {
      return cache.addAll(urlsToCache)
        .catch(function (error) {
          console.log('installation failed: ' + error);
        });
    })
  );
});

/**
 * Find things in caches first; if maching failed then fetch from the internet.
 */
self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request, {
      ignoreSearch: true
    })
    .then(function (response) {
      return response || fetch(event.request)
        .catch(function (error) {
          console.log('fetching failed: ' + error);
        });
    })
  );
});