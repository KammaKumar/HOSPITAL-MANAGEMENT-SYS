"use client"

import { useState, useEffect } from "react"
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
import { Search, Plus, Eye, Edit, Calendar, Users, UserCheck, Clock } from "lucide-react"

export default function StaffPage() {
  const [userRole] = useState("Admin")
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const [staff, setStaff] = useState([])
  const [loading, setLoading] = useState(true)

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")

  useEffect(() => {
    async function fetchStaff() {
      setLoading(true)
      const res = await fetch("/api/staff")
      const data = await res.json()
      setStaff(data)
      setLoading(false)
    }
    fetchStaff()
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "On Leave":
        return "bg-yellow-100 text-yellow-800"
      case "Inactive":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Doctor":
        return "bg-blue-100 text-blue-800"
      case "Nurse":
        return "bg-purple-100 text-purple-800"
      case "Receptionist":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const stats = [
    {
      title: "Total Staff",
      value: "156",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Active Today",
      value: "142",
      icon: UserCheck,
      color: "text-green-600",
    },
    {
      title: "On Leave",
      value: "8",
      icon: Clock,
      color: "text-yellow-600",
    },
  ]

  return (
    <Layout userRole={userRole}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Staff Management</h1>
            <p className="text-muted-foreground">Manage hospital staff and employees</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Staff
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Staff Member</DialogTitle>
                <DialogDescription>Enter staff information to create a new employee record.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="Enter first name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Enter last name" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="doctor">Doctor</SelectItem>
                        <SelectItem value="nurse">Nurse</SelectItem>
                        <SelectItem value="receptionist">Receptionist</SelectItem>
                        <SelectItem value="admin">Administrator</SelectItem>
                        <SelectItem value="technician">Technician</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cardiology">Cardiology</SelectItem>
                        <SelectItem value="emergency">Emergency</SelectItem>
                        <SelectItem value="icu">ICU</SelectItem>
                        <SelectItem value="pediatrics">Pediatrics</SelectItem>
                        <SelectItem value="surgery">Surgery</SelectItem>
                        <SelectItem value="administration">Administration</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" placeholder="Enter phone number" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Enter email" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="shift">Shift</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select shift" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="morning">Morning (6AM - 2PM)</SelectItem>
                        <SelectItem value="evening">Evening (2PM - 10PM)</SelectItem>
                        <SelectItem value="night">Night (10PM - 6AM)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="salary">Salary</Label>
                    <Input id="salary" placeholder="Enter annual salary" />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={async () => {
                    const newStaff = {
                      name: `${firstName} ${lastName}`,
                    }
                    const res = await fetch("/api/staff", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(newStaff),
                    })
                    if (res.ok) {
                      const added = await res.json()
                      setStaff(prev => [...prev, { ...newStaff, _id: added.insertedId }])
                      setIsAddDialogOpen(false)
                      setFirstName("")
                      setLastName("")
                    } else {
                      alert("Failed to add staff")
                    }
                  }}
                >
                  Add Staff Member
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search and Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Search Staff</CardTitle>
            <CardDescription>Find staff members by name, ID, or department</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, ID, or department..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="doctor">Doctors</SelectItem>
                  <SelectItem value="nurse">Nurses</SelectItem>
                  <SelectItem value="receptionist">Receptionists</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="leave">On Leave</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Staff Table */}
        <Card>
          <CardHeader>
            <CardTitle>Staff Directory</CardTitle>
            <CardDescription>{staff.length} staff members found</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Staff ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Shift</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {staff.map((member) => (
                  <TableRow key={member._id}>
                    <TableCell className="font-medium">{member._id}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{member.name}</div>
                        <div className="text-sm text-muted-foreground">Joined: {member.joinDate}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getRoleColor(member.role)}>{member.role}</Badge>
                    </TableCell>
                    <TableCell>{member.department}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{member.phone}</div>
                        <div className="text-muted-foreground">{member.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>{member.shift}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(member.status)}>{member.status}</Badge>
                    </TableCell>
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
