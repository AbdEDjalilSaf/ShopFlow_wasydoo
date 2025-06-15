import AddUserForm from "@/app/components/add-user-form"

export default function AddUserPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New User</h1>
          <p className="text-gray-600">Create a new user account with complete profile information</p>
        </div>
        <AddUserForm />
      </div>
    </main>
  )
}
