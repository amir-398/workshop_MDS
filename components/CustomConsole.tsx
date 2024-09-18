import Card from "../components/Cards/Cards";

export const CONSOLES = [
  { id: '1', idCss: 'gameboy-color', titleClass: 'dark-title-font', subTitleClass: 'dark-subTitle-font', subTitle: "Le plus grand écran", title: "gameboy color", filePath: "/images/gameboy-color.png", alt:"image", link:"/a"  },
  { id: '2', idCss: 'gameboy-advance', titleClass: 'light-title-font', subTitleClass: 'light-subTitle-font', subTitle: "La plus polyvalente", title: "gameboy advance", filePath: "/images/gameboy-advance.png", alt:"image", link:"/a"  },
  { id: '3', idCss: 'advance-sp', titleClass: 'light-title-font', subTitleClass: 'light-subTitle-font', subTitle: "La plus pratique", title: "ADVANCE SP", filePath: "/images/advance-sp.png", alt:"image", link:"/a"  },
  { id: '4', idCss: 'gameboy-dmg', titleClass: 'dark-title-font', subTitleClass: 'dark-subTitle-font', subTitle: "L'originale", title: "gameboy dmg", filePath: "/images/gameboy-dmg.png", alt:"image", link:"/a"  },
]


const CustomConsole = () => {
    return (
        <div className="mt-20 text-center">
            <p className="text-[#5b5b5b]">Construit ta propre console</p>
            <h1 className="text-black text-6xl md:text-8xl font-semibold">CUSTOMISATION</h1>
            <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 gap-6 p-4">
                {CONSOLES.map((console) => (
                    <Card 
                        key={console.id}
                        idCss={console.idCss}
                        titleColor={console.titleClass}
                        subTitleColor={console.subTitleClass}
                        subTitle={console.subTitle}
                        title={console.title}
                        filePath={console.filePath}
                        alt={console.alt}
                        link={console.link}
                    />
                ))}
            </div>
        </div>
    )
}

export default CustomConsole