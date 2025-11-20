'use client'

import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Plus, Edit2, Trash2, Search } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

interface Product {
  id: string
  name: string
  sku: string
  price: number
  quantity: number
  category: string
  status: string
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  useEffect(() => {
    fetchProducts()
  }, [page, search])

  const fetchProducts = async () => {
    try {
      setIsLoading(true)
      const params = new URLSearchParams()
      params.set('page', String(page))
      if (search) params.set('search', search)

      const response = await fetch(`/api/products?${params}`)
      const result = await response.json()

      if (result.success) {
        setProducts(result.data)
      }
    } catch (error) {
      console.error('Failed to fetch products:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage all products in inventory</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus size={18} />
          Add Product
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Products List</CardTitle>
          <CardDescription>All products in your inventory</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search products..."
                className="pl-10"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value)
                  setPage(1)
                }}
              />
            </div>
          </div>

          {isLoading ? (
            <div className="text-center py-8">Loading...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b">
                  <tr>
                    <th className="text-left py-3 px-4">Name</th>
                    <th className="text-left py-3 px-4">SKU</th>
                    <th className="text-left py-3 px-4">Price</th>
                    <th className="text-left py-3 px-4">Stock</th>
                    <th className="text-left py-3 px-4">Category</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="py-3 px-4">{product.name}</td>
                      <td className="py-3 px-4 text-sm text-gray-500">{product.sku}</td>
                      <td className="py-3 px-4 font-semibold">{formatCurrency(product.price)}</td>
                      <td className="py-3 px-4">
                        <span className={product.quantity > 0 ? 'text-green-600' : 'text-red-600'}>
                          {product.quantity}
                        </span>
                      </td>
                      <td className="py-3 px-4">{product.category}</td>
                      <td className="py-3 px-4">
                        <Badge variant={product.status === 'ACTIVE' ? 'success' : 'warning'}>
                          {product.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 flex gap-2">
                        <button className="p-2 hover:bg-gray-100 rounded dark:hover:bg-gray-700">
                          <Edit2 size={16} />
                        </button>
                        <button className="p-2 hover:bg-red-50 rounded text-red-600 dark:hover:bg-red-900/20">
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
