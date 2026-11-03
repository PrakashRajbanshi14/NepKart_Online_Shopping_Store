import axios from 'axios'

const API = axios.create({
    baseURL : `${import.meta.env.VITE_API_URL || "http://localhost:3000"}/api`, 
    headers : {
        "Content-Type" : "application/json", 
        "Accept" : "application/json" 
    }
})

const APIWITHTOKEN = axios.create({
    baseURL : `${import.meta.env.VITE_API_URL || "http://localhost:3000"}/api`, 
    headers : {
        "Content-Type" : "application/json", 
        "Accept" : "application/json" , 
        "Authorization" : localStorage.getItem("token") ? `Bearer ${localStorage.getItem("token")}` : ""
    }
})

APIWITHTOKEN.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
})

APIWITHTOKEN.interceptors.response.use((response) => response, (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
        localStorage.removeItem("token")
    }
    return Promise.reject(error)
})

export {API,APIWITHTOKEN}
