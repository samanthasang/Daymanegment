"use client";
import { store } from "@/lib/store";
import localFont from "next/font/local";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "./globals.css";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
