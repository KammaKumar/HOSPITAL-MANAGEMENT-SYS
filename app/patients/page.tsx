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
import { Search, Plus, Eye, Edit, Calendar } from "lucide-react"

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
        return "bg-green-100 text-green-800"
      case "Discharged":
        return "bg-blue-100 text-blue-800"
      case "Critical":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
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

  return (
    <Layout userRole={userRole}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Patient Management</h1>
            <p className="text-muted-foreground">Manage patient records and information</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Patient
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Patient</DialogTitle>
                <DialogDescription>Enter patient information to create a new record.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="Enter first name" ref={firstNameRef} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Enter last name" ref={lastNameRef} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input id="age" type="number" placeholder="Enter age" ref={ageRef} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Input id="gender" placeholder="Enter gender" ref={genderRef} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" placeholder="Enter phone number" ref={phoneRef} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Enter email" ref={emailRef} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bloodGroup">Blood Group</Label>
                    <Input id="bloodGroup" placeholder="Enter blood group" ref={bloodGroupRef} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emergencyContact">Emergency Contact</Label>
                    <Input id="emergencyContact" placeholder="Enter emergency contact" ref={emergencyContactRef} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea id="address" placeholder="Enter full address" ref={addressRef} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="medicalHistory">Medical History</Label>
                  <Textarea id="medicalHistory" placeholder="Enter medical history" ref={medicalHistoryRef} />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddPatient}>Add Patient</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Search Patients</CardTitle>
            <CardDescription>Find patients by name or ID</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or patient ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
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
        <Card>
          <CardHeader>
            <CardTitle>Patient Records</CardTitle>
            <CardDescription>{filteredPatients.length} patients found</CardDescription>
          </CardHeader>
          <CardContent>
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
                  <TableRow key={patient.id}>
                    <TableCell className="font-medium">{patient.id}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{patient.name}</div>
                        <div className="text-sm text-muted-foreground">{patient.condition}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {patient.age} / {patient.gender}
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{patient.phone}</div>
                        <div className="text-muted-foreground">{patient.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{patient.bloodGroup}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(patient.status)}>{patient.status}</Badge>
                    </TableCell>
                    <TableCell>{patient.lastVisit}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Calendar className="h-4 w-4" />
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
