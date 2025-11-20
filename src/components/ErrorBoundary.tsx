'use client'

import { useEffect } from 'react'
import { Button } from './ui/button'

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4"> Oops!</h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 mb-2">
          Something went wrong
        </p>
        <p className="text-sm text-slate-500 dark:text-slate-500 mb-8">
          {error.message || 'An unexpected error occurred'}
        </p>
        <Button onClick={() => reset()} variant="default" size="lg">
          Try Again
        </Button>
      </div>
    </div>
  )
}
