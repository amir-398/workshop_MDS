import type { Metadata } from "next";
import "./globals.css";
import Header from '../components/Header';  
import Footer from '../components/Footer';  
import CreateAccessoryPage from "../app/back-office/accessories/create/page"

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
      <body className="flex flex-col min-h-screen antialiased">
        <Header />
        <main className="flex-grow">
          {/* {children} */}
          <CreateAccessoryPage />
        </main>
        <Footer />
      </body>
    </html>
  );
}
