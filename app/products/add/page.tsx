// import { Suspense } from "react"
// import { Navbar } from "@/app/components/navbar"
// import { AddProductPageContent } from "@/app/components/add-product-form"
// import { getProducts, getUniqueCategories } from "@/lib/api"

// function AddProductLoading() {
//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar />
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="animate-pulse">
//           <div className="h-8 bg-gray-200 rounded w-64 mb-8"></div>
//           <div className="bg-white rounded-xl shadow-lg p-8">
//             <div className="space-y-6">
//               {Array.from({ length: 5 }).map((_, i) => (
//                 <div key={i}>
//                   <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
//                   <div className="h-10 bg-gray-200 rounded"></div>
//                 </div>
//               ))}
//               <div className="flex justify-end gap-4 pt-4">
//                 <div className="h-10 bg-gray-200 rounded w-20"></div>
//                 <div className="h-10 bg-gray-200 rounded w-32"></div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// async function AddProductContent() {
//   const products = await getProducts()
//   const categories = getUniqueCategories(products)

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar />
//       <AddProductPageContent categories={categories} />
//     </div>
//   )
// }

// export default function AddProductPage() {
//   return (
//     <Suspense fallback={<AddProductLoading />}>
//       <AddProductContent />
//     </Suspense>
//   )
// }



// import AddProductForm from "@/app/components/AddProductForm"

// export default function AddProduct() {
//   return (
//     <main className="min-h-screen p-4 md:p-8 lg:p-12 bg-gray-50">
//       <div className="max-w-3xl mx-auto">
//         <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">Add New Product</h1>
//         <AddProductForm />
//       </div>
//     </main>
//   )
// }



import React from 'react';
import AddProductForm from '@/app/components/AddProductForm';

function App() {
  return <AddProductForm />;
}

export default App;
