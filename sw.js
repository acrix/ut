
version = "0.7a";
cache_name = "ut_" + version;


app_shell_files = [

'./',
'favicon.ico',

"css/font_anonymous.css",
"css/font_open_sans.css",
"css/main.css",
"css/themes/default/jquery.mobile.min.css",
"css/themes/default/images/ajax-loader.gif",

"fonts/anonymous-pro-v14-latin-ext_latin_cyrillic-700.eot",
"fonts/anonymous-pro-v14-latin-ext_latin_cyrillic-700italic.eot",
"fonts/anonymous-pro-v14-latin-ext_latin_cyrillic-700italic.svg",
"fonts/anonymous-pro-v14-latin-ext_latin_cyrillic-700italic.ttf",
"fonts/anonymous-pro-v14-latin-ext_latin_cyrillic-700italic.woff",
"fonts/anonymous-pro-v14-latin-ext_latin_cyrillic-700italic.woff2",
"fonts/anonymous-pro-v14-latin-ext_latin_cyrillic-700.svg",
"fonts/anonymous-pro-v14-latin-ext_latin_cyrillic-700.ttf",
"fonts/anonymous-pro-v14-latin-ext_latin_cyrillic-700.woff",
"fonts/anonymous-pro-v14-latin-ext_latin_cyrillic-700.woff2",
"fonts/anonymous-pro-v14-latin-ext_latin_cyrillic-italic.eot",
"fonts/anonymous-pro-v14-latin-ext_latin_cyrillic-italic.svg",
"fonts/anonymous-pro-v14-latin-ext_latin_cyrillic-italic.ttf",
"fonts/anonymous-pro-v14-latin-ext_latin_cyrillic-italic.woff",
"fonts/anonymous-pro-v14-latin-ext_latin_cyrillic-italic.woff2",
"fonts/anonymous-pro-v14-latin-ext_latin_cyrillic-regular.eot",
"fonts/anonymous-pro-v14-latin-ext_latin_cyrillic-regular.svg",
"fonts/anonymous-pro-v14-latin-ext_latin_cyrillic-regular.ttf",
"fonts/anonymous-pro-v14-latin-ext_latin_cyrillic-regular.woff",
"fonts/anonymous-pro-v14-latin-ext_latin_cyrillic-regular.woff2",
"fonts/open-sans-v18-latin-ext_latin_cyrillic-ext_cyrillic-regular.eot",
"fonts/open-sans-v18-latin-ext_latin_cyrillic-ext_cyrillic-regular.svg",
"fonts/open-sans-v18-latin-ext_latin_cyrillic-ext_cyrillic-regular.ttf",
"fonts/open-sans-v18-latin-ext_latin_cyrillic-ext_cyrillic-regular.woff",
"fonts/open-sans-v18-latin-ext_latin_cyrillic-ext_cyrillic-regular.woff2",

"js/jquery.min.js",
"js/jquery.mobile.min.js",
"js/main.js",

"sounds/school-ring-2.wav",
"sounds/uprising3.wav",
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

