import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-6">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          {/* Droits réservés et icônes de réseaux sociaux pour les petits écrans */}
          <div className="text-left mb-4 md:mb-0">
            <p className="text-base">Tous droits réservés – Retrometroid 2024</p>
            <div className="mt-4 flex space-x-4">
              <Link href="https://www.instagram.com" className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-pink-500">
                <Image
                  src="/icons/instagram.png"
                  alt="Instagram"
                  width={29}
                  height={29}
                />
              </Link>
              <Link href="https://www.tiktok.com" className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-pink-500">
                <Image
                  src="/icons/tiktok.jpg"
                  alt="TikTok"
                  width={29}
                  height={29}
                />
              </Link>
              <Link href="https://www.facebook.com" className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-pink-500">
                <Image
                  src="/icons/facebook.png"
                  alt="Facebook"
                  width={29}
                  height={29}
                />
              </Link>
              <Link href="mailto:example@example.com" className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-pink-500">
                <Image
                  src="/icons/email.png"
                  alt="Email"
                  width={36}
                  height={36}
                />
              </Link>
            </div>
          </div>

          {/* Mentions footer */}
          <div className="text-left md:text-right space-y-1">
            <Link href="#" className="text-base hover:text-gray-400 block">
              Mentions légales
            </Link>
            <Link href="#" className="text-base hover:text-gray-400 block">
              Conditions Générales de vente
            </Link>
            <Link href="#" className="text-base hover:text-gray-400 block">
              Politique de confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
