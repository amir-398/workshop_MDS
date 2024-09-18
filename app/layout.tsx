import type { Metadata } from "next";
import "./globals.css";
import Header from '../components/Header';  
import Footer from '../components/Footer';  

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
        {/* Contenu principal qui grandit pour occuper l'espace restant */}
        <main className="flex-grow">
          {children}
        </main>
        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
