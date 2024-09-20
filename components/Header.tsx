"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex-shrink-0">
          <Link
            href="/"
            className="hover:opacity-80 transition-opacity duration-300"
          >
            <Image
              src="/images/logo.png"
              alt="Retrometroid Logo"
              width={160}
              height={100}
              priority
            />
          </Link>
        </div>

        <nav className="hidden md:flex space-x-8 text-gray-800  mx-auto">
          <Link
            href="/personnalisation"
            className="relative hover:text-blue-500 transition-colors duration-300"
          >
            <span className="hover-underline">Personnalisation</span>
          </Link>
          <Link
            href="/best-seller"
            className="relative hover:text-blue-500 transition-colors duration-300"
          >
            <span className="hover-underline">Nos Best-Seller</span>
          </Link>
          <Link
            href="/editions-limitees"
            className="relative hover:text-blue-500 transition-colors duration-300"
          >
            <span className="hover-underline">Éditions Limitées</span>
          </Link>
          <Link
            href="/produits"
            className="relative hover:text-blue-500 transition-colors duration-300"
          >
            <span className="hover-underline">Nos Produits</span>
          </Link>
        </nav>

        {/* Icons profil et panier*/}
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/back-office/categories">
            <div className="w-8 h-8 cursor-pointer hover:opacity-80 transition-opacity duration-300">
              <Image
                src="/images/profil.png"
                alt="Profil"
                width={29}
                height={29}
                className="object-cover"
              />
            </div>
          </Link>
          <Link href="/cart">
            <div className="w-8 h-8 cursor-pointer hover:opacity-80 transition-opacity duration-300">
              <Image
                src="/images/panier.png"
                alt="Panier"
                width={32}
                height={32}
                className="object-cover"
              />
            </div>
          </Link>
        </div>

        {/* Bouton du menu mobile */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {isOpen && (
        <nav className="md:hidden px-6 py-4 space-y-2 text-gray-800">
          <Link
            href="/personnalisation"
            className="block hover:text-blue-500 transition-colors duration-300"
          >
            Personnalisation
          </Link>
          <Link
            href="/best-seller"
            className="block hover:text-blue-500 transition-colors duration-300"
          >
            Nos Best-Seller
          </Link>
          <Link
            href="/editions-limitees"
            className="block hover:text-blue-500 transition-colors duration-300"
          >
            Éditions Limitées
          </Link>
          <Link
            href="/produits"
            className="block hover:text-blue-500 transition-colors duration-300"
          >
            Nos Produits
          </Link>
          <div className="flex items-center space-x-4 mt-4">
            <Link href="/profil">
              <div className="w-8 h-8 cursor-pointer hover:opacity-80 transition-opacity duration-300">
                <Image
                  src="/images/profil.png"
                  alt="Profil"
                  width={26}
                  height={26}
                  className="object-cover"
                />
              </div>
            </Link>
            <Link href="/cart">
              <div className="w-8 h-8 cursor-pointer hover:opacity-80 transition-opacity duration-300">
                <Image
                  src="/images/panier.png"
                  alt="Panier"
                  width={32}
                  height={32}
                />
              </div>
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
