// "use client"

// import { useState, useEffect } from "react"
// import { useParams, useRouter } from "next/navigation"
// import Image from "next/image"
// import Link from "next/link"

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

// export default function ProductDetailPage() {
//   const params = useParams()
//   const router = useRouter()
//   const [product, setProduct] = useState<Product | null>(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)

//   // Mock authentication - in a real app, use proper auth
//   const userIsAdmin = true

//   useEffect(() => {
//     if (params.id) {
//       fetchProduct(params.id as string)
//     }
//   }, [params.id])

//   const fetchProduct = async (id: string) => {
//     try {
//       setLoading(true)
//       const response = await fetch(`https://fakestoreapi.com/products/${id}`)

//       if (!response.ok) {
//         throw new Error("Product not found")
//       }

//       const data: Product = await response.json()
//       setProduct(data)
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "An error occurred")
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleDelete = async () => {
//     if (!product || !confirm("Are you sure you want to delete this product?")) return

//     try {
//       const response = await fetch(`https://fakestoreapi.com/products/${product.id}`, {
//         method: "DELETE",
//       })

//       if (!response.ok) {
//         throw new Error("Failed to delete product")
//       }

//       alert("Product deleted successfully!")
//       router.push("/products")
//     } catch (err) {
//       alert("Failed to delete product: " + (err instanceof Error ? err.message : "Unknown error"))
//     }
//   }

//   const formatPrice = (price: number) => {
//     return new Intl.NumberFormat("en-US", {
//       style: "currency",
//       currency: "USD",
//     }).format(price)
//   }

//   const renderStars = (rating?: { rate: number; count: number }) => {
//     if (!rating) return null

//     return Array.from({ length: 5 }, (_, i) => (
//       <svg
//         key={i}
//         xmlns="http://www.w3.org/2000/svg"
//         className={`w-5 h-5 ${i < Math.floor(rating.rate) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
//         viewBox="0 0 20 20"
//         fill="currentColor"
//       >
//         <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//       </svg>
//     ))
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
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//               <div className="h-96 bg-gray-200 rounded-lg"></div>
//               <div className="space-y-4">
//                 <div className="h-8 bg-gray-200 rounded"></div>
//                 <div className="h-6 bg-gray-200 rounded w-3/4"></div>
//                 <div className="h-4 bg-gray-200 rounded w-1/2"></div>
//                 <div className="h-32 bg-gray-200 rounded"></div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   if (error || !product) {
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
//           <div className="text-center py-12">
//             <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
//             <p className="text-gray-600 mb-6">{error}</p>
//             <button
//               onClick={() => router.push("/products")}
//               className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
//             >
//               Back to Products
//             </button>
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
//            <Link href="/">
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
//         {/* Back Button */}
//         <button
//           onClick={() => router.back()}
//           className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="w-4 h-4"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//             strokeWidth={2}
//           >
//             <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//           </svg>
//           Back to Products
//         </button>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//           {/* Product Image */}
//           <div className="bg-white rounded-2xl p-8 shadow-lg">
//             <div className="relative h-96">
//               <Image
//                 src={product.image || "/placeholder.svg"}
//                 alt={product.title}
//                 fill
//                 className="object-contain"
//                 sizes="(max-width: 768px) 100vw, 50vw"
//               />
//             </div>
//           </div>

//           {/* Product Details */}
//           <div className="space-y-6">
//             <div className="flex items-start justify-between">
//               <div className="flex-1">
//                 <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium capitalize mb-4">
//                   {product.category}
//                 </span>
//                 <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.title}</h1>
//               </div>

//               {userIsAdmin && (
//                 <div className="flex gap-2 ml-4">
//                   <button
//                     onClick={() => router.push(`/products/${product.id}/edit`)}
//                     className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="w-4 h-4"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                       strokeWidth={2}
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
//                       />
//                     </svg>
//                   </button>
//                   <button
//                     onClick={handleDelete}
//                     className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="w-4 h-4"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                       strokeWidth={2}
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
//                       />
//                     </svg>
//                   </button>
//                 </div>
//               )}
//             </div>

//             {/* Rating */}
//             {product.rating && (
//               <div className="flex items-center gap-4">
//                 <div className="flex items-center">{renderStars(product.rating)}</div>
//                 <span className="text-lg text-gray-600">
//                   {product.rating.rate} ({product.rating.count} reviews)
//                 </span>
//               </div>
//             )}

//             {/* Price */}
//             <div className="text-4xl font-bold text-gray-900">{formatPrice(product.price)}</div>

//             {/* Description */}
//             <div>
//               <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
//               <p className="text-gray-600 leading-relaxed">{product.description}</p>
//             </div>

//             {/* Product Details */}
//             <div className="bg-gray-50 rounded-lg p-4">
//               <h3 className="text-lg font-semibold text-gray-900 mb-3">Product Details</h3>
//               <div className="space-y-2">
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Product ID:</span>
//                   <span className="font-medium">#{product.id}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Category:</span>
//                   <span className="font-medium capitalize">{product.category}</span>
//                 </div>
//                 {product.rating && (
//                   <>
//                     <div className="flex justify-between">
//                       <span className="text-gray-600">Rating:</span>
//                       <span className="font-medium">{product.rating.rate}/5</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="text-gray-600">Reviews:</span>
//                       <span className="font-medium">{product.rating.count}</span>
//                     </div>
//                   </>
//                 )}
//               </div>
//             </div>

//             {/* Actions */}
//             <div className="flex gap-4 pt-6">
//               <button className="flex-1 bg-blue-900 hover:bg-blue-800 text-white py-4 px-6 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="w-5 h-5"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                   strokeWidth={2}
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
//                   />
//                 </svg>
//                 Add to Cart
//               </button>
//               <button className="p-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="w-5 h-5 text-gray-600"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                   strokeWidth={2}
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
//                   />
//                 </svg>
//               </button>
//               <button className="p-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="w-5 h-5 text-gray-600"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                   strokeWidth={2}
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
//                   />
//                 </svg>
//               </button>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   )
// }







import { Suspense } from "react"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
// import { Navbar } from "@/app/components/navbar"
import { ProductActions } from "@/app/components/product-actions"
import { getProduct } from "@/lib/api"

interface ProductDetailPageProps {
  params: Promise<{ id: string }>
}

function ProductDetailLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* <Navbar /> */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="h-96 bg-gray-200 rounded-lg"></div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded"></div>
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function BackButton() {
  return (
    <Link href="/products" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
      Back to Products
    </Link>
  )
}

function renderStars(rating?: { rate: number; count: number }) {
  if (!rating) return null

  return Array.from({ length: 5 }, (_, i) => (
    <svg
      key={i}
      xmlns="http://www.w3.org/2000/svg"
      className={`w-5 h-5 ${i < Math.floor(rating.rate) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  ))
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price)
}

async function ProductDetailContent({ params }: ProductDetailPageProps) {
  const { id } = await params
  const product = await getProduct(id)

  if (!product) {
    notFound()
  }

  // Mock authentication - in a real app, use proper auth
  const userIsAdmin = true

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <Navbar /> */}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BackButton />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="relative h-96">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.title}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium capitalize mb-4">
                  {product.category}
                </span>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.title}</h1>
              </div>

              <ProductActions product={product} userIsAdmin={userIsAdmin} />
            </div>

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-4">
                <div className="flex items-center">{renderStars(product.rating)}</div>
                <span className="text-lg text-gray-600">
                  {product.rating.rate} ({product.rating.count} reviews)
                </span>
              </div>
            )}

            {/* Price */}
            <div className="text-4xl font-bold text-gray-900">{formatPrice(product.price)}</div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Product Details */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Product Details</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Product ID:</span>
                  <span className="font-medium">#{product.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Category:</span>
                  <span className="font-medium capitalize">{product.category}</span>
                </div>
                {product.rating && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Rating:</span>
                      <span className="font-medium">{product.rating.rate}/5</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Reviews:</span>
                      <span className="font-medium">{product.rating.count}</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-6">
              <button className="flex-1 bg-blue-900 hover:bg-blue-800 text-white py-4 px-6 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                Add to Cart
              </button>
              <button className="p-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
              <button className="p-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default function ProductDetailPage(props: ProductDetailPageProps) {
  return (
    <Suspense fallback={<ProductDetailLoading />}>
      <ProductDetailContent {...props} />
    </Suspense>
  )
}
