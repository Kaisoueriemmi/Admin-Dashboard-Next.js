'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-primary-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 px-4">
      <div className="text-center">
        <h1 className="mb-4 text-5xl font-bold text-gray-900 dark:text-white">
          AdminPRO
        </h1>
        <p className="mb-8 text-xl text-gray-600 dark:text-gray-300">
          Next.js 14 Admin Dashboard - SaaS Level Solution
        </p>
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link href="/login">
            <Button size="lg">Login</Button>
          </Link>
          <Link href="/register">
            <Button variant="outline" size="lg">
              Register
            </Button>
          </Link>
        </div>
      </div>

      <div className="mt-16 grid gap-8 md:grid-cols-3">
        <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
          <h3 className="mb-2 text-lg font-semibold">🔐 Authentication</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Secure login with role-based access control
          </p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
          <h3 className="mb-2 text-lg font-semibold">🎨 Dark Mode</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Beautiful dark/light theme support
          </p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
          <h3 className="mb-2 text-lg font-semibold">📊 Analytics</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Real-time dashboard with charts and KPIs
          </p>
        </div>
      </div>
    </div>
  )
}
