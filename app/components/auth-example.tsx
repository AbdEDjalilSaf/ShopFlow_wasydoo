"use client"

import { useState } from "react"
import { tokenUtils } from "@/lib/api-client"

export default function AuthExample() {
  const [isLoggedIn, setIsLoggedIn] = useState(tokenUtils.isAuthenticated())
  const [token, setToken] = useState("")

  const handleLogin = () => {
    // Simulate login - replace with actual login logic
    const mockToken = "your-jwt-token-here"
    tokenUtils.setToken(mockToken)
    setIsLoggedIn(true)
    console.log("Token set in cookies")
  }

  const handleLogout = () => {
    tokenUtils.removeToken()
    setIsLoggedIn(false)
    console.log("Token removed from cookies")
  }

  const checkToken = () => {
    const currentToken = tokenUtils.getToken()
    setToken(currentToken || "No token found")
    console.log("Current token:", currentToken)
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Authentication Example</h2>

      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-600">Status: {isLoggedIn ? "Logged In" : "Logged Out"}</p>
        </div>

        <div className="flex gap-2">
          <button onClick={handleLogin} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Login
          </button>

          <button onClick={handleLogout} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
            Logout
          </button>

          <button onClick={checkToken} className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">
            Check Token
          </button>
        </div>

        {token && (
          <div className="p-3 bg-gray-100 rounded">
            <p className="text-xs break-all">Token: {token}</p>
          </div>
        )}
      </div>
    </div>
  )
}
