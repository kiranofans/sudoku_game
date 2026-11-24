const CACHE_NAME = 'sudokuplays-v1.0.0';
const PRECACHE_ASSETS = ['/', '/manifest.json'];

self.addEventListener('install', (event) => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_ASSETS))
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys()
            .then((keys) =>
                Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
            )
            .then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (event) => {
    if (event.request.method !== 'GET') return;

    const url = new URL(event.request.url);
    if (url.origin !== self.location.origin) return;

    if (event.request.mode === 'navigate') {
        event.respondWith(
            (async () => {
                try {
                    const response = await fetch(event.request);
                    if (response.ok) {
                        const copy = response.clone();
                        event.waitUntil(
                            caches.open(CACHE_NAME).then((c) => c.put(event.request, copy))
                        );
                    }
                    return response;
                } catch {
                    const cached = await caches.match(event.request, { ignoreSearch: true });
                    return cached || caches.match('/');
                }
            })()
        );
        return;
    }

    event.respondWith(
        caches.match(event.request).then((cached) => {
            if (cached) return cached;
            return fetch(event.request).then((res) => {
                if (res && res.status === 200) {
                    const copy = res.clone();
                    event.waitUntil(caches.open(CACHE_NAME).then((c) => c.put(event.request, copy)));
                }
                return res;
            });
        })
    );
});