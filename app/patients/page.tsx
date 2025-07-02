"use client"

import { useState, useEffect, useRef } from "react"
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
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Plus, Eye, Edit, Calendar, Users, UserPlus, Activity } from "lucide-react"

export default function PatientsPage() {
  const [userRole] = useState("Admin")
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [patients, setPatients] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  // Form refs
  const firstNameRef = useRef<HTMLInputElement>(null)
  const lastNameRef = useRef<HTMLInputElement>(null)
  const ageRef = useRef<HTMLInputElement>(null)
  const genderRef = useRef<HTMLInputElement>(null)
  const phoneRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const bloodGroupRef = useRef<HTMLInputElement>(null)
  const emergencyContactRef = useRef<HTMLInputElement>(null)
  const addressRef = useRef<HTMLTextAreaElement>(null)
  const medicalHistoryRef = useRef<HTMLTextAreaElement>(null)

  // Fetch patients from API
  useEffect(() => {
    setLoading(true)
    fetch("/api/patients")
      .then((res) => res.json())
      .then((data) => setPatients(data))
      .finally(() => setLoading(false))
  }, [isAddDialogOpen]) // refetch after adding

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 border-green-200"
      case "Discharged":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Critical":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const handleAddPatient = async () => {
    const newPatient = {
      name: `${firstNameRef.current?.value || ''} ${lastNameRef.current?.value || ''}`.trim(),
      age: ageRef.current?.value || '',
      gender: genderRef.current?.value || '',
      phone: phoneRef.current?.value || '',
      email: emailRef.current?.value || '',
      bloodGroup: bloodGroupRef.current?.value || '',
      emergencyContact: emergencyContactRef.current?.value || '',
      address: addressRef.current?.value || '',
      medicalHistory: medicalHistoryRef.current?.value || '',
      status: "Active",
      lastVisit: new Date().toISOString().split("T")[0],
      condition: "-",
    }
    await fetch("/api/patients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPatient),
    })
    setIsAddDialogOpen(false)
  }

  const stats = [
    {
      title: "Total Patients",
      value: patients.length.toString(),
      icon: Users,
      color: "text-pink-600",
      bgColor: "bg-pink-100",
    },
    {
      title: "Active Today",
      value: patients.filter(p => p.status === "Active").length.toString(),
      icon: Activity,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "New This Month",
      value: "47",
      icon: UserPlus,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ]

  return (
    <Layout userRole={userRole}>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold kauvery-text-pink">Patient Management</h1>
            <p className="text-gray-600 mt-2">Manage patient records and information</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="btn-primary">
                <Plus className="mr-2 h-4 w-4" />
                Add Patient
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle className="kauvery-text-pink">Add New Patient</DialogTitle>
                <DialogDescription>Enter patient information to create a new record.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="Enter first name" ref={firstNameRef} className="form-input" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Enter last name" ref={lastNameRef} className="form-input" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input id="age" type="number" placeholder="Enter age" ref={ageRef} className="form-input" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Input id="gender" placeholder="Enter gender" ref={genderRef} className="form-input" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" placeholder="Enter phone number" ref={phoneRef} className="form-input" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Enter email" ref={emailRef} className="form-input" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bloodGroup">Blood Group</Label>
                    <Input id="bloodGroup" placeholder="Enter blood group" ref={bloodGroupRef} className="form-input" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emergencyContact">Emergency Contact</Label>
                    <Input id="emergencyContact" placeholder="Enter emergency contact" ref={emergencyContactRef} className="form-input" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea id="address" placeholder="Enter full address" ref={addressRef} className="form-input" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="medicalHistory">Medical History</Label>
                  <Textarea id="medicalHistory" placeholder="Enter medical history" ref={medicalHistoryRef} className="form-input" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddPatient} className="btn-primary">Add Patient</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid gap-6 md:grid-cols-3">
          {stats.map((stat, index) => (
            <Card key={index} className="doctor-card bg-white border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search and Filters */}
        <Card className="bg-white border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="kauvery-text-pink">Search Patients</CardTitle>
            <CardDescription>Find patients by name or ID</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search by name or patient ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-bar pl-10"
                />
              </div>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Patients</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="discharged">Discharged</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Patients Table */}
        <Card className="bg-white border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="kauvery-text-pink">Patient Records</CardTitle>
            <CardDescription>{filteredPatients.length} patients found</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Age/Gender</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Blood Group</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Visit</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPatients.map((patient) => (
                    <TableRow key={patient.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">{patient.id}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium text-gray-900">{patient.name}</div>
                          <div className="text-sm text-gray-500">{patient.condition}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-gray-900">{patient.age} / {patient.gender}</span>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div className="text-gray-900">{patient.phone}</div>
                          <div className="text-gray-500">{patient.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-pink-200 text-pink-700">{patient.bloodGroup}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(patient.status)}>{patient.status}</Badge>
                      </TableCell>
                      <TableCell className="text-gray-900">{patient.lastVisit}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon" className="hover:bg-pink-50 hover:text-pink-600">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="hover:bg-pink-50 hover:text-pink-600">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="hover:bg-pink-50 hover:text-pink-600">
                            <Calendar className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}