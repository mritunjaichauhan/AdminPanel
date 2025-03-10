"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, Users, FileText, TrendingUp, DollarSign, Calendar, Plus } from "lucide-react"
import { Progress } from "@/components/ui/progress"

// Chart component (simplified for this example)
function Chart({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min

  return (
    <div className="flex items-end h-24 gap-1">
      {data.map((value, index) => (
        <div
          key={index}
          className={`w-full ${color} rounded-sm`}
          style={{
            height: `${((value - min) / range) * 100}%`,
            minHeight: "4px",
          }}
        />
      ))}
    </div>
  )
}

export default function DashboardPage() {
  // Mock data
  const influencerGrowth = [35, 28, 45, 42, 55, 58, 62, 65, 72, 80, 78, 85]
  const resourceDownloads = [120, 145, 132, 155, 180, 175, 190, 210, 205, 220, 235, 250]
  const recentActivities = [
    { id: 1, action: "New influencer joined", user: "Admin", time: "10 minutes ago" },
    { id: 2, action: "Resource uploaded", user: "Content Team", time: "1 hour ago" },
    { id: 3, action: "Campaign started", user: "Marketing", time: "3 hours ago" },
    { id: 4, action: "Settings updated", user: "Admin", time: "Yesterday" },
  ]
  const upcomingEvents = [
    { id: 1, title: "Marketing Campaign Launch", date: "Mar 15, 2024" },
    { id: 2, title: "Influencer Onboarding", date: "Mar 18, 2024" },
    { id: 3, title: "Content Review", date: "Mar 22, 2024" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Dashboard</h2>
        <Button className="bg-cyan-600 hover:bg-cyan-700">
          <Plus className="mr-2 h-4 w-4" /> New Campaign
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-white text-sm font-medium">Total Influencers</CardTitle>
            <Users className="h-4 w-4 text-cyan-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">1,248</div>
            <p className="text-xs text-gray-400 mt-1">
              <span className="text-green-400 inline-flex items-center">
                +12% <ArrowUpRight className="h-3 w-3 ml-1" />
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-white text-sm font-medium">Active Resources</CardTitle>
            <FileText className="h-4 w-4 text-cyan-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">342</div>
            <p className="text-xs text-gray-400 mt-1">
              <span className="text-green-400 inline-flex items-center">
                +8% <ArrowUpRight className="h-3 w-3 ml-1" />
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-white text-sm font-medium">Engagement Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-cyan-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">4.6%</div>
            <p className="text-xs text-gray-400 mt-1">
              <span className="text-green-400 inline-flex items-center">
                +1.2% <ArrowUpRight className="h-3 w-3 ml-1" />
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-white text-sm font-medium">Campaign Budget</CardTitle>
            <DollarSign className="h-4 w-4 text-cyan-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">$24,500</div>
            <p className="text-xs text-gray-400 mt-1">
              <span className="text-yellow-400 inline-flex items-center">
                68% <ArrowUpRight className="h-3 w-3 ml-1" />
              </span>{" "}
              of total allocated
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Influencer Growth</CardTitle>
            <CardDescription className="text-gray-400">New influencers over the last 12 months</CardDescription>
          </CardHeader>
          <CardContent>
            <Chart data={influencerGrowth} color="bg-cyan-500" />
            <div className="flex items-center justify-between mt-4 text-sm">
              <span className="text-gray-400">Mar</span>
              <span className="text-gray-400">Jun</span>
              <span className="text-gray-400">Sep</span>
              <span className="text-gray-400">Dec</span>
              <span className="text-gray-400">Mar</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Resource Downloads</CardTitle>
            <CardDescription className="text-gray-400">Total downloads over the last 12 months</CardDescription>
          </CardHeader>
          <CardContent>
            <Chart data={resourceDownloads} color="bg-purple-500" />
            <div className="flex items-center justify-between mt-4 text-sm">
              <span className="text-gray-400">Mar</span>
              <span className="text-gray-400">Jun</span>
              <span className="text-gray-400">Sep</span>
              <span className="text-gray-400">Dec</span>
              <span className="text-gray-400">Mar</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity and Upcoming Events */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Recent Activity</CardTitle>
            <CardDescription className="text-gray-400">Latest actions in the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-4 pb-4 border-b border-gray-800">
                  <div className="w-2 h-2 mt-2 rounded-full bg-cyan-400"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">{activity.action}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-xs text-gray-400">By {activity.user}</p>
                      <span className="text-gray-600">•</span>
                      <p className="text-xs text-gray-400">{activity.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="ghost" className="w-full mt-4 text-cyan-400">
              View All Activity
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Upcoming Events</CardTitle>
            <CardDescription className="text-gray-400">Scheduled events and deadlines</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-center gap-4 pb-4 border-b border-gray-800">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-800 text-cyan-400">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">{event.title}</p>
                    <p className="text-xs text-gray-400 mt-1">{event.date}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="ghost" className="w-full mt-4 text-cyan-400">
              View Calendar
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Campaign Progress */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Campaign Progress</CardTitle>
          <CardDescription className="text-gray-400">Current status of active marketing campaigns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-white">Spring Collection Launch</p>
                <p className="text-sm font-medium text-white">75%</p>
              </div>
              <Progress value={75} className="h-2 bg-gray-800" indicatorClassName="bg-green-500" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-white">Summer Influencer Program</p>
                <p className="text-sm font-medium text-white">45%</p>
              </div>
              <Progress value={45} className="h-2 bg-gray-800" indicatorClassName="bg-cyan-500" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-white">Product Awareness Campaign</p>
                <p className="text-sm font-medium text-white">90%</p>
              </div>
              <Progress value={90} className="h-2 bg-gray-800" indicatorClassName="bg-purple-500" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
