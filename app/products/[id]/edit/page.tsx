import UpdateProductForm from "@/app/components/update-product-form"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function UpdateProductPage({ params }: PageProps) {
  const { id } = await params

  return (
    <main className="min-h-screen p-4 md:p-8 lg:p-12 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">Update Product</h1>
        <UpdateProductForm productId={id} />
      </div>
    </main>
  )
}