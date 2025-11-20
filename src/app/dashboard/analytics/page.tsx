'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp, TrendingDown } from 'lucide-react'

const ChartPlaceholder = () => (
  <div className="h-[300px] w-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-lg flex items-center justify-center">
    <p className="text-gray-500">Chart visualization goes here</p>
  </div>
)

export default function AnalyticsPage() {
  const metrics = [
    { label: 'Total Revenue', value: '$45,231.89', change: 20.1, trend: 'up' },
    { label: 'Active Users', value: '2,543', change: 12.5, trend: 'up' },
    { label: 'Total Orders', value: '567', change: -2.4, trend: 'down' },
    { label: 'Conversion Rate', value: '3.24%', change: 5.2, trend: 'up' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-gray-500 dark:text-gray-400">View detailed analytics and reports</p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <Card key={metric.label}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">{metric.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className="flex items-center gap-1 text-sm mt-2">
                {metric.trend === 'up' ? (
                  <>
                    <TrendingUp size={14} className="text-green-600" />
                    <span className="text-green-600">+{metric.change}%</span>
                  </>
                ) : (
                  <>
                    <TrendingDown size={14} className="text-red-600" />
                    <span className="text-red-600">{metric.change}%</span>
                  </>
                )}
                <span className="text-gray-500">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
            <CardDescription>Last 12 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartPlaceholder />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Customer Distribution</CardTitle>
            <CardDescription>By region</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartPlaceholder />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
            <CardDescription>Product categories</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartPlaceholder />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
            <CardDescription>By sales volume</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-sm">Product {i}</p>
                    <div className="h-2 bg-gray-200 rounded mt-1 dark:bg-gray-700">
                      <div
                        className="h-full bg-blue-600 rounded"
                        style={{ width: `${100 - i * 15}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-sm font-semibold ml-4">${1000 * i}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Summary</CardTitle>
          <CardDescription>Key performance indicators</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <p className="text-sm text-gray-500">Avg Order Value</p>
              <p className="text-2xl font-bold">$324.50</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Customer Retention</p>
              <p className="text-2xl font-bold">87.3%</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Satisfaction Score</p>
              <p className="text-2xl font-bold">4.8/5.0</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
