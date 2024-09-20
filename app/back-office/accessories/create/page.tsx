"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import AccessoryForm from "../../../../components/Forms/AccessoryForm"
import axiosInstance from "../../../../services/axiosInstances"

interface Category {
    id: string;
    name: string;
}

export default function CreateAccessoryPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [confirmationMessage, setConfirmationMessage] = useState<string | null>(null)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get("/categories")
        if (response?.data) {
          setCategories(response.data)
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des catégories", error);
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  // Fonction exécutée lors de la soumission du formulaire
  const handleFormSubmit = async (formData: FormData) => {
    try {
      const response = await axiosInstance.post('/accessoires/add', formData);

      if (response?.status === 201) {
        setConfirmationMessage('Le nouvel accessoire a été ajouté avec succès !');
        
        // Redirection après un délai de 2 secondes pour permettre l'affichage du message
        setTimeout(() => {
          router.push('/back-office/accessoires');
        }, 2000);
      } else {
        console.error('Erreur lors de la création de l\'accessoire', response);
      }
    } catch (error) {
      console.error('Erreur réseau ou autre', error);
      alert('Erreur lors de la création de l\'accessoire');
    }
  };

  if (loading) {
    return <p>Chargement des catégories...</p>;
  }

  return (
    <div>
      {/* Titre de la page */}
      <div className="bg-header pt-20 pb-16 pl-8 mb-12">
        <h1 className="text-4xl md:text-7xl font-bold text-white">Ajouter un Nouvel Accessoire</h1>
      </div>

      {/* Affichage du message de confirmation */}
      {confirmationMessage ? (
        <div className="w-3/5 mx-auto my-20 block mb-4 p-4 bg-green-200 text-green-800 border border-green-300 rounded">
          {confirmationMessage}
        </div>
      ) : (
        // Affichage du formulaire si pas encore de confirmation
        <AccessoryForm categories={categories} onSubmit={handleFormSubmit} />
      )}
    </div>
  );
}