"use client"
import { useEffect, useState } from "react"
// useParams: permet d'obtenir l'id
import { useParams, useRouter } from "next/navigation"
import { updateCategory } from "@/services/categoryService";
import axiosInstance from "@/services/axiosInstances"

interface Category {
    id: number
    name: string
    price: number
    discount_price: number
    description: string
    images: string[]
}

export default function EditCategoryPage() {
    const { id }  = useParams()
    console.log("ID récupéré :", id); 
    console.log("ID brut récupéré :", id, typeof id);
    const router = useRouter()

    const [category, setCategory] = useState<Category | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    // On charge les détails de la catégorie
    useEffect(() => {
        const fetchCategoryById = async () => {
            try {
                const response = await axiosInstance.get('/categories/${id}')
                setCategory(response.data)
            } catch (error) {
                setError("Erreur lors du chargement de la catégorie.")
            } finally {
                // Arrêt du chargement
                setLoading(false)
            }
        }

        fetchCategoryById()
    }, [id])

    // Fonction pour soummettre les modifications
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        // On récupère les données du formulaire
        const formData = new FormData(event.currentTarget)
        try {
            // Appel du service de mise à jour
             await updateCategory(id, {name : "name updated from the front"})

            // Confirmation et redirection
          //  alert("La catégorie a été mise à jour avec succès !")
            router.push("/back-office/categories")
        } catch (error) {
            console.error("Erreur lors de la mise à jour de la catégorie :", error)
            alert("Impossible de mettre à jour la catégorie.")
            
        }
    }

    if (loading) return <p>Chargement de la catégorie...</p>

    return(
        <div>
            {/* En-tête de la page */}
            <div className="bg-header pt-20 pb-16 pl-8 mb-12">
                <h1 className="text-4xl md:text-7xl font-bold text-white">
                    Modifier la Catégorie
                </h1>
            </div>

            {/* Formulaire pré-rempli */}
            <form onSubmit={handleSubmit} className="w-4/5 mx-auto">
                {/* Nom */}
                <label className="block mb-2">Nom</label>
                <input
                    type="text"
                    name="name"
                    defaultValue={category?.name} // Pré-rempli avec le nom actuel
                    className="w-full p-2 mb-4 border rounded"
                    required
                />

                {/* Prix */}
                <label className="block mb-2">Prix</label>
                <input
                    type="number"
                    name="price"
                    defaultValue={category?.price} // Pré-rempli avec le prix actuel
                    className="w-full p-2 mb-4 border rounded"
                    required
                />

                {/* Prix remisé */}
                <label className="block mb-2">Prix remisé</label>
                <input
                    type="number"
                    name="discount_price"
                    defaultValue={category?.discount_price} // Pré-rempli avec le prix remisé actuel
                    className="w-full p-2 mb-4 border rounded"
                />

                {/* Description */}
                <label className="block mb-2">Description</label>
                <textarea
                    name="description"
                    defaultValue={category?.description} // Pré-rempli avec la description actuelle
                    className="w-full p-2 mb-4 border rounded"
                />

                {/* Images */}
                <label className="block mb-2">Images</label>
                <input
                    type="file"
                    name="images"
                    className="w-full p-2 mb-4 border rounded"
                    multiple // Permet de télécharger plusieurs images
                />

                {/* Bouton de soumission */}
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Mettre à jour
                </button>
            </form>
        </div>
    )
}