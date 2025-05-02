"use client"

import { useState } from "react"
import { BarChart, LineChart, PieChart } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { AdminRouteGuard } from "@/components/admin-route-guard"

export default function AdminPage() {
  const [timeRange, setTimeRange] = useState("30")

  return (
    <AdminRouteGuard>
      <div className="container py-8 px-4 md:py-12">
        <div className="flex flex-col items-center text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl mb-4">Admin Dashboard</h1>
          <p className="text-muted-foreground max-w-[700px] mb-6">View and analyze user and content statistics</p>
        </div>

        <div className="flex justify-end mb-4">
          <div className="flex items-center space-x-2">
            <Label htmlFor="time-range">Time Range:</Label>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger id="time-range" className="w-[180px]">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="90">Last 90 days</SelectItem>
                <SelectItem value="365">Last year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,248</div>
              <p className="text-xs text-muted-foreground">+12.5% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Articles Analyzed</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M8 3H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.414A2 2 0 0 0 20.414 6L15 .586A2 2 0 0 0 13.586 0H8a2 2 0 0 0-2 2v1Z" />
                <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                <path d="M17 21v-7.5" />
                <path d="M14 17l3 3 3-3" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4,385</div>
              <p className="text-xs text-muted-foreground">+23.1% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">573</div>
              <p className="text-xs text-muted-foreground">+7.2% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Saved Articles</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2Z" />
                <path d="M18 11H6" />
                <path d="M12 5v12" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,892</div>
              <p className="text-xs text-muted-foreground">+14.3% from last month</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="political-leaning">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="political-leaning">
              <PieChart className="h-4 w-4 mr-2" />
              Political Leaning
            </TabsTrigger>
            <TabsTrigger value="user-activity">
              <LineChart className="h-4 w-4 mr-2" />
              User Activity
            </TabsTrigger>
            <TabsTrigger value="sources">
              <BarChart className="h-4 w-4 mr-2" />
              News Sources
            </TabsTrigger>
          </TabsList>

          <TabsContent value="political-leaning">
            <Card>
              <CardHeader>
                <CardTitle>Political Leaning Distribution</CardTitle>
                <CardDescription>Distribution of political leaning across analyzed articles</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] flex items-center justify-center">
                  <div className="w-full max-w-md">
                    <div className="flex justify-between mb-2">
                      <span>Far Left</span>
                      <span>Far Right</span>
                    </div>
                    <div className="h-8 w-full bg-gradient-to-r from-blue-600 via-purple-500 to-red-600 rounded-lg relative">
                      {/* Distribution markers */}
                      <div className="absolute bottom-full left-[15%] mb-1">
                        <div className="w-1 h-3 bg-black mx-auto mb-1"></div>
                        <span className="text-xs">15%</span>
                      </div>
                      <div className="absolute bottom-full left-[32%] mb-1">
                        <div className="w-1 h-3 bg-black mx-auto mb-1"></div>
                        <span className="text-xs">17%</span>
                      </div>
                      <div className="absolute bottom-full left-[50%] mb-1">
                        <div className="w-1 h-3 bg-black mx-auto mb-1"></div>
                        <span className="text-xs">18%</span>
                      </div>
                      <div className="absolute bottom-full left-[68%] mb-1">
                        <div className="w-1 h-3 bg-black mx-auto mb-1"></div>
                        <span className="text-xs">22%</span>
                      </div>
                      <div className="absolute bottom-full left-[85%] mb-1">
                        <div className="w-1 h-3 bg-black mx-auto mb-1"></div>
                        <span className="text-xs">28%</span>
                      </div>
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                      <span>Far Left</span>
                      <span>Left</span>
                      <span>Moderate</span>
                      <span>Right</span>
                      <span>Far Right</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="user-activity">
            <Card>
              <CardHeader>
                <CardTitle>User Activity Over Time</CardTitle>
                <CardDescription>Daily active users and article analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    [Line chart visualization would appear here showing user activity trends]
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sources">
            <Card>
              <CardHeader>
                <CardTitle>Top News Sources</CardTitle>
                <CardDescription>Most frequently analyzed news sources</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] flex items-center justify-center">
                  <div className="w-full max-w-md space-y-4">
                    {/* Bar chart representation */}
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <span className="w-24">CNN</span>
                        <div className="h-6 bg-blue-500 rounded" style={{ width: "75%" }}></div>
                        <span className="ml-2">28%</span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-24">Fox News</span>
                        <div className="h-6 bg-red-500 rounded" style={{ width: "65%" }}></div>
                        <span className="ml-2">24%</span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-24">NY Times</span>
                        <div className="h-6 bg-blue-400 rounded" style={{ width: "45%" }}></div>
                        <span className="ml-2">17%</span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-24">WSJ</span>
                        <div className="h-6 bg-red-400 rounded" style={{ width: "40%" }}></div>
                        <span className="ml-2">15%</span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-24">BBC</span>
                        <div className="h-6 bg-purple-500 rounded" style={{ width: "30%" }}></div>
                        <span className="ml-2">11%</span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-24">Others</span>
                        <div className="h-6 bg-gray-400 rounded" style={{ width: "15%" }}></div>
                        <span className="ml-2">5%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminRouteGuard>
  )
}
