"use client"
import { useState }  from 'react'
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form"
import ImageUploader from './ImageUploader'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"

interface AccessoryFormProps {
    categories: { id: string, name: string }[]
    onSubmit: (formData: FormData) => void
    initialData?: AccessoryFormInput
  }
  
interface AccessoryFormInput {
    category_id: string
    name: string
    price: number
    colors: { name: string, price: string }[]
}

const validationSchema = yup.object().shape({
    category_id: yup.string().required("La catégorie est obligatoire."),
    name : yup.string()
              .required("Le nom de l'accessoire est obligatoire")
              .min(2, "Le nom de l'accessoire doit contenir au minimum 2 lettres")
              .max(20, "Le nom de l'accessoire doit contenir maximum 20 lettres"),
    price: yup.number().required("Vous devez renseigner le prix de la console"),
    colors: yup.array().of(
            yup.object({name: yup.string().required("Le nom de la couleur est obligatoire"),
            price: yup.string().required("Le prix de la couleur est obligatoire"),
        })
    ).min(1, "Vous devez ajouter au moins une couleur")
  });

export default function AccessoryForm({categories, onSubmit} : AccessoryFormProps) {
    const { register, control, handleSubmit, formState: { errors } } = useForm<AccessoryFormInput>({
          resolver :yupResolver(validationSchema),
    })

    // Utilisation de useFieldArray pour gérer le tableau dynamique des couleurs
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'colors'
    })
    
    const onSubmitForm: SubmitHandler<AccessoryFormInput> = (data) => {
       
        const formData = new FormData
        formData.append('category_id', data.category_id);
        formData.append('name', data.name)
        formData.append('price', data.price.toString())

        // Ajout des couleurs dans le formData
        data.colors.forEach((color, index) => {
            formData.append(`colors[${index}][name]`, color.name)
            formData.append(`colors[${index}][price]`, color.price)
        })
        
        onSubmit(formData)
    }

    return (
    <form onSubmit={handleSubmit(onSubmitForm)} className='space-y-6 max-w-sm mx-auto mb-12'>
        {/* Sélection de la catégorie */}
      <div>
        <label htmlFor="category_id" className="block text-sm font-medium text-gray-900">Catégorie</label>
        <select
          id="category_id"
          {...register("category_id")}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        >
          <option value="">Sélectionnez une catégorie</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        {errors.category_id && <p className="text-red-500">{errors.category_id.message}</p>}
      </div>

      {/* Champ de nom */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-900">Nom de l'accessoire</label>
        <input
          id="name"
          type="text"
          {...register("name")}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>

      {/* Champ de prix */}
      <div>
        <label htmlFor="price" className="block text-sm font-medium text-gray-900">Prix</label>
        <input
          id="price"
          type="text"
          {...register("price")}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
        {errors.price && <p className="text-red-500">{errors.price.message}</p>}
      </div>

      {/* Liste des couleurs */}
      <div>
        <label className="block text-sm font-medium text-gray-900">Couleurs</label>
        {fields.map((field, index) => (
          <div key={field.id} className="flex space-x-4 mb-4">
            <input
              type="text"
              placeholder="Nom de la couleur"
              {...register(`colors.${index}.name` as const)}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
            <input
              type="text"
              placeholder="Prix de la couleur"
              {...register(`colors.${index}.price` as const)}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
            <button type="button" onClick={() => remove(index)} className="bg-red-500 text-white px-4 py-2 rounded">Supprimer</button>
          </div>
        ))}
        {errors.colors && <p className="text-red-500">{errors.colors.message}</p>}

        {/* Ajouter une nouvelle couleur */}
        <button type="button" onClick={() => append({ name: '', price: '' })} className="bg-black hover:bg-[#2a74ed] text-white px-4 py-2 rounded">
          Ajouter une couleur
        </button>
      </div>

      {/* Bouton de soumission */}
      <button type="submit" className="bg-black hover:bg-blue-500 transition duration-300 text-white px-4 py-2 rounded w-full">
        Enregistrer l'accessoire
      </button>
    </form>
  )
}
