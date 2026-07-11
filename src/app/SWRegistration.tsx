"use client";

import { useEffect } from "react";

export function SWRegistration() {
	useEffect(() => {
		if ("serviceWorker" in navigator) {
			navigator.serviceWorker
				.register("/sw.js", { type: "module" })
				.catch((err) =>
					console.error("Service worker registration failed:", err),
				);
		}
	}, []);
	return null; // This component renders nothing
}
