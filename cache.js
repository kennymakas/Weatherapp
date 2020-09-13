
const cacheName = 'v';


//call install Event
self.addEventListener('install', e =>{
    console.log('Service Worker: Installed')


});

// call activate Event
self.addEventListener('activate', e =>{
    console.log('Service Worker: Activated');
    //remove unwanted caches
    e.waitUntil(
        cache.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if(cach !== cacheName){
                        console.log('Service Worker: Cleaning Old cache');
                        return cacheas.delete(cache);
                    }
                })
            )
        })
    )
});

// call Fetch Event
self.addEventListener('fetch', e => {
    console.log('Service Worker: Fetching');
    e.respondWith(
        fetch(e.request)
        .then(res => {
            //make copy/clone of response
            const resClone = res.clone();
            //open cache
            caches
            .open(cacheName)
            .then(cache =>{
                //add response to cache
                cache.put(e.request, resClone);

            });
            return res;


        }).catch(err => caches.match(e.requst).then(res => res))
        );

})