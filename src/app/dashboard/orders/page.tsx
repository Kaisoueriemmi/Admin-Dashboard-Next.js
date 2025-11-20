'use client'

import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Plus, Eye, Trash2 } from 'lucide-react'
import { ORDER_STATUS_LABELS, STATUS_COLORS } from '@/constants'
import { formatCurrency } from '@/lib/utils'

interface Order {
  id: string
  orderNo: string
  user: {
    name: string
    email: string
  }
  total: number
  status: string
  createdAt: string
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [page, setPage] = useState(1)

  useEffect(() => {
    fetchOrders()
  }, [page])

  const fetchOrders = async () => {
    try {
      setIsLoading(true)
      const params = new URLSearchParams()
      params.set('page', String(page))

      const response = await fetch(`/api/orders?${params}`)
      const result = await response.json()

      if (result.success) {
        setOrders(result.data)
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage all customer orders</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus size={18} />
          New Order
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Orders List</CardTitle>
          <CardDescription>All customer orders</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">Loading...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b">
                  <tr>
                    <th className="text-left py-3 px-4">Order No</th>
                    <th className="text-left py-3 px-4">Customer</th>
                    <th className="text-left py-3 px-4">Total</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Date</th>
                    <th className="text-left py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="py-3 px-4 font-semibold">{order.orderNo}</td>
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-medium">{order.user.name}</div>
                          <div className="text-sm text-gray-500">{order.user.email}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4 font-semibold">{formatCurrency(order.total)}</td>
                      <td className="py-3 px-4">
                        <Badge variant={order.status === 'DELIVERED' ? 'success' : order.status === 'SHIPPED' ? 'default' : 'warning'}>
                          {ORDER_STATUS_LABELS[order.status]}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-sm">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4 flex gap-2">
                        <button className="p-2 hover:bg-gray-100 rounded dark:hover:bg-gray-700">
                          <Eye size={16} />
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
