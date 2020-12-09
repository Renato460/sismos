const APP_SHELL=[
    
    "index.html",
    "vendor/fontawesome/css/all.min.css",
    "css/style.css",
    "js/init.js"
    
];

const APP_SHELL_INMUTABLE=[
    "https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css",
    "https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js",
    "https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js",
    "vendor/v6.4.3-dist/ol.css",
    "vendor/v6.4.3-dist/ol.js"
];
const CACHE_ESTATICO= "estatico-v1";
const CACHE_INMUTABLE= "inmutable-v1";

self.addEventListener("install", e=>{
    const cacheStatic = caches.open(CACHE_ESTATICO).then(cache=>cache.addAll(APP_SHELL));
    const cacheInmutable = caches.open(CACHE_INMUTABLE).then(cache=>cache.addAll(APP_SHELL_INMUTABLE));
    e.waitUntil(Promise.all([cacheStatic,cacheInmutable]));
});

self.addEventListener('activate',e=>{
    console.log("Activado");
});

self.addEventListener('fetch',e=>{
    const respuesta = caches.match(e.request).then(res=>{
        if(res && !e.request.url.includes("/api")){
            return res;
        }else{
            const petInternet= fetch(e.request).then(newRes=>{
                if (newRes.ok || newRes.type == 'opaque') {
                    return caches.open("dinamico-v1").then(cache=>{
                        cache.put(e.request, newRes.clone());
                        return newRes.clone();
                    });
                }else{
                    return newRes;
                }
            }).catch(error=>caches.match(e.request));
            return petInternet;
        }
    });
    e.respondWith(respuesta);
});