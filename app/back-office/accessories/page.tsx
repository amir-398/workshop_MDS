"use client"

import { useEffect, useState } from "react";
import { fetchAccessories, deleteAccessory } from "../../../services/accessoryService";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Accessory {
    id: number;
    name: string;
    price: number;
    colors: { name: string, price: string }[];
    images?: string[];  // Si tu as des images pour les accessoires
}

export default function AccessoriesPage() {
    // État pour stocker les accessoires récupérés de l'API
    const [accessories, setAccessories] = useState<Accessory[]>([]);
    
    // État pour gérer l'affichage de l'indicateur de chargement
    const [loading, setLoading] = useState<boolean>(true);
    
    const [error, setError] = useState<string | null>(null);

    const BASE_URL = 'http://localhost:3001';

    const router = useRouter();

    // on récupère les accessoires dès que le composant est monté
    useEffect(() => {
        // Fonction asynchrone pour appeler l'API et récupérer les accessoires
        const getAccessories = async () => {
            try {
                // On démarre le chargement
                setLoading(true);
                const data = await fetchAccessories();
                setAccessories(data);
            } catch (error) {
                setError('Erreur lors du chargement des accessoires');
            } finally {
                // Fin du chargement, quel que soit le résultat
                setLoading(false);
            }
        };

        // Appel de la fonction au montage du composant
        getAccessories();
    }, []);

    const handleDeleteAccessory = async (accessoryId: number) => {
        if (confirm("Êtes-vous sûr de vouloir supprimer cet accessoire ?")) {
            try {
                await deleteAccessory(accessoryId);

                // Mise à jour de l'état pour retirer l'accessoire supprimé
                setAccessories((prevAccessories) => 
                    prevAccessories.filter(accessory => accessory.id !== accessoryId)
                );
            } catch (error) {
                alert('Erreur lors de la suppression de l\'accessoire');
            }
        }
    };

    // Fonction pour rediriger vers la page de création
    const handleAddAccessory = () => {
        console.log("Redirection en cours vers /back-office/accessory/create");
        router.push("/back-office/accessories/create");
    };

    if (loading) {
        return <p>Chargement des accessoires...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            {/* Titre de la page */}
            <div className="bg-header pt-20 pb-16 pl-8 mb-12">
                <h1 className="text-4xl md:text-7xl font-bold text-white">Accessoires</h1>
            </div>

            {/* Bouton "Ajouter un accessoire" */}
            <div className="mb-8 flex justify-start sm:pl-4">
                <button
                    onClick={handleAddAccessory}
                    className="bg-black hover:bg-[#2a74ed] transition duration-300 text-xl w-4/5 mx-auto sm:w-2/5 sm:text-2xl text-white px-4 py-2 rounded-md"
                >
                    Ajouter un accessoire
                </button>
            </div>

            {/* Grille d'affichage des accessoires récupérés */}
            <div className="mb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {accessories.length === 0 ? (
                    <p>Aucun accessoire disponible.</p>
                ) : (
                    accessories.map((accessory) => (
                        <div key={accessory.id} className="w-full max-w-lg sm:w-11/12 border px-4 sm:px-12 py-4 rounded-md shadow-md mx-auto">
                            {/* Nom de l'accessoire */}
                            <h2 className="text-3xl md:text-4xl font-bold md:my-4">{accessory.name}</h2>

                            {/* Affichage des images de l'accessoire */}
                            {accessory.images && accessory.images.length > 0 && (
                                <div className={`mt-4 grid ${accessory.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'} gap-4`}>
                                    {accessory.images.map((image, index) => (
                                        <div key={index} className="relative w-full h-40">
                                            <Image
                                                src={`${BASE_URL}${image}`}
                                                alt={`Image ${index}`}
                                                layout="fill"
                                                quality={75}
                                                className="w-full h-full object-cover rounded-lg"
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Prix de l'accessoire */}
                            <p className="mt-4 sm:text-xl">Prix: {accessory.price}€</p>

                            {/* Couleurs disponibles */}
                            <ul className="mt-2">
                                {accessory.colors.map((color, index) => (
                                    <li key={index}>
                                        {color.name}: {color.price}€
                                    </li>
                                ))}
                            </ul>

                            {/* Boutons de modification et suppression */}
                            <div className="flex justify-between mt-4">
                                <button
                                    onClick={() => router.push(`/back-office/accessories/edit/${accessory.id}`)}
                                    className="bg-green-500 text-white px-4 py-2 rounded"
                                >
                                    Modifier
                                </button>
                                <button
                                    onClick={() => handleDeleteAccessory(accessory.id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded"
                                >
                                    Supprimer
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
