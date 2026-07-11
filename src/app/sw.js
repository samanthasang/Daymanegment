import { Serwist } from "@serwist/sw";

// This is standard JavaScript.
// No TypeScript errors, no 'any' issues, no 'missing member' issues.
const serwist = new Serwist({
	precacheEntries: self.__SW_MANIFEST,
	skipWaiting: true,
	clientsClaim: true,
	navigationPreload: true,
});

serwist.addEventListeners();
