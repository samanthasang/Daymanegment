"use client";

import { useEffect } from "react";

export default function ServiceWorkerRegister() {
	useEffect(() => {
		if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
			navigator.serviceWorker
				.register("/Daymanegment/sw.js", {
					scope: "/Daymanegment/",
				})
				.then((registration) => {
					console.log(
						"SW registration successful with scope: ",
						registration.scope,
					);
				})
				.catch((err) => {
					console.error("SW registration failed: ", err);
				});
		}
	}, []);

	return null; // This component renders nothing
}
