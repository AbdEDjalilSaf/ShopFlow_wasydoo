import UpdateUserForm from "@/app/components/update-user-form"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function UpdateUserPage({ params }: PageProps) {
  const { id } = await params

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Update User</h1>
          <p className="text-gray-600">Edit user information and profile details</p>
        </div>
        <UpdateUserForm userId={id} />
      </div>
    </main>
  )
}
