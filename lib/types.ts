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

export type ProductFormData = {
  title: string
  price: number
  description: string
  category: string
  image: string
}
