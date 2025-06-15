"use client"

import { useRouter } from "next/navigation"
import type { Product } from "@/lib/api"

interface ProductActionsProps {
  product: Product
  userIsAdmin: boolean
}

export function ProductActions({ product, userIsAdmin }: ProductActionsProps) {
  const router = useRouter()

  const handleDelete = async () => {
    // if (!confirm("Are you sure you want to delete this product?")) return

    try {
      const response = await fetch(`https://fakestoreapi.com/products/${product.id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete product")
      }

    //   alert("Product deleted successfully!")
      router.push("/products")
    } catch (err) {
    //   alert("Failed to delete product: " + (err instanceof Error ? err.message : "Unknown error"))
    }
  }

  if (!userIsAdmin) return null

  return (
    <div className="flex gap-2 ml-4">
      <button
        onClick={() => router.push(`/products/${product.id}/edit`)}
        className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
      </button>
      <button
        onClick={handleDelete}
        className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </div>
  )
}
