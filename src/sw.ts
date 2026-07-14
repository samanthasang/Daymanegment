// public/sw.js
const CACHE_NAME = "mountains-v1";
const OFFLINE_URL = "/offline";

// Only cache static assets during install (not dynamic routes)
const STATIC_ASSETS = [
	"/",
	"/offline",
	"/manifest.json",
	"/assets/icons/icon-48x48.png",
	"/assets/icons/icon-72x72.png",
	"/assets/icons/icon-96x96.png",
	"/assets/icons/icon-128x128.png",
	"/assets/icons/icon-144x144.png",
	"/assets/icons/icon-152x152.png",
	"/assets/icons/icon-192x192.png",
	"/assets/icons/icon-256x256.png",
	"/assets/icons/icon-384x384.png",
	"/assets/icons/icon-512x512.png",
];
import { defaultCache } from "@serwist/next/worker";
import { Serwist } from "serwist";
import type { PrecacheEntry } from "serwist";

declare const self: ServiceWorkerGlobalScope & {
	__SW_MANIFEST: Array<PrecacheEntry>;
};

const serwist = new Serwist({
	// 1. This is the most important part for offline support!
	// It tells Serwist to cache everything listed in the manifest
	precacheEntries: self.__SW_MANIFEST,

	// 2. This defines how to handle requests that aren't in the precache
	// 'defaultCache' is a set of pre-configured strategies from Serwist
	runtimeCaching: defaultCache,

	// 3. This tells the worker how to behave when offline
	skipWaiting: true,
	clientsClaim: true,
});

serwist.addEventListeners();
