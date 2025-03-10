"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Profile Settings</CardTitle>
          <CardDescription className="text-gray-400">Manage your account settings and preferences</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-white">Profile content coming soon...</div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
