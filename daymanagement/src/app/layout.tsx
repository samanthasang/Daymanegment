"use client";
import { store } from "@/lib/store";
import localFont from "next/font/local";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "./globals.css";
import SplashGate from "./splash-gate";
import PWAInstallPrompt from "./PWAInstallPrompt";

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

// export const metadata = {
//   manifest: "/manifest.json",
// };

// export const metadata = {
//   applicationName: "Mountains",
//   title: {
//     default: "Mountains",
//     template: "%s - NJS App",
//   },
//   description: "Mountains Day Management APP",
//   manifest: "/manifest.json",
//   appleWebApp: {
//     capable: true,
//     statusBarStyle: "default",
//     title: "Mountains",
//   },
//   formatDetection: {
//     telephone: false,
//   },
//   icons: {
//     shortcut: "/icon.png",
//     apple: [{ url: "/assets/icons/apple-icon-152x152.png", sizes: "180x180" }],
//   },
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js", {
          type: "module", // This is the key change
        })
        .catch((err) => {
          console.error("Service worker registration failed:", err);
        });
    }
  }, []);
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1C2733" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider store={store}>
          <ToastContainer />
          <SplashGate>
            <div className="min-h-dvh bg-primary">
              <PWAInstallPrompt />
              {children}
            </div>
          </SplashGate>
        </Provider>
      </body>
    </html>
  );
}
