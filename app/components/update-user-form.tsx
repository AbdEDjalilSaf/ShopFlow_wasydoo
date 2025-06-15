"use client"

import { useState, useEffect, type FormEvent, type ChangeEvent } from "react"
import { useRouter } from "next/navigation"
import { clientApi } from "@/lib/api-client"
import type { User } from "@/app/types/user"

interface UserFormData {
  username: string
  email: string
  password: string
  firstname: string
  lastname: string
  city: string
  street: string
  number: number
  zipcode: string
  lat: string
  long: string
  phone: string
}

interface FormErrors {
  username?: string
  email?: string
  password?: string
  firstname?: string
  lastname?: string
  city?: string
  street?: string
  number?: string
  zipcode?: string
  lat?: string
  long?: string
  phone?: string
}

interface UpdateUserFormProps {
  userId: string
}

export default function UpdateUserForm({ userId }: UpdateUserFormProps) {
  const [user, setUser] = useState<User | null>(null)
  const [formData, setFormData] = useState<UserFormData>({
    username: "",
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    city: "",
    street: "",
    number: 0,
    zipcode: "",
    lat: "",
    long: "",
    phone: "",
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean
    message: string
    user?: User
  } | null>(null)

  const router = useRouter()

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true)
        const userData = await clientApi.getUser(userId)

        if (!userData) {
          setSubmitStatus({
            success: false,
            message: "Failed to load user data. Please check the user ID.",
          })
          return
        }

        setUser(userData)
        setFormData({
          username: userData.username,
          email: userData.email,
          password: userData.password,
          firstname: userData.name.firstname,
          lastname: userData.name.lastname,
          city: userData.address.city,
          street: userData.address.street,
          number: userData.address.number,
          zipcode: userData.address.zipcode,
          lat: userData.address.geolocation.lat,
          long: userData.address.geolocation.long,
          phone: userData.phone || "",
        })
      } catch (error) {
        console.error("Error fetching user:", error)
        setSubmitStatus({
          success: false,
          message: "Failed to load user data. Please try again.",
        })
      } finally {
        setIsLoading(false)
      }
    }

    if (userId) {
      fetchUser()
    }
  }, [userId])

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: name === "number" ? Number.parseInt(value) : value,
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

    // Basic validation
    if (!formData.username.trim()) {
      newErrors.username = "Username is required"
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    if (!formData.firstname.trim()) {
      newErrors.firstname = "First name is required"
    }

    if (!formData.lastname.trim()) {
      newErrors.lastname = "Last name is required"
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required"
    }

    if (!formData.street.trim()) {
      newErrors.street = "Street is required"
    }

    if (formData.number <= 0) {
      newErrors.number = "Street number must be greater than 0"
    }

    if (!formData.zipcode.trim()) {
      newErrors.zipcode = "Zip code is required"
    }

    // Validate coordinates if provided
    if (formData.lat && (isNaN(Number(formData.lat)) || Number(formData.lat) < -90 || Number(formData.lat) > 90)) {
      newErrors.lat = "Latitude must be between -90 and 90"
    }

    if (
      formData.long &&
      (isNaN(Number(formData.long)) || Number(formData.long) < -180 || Number(formData.long) > 180)
    ) {
      newErrors.long = "Longitude must be between -180 and 180"
    }

    // Validate phone if provided
    if (formData.phone && !/^[\d\-+$$$$\s]+$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      // Transform form data to match API structure
      const userData: Partial<Omit<User, "id">> = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        name: {
          firstname: formData.firstname,
          lastname: formData.lastname,
        },
        address: {
          city: formData.city,
          street: formData.street,
          number: formData.number,
          zipcode: formData.zipcode,
          geolocation: {
            lat: formData.lat || "0",
            long: formData.long || "0",
          },
        },
        ...(formData.phone && { phone: formData.phone }),
      }

      const updatedUser = await clientApi.updateUser(userId, userData)

      setSubmitStatus({
        success: true,
        message: `User updated successfully! User ID: ${updatedUser.id}`,
        user: updatedUser,
      })

      // Update the user state with new data
      setUser({ ...user!, ...updatedUser })

      // Refresh the router to update any cached data
      router.refresh()

      // Optionally navigate back after a delay
      setTimeout(() => {
        router.back()
      }, 1000)
    } catch (error) {
      console.error("Error updating user:", error)
      setSubmitStatus({
        success: false,
        message: "Failed to update user. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReset = () => {
    if (user) {
      setFormData({
        username: user.username,
        email: user.email,
        password: user.password,
        firstname: user.name.firstname,
        lastname: user.name.lastname,
        city: user.address.city,
        street: user.address.street,
        number: user.address.number,
        zipcode: user.address.zipcode,
        lat: user.address.geolocation.lat,
        long: user.address.geolocation.long,
        phone: user.phone || "",
      })
      setErrors({})
      setSubmitStatus(null)
    }
  }

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-4 md:p-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">Loading user data...</span>
          </div>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto p-4 md:p-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-center py-12">
            <div className="text-red-600 text-lg font-medium mb-2">User Not Found</div>
            <p className="text-gray-600">The user with ID "{userId}" could not be found.</p>
            <button
              onClick={() => router.back()}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <div className="bg-white rounded-lg shadow-md p-6">

        {submitStatus && (
          <div
            className={`mb-6 p-4 rounded-md ${submitStatus.success ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}
          >
            <div className="flex items-center">
              {submitStatus.success ? (
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
              {submitStatus.message}
            </div>
            {submitStatus.success && submitStatus.user && (
              <div className="mt-2 text-sm">
                <p>Updated Username: @{submitStatus.user.username}</p>
                <p>Updated Email: {submitStatus.user.email}</p>
              </div>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Account Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                  Username *
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className={`w-full text-black px-3 py-2 border rounded-md ${errors.username ? "border-red-500" : "border-gray-300"}`}
                  placeholder="Enter username"
                />
                {errors.username && <p className="mt-1 text-sm text-red-600">{errors.username}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full text-black px-3 py-2 border rounded-md ${errors.email ? "border-red-500" : "border-gray-300"}`}
                  placeholder="Enter email address"
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>

              <div className="md:col-span-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password *
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full text-black px-3 py-2 border rounded-md ${errors.password ? "border-red-500" : "border-gray-300"}`}
                  placeholder="Enter password"
                />
                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstname" className="block text-sm font-medium text-gray-700 mb-1">
                  First Name *
                </label>
                <input
                  type="text"
                  id="firstname"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                  className={`w-full text-black px-3 py-2 border rounded-md ${errors.firstname ? "border-red-500" : "border-gray-300"}`}
                  placeholder="Enter first name"
                />
                {errors.firstname && <p className="mt-1 text-sm text-red-600">{errors.firstname}</p>}
              </div>

              <div>
                <label htmlFor="lastname" className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name *
                </label>
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  className={`w-full text-black px-3 py-2 border rounded-md ${errors.lastname ? "border-red-500" : "border-gray-300"}`}
                  placeholder="Enter last name"
                />
                {errors.lastname && <p className="mt-1 text-sm text-red-600">{errors.lastname}</p>}
              </div>

              <div className="md:col-span-2">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full text-black px-3 py-2 border rounded-md ${errors.phone ? "border-red-500" : "border-gray-300"}`}
                  placeholder="Enter phone number (optional)"
                />
                {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Address Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-1">
                  Street Name *
                </label>
                <input
                  type="text"
                  id="street"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  className={`w-full text-black px-3 py-2 border rounded-md ${errors.street ? "border-red-500" : "border-gray-300"}`}
                  placeholder="Enter street name"
                />
                {errors.street && <p className="mt-1 text-sm text-red-600">{errors.street}</p>}
              </div>

              <div>
                <label htmlFor="number" className="block text-sm font-medium text-gray-700 mb-1">
                  Street Number *
                </label>
                <input
                  type="number"
                  id="number"
                  name="number"
                  value={formData.number}
                  onChange={handleChange}
                  min="1"
                  className={`w-full text-black px-3 py-2 border rounded-md ${errors.number ? "border-red-500" : "border-gray-300"}`}
                  placeholder="Enter street number"
                />
                {errors.number && <p className="mt-1 text-sm text-red-600">{errors.number}</p>}
              </div>

              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                  City *
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className={`w-full text-black px-3 py-2 border rounded-md ${errors.city ? "border-red-500" : "border-gray-300"}`}
                  placeholder="Enter city"
                />
                {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
              </div>

              <div>
                <label htmlFor="zipcode" className="block text-sm font-medium text-gray-700 mb-1">
                  Zip Code *
                </label>
                <input
                  type="text"
                  id="zipcode"
                  name="zipcode"
                  value={formData.zipcode}
                  onChange={handleChange}
                  className={`w-full text-black px-3 py-2 border rounded-md ${errors.zipcode ? "border-red-500" : "border-gray-300"}`}
                  placeholder="Enter zip code"
                />
                {errors.zipcode && <p className="mt-1 text-sm text-red-600">{errors.zipcode}</p>}
              </div>
            </div>
          </div>

          {/* Geolocation Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Geolocation</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="lat" className="block text-sm font-medium text-gray-700 mb-1">
                  Latitude
                </label>
                <input
                  type="text"
                  id="lat"
                  name="lat"
                  value={formData.lat}
                  onChange={handleChange}
                  className={`w-full text-black px-3 py-2 border rounded-md ${errors.lat ? "border-red-500" : "border-gray-300"}`}
                  placeholder="Enter latitude (-90 to 90)"
                />
                {errors.lat && <p className="mt-1 text-sm text-red-600">{errors.lat}</p>}
              </div>

              <div>
                <label htmlFor="long" className="block text-sm font-medium text-gray-700 mb-1">
                  Longitude
                </label>
                <input
                  type="text"
                  id="long"
                  name="long"
                  value={formData.long}
                  onChange={handleChange}
                  className={`w-full text-black px-3 py-2 border rounded-md ${errors.long ? "border-red-500" : "border-gray-300"}`}
                  placeholder="Enter longitude (-180 to 180)"
                />
                {errors.long && <p className="mt-1 text-sm text-red-600">{errors.long}</p>}
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex-1 sm:flex-none px-6 py-3 rounded-md text-white font-medium 
                ${isSubmitting ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"} 
                transition-colors duration-200`}
            >
              {isSubmitting ? "Updating User..." : "Update User"}
            </button>

            <button
              type="button"
              onClick={handleReset}
              disabled={isSubmitting}
              className="flex-1 sm:flex-none px-6 py-3 rounded-md border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors duration-200"
            >
              Reset to Original
            </button>

            <button
              type="button"
              onClick={() => router.back()}
              disabled={isSubmitting}
              className="flex-1 sm:flex-none px-6 py-3 rounded-md border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </form>

        {/* Changes Summary */}
        {user && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-sm font-medium text-blue-800 mb-2">Changes Summary:</h3>
            <div className="text-xs text-blue-700 space-y-1">
              {formData.username !== user.username && (
                <div>
                  Username: "@{user.username}" → "@{formData.username}"
                </div>
              )}
              {formData.email !== user.email && (
                <div>
                  Email: "{user.email}" → "{formData.email}"
                </div>
              )}
              {formData.firstname !== user.name.firstname && (
                <div>
                  First Name: "{user.name.firstname}" → "{formData.firstname}"
                </div>
              )}
              {formData.lastname !== user.name.lastname && (
                <div>
                  Last Name: "{user.name.lastname}" → "{formData.lastname}"
                </div>
              )}
              {formData.phone !== (user.phone || "") && (
                <div>
                  Phone: "{user.phone || "Not set"}" → "{formData.phone || "Not set"}"
                </div>
              )}
              {formData.city !== user.address.city && (
                <div>
                  City: "{user.address.city}" → "{formData.city}"
                </div>
              )}
              {formData.street !== user.address.street && (
                <div>
                  Street: "{user.address.street}" → "{formData.street}"
                </div>
              )}
              {formData.number !== user.address.number && (
                <div>
                  Street Number: {user.address.number} → {formData.number}
                </div>
              )}
              {formData.zipcode !== user.address.zipcode && (
                <div>
                  Zip Code: "{user.address.zipcode}" → "{formData.zipcode}"
                </div>
              )}
              {formData.lat !== user.address.geolocation.lat && (
                <div>
                  Latitude: "{user.address.geolocation.lat}" → "{formData.lat}"
                </div>
              )}
              {formData.long !== user.address.geolocation.long && (
                <div>
                  Longitude: "{user.address.geolocation.long}" → "{formData.long}"
                </div>
              )}
              {formData.username === user.username &&
                formData.email === user.email &&
                formData.firstname === user.name.firstname &&
                formData.lastname === user.name.lastname &&
                formData.phone === (user.phone || "") &&
                formData.city === user.address.city &&
                formData.street === user.address.street &&
                formData.number === user.address.number &&
                formData.zipcode === user.address.zipcode &&
                formData.lat === user.address.geolocation.lat &&
                formData.long === user.address.geolocation.long && <div className="text-gray-600">No changes made</div>}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
