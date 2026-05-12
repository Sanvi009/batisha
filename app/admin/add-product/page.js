import ProductForm from '@/components/ProductForm'

export default function AddProductPage() {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Add New Product</h2>
        <p className="mt-1 text-sm text-gray-600">
          Fill in the details below to add a new product to your store
        </p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <ProductForm />
      </div>
    </div>
  )
}
