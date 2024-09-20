"use client"
import React from 'react'
import Image from "next/image"

interface ImageUploaderProps {
    images: File[]
    setImages: (files: File[]) => void
}

export default function ImageUploader({ images, setImages }: ImageUploaderProps) {
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            // On concatène les nouveaux fichiers avec les fichiers existants
            setImages([...images, ...Array.from(files)]);
        }
    }
    
    return (
    <div>
      {/* Upload Image Field */}
      <label className="block text-sm font-medium text-gray-700">Images</label>
      <input 
        type="file"
        multiple // permet de sélectionner plusieurs fichiers*
        onChange={handleImageUpload}
        className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
      />  
      {/* <div className="flex items-center justify-center w-full">
          <label className="block text-sm font-medium text-gray-700">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
              </div>
              <input id="dropzone-file" type="file" multiple onChange={handleImageUpload} className="hidden" />
          </label>
      </div>  */}


      {/*Display grid of selected images */}
      {/* Grille d'affichage des images sélectionnées */}
      <div className="mt-4 grid grid-cols-3 gap-4">
        {images.map((image, index) => (
          // Affiche chaque image sous forme de vignette
          // <img 
          //   key={index} 
          //   src={URL.createObjectURL(image)} 
          //   alt={`Image ${index}`} 
          //   className="w-full h-auto" 
          // />
          <Image
              key={index}
              src={URL.createObjectURL(image)}  // Conversion en URL pour l'aperçu
              alt={`Image ${index}`}
              width={470}
              height={366}
              className="rounded-lg w-full h-auto"  // Optionnel : styles de l'image
          />
        ))}
      </div>
      
    </div>
  )
}
