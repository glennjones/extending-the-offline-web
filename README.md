# Extending the offline web - asyncjs talk

This repo contains material created for a talk
given at [async.js](http://www.meetup.com/London-JavaScript-Community/events/228773686/) on Thursday 23 June 2016.


### Install node app to run slide deck
* Install node.js
* Clone or download this repo to your local machine
* In a command line move to the projects parent directory
* `$ npm install`
* `$ node app`
* The slide website can then be accessed from http://localhost:3030/slides/
* The web worker code examples from http://localhost:3030/code/


# Reading and watching list

## Offline
* [Jake Archibald IO2016 talk](https://www.youtube.com/watch?v=cmGr0RszHc8&index=17&list=PLNYkxOF6rcIDz1TzmmMRBC-kd8zPRTQIP) - outline what can current be achived with Service Workers
* [Ben Kelly PWASummit slides](https://blog.wanderview.com/slides-pwa-summit-2016) - Support for progressive web apps in Firefox
* [Andreas Bovens PWASummit slides](https://www.youtube.com/watch?v=yMxQ0fhj89I&list=PLNYkxOF6rcIAWWNR_Q6eLPhsyx6VvYjVb) - Opera's Perspective


## Push
* [Pete LePage IO2016 talk](https://www.youtube.com/watch?v=_dXBibRO0SM&index=20&list=PLNYkxOF6rcIDz1TzmmMRBC-kd8zPRTQIP) - user engagement with web push notifications


## UX, design and research
* [Tal Oppenheimer PWASummit talk](https://www.youtube.com/watch?v=kxE4bLSC-xw&index=18&list=PLNYkxOF6rcIAWWNR_Q6eLPhsyx6VvYjVb) - designing for emerging markets
* [Thao Tran PWASummit talk](https://youtu.be/9Jef9IluQw0?t=15m30s) - mobile landscape
* [Nate Schloss IO2016 talk](https://youtu.be/fGTUIlEM0m8?t=20m58s) - Facebook's UX learning for web Push
* [Progressively less progressive](https://trib.tv/2016/06/05/progressively-less-progressive/) - Andrew Betts blog post on state of PWA
* [Progressive web apps and our regressive approach](https://www.christianheilmann.com/2016/05/31/progressive-web-apps-and-our-regressive-approach/) - Christian Heilmann blog post


## Data and sync
* Beyond progressive web apps [part1](http://hood.ie/blog/beyond-progressive-web-apps-part-1.html), [part2](http://hood.ie/blog/beyond-progressive-web-apps-part-2.html) and [part3](http://hood.ie/blog/beyond-progressive-web-apps-part-3.html)


## Case studies
* [Googles case studies](https://developers.google.com/web/showcase/)


## Sites
* [PWA rocks](https://pwa.rocks/) - Lists example progressive web apps sites
* [IO2016](https://events.google.com/io2016/) - Offline conference website
* [Washington Post](https://www.washingtonpost.com/pwa/) - Offline web app with fast render speed
* [Aliexpress](https://m.aliexpress.com/) - Offline web app only on mobile UA
* [Telegram](https://web.telegram.org) - Offline messaging app.
* [Pokedex](https://www.pokedex.org/) - Demo of webapp with Service Worker, PouchDB, virtual-dom, and web workers by Nolan Lawson
* [Wiki offline](https://wiki-offline.jakearchibald.com/) - Demo by Jake Archibald
* [Trained to thrill](https://jakearchibald.github.io/trained-to-thrill/) - Demo by Jake Archibald


## Resources
* [The Service Worker Cookbook](https://serviceworke.rs/) -  Mozilla's collection of working, practical examples of using service workers
* [Offline cookbook](https://jakearchibald.com/2014/offline-cookbook/) - Jake Archibald list of examples
* [Is service worker ready](https://jakearchibald.github.io/isserviceworkerready/) - Browser compatibility
* [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) - MDN API reference
* [Chrome dev](https://developers.google.com/web/tools/service-worker-libraries/?hl=en)
* [Introducing Pokedex.org](http://www.pocketjavascript.com/blog/2015/11/23/introducing-pokedex-org) - Blog post Nolan Lawson on how he built Pokedex webapp
* [Progressive Web App Summit 2016](https://www.youtube.com/playlist?list=PLNYkxOF6rcIAWWNR_Q6eLPhsyx6VvYjVb) - playlist on youtube
* [Web and Chrome at Google I/O 2016](https://www.youtube.com/playlist?list=PLNYkxOF6rcIDz1TzmmMRBC-kd8zPRTQIP) - playlist on youtube


## Tools and libraries
* [ManifeStation](https://webmanife.st/) - automatically build web app manifest from web page metadata
* [upup](https://www.talater.com/upup/) - simple library offline.html page to your site
* [Lighthouse](https://github.com/GoogleChrome/lighthouse) - Chrome, tools forauditing and performance metrics for Progressive Web Apps
* [sw-precache](https://github.com/GoogleChrome/sw-precache) - Chrome, a module for generating a service worker that precaches resources
* [sw-toolbox](https://github.com/GoogleChrome/sw-toolbox) - Chrome, a library provides common caching patterns
* [sw-helpers](https://github.com/GoogleChrome/sw-helpers) - Chrome, a collection of libraries that help enhance your existing service worker
* [Lunr.js](http://lunrjs.com/) - offline free text search
* [Nedb](https://github.com/louischatriot/nedb) - the query engine from nedb<br></li>
* [Geolib](https://github.com/manuelbieh/Geolib) - nearby search</li>
* [LocalForage](https://github.com/mozilla/localForage) - data persistence<br></li>
* [Elasticlunr](http://elasticlunr.com/) - Extended faster version of lunr.js
* [IndexedDB Promised](https://github.com/jakearchibald/indexeddb-promised) - Promises wrap of indexdb
* [Dixie.js](http://dexie.org/) - Wrapper for indexdb
* [Pouchdb](https://pouchdb.com/) - Universal db with sync
* [Hoodie](http://hood.ie/) - Offline-first architecture for web apps
* [Pusher](https://github.com/pusher/pusher-js) - Realtime messaging (SaaS)
* [Firebase](https://firebase.google.com/) - Realtime messaging and synced db (SaaS)


## Streams
* [Jake Archibald PWASummit talk](https://www.youtube.com/watch?v=qDJAz3IIq18&list=PLNYkxOF6rcIAWWNR_Q6eLPhsyx6VvYjVb&index=3) - advanced use of streams with Service Workers
* [Streaming template literals](https://jakearchibald.com/2016/streaming-template-literals/) - advanced topic on streams and tmeplates