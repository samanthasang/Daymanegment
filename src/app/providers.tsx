"use client"
import { store } from "@/lib/store";
import { Provider } from "react-redux";
import "./globals.css";


export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return <Provider store={store}>
        {children}
    </Provider>

}
