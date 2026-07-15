import localFont from "next/font/local";
import { ToastContainer } from "react-toastify";
import "./globals.css";
import { ReduxProvider } from "@/components/ReduxProvider";
import SplashGate from "./splash-gate";
import { PWAInstallPrompt } from "./PWAInstallPrompt";
import ServiceWorkerRegister from "./SWRegistration";
import PageContainer from "@/components/mainPage/Page/PageContainer/PageContainer.component";

const geistSans = localFont({
	src: "./fonts/GoogleSansFlex.ttf",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});
export const metadata = {
	applicationName: "Mountains",
	title: { default: "Mountains", template: "%s - NJS App" },
	description: "Mountains Day Management APP",
	manifest: "/Daymanegment/manifest.json",
	appleWebApp: { capable: true, statusBarStyle: "default", title: "Mountains" },
	icons: {
		shortcut: "/icon.png",
		apple: [{ url: "/assets/icons/apple-icon-152x152.png", sizes: "180x180" }],
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<meta name="theme-color" content="#1C2733" />
			</head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<ServiceWorkerRegister />
				<ReduxProvider>
					<ToastContainer />
					<SplashGate>
						<div className="min-h-dvh bg-primary">
							<PWAInstallPrompt />
							<PageContainer>{children}</PageContainer>
						</div>
					</SplashGate>
				</ReduxProvider>
			</body>
		</html>
	);
}
