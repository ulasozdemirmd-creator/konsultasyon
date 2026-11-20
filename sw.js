/* AŞEAH Konsültasyon Asistanı – service worker
   Yeni sürüm yayınlarken VERSION değerini index.html içindeki APP_VERSION ile aynı yapın. */
const VERSION = '1.1.0';
const CACHE = 'aseah-konsultasyon-' + VERSION;
const ASSETS = ['./','./index.html','./manifest.webmanifest','./icons/icon-192.png','./icons/icon-512.png','./icons/icon-maskable-512.png','./icons/apple-touch-icon.png','./icons/favicon-32.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS))); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k.startsWith('aseah-konsultasyon-') && k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('message', e => { if (e.data === 'SKIP_WAITING') self.skipWaiting(); });
// Yalnız uygulama dosyaları önbellekten sunulur; PubMed gibi dış istekler doğrudan ağa gider. Hasta verisi önbelleğe alınmaz (IndexedDB'de durur).
self.addEventListener('fetch', e => {
  const req = e.request; if (req.method !== 'GET') return;
  const url = new URL(req.url); if (url.origin !== self.location.origin) return;
  if (req.mode === 'navigate') { e.respondWith(caches.match('./index.html').then(r => r || fetch(req))); return; }
  e.respondWith(caches.match(req, { ignoreSearch: true }).then(r => r || fetch(req)));
});
