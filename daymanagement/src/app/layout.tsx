"use client";
import { store } from "@/lib/store";
import localFont from "next/font/local";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "./globals.css";
import { Metadata } from "next";
import { useEffect } from "react";

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

// export const metadata: Metadata = {
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
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) =>
        console.log(
          "Service Worker registration successful with scope: ",
          registration.scope
        )
      )
      .catch((err) => console.log("Service Worker registration failed: ", err));
  }, []);
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider store={store}>
          <ToastContainer />
          <div className=" min-h-lvh bg-primary">{children}</div>
        </Provider>
      </body>
    </html>
  );
}
