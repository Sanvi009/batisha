import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Product Admin
          </h1>
          <p className="text-gray-600">
            Manage your product catalog with ease
          </p>
        </div>
        
        <Link 
          href="/admin"
          className="inline-block w-full bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
        >
          Go to Admin Panel →
        </Link>
        
        <div className="mt-8 text-sm text-gray-500">
          <p>Add and manage products</p>
        </div>
      </div>
    </main>
  );
}
