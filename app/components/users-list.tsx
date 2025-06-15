// "use client"

// import { useState, useEffect } from "react"
// import Link from "next/link"
// import { clientApi } from "@/lib/api-client"
// import type { User } from "@/app/types/user"

// export default function UsersList() {
//   const [users, setUsers] = useState<User[]>([])
//   const [filteredUsers, setFilteredUsers] = useState<User[]>([])
//   const [isLoading, setIsLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)
//   const [searchQuery, setSearchQuery] = useState("")
//   const [selectedUser, setSelectedUser] = useState<User | null>(null)

//   // Mock authentication - in a real app, use proper auth
//   const userIsAdmin = true

//   useEffect(() => {
//     fetchUsers()
//   }, [])

//   useEffect(() => {
//     filterUsers()
//   }, [users, searchQuery])

//   const fetchUsers = async () => {
//     try {
//       setIsLoading(true)
//       setError(null)
//       const usersData = await clientApi.getUsers()
//       setUsers(usersData)
//     } catch (err) {
//       setError("Failed to fetch users. Please try again.")
//       console.error("Error fetching users:", err)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const filterUsers = () => {
//     if (!searchQuery) {
//       setFilteredUsers(users)
//       return
//     }

//     const filtered = users.filter(
//       (user) =>
//         user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         `${user.name.firstname} ${user.name.lastname}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         user.address.city.toLowerCase().includes(searchQuery.toLowerCase()),
//     )

//     setFilteredUsers(filtered)
//   }

//   const handleDeleteUser = async (id: number) => {

//     try {
//       await clientApi.deleteUser(id.toString())
//       setUsers((prev) => prev.filter((user) => user.id !== id))
//     } catch (err) {
//       console.error("Error deleting user:", err)
//     }
//   }

//   const formatAddress = (address: User["address"]) => {
//     return `${address.number} ${address.street}, ${address.city} ${address.zipcode}`
//   }

//   if (isLoading) {
//     return (
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="flex items-center justify-center py-12">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//           <span className="ml-3 text-gray-600">Loading users...</span>
//         </div>
//       </div>
//     )
//   }

//   if (error) {
//     return (
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="text-center py-12">
//           <div className="text-red-600 text-lg font-medium mb-2">Error Loading Users</div>
//           <p className="text-gray-600 mb-4">{error}</p>
//           <button
//             onClick={fetchUsers}
//             className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       {/* Header */}
//       <div className="text-center mb-8">
//         <div className="flex items-center justify-center gap-4 mb-4">
//           <h1 className="text-3xl font-bold text-gray-900">Users Management</h1>
//           {userIsAdmin && (
//             <Link
//               href="/users/add"
//               className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="w-4 h-4"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 strokeWidth={2}
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
//               </svg>
//               Add User
//             </Link>
//           )}
//         </div>
//         <p className="text-xl text-gray-600">Manage and view all registered users</p>
//       </div>

//       {/* Search Bar */}
//       <div className="max-w-md mx-auto mb-8">
//         <div className="relative">
//           <input
//             type="text"
//             placeholder="Search users by name, email, username, or city..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//           />
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//             strokeWidth={2}
//           >
//             <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//           </svg>
//         </div>
//       </div>

//       {/* Users Count */}
//       <div className="mb-6">
//         <p className="text-gray-600 text-center">
//           Showing {filteredUsers.length} of {users.length} users
//           {searchQuery && <span className="ml-1">matching "{searchQuery}"</span>}
//         </p>
//       </div>

//       {/* Users Grid */}
//       {filteredUsers.length === 0 ? (
//         <div className="text-center py-12">
//           <div className="text-6xl mb-4">👥</div>
//           <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
//           <p className="text-gray-600">Try adjusting your search criteria</p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredUsers.map((user) => (
//             <div
//               key={user.id}
//               className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
//             >
//               <div className="p-6">
//                 {/* User Header */}
//                 <div className="flex items-center justify-between mb-4">
//                   <div className="flex items-center">
//                     <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
//                       <span className="text-blue-600 font-semibold text-lg">
//                         {user.name.firstname.charAt(0)}
//                         {user.name.lastname.charAt(0)}
//                       </span>
//                     </div>
//                     <div className="ml-3">
//                       <h3 className="text-lg font-semibold text-gray-900">
//                         {user.name.firstname} {user.name.lastname}
//                       </h3>
//                       <p className="text-sm text-gray-500">@{user.username}</p>
//                     </div>
//                   </div>
//                   <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
//                     ID: {user.id}
//                   </span>
//                 </div>

//                 {/* User Details */}
//                 <div className="space-y-3">
//                   <div className="flex items-center text-sm text-gray-600">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-4 w-4 mr-2 text-gray-400"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
//                       />
//                     </svg>
//                     <span className="truncate">{user.email}</span>
//                   </div>

//                   <div className="flex items-start text-sm text-gray-600">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-4 w-4 mr-2 mt-0.5 text-gray-400 flex-shrink-0"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
//                       />
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
//                       />
//                     </svg>
//                     <span className="text-xs leading-relaxed">{formatAddress(user.address)}</span>
//                   </div>

//                   {user.phone && (
//                     <div className="flex items-center text-sm text-gray-600">
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="h-4 w-4 mr-2 text-gray-400"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
//                         />
//                       </svg>
//                       <span>{user.phone}</span>
//                     </div>
//                   )}
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="flex gap-2 mt-6">
//                   <button
//                     onClick={() => setSelectedUser(user)}
//                     className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
//                   >
//                     View Details
//                   </button>

//                   {userIsAdmin && (
//                     <button
//                       onClick={() => handleDeleteUser(user.id)}
//                       className="bg-red-100 hover:bg-red-200 text-red-700 p-2 rounded-lg transition-colors"
//                       title="Delete User"
//                     >
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="h-4 w-4"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                         strokeWidth={2}
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
//                         />
//                       </svg>
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* User Details Modal */}
//       {selectedUser && (
//         <div className="fixed inset-0  flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//             <div className="p-6">
//               <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-2xl font-bold text-gray-900">User Details</h2>
//                 <button
//                   onClick={() => setSelectedUser(null)}
//                   className="text-gray-500 hover:text-gray-700 transition-colors"
//                 >
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-6 w-6"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                     strokeWidth={2}
//                   >
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
//                   </svg>
//                 </button>
//               </div>

//               <div className="space-y-6">
//                 {/* Basic Info */}
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-900 mb-3">Basic Information</h3>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700">Full Name</label>
//                       <p className="mt-1 text-sm text-gray-900">
//                         {selectedUser.name.firstname} {selectedUser.name.lastname}
//                       </p>
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700">Username</label>
//                       <p className="mt-1 text-sm text-gray-900">@{selectedUser.username}</p>
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700">Email</label>
//                       <p className="mt-1 text-sm text-gray-900">{selectedUser.email}</p>
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700">User ID</label>
//                       <p className="mt-1 text-sm text-gray-900">{selectedUser.id}</p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Address Info */}
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-900 mb-3">Address Information</h3>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700">Street Address</label>
//                       <p className="mt-1 text-sm text-gray-900">
//                         {selectedUser.address.number} {selectedUser.address.street}
//                       </p>
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700">City</label>
//                       <p className="mt-1 text-sm text-gray-900">{selectedUser.address.city}</p>
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700">Zip Code</label>
//                       <p className="mt-1 text-sm text-gray-900">{selectedUser.address.zipcode}</p>
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700">Coordinates</label>
//                       <p className="mt-1 text-sm text-gray-900">
//                         {selectedUser.address.geolocation.lat}, {selectedUser.address.geolocation.long}
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Phone */}
//                 {selectedUser.phone && (
//                   <div>
//                     <h3 className="text-lg font-semibold text-gray-900 mb-3">Contact Information</h3>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700">Phone Number</label>
//                       <p className="mt-1 text-sm text-gray-900">{selectedUser.phone}</p>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               <div className="flex justify-end mt-6">
//                 <button
//                   onClick={() => setSelectedUser(null)}
//                   className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }



"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { clientApi } from "@/lib/api-client"
import type { User } from "@/app/types/user"

export default function UsersList() {
  const [users, setUsers] = useState<User[]>([])
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  // Mock authentication - in a real app, use proper auth
  const userIsAdmin = true

  useEffect(() => {
    fetchUsers()
  }, [])

  useEffect(() => {
    filterUsers()
  }, [users, searchQuery])

  const fetchUsers = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const usersData = await clientApi.getUsers()
      setUsers(usersData)
    } catch (err) {
      setError("Failed to fetch users. Please try again.")
      console.error("Error fetching users:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const filterUsers = () => {
    if (!searchQuery) {
      setFilteredUsers(users)
      return
    }

    const filtered = users.filter(
      (user) =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        `${user.name.firstname} ${user.name.lastname}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.address.city.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    setFilteredUsers(filtered)
  }

  const handleDeleteUser = async (id: number) => {

    try {
      await clientApi.deleteUser(id.toString())
      setUsers((prev) => prev.filter((user) => user.id !== id))
    } catch (err) {
      console.error("Error deleting user:", err)
    }
  }

  const formatAddress = (address: User["address"]) => {
    return `${address.number} ${address.street}, ${address.city} ${address.zipcode}`
  }

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Loading users...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <div className="text-red-600 text-lg font-medium mb-2">Error Loading Users</div>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchUsers}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-4 mb-4">
          <h1 className="text-3xl font-bold text-gray-900">Users Management</h1>
          {userIsAdmin && (
            <Link
              href="/users/add"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Add User
            </Link>
          )}
        </div>
        <p className="text-xl text-gray-600">Manage and view all registered users</p>
      </div>

      {/* Search Bar */}
      <div className="max-w-md mx-auto mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search users by name, email, username, or city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-black px-4 py-3 pl-12 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Users Count */}
      <div className="mb-6">
        <p className="text-gray-600 text-center">
          Showing {filteredUsers.length} of {users.length} users
          {searchQuery && <span className="ml-1">matching "{searchQuery}"</span>}
        </p>
      </div>

      {/* Users Grid */}
      {filteredUsers.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">👥</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
          <p className="text-gray-600">Try adjusting your search criteria</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="p-6">
                {/* User Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-semibold text-lg">
                        {user.name.firstname.charAt(0)}
                        {user.name.lastname.charAt(0)}
                      </span>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {user.name.firstname} {user.name.lastname}
                      </h3>
                      <p className="text-sm text-gray-500">@{user.username}</p>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    ID: {user.id}
                  </span>
                </div>

                {/* User Details */}
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-2 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                      />
                    </svg>
                    <span className="truncate">{user.email}</span>
                  </div>

                  <div className="flex items-start text-sm text-gray-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-2 mt-0.5 text-gray-400 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span className="text-xs leading-relaxed">{formatAddress(user.address)}</span>
                  </div>

                  {user.phone && (
                    <div className="flex items-center text-sm text-gray-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-2 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      <span>{user.phone}</span>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 mt-6">
                  <button
                    onClick={() => setSelectedUser(user)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                  >
                    View Details
                  </button>

                  {userIsAdmin && (
                    <>
                      <Link
                        href={`/users/update/${user.id}`}
                        className="bg-green-100 hover:bg-green-200 text-green-700 p-2 rounded-lg transition-colors"
                        title="Edit User"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </Link>

                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="bg-red-100 hover:bg-red-200 text-red-700 p-2 rounded-lg transition-colors"
                        title="Delete User"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* User Details Modal */}
      {selectedUser && (
        <div className="fixed inset-0  flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">User Details</h2>
                <button
                  onClick={() => setSelectedUser(null)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-6">
                {/* Basic Info */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Basic Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Full Name</label>
                      <p className="mt-1 text-sm text-gray-900">
                        {selectedUser.name.firstname} {selectedUser.name.lastname}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Username</label>
                      <p className="mt-1 text-sm text-gray-900">@{selectedUser.username}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedUser.email}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">User ID</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedUser.id}</p>
                    </div>
                  </div>
                </div>

                {/* Address Info */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Address Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Street Address</label>
                      <p className="mt-1 text-sm text-gray-900">
                        {selectedUser.address.number} {selectedUser.address.street}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">City</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedUser.address.city}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Zip Code</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedUser.address.zipcode}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Coordinates</label>
                      <p className="mt-1 text-sm text-gray-900">
                        {selectedUser.address.geolocation.lat}, {selectedUser.address.geolocation.long}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Phone */}
                {selectedUser.phone && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Contact Information</h3>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedUser.phone}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setSelectedUser(null)}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
