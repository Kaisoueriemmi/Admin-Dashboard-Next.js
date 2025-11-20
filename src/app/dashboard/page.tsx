'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart3, Users, Package, ShoppingCart } from 'lucide-react'

const StatCard = ({ title, value, icon: Icon, change }: any) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-4 w-4 text-gray-500" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className={`text-xs ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
        {change >= 0 ? '+' : ''}{change}% from last month
      </p>
    </CardContent>
  </Card>
)

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400">Welcome back to your admin panel</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Revenue" value="$45,231.89" icon={BarChart3} change={20.1} />
        <StatCard title="Users" value="2,543" icon={Users} change={12.5} />
        <StatCard title="Products" value="1,235" icon={Package} change={8.3} />
        <StatCard title="Orders" value="567" icon={ShoppingCart} change={-2.4} />
      </div>

      {/* Charts Section */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
            <CardDescription>Last 7 days sales performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] bg-gray-100 rounded dark:bg-gray-800 flex items-center justify-center">
              <p className="text-gray-500">Chart coming soon...</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest 5 orders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center justify-between border-b pb-2">
                  <span className="text-sm">Order #00{i}234</span>
                  <span className="text-sm font-semibold">$1,234.00</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
