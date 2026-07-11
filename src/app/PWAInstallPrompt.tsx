"use client";

import { useState, useEffect } from "react";

export function PWAInstallPrompt() {
	const [isReady, setIsReady] = useState(false);
	const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
	const [showIOSHint, setShowIOSHint] = useState(false);

	useEffect(() => {
		// 1. Handle Chromium Native Install
		const handler = (e: any) => {
			e.preventDefault();
			setDeferredPrompt(e);
			setIsReady(true);
		};
		window.addEventListener("beforeinstallprompt", handler);

		// 2. Detect iOS Safari to show manual hint
		const isIOS =
			/iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
		const isStandalone = window.matchMedia(
			"(display-mode: standalone)",
		).matches;

		if (isIOS && !isStandalone) {
			setShowIOSHint(true);
			setIsReady(true);
		}

		return () => window.removeEventListener("beforeinstallprompt", handler);
	}, []);

	const handleInstall = async () => {
		if (deferredPrompt) {
			deferredPrompt.prompt();
			const { outcome } = await deferredPrompt.userChoice;
			if (outcome === "accepted") setDeferredPrompt(null);
		}
	};

	if (!isReady) return null;

	return (
		<div className="fixed bottom-4 right-4 z-50 w-full max-w-sm p-4 bg-white border border-gray-200 shadow-xl rounded-2xl md:bottom-8 md:right-8 dark:bg-gray-800 dark:border-gray-700">
			<h3 className="font-semibold text-gray-900 dark:text-white">
				Install App
			</h3>
			<p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
				{showIOSHint
					? "Tap the 'Share' button and select 'Add to Home Screen' for an app-like experience."
					: "Install our app for a faster experience."}
			</p>

			{!showIOSHint && (
				<button
					onClick={handleInstall}
					className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
				>
					Install Now
				</button>
			)}

			<button
				onClick={() => setIsReady(false)}
				className="mt-2 w-full text-xs text-gray-400 hover:text-gray-600"
			>
				Dismiss
			</button>
		</div>
	);
}
