/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['localhost'], // Autoriser localhost pour charger des images
      remotePatterns: [
        {
          protocol: 'http',
          hostname: 'localhost',
          port: '3001', // Spécifie le port 3001
          pathname: '/images/**', // Autoriser uniquement les images
        },
      ],
    },
  }
  
  // Utilisation de `export default` pour ESM
  export default nextConfig  