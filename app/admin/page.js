'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default function AdminPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      let imageUrl = '';

      // Upload image if selected
      if (image) {
        const fileName = `${Date.now()}-${image.name}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('products')
          .upload(fileName, image);

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from('products')
          .getPublicUrl(fileName);

        imageUrl = urlData.publicUrl;
      }

      // Insert product into database
      const { error: insertError } = await supabase
        .from('products')
        .insert([
          {
            title,
            description,
            price: parseFloat(price),
            image_url: imageUrl,
            created_at: new Date().toISOString(),
          },
        ]);

      if (insertError) throw insertError;

      setMessage('Product added successfully!');
      setTitle('');
      setDescription('');
      setPrice('');
      setImage(null);
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Add Product</h1>
          <Link 
            href="/"
            className="text-indigo-600 hover:text-indigo-800 font-medium"
          >
            ← Back to Home
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Product Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                placeholder="Enter product name"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none"
                placeholder="Enter product description"
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                placeholder="0.00"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? 'Adding Product...' : 'Add Product'}
            </button>

            {/* Message */}
            {message && (
              <div className={`p-4 rounded-lg ${
                message.includes('Error') 
                  ? 'bg-red-50 text-red-700 border border-red-200' 
                  : 'bg-green-50 text-green-700 border border-green-200'
              }`}>
                {message}
              </div>
            )}
          </form>
        </div>
      </div>
    </main>
  );
}
