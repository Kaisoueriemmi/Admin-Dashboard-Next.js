'use client'

import React, { useState, useEffect } from 'react'
import { Menu, Bell, Moon, Sun, User } from 'lucide-react'
import { useTheme } from 'next-themes'
import { cn } from '@/lib/utils'

interface NavbarProps {
  onMenuClick: () => void
}

export const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <nav className="sticky top-0 z-40 border-b border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900">
      <div className="flex items-center justify-between px-6 py-4">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800 lg:hidden"
        >
          <Menu size={24} />
        </button>

        <div className="flex-1" />

        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="relative rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
            <Bell size={20} className="text-gray-700 dark:text-gray-300" />
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-600" />
          </button>

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {theme === 'dark' ? (
              <Sun size={20} className="text-yellow-500" />
            ) : (
              <Moon size={20} className="text-gray-700" />
            )}
          </button>

          {/* Profile */}
          <button className="flex items-center space-x-2 rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
            <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center text-white">
              <User size={16} />
            </div>
          </button>
        </div>
      </div>
    </nav>
  )
}
