"use client"

import { useState } from "react"
import { Layout } from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Search, Plus, CalendarIcon, Clock, User, CheckCircle, XCircle } from "lucide-react"

export default function AppointmentsPage() {
  const [userRole] = useState("Admin")
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  const appointments = [
    {
      id: "A001",
      patient: "John Doe",
      doctor: "Dr. Sarah Wilson",
      department: "Cardiology",
      date: "2024-01-16",
      time: "10:00 AM",
      type: "Consultation",
      status: "Scheduled",
      duration: "30 min",
      notes: "Follow-up for hypertension",
    },
    {
      id: "A002",
      patient: "Jane Smith",
      doctor: "Dr. Michael Brown",
      department: "Emergency",
      date: "2024-01-16",
      time: "11:30 AM",
      type: "Emergency",
      status: "In Progress",
      duration: "45 min",
      notes: "Chest pain evaluation",
    },
    {
      id: "A003",
      patient: "Bob Johnson",
      doctor: "Dr. Sarah Wilson",
      department: "Cardiology",
      date: "2024-01-16",
      time: "2:00 PM",
      type: "Surgery",
      status: "Scheduled",
      duration: "120 min",
      notes: "Cardiac catheterization",
    },
    {
      id: "A004",
      patient: "Alice Brown",
      doctor: "Dr. Lisa Davis",
      department: "Obstetrics",
      date: "2024-01-16",
      time: "3:30 PM",
      type: "Check-up",
      status: "Completed",
      duration: "20 min",
      notes: "Routine prenatal check",
    },
    {
      id: "A005",
      patient: "Charlie Wilson",
      doctor: "Dr. Michael Brown",
      department: "Emergency",
      date: "2024-01-17",
      time: "9:00 AM",
      type: "Follow-up",
      status: "Cancelled",
      duration: "30 min",
      notes: "Patient cancelled",
    },
  ]

  const filteredAppointments = appointments.filter(
    (appointment) =>
      appointment.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Scheduled":
        return "bg-blue-100 text-blue-800"
      case "In Progress":
        return "bg-yellow-100 text-yellow-800"
      case "Completed":
        return "bg-green-100 text-green-800"
      case "Cancelled":
        return "bg-red-100 text-red-800"
      case "No Show":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Emergency":
        return "bg-red-100 text-red-800"
      case "Surgery":
        return "bg-purple-100 text-purple-800"
      case "Consultation":
        return "bg-blue-100 text-blue-800"
      case "Follow-up":
        return "bg-green-100 text-green-800"
      case "Check-up":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const todayStats = [
    {
      title: "Total Appointments",
      value: "24",
      icon: CalendarIcon,
      color: "text-blue-600",
    },
    {
      title: "Completed",
      value: "8",
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      title: "In Progress",
      value: "3",
      icon: Clock,
      color: "text-yellow-600",
    },
    {
      title: "Cancelled",
      value: "2",
      icon: XCircle,
      color: "text-red-600",
    },
  ]

  return (
    <Layout userRole={userRole}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Appointment Management</h1>
            <p className="text-muted-foreground">Schedule and manage patient appointments</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Schedule Appointment
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Schedule New Appointment</DialogTitle>
                <DialogDescription>Create a new appointment for a patient.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="patient">Patient</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select patient" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="john-doe">John Doe</SelectItem>
                        <SelectItem value="jane-smith">Jane Smith</SelectItem>
                        <SelectItem value="bob-johnson">Bob Johnson</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="doctor">Doctor</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select doctor" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dr-wilson">Dr. Sarah Wilson</SelectItem>
                        <SelectItem value="dr-brown">Dr. Michael Brown</SelectItem>
                        <SelectItem value="dr-davis">Dr. Lisa Davis</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cardiology">Cardiology</SelectItem>
                        <SelectItem value="emergency">Emergency</SelectItem>
                        <SelectItem value="obstetrics">Obstetrics</SelectItem>
                        <SelectItem value="pediatrics">Pediatrics</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Appointment Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="consultation">Consultation</SelectItem>
                        <SelectItem value="follow-up">Follow-up</SelectItem>
                        <SelectItem value="check-up">Check-up</SelectItem>
                        <SelectItem value="surgery">Surgery</SelectItem>
                        <SelectItem value="emergency">Emergency</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Input id="date" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Time</Label>
                    <Input id="time" type="time" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (minutes)</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="45">45 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="90">1.5 hours</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Input id="notes" placeholder="Additional notes or instructions" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsAddDialogOpen(false)}>Schedule Appointment</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Today's Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          {todayStats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">Today</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Calendar */}
          <Card>
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
              <CardDescription>Select date to view appointments</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>

          {/* Search and Filters */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Search Appointments</CardTitle>
              <CardDescription>Find appointments by patient, doctor, or ID</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search appointments..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="consultation">Consultation</SelectItem>
                      <SelectItem value="follow-up">Follow-up</SelectItem>
                      <SelectItem value="surgery">Surgery</SelectItem>
                      <SelectItem value="emergency">Emergency</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by doctor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Doctors</SelectItem>
                      <SelectItem value="dr-wilson">Dr. Sarah Wilson</SelectItem>
                      <SelectItem value="dr-brown">Dr. Michael Brown</SelectItem>
                      <SelectItem value="dr-davis">Dr. Lisa Davis</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Appointments Table */}
        <Card>
          <CardHeader>
            <CardTitle>Appointment Schedule</CardTitle>
            <CardDescription>{filteredAppointments.length} appointments found</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Doctor</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAppointments.map((appointment) => (
                  <TableRow key={appointment.id}>
                    <TableCell className="font-medium">{appointment.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        {appointment.patient}
                      </div>
                    </TableCell>
                    <TableCell>{appointment.doctor}</TableCell>
                    <TableCell>{appointment.department}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{appointment.date}</div>
                        <div className="text-muted-foreground">{appointment.time}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getTypeColor(appointment.type)}>{appointment.type}</Badge>
                    </TableCell>
                    <TableCell>{appointment.duration}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(appointment.status)}>{appointment.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          Cancel
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}
