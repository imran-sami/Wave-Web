const C="wave-v31",A=["./","./index.html","./manifest.webmanifest","./icon-192.png","./icon-512.png","./icon-maskable-192.png","./icon-maskable-512.png"];
/* strip the "redirected" flag so a cached page can be served for navigations */
const clean=async r=>{if(!r||!r.redirected)return r;const b=await r.blob();return new Response(b,{status:r.status,statusText:r.statusText,headers:r.headers})};
self.addEventListener("install",e=>{e.waitUntil((async()=>{const c=await caches.open(C);for(const u of A){try{const r=await fetch(new Request(u,{cache:"reload"}));if(r.ok)await c.put(u,await clean(r))}catch(x){}}self.skipWaiting()})())});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
/* network first (always asks the server if the file changed, so GitHub's 10 minute cache never shows an old version), cache is the offline fallback. Media never goes through here (it is played from blob: URLs). */
self.addEventListener("fetch",e=>{
 const q=e.request;
 if(q.method!=="GET"||!q.url.startsWith(self.location.origin))return;
 e.respondWith((async()=>{
  try{
   const n=await fetch(q.mode==="navigate"?new Request(q.url,{cache:"no-cache",redirect:"manual",credentials:"same-origin"}):new Request(q.url,{cache:"no-cache"}));
   if(n.ok&&n.status===200&&!n.redirected){const c=n.clone();caches.open(C).then(x=>x.put(q,c)).catch(()=>{})}
   return n;
  }catch(err){
   const r=await caches.match(q,{ignoreSearch:true});
   if(r)return r;
   if(q.mode==="navigate")return (await caches.match("./index.html"))||(await caches.match("./"))||Response.error();
   return Response.error();
  }
 })());
});
