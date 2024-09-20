"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CategoryForm from "../../../../components/Forms/CategoryForm";
import axiosInstance from "../../../../services/axiosInstances";

export default function CreateCategory() {
  const router = useRouter();
  const [confirmationMessage, setConfirmationMessage] = useState<string | null>(
    null
  );

  // Fonction exécutée lors de la soumission du formulaire
  const handleSubmit = async (formData: FormData) => {
    // On appelle l'API pour ajouter la nouvelle catégorie de console
    try {
      const response = await axiosInstance.post("/categories/add", formData);

      // if (response.status === 201) {
      //     setConfirmationMessage('La nouvelle console a été ajouté avec succès !')

      //     setTimeout(() => {
      //         router.push('/back-office/categories')
      //     }, 2000)
      // } else {
      //     console.error('Erreur lors de la création de la catégorie')
      // }

      if (response?.status === 201) {
        setConfirmationMessage(
          "La nouvelle console a été ajoutée avec succès !"
        );
        router.push("/back-office/categories");
      } else {
        console.error("Erreur lors de la création de la catégorie", response);
      }
    } catch (error) {
      console.error("Erreur réseau ou autre", error);
    }
  };

  return (
    <div>
      {/* Titre de la page */}
      <div className="bg-header pt-20 pb-16 pl-8 mb-12">
        <h1 className="text-4xl md:text-7xl font-bold text-white">
          Ajouter une Nouvelle Console
        </h1>
      </div>

      {/* On affiche le message de confirmation si la création est un succès */}
      {confirmationMessage ? (
        <div className="w-3/5 mx-auto my-20 block mb-4 p-4 bg-green-200 text-green-800 border border-green-300 rounded">
          {confirmationMessage}
        </div>
      ) : (
        // On affiche le formulaire uniquement si le message de confirmation n'est pas défini
        <CategoryForm onSubmit={handleSubmit} />
      )}
    </div>
  );
}
