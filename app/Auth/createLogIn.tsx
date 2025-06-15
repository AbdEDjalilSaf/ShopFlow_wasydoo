"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { LogIn, AlertCircle } from "lucide-react"
import axios from "axios"
import { z } from "zod"
import Cookies from "js-cookie"

// Define the validation schema with Zod
const loginSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }).max(17, { message: "Username too long" }),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(3, { message: "Password must be at least 3 characters" }),
})

// Type for form errors
type FormErrors = {
  username?: string[]
  password?: string[]
  form?: string[]
}

const Login: React.FC = () => {
  const router = useRouter()
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [apiError, setApiError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  // FakeStore API endpoint
  const API_URL = "https://fakestoreapi.com/auth/login"

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear field-specific errors when user types
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const validateForm = () => {
    try {
      loginSchema.parse(formData)
      setErrors({})
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: FormErrors = {}
        error.errors.forEach((err) => {
          const path = err.path[0] as keyof FormErrors
          if (!fieldErrors[path]) {
            fieldErrors[path] = []
          }
          fieldErrors[path]?.push(err.message)
        })
        setErrors(fieldErrors)
      }
      return false
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setApiError(null)

    // Validate form with Zod
    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      const response = await axios.post(
        API_URL,
        {
          username: formData.username,
          password: formData.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      )

      console.log("response from login:", response.data)

      // Store token in localStorage (FakeStore API returns { token: "string" })
      if (response.data.token) {
      // Store token in localStorage (since cookies from next/headers can't be set on client)
       Cookies.set("token", response.data.token, {
          expires: 7, // Token expires in 7 days
          path: "/",
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        })

        Cookies.set("username", formData.username, {
          expires: 7, // Token expires in 7 days
          path: "/",
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        })

        // Navigate to welcome page on successful login
        router.push("/products")
      } else {
        setApiError("Login failed. No token received.")
      }
    } catch (error: any) {
      console.log("error from login:", error)

      // FakeStore API returns plain text error messages, not JSON
      if (error.response?.data) {
        // If the response data is a string (like "username or password is incorrect")
        if (typeof error.response.data === "string") {
          setApiError(error.response.data)
        } else if (error.response.data.message) {
          setApiError(error.response.data.message)
        } else {
          setApiError("Invalid username or password")
        }
      } else if (error.response?.status === 401) {
        setApiError("Invalid username or password")
      } else if (error.response?.status === 404) {
        setApiError("User not found")
      } else if (error.response?.status === 400) {
        setApiError("Invalid request. Please check your credentials.")
      } else {
        setApiError("An error occurred during login. Please try again.")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col justify-center py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="rounded-full bg-blue-100 p-2 sm:p-3">
            <LogIn className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
          </div>
        </div>
        <h2 className="mt-4 sm:mt-6 text-center text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Use any username and password to test the FakeStore API
        </p>
      </div>

      <div className="mt-6 sm:mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-6 sm:py-8 px-4 shadow-lg sm:rounded-xl sm:px-10">
          {apiError && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm flex items-start gap-2">
              <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <span>{apiError}</span>
            </div>
          )}

          {/* Demo credentials info */}
          <div className="mb-4 p-3 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 text-sm">
            <p className="font-medium mb-2">Valid Demo Credentials:</p>
            <div className="space-y-1 text-xs">
              <div>
                <strong>User 1:</strong> mor_2314 / 83r5^_
              </div>
              <div>
                <strong>User 2:</strong> kevinryan / kev02937@
              </div>
              <div>
                <strong>User 3:</strong> donero / ewedon
              </div>
              <div>
                <strong>User 4:</strong> derek / jklg*_56
              </div>
            </div>
            <p className="text-xs mt-2 text-blue-600">💡 Try any of these credentials to test the login</p>
          </div>

          <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit} noValidate>
            <div>
              <label htmlFor="username" className="block text-xs sm:text-sm font-medium text-gray-700">
                Username
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  value={formData.username}
                  onChange={handleChange}
                  className={`appearance-none text-black block w-full px-3 py-2 border ${
                    errors.username ? "border-red-300 ring-red-500" : "border-gray-300"
                  } rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 ${
                    errors.username
                      ? "focus:ring-red-500 focus:border-red-500"
                      : "focus:ring-blue-500 focus:border-blue-500"
                  } text-xs sm:text-sm transition-colors`}
                  placeholder="Enter your username"
                  aria-invalid={errors.username ? "true" : "false"}
                  aria-describedby={errors.username ? "username-error" : undefined}
                />
                {errors.username && errors.username.length > 0 && (
                  <p className="mt-1 text-xs text-red-600" id="username-error">
                    {errors.username[0]}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-xs sm:text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`appearance-none text-black block w-full px-3 py-2 border ${
                    errors.password ? "border-red-300 ring-red-500" : "border-gray-300"
                  } rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 ${
                    errors.password
                      ? "focus:ring-red-500 focus:border-red-500"
                      : "focus:ring-blue-500 focus:border-blue-500"
                  } text-xs sm:text-sm transition-colors`}
                  placeholder="Enter your password"
                  aria-invalid={errors.password ? "true" : "false"}
                  aria-describedby={errors.password ? "password-error" : undefined}
                />
                {errors.password && errors.password.length > 0 && (
                  <p className="mt-1 text-xs text-red-600" id="password-error">
                    {errors.password[0]}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-end">
              <div className="text-xs sm:text-sm">
                <Link
                  href="/forgot-password"
                  className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 sm:py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-xs sm:text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </div>
          </form>

          <div className="mt-4 sm:mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-xs sm:text-sm">
                <span className="px-2 bg-white text-gray-500">Don't have an account?</span>
              </div>
            </div>

            <div className="mt-4 text-center">
              <Link
                href="/register"
                className="font-medium text-blue-600 hover:text-blue-500 transition-colors text-xs sm:text-sm"
              >
                Create an account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
