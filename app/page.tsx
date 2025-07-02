"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, UserCheck, Calendar, DollarSign, Activity, TrendingUp, AlertCircle, Clock } from "lucide-react"
import { Layout } from "@/components/layout"

export default function Dashboard() {
  const [userRole] = useState("Admin") // This would come from authentication

  const stats = [
    {
      title: "Total Patients",
      value: "2,847",
      change: "+12%",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Active Staff",
      value: "156",
      change: "+3%",
      icon: UserCheck,
      color: "text-green-600",
    },
    {
      title: "Today's Appointments",
      value: "89",
      change: "+8%",
      icon: Calendar,
      color: "text-purple-600",
    },
    {
      title: "Monthly Revenue",
      value: "$284,750",
      change: "+15%",
      icon: DollarSign,
      color: "text-emerald-600",
    },
  ]

  const recentActivities = [
    {
      id: 1,
      type: "appointment",
      message: "New appointment scheduled for Dr. Smith",
      time: "5 minutes ago",
      priority: "normal",
    },
    {
      id: 2,
      type: "admission",
      message: "Patient John Doe admitted to ICU",
      time: "15 minutes ago",
      priority: "high",
    },
    {
      id: 3,
      type: "discharge",
      message: "Patient Mary Johnson discharged",
      time: "1 hour ago",
      priority: "normal",
    },
    {
      id: 4,
      type: "billing",
      message: "Insurance claim processed - $2,500",
      time: "2 hours ago",
      priority: "normal",
    },
  ]

  const upcomingAppointments = [
    {
      id: 1,
      patient: "Alice Brown",
      doctor: "Dr. Wilson",
      time: "10:00 AM",
      type: "Consultation",
    },
    {
      id: 2,
      patient: "Bob Davis",
      doctor: "Dr. Johnson",
      time: "11:30 AM",
      type: "Follow-up",
    },
    {
      id: 3,
      patient: "Carol White",
      doctor: "Dr. Smith",
      time: "2:00 PM",
      type: "Surgery",
    },
  ]

  return (
    <Layout userRole={userRole}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Hospital Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening at your hospital today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">{stat.change}</span> from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Recent Activities */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Recent Activities
              </CardTitle>
              <CardDescription>Latest updates from across the hospital</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg border">
                    <div className={`p-1 rounded-full ${activity.priority === "high" ? "bg-red-100" : "bg-blue-100"}`}>
                      {activity.priority === "high" ? (
                        <AlertCircle className="h-3 w-3 text-red-600" />
                      ) : (
                        <Clock className="h-3 w-3 text-blue-600" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{activity.message}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                    {activity.priority === "high" && (
                      <Badge variant="destructive" className="text-xs">
                        High
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Appointments */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Today's Schedule
              </CardTitle>
              <CardDescription>Upcoming appointments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="p-3 rounded-lg border">
                    <div className="flex justify-between items-start mb-1">
                      <p className="font-medium text-sm">{appointment.patient}</p>
                      <Badge variant="outline" className="text-xs">
                        {appointment.type}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{appointment.doctor}</p>
                    <p className="text-xs font-medium text-blue-600">{appointment.time}</p>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4 bg-transparent">
                View All Appointments
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Frequently used functions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
              <Button className="h-20 flex-col gap-2">
                <Users className="h-5 w-5" />
                Register Patient
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                <Calendar className="h-5 w-5" />
                Schedule Appointment
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                <DollarSign className="h-5 w-5" />
                Generate Bill
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                <TrendingUp className="h-5 w-5" />
                View Reports
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}
