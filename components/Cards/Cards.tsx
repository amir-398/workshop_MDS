import Link from 'next/link';
import Image from "next/image";

interface CardProps {
    idCss: string
    title: string
    subTitle: string
    link: string
    filePath: string
    alt: string
    titleColor: string
    subTitleColor : string
}

const Card: React.FC<CardProps> = ({ idCss, title, subTitle, filePath, alt, link, titleColor, subTitleColor }) => {
    // largeur et hauteur de l'image pour la 2 ème card
    const imagewidth = idCss === 'gameboy-advance' ? 450 : 290;
    const imageHeight = idCss === 'gameboy-advance' ? 60 : 20;
    return (
        <div 
            id={idCss}
            className='flex flex-col items-center rounded-2xl h-[400px] relative'  
        >
            <div className='mt-16'>
                <p className={subTitleColor}>{subTitle}</p>
                <h2 className={`mt-1.5 text-5xl sm:text-4xl md:text-6xl font-semibold ${titleColor}`}>{title}</h2>
            </div>
            <div className='bg-customizedButton w-fit mt-6 px-6 py-3 rounded-full cursor-pointer hover:bg-white hover:text-customizedButton hover:border-2 hover:border-customizedButton transition duration-300'>
            <Link href={link}>
                    Personnaliser
            </Link>
            </div>
            <div className="absolute bottom-0 w-full flex justify-center">
                <Image
                    src={filePath.startsWith('/') ? filePath : `/${filePath}`} 
                    alt={alt}
                    width={imagewidth}
                    height={imageHeight}
                    className="h-auto object-cover"
                />
            </div>
        </div>
    )
}

export default Card;