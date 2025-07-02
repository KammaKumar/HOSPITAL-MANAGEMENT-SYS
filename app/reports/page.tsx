"use client"

import { useState } from "react"
import { Layout } from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  FileText,
  Download,
  Calendar,
  Users,
  DollarSign,
  Activity,
  TrendingUp,
  BarChart3,
  PieChart,
} from "lucide-react"

export default function ReportsPage() {
  const [userRole] = useState("Admin")

  const reportCategories = [
    {
      title: "Patient Reports",
      description: "Patient admission, discharge, and medical records",
      icon: Users,
      color: "text-blue-600",
      reports: [
        {
          name: "Patient Admission Report",
          description: "Daily/Monthly admission statistics",
          lastGenerated: "2024-01-15",
        },
        {
          name: "Discharge Summary",
          description: "Patient discharge records and outcomes",
          lastGenerated: "2024-01-14",
        },
        {
          name: "Medical History Report",
          description: "Comprehensive patient medical records",
          lastGenerated: "2024-01-13",
        },
        {
          name: "Appointment Statistics",
          description: "Appointment booking and attendance rates",
          lastGenerated: "2024-01-12",
        },
      ],
    },
    {
      title: "Financial Reports",
      description: "Revenue, expenses, and financial analytics",
      icon: DollarSign,
      color: "text-green-600",
      reports: [
        { name: "Revenue Analysis", description: "Monthly and yearly revenue breakdown", lastGenerated: "2024-01-15" },
        { name: "Expense Report", description: "Operational and administrative expenses", lastGenerated: "2024-01-14" },
        { name: "Profit & Loss Statement", description: "Comprehensive P&L analysis", lastGenerated: "2024-01-10" },
        {
          name: "Insurance Claims Report",
          description: "Insurance processing and reimbursements",
          lastGenerated: "2024-01-08",
        },
      ],
    },
    {
      title: "Staff Reports",
      description: "Employee performance and attendance tracking",
      icon: Activity,
      color: "text-purple-600",
      reports: [
        {
          name: "Staff Performance Report",
          description: "Employee productivity and KPIs",
          lastGenerated: "2024-01-15",
        },
        { name: "Attendance Report", description: "Staff attendance and leave records", lastGenerated: "2024-01-14" },
        {
          name: "Payroll Summary",
          description: "Monthly payroll and compensation details",
          lastGenerated: "2024-01-01",
        },
        {
          name: "Department Utilization",
          description: "Department-wise staff allocation",
          lastGenerated: "2024-01-10",
        },
      ],
    },
    {
      title: "Operational Reports",
      description: "Hospital operations and resource utilization",
      icon: BarChart3,
      color: "text-orange-600",
      reports: [
        {
          name: "Bed Occupancy Report",
          description: "Hospital bed utilization statistics",
          lastGenerated: "2024-01-15",
        },
        {
          name: "Equipment Utilization",
          description: "Medical equipment usage and maintenance",
          lastGenerated: "2024-01-12",
        },
        {
          name: "Department Performance",
          description: "Department-wise operational metrics",
          lastGenerated: "2024-01-10",
        },
        {
          name: "Resource Allocation",
          description: "Hospital resource distribution analysis",
          lastGenerated: "2024-01-08",
        },
      ],
    },
  ]

  const quickStats = [
    {
      title: "Reports Generated",
      value: "1,247",
      period: "This Month",
      icon: FileText,
      color: "text-blue-600",
    },
    {
      title: "Data Points Analyzed",
      value: "45,678",
      period: "This Month",
      icon: TrendingUp,
      color: "text-green-600",
    },
    {
      title: "Automated Reports",
      value: "23",
      period: "Active",
      icon: Calendar,
      color: "text-purple-600",
    },
  ]

  return (
    <Layout userRole={userRole}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Reports & Analytics</h1>
            <p className="text-muted-foreground">Generate and view hospital reports and analytics</p>
          </div>
          <div className="flex gap-2">
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Export All
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          {quickStats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.period}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Dashboard Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Analytics Dashboard
            </CardTitle>
            <CardDescription>Key performance indicators and trends</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="h-[200px] flex items-center justify-center bg-muted/20 rounded-lg">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">Patient Analytics Chart</p>
                </div>
              </div>
              <div className="h-[200px] flex items-center justify-center bg-muted/20 rounded-lg">
                <div className="text-center">
                  <TrendingUp className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">Financial Trends Chart</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Report Categories */}
        <div className="grid gap-6 md:grid-cols-2">
          {reportCategories.map((category, categoryIndex) => (
            <Card key={categoryIndex}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <category.icon className={`h-5 w-5 ${category.color}`} />
                  {category.title}
                </CardTitle>
                <CardDescription>{category.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {category.reports.map((report, reportIndex) => (
                    <div key={reportIndex} className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{report.name}</h4>
                        <p className="text-xs text-muted-foreground">{report.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">Last generated: {report.lastGenerated}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <FileText className="h-3 w-3 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-3 w-3 mr-1" />
                          Export
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Scheduled Reports */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Scheduled Reports
            </CardTitle>
            <CardDescription>Automatically generated reports</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                {
                  name: "Daily Patient Summary",
                  schedule: "Every day at 8:00 AM",
                  status: "Active",
                  nextRun: "Tomorrow 8:00 AM",
                },
                {
                  name: "Weekly Financial Report",
                  schedule: "Every Monday at 9:00 AM",
                  status: "Active",
                  nextRun: "Monday 9:00 AM",
                },
                {
                  name: "Monthly Staff Performance",
                  schedule: "1st of every month",
                  status: "Active",
                  nextRun: "Feb 1, 2024",
                },
                { name: "Quarterly Analytics", schedule: "Every quarter", status: "Paused", nextRun: "Apr 1, 2024" },
              ].map((scheduledReport, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{scheduledReport.name}</h4>
                      <Badge variant={scheduledReport.status === "Active" ? "default" : "secondary"}>
                        {scheduledReport.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{scheduledReport.schedule}</p>
                    <p className="text-xs text-muted-foreground">Next run: {scheduledReport.nextRun}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      {scheduledReport.status === "Active" ? "Pause" : "Resume"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}
