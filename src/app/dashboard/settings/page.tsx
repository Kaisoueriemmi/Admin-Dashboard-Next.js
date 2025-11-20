'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    siteName: 'AdminPRO',
    siteEmail: 'admin@example.com',
    supportEmail: 'support@example.com',
    enableNotifications: true,
    enableDarkMode: true,
  })

  const handleChange = (field: string, value: any) => {
    setSettings({ ...settings, [field]: value })
  }

  const handleSave = () => {
    console.log('Settings saved:', settings)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-gray-500 dark:text-gray-400">Manage your application settings</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
          <CardDescription>Basic platform configuration</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="siteName">Site Name</Label>
            <Input
              id="siteName"
              value={settings.siteName}
              onChange={(e: any) => handleChange('siteName', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="siteEmail">Site Email</Label>
            <Input
              id="siteEmail"
              type="email"
              value={settings.siteEmail}
              onChange={(e: any) => handleChange('siteEmail', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="supportEmail">Support Email</Label>
            <Input
              id="supportEmail"
              type="email"
              value={settings.supportEmail}
              onChange={(e: any) => handleChange('supportEmail', e.target.value)}
            />
          </div>

          <div className="space-y-3 border-t pt-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={settings.enableNotifications}
                onChange={(e: any) => handleChange('enableNotifications', e.target.checked)}
                className="rounded"
              />
              <span>Enable Notifications</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={settings.enableDarkMode}
                onChange={(e: any) => handleChange('enableDarkMode', e.target.checked)}
                className="rounded"
              />
              <span>Enable Dark Mode</span>
            </label>
          </div>

          <Button onClick={handleSave} className="w-full">
            Save Settings
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
