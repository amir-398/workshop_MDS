import type { Metadata } from "next";
import "./globals.css";
import Header from '../components/Header';  
import Footer from '../components/Footer';  
// import CustomConsole from "../components/CustomConsole";
import CreateCategory from "../app/back-office/categories/create"
import CategoryForm from "../components/Forms/CategoryForm";
import CategoriesPage from "../app/back-office/categories/page";

export const metadata: Metadata = {
  title: "Retro Metroid Store",
  description: "E-commerce de consoles rétro customisées",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
   const test =()=> {
    alert()
   }
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen antialiased">
        <Header />
        {/* Contenu principal qui grandit pour occuper l'espace restant */}
        <main className="flex-grow">
          {/* {children} */}
          {/* <CustomConsole /> */}
          {/* <CreateCategory /> */}
          <CategoriesPage />
        </main>
        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
