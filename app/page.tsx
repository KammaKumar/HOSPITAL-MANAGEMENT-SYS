"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Users, UserCheck, Calendar, DollarSign, Activity, TrendingUp, AlertCircle, Clock, Search, MapPin, Stethoscope, Phone, ChevronDown } from "lucide-react"
import { Layout } from "@/components/layout"

export default function Dashboard() {
  const [userRole] = useState("Admin") // This would come from authentication

  const stats = [
    {
      title: "Total Patients",
      value: "2,847",
      change: "+12%",
      icon: Users,
      color: "text-pink-600",
    },
    {
      title: "Active Staff",
      value: "156",
      change: "+3%",
      icon: UserCheck,
      color: "text-purple-600",
    },
    {
      title: "Today's Appointments",
      value: "89",
      change: "+8%",
      icon: Calendar,
      color: "text-pink-600",
    },
    {
      title: "Monthly Revenue",
      value: "₹2,84,750",
      change: "+15%",
      icon: DollarSign,
      color: "text-purple-600",
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
      message: "Insurance claim processed - ₹25,000",
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
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="hero-section rounded-2xl p-8">
          <div className="hero-content">
            <h1 className="hero-title">Welcome to Kauvery Hospital</h1>
            <p className="hero-subtitle">Comprehensive healthcare management at your fingertips</p>
            
            <div className="cta-buttons">
              <a href="/appointments" className="cta-button cta-primary">
                <Calendar className="w-5 h-5" />
                Schedule Appointment
              </a>
              <a href="/patients" className="cta-button cta-secondary">
                <Users className="w-5 h-5" />
                Manage Patients
              </a>
            </div>

            <div className="stats-grid">
              {stats.map((stat, index) => (
                <div key={index} className="stat-card">
                  <div className="stat-number">{stat.value}</div>
                  <div className="stat-label">{stat.title}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="doctor-card bg-white border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 kauvery-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Register Patient</h3>
              <p className="text-gray-600 text-sm mb-4">Add new patient to the system</p>
              <Button className="btn-primary w-full">
                Register Now
              </Button>
            </CardContent>
          </Card>

          <Card className="doctor-card bg-white border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 kauvery-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Book Appointment</h3>
              <p className="text-gray-600 text-sm mb-4">Schedule patient appointments</p>
              <Button className="btn-primary w-full">
                Book Now
              </Button>
            </CardContent>
          </Card>

          <Card className="doctor-card bg-white border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 kauvery-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Generate Bill</h3>
              <p className="text-gray-600 text-sm mb-4">Create patient invoices</p>
              <Button className="btn-primary w-full">
                Generate
              </Button>
            </CardContent>
          </Card>

          <Card className="doctor-card bg-white border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 kauvery-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">View Reports</h3>
              <p className="text-gray-600 text-sm mb-4">Access analytics and reports</p>
              <Button className="btn-primary w-full">
                View Reports
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Recent Activities */}
          <Card className="lg:col-span-2 bg-white border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 kauvery-text-pink">
                <Activity className="h-5 w-5" />
                Recent Activities
              </CardTitle>
              <CardDescription>Latest updates from across the hospital</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                    <div className={`p-2 rounded-full ${activity.priority === "high" ? "bg-red-100" : "bg-pink-100"}`}>
                      {activity.priority === "high" ? (
                        <AlertCircle className="h-4 w-4 text-red-600" />
                      ) : (
                        <Clock className="h-4 w-4 text-pink-600" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                    {activity.priority === "high" && (
                      <Badge className="bg-red-100 text-red-800 border-red-200">
                        High
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Appointments */}
          <Card className="bg-white border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 kauvery-text-purple">
                <Calendar className="h-5 w-5" />
                Today's Schedule
              </CardTitle>
              <CardDescription>Upcoming appointments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start mb-1">
                      <p className="font-medium text-sm text-gray-900">{appointment.patient}</p>
                      <Badge className="kauvery-pink text-white text-xs">
                        {appointment.type}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600">{appointment.doctor}</p>
                    <p className="text-xs font-medium kauvery-text-pink">{appointment.time}</p>
                  </div>
                ))}
              </div>
              <Button className="btn-outline w-full mt-4">
                View All Appointments
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Emergency Contacts */}
        <Card className="bg-white border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="kauvery-text-pink">Emergency Contacts</CardTitle>
            <CardDescription>Quick access to emergency numbers across all locations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="p-4 rounded-lg bg-red-50 border border-red-200">
                <h4 className="font-semibold text-red-900 mb-2">Chennai Alwarpet</h4>
                <p className="text-red-700 font-mono">044 40006000</p>
              </div>
              <div className="p-4 rounded-lg bg-red-50 border border-red-200">
                <h4 className="font-semibold text-red-900 mb-2">Chennai Radial Road</h4>
                <p className="text-red-700 font-mono">044 40504050</p>
              </div>
              <div className="p-4 rounded-lg bg-red-50 border border-red-200">
                <h4 className="font-semibold text-red-900 mb-2">Chennai Vadapalani</h4>
                <p className="text-red-700 font-mono">044 40006000</p>
              </div>
              <div className="p-4 rounded-lg bg-red-50 border border-red-200">
                <h4 className="font-semibold text-red-900 mb-2">Trichy</h4>
                <p className="text-red-700 font-mono">0431 4077777</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}