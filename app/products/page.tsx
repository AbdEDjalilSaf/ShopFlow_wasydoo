// "use client"

// import type React from "react"

// import { useState, useEffect } from "react"
// import Link from "next/link"
// import Image from "next/image"
// import { useRouter } from "next/navigation"

// // Types
// type Product = {
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

// type ProductFormData = {
//   title: string
//   price: number
//   description: string
//   category: string
//   image: string
// }

// export default function ProductsPage() {
//   const router = useRouter()
//   const [products, setProducts] = useState<Product[]>([])
//   const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
//   const [categories, setCategories] = useState<string[]>([])
//   const [selectedCategory, setSelectedCategory] = useState("all")
//   const [searchQuery, setSearchQuery] = useState("")
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)
//   const [showForm, setShowForm] = useState(false)
//   const [editingProduct, setEditingProduct] = useState<Product | undefined>()
//   const [formLoading, setFormLoading] = useState(false)
//   const [formData, setFormData] = useState<ProductFormData>({
//     title: "",
//     price: 0,
//     description: "",
//     category: "",
//     image: "",
//   })

//   // Mock authentication - in a real app, use proper auth
//   const userIsAdmin = true
//   const userIsAuthenticated = true

//   useEffect(() => {
//     fetchProducts()
//   }, [])

//   useEffect(() => {
//     filterProducts()
//   }, [products, selectedCategory, searchQuery])

//   const fetchProducts = async () => {
//     try {
//       setLoading(true)
//       const response = await fetch("https://fakestoreapi.com/products")

//       if (!response.ok) {
//         throw new Error("Failed to fetch products")
//       }

//       const data: Product[] = await response.json()
//       setProducts(data)

//       // Extract unique categories
//       const uniqueCategories = Array.from(new Set(data.map((product) => product.category)))
//       setCategories(uniqueCategories)
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "An error occurred")
//     } finally {
//       setLoading(false)
//     }
//   }

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

//   const handleAddProduct = async () => {
//     try {
//       setFormLoading(true)
//       const response = await fetch("https://fakestoreapi.com/products", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       })

//       if (!response.ok) {
//         throw new Error("Failed to add product")
//       }

//       const newProduct: Product = await response.json()

//       // Add to local state with a temporary high ID
//       const productWithId = { ...newProduct, id: Date.now() }
//       setProducts((prev) => [...prev, productWithId])
//       setShowForm(false)
//       resetForm()

//       alert("Product added successfully!")
//     } catch (err) {
//       alert("Failed to add product: " + (err instanceof Error ? err.message : "Unknown error"))
//     } finally {
//       setFormLoading(false)
//     }
//   }

//   const handleEditProduct = async () => {
//     if (!editingProduct) return

//     try {
//       setFormLoading(true)
//       const response = await fetch(`https://fakestoreapi.com/products/${editingProduct.id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       })

//       if (!response.ok) {
//         throw new Error("Failed to update product")
//       }

//       const updatedProduct: Product = await response.json()

//       // Update local state
//       setProducts((prev) =>
//         prev.map((p) => (p.id === editingProduct.id ? { ...updatedProduct, id: editingProduct.id } : p)),
//       )
//       setEditingProduct(undefined)
//       setShowForm(false)
//       resetForm()

//       alert("Product updated successfully!")
//     } catch (err) {
//       alert("Failed to update product: " + (err instanceof Error ? err.message : "Unknown error"))
//     } finally {
//       setFormLoading(false)
//     }
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

//   const handleEditClick = (product: Product) => {
//     setEditingProduct(product)
//     setFormData({
//       title: product.title,
//       price: product.price,
//       description: product.description,
//       category: product.category,
//       image: product.image,
//     })
//     setShowForm(true)
//   }

//   const handleFormCancel = () => {
//     setShowForm(false)
//     setEditingProduct(undefined)
//     resetForm()
//   }

//   const resetForm = () => {
//     setFormData({
//       title: "",
//       price: 0,
//       description: "",
//       category: "",
//       image: "",
//     })
//   }

//   const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({
//       ...prev,
//       [name]: name === "price" ? Number.parseFloat(value) || 0 : value,
//     }))
//   }

//   const handleFormSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     if (editingProduct) {
//       handleEditProduct()
//     } else {
//       handleAddProduct()
//     }
//   }

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50">
//         <nav className="bg-white shadow-md sticky top-0 z-50">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="flex items-center justify-between h-16">
//               {/* Logo */}
//               <div className="flex-shrink-0">
//                 <h1 className="text-2xl font-bold text-blue-900">My App</h1>
//               </div>

//               {/* Desktop Navigation */}
//               <nav className="hidden md:flex space-x-8">
//                 <Link href="/" className="text-gray-700 hover:text-blue-900 transition-colors font-medium">
//                   Home
//                 </Link>
//                 <Link href="/products" className="text-blue-900 font-medium">
//                   Products
//                 </Link>
//                 <Link href="/about" className="text-gray-700 hover:text-blue-900 transition-colors font-medium">
//                   About
//                 </Link>
//                 <Link href="/contact" className="text-gray-700 hover:text-blue-900 transition-colors font-medium">
//                   Contact
//                 </Link>
//               </nav>

//               {/* Search and Cart */}
//               <div className="flex items-center space-x-4">
//                 <div className="hidden sm:flex items-center bg-gray-100 rounded-full px-4 py-2">
//                   <input
//                     type="text"
//                     placeholder="Search products..."
//                     className="bg-transparent border-none text-black outline-none text-sm w-48"
//                   />
//                   <svg className="w-4 h-4 text-gray-500 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//                     />
//                   </svg>
//                 </div>

//                 <button className="relative cursor-pointer p-2 text-gray-700 hover:text-blue-900 transition-colors">
//                   <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
//                     />
//                   </svg>
//                   <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
//                     3
//                   </span>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </nav>
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           <div className="animate-pulse">
//             <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-8"></div>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
//               {Array.from({ length: 8 }).map((_, i) => (
//                 <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden">
//                   <div className="h-64 bg-gray-200"></div>
//                   <div className="p-6">
//                     <div className="h-4 bg-gray-200 rounded mb-2"></div>
//                     <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
//                     <div className="h-6 bg-gray-200 rounded w-20 mb-4"></div>
//                     <div className="h-12 bg-gray-200 rounded"></div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <nav className="bg-white shadow-md sticky top-0 z-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-16">
//             {/* Logo */}
//             <Link href="/">
//             <div className="flex-shrink-0 ">
//               <h1 className="text-2xl font-bold cursor-pointer text-blue-900">ShopFlow</h1>
//             </div>
//             </Link>

//             {/* Desktop Navigation */}
//             <nav className="hidden md:flex space-x-8">
//               <Link href="/" className="text-gray-700 hover:text-blue-900 transition-colors font-medium">
//                 Home
//               </Link>
//               <Link href="/products" className="text-blue-900 font-medium">
//                 Products
//               </Link>
//               <Link href="/about" className="text-gray-700 hover:text-blue-900 transition-colors font-medium">
//                 About
//               </Link>
//               <Link href="/contact" className="text-gray-700 hover:text-blue-900 transition-colors font-medium">
//                 Contact
//               </Link>
//             </nav>

//             {/* Search and Cart */}
//             <div className="flex items-center space-x-4">
//               <div className="hidden sm:flex items-center bg-gray-100 rounded-full px-4 py-2">
//                 <input
//                   type="text"
//                   placeholder="Search products..."
//                   className="bg-transparent border-none text-black outline-none text-sm w-48"
//                 />
//                 <svg className="w-4 h-4 text-gray-500 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//                   />
//                 </svg>
//               </div>

//               <button className="relative cursor-pointer p-2 text-gray-700 hover:text-blue-900 transition-colors">
//                 <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
//                   />
//                 </svg>
//                 <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
//                   3
//                 </span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </nav>

//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <div className="flex items-center justify-center gap-4 mb-4">
//             <h1 className="text-4xl font-bold text-gray-900">Our Products</h1>
//             {userIsAdmin && (
//               <button
//                 onClick={() => setShowForm(true)}
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
//               </button>
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

//         {/* Error State */}
//         {error && (
//           <div className="max-w-md mx-auto mb-8 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="w-5 h-5 flex-shrink-0"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//               strokeWidth={2}
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//               />
//             </svg>
//             <span>{error}</span>
//           </div>
//         )}

//         {/* Category Filter */}
//         {!error && (
//           <div className="flex flex-wrap gap-2 mb-8 justify-center">
//             <button
//               onClick={() => setSelectedCategory("all")}
//               className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
//                 selectedCategory === "all" ? "bg-blue-900 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//               }`}
//             >
//               All Products
//             </button>
//             {categories.map((category) => (
//               <button
//                 key={category}
//                 onClick={() => setSelectedCategory(category)}
//                 className={`px-4 py-2 rounded-full text-sm font-medium transition-colors capitalize ${
//                   selectedCategory === category
//                     ? "bg-blue-900 text-white"
//                     : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                 }`}
//               >
//                 {category}
//               </button>
//             ))}
//           </div>
//         )}

//         {/* Products Count */}
//         {!error && (
//           <div className="mb-6">
//             <p className="text-gray-600 text-center">
//               Showing {filteredProducts.length} of {products.length} products
//               {selectedCategory !== "all" && <span className="ml-1">in "{selectedCategory}"</span>}
//               {searchQuery && <span className="ml-1">matching "{searchQuery}"</span>}
//             </p>
//           </div>
//         )}

//         {/* Products Grid */}
//         {error ? (
//           <div className="text-center py-12">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="w-16 h-16 text-gray-400 mx-auto mb-4"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//               strokeWidth={2}
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//               />
//             </svg>
//             <h3 className="text-lg font-medium text-gray-900 mb-2">Failed to load products</h3>
//             <p className="text-gray-600 mb-4">Please try again later</p>
//             <button
//               onClick={fetchProducts}
//               className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
//             >
//               Retry
//             </button>
//           </div>
//         ) : filteredProducts.length === 0 ? (
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
//                         <>
//                           <button
//                             onClick={() => handleEditClick(product)}
//                             className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded-lg transition-colors"
//                           >
//                             <svg
//                               xmlns="http://www.w3.org/2000/svg"
//                               className="h-4 w-4"
//                               fill="none"
//                               viewBox="0 0 24 24"
//                               stroke="currentColor"
//                               strokeWidth={2}
//                             >
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
//                               />
//                             </svg>
//                           </button>
//                           <button
//                             onClick={() => handleDeleteProduct(product.id)}
//                             className="bg-red-100 hover:bg-red-200 text-red-700 p-2 rounded-lg transition-colors"
//                           >
//                             <svg
//                               xmlns="http://www.w3.org/2000/svg"
//                               className="h-4 w-4"
//                               fill="none"
//                               viewBox="0 0 24 24"
//                               stroke="currentColor"
//                               strokeWidth={2}
//                             >
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
//                               />
//                             </svg>
//                           </button>
//                         </>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </main>

//       {/* Product Form Modal */}
//       {showForm && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//             <div className="p-6">
//               <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-2xl font-bold text-gray-900">
//                   {editingProduct ? "Edit Product" : "Add New Product"}
//                 </h2>
//                 <button onClick={handleFormCancel} className="text-gray-500 hover:text-gray-700 transition-colors">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-6 w-6"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                     strokeWidth={2}
//                   >
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
//                   </svg>
//                 </button>
//               </div>

//               <form onSubmit={handleFormSubmit} className="space-y-6">
//                 <div>
//                   <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
//                     Title
//                   </label>
//                   <input
//                     type="text"
//                     id="title"
//                     name="title"
//                     value={formData.title}
//                     onChange={handleFormChange}
//                     required
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
//                     Price ($)
//                   </label>
//                   <input
//                     type="number"
//                     id="price"
//                     name="price"
//                     value={formData.price}
//                     onChange={handleFormChange}
//                     step="0.01"
//                     min="0"
//                     required
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
//                     Category
//                   </label>
//                   <select
//                     id="category"
//                     name="category"
//                     value={formData.category}
//                     onChange={handleFormChange}
//                     required
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   >
//                     <option value="">Select a category</option>
//                     {categories.map((category) => (
//                       <option key={category} value={category}>
//                         {category}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div>
//                   <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
//                     Description
//                   </label>
//                   <textarea
//                     id="description"
//                     name="description"
//                     value={formData.description}
//                     onChange={handleFormChange}
//                     rows={4}
//                     required
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   ></textarea>
//                 </div>

//                 <div>
//                   <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
//                     Image URL
//                   </label>
//                   <input
//                     type="url"
//                     id="image"
//                     name="image"
//                     value={formData.image}
//                     onChange={handleFormChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     placeholder="https://example.com/image.jpg"
//                   />
//                 </div>

//                 <div className="flex justify-end gap-4 pt-4">
//                   <button
//                     type="button"
//                     onClick={handleFormCancel}
//                     className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     disabled={formLoading}
//                     className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
//                   >
//                     {formLoading ? "Saving..." : editingProduct ? "Update Product" : "Add Product"}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }





import { Suspense } from "react"
// import { Navbar } from "@/app/components/navbar"
import { ProductsClient } from "@/app/components/products-client"
import { getProducts, getUniqueCategories } from "@/lib/api"

function ProductsLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* <Navbar /> */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-8"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="h-64 bg-gray-200"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
                  <div className="h-6 bg-gray-200 rounded w-20 mb-4"></div>
                  <div className="h-12 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

async function ProductsContent() {
  const products = await getProducts()
  const categories = getUniqueCategories(products)

  if (products.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* <Navbar /> */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-16 h-16 text-gray-400 mx-auto mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Failed to load products</h3>
            <p className="text-gray-600 mb-4">Please try again later</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <Navbar /> */}
      <ProductsClient initialProducts={products} categories={categories} />
    </div>
  )
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<ProductsLoading />}>
      <ProductsContent />
    </Suspense>
  )
}
