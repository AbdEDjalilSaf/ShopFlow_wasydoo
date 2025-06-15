// "use client"

// import { useActionState } from "react"
// import { useRouter } from "next/navigation"
// import Link from "next/link"
// import { createProduct, type ActionResult } from "@/app/actions/product-actions"

// interface AddProductPageContentProps {
//   categories: string[]
// }

// export function AddProductPageContent({ categories }: AddProductPageContentProps) {
//   const router = useRouter()
//   const productReducer = async (_state: ActionResult | null, formData: FormData) => {
//     return await createProduct(formData)
//   }
//   const [state, formAction, isPending] = useActionState<ActionResult | null, FormData>(productReducer, null)

//   // Redirect to products page on successful submission
//   if (state?.success) {
//     setTimeout(() => {
//       router.push("/products")
//     }, 2000) // Show success message for 2 seconds before redirecting
//   }

//   return (
//     <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       {/* Header */}
//       <div className="mb-8">
//         <div className="flex items-center gap-4 mb-4">
//           <Link
//             href="/products"
//             className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="w-5 h-5"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//               strokeWidth={2}
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//             </svg>
//             Back to Products
//           </Link>
//         </div>
//         <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>
//         <p className="text-gray-600 mt-2">Create a new product for your store</p>
//       </div>

//       {/* Success/Error Messages */}
//       {state?.message && (
//         <div
//           className={`mb-8 p-4 rounded-lg flex items-center gap-3 ${
//             state.success
//               ? "bg-green-50 border border-green-200 text-green-700"
//               : "bg-red-50 border border-red-200 text-red-700"
//           }`}
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="w-6 h-6 flex-shrink-0"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//             strokeWidth={2}
//           >
//             {state.success ? (
//               <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
//             ) : (
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//               />
//             )}
//           </svg>
//           <div>
//             <p className="font-medium">{state.success ? "Success!" : "Error"}</p>
//             <p className="text-sm">{state.message}</p>
//             {state.success && <p className="text-sm mt-1">Redirecting to products page...</p>}
//           </div>
//         </div>
//       )}

//       {/* Form */}
//       <div className="bg-white rounded-xl shadow-lg">
//         <div className="p-8">
//           <form action={formAction} className="space-y-8">
//             {/* Basic Information */}
//             <div>
//               <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="w-5 h-5 text-blue-600"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                   strokeWidth={2}
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                   />
//                 </svg>
//                 Basic Information
//               </h2>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div className="md:col-span-2">
//                   <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
//                     Product Title *
//                   </label>
//                   <input
//                     type="text"
//                     id="title"
//                     name="title"
//                     required
//                     disabled={isPending}
//                     className={`w-full px-4 text-black py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors ${
//                       state?.errors?.title ? "border-red-300" : "border-gray-300"
//                     }`}
//                     placeholder="Enter a descriptive product title"
//                   />
//                   {state?.errors?.title && <p className="mt-2 text-sm text-red-600">{state.errors.title}</p>}
//                 </div>

//                 <div>
//                   <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
//                     Price (USD) *
//                   </label>
//                   <div className="relative">
//                     <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
//                     <input
//                       type="number"
//                       id="price"
//                       name="price"
//                       step="0.01"
//                       min="0"
//                       required
//                       disabled={isPending}
//                       className={`w-full text-black pl-8 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors ${
//                         state?.errors?.price ? "border-red-300" : "border-gray-300"
//                       }`}
//                       placeholder="0.00"
//                     />
//                   </div>
//                   {state?.errors?.price && <p className="mt-2 text-sm text-red-600">{state.errors.price}</p>}
//                 </div>

//                 <div>
//                   <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
//                     Category *
//                   </label>
//                   <select
//                     id="category"
//                     name="category"
//                     required
//                     disabled={isPending}
//                     className={`w-full text-black px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors ${
//                       state?.errors?.category ? "border-red-300" : "border-gray-300"
//                     }`}
//                   >
//                     <option value="">Select a category</option>
//                     {categories.map((category) => (
//                       <option key={category} value={category}>
//                         {category.charAt(0).toUpperCase() + category.slice(1)}
//                       </option>
//                     ))}
//                     <option value="electronics">Electronics</option>
//                     <option value="jewelery">Jewelery</option>
//                     <option value="men's clothing">Men's Clothing</option>
//                     <option value="women's clothing">Women's Clothing</option>
//                   </select>
//                   {state?.errors?.category && <p className="mt-2 text-sm text-red-600">{state.errors.category}</p>}
//                 </div>
//               </div>
//             </div>

//             {/* Description */}
//             <div>
//               <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="w-5 h-5 text-blue-600"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                   strokeWidth={2}
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
//                   />
//                 </svg>
//                 Product Description
//               </h2>

//               <div>
//                 <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
//                   Description *
//                 </label>
//                 <textarea
//                   id="description"
//                   name="description"
//                   rows={6}
//                   required
//                   disabled={isPending}
//                   className={`w-full text-black px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors resize-none ${
//                     state?.errors?.description ? "border-red-300" : "border-gray-300"
//                   }`}
//                   placeholder="Provide a detailed description of your product including features, benefits, and specifications..."
//                 />
//                 {state?.errors?.description && <p className="mt-2 text-sm text-red-600">{state.errors.description}</p>}
//                 <p className="mt-2 text-sm text-gray-500">
//                   Write a compelling description that highlights the key features and benefits of your product.
//                 </p>
//               </div>
//             </div>

//             {/* Media */}
//             <div>
//               <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="w-5 h-5 text-blue-600"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                   strokeWidth={2}
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
//                   />
//                 </svg>
//                 Product Image
//               </h2>

//               <div>
//                 <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
//                   Image URL
//                 </label>
//                 <input
//                   type="url"
//                   id="image"
//                   name="image"
//                   disabled={isPending}
//                   className="w-full text-black px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
//                   placeholder="https://example.com/product-image.jpg"
//                 />
//                 <p className="mt-2 text-sm text-gray-500">
//                   Optional. Provide a direct URL to your product image. If not provided, a placeholder image will be
//                   used.
//                 </p>
//               </div>
//             </div>

//             {/* Form Actions */}
//             <div className="flex flex-col sm:flex-row justify-end gap-4 pt-8 border-t border-gray-200">
//               <Link
//                 href="/products"
//                 className={`px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-center ${
//                   isPending ? "opacity-50 cursor-not-allowed" : ""
//                 }`}
//               >
//                 Cancel
//               </Link>
//               <button
//                 type="submit"
//                 disabled={isPending}
//                 className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[140px]"
//               >
//                 {isPending ? (
//                   <>
//                     <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
//                       <circle
//                         className="opacity-25"
//                         cx="12"
//                         cy="12"
//                         r="10"
//                         stroke="currentColor"
//                         strokeWidth="4"
//                         fill="none"
//                       />
//                       <path
//                         className="opacity-75"
//                         fill="currentColor"
//                         d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                       />
//                     </svg>
//                     Creating...
//                   </>
//                 ) : (
//                   <>
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="w-5 h-5"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                       strokeWidth={2}
//                     >
//                       <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
//                     </svg>
//                     Create Product
//                   </>
//                 )}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>

//       {/* Help Section */}
//       <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
//         <h3 className="text-lg font-medium text-blue-900 mb-3 flex items-center gap-2">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="w-5 h-5"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//             strokeWidth={2}
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//             />
//           </svg>
//           Tips for Creating Great Products
//         </h3>
//         <ul className="text-blue-800 space-y-2 text-sm">
//           <li className="flex items-start gap-2">
//             <span className="text-blue-600 mt-0.5">•</span>
//             <span>Use clear, descriptive titles that include key product features</span>
//           </li>
//           <li className="flex items-start gap-2">
//             <span className="text-blue-600 mt-0.5">•</span>
//             <span>Set competitive prices based on market research</span>
//           </li>
//           <li className="flex items-start gap-2">
//             <span className="text-blue-600 mt-0.5">•</span>
//             <span>Write detailed descriptions highlighting benefits and specifications</span>
//           </li>
//           <li className="flex items-start gap-2">
//             <span className="text-blue-600 mt-0.5">•</span>
//             <span>Choose the most appropriate category for better discoverability</span>
//           </li>
//           <li className="flex items-start gap-2">
//             <span className="text-blue-600 mt-0.5">•</span>
//             <span>Use high-quality images that showcase your product clearly</span>
//           </li>
//         </ul>
//       </div>
//     </main>
//   )
// }


"use client"

import React, { useState } from 'react';
import { ShoppingBag, Plus, Check, AlertCircle, Image as ImageIcon, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { addProduct, getAllProducts } from "@/app/services/productService";
import { Product, FormErrors } from '../types/Product';

const categories = [
  'electronics',
  'jewelery',
  'men\'s clothing',
  'women\'s clothing'
];
export default function AddProductForm() {
  const [formData, setFormData] = useState<Product>({
    title: '',
    price: 0,
    description: '',
    category: '',
    image: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');
  const router = useRouter();

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Product title is required';
    } else if (formData.title.length < 3) {
      newErrors.title = 'Title must be at least 3 characters long';
    }

    if (formData.price <= 0) {
      newErrors.price = 'Price must be greater than 0';
    } else if (formData.price > 10000) {
      newErrors.price = 'Price cannot exceed $10,000';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Product description is required';
    } else if (formData.description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters long';
    }

    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }

    if (!formData.image.trim()) {
      newErrors.image = 'Product image URL is required';
    } else if (!isValidUrl(formData.image)) {
      newErrors.image = 'Please enter a valid image URL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string: string): boolean => {
    try {
      new URL(string);
      return true;
    } catch {
      return false;
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) || 0 : value
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setSubmitStatus('idle');

    try {
      const response = await addProduct(formData);
      console.log('Product added successfully:', response);
      
      setSubmitStatus('success');
      setSubmitMessage('Product added successfully!');
      setSubmitStatus('success');
      setSubmitMessage('Product added successfully!');
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          title: '',
          price: 0,
          description: '',
          category: '',
          image: ''
        });
        setSubmitStatus('idle');
        setSubmitMessage('');
      }, 3000);
      router.back();

    } catch (error) {
      console.error('Error adding product:', error);
      setSubmitStatus('error');
      setSubmitMessage('Failed to add product. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      price: 0,
      description: '',
      category: '',
      image: ''
    });
    setErrors({});
    setSubmitStatus('idle');
    setSubmitMessage('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <ShoppingBag className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Product</h1>
          <p className="text-gray-600">Fill in the details below to add a new product to the store</p>
        </div>

        {/* Status Messages */}
        {submitStatus !== 'idle' && (
          <div className={`mb-6 p-4 rounded-lg flex items-center space-x-3 ${
            submitStatus === 'success' 
              ? 'bg-green-50 border border-green-200 text-green-800' 
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}>
            {submitStatus === 'success' ? (
              <Check className="w-5 h-5 text-green-600" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-600" />
            )}
            <span className="font-medium">{submitMessage}</span>
          </div>
        )}

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Product Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
                Product Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className={`w-full text-black px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  errors.title ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="Enter product title..."
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.title}
                </p>
              )}
            </div>

            {/* Price and Category Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Price */}
              <div>
                <label htmlFor="price" className="block text-sm font-semibold text-gray-700 mb-2">
                  Price ($) *
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price || ''}
                  onChange={handleInputChange}
                  step="0.01"
                  min="0"
                  className={`w-full text-black px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.price ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="0.00"
                />
                {errors.price && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.price}
                  </p>
                )}
              </div>

              {/* Category */}
              <div>
                <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className={`w-full text-black px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.category ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.category}
                  </p>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleInputChange}
                className={`w-full text-black px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none ${
                  errors.description ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="Enter product description..."
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.description}
                </p>
              )}
            </div>

            {/* Image URL */}
            <div>
              <label htmlFor="image" className="block text-sm font-semibold text-gray-700 mb-2">
                Product Image URL *
              </label>
              <div className="relative">
                <input
                  type="url"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  className={`w-full text-black px-4 py-3 pl-12 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.image ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="https://example.com/image.jpg"
                />
                <ImageIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
              {errors.image && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.image}
                </p>
              )}
              
              {/* Image Preview */}
              {formData.image && isValidUrl(formData.image) && (
                <div className="mt-3">
                  <img
                    src={formData.image}
                    alt="Product preview"
                    className="w-32 h-32 object-cover rounded-lg border border-gray-200"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Adding Product...
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5 mr-2" />
                    Add Product
                  </>
                )}
              </button>
              
              <button
                type="button"
                onClick={resetForm}
                disabled={isLoading}
                className="flex-1 sm:flex-none bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Reset Form
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
