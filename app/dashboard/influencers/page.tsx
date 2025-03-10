"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Plus } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Influencer {
  id: string
  name: string
  email: string
  phone: string
  platform: string
  handle: string
  followers: number
  engagement: string
  location: string
  categories: string[]
  joinDate: string
  status: "active" | "inactive"
}

// Generate 50 mock influencers
const mockInfluencers: Influencer[] = Array.from({ length: 50 }, (_, i) => ({
  id: (i + 1).toString(),
  name: [
    "Alex Johnson",
    "Sarah Chen",
    "Michael Smith",
    "Emma Wilson",
    "David Kim",
    "Lisa Anderson",
    "James Lee",
    "Maria Garcia",
    "John Taylor",
    "Sophie Brown",
  ][Math.floor(Math.random() * 10)],
  email: `influencer${i + 1}@example.com`,
  phone: `+1 ${Math.floor(Math.random() * 900 + 100)} ${Math.floor(Math.random() * 900 + 100)} ${Math.floor(Math.random() * 9000 + 1000)}`,
  platform: ["Instagram", "TikTok", "YouTube", "Twitter"][Math.floor(Math.random() * 4)],
  handle: `@influencer${i + 1}`,
  followers: Math.floor(Math.random() * 900000 + 100000),
  engagement: `${(Math.random() * 5 + 1).toFixed(1)}%`,
  location: [
    "New York, USA",
    "Los Angeles, USA",
    "London, UK",
    "Toronto, Canada",
    "Sydney, Australia",
    "Tokyo, Japan",
    "Paris, France",
    "Berlin, Germany",
  ][Math.floor(Math.random() * 8)],
  categories: Array.from(
    { length: Math.floor(Math.random() * 3) + 1 },
    () =>
      ["Tech", "Fashion", "Beauty", "Lifestyle", "Gaming", "Food", "Travel", "Fitness"][Math.floor(Math.random() * 8)],
  ),
  joinDate: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28)).toISOString().split("T")[0],
  status: Math.random() > 0.2 ? "active" : "inactive",
}))

export default function InfluencersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [influencers, setInfluencers] = useState(mockInfluencers)
  const [platformFilter, setPlatformFilter] = useState("all")

  // Add form state and handler
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    platform: "",
    handle: "",
    categories: "",
  })
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newInfluencer: Influencer = {
      id: (influencers.length + 1).toString(),
      ...formData,
      followers: 0,
      engagement: "0%",
      location: "Not specified",
      categories: formData.categories.split(",").map((cat) => cat.trim()),
      joinDate: new Date().toISOString().split("T")[0],
      status: "active",
    }
    setInfluencers((prev) => [...prev, newInfluencer])
    setFormData({
      name: "",
      email: "",
      phone: "",
      platform: "",
      handle: "",
      categories: "",
    })
    setDialogOpen(false)
  }

  const handleSearch = (value: string) => {
    setSearchTerm(value)
    filterInfluencers(value, platformFilter)
  }

  const handlePlatformFilter = (value: string) => {
    setPlatformFilter(value)
    filterInfluencers(searchTerm, value)
  }

  const filterInfluencers = (search: string, platform: string) => {
    let filtered = mockInfluencers

    if (search) {
      filtered = filtered.filter((inf) =>
        Object.values(inf).some((field) => field.toString().toLowerCase().includes(search.toLowerCase())),
      )
    }

    if (platform !== "all") {
      filtered = filtered.filter((inf) => inf.platform === platform)
    }

    setInfluencers(filtered)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Manage Influencers</h2>
        <div className="flex items-center gap-4">
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input
              placeholder="Search influencers..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-9 bg-gray-900 border-gray-800 text-white"
            />
          </div>
          <Select value={platformFilter} onValueChange={handlePlatformFilter}>
            <SelectTrigger className="w-[180px] bg-gray-900 border-gray-800 text-white">
              <SelectValue placeholder="Filter by platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Platforms</SelectItem>
              <SelectItem value="Instagram">Instagram</SelectItem>
              <SelectItem value="TikTok">TikTok</SelectItem>
              <SelectItem value="YouTube">YouTube</SelectItem>
            </SelectContent>
          </Select>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-cyan-600 hover:bg-cyan-700">
                <Plus className="mr-2 h-4 w-4" /> Add Influencer
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-900 text-white">
              <DialogHeader>
                <DialogTitle>Add New Influencer</DialogTitle>
                <DialogDescription className="text-gray-400">Enter the influencer&apos;s details below</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                      className="bg-gray-800 border-gray-700"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                      className="bg-gray-800 border-gray-700"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                      className="bg-gray-800 border-gray-700"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="platform">Platform</Label>
                    <Select onValueChange={(value) => setFormData((prev) => ({ ...prev, platform: value }))}>
                      <SelectTrigger className="bg-gray-800 border-gray-700">
                        <SelectValue placeholder="Select platform" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Instagram">Instagram</SelectItem>
                        <SelectItem value="TikTok">TikTok</SelectItem>
                        <SelectItem value="YouTube">YouTube</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="handle">Social Media Handle</Label>
                  <Input
                    id="handle"
                    value={formData.handle}
                    onChange={(e) => setFormData((prev) => ({ ...prev, handle: e.target.value }))}
                    className="bg-gray-800 border-gray-700"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="categories">Categories</Label>
                  <Input
                    id="categories"
                    placeholder="e.g. Tech, Fashion, Beauty"
                    value={formData.categories}
                    onChange={(e) => setFormData((prev) => ({ ...prev, categories: e.target.value }))}
                    className="bg-gray-800 border-gray-700"
                    required
                  />
                </div>
                <div className="flex justify-end gap-4">
                  <Button type="button" variant="ghost" onClick={() => setDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-cyan-600 hover:bg-cyan-700">
                    Add Influencer
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="rounded-lg border border-gray-800 bg-gray-900">
        <div className="max-h-[calc(100vh-240px)] overflow-auto">
          <Table>
            <TableHeader className="sticky top-0 bg-gray-900 z-20">
              <TableRow>
                <TableHead className="text-gray-400">Full Name</TableHead>
                <TableHead className="text-gray-400">Platform</TableHead>
                <TableHead className="text-gray-400">Handle</TableHead>
                <TableHead className="text-gray-400">Followers</TableHead>
                <TableHead className="text-gray-400">Engagement</TableHead>
                <TableHead className="text-gray-400">Location</TableHead>
                <TableHead className="text-gray-400">Categories</TableHead>
                <TableHead className="text-gray-400">Status</TableHead>
                <TableHead className="text-gray-400">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {influencers.map((influencer) => (
                <TableRow key={influencer.id}>
                  <TableCell className="text-white font-medium">{influencer.name}</TableCell>
                  <TableCell className="text-white">{influencer.platform}</TableCell>
                  <TableCell className="text-white">{influencer.handle}</TableCell>
                  <TableCell className="text-white">{influencer.followers.toLocaleString()}</TableCell>
                  <TableCell className="text-white">{influencer.engagement}</TableCell>
                  <TableCell className="text-white">{influencer.location}</TableCell>
                  <TableCell className="text-white">
                    <div className="flex gap-1">
                      {influencer.categories.map((category) => (
                        <span key={category} className="px-2 py-1 rounded-full text-xs bg-gray-800">
                          {category}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        influencer.status === "active" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {influencer.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setInfluencers((prev) =>
                          prev.map((inf) =>
                            inf.id === influencer.id
                              ? { ...inf, status: inf.status === "active" ? "inactive" : "active" }
                              : inf,
                          ),
                        )
                      }}
                      className={influencer.status === "active" ? "text-red-400" : "text-green-400"}
                    >
                      {influencer.status === "active" ? "Deactivate" : "Activate"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
