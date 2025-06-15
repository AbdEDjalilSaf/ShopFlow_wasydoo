// // API functions for server-side data fetching
// export type Product = {
//   id: number
//   title: string
//   price: number
//   description: string
//   category: string
//   image: string
//   rating?: {
//     rate: number
//     count: number
//   }
// }

// export async function getProducts(): Promise<Product[]> {
//   try {
//     const response = await fetch("https://fakestoreapi.com/products", {
//       cache: "force-cache", // Cache for better performance
//     })

//     if (!response.ok) {
//       throw new Error("Failed to fetch products")
//     }

//     return await response.json()
//   } catch (error) {
//     console.error("Error fetching products:", error)
//     return []
//   }
// }

// export async function getProduct(id: string): Promise<Product | null> {
//   try {
//     const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
//       cache: "force-cache",
//     })

//     if (!response.ok) {
//       return null
//     }

//     return await response.json()
//   } catch (error) {
//     console.error("Error fetching product:", error)
//     return null
//   }
// }

// export function getUniqueCategories(products: Product[]): string[] {
//   return Array.from(new Set(products.map((product) => product.category)))
// }



// API functions for server-side data fetching
import apiClient from "./api-client"

export type Product = {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating?: {
    rate: number
    count: number
  }
}

export async function getProducts(): Promise<Product[]> {
  try {
    const response = await apiClient.get("/products", {
      // Cache for better performance
      headers: {
        "Cache-Control": "max-age=3600", // Cache for 1 hour
      },
    })
    return response.data
  } catch (error) {
    console.error("Error fetching products:", error)
    return []
  }
}

export async function getProduct(id: string): Promise<Product | null> {
  try {
    const response = await apiClient.get(`/products/${id}`, {
      // Cache for better performance
      headers: {
        "Cache-Control": "max-age=3600", // Cache for 1 hour
      },
    })
    return response.data
  } catch (error) {
    console.error("Error fetching product:", error)
    return null
  }
}

export function getUniqueCategories(products: Product[]): string[] {
  return Array.from(new Set(products.map((product) => product.category)))
}
