import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";

// Fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ✅ Metadata (IMPORTANT for SEO + branding)
export const metadata: Metadata = {
  title: {
    default: "Support Ticket System",
    template: "%s | Support Ticket System",
  },
  description:
    "A modern support ticket system to manage customer queries, issues, and resolutions efficiently.",
  keywords: [
    "support ticket system",
    "customer support",
    "helpdesk",
    "issue tracking",
    "ticket management",
  ],
  authors: [{ name: "Abhijeet Negi" }],
  creator: "Abhijeet Negi",
  metadataBase: new URL("http://localhost:3000"),

  openGraph: {
    title: "Support Ticket System",
    description:
      "Manage and track support tickets with ease using a modern web app.",
    url: "http://localhost:3000",
    siteName: "Support Ticket System",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Support Ticket System",
    description:
      "Efficiently manage support tickets and customer issues.",
  },

  icons: {
    icon: "/favicon.ico",
  },
};

// ✅ Root Layout
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased flex flex-col">
        
        <AuthProvider>
          {/* Navbar */}
          <Navbar />

          {/* Main Content */}
          <main className="flex-grow container mx-auto px-4 py-6">
            {children}
          </main>

          {/* Footer (optional but recommended) */}
          <footer className="text-center text-sm text-gray-500 py-4 border-t">
            © {new Date().getFullYear()} Support Ticket System. All rights reserved.
          </footer>
        </AuthProvider>

      </body>
    </html>
  );
}