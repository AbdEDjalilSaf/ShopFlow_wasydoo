// "use client"

// import { useState, useEffect } from "react"
// import Link from "next/link"
// import Image from "next/image"
// import type { Product } from "@/lib/api"

// interface ProductsClientProps {
//   initialProducts: Product[]
//   categories: string[]
// }

// export function ProductsClient({ initialProducts, categories }: ProductsClientProps) {
//   const [products, setProducts] = useState<Product[]>(initialProducts)
//   const [filteredProducts, setFilteredProducts] = useState<Product[]>(initialProducts)
//   const [selectedCategory, setSelectedCategory] = useState("all")
//   const [searchQuery, setSearchQuery] = useState("")
//   const [showAddForm, setShowAddForm] = useState(false)

//   // Mock authentication - in a real app, use proper auth
//   const userIsAdmin = true

//   useEffect(() => {
//     filterProducts()
//   }, [products, selectedCategory, searchQuery])

//   const filterProducts = () => {
//     let filtered = products

//     // Filter by category
//     if (selectedCategory !== "all") {
//       filtered = filtered.filter((product) => product.category === selectedCategory)
//     }

//     // Filter by search query
//     if (searchQuery) {
//       filtered = filtered.filter(
//         (product) =>
//           product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           product.description.toLowerCase().includes(searchQuery.toLowerCase()),
//       )
//     }

//     setFilteredProducts(filtered)
//   }

//   const handleDeleteProduct = async (id: number) => {
//     if (!confirm("Are you sure you want to delete this product?")) return

//     try {
//       const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
//         method: "DELETE",
//       })

//       if (!response.ok) {
//         throw new Error("Failed to delete product")
//       }

//       // Remove from local state
//       setProducts((prev) => prev.filter((p) => p.id !== id))
//       alert("Product deleted successfully!")
//     } catch (err) {
//       alert("Failed to delete product: " + (err instanceof Error ? err.message : "Unknown error"))
//     }
//   }

//   return (
//     <>
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <div className="flex items-center justify-center gap-4 mb-4">
//             <h1 className="text-4xl font-bold text-gray-900">Our Products</h1>
//             {userIsAdmin && (
//               <Link
//                 href="/products/add"
//                 className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="w-4 h-4"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                   strokeWidth={2}
//                 >
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
//                 </svg>
//                 Add Product
//               </Link>
//             )}
//           </div>
//           <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//             Discover amazing products from our curated collection
//           </p>
//         </div>

//         {/* Search Bar */}
//         <div className="max-w-md mx-auto mb-8">
//           <div className="relative">
//             <input
//               type="text"
//               placeholder="Search products..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             />
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//               strokeWidth={2}
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//             </svg>
//           </div>
//         </div>

//         {/* Category Filter */}
//         <div className="flex flex-wrap gap-2 mb-8 justify-center">
//           <button
//             onClick={() => setSelectedCategory("all")}
//             className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
//               selectedCategory === "all" ? "bg-blue-900 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//             }`}
//           >
//             All Products
//           </button>
//           {categories.map((category) => (
//             <button
//               key={category}
//               onClick={() => setSelectedCategory(category)}
//               className={`px-4 py-2 rounded-full text-sm font-medium transition-colors capitalize ${
//                 selectedCategory === category ? "bg-blue-900 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//               }`}
//             >
//               {category}
//             </button>
//           ))}
//         </div>

//         {/* Products Count */}
//         <div className="mb-6">
//           <p className="text-gray-600 text-center">
//             Showing {filteredProducts.length} of {products.length} products
//             {selectedCategory !== "all" && <span className="ml-1">in "{selectedCategory}"</span>}
//             {searchQuery && <span className="ml-1">matching "{searchQuery}"</span>}
//           </p>
//         </div>

//         {/* Products Grid */}
//         {filteredProducts.length === 0 ? (
//           <div className="text-center py-12">
//             <div className="text-6xl mb-4">🔍</div>
//             <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
//             <p className="text-gray-600">Try adjusting your search or filter criteria</p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
//             {filteredProducts.map((product) => (
//               <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
//                 <div className="relative h-64 bg-gray-100">
//                   <Image
//                     src={product.image || "/placeholder.svg"}
//                     alt={product.title}
//                     fill
//                     className="object-contain p-4"
//                     sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
//                   />
//                 </div>
//                 <div className="p-6">
//                   <div className="flex items-center justify-between mb-2">
//                     <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full capitalize">
//                       {product.category}
//                     </span>
//                     {product.rating && (
//                       <div className="flex items-center">
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           className="h-4 w-4 text-yellow-400"
//                           viewBox="0 0 20 20"
//                           fill="currentColor"
//                         >
//                           <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                         </svg>
//                         <span className="text-xs text-gray-600 ml-1">{product.rating.rate}</span>
//                       </div>
//                     )}
//                   </div>
//                   <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{product.title}</h3>
//                   <p className="text-gray-600 text-sm mb-4 line-clamp-3">{product.description}</p>
//                   <div className="flex items-center justify-between">
//                     <span className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
//                     <div className="flex gap-2">
//                       <Link
//                         href={`/products/${product.id}`}
//                         className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
//                       >
//                         View
//                       </Link>
//                       {userIsAdmin && (
//                         <button
//                           onClick={() => handleDeleteProduct(product.id)}
//                           className="bg-red-100 hover:bg-red-200 text-red-700 p-2 rounded-lg transition-colors"
//                         >
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             className="h-4 w-4"
//                             fill="none"
//                             viewBox="0 0 24 24"
//                             stroke="currentColor"
//                             strokeWidth={2}
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
//                             />
//                           </svg>
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </main>
//     </>
//   )
// }



"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import type { Product } from "@/lib/api"
import apiClient from "@/lib/api-client"
import axios from "axios"

interface ProductsClientProps {
  initialProducts: Product[]
  categories: string[]
}

export function ProductsClient({ initialProducts, categories }: ProductsClientProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(initialProducts)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Mock authentication - in a real app, use proper auth
  const userIsAdmin = true

  // Fetch fresh products when component mounts
  useEffect(() => {
    const fetchLatestProducts = async () => {
      try {
        setIsLoading(true)
        const response = await apiClient.get("/products")
        setProducts(response.data)
      } catch (error) {
        console.error("Failed to fetch latest products:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchLatestProducts()
  }, [])

  useEffect(() => {
    filterProducts()
  }, [products, selectedCategory, searchQuery])

  const filterProducts = () => {
    let filtered = products

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((product) => product.category === selectedCategory)
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    setFilteredProducts(filtered)
  }

  const handleDeleteProduct = async (id: number) => {
    // if (!confirm("Are you sure you want to delete this product?")) return

    try {
      await apiClient.delete(`/products/${id}`)

      // Remove from local state
      setProducts((prev) => prev.filter((p) => p.id !== id))
    //   alert("Product deleted successfully!")
    } catch (error) {
      let errorMessage = "Unknown error"

      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || error.message
      } else if (error instanceof Error) {
        errorMessage = error.message
      }

    //   alert(`Failed to delete product: ${errorMessage}`)
    }
  }

  return (
    <>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <h1 className="text-4xl font-bold text-gray-900">Our Products</h1>
            {userIsAdmin && (
              <Link
                href="/products/add"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                Add Product
              </Link>
            )}
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover amazing products from our curated collection
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-black px-4 py-3 pl-12 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === "all" ? "bg-blue-900 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            All Products
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors capitalize ${
                selectedCategory === category ? "bg-blue-900 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products Count */}
        <div className="mb-6">
          <p className="text-gray-600 text-center">
            Showing {filteredProducts.length} of {products.length} products
            {selectedCategory !== "all" && <span className="ml-1">in "{selectedCategory}"</span>}
            {searchQuery && <span className="ml-1">matching "{searchQuery}"</span>}
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}

        {/* Products Grid */}
        {!isLoading && filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="relative h-64 bg-gray-100">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.title}
                    fill
                    className="object-contain p-4"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full capitalize">
                      {product.category}
                    </span>
                    {product.rating && (
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-yellow-400"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-xs text-gray-600 ml-1">{product.rating.rate}</span>
                      </div>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{product.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                    <div className="flex gap-2">
                      <Link
                        href={`/products/${product.id}`}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                      >
                        View
                      </Link>
                      {userIsAdmin && (
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="bg-red-100 hover:bg-red-200 text-red-700 p-2 rounded-lg transition-colors"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
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
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  )
}
