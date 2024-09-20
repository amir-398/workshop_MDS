"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import ImageUploader from "./ImageUploader";
import * as yup from "yup";

interface CategoryFormProps {
  initialData?: {
    name: string;
    price: number;
    discount_price: number;
    description: string;
    images: File[];
  };
  onSubmit: (formData: any) => void;
}

interface CategoryFormInput {
  name: string;
  price: number;
  discount_price: number;
  description: string;
}

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required("Le nom de la console est obligatoire")
    .min(2, "Le nom de votre console doit contenir au minimum 2 lettres")
    .max(20, "Le nom de votre console doit contenir maximum 20 lettres"),
  price: yup.number().required("Vous devez renseigner le prix de la console"),
  discount_price: yup
    .number()
    .required("Vous devez renseigner le prix de la console"),
  description: yup.string().required("Vous devez ajouter une description"),
});

export default function CategoryForm({
  initialData,
  onSubmit,
}: CategoryFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryFormInput>({
    resolver: yupResolver(validationSchema),
  });

  const [images, setImages] = React.useState<File[]>([]);

  const onSubmitForm: SubmitHandler<CategoryFormInput> = (data) => {
    const name = data.name;
    const price = data.price.toString();
    const discount_price = data.discount_price.toString();
    const description = data.description;
    const formData = new FormData();

    formData.append("name", name);
    formData.append("price", price);
    formData.append("discount_price", discount_price);
    formData.append("description", description);

    // Ajout des images dans formdata (si on a un tableau d'images URL)
    images.forEach((image, index) => {
      formData.append("images", image);
    });

    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitForm)}
      className="space-y-6 max-w-sm mx-auto mb-12"
    >
      {/* Name field */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-900"
        >
          Nom de la console
        </label>
        <input
          id="name"
          type="text"
          {...register("name", { required: "Le nom de la console est requis" })}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>

      {/* Price field */}
      <div>
        <label
          htmlFor="price"
          className="block text-sm font-medium text-gray-900"
        >
          Prix de la console
        </label>
        <input
          id="price"
          type="number"
          {...register("price", {
            required: "Vous devez renseigner le prix de la console",
            min: 0,
          })}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
        {errors.price && <p className="text-red-500">{errors.price.message}</p>}
      </div>

      {/* Discount price field */}
      <div>
        <label
          htmlFor="discountPrice"
          className="block text-sm font-medium text-gray-900"
        >
          Prix remisé
        </label>
        <input
          id="discountPrice"
          type="number"
          {...register("discount_price", { min: 0 })}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
      </div>

      {/* Description field */}
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-900"
        >
          Description
        </label>
        <textarea
          id="description"
          rows="4"
          placeholder="Ajouter une description pour votre console ici..."
          {...register("description", {
            required: "La description de la console est requise",
          })}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        ></textarea>
        {errors.description && (
          <p className="text-red-500">{errors.description.message}</p>
        )}
      </div>

      {/* Image uploader */}
      <ImageUploader images={images} setImages={setImages} />

      {/* Submit button */}
      <button
        type="submit"
        className="bg-black hover:bg-[#2a74ed] transition duration-300 text-white px-4 py-2 rounded w-full"
      >
        Enregistrer
      </button>
    </form>
  );
}
