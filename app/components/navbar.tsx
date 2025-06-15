import Link from "next/link"

export function Navbar() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold cursor-pointer text-blue-900">ShopFlow</h1>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-900 transition-colors font-medium">
              Home
            </Link>
            <Link href="/products" className="text-blue-900 font-medium">
              Products
            </Link>
             <Link href="/users" className="text-gray-700 hover:text-blue-900 transition-colors font-medium">
              Users
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-900 transition-colors font-medium">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-900 transition-colors font-medium">
              Contact
            </Link>
          </nav>

          {/* Search and Cart */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center bg-gray-100 rounded-full px-4 py-2">
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
        </div>
      </div>
    </nav>
  )
}
