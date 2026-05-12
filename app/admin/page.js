'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { 
  ShoppingBagIcon, 
  CurrencyDollarIcon, 
  ChartBarIcon,
  PlusCircleIcon 
} from '@heroicons/react/24/outline'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    averagePrice: 0,
    totalValue: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const { data: products, error } = await supabase
        .from('products')
        .select('price')

      if (error) throw error

      const totalProducts = products.length
      const totalValue = products.reduce((sum, p) => sum + parseFloat(p.price), 0)
      const averagePrice = totalProducts > 0 ? totalValue / totalProducts : 0

      setStats({
        totalProducts,
        averagePrice,
        totalValue
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    {
      name: 'Total Products',
      value: stats.totalProducts,
      icon: ShoppingBagIcon,
      color: 'bg-blue-500',
      href: '/admin/products'
    },
    {
      name: 'Average Price',
      value: `$${stats.averagePrice.toFixed(2)}`,
      icon: CurrencyDollarIcon,
      color: 'bg-green-500',
      href: '/admin/products'
    },
    {
      name: 'Total Value',
      value: `$${stats.totalValue.toFixed(2)}`,
      icon: ChartBarIcon,
      color: 'bg-purple-500',
      href: '/admin/products'
    }
  ]

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
        <p className="mt-1 text-sm text-gray-600">
          Welcome to your grocery store admin panel
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {statCards.map((stat) => (
          <Link
            key={stat.name}
            href={stat.href}
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex items-center">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {loading ? '...' : stat.value}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/admin/add-product"
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors duration-200"
          >
            <PlusCircleIcon className="h-8 w-8 text-green-500" />
            <div className="ml-4">
              <p className="font-medium text-gray-900">Add New Product</p>
              <p className="text-sm text-gray-600">Add a new product to your store</p>
            </div>
          </Link>
          <Link
            href="/admin/products"
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors duration-200"
          >
            <ShoppingBagIcon className="h-8 w-8 text-blue-500" />
            <div className="ml-4">
              <p className="font-medium text-gray-900">View Products</p>
              <p className="text-sm text-gray-600">Manage your product inventory</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
