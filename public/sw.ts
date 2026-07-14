import * as SerwistNext from "@serwist/next";
import { Serwist } from "serwist";

// Fix for __SW_MANIFEST error
declare interface ServiceWorkerGlobalScope {
	__SW_MANIFEST: string[];
}

declare const self: ServiceWorkerGlobalScope;
const defaultCache =
	(SerwistNext as any).defaultCache || (SerwistNext as any).default;

const serwist = new Serwist({
	precacheEntries: self.__SW_MANIFEST,
	runtimeCaching: [
		{
			matcher: ({ request }) => request.mode === "navigate",
			handler: "NetworkFirst",
			options: {
				cacheName: "navigations",
				expiration: {
					maxEntries: 50,
				},
			},
		},
		// Spread the default cache configurations
		...defaultCache,
	],
});

serwist.addEventListeners();
