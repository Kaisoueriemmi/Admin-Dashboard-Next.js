'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { User, Mail, Lock } from 'lucide-react'

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    role: 'ADMIN',
    status: 'ACTIVE',
    avatar: '👤',
  })

  const [formData, setFormData] = useState(profile)

  const handleSave = () => {
    setProfile(formData)
    setIsEditing(false)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
        <p className="text-gray-500 dark:text-gray-400">Manage your account settings</p>
      </div>

      {/* Profile Card */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>Your account details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Avatar Section */}
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-2xl">
              {profile.avatar}
            </div>
            <div>
              <p className="font-semibold">{profile.name}</p>
              <p className="text-sm text-gray-500">{profile.email}</p>
            </div>
          </div>

          {isEditing ? (
            // Edit Form
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e: any) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e: any) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={handleSave}>Save Changes</Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setFormData(profile)
                    setIsEditing(false)
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            // View Mode
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="font-medium">{profile.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email Address</p>
                  <p className="font-medium">{profile.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Role</p>
                  <Badge>{profile.role}</Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <Badge variant="success">{profile.status}</Badge>
                </div>
              </div>

              <Button variant="outline" onClick={() => setIsEditing(true)}>
                Edit Profile
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Security Section */}
      <Card>
        <CardHeader>
          <CardTitle>Security</CardTitle>
          <CardDescription>Manage your security settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div>
              <p className="font-medium flex items-center gap-2">
                <Lock size={18} /> Change Password
              </p>
              <p className="text-sm text-gray-500 mt-1">Update your password regularly for security</p>
            </div>
            <Button variant="outline" className="w-full sm:w-auto">
              Change Password
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Preferences */}
      <Card>
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
          <CardDescription>Customize your experience</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked className="rounded" />
              <span>Email notifications</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked className="rounded" />
              <span>Marketing emails</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded" />
              <span>Activity reports</span>
            </label>
          </div>

          <Button className="w-full sm:w-auto">Save Preferences</Button>
        </CardContent>
      </Card>
    </div>
  )
}
