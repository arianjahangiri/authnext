import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./layout/navbar";

// Load Geist Sans font with CSS variable for global use
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Load Geist Mono font with CSS variable for global use
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadata for the app, used in the HTML head
export const metadata = {
  title: "authnext",
  description: "Authentication app built with Next.js",
};

// Root layout component wrapping the entire application
// This includes the HTML structure, global fonts, and navbar
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Site navigation bar */}
        <Navbar />
        
        {/* Render the page content */}
        {children}
      </body>
    </html>
  );
}
