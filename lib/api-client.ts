// import axios from "axios"

// // Create an axios instance with default configuration
// const apiClient = axios.create({
//   baseURL: "https://fakestoreapi.com",
//   headers: {
//     Authorization: `Bearer ${token}`,
//     "Content-Type": "application/json",
//   },
//   timeout: 10000, // 10 seconds
// })

// // Request interceptor
// apiClient.interceptors.request.use(
//   (config) => {
//     // You can add auth tokens here if needed
//     // const token = localStorage.getItem('token');
//     // if (token) {
//     //   config.headers.Authorization = `Bearer ${token}`;
//     // }
//     return config
//   },
//   (error) => {
//     return Promise.reject(error)
//   },
// )

// // Response interceptor
// apiClient.interceptors.response.use(
//   (response) => {
//     return response
//   },
//   (error) => {
//     // Handle specific error codes
//     if (error.response) {
//       // The request was made and the server responded with a status code
//       // that falls out of the range of 2xx
//       console.error("API Error Response:", error.response.status, error.response.data)
//     } else if (error.request) {
//       // The request was made but no response was received
//       console.error("API No Response:", error.request)
//     } else {
//       // Something happened in setting up the request that triggered an Error
//       console.error("API Request Error:", error.message)
//     }
//     return Promise.reject(error)
//   },
// )

// export default apiClient

import axios from "axios"
import type { User } from "@/app/types/user"

// Define the Product type
export interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
}

// Function to get token from cookies
const getTokenFromCookies = (): string | null => {
  if (typeof window === "undefined") {
    // Server-side: return null or handle server-side cookie reading
    return null
  }

  // Client-side: read from document.cookies
  const cookies = document.cookie.split(";")
  const tokenCookie = cookies.find((cookie) => cookie.trim().startsWith("token="))

  if (tokenCookie) {
    return tokenCookie.split("=")[1].trim()
  }

  return null
}

// Get token from cookies
const token = getTokenFromCookies()

// Create an axios instance with default configuration
const apiClient = axios.create({
  baseURL: "https://fakestoreapi.com",
  headers: {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }), // Only add Authorization header if token exists
  },
  timeout: 10000, // 10 seconds
})

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Get fresh token from cookies on each request
    const currentToken = getTokenFromCookies()

    if (currentToken) {
      config.headers.Authorization = `Bearer ${currentToken}`
    } else {
      // Remove Authorization header if no token
      delete config.headers.Authorization
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // Handle specific error codes
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("API Error Response:", error.response.status, error.response.data)

      // Handle 401 Unauthorized - token might be expired
      if (error.response.status === 401) {
        // Clear the token cookie
        if (typeof window !== "undefined") {
          document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
        }
        // Optionally redirect to login page
        // window.location.href = '/login'
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error("API No Response:", error.request)
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("API Request Error:", error.message)
    }
    return Promise.reject(error)
  },
)

// Client-side API functions using axios
export const clientApi = {
  // Get all products (client-side)
  getProducts: async (): Promise<Product[]> => {
    try {
      const response = await apiClient.get("/products")
      return response.data
    } catch (error) {
      console.error("Error fetching products:", error)
      throw error
    }
  },

  // Get single product (client-side)
  getProduct: async (id: string): Promise<Product | null> => {
    try {
      const response = await apiClient.get(`/products/${id}`)
      return response.data
    } catch (error) {
      console.error("Error fetching product:", error)
      return null
    }
  },

  // Create product
  createProduct: async (productData: Omit<Product, "id">): Promise<Product> => {
    const response = await apiClient.post("/products", productData)
    return response.data
  },

  // Update product
  updateProduct: async (id: string, productData: Omit<Product, "id">): Promise<Product> => {
    const response = await apiClient.put(`/products/${id}`, productData)
    return response.data
  },

  // Delete product
  deleteProduct: async (id: string): Promise<void> => {
    await apiClient.delete(`/products/${id}`)
  },

  // User API functions
  // Get all users
  getUsers: async (): Promise<User[]> => {
    try {
      const response = await apiClient.get("/users")
      return response.data
    } catch (error) {
      console.error("Error fetching users:", error)
      throw error
    }
  },

  // Get single user
  getUser: async (id: string): Promise<User | null> => {
    try {
      const response = await apiClient.get(`/users/${id}`)
      return response.data
    } catch (error) {
      console.error("Error fetching user:", error)
      return null
    }
  },

  // Create user
  createUser: async (userData: Omit<User, "id">): Promise<User> => {
    const response = await apiClient.post("/users", userData)
    return response.data
  },

  // Update user
  updateUser: async (id: string, userData: Partial<Omit<User, "id">>): Promise<User> => {
    const response = await apiClient.put(`/users/${id}`, userData)
    return response.data
  },

  // Delete user
  deleteUser: async (id: string): Promise<void> => {
    await apiClient.delete(`/users/${id}`)
  },
}

// Utility functions for token management
export const tokenUtils = {
  // Set token in cookies
  setToken: (token: string, days = 7) => {
    if (typeof window !== "undefined") {
      const expires = new Date()
      expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
      document.cookie = `token=${token}; expires=${expires.toUTCString()}; path=/; secure; samesite=strict`
    }
  },

  // Get token from cookies
  getToken: getTokenFromCookies,

  // Remove token from cookies
  removeToken: () => {
    if (typeof window !== "undefined") {
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    }
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return !!getTokenFromCookies()
  },
}

export default apiClient
