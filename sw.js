const CACHE_ELEMENTS = [
	"./",
	"./src/App.jsx",
	"./src/main.jsx",
	"./src/index.css",
	"./src/normalize.css",
	"./src/actions/noteActions.js",
	"./src/actions/notesActions.js",
	"./src/components/Header.jsx",
	"./src/components/Main.jsx",
	"./src/components/NoteApp.jsx",
	"./src/components/NoteArticle.jsx",
	"./src/components/NotesAside.jsx",
	"./src/context/NotesContext.jsx",
	"./src/hooks/useIndexedDB.js",
	"./src/reducers/noteReducer.js",
	"./src/reducers/notesReducer.js",
	"https://kit.fontawesome.com/616b47b852.js",
];

const CACHE_NAME = "v1_cache_notas";

self.addEventListener("install", (e) => {
	e.waitUntil(
		caches.open(CACHE_NAME).then((cache) => {
			cache
				.addAll(CACHE_ELEMENTS)
				.then(() => {
					self.skipWaiting();
				})
				.catch(console.log);
		}),
	);
});

self.addEventListener("activate", (e) => {
	const cacheWhiteList = [CACHE_NAME];

	e.waitUntil(
		caches
			.keys()
			.then((cachesNames) => {
				return Promise.all(
					cachesNames.map((cacheName) => {
						return (
							cacheWhiteList.indexOf(cacheName) === -1 &&
							caches.delete(cacheName)
						);
					}),
				);
			})
			.then(() => self.clients.claim()),
	);
});

self.addEventListener("fetch", (e) => {
	e.respondWith(
		caches.match(e.request).then((res) => {
			if (res) return res;

			return fetch(e.request);
		}),
	);
});
