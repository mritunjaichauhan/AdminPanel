"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Search, SortAsc, SortDesc } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Log {
  id: string
  action: string
  user: string
  timestamp: string
  details: string
  category: string
  ipAddress: string
  status: "success" | "failed" | "pending"
}

// Generate 50 mock logs
const mockLogs: Log[] = Array.from({ length: 50 }, (_, i) => ({
  id: (i + 1).toString(),
  action: [
    "Influencer Status Updated",
    "Resource Added",
    "Login Attempt",
    "Settings Updated",
    "Profile Modified",
    "Resource Downloaded",
    "User Invited",
    "Permission Changed",
    "Comment Added",
    "Report Generated",
  ][Math.floor(Math.random() * 10)],
  user: ["Admin", "ModeratorJohn", "SuperAdmin", "ContentManager", "SupportStaff"][Math.floor(Math.random() * 5)],
  timestamp: new Date(
    2024,
    1,
    Math.floor(Math.random() * 28),
    Math.floor(Math.random() * 24),
    Math.floor(Math.random() * 60),
  ).toLocaleString(),
  details: [
    "Changed status of @alextech to inactive",
    'Added new video resource: "Marketing Basics"',
    "Failed login attempt from unknown IP",
    "Updated email notification settings",
    "Modified user profile settings",
    'Downloaded resource "Content Creation Guide"',
    "Invited new team member",
    "Changed user role permissions",
    "Added comment on resource",
    "Generated monthly activity report",
  ][Math.floor(Math.random() * 10)],
  category: ["Influencer Management", "Resource Management", "Security", "System Settings", "User Management"][
    Math.floor(Math.random() * 5)
  ],
  ipAddress: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
  status: ["success", "failed", "pending"][Math.floor(Math.random() * 3)] as "success" | "failed" | "pending",
})).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

export default function LogsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortField, setSortField] = useState<keyof Log>("timestamp")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [logs, setLogs] = useState(mockLogs)

  const filterAndSortLogs = () => {
    let filteredLogs = [...mockLogs]

    // Apply search
    if (searchTerm) {
      filteredLogs = filteredLogs.filter((log) =>
        Object.values(log).some((value) => value.toString().toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    // Apply category filter
    if (categoryFilter !== "all") {
      filteredLogs = filteredLogs.filter((log) => log.category === categoryFilter)
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filteredLogs = filteredLogs.filter((log) => log.status === statusFilter)
    }

    // Apply sorting
    filteredLogs.sort((a, b) => {
      const aValue = a[sortField]
      const bValue = b[sortField]
      if (sortDirection === "asc") {
        return aValue > bValue ? 1 : -1
      }
      return aValue < bValue ? 1 : -1
    })

    return filteredLogs
  }

  const handleSort = (field: keyof Log) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"))
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Activity Logs</h2>
        <div className="flex items-center gap-4">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input
              placeholder="Search logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 bg-gray-900 border-gray-800 text-white"
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[180px] bg-gray-900 border-gray-800 text-white">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Influencer Management">Influencer Management</SelectItem>
              <SelectItem value="Resource Management">Resource Management</SelectItem>
              <SelectItem value="Security">Security</SelectItem>
              <SelectItem value="System Settings">System Settings</SelectItem>
              <SelectItem value="User Management">User Management</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px] bg-gray-900 border-gray-800 text-white">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="success">Success</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-lg border border-gray-800 bg-gray-900">
        <div className="max-h-[calc(100vh-240px)] overflow-auto">
          <Table>
            <TableHeader className="sticky top-0 bg-gray-900 z-20">
              <TableRow>
                <TableHead
                  className="text-gray-400 cursor-pointer hover:text-white"
                  onClick={() => handleSort("timestamp")}
                >
                  Timestamp
                  {sortField === "timestamp" &&
                    (sortDirection === "asc" ? (
                      <SortAsc className="inline ml-2 h-4 w-4" />
                    ) : (
                      <SortDesc className="inline ml-2 h-4 w-4" />
                    ))}
                </TableHead>
                <TableHead className="text-gray-400">Action</TableHead>
                <TableHead className="text-gray-400">User</TableHead>
                <TableHead className="text-gray-400">Category</TableHead>
                <TableHead className="text-gray-400">Details</TableHead>
                <TableHead className="text-gray-400">IP Address</TableHead>
                <TableHead className="text-gray-400">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filterAndSortLogs().map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="text-white">{log.timestamp}</TableCell>
                  <TableCell className="text-white">{log.action}</TableCell>
                  <TableCell className="text-white">{log.user}</TableCell>
                  <TableCell className="text-white">{log.category}</TableCell>
                  <TableCell className="text-white max-w-xs truncate">{log.details}</TableCell>
                  <TableCell className="text-white">{log.ipAddress}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        log.status === "success"
                          ? "bg-green-500/20 text-green-400"
                          : log.status === "failed"
                            ? "bg-red-500/20 text-red-400"
                            : "bg-yellow-500/20 text-yellow-400"
                      }`}
                    >
                      {log.status}
                    </span>
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
