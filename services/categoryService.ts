import axiosInstance from './axiosInstances'

export const fetchCategories = async () => {
  try {
    const response = await axiosInstance.get('/categories')
    return response.data
  } catch (error) {
    console.error('Erreur lors de la récupération des catégories:', error)
    throw error
  }
}

export const updateCategory = async (
  categoryId: number, 
  updatedData: FormData | Record<string, any>) => {
    try {
      const data = {
        name : 'updated from the front of peeeeeeter parker'
      }
      const data = {
        const response = await axiosInstance.put(`/categories/674230981564509a8a799aa3`, data)
      console.log("response.data", response.data);
      
      return response.data
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la catégorie :", error)
      throw new Error("Impossible de mettre à jour la catégorie.")
    }
}

export const deleteCategory = async (categoryId: number) => {
  try {
    const response = await axiosInstance.delete(`/categories/${categoryId}`);
    return response.data;
  } catch (error) {
    throw new Error('Erreur lors de la suppression de la catégorie');
  }
}