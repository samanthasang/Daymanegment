"use client";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { Provider } from "react-redux";
import { store } from "@/lib/store";
import { ToastContainer } from "react-toastify";

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
          {/* <Header /> */}
          <ToastContainer />
          <div className="h-[100vh] bg-primary">{children}</div>
          {/* <Footer /> */}
        </Provider>
      </body>
    </html>
  );
}
