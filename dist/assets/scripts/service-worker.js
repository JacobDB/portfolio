!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=24)}([function(e,t,n){"use strict";var r=n(2),o=n(5),i=n(1),c=n(30),a=n(35);i.debug("Service Worker Toolbox is loading"),self.addEventListener("install",a.installListener),self.addEventListener("activate",a.activateListener),self.addEventListener("fetch",a.fetchListener),e.exports={networkOnly:c.networkOnly,networkFirst:c.networkFirst,cacheOnly:c.cacheOnly,cacheFirst:c.cacheFirst,fastest:c.fastest,router:o,options:r,cache:i.cache,uncache:i.uncache,precache:i.precache}},function(e,t,n){"use strict";var r,o=n(2),i=n(29);function c(e,t){((t=t||{}).debug||o.debug)&&console.log("[sw-toolbox] "+e)}function a(e){var t;return e&&e.cache&&(t=e.cache.name),t=t||o.cache.name,caches.open(t)}function u(e){var t=Array.isArray(e);if(t&&e.forEach(function(e){"string"==typeof e||e instanceof Request||(t=!1)}),!t)throw new TypeError("The precache method expects either an array of strings and/or Requests or a Promise that resolves to an array of strings and/or Requests.");return e}e.exports={debug:c,fetchAndCache:function(e,t){var n=(t=t||{}).successResponses||o.successResponses;return fetch(e.clone()).then(function(u){return"GET"===e.method&&n.test(u.status)&&a(t).then(function(n){n.put(e,u).then(function(){var a=t.cache||o.cache;(a.maxEntries||a.maxAgeSeconds)&&a.name&&function(e,t,n){var o=function(e,t,n){var r=e.url,o=n.maxAgeSeconds,a=n.maxEntries,u=n.name,s=Date.now();return c("Updating LRU order for "+r+". Max entries is "+a+", max age is "+o),i.getDb(u).then(function(e){return i.setTimestampForUrl(e,r,s)}).then(function(e){return i.expireEntries(e,a,o,s)}).then(function(e){c("Successfully updated IDB.");var n=e.map(function(e){return t.delete(e)});return Promise.all(n).then(function(){c("Done with cache cleanup.")})}).catch(function(e){c(e)})}.bind(null,e,t,n);r=r?r.then(o):o()}(e,n,a)})}),u.clone()})},openCache:a,renameCache:function(e,t,n){return c("Renaming cache: ["+e+"] to ["+t+"]",n),caches.delete(t).then(function(){return Promise.all([caches.open(e),caches.open(t)]).then(function(t){var n=t[0],r=t[1];return n.keys().then(function(e){return Promise.all(e.map(function(e){return n.match(e).then(function(t){return r.put(e,t)})}))}).then(function(){return caches.delete(e)})})})},cache:function(e,t){return a(t).then(function(t){return t.add(e)})},uncache:function(e,t){return a(t).then(function(t){return t.delete(e)})},precache:function(e){e instanceof Promise||u(e),o.preCacheItems=o.preCacheItems.concat(e)},validatePrecacheInput:u,isResponseFresh:function(e,t,n){if(!e)return!1;if(t){var r=e.headers.get("date");if(r&&new Date(r).getTime()+1e3*t<n)return!1}return!0}}},function(e,t,n){"use strict";var r;r=self.registration?self.registration.scope:self.scope||new URL("./",self.location).href,e.exports={cache:{name:"$$$toolbox-cache$$$"+r+"$$$",maxAgeSeconds:null,maxEntries:null},debug:!1,networkTimeoutSeconds:null,preCacheItems:[],successResponses:/^0|([123]\d\d)|(40[14567])|410$/}},,,function(e,t,n){"use strict";var r=n(26),o=n(1);var i=function(e,t){for(var n=e.entries(),r=n.next(),o=[];!r.done;){new RegExp(r.value[0]).test(t)&&o.push(r.value[1]),r=n.next()}return o},c=function(){this.routes=new Map,this.routes.set(RegExp,new Map),this.default=null};["get","post","put","delete","head","any"].forEach(function(e){c.prototype[e]=function(t,n,r){return this.add(e,t,n,r)}}),c.prototype.add=function(e,t,n,i){var c;i=i||{},c=t instanceof RegExp?RegExp:(c=i.origin||self.location.origin)instanceof RegExp?c.source:c.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&"),e=e.toLowerCase();var a=new r(e,t,n,i);this.routes.has(c)||this.routes.set(c,new Map);var u=this.routes.get(c);u.has(e)||u.set(e,new Map);var s=u.get(e),f=a.regexp||a.fullUrlRegExp;s.has(f.source)&&o.debug('"'+t+'" resolves to same regex as existing route.'),s.set(f.source,a)},c.prototype.matchMethod=function(e,t){var n=new URL(t),r=n.origin,o=n.pathname;return this._match(e,i(this.routes,r),o)||this._match(e,[this.routes.get(RegExp)],t)},c.prototype._match=function(e,t,n){if(0===t.length)return null;for(var r=0;r<t.length;r++){var o=t[r],c=o&&o.get(e.toLowerCase());if(c){var a=i(c,n);if(a.length>0)return a[0].makeHandler(n)}}return null},c.prototype.match=function(e){return this.matchMethod(e.method,e.url)||this.matchMethod("any",e.url)},e.exports=new c},function(e,t,n){"use strict";var r=n(2),o=n(1);e.exports=function(e,t,n){return n=n||{},o.debug("Strategy: cache only ["+e.url+"]",n),o.openCache(n).then(function(t){return t.match(e).then(function(e){var t=n.cache||r.cache,i=Date.now();if(o.isResponseFresh(e,t.maxAgeSeconds,i))return e})})}},,,,,,,,,,,,,,,,,,function(e,t,n){e.exports=n(25)},function(e,t,n){"use strict";n.r(t);var r,o=n(0),i=n.n(o);(r=self).addEventListener("install",function(e){return e.waitUntil(r.skipWaiting())}),r.addEventListener("activate",function(e){return e.waitUntil(r.clients.claim())}),i.a.precache(["/","/offline/"]),i.a.router.get("/assets/media/*",i.a.cacheFirst),i.a.router.get("/*",i.a.networkFirst,{NetworkTimeoutSeconds:5}),i.a.router.get("/(.*)",function(e,t,n){return i.a.networkFirst(e,t,n).catch(function(r){if("GET"===e.method&&e.headers.get("accept").includes("text/html"))return i.a.cacheOnly(new Request("/offline/"),t,n);throw r})})},function(e,t,n){"use strict";var r=new URL("./",self.location).pathname,o=n(27),i=function(e,t,n,i){t instanceof RegExp?this.fullUrlRegExp=t:(0!==t.indexOf("/")&&(t=r+t),this.keys=[],this.regexp=o(t,this.keys)),this.method=e,this.options=i,this.handler=n};i.prototype.makeHandler=function(e){var t;if(this.regexp){var n=this.regexp.exec(e);t={},this.keys.forEach(function(e,r){t[e.name]=n[r+1]})}return function(e){return this.handler(e,t,this.options)}.bind(this)},e.exports=i},function(e,t,n){function r(e){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var o=n(28);e.exports=d,e.exports.parse=c,e.exports.compile=function(e,t){return u(c(e,t))},e.exports.tokensToFunction=u,e.exports.tokensToRegExp=p;var i=new RegExp(["(\\\\.)","([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"].join("|"),"g");function c(e,t){for(var n,r=[],o=0,c=0,a="",u=t&&t.delimiter||"/";null!=(n=i.exec(e));){var h=n[0],l=n[1],p=n.index;if(a+=e.slice(c,p),c=p+h.length,l)a+=l[1];else{var d=e[c],m=n[2],g=n[3],v=n[4],x=n[5],w=n[6],y=n[7];a&&(r.push(a),a="");var b=null!=m&&null!=d&&d!==m,E="+"===w||"*"===w,R="?"===w||"*"===w,S=n[2]||u,k=v||x;r.push({name:g||o++,prefix:m||"",delimiter:S,optional:R,repeat:E,partial:b,asterisk:!!y,pattern:k?f(k):y?".*":"[^"+s(S)+"]+?"})}}return c<e.length&&(a+=e.substr(c)),a&&r.push(a),r}function a(e){return encodeURI(e).replace(/[\/?#]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function u(e){for(var t=new Array(e.length),n=0;n<e.length;n++)"object"===r(e[n])&&(t[n]=new RegExp("^(?:"+e[n].pattern+")$"));return function(n,r){for(var i="",c=n||{},u=(r||{}).pretty?a:encodeURIComponent,s=0;s<e.length;s++){var f=e[s];if("string"!=typeof f){var h,l=c[f.name];if(null==l){if(f.optional){f.partial&&(i+=f.prefix);continue}throw new TypeError('Expected "'+f.name+'" to be defined')}if(o(l)){if(!f.repeat)throw new TypeError('Expected "'+f.name+'" to not repeat, but received `'+JSON.stringify(l)+"`");if(0===l.length){if(f.optional)continue;throw new TypeError('Expected "'+f.name+'" to not be empty')}for(var p=0;p<l.length;p++){if(h=u(l[p]),!t[s].test(h))throw new TypeError('Expected all "'+f.name+'" to match "'+f.pattern+'", but received `'+JSON.stringify(h)+"`");i+=(0===p?f.prefix:f.delimiter)+h}}else{if(h=f.asterisk?encodeURI(l).replace(/[?#]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()}):u(l),!t[s].test(h))throw new TypeError('Expected "'+f.name+'" to match "'+f.pattern+'", but received "'+h+'"');i+=f.prefix+h}}else i+=f}return i}}function s(e){return e.replace(/([.+*?=^!:${}()[\]|\/\\])/g,"\\$1")}function f(e){return e.replace(/([=!:$\/()])/g,"\\$1")}function h(e,t){return e.keys=t,e}function l(e){return e.sensitive?"":"i"}function p(e,t,n){o(t)||(n=t||n,t=[]);for(var r=(n=n||{}).strict,i=!1!==n.end,c="",a=0;a<e.length;a++){var u=e[a];if("string"==typeof u)c+=s(u);else{var f=s(u.prefix),p="(?:"+u.pattern+")";t.push(u),u.repeat&&(p+="(?:"+f+p+")*"),c+=p=u.optional?u.partial?f+"("+p+")?":"(?:"+f+"("+p+"))?":f+"("+p+")"}}var d=s(n.delimiter||"/"),m=c.slice(-d.length)===d;return r||(c=(m?c.slice(0,-d.length):c)+"(?:"+d+"(?=$))?"),c+=i?"$":r&&m?"":"(?="+d+"|$)",h(new RegExp("^"+c,l(n)),t)}function d(e,t,n){return o(t)||(n=t||n,t=[]),n=n||{},e instanceof RegExp?function(e,t){var n=e.source.match(/\((?!\?)/g);if(n)for(var r=0;r<n.length;r++)t.push({name:r,prefix:null,delimiter:null,optional:!1,repeat:!1,partial:!1,asterisk:!1,pattern:null});return h(e,t)}(e,t):o(e)?function(e,t,n){for(var r=[],o=0;o<e.length;o++)r.push(d(e[o],t,n).source);return h(new RegExp("(?:"+r.join("|")+")",l(n)),t)}(e,t,n):function(e,t,n){return p(c(e,n),t,n)}(e,t,n)}},function(e,t){e.exports=Array.isArray||function(e){return"[object Array]"==Object.prototype.toString.call(e)}},function(e,t,n){"use strict";var r="sw-toolbox-",o=1,i="store",c="url",a="timestamp",u={};e.exports={getDb:function(e){return e in u||(u[e]=function(e){return new Promise(function(t,n){var u=indexedDB.open(r+e,o);u.onupgradeneeded=function(){u.result.createObjectStore(i,{keyPath:c}).createIndex(a,a,{unique:!1})},u.onsuccess=function(){t(u.result)},u.onerror=function(){n(u.error)}})}(e)),u[e]},setTimestampForUrl:function(e,t,n){return new Promise(function(r,o){var c=e.transaction(i,"readwrite");c.objectStore(i).put({url:t,timestamp:n}),c.oncomplete=function(){r(e)},c.onabort=function(){o(c.error)}})},expireEntries:function(e,t,n,r){return function(e,t,n){return t?new Promise(function(r,o){var u=1e3*t,s=[],f=e.transaction(i,"readwrite"),h=f.objectStore(i);h.index(a).openCursor().onsuccess=function(e){var t=e.target.result;if(t&&n-u>t.value[a]){var r=t.value[c];s.push(r),h.delete(r),t.continue()}},f.oncomplete=function(){r(s)},f.onabort=o}):Promise.resolve([])}(e,n,r).then(function(n){return function(e,t){return t?new Promise(function(n,r){var o=[],u=e.transaction(i,"readwrite"),s=u.objectStore(i),f=s.index(a),h=f.count();f.count().onsuccess=function(){var e=h.result;e>t&&(f.openCursor().onsuccess=function(n){var r=n.target.result;if(r){var i=r.value[c];o.push(i),s.delete(i),e-o.length>t&&r.continue()}})},u.oncomplete=function(){n(o)},u.onabort=r}):Promise.resolve([])}(e,t).then(function(e){return n.concat(e)})})}}},function(e,t,n){e.exports={networkOnly:n(31),networkFirst:n(32),cacheOnly:n(6),cacheFirst:n(33),fastest:n(34)}},function(e,t,n){"use strict";var r=n(1);e.exports=function(e,t,n){return r.debug("Strategy: network only ["+e.url+"]",n),fetch(e)}},function(e,t,n){"use strict";var r=n(2),o=n(1);e.exports=function(e,t,n){var i=(n=n||{}).successResponses||r.successResponses,c=n.networkTimeoutSeconds||r.networkTimeoutSeconds;return o.debug("Strategy: network first ["+e.url+"]",n),o.openCache(n).then(function(t){var a,u,s=[];if(c){var f=new Promise(function(i){a=setTimeout(function(){t.match(e).then(function(e){var t=n.cache||r.cache,c=Date.now(),a=t.maxAgeSeconds;o.isResponseFresh(e,a,c)&&i(e)})},1e3*c)});s.push(f)}var h=o.fetchAndCache(e,n).then(function(e){if(a&&clearTimeout(a),i.test(e.status))return e;throw o.debug("Response was an HTTP error: "+e.statusText,n),u=e,new Error("Bad response")}).catch(function(r){return o.debug("Network or response error, fallback to cache ["+e.url+"]",n),t.match(e).then(function(e){if(e)return e;if(u)return u;throw r})});return s.push(h),Promise.race(s)})}},function(e,t,n){"use strict";var r=n(2),o=n(1);e.exports=function(e,t,n){return n=n||{},o.debug("Strategy: cache first ["+e.url+"]",n),o.openCache(n).then(function(t){return t.match(e).then(function(t){var i=n.cache||r.cache,c=Date.now();return o.isResponseFresh(t,i.maxAgeSeconds,c)?t:o.fetchAndCache(e,n)})})}},function(e,t,n){"use strict";var r=n(1),o=n(6);e.exports=function(e,t,n){return r.debug("Strategy: fastest ["+e.url+"]",n),new Promise(function(i,c){var a=!1,u=[],s=function(e){u.push(e.toString()),a?c(new Error('Both cache and network failed: "'+u.join('", "')+'"')):a=!0},f=function(e){e instanceof Response?i(e):s("No result returned")};r.fetchAndCache(e.clone(),n).then(f,s),o(e,t,n).then(f,s)})}},function(e,t,n){"use strict";n(36);var r=n(1),o=n(5),i=n(2);function c(e){return e.reduce(function(e,t){return e.concat(t)},[])}e.exports={fetchListener:function(e){var t=o.match(e.request);t?e.respondWith(t(e.request)):o.default&&"GET"===e.request.method&&0===e.request.url.indexOf("http")&&e.respondWith(o.default(e.request))},activateListener:function(e){r.debug("activate event fired");var t=i.cache.name+"$$$inactive$$$";e.waitUntil(r.renameCache(t,i.cache.name))},installListener:function(e){var t=i.cache.name+"$$$inactive$$$";r.debug("install event fired"),r.debug("creating cache ["+t+"]"),e.waitUntil(r.openCache({cache:{name:t}}).then(function(e){return Promise.all(i.preCacheItems).then(c).then(r.validatePrecacheInput).then(function(t){return r.debug("preCache list: "+(t.join(", ")||"(none)")),e.addAll(t)})}))}}},function(e,t){!function(){var e=Cache.prototype.addAll,t=navigator.userAgent.match(/(Firefox|Chrome)\/(\d+\.)/);if(t)var n=t[1],r=parseInt(t[2]);e&&(!t||"Firefox"===n&&r>=46||"Chrome"===n&&r>=50)||(Cache.prototype.addAll=function(e){var t=this;function n(e){this.name="NetworkError",this.code=19,this.message=e}return n.prototype=Object.create(Error.prototype),Promise.resolve().then(function(){if(arguments.length<1)throw new TypeError;return e=e.map(function(e){return e instanceof Request?e:String(e)}),Promise.all(e.map(function(e){"string"==typeof e&&(e=new Request(e));var t=new URL(e.url).protocol;if("http:"!==t&&"https:"!==t)throw new n("Invalid scheme");return fetch(e.clone())}))}).then(function(r){if(r.some(function(e){return!e.ok}))throw new n("Incorrect response status");return Promise.all(r.map(function(n,r){return t.put(e[r],n)}))}).then(function(){})},Cache.prototype.add=function(e){return this.addAll([e])})}()}]);