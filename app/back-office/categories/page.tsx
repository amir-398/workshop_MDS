"use client"

import { useEffect, useState } from "react"
import { fetchCategories, deleteCategory } from "../../../services/categoryService"
import axiosInstance from "../../../services/axiosInstances"

interface Category {
    id: number
    name: string
    price: number
    discount_price: number
    description: string
    images: string[]
}

export default function CategoriesPage() {
    // État pour stocker les catégories récupérées de l'API
    const [categories, setCategories] = useState<Category[]>([])
    
    // État pour gérer l'affichage de l'indicateur de chargement
    const [loading, setLoading] = useState<boolean>(true)
    
    const [error, setError] = useState<string | null>(null)

    const BASE_URL = 'http://localhost:3001'


    // on récupère les catégories dès que le composant est monté
    useEffect(() => {
        // Fonction asynchrone pour appeler l'API et récupérer les catégories
        const getCategories = async () => {
            try {
                // On démarre le chargement
                setLoading(true)
                const data = await fetchCategories()
                setCategories(data)
            } catch (error) {
                setError('Erreur lors du chargement des catégories')
            } finally {
                // Fin du chargement, quel que soit le résultat
                setLoading(false)
            }
        }

        // Appel de la fonction au montage du composant
        getCategories() 
    }, [])

    const handleDeleteCategory = async (categoryId: number) => {
        if (confirm("Êtes-vous sûr de vouloir supprimer cette catégorie ?")) {
            try {
                await deleteCategory(categoryId)

                 // Mise à jour de l'état pour retirer la catégorie supprimée
                 setCategories((prevCategories) => 
                    prevCategories.filter(category => category.id !== categoryId)
                )
            } catch (error) {
                alert('Erreur lors de la suppression de la catégorie')
            }
        }
    }

    if (loading) {
        return <p>Chargement des catégories...</p>
    }

    if (error) {
        return <p>{error}</p>
    }

    return(
        <div>
            {/* Titre de la page */}
            <div className="bg-header pt-20 pb-16 pl-8 mb-12">
                <h1 className="text-4xl md:text-7xl font-bold text-white">Catégories de Consoles</h1>
            </div>
            
    
            {/* Grille d'affichage des catégories récupérées */}
            <div className="mb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
                // Affichage de chaque catégorie sous forme de carte
                <div key={category.id} className="w-full max-w-lg sm:w-11/12 border px-4 sm:px-12 py-4 rounded-md shadow-md mx-auto">
                
                    {/* Nom de la catégorie */}
                    <h2 className="text-3xl md:text-4xl font-bold md:my-4 ">{category.name}</h2>
                    
                    {/* Affichage des images de la catégorie */}
                    <div className={`mt-4 grid ${category.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'} gap-4`}>
                        {category.images.map((image, index) => {
                        return (
                            // Chaque image est affichée sous forme de vignette
                            <div key={index} className="relative w-full h-40">
                                <img
                                    src={`${BASE_URL}${image.filePath}`}
                                    alt={`Image ${index}`}
                                    className="w-full h-full object-cover rounded-lg"
                                />
                            </div>
                        )
                        })}
                    </div>
                    
                    {/* Prix normal */}
                    <p className="mt-4 sm:text-xl">Prix: {category.price}€</p>
                    
                    {/* Si la console a un prix remisé, on l'affiche */}
                    {category.discount_price > 0 && (
                        <p className="mt-2 sm:text-xl">Prix remisé: {category.discount_price}€</p>
                    )}

                    {/* Description de la catégorie */}
                    <p className="mt-2 sm:text-xl">Description: {category.description}</p>

                     {/* Bouton de suppression */}
                     <button
                        onClick={() => handleDeleteCategory(category.id)}
                        className="w-full mt-4 bg-black hover:bg-[#2a74ed] transition duration-300 text-white px-4 py-2 rounded"
                     >
                        Supprimer
                     </button>

                </div>
            ))}
            </div>
        </div>
    )
}