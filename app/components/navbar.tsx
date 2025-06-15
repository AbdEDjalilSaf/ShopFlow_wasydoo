"use client"

import { useState } from "react"
import Link from "next/link"

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" onClick={closeMobileMenu}>
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold cursor-pointer text-blue-900">ShopFlow</h1>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-900 transition-colors font-medium cursor-pointer">
              Home
            </Link>
            <Link href="/products" className="text-blue-900 font-medium cursor-pointer">
              Products
            </Link>
            <Link
              href="/users"
              className="text-gray-700 hover:text-blue-900 transition-colors font-medium cursor-pointer"
            >
              Users
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-blue-900 transition-colors font-medium cursor-pointer"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-blue-900 transition-colors font-medium cursor-pointer"
            >
              Contact
            </Link>
          </nav>

          {/* Desktop Search and Cart */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
              <input
                type="text"
                placeholder="Search products..."
                className="bg-transparent border-none text-black outline-none text-sm w-48"
              />
              <svg className="w-4 h-4 text-gray-500 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            <button className="relative cursor-pointer p-2 text-gray-700 hover:text-blue-900 transition-colors">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </button>
          </div>

          {/* Mobile Cart and Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            {/* Mobile Cart */}
            <button className="relative cursor-pointer p-2 text-gray-700 hover:text-blue-900 transition-colors">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md text-gray-700 hover:text-blue-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              aria-label="Toggle mobile menu"
            >
              <svg
                className={`w-6 h-6 transform transition-transform duration-200 ${isMobileMenuOpen ? "rotate-90" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden relative z-50 ${
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-2 pt-2 pb-3 flex flex-col items-center justify-center space-y-1 bg-white border-t border-gray-200">
            {/* Mobile Search */}
            {/* <div className="px-3 py-2 w-full">
              <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="bg-transparent border-none text-black outline-none text-sm flex-1"
                />
                <svg className="w-4 h-4 text-gray-500 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div> */}

            {/* Mobile Navigation Links */}
            <Link
              href="/"
              onClick={closeMobileMenu}
              className="block px-3 my-2 py-2 w-full text-center rounded-md text-base font-medium cursor-pointer text-gray-700 hover:text-blue-900 hover:bg-gray-50 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/products"
              onClick={closeMobileMenu}
              className="block px-3 my-2 py-2 w-full text-center rounded-md text-base font-medium cursor-pointer text-gray-700 hover:text-blue-900 hover:bg-gray-50 transition-colors"
            >
              Products
            </Link>
            <Link
              href="/users"
              onClick={closeMobileMenu}
              className="block px-3 my-2 py-2 w-full text-center rounded-md text-base font-medium cursor-pointer text-gray-700 hover:text-blue-900 hover:bg-gray-50 transition-colors"
            >
              Users
            </Link>
            <Link
              href="/about"
              onClick={closeMobileMenu}
              className="block px-3 my-2 py-2 w-full text-center rounded-md text-base font-medium cursor-pointer text-gray-700 hover:text-blue-900 hover:bg-gray-50 transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              onClick={closeMobileMenu}
              className="block px-3 my-2 py-2 w-full text-center rounded-md text-base font-medium cursor-pointer text-gray-700 hover:text-blue-900 hover:bg-gray-50 transition-colors"
            >
              Contact
            </Link>

            {/* Mobile Menu Footer */}
            <div className="px-3 py-2 border-t border-gray-200 mt-2">
              <p className="text-xs text-gray-500 text-center">ShopFlow - Your Shopping Companion</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0  z-40 md:hidden"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}
    </nav>
  )
}

