'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function ActivityLogPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Activity Log</h1>
        <p className="text-gray-500 dark:text-gray-400">Track all system activities and user actions</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>System Activity</CardTitle>
          <CardDescription>All activities in your system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between border-b pb-4">
                <div>
                  <p className="font-medium">User action {i}</p>
                  <p className="text-sm text-gray-500">Activity description</p>
                </div>
                <span className="text-sm text-gray-400">2 hours ago</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
