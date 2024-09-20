import type { Metadata } from "next";
import "./globals.css";
import Header from '../components/Header';  
import Footer from '../components/Footer';  

import BannerLivraison from '../components/BannerLivraison'; 
import BackToTop from "@/components/BackToTop";

import CustomConsole from "../components/CustomConsole";


export const metadata: Metadata = {
  title: "Retro Metroid Store",
  description: "E-commerce de consoles rétro customisées",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-white antialiased">
        <Header />
        <BannerLivraison />
        <main className="flex-grow">
          {/* {children} */}
          <CustomConsole />
        </main>
        <BackToTop />
        <Footer />
      </body>
    </html>
  );
}
