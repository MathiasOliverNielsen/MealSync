import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "MealSync",
  description: "Plan your meals and generate shopping lists with TheMealDB",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="bg-white w-full min-h-screen flex flex-col">
        <Navbar />
        <div className="w-full flex-1">{children}</div>
        <Footer />
        <script dangerouslySetInnerHTML={{ __html: "if('serviceWorker'in navigator)navigator.serviceWorker.register('/sw.js').catch(()=>{});" }} />
      </body>
    </html>
  );
}
