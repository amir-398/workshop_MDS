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

export const deleteCategory = async (categoryId: number) => {
  try {
    const response = await axiosInstance.delete(`/categories/${categoryId}`);
    return response.data;
  } catch (error) {
    throw new Error('Erreur lors de la suppression de la catégorie');
  }
}