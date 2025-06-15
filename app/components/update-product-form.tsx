// // "use client"

// // import { useState, useEffect, type FormEvent, type ChangeEvent } from "react"
// // import axios from "axios"
// // import { useRouter } from "next/router"

// // interface Product {
// //   id: number
// //   title: string
// //   price: number
// //   description: string
// //   category: string
// //   image: string
// // }

// // interface FormData {
// //   title: string
// //   price: number
// //   description: string
// //   category: string
// //   image: string
// // }

// // interface FormErrors {
// //   title?: string
// //   price?: string
// //   description?: string
// //   category?: string
// //   image?: string
// // }

// // interface UpdateProductFormProps {
// //   productId: string
// // }

// // export default function UpdateProductForm({ productId }: UpdateProductFormProps) {
// //   const [product, setProduct] = useState<Product | null>(null)
// //   const [formData, setFormData] = useState<FormData>({
// //     title: "",
// //     price: 0,
// //     description: "",
// //     category: "",
// //     image: "",
// //   })

// //   const [errors, setErrors] = useState<FormErrors>({})
// //   const [isLoading, setIsLoading] = useState(true)
// //   const [isSubmitting, setIsSubmitting] = useState(false)
// //   const [submitStatus, setSubmitStatus] = useState<{
// //     success: boolean
// //     message: string
// //   } | null>(null)

// //   const categories = ["electronics", "jewelery", "men's clothing", "women's clothing"]
// //     const router = useRouter() 
  
// //   // Fetch product data on component mount
// //   useEffect(() => {
// //     const fetchProduct = async () => {
// //       try {
// //         setIsLoading(true)
// //         const response = await axios.get(`https://fakestoreapi.com/products/${productId}`)
// //         const productData = response.data

// //         setProduct(productData)
// //         setFormData({
// //           title: productData.title,
// //           price: productData.price,
// //           description: productData.description,
// //           category: productData.category,
// //           image: productData.image,
// //         })
// //       } catch (error) {
// //         console.error("Error fetching product:", error)
// //         setSubmitStatus({
// //           success: false,
// //           message: "Failed to load product data. Please check the product ID.",
// //         })
// //       } finally {
// //         setIsLoading(false)
// //       }
// //     }

// //     if (productId) {
// //       fetchProduct()
// //     }
// //   }, [productId])

// //   const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
// //     const { name, value } = e.target

// //     setFormData((prev) => ({
// //       ...prev,
// //       [name]: name === "price" ? Number.parseFloat(value) || 0 : value,
// //     }))

// //     // Clear error when field is edited
// //     if (errors[name as keyof FormErrors]) {
// //       setErrors((prev) => ({
// //         ...prev,
// //         [name]: undefined,
// //       }))
// //     }
// //   }

// //   const validateForm = (): boolean => {
// //     const newErrors: FormErrors = {}

// //     if (!formData.title.trim()) {
// //       newErrors.title = "Title is required"
// //     }

// //     if (formData.price <= 0) {
// //       newErrors.price = "Price must be greater than 0"
// //     }

// //     if (!formData.description.trim()) {
// //       newErrors.description = "Description is required"
// //     }

// //     if (!formData.category) {
// //       newErrors.category = "Category is required"
// //     }

// //     if (!formData.image.trim()) {
// //       newErrors.image = "Image URL is required"
// //     } else if (!isValidUrl(formData.image)) {
// //       newErrors.image = "Please enter a valid URL"
// //     }

// //     setErrors(newErrors)
// //     return Object.keys(newErrors).length === 0
// //   }

// //   const isValidUrl = (url: string): boolean => {
// //     try {
// //       new URL(url)
// //       return true
// //     } catch {
// //       return false
// //     }
// //   }

// //   const handleSubmit = async (e: FormEvent) => {
// //     e.preventDefault()

// //     if (!validateForm()) return

// //     setIsSubmitting(true)
// //     setSubmitStatus(null)

// //     try {
// //       const response = await axios.put(`https://fakestoreapi.com/products/${productId}`, formData, {
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //       })

// //       setSubmitStatus({
// //         success: true,
// //         message: `Product updated successfully! Product ID: ${response.data.id}`,
// //       })

// //       // Update the product state with new data
// //       setProduct({ ...product!, ...formData })

// //       router.back();


// //     } catch (error) {
// //       console.error("Error updating product:", error)
// //       setSubmitStatus({
// //         success: false,
// //         message: "Failed to update product. Please try again.",
// //       })
// //     } finally {
// //       setIsSubmitting(false)
// //     }
// //   }

// //   const handleReset = () => {
// //     if (product) {
// //       setFormData({
// //         title: product.title,
// //         price: product.price,
// //         description: product.description,
// //         category: product.category,
// //         image: product.image,
// //       })
// //       setErrors({})
// //       setSubmitStatus(null)
// //     }
// //   }

// //   if (isLoading) {
// //     return (
// //       <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
// //         <div className="flex items-center justify-center py-12">
// //           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
// //           <span className="ml-3 text-gray-600">Loading product data...</span>
// //         </div>
// //       </div>
// //     )
// //   }

// //   if (!product) {
// //     return (
// //       <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
// //         <div className="text-center py-12">
// //           <div className="text-red-600 text-lg font-medium mb-2">Product Not Found</div>
// //           <p className="text-gray-600">The product with ID "{productId}" could not be found.</p>
// //         </div>
// //       </div>
// //     )
// //   }

// //   return (
// //     <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
// //       {/* Product Info Header */}
// //       <div className="mb-6 p-4 bg-gray-50 rounded-lg">
// //         <h2 className="text-lg font-semibold text-gray-800 mb-2">Updating Product #{product.id}</h2>
// //         <p className="text-sm text-gray-600">Original Title: {product.title}</p>
// //       </div>

// //       {submitStatus && (
// //         <div
// //           className={`mb-6 p-4 rounded-md ${submitStatus.success ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}
// //         >
// //           {submitStatus.message}
// //         </div>
// //       )}

// //       <form onSubmit={handleSubmit} className="space-y-4">
// //         <div>
// //           <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
// //             Product Title
// //           </label>
// //           <input
// //             type="text"
// //             id="title"
// //             name="title"
// //             value={formData.title}
// //             onChange={handleChange}
// //             className={`w-full text-black px-3 py-2 border rounded-md ${errors.title ? "border-red-500" : "border-gray-300"}`}
// //             placeholder="Enter product title"
// //           />
// //           {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
// //         </div>

// //         <div>
// //           <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
// //             Price ($)
// //           </label>
// //           <input
// //             type="number"
// //             id="price"
// //             name="price"
// //             value={formData.price}
// //             onChange={handleChange}
// //             step="0.01"
// //             min="0.01"
// //             className={`w-full  text-black px-3 py-2 border rounded-md ${errors.price ? "border-red-500" : "border-gray-300"}`}
// //           />
// //           {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
// //         </div>

// //         <div>
// //           <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
// //             Description
// //           </label>
// //           <textarea
// //             id="description"
// //             name="description"
// //             value={formData.description}
// //             onChange={handleChange}
// //             rows={4}
// //             className={`w-full  text-black px-3 py-2 border rounded-md ${errors.description ? "border-red-500" : "border-gray-300"}`}
// //             placeholder="Enter product description"
// //           />
// //           {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
// //         </div>

// //         <div>
// //           <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
// //             Category
// //           </label>
// //           <select
// //             id="category"
// //             name="category"
// //             value={formData.category}
// //             onChange={handleChange}
// //             className={`w-full  text-black px-3 py-2 border rounded-md ${errors.category ? "border-red-500" : "border-gray-300"}`}
// //           >
// //             <option value="">Select a category</option>
// //             {categories.map((category) => (
// //               <option key={category} value={category}>
// //                 {category}
// //               </option>
// //             ))}
// //           </select>
// //           {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
// //         </div>

// //         <div>
// //           <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
// //             Image URL
// //           </label>
// //           <input
// //             type="text"
// //             id="image"
// //             name="image"
// //             value={formData.image}
// //             onChange={handleChange}
// //             className={`w-full  text-black px-3 py-2 border rounded-md ${errors.image ? "border-red-500" : "border-gray-300"}`}
// //             placeholder="https://example.com/image.jpg"
// //           />
// //           {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image}</p>}
// //         </div>

// //         {formData.image && isValidUrl(formData.image) && (
// //           <div className="mt-2">
// //             <p className="text-sm text-gray-500 mb-2">Image Preview:</p>
// //             <div className="border border-gray-200 rounded-md p-2 w-full max-w-[200px] h-[200px] flex items-center justify-center">
// //               <img
// //                 src={formData.image || "/placeholder.svg"}
// //                 alt="Product preview"
// //                 className="max-w-full max-h-full object-contain"
// //                 onError={(e) => {
// //                   ;(e.target as HTMLImageElement).src = "/placeholder.svg?height=200&width=200"
// //                   ;(e.target as HTMLImageElement).alt = "Image failed to load"
// //                 }}
// //               />
// //             </div>
// //           </div>
// //         )}

// //         <div className="pt-4 flex flex-col sm:flex-row gap-3">
// //           <button
// //             type="submit"
// //             disabled={isSubmitting}
// //             className={`flex-1 sm:flex-none px-6 py-2 rounded-md text-white font-medium 
// //               ${isSubmitting ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"} 
// //               transition-colors duration-200`}
// //           >
// //             {isSubmitting ? "Updating Product..." : "Update Product"}
// //           </button>

// //           <button
// //             type="button"
// //             onClick={handleReset}
// //             disabled={isSubmitting}
// //             className="flex-1 sm:flex-none px-6 py-2 rounded-md border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors duration-200"
// //           >
// //             Reset to Original
// //           </button>
// //         </div>
// //       </form>

// //       {/* Changes Summary */}
// //       {product && (
// //         <div className="mt-6 p-4 bg-blue-50 rounded-lg">
// //           <h3 className="text-sm font-medium text-blue-800 mb-2">Changes Summary:</h3>
// //           <div className="text-xs text-blue-700 space-y-1">
// //             {formData.title !== product.title && (
// //               <div>
// //                 Title: "{product.title}" → "{formData.title}"
// //               </div>
// //             )}
// //             {formData.price !== product.price && (
// //               <div>
// //                 Price: ${product.price} → ${formData.price}
// //               </div>
// //             )}
// //             {formData.category !== product.category && (
// //               <div>
// //                 Category: "{product.category}" → "{formData.category}"
// //               </div>
// //             )}
// //             {formData.description !== product.description && <div>Description: Modified</div>}
// //             {formData.image !== product.image && <div>Image: Updated</div>}
// //             {formData.title === product.title &&
// //               formData.price === product.price &&
// //               formData.category === product.category &&
// //               formData.description === product.description &&
// //               formData.image === product.image && <div className="text-gray-600">No changes made</div>}
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   )
// // }



// "use client"

// import { useState, useEffect, type FormEvent, type ChangeEvent } from "react"
// import axios from "axios"
// import { useRouter } from "next/navigation"

// interface Product {
//   id: number
//   title: string
//   price: number
//   description: string
//   category: string
//   image: string
// }

// interface FormData {
//   title: string
//   price: number
//   description: string
//   category: string
//   image: string
// }

// interface FormErrors {
//   title?: string
//   price?: string
//   description?: string
//   category?: string
//   image?: string
// }

// interface UpdateProductFormProps {
//   productId: string
// }

// export default function UpdateProductForm({ productId }: UpdateProductFormProps) {
//   const [product, setProduct] = useState<Product | null>(null)
//   const [formData, setFormData] = useState<FormData>({
//     title: "",
//     price: 0,
//     description: "",
//     category: "",
//     image: "",
//   })

//   const [errors, setErrors] = useState<FormErrors>({})
//   const [isLoading, setIsLoading] = useState(true)
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [submitStatus, setSubmitStatus] = useState<{
//     success: boolean
//     message: string
//   } | null>(null)

//   const categories = ["electronics", "jewelery", "men's clothing", "women's clothing"]
//   const router = useRouter()

//   // Fetch product data on component mount
//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         setIsLoading(true)
//         const response = await axios.get(`https://fakestoreapi.com/products/${productId}`)
//         const productData = response.data

//         setProduct(productData)
//         setFormData({
//           title: productData.title,
//           price: productData.price,
//           description: productData.description,
//           category: productData.category,
//           image: productData.image,
//         })
//       } catch (error) {
//         console.error("Error fetching product:", error)
//         setSubmitStatus({
//           success: false,
//           message: "Failed to load product data. Please check the product ID.",
//         })
//       } finally {
//         setIsLoading(false)
//       }
//     }

//     if (productId) {
//       fetchProduct()
//     }
//   }, [productId])

//   const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     const { name, value } = e.target

//     setFormData((prev) => ({
//       ...prev,
//       [name]: name === "price" && (value),
//     }))

//     // Clear error when field is edited
//     if (errors[name as keyof FormErrors]) {
//       setErrors((prev) => ({
//         ...prev,
//         [name]: undefined,
//       }))
//     }
//   }

//   const validateForm = (): boolean => {
//     const newErrors: FormErrors = {}

//     if (!formData.title.trim()) {
//       newErrors.title = "Title is required"
//     }

//     if (formData.price <= 0) {
//       newErrors.price = "Price must be greater than 0"
//     }

//     if (!formData.description.trim()) {
//       newErrors.description = "Description is required"
//     }

//     if (!formData.category) {
//       newErrors.category = "Category is required"
//     }

//     if (!formData.image.trim()) {
//       newErrors.image = "Image URL is required"
//     } 
//     // else if (!isValidUrl(formData.image)) {
//     //   newErrors.image = "Please enter a valid URL"
//     // }

//     setErrors(newErrors)
//     return Object.keys(newErrors).length === 0
//   }

//   const isValidUrl = (url: string): boolean => {
//     try {
//       new URL(url)
//       return true
//     } catch {
//       return false
//     }
//   }

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault()

//     if (!validateForm()) return

//     setIsSubmitting(true)
//     setSubmitStatus(null)

//     try {
//       const response = await axios.put(`https://fakestoreapi.com/products/${productId}`, formData, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       })

//       setSubmitStatus({
//         success: true,
//         message: `Product updated successfully! Product ID: ${response.data.id}`,
//       })

//       // Update the product state with new data
//       setProduct({ ...product!, ...formData })
//       router.back()
//     } catch (error) {
//       console.error("Error updating product:", error)
//       setSubmitStatus({
//         success: false,
//         message: "Failed to update product. Please try again.",
//       })
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   const handleReset = () => {
//     if (product) {
//       setFormData({
//         title: product.title,
//         price: product.price,
//         description: product.description,
//         category: product.category,
//         image: product.image,
//       })
//       setErrors({})
//       setSubmitStatus(null)
//     }
//   }

//   if (isLoading) {
//     return (
//       <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
//         <div className="flex items-center justify-center py-12">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//           <span className="ml-3 text-gray-600">Loading product data...</span>
//         </div>
//       </div>
//     )
//   }

//   if (!product) {
//     return (
//       <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
//         <div className="text-center py-12">
//           <div className="text-red-600 text-lg font-medium mb-2">Product Not Found</div>
//           <p className="text-gray-600">The product with ID "{productId}" could not be found.</p>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">     

//       {submitStatus && (
//         <div
//           className={`mb-6 p-4 rounded-md ${submitStatus.success ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}
//         >
//           {submitStatus.message}
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
//             Product Title
//           </label>
//           <input
//             type="text"
//             id="title"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             className={`w-full text-black px-3 py-2 border rounded-md ${errors.title ? "border-red-500" : "border-gray-300"}`}
//             placeholder="Enter product title"
//           />
//           {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
//         </div>

//         <div>
//           <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
//             Price ($)
//           </label>
//           <input
//             type="number"
//             id="price"
//             name="price"
//             value={formData.price}
//             onChange={handleChange}
//             // step="0.01"
//             min="0"
//             className={`w-full text-black px-3 py-2 border rounded-md ${errors.price ? "border-red-500" : "border-gray-300"}`}
//           />
//           {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
//         </div>

//         <div>
//           <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
//             Description
//           </label>
//           <textarea
//             id="description"
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             rows={4}
//             className={`w-full text-black px-3 py-2 border rounded-md ${errors.description ? "border-red-500" : "border-gray-300"}`}
//             placeholder="Enter product description"
//           />
//           {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
//         </div>

//         <div>
//           <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
//             Category
//           </label>
//           <select
//             id="category"
//             name="category"
//             value={formData.category}
//             onChange={handleChange}
//             className={`w-full text-black px-3 py-2 border rounded-md ${errors.category ? "border-red-500" : "border-gray-300"}`}
//           >
//             <option value="">Select a category</option>
//             {categories.map((category) => (
//               <option key={category} value={category}>
//                 {category}
//               </option>
//             ))}
//           </select>
//           {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
//         </div>

//         {/* <div>
//           <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
//             Image URL
//           </label>
//           <input
//             type="text"
//             id="image"
//             name="image"
//             value={formData.image}
//             onChange={handleChange}
//             className={`w-full text-black px-3 py-2 border rounded-md ${errors.image ? "border-red-500" : "border-gray-300"}`}
//             placeholder="https://example.com/image.jpg"
//           />
//           {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image}</p>}
//         </div> */}

//                 <div>
//             <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
//              Image URL
//            </label>
//            <input
//              type="text"
//              id="image"
//              name="image"
//              value={formData.image}
//              onChange={handleChange}
//              className={`w-full  text-black px-3 py-2 border rounded-md ${errors.image ? "border-red-500" : "border-gray-300"}`}
//              placeholder="https://example.com/image.jpg"
//            />
//            {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image}</p>}
//          </div>

//         {formData.image && (
//           <div className="mt-2">
//             <p className="text-sm text-gray-500 mb-2">Image Preview:</p>
//             <div className="border border-gray-200 rounded-md p-2 w-full max-w-[200px] h-[200px] flex items-center justify-center">
//               <img
//                 src={formData.image || "/placeholder.svg"}
//                 alt="Product preview"
//                 className="max-w-full max-h-full object-contain"
//                 onError={(e) => {
//                   ;(e.target as HTMLImageElement).src = "/placeholder.svg?height=200&width=200"
//                   ;(e.target as HTMLImageElement).alt = "Image failed to load"
//                 }}
//               />
//             </div>
//           </div>
//         )}

//         <div className="pt-4 flex flex-col sm:flex-row gap-3">
//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className={`flex-1 sm:flex-none px-6 py-2 rounded-md text-white font-medium 
//               ${isSubmitting ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"} 
//               transition-colors duration-200`}
//           >
//             {isSubmitting ? "Updating Product..." : "Update Product"}
//           </button>

//           <button
//             type="button"
//             onClick={handleReset}
//             disabled={isSubmitting}
//             className="flex-1 sm:flex-none px-6 py-2 rounded-md border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors duration-200"
//           >
//             Reset to Original
//           </button>
//         </div>
//       </form>

//       {/* Changes Summary */}
//       {product && (
//         <div className="mt-6 p-4 bg-blue-50 rounded-lg">
//           <h3 className="text-sm font-medium text-blue-800 mb-2">Changes Summary:</h3>
//           <div className="text-xs text-blue-700 space-y-1">
//             {formData.title !== product.title && (
//               <div>
//                 Title: "{product.title}" → "{formData.title}"
//               </div>
//             )}
//             {formData.price !== product.price && (
//               <div>
//                 Price: ${product.price} → ${formData.price}
//               </div>
//             )}
//             {formData.category !== product.category && (
//               <div>
//                 Category: "{product.category}" → "{formData.category}"
//               </div>
//             )}
//             {formData.description !== product.description && <div>Description: Modified</div>}
//             {formData.image !== product.image && <div>Image: Updated</div>}
//             {formData.title === product.title &&
//               formData.price === product.price &&
//               formData.category === product.category &&
//               formData.description === product.description &&
//               formData.image === product.image && <div className="text-gray-600">No changes made</div>}
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }




"use client"

import { useState, useEffect, type FormEvent, type ChangeEvent } from "react"
import { useRouter } from "next/navigation"
import clientApi from "@/lib/api-client"

interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
}

interface FormData {
  title: string
  price: number
  description: string
  category: string
  image: string
}

interface FormErrors {
  title?: string
  price?: string
  description?: string
  category?: string
  image?: string
}

interface UpdateProductFormProps {
  productId: string
}

export default function UpdateProductForm({ productId }: UpdateProductFormProps) {
  const [product, setProduct] = useState<Product | null>(null)
  const [formData, setFormData] = useState<FormData>({
    title: "",
    price: 0,
    description: "",
    category: "",
    image: "",
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean
    message: string
  } | null>(null)

  const categories = ["electronics", "jewelery", "men's clothing", "women's clothing"]
  const router = useRouter()

  // Fetch product data on component mount
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true)
        const response = await clientApi.get(`/products/${productId}`)
        const productData = response.data

        if (!productData) {
          setSubmitStatus({
            success: false,
            message: "Failed to load product data. Please check the product ID.",
          })
          return
        }

        setProduct(productData)
        setFormData({
          title: productData.title,
          price: productData.price,
          description: productData.description,
          category: productData.category,
          image: productData.image,
        })
      } catch (error) {
        console.error("Error fetching product:", error)
        setSubmitStatus({
          success: false,
          message: "Failed to load product data. Please try again.",
        })
      } finally {
        setIsLoading(false)
      }
    }

    if (productId) {
      fetchProduct()
    }
  }, [productId])

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? Number.parseFloat(value) : value,
    }))

    // // Clear error when field is edited
    // if (errors[name as keyof FormErrors]) {
    //   setErrors((prev) => ({
    //     ...prev,
    //     [name]: undefined,
    //   }))
    // }
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.title.trim()) {
      newErrors.title = "Title is required"
    }

    if (formData.price <= 0) {
      newErrors.price = "Price must be greater than 0"
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required"
    }

    if (!formData.category) {
      newErrors.category = "Category is required"
    }

    if (!formData.image.trim()) {
      newErrors.image = "Image URL is required"
    } else if (!isValidUrl(formData.image)) {
      newErrors.image = "Please enter a valid URL"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const response = await clientApi.put(`/products/${productId}`, formData)
      const updatedProduct = response.data

      setSubmitStatus({
        success: true,
        message: `Product updated successfully! Product ID: ${updatedProduct.id}`,
      })

      // Update the product state with new data
      setProduct({ ...product!, ...formData })

      // Refresh the router to update any cached data
      router.refresh()

      // Optionally navigate back after a delay
      setTimeout(() => {
        router.back()
      }, 800)
    } catch (error) {
      console.error("Error updating product:", error)
      setSubmitStatus({
        success: false,
        message: "Failed to update product. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReset = () => {
    if (product) {
      setFormData({
        title: product.title,
        price: product.price,
        description: product.description,
        category: product.category,
        image: product.image,
      })
      setErrors({})
      setSubmitStatus(null)
    }
  }

  if (isLoading) {
    return (
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Loading product data...</span>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
        <div className="text-center py-12">
          <div className="text-red-600 text-lg font-medium mb-2">Product Not Found</div>
          <p className="text-gray-600">The product with ID "{productId}" could not be found.</p>
          <button
            onClick={() => router.back()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">

      {submitStatus && (
        <div
          className={`mb-6 p-4 rounded-md ${submitStatus.success ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}
        >
          {submitStatus.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Product Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`w-full text-black px-3 py-2 border rounded-md ${errors.title ? "border-red-500" : "border-gray-300"}`}
            placeholder="Enter product title"
          />
          {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
            Price ($)
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            step="0.01"
            min="0.01"
            className={`w-full text-black px-3 py-2 border rounded-md ${errors.price ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className={`w-full text-black px-3 py-2 border rounded-md ${errors.description ? "border-red-500" : "border-gray-300"}`}
            placeholder="Enter product description"
          />
          {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={`w-full text-black px-3 py-2 border rounded-md ${errors.category ? "border-red-500" : "border-gray-300"}`}
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
        </div>

        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
            Image URL
          </label>
          <input
            type="text"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className={`w-full text-black px-3 py-2 border rounded-md ${errors.image ? "border-red-500" : "border-gray-300"}`}
            placeholder="https://example.com/image.jpg"
          />
          {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image}</p>}
        </div>

        {formData.image && (
          <div className="mt-2">
            <p className="text-sm text-gray-500 mb-2">Image Preview:</p>
            <div className="border border-gray-200 rounded-md p-2 w-full max-w-[200px] h-[200px] flex items-center justify-center">
              <img
                src={formData.image || "/placeholder.svg"}
                alt="Product preview"
                className="max-w-full max-h-full object-contain"
                onError={(e) => {
                  ;(e.target as HTMLImageElement).src = "/placeholder.svg?height=200&width=200"
                  ;(e.target as HTMLImageElement).alt = "Image failed to load"
                }}
              />
            </div>
          </div>
        )}

        <div className="pt-4 flex flex-col sm:flex-row gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`flex-1 sm:flex-none px-6 py-2 rounded-md text-white font-medium 
              ${isSubmitting ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"} 
              transition-colors duration-200`}
          >
            {isSubmitting ? "Updating Product..." : "Update Product"}
          </button>

          <button
            type="button"
            onClick={handleReset}
            disabled={isSubmitting}
            className="flex-1 sm:flex-none px-6 py-2 rounded-md border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors duration-200"
          >
            Reset to Original
          </button>

          <button
            type="button"
            onClick={() => router.back()}
            disabled={isSubmitting}
            className="flex-1 sm:flex-none px-6 py-2 rounded-md border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors duration-200"
          >
            Cancel
          </button>
        </div>
      </form>

      {/* Changes Summary */}
      {product && isValidUrl(formData.image) && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="text-sm font-medium text-blue-800 mb-2">Changes Summary:</h3>
          <div className="text-xs text-blue-700 space-y-1">
            {formData.title !== product.title && (
              <div>
                Title: "{product.title}" → "{formData.title}"
              </div>
            )}
            {formData.price !== product.price && (
              <div>
                Price: ${product.price} → ${formData.price}
              </div>
            )}
            {formData.category !== product.category && (
              <div>
                Category: "{product.category}" → "{formData.category}"
              </div>
            )}
            {formData.description !== product.description && <div>Description: Modified</div>}
            {formData.image !== product.image && <div>Image: Updated</div>}
            {formData.title === product.title &&
              formData.price === product.price &&
              formData.category === product.category &&
              formData.description === product.description &&
              formData.image === product.image && <div className="text-gray-600">No changes made</div>}
          </div>
        </div>
      )}
    </div>
  )
}
