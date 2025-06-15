"use client"
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { Provider } from "react-redux";
import { store } from "@/lib/store";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
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
          
      <Header />
      <div className="min-h-[calc(100vh-8rem)] h-20 p-3 bg-primary">
        {children}
      </div>
        <Footer />
    </Provider>
      </body>
    </html>
  );
}
