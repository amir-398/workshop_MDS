

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import arrowUp from "/public/icons/arrowup.png";
import arrowDown from "/public/icons/arrowdown.png";

interface OptionsProps {
  consoleId: "gameboy-dmg";
}

const Options = ({ consoleId }: OptionsProps) => {
  const optionsByConsole = {
    "gameboy-dmg": {
      baseOptions: [
        "Je fournis la console",
        "Je n’ai pas de console à fournir (+40€)",
      ],
      colors: [
        { name: "Noir", code: "Black", cssColor: "#000000" },
        { name: "Clear Black", code: "ClearBlack", cssColor: "#0b0c0c" },
        { name: "Clear Blue", code: "ClearBlue", cssColor: "#0a33ae" },
        { name: "Clear Glass", code: "ClearGlass", cssColor: "#ede1e1" },
        { name: "Green", code: "Green", cssColor: "#02c209" },
        { name: "Yellow", code: "Yellow", cssColor: "#FFC300" },
        { name: "Clear Red", code: "ClearRed", cssColor: "#e90404" },
        { name: "Clear Orange", code: "ClearOrange", cssColor: "#FF5733" },
        { name: "DMG", code: "DMG", cssColor: "#c8c8c8" },
        { name: "Blue", code: "Blue", cssColor: "#1e54db" },
        { name: "Clear Violet", code: "ClearViolet", cssColor: "#a878d1" },
        { name: "Clear Blue Ocean", code: "ClearBlueOcean", cssColor: "#28dbc1" },
      ],
      ipsScreen: ["Black", "DMG"],
      rearShell: [
        { name: "Blanc", code: "White", cssColor: "transparent" },
        { name: "Noir", code: "Black", cssColor: "#000000" },
        { name: "Ghot", code: "GHOT", cssColor: "#7cf4b0" },
        { name: "ClearGlass", code: "ClearGlass", cssColor: "#dfdfdf" },
        { name: "Clear Red", code: "ClearRed", cssColor: "#e90404" },
        { name: "Blue", code: "Blue", cssColor: "#1e54db" },
        { name: "Yellow", code: "Yellow", cssColor: "#FFC300" },
        { name: "Green", code: "Green", cssColor: "#02c209" },
        { name: "Clear Violet", code: "ClearViolet", cssColor: "#a878d1" },
        { name: "Clear Blue", code: "ClearBlue", cssColor: "#0a33ae" },
        { name: "Clear Orange", code: "ClearOrange", cssColor: "#FF5733" },
      ],
      buttons: [
        { name: "Noir", code: "Black", cssColor: "#000000" },
        { name: "Blanc", code: "White", cssColor: "#FFFFFF" },
        { name: "DMG", code: "DMG-02_", cssColor: "#c8c8c8" },
        { name: "Orange", code: "Orange", cssColor: "#FF5733" },
        { name: "Rouge", code: "Red", cssColor: "#e90404" },
        { name: "Bleu", code: "Blue", cssColor: "#1e54db" },
      ],
      pads: ["Black", "Clear", "Yellow", "Green", "Blue", "Red"],
      battery: ["Sans", "Batterie + Câble USB-C (+40€)"],
      accessories: [
        { id: 1, name: "Verre trempé (+4.90€)" },
        { id: 2, name: "Coque silicone (+6.90€)" },
      ],
    },
  };

  const options = optionsByConsole[consoleId];

  const [customizationDetails, setCustomizationDetails] = useState({
    id: [] as string[],  // Assurez-vous que `id` est bien un tableau de chaînes de caractères
    Baseconsole: "",
    Coque: "",
    CoqueArriere: "",
    ecranIPS: "",
    Boutons: "",
    Pads: "",
    accessoires: [] as string[], // Initialisez `accessoires` avec un tableau de chaînes de caractères
    prixFinal: 129,
  });

  const [selectedBaseOption, setSelectedBaseOption] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>("DMG");
  const [selectedRearShell, setSelectedRearShell] = useState<string | null>(null);
  const [selectedIpsScreen, setSelectedIpsScreen] = useState<string>("DMG");
  const [selectedButton, setSelectedButton] = useState<string>("DMG-02_");
  const [selectedPad, setSelectedPad] = useState<string>("Black");
  const [selectedBattery, setSelectedBattery] = useState<string | null>(null);
  const [selectedAccessory, setSelectedAccessory] = useState<number[]>([]);
  const [activeSteps, setActiveSteps] = useState<number[]>([]);

  const generateImageName = (type: string, colorCode: string) => {
    switch (type) {
      case "shell":
        return `GB-Side-GB_SIDE_${colorCode}0024.webp`;
      case "rearShell":
        return `GB-Side-GB_SIDE_${colorCode}0024DUAL.webp`;
      case "ipsScreen":
        return `GB-Side-GB-SIDE-IPS_${colorCode}.webp`;
      case "buttons":
        return `GB-Side-GB_SIDE_BUTTON_${colorCode}0023.webp`;
      case "pad":
        return `GB-Side-GB_SIDE_PAD_${colorCode}0024.webp`;
      case "battery":
        return `GB-Side-USBC-02.webp`;
      default:
        return "";
    }
  };

  // Calcul du prix final
  useEffect(() => {
    let prix = 129;

    if (selectedBaseOption === "Je n’ai pas de console à fournir (+40€)") {
      prix += 40;
    }
    if (selectedRearShell) {
      prix += 11.90;
    }
    if (selectedBattery === "Batterie + Câble USB-C (+40€)") {
      prix += 40;
    }
    if (selectedAccessory.includes(1)) {
      prix += 4.90;
    }
    if (selectedAccessory.includes(2)) {
      prix += 6.90;
    }

    // Mise à jour du prix final et accessoires
    const selectedAccessoryNames = options.accessories
      .filter((accessory) => selectedAccessory.includes(accessory.id))
      .map((accessory) => accessory.name);

    setCustomizationDetails((prevDetails) => ({
      ...prevDetails,
      accessoires: selectedAccessoryNames, // Mise à jour des accessoires
      prixFinal: prix,
    }));
  }, [selectedBaseOption, selectedRearShell, selectedBattery, selectedAccessory]);

  const handleOptionChange = (optionType: string, value: string) => {
    setCustomizationDetails((prevDetails) => ({
      ...prevDetails,
      [optionType]: value,
    }));
  };

  const handleAccessoryChange = (id: number) => {
    setSelectedAccessory((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  // Toggle des étapes
  const toggleStep = (step: number) => {
    setActiveSteps((prevSteps) =>
      prevSteps.includes(step) ? prevSteps.filter((s) => s !== step) : [...prevSteps, step]
    );
  };

  return (
    <div className="flex flex-col lg:flex-row justify-center items-center h-screen relative">
      {/* Image de la console à gauche */}
      <div className="flex-1 p-4 relative max-w-full lg:max-w-[50%] mx-auto">
        <Image
          src={`/images/Gameboy-DMG/${generateImageName("shell", selectedColor)}`}
          alt="Coque avant"
          width={800}
          height={600}
          className="w-full h-auto "
        />

        {selectedRearShell && (
          <Image
            src={`/images/Gameboy-DMG/${generateImageName("rearShell", selectedRearShell)}`}
            alt="Coque arrière"
            width={800}
            height={600}
            className="absolute top-0 left-0 w-full h-auto scale-90"
          />
        )}

        {selectedIpsScreen && (
          <Image
            src={`/images/Gameboy-DMG/${generateImageName("ipsScreen", selectedIpsScreen)}`}
            alt="Écran IPS"
            width={800}
            height={600}
            className="absolute top-0 left-0 w-full h-auto scale-95"
          />
        )}

        {selectedButton && (
          <Image
            src={`/images/Gameboy-DMG/${generateImageName("buttons", selectedButton)}`}
            alt="Boutons"
            width={800}
            height={600}
            className="absolute top-[-7px] left-[3px] w-full h-auto scale-95"
          />
        )}

        {selectedPad && (
          <Image
            src={`/images/Gameboy-DMG/${generateImageName("pad", selectedPad)}`}
            alt="Pad"
            width={800}
            height={600}
            className="absolute top-[-14px] left-1 w-full h-auto"
          />
        )}

        {selectedBattery && (
          <Image
            src={`/images/Gameboy-DMG/${generateImageName("battery", selectedBattery)}`}
            alt="Batterie USB-C"
            width={800}
            height={600}
            className="absolute top-0 left-0 w-full h-auto"
          />
        )}
      </div>

      {/* Accordion pour les étapes */}
      <div className="flex-1 h-[80vh] overflow-y-auto bg-white p-6 lg:mx-60 my-8 w-full lg:w-[35%] rounded-lg shadow-2xl top-0 left-10">
        <h2 className="text-xl mb-4 text-center">Configuration</h2>

        {/* Affichage du prix final */}
        <div className="text-center mb-4">
          <span className="text-2xl font-bold">Prix final : {customizationDetails.prixFinal}€</span>
        </div>

        {/* Étape 1 : Base Console */}
        <div className="mb-4">
          <div
            className="p-4 bg-cyan-50 cursor-pointer rounded-lg flex justify-between items-center"
            onClick={() => toggleStep(1)}
          >
            <div>1 : Base Console</div>
            <Image
              src={activeSteps.includes(1) ? arrowUp : arrowDown}
              alt="Toggle arrow"
              width={20}
              height={20}
              className="ml-2"
            />
          </div>

          {activeSteps.includes(1) && (
            <div className="p-4 bg-white rounded-lg mt-2">
              <ul>
                {options.baseOptions.map((option, index) => (
                  <li key={index}>
                    <button
                      className={`py-2 px-4 mt-2 w-full rounded-lg ${
                        selectedBaseOption === option ? "bg-blue-500 text-white" : "bg-gray-300"
                      }`}
                      onClick={() => {
                        setSelectedBaseOption(option);
                        handleOptionChange("Baseconsole", option);
                      }}
                    >
                      {option}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

         {/* Étape 2 : Coque */}
         <div className="mb-4">
          <div
            className="p-4 bg-cyan-50 cursor-pointer rounded-lg flex justify-between items-center"
            onClick={() => toggleStep(2)}
          >
            <div>2 : COQUE</div>
            <Image
              src={activeSteps.includes(2) ? arrowUp : arrowDown}
              alt="Toggle arrow"
              width={20}
              height={20}
              className="ml-2"
            />
          </div>

          {activeSteps.includes(2) && (
            <div className="p-4 bg-white rounded-lg mt-2">
              <div className="flex flex-wrap gap-4">
                {options.colors.map((color, index) => (
                  <button
                    key={index}
                    className={`w-12 h-12 rounded-full border-2 ${
                      selectedColor === color.code ? "border-blue-500" : "border-gray-300"
                    }`}
                    style={{ backgroundColor: color.cssColor }}
                    onClick={() => {
                      setSelectedColor(color.code);
                      handleOptionChange("Coque", color.code);
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Étape 3 : Coque Arrière */}
        <div className="mb-4">
          <div
            className="p-4 bg-cyan-50 cursor-pointer rounded-lg flex justify-between items-center"
            onClick={() => toggleStep(3)}
          >
            <div>3 : COQUE ARRIÈRE</div>
            <Image
              src={activeSteps.includes(3) ? arrowUp : arrowDown}
              alt="Toggle arrow"
              width={20}
              height={20}
              className="ml-2"
            />
          </div>

          {activeSteps.includes(3) && (
            <div className="p-4 bg-white rounded-lg mt-2">
              <div className="flex flex-wrap gap-4">
                {options.rearShell.map((shell, index) => (
                  <button
                    key={index}
                    className={`w-12 h-12 rounded-full border-2 ${
                      selectedRearShell === shell.code ? "border-blue-500" : "border-gray-300"
                    }`}
                    style={{ backgroundColor: shell.cssColor }}
                    onClick={() => {
                      setSelectedRearShell(shell.code);
                      handleOptionChange("CoqueArriere", shell.code);
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Étape 4 : Écran IPS */}
        <div className="mb-4">
          <div
            className="p-4 bg-cyan-50 cursor-pointer rounded-lg flex justify-between items-center"
            onClick={() => toggleStep(4)}
          >
            <div>4 : Écran IPS RÉTROÉCLAIRÉ</div>
            <Image
              src={activeSteps.includes(4) ? arrowUp : arrowDown}
              alt="Toggle arrow"
              width={20}
              height={20}
              className="ml-2"
            />
          </div>

          {activeSteps.includes(4) && (
            <div className="p-4 bg-white rounded-lg mt-2">
              <div className="flex flex-wrap gap-4">
                {options.ipsScreen.map((screen, index) => (
                  <button
                    key={index}
                    className={`w-12 h-12 rounded-full border-2 ${
                      selectedIpsScreen === screen ? "border-blue-500" : "border-gray-300"
                    }`}
                    onClick={() => {
                      setSelectedIpsScreen(screen);
                      handleOptionChange("ecranIPS", screen);
                    }}
                  >
                    {screen}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Étape 5 : Boutons */}
        <div className="mb-4">
          <div
            className="p-4 bg-cyan-50 cursor-pointer rounded-lg flex justify-between items-center"
            onClick={() => toggleStep(5)}
          >
            <div>5 : BOUTONS</div>
            <Image
              src={activeSteps.includes(5) ? arrowUp : arrowDown}
              alt="Toggle arrow"
              width={20}
              height={20}
              className="ml-2"
            />
          </div>

          {activeSteps.includes(5) && (
            <div className="p-4 bg-white rounded-lg mt-2">
              <div className="flex flex-wrap gap-4">
                {options.buttons.map((button, index) => (
                  <button
                    key={index}
                    className={`w-12 h-12 rounded-full border-2 ${
                      selectedButton === button.code ? "border-blue-500" : "border-gray-300"
                    }`}
                    style={{ backgroundColor: button.cssColor }}
                    onClick={() => {
                      setSelectedButton(button.code);
                      handleOptionChange("Boutons", button.code);
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
        {/* Étape 6 : Pads */}
        <div className="mb-4">
          <div
            className="p-4 bg-cyan-50 cursor-pointer rounded-lg flex justify-between items-center"
            onClick={() => toggleStep(6)}
          >
            <div>6 : PADS</div>
            <Image
              src={activeSteps.includes(6) ? arrowUp : arrowDown}
              alt="Toggle arrow"
              width={20}
              height={20}
              className="ml-2"
            />
          </div>

          {activeSteps.includes(6) && (
            <div className="p-4 bg-white rounded-lg mt-2">
              <div className="flex flex-wrap gap-4">
                {options.pads.map((pad, index) => (
                  <button
                    key={index}
                    className={`w-12 h-12 rounded-full border-2 ${
                      selectedPad === pad ? "border-blue-500" : "border-gray-300"
                    }`}
                    style={{ backgroundColor: pad.toLowerCase() }}
                    onClick={() => {
                      setSelectedPad(pad);
                      handleOptionChange("Pads", pad);
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Étape 7 : Batterie */}
        <div className="mb-4">
          <div
            className="p-4 bg-cyan-50 cursor-pointer rounded-lg flex justify-between items-center"
            onClick={() => toggleStep(7)}
          >
            <div>7 : INSTALLATION BATTERIE USB-C</div>
            <Image
              src={activeSteps.includes(7) ? arrowUp : arrowDown}
              alt="Toggle arrow"
              width={20}
              height={20}
              className="ml-2"
            />
          </div>

          {activeSteps.includes(7) && (
            <div className="p-4 bg-white rounded-lg mt-2">
              <div className="flex flex-wrap gap-4">
                {options.battery.map((battery, index) => (
                  <button
                    key={index}
                    className={`w-12 h-12 rounded-full border-2 ${
                      selectedBattery === battery ? "border-blue-500" : "border-gray-300"
                    }`}
                    onClick={() => {
                      setSelectedBattery(battery);
                      handleOptionChange("optionBatterie", battery);
                    }}
                  >
                    {battery}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Étape 8 : Accessoires */}
        <div className="mb-4">
          <div
            className="p-4 bg-cyan-50 cursor-pointer rounded-lg flex justify-between items-center"
            onClick={() => toggleStep(8)}
          >
            <div>Étape 8 : Accessoires</div>
            <Image
              src={activeSteps.includes(8) ? arrowUp : arrowDown}
              alt="Toggle arrow"
              width={20}
              height={20}
              className="ml-2"
            />
          </div>

          {activeSteps.includes(8) && (
            <div className="p-4 bg-white rounded-lg mt-2">
              <div className="flex flex-wrap gap-4">
              {options.accessories.map((accessory, index) => (
  <button
    key={index}
    className={`w-12 h-12 rounded-full border-2 ${
      selectedAccessory.includes(accessory.id) ? "border-blue-500" : "border-gray-300"
    }`}
    onClick={() => handleAccessoryChange(accessory.id)}
  >
    {accessory.name}
  </button>
))}
              </div>
            </div>
          )}
        </div>

        {/* Bouton Ajouter au panier */}
        <button
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded w-full bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500"
          onClick={() => {
            console.log("Détails de personnalisation:", customizationDetails);
          }}
        >
          Ajouter au panier
        </button>{/* Étape 2 : Coque */}
        {/* Ajoutez les autres étapes ici */}
      </div>
    </div>
  );
};

export default Options;

























