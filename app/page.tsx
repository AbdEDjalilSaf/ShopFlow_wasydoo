import HomePage from "@/app/pages/page"

export default function Home() {
  return (
   <>
   <HomePage />
   
   </> 
  );
}

// import { Heart, ShoppingCart, Star, Truck, Shield, RefreshCw } from "lucide-react"
// import { Navigation } from "@/app/components/navigation"

// export default function HomePage() {
//   const featuredProducts = [
//     {
//       id: 1,
//       name: "Wireless Headphones",
//       price: 99.99,
//       originalPrice: 129.99,
//       image: "/placeholder.svg?height=300&width=300",
//       rating: 4.5,
//       reviews: 128,
//       badge: "Best Seller",
//     },
//     {
//       id: 2,
//       name: "Smart Watch",
//       price: 199.99,
//       originalPrice: 249.99,
//       image: "/placeholder.svg?height=300&width=300",
//       rating: 4.8,
//       reviews: 89,
//       badge: "New",
//     },
//     {
//       id: 3,
//       name: "Laptop Backpack",
//       price: 49.99,
//       originalPrice: 69.99,
//       image: "/placeholder.svg?height=300&width=300",
//       rating: 4.3,
//       reviews: 156,
//       badge: "Sale",
//     },
//     {
//       id: 4,
//       name: "Bluetooth Speaker",
//       price: 79.99,
//       originalPrice: 99.99,
//       image: "/placeholder.svg?height=300&width=300",
//       rating: 4.6,
//       reviews: 203,
//       badge: "Popular",
//     },
//   ]

//   const categories = [
//     { name: "Electronics", image: "/placeholder.svg?height=200&width=200", count: "1,234 items" },
//     { name: "Fashion", image: "/placeholder.svg?height=200&width=200", count: "2,567 items" },
//     { name: "Home & Garden", image: "/placeholder.svg?height=200&width=200", count: "890 items" },
//     { name: "Sports", image: "/placeholder.svg?height=200&width=200", count: "456 items" },
//   ]

//   return (
//     <div className="min-h-screen bg-white">
//       <Navigation />

//       {/* Hero Section */}
//       <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
//         <div className="container mx-auto px-4">
//           <div className="grid lg:grid-cols-2 gap-12 items-center">
//             <div>
//               <h1 className="text-4xl md:text-6xl font-bold mb-6">Shop the Latest Trends</h1>
//               <p className="text-xl mb-8 text-blue-100">
//                 Discover amazing products at unbeatable prices. Free shipping on orders over $50!
//               </p>
//               <div className="flex flex-col sm:flex-row gap-4">
//                 <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
//                   Shop Now
//                 </button>
//                 <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors">
//                   View Deals
//                 </button>
//               </div>
//             </div>
//             <div className="hidden lg:block">
//               <img
//                 src="/placeholder.svg?height=400&width=500"
//                 alt="Hero Product"
//                 className="w-full h-auto rounded-lg shadow-2xl"
//               />
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Features */}
//       <section className="py-12 bg-gray-50">
//         <div className="container mx-auto px-4">
//           <div className="grid md:grid-cols-3 gap-8">
//             <div className="flex items-center gap-4">
//               <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
//                 <Truck className="w-6 h-6 text-blue-600" />
//               </div>
//               <div>
//                 <h3 className="font-semibold text-gray-900">Free Shipping</h3>
//                 <p className="text-gray-600 text-sm">On orders over $50</p>
//               </div>
//             </div>
//             <div className="flex items-center gap-4">
//               <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
//                 <Shield className="w-6 h-6 text-green-600" />
//               </div>
//               <div>
//                 <h3 className="font-semibold text-gray-900">Secure Payment</h3>
//                 <p className="text-gray-600 text-sm">100% secure checkout</p>
//               </div>
//             </div>
//             <div className="flex items-center gap-4">
//               <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
//                 <RefreshCw className="w-6 h-6 text-orange-600" />
//               </div>
//               <div>
//                 <h3 className="font-semibold text-gray-900">Easy Returns</h3>
//                 <p className="text-gray-600 text-sm">30-day return policy</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Featured Products */}
//       <section className="py-16">
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Products</h2>
//             <p className="text-gray-600 max-w-2xl mx-auto">
//               Discover our handpicked selection of trending products with amazing deals
//             </p>
//           </div>

//           <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {featuredProducts.map((product) => (
//               <div
//                 key={product.id}
//                 className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow group border border-gray-200"
//               >
//                 <div className="relative overflow-hidden rounded-t-lg">
//                   <img
//                     src={product.image || "/placeholder.svg"}
//                     alt={product.name}
//                     className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
//                   />
//                   <span className="absolute top-3 left-3 bg-blue-600 text-white px-2 py-1 rounded-md text-xs font-medium">
//                     {product.badge}
//                   </span>
//                   <button className="absolute top-3 right-3 p-2 bg-white/80 hover:bg-white rounded-full transition-colors">
//                     <Heart className="w-4 h-4 text-gray-600" />
//                   </button>
//                 </div>
//                 <div className="p-4">
//                   <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
//                   <div className="flex items-center gap-1 mb-2">
//                     <div className="flex">
//                       {[...Array(5)].map((_, i) => (
//                         <Star
//                           key={i}
//                           className={`w-4 h-4 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
//                         />
//                       ))}
//                     </div>
//                     <span className="text-sm text-gray-600">({product.reviews})</span>
//                   </div>
//                   <div className="flex items-center gap-2 mb-3">
//                     <span className="text-lg font-bold text-gray-900">${product.price}</span>
//                     <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
//                   </div>
//                   <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium">
//                     Add to Cart
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="text-center mt-12">
//             <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium">
//               View All Products
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* Categories */}
//       <section className="py-16 bg-gray-50">
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Shop by Category</h2>
//             <p className="text-gray-600">Find exactly what you're looking for</p>
//           </div>

//           <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {categories.map((category, index) => (
//               <div
//                 key={index}
//                 className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer group border border-gray-200"
//               >
//                 <div className="relative overflow-hidden rounded-t-lg">
//                   <img
//                     src={category.image || "/placeholder.svg"}
//                     alt={category.name}
//                     className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
//                   />
//                 </div>
//                 <div className="p-4 text-center">
//                   <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
//                   <p className="text-sm text-gray-600">{category.count}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Newsletter */}
//       <section className="py-16 bg-blue-600 text-white">
//         <div className="container mx-auto px-4 text-center">
//           <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay Updated</h2>
//           <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
//             Subscribe to our newsletter and be the first to know about new products, exclusive deals, and special
//             offers.
//           </p>
//           <div className="max-w-md mx-auto flex gap-4">
//             <input
//               type="email"
//               placeholder="Enter your email"
//               className="flex-1 px-4 py-2 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
//             />
//             <button className="bg-white text-blue-600 px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors font-medium">
//               Subscribe
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-gray-900 text-white py-12">
//         <div className="container mx-auto px-4">
//           <div className="grid md:grid-cols-4 gap-8">
//             <div>
//               <div className="flex items-center gap-2 mb-4">
//                 <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
//                   <ShoppingCart className="w-4 h-4 text-white" />
//                 </div>
//                 <span className="text-xl font-bold">ShopEasy</span>
//               </div>
//               <p className="text-gray-400 mb-4">
//                 Your one-stop shop for all your needs. Quality products at affordable prices.
//               </p>
//             </div>

//             <div>
//               <h3 className="font-semibold mb-4">Quick Links</h3>
//               <ul className="space-y-2 text-gray-400">
//                 <li>
//                   <a href="#" className="hover:text-white transition-colors">
//                     About Us
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-white transition-colors">
//                     Contact
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-white transition-colors">
//                     FAQ
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-white transition-colors">
//                     Shipping Info
//                   </a>
//                 </li>
//               </ul>
//             </div>

//             <div>
//               <h3 className="font-semibold mb-4">Categories</h3>
//               <ul className="space-y-2 text-gray-400">
//                 <li>
//                   <a href="#" className="hover:text-white transition-colors">
//                     Electronics
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-white transition-colors">
//                     Fashion
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-white transition-colors">
//                     Home & Garden
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-white transition-colors">
//                     Sports
//                   </a>
//                 </li>
//               </ul>
//             </div>

//             <div>
//               <h3 className="font-semibold mb-4">Customer Service</h3>
//               <ul className="space-y-2 text-gray-400">
//                 <li>
//                   <a href="#" className="hover:text-white transition-colors">
//                     Returns
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-white transition-colors">
//                     Track Order
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-white transition-colors">
//                     Size Guide
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-white transition-colors">
//                     Support
//                   </a>
//                 </li>
//               </ul>
//             </div>
//           </div>

//           <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
//             <p>&copy; 2024 ShopEasy. All rights reserved.</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   )
// }

