
version = "2.0";
cache_name = "ut_" + version;


app_shell_files = [

"css/main.css",
"css/theme.css",

"images/icons/icon1-256.png",
"images/icons/icon1-512.png",

"js/main.js",
"js/zapto.min.js",

"sounds/school-ring-2.wav",
"sounds/uprising3.wav",

'favicon.ico',
'index.html',

]


self.addEventListener('install', (event)=> {
  console.log('[Service Worker] Install Start');
  event.waitUntil(
    caches.open(cache_name).then( (cache)=> {
      return cache.addAll(app_shell_files);
    })
  );
  console.log('[Service Worker] Install Done');
});


self.addEventListener('fetch', (event)=> {
  event.respondWith(
    caches.match(event.request).then( (response)=> {
      return response || fetch(event.request).then( (response)=> { return response; } );
    })
  );
});

self.addEventListener('activate', (event)=> {
  event.waitUntil(
    caches.keys().then( (keyList)=> {
      return Promise.all( keyList.map( (key)=> { if(key !== cache_name) { return caches.delete(key); } } ) );
    })
  );
});

