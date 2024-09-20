"use client"; // Assurez-vous que ce composant est client-side

import { useParams } from "next/navigation";
import Options from "../../../components/options";
import BannerConsoles from "@/components/BannerConsoles";

const validConsoles = ["gameboy-dmg"] as const;

type ConsoleId = (typeof validConsoles)[number];

const ConsolePage = () => {
  const { id } = useParams();

  // Gérer le cas où `id` pourrait être un tableau
  const consoleId = Array.isArray(id) ? id[0] : id;

  // Vérifier si l'id est une console valide, car on utilise qu'une console 'Gameboy DMG'
  if (!validConsoles.includes(consoleId as ConsoleId)) {
    return <p>Console non valide.</p>;
  }

  return (
    <div>
      <BannerConsoles consoleName={consoleId} />

      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl mt-10 text-center">
          Choisissez vos options pour personnaliser votre {consoleId}
        </h1>
        <Options consoleId={consoleId as ConsoleId} />
      </div>
    </div>
  );
};

export default ConsolePage;
