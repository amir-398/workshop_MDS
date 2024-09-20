"use client"
import Link from 'next/link';
import BannerHomePage from '../components/BannerHomePage';
import axios from "axios";
import { useEffect } from 'react';
import ScrollToTop from "../components/BackToTop"; 



const consoles = [
  { id: 'nds-lite', name: 'Nintendo DS Lite' },
  { id: 'gameboy-color', name: 'Gameboy Color' },
  { id: 'gameboy-advance', name: 'Gameboy Advance' },
  { id: 'gameboy-advance-sp', name: 'Gameboy Advance SP' },
  { id: 'gameboy-dmg', name: 'Gameboy DMG' },
];




export default function Home() {
  const fetchData = async ()=> {
    const fetchedData = await axios.get("http://localhost:3001/categories")
    console.log(fetchedData.data);
    
  }
  useEffect(()=> {
    fetchData()
  }, [])
  return (
    <div>
      <BannerHomePage />
      <ScrollToTop />

      {/* Liste des consoles à personnaliser */}
      <section className="py-8 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Personnalisez votre console</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {consoles.map((console) => (
              <Link key={console.id} href={`/consoles/${console.id}`} legacyBehavior>
                <div className="block p-6 bg-white rounded-lg shadow-md hover:bg-blue-500 hover:text-white transition duration-300 cursor-pointer">
                  <h3 className="text-xl font-semibold">{console.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
