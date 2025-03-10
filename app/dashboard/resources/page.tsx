"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Resource {
  id: string
  title: string
  type: string
  description: string
  createdAt: string
  downloads: number
  status: "active" | "archived"
  size: string
  author: string
}

const mockResources: Resource[] = [
  {
    id: "1",
    title: "Social Media Marketing Guide 2024",
    type: "Document",
    description: "Comprehensive guide for social media marketing strategies",
    createdAt: "2024-02-01",
    downloads: 145,
    status: "active",
    size: "2.5 MB",
    author: "Marketing Team",
  },
  {
    id: "2",
    title: "Content Creation Templates",
    type: "Template",
    description: "Collection of content templates for various platforms",
    createdAt: "2024-02-10",
    downloads: 89,
    status: "active",
    size: "5 MB",
    author: "Design Team",
  },
  // Add more mock data as needed
]

export default function ResourcesPage() {
  const [resources, setResources] = useState(mockResources)

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Manage Resources</h2>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Add New Resource</CardTitle>
            <CardDescription className="text-gray-400">Create a new resource for influencers</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-white">
                  Title
                </Label>
                <Input id="title" className="bg-gray-800 border-gray-700 text-white" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type" className="text-white">
                  Resource Type
                </Label>
                <Select>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="document">Document</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="template">Template</SelectItem>
                    <SelectItem value="guide">Guide</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description" className="text-white">
                  Description
                </Label>
                <Textarea id="description" className="bg-gray-800 border-gray-700 text-white min-h-[100px]" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="file" className="text-white">
                  Upload File
                </Label>
                <Input id="file" type="file" className="bg-gray-800 border-gray-700 text-white" />
              </div>
              <Button className="w-full bg-cyan-600 hover:bg-cyan-700">Add Resource</Button>
            </form>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Resource Statistics</CardTitle>
            <CardDescription className="text-gray-400">Overview of resource usage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 rounded-lg bg-gray-800">
                <span className="text-gray-400">Total Resources</span>
                <span className="text-xl font-bold text-white">24</span>
              </div>
              <div className="flex justify-between items-center p-4 rounded-lg bg-gray-800">
                <span className="text-gray-400">Active Resources</span>
                <span className="text-xl font-bold text-white">18</span>
              </div>
              <div className="flex justify-between items-center p-4 rounded-lg bg-gray-800">
                <span className="text-gray-400">Total Downloads</span>
                <span className="text-xl font-bold text-white">1,256</span>
              </div>
              <div className="flex justify-between items-center p-4 rounded-lg bg-gray-800">
                <span className="text-gray-400">Storage Used</span>
                <span className="text-xl font-bold text-white">2.4 GB</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="rounded-lg border border-gray-800 bg-gray-900 mt-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-gray-400">Title</TableHead>
              <TableHead className="text-gray-400">Type</TableHead>
              <TableHead className="text-gray-400">Description</TableHead>
              <TableHead className="text-gray-400">Created</TableHead>
              <TableHead className="text-gray-400">Downloads</TableHead>
              <TableHead className="text-gray-400">Size</TableHead>
              <TableHead className="text-gray-400">Status</TableHead>
              <TableHead className="text-gray-400">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {resources.map((resource) => (
              <TableRow key={resource.id}>
                <TableCell className="text-white font-medium">{resource.title}</TableCell>
                <TableCell className="text-white">{resource.type}</TableCell>
                <TableCell className="text-white max-w-xs truncate">{resource.description}</TableCell>
                <TableCell className="text-white">{resource.createdAt}</TableCell>
                <TableCell className="text-white">{resource.downloads}</TableCell>
                <TableCell className="text-white">{resource.size}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      resource.status === "active"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {resource.status}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="ghost" className="text-cyan-400">
                      Edit
                    </Button>
                    <Button variant="ghost" className="text-red-400">
                      Archive
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
