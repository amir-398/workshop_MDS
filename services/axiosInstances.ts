import axios from "axios"

const axiosInstance = axios.create({
    // URL de base pour l'API
    baseURL: 'http://localhost:3001',
    headers: {
        'Content-Type': 'multipart/form-data',
    },
})

export default axiosInstance