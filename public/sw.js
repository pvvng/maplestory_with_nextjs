if(!self.define){let e,s={};const n=(n,t)=>(n=new URL(n+".js",t).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(t,i)=>{const a=e||("document"in self?document.currentScript.src:"")||location.href;if(s[a])return;let c={};const r=e=>n(e,a),o={module:{uri:a},exports:c,require:r};s[a]=Promise.all(t.map((e=>o[e]||r(e)))).then((e=>(i(...e),c)))}}define(["./workbox-4754cb34"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/MapleStory.SVG.png",revision:"94793a6d3efd362943e2b252c9d42cbf"},{url:"/_next/app-build-manifest.json",revision:"e50579b108d642d33e7a6efb1b69b6e0"},{url:"/_next/static/KUKYCJrwsT3WTPnGGxeEj/_buildManifest.js",revision:"10ded5eb4c67eb00386a6c398138887a"},{url:"/_next/static/KUKYCJrwsT3WTPnGGxeEj/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/15-737f6aa450d0422c.js",revision:"KUKYCJrwsT3WTPnGGxeEj"},{url:"/_next/static/chunks/165-4484d5bbeb5121c5.js",revision:"KUKYCJrwsT3WTPnGGxeEj"},{url:"/_next/static/chunks/236-bf7d68adc715e61d.js",revision:"KUKYCJrwsT3WTPnGGxeEj"},{url:"/_next/static/chunks/473-e4f665349e4e798e.js",revision:"KUKYCJrwsT3WTPnGGxeEj"},{url:"/_next/static/chunks/494-28912d61bb20bc02.js",revision:"KUKYCJrwsT3WTPnGGxeEj"},{url:"/_next/static/chunks/566-e57ee47a9bb6ce2d.js",revision:"KUKYCJrwsT3WTPnGGxeEj"},{url:"/_next/static/chunks/61-46fd43988f1f57b2.js",revision:"KUKYCJrwsT3WTPnGGxeEj"},{url:"/_next/static/chunks/78-c1243fabad1232d6.js",revision:"KUKYCJrwsT3WTPnGGxeEj"},{url:"/_next/static/chunks/794-4331564f33c29d52.js",revision:"KUKYCJrwsT3WTPnGGxeEj"},{url:"/_next/static/chunks/870fdd6f-44c5da04b6bfc89f.js",revision:"KUKYCJrwsT3WTPnGGxeEj"},{url:"/_next/static/chunks/883-ff2d87a53090bd9b.js",revision:"KUKYCJrwsT3WTPnGGxeEj"},{url:"/_next/static/chunks/996.e771f8e62b6360ba.js",revision:"e771f8e62b6360ba"},{url:"/_next/static/chunks/997.764c5eabe502b229.js",revision:"764c5eabe502b229"},{url:"/_next/static/chunks/app/_not-found/page-a7b23d149d41580e.js",revision:"KUKYCJrwsT3WTPnGGxeEj"},{url:"/_next/static/chunks/app/album/%5Balbum%5D/%5Btitle%5D/page-13e918d474b7cbe5.js",revision:"KUKYCJrwsT3WTPnGGxeEj"},{url:"/_next/static/chunks/app/album/%5Balbum%5D/page-ee951aa9417e3dcc.js",revision:"KUKYCJrwsT3WTPnGGxeEj"},{url:"/_next/static/chunks/app/layout-4b2c8527aeae9c4b.js",revision:"KUKYCJrwsT3WTPnGGxeEj"},{url:"/_next/static/chunks/app/mypage/%5Balbum%5D/%5Btitle%5D/page-9b8123308fc4e4eb.js",revision:"KUKYCJrwsT3WTPnGGxeEj"},{url:"/_next/static/chunks/app/mypage/page-bc1cc88f1f2c73ce.js",revision:"KUKYCJrwsT3WTPnGGxeEj"},{url:"/_next/static/chunks/app/page-9b373e5e1fe4a9e2.js",revision:"KUKYCJrwsT3WTPnGGxeEj"},{url:"/_next/static/chunks/fd9d1056-7a26631bf0d618da.js",revision:"KUKYCJrwsT3WTPnGGxeEj"},{url:"/_next/static/chunks/framework-f66176bb897dc684.js",revision:"KUKYCJrwsT3WTPnGGxeEj"},{url:"/_next/static/chunks/main-app-314e1cf1f1e4e135.js",revision:"KUKYCJrwsT3WTPnGGxeEj"},{url:"/_next/static/chunks/main-c684b65c61f14c81.js",revision:"KUKYCJrwsT3WTPnGGxeEj"},{url:"/_next/static/chunks/pages/_app-1ae6559f56b4c378.js",revision:"KUKYCJrwsT3WTPnGGxeEj"},{url:"/_next/static/chunks/pages/_error-03cd5fbce6401828.js",revision:"KUKYCJrwsT3WTPnGGxeEj"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-491309ed903e5ea2.js",revision:"KUKYCJrwsT3WTPnGGxeEj"},{url:"/_next/static/css/c2df22b476ddef56.css",revision:"c2df22b476ddef56"},{url:"/_next/static/css/d3df112486f97f47.css",revision:"d3df112486f97f47"},{url:"/icon512_maskable.png",revision:"d0d541da8eeefed93b5b5004aee700d9"},{url:"/icon512_rounded.png",revision:"b96ddc3e1f717ed049344d39d7161deb"},{url:"/manifest.json",revision:"4b14b869f8d5d2838636f7dd0e487736"},{url:"/maplestory-icon.png",revision:"eb1cbe2481625704f121f7cfa4c7791a"},{url:"/톤암.png",revision:"cff55c4ce8ad26be1fac0a86f0260d82"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:t})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
