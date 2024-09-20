import axiosInstance from './axiosInstances'

export const fetchAccessories = async () => {
    try {
      const response = await axiosInstance.get('/accessoires')
      return response.data
    } catch (error) {
      console.error('Erreur lors de la récupération des accessoires:', error)
      throw error
    }
  }
  
  export const deleteAccessory = async (categoryId: number) => {
    try {
      const response = await axiosInstance.delete(`/accessoires/${categoryId}`);
      return response.data;
    } catch (error) {
      throw new Error('Erreur lors de la suppression de l\'accessoires');
    }
  }
  