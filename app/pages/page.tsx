"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Search, 
  ShoppingCart, 
  Menu, 
  X, 
  Star, 
  Heart, 
  Truck, 
  Shield, 
  Headphones, 
  RotateCcw,
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';
import data from './data.json';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(3);

  const { categories, featuredProducts, features } = data;

  const getIconComponent = (iconName: string) => {
    const icons = {
      Truck,
      Shield,
      Headphones,
      RotateCcw
    };
    const IconComponent = icons[iconName as keyof typeof icons];
    return IconComponent ? <IconComponent className="w-8 h-8" /> : null;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      {/* <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/">
            <div className="flex-shrink-0 ">
              <h1 className="text-2xl font-bold cursor-pointer text-blue-900">ShopFlow</h1>
            </div>
            </Link>
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-700 hover:text-blue-900 transition-colors font-medium">Home</a>
              <Link href="/products" className="text-gray-700 hover:text-blue-900 transition-colors font-medium">Products</Link>
              <a href="#" className="text-gray-700 hover:text-blue-900 transition-colors font-medium">Categories</a>
              <a href="#" className="text-gray-700 hover:text-blue-900 transition-colors font-medium">About</a>
              <a href="#" className="text-gray-700 hover:text-blue-900 transition-colors font-medium">Contact</a>
            </nav>

            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center bg-gray-100 rounded-full px-4 py-2">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="bg-transparent border-none text-black outline-none text-sm w-48"
                />
                <Search className="w-4 h-4 text-gray-500 ml-2" />
              </div>
              
              <button className="relative cursor-pointer p-2 text-gray-700 hover:text-blue-900 transition-colors">
                <ShoppingCart className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 text-gray-700 hover:text-blue-900 transition-colors"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <div className="flex flex-col space-y-2">
                <a href="#" className="text-gray-700 hover:text-blue-900 transition-colors py-2 font-medium">Home</a>
                <a href="#" className="text-gray-700 hover:text-blue-900 transition-colors py-2 font-medium">Products</a>
                <a href="#" className="text-gray-700 hover:text-blue-900 transition-colors py-2 font-medium">Categories</a>
                <a href="#" className="text-gray-700 hover:text-blue-900 transition-colors py-2 font-medium">About</a>
                <a href="#" className="text-gray-700 hover:text-blue-900 transition-colors py-2 font-medium">Contact</a>
                <div className="pt-2">
                  <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
                    <input
                      type="text"
                      placeholder="Search products..."
                      className="bg-transparent text-black border-none outline-none text-sm flex-1"
                    />
                    <Search className="w-4 h-4 text-gray-500" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </header> */}

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                Discover Amazing Products
              </h2>
              <p className="text-xl mb-8 text-blue-100 leading-relaxed">
                Shop the latest trends and find everything you need with our curated collection of premium products.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/products">
                <button className="bg-emerald-500 cursor-pointer hover:bg-emerald-600 px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105">
                  Shop Now
                </button>
                </Link>
                {/* <button className="border-2 border-white hover:bg-white hover:text-blue-900 px-8 py-4 rounded-full font-semibold transition-all duration-300">
                  Learn More
                </button> */}
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Shopping Experience"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Shop by Category
            </h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore our diverse range of categories and find exactly what you're looking for
            </p>
          </div>
          
            <Link href="/products">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <div
                key={index}
                className="group cursor-pointer bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={category.src}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0  group-hover:bg-opacity-30 transition-all duration-300"></div>
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">{category.name}</h4>
                  <p className="text-gray-600">{category.count}</p>
                </div>
              </div>
            ))}
          </div>
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Featured Products
            </h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Handpicked products that our customers love most
            </p>
          </div>

            <Link href="/products">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {product.badge}
                    </span>
                  </div>
                  <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors opacity-0 group-hover:opacity-100">
                    <Heart className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
                
                <div className="p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {product.name}
                  </h4>
                  
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">
                      ({product.reviews})
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-gray-900">
                        ${product.price}
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        ${product.originalPrice}
                      </span>
                    </div>
                  </div>
                  
                  <button className="w-full mt-4 bg-blue-900 hover:bg-blue-800 text-white py-3 rounded-xl font-semibold transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
            </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-900 text-white rounded-full mb-4">
                  {getIconComponent(feature.icon)}
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h4>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl lg:text-4xl font-bold mb-4">
            Stay Updated
          </h3>
          <p className="text-xl text-blue-100 mb-8">
            Subscribe to our newsletter and get exclusive deals and updates
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 border-white border-2 outline-none  text-white rounded-full  "
            />
            <button className="bg-emerald-500 hover:bg-emerald-600 px-8 py-4 rounded-full font-semibold transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h4 className="text-2xl font-bold mb-6">ShopFlow</h4>
              <p className="text-gray-400 mb-6">
                Your trusted partner for quality products and exceptional shopping experience.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Facebook className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Twitter className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Instagram className="w-6 h-6" />
                </a>
              </div>
            </div>

            <div>
              <h5 className="text-lg font-semibold mb-6">Quick Links</h5>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Products</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Categories</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>

            <div>
              <h5 className="text-lg font-semibold mb-6">Customer Service</h5>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Shipping Info</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Returns</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>

            <div>
              <h5 className="text-lg font-semibold mb-6">Contact Info</h5>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-400">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-400">hello@shopflow.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-400">123 Commerce St, City</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 ShopFlow. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;