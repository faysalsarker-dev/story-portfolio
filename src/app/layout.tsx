import type { Metadata } from "next";
import {  Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";



const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter", 
});


export const metadata: Metadata = {
  title: "Faysal Sarker",
  description: "Full Stack Developer in Bangladesh",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable}  antialiased overflow-x-hidden`}
      >
        <Navbar/>
        {children}
      </body>
    </html>
  );
}
