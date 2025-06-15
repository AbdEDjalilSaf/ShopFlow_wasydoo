// import React from 'react'

// const page = () => {
//   return (
//     <>
//       <h2>hello page welcome</h2>
//     </>
//   )
// }

// export default page




"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { CheckCircle, ArrowRight, Home, User, LogOut } from "lucide-react"

export default function WelcomePage() {
  const [username, setUsername] = useState<string | null>(null)
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    // Get user data from localStorage
    const storedUsername = localStorage.getItem("username")
    const storedToken = localStorage.getItem("token")

    setUsername(storedUsername)
    setToken(storedToken)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    window.location.href = "/auth"
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-emerald-50 to-blue-50 flex flex-col justify-center py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="rounded-full bg-emerald-100 p-3 sm:p-4">
            <CheckCircle className="h-8 w-8 sm:h-12 sm:w-12 text-emerald-600" />
          </div>
        </div>

        <h2 className="mt-6 text-center text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
          Welcome to ShopFlow!
        </h2>

        {username && (
          <p className="mt-2 text-center text-lg text-gray-600">
            Hello, <span className="font-semibold text-emerald-600">{username}</span>!
          </p>
        )}

        <p className="mt-4 text-center text-sm sm:text-base text-gray-600 max-w-sm mx-auto">
          You have successfully logged in using the FakeStore API. You can now explore our amazing products and
          exclusive deals.
        </p>
      </div>

      <div className="mt-8 sm:mt-10 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-xl sm:px-10">
          {/* User Info */}
          {token && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <User className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Login Details</span>
              </div>
              <p className="text-xs text-gray-600 mb-1">Username: {username}</p>
              <p className="text-xs text-gray-600 break-all">Token: {token.substring(0, 20)}...</p>
            </div>
          )}

          <div className="space-y-4">
            <Link
              href="/"
              className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors group"
            >
              <Home className="w-4 h-4 mr-2" />
              Go to Homepage
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/products"
              className="w-full flex items-center justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors"
            >
              Start Shopping
            </Link>

            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center py-3 px-4 border border-red-300 rounded-lg shadow-sm text-sm font-medium text-red-700 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
