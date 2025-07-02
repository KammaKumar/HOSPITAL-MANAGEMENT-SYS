"use client"

import { useState } from "react"
import { Layout } from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, TrendingUp, TrendingDown, CreditCard, Receipt, Search, Download, Plus } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function FinancePage() {
  const [userRole] = useState("Admin")
  const [searchTerm, setSearchTerm] = useState("")

  const financialStats = [
    {
      title: "Total Revenue",
      value: "$284,750",
      change: "+15.2%",
      icon: DollarSign,
      color: "text-green-600",
      trend: "up",
    },
    {
      title: "Total Expenses",
      value: "$156,420",
      change: "+8.1%",
      icon: TrendingDown,
      color: "text-red-600",
      trend: "up",
    },
    {
      title: "Net Profit",
      value: "$128,330",
      change: "+22.5%",
      icon: TrendingUp,
      color: "text-green-600",
      trend: "up",
    },
    {
      title: "Pending Bills",
      value: "$23,450",
      change: "-5.2%",
      icon: Receipt,
      color: "text-orange-600",
      trend: "down",
    },
  ]

  const transactions = [
    {
      id: "T001",
      type: "Revenue",
      description: "Patient Consultation - Dr. Wilson",
      patient: "John Doe",
      amount: 250,
      date: "2024-01-15",
      status: "Completed",
      paymentMethod: "Insurance",
    },
    {
      id: "T002",
      type: "Revenue",
      description: "Surgery - Appendectomy",
      patient: "Jane Smith",
      amount: 5500,
      date: "2024-01-14",
      status: "Completed",
      paymentMethod: "Cash",
    },
    {
      id: "T003",
      type: "Expense",
      description: "Medical Equipment Purchase",
      patient: "-",
      amount: -12000,
      date: "2024-01-13",
      status: "Completed",
      paymentMethod: "Bank Transfer",
    },
    {
      id: "T004",
      type: "Revenue",
      description: "Lab Tests - Blood Work",
      patient: "Bob Johnson",
      amount: 180,
      date: "2024-01-12",
      status: "Pending",
      paymentMethod: "Insurance",
    },
    {
      id: "T005",
      type: "Expense",
      description: "Staff Salary - January",
      patient: "-",
      amount: -45000,
      date: "2024-01-10",
      status: "Completed",
      paymentMethod: "Bank Transfer",
    },
  ]

  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (transaction.patient && transaction.patient.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Revenue":
        return "bg-green-100 text-green-800"
      case "Expense":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Layout userRole={userRole}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Financial Management</h1>
            <p className="text-muted-foreground">Track revenue, expenses, and financial reports</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Transaction
            </Button>
          </div>
        </div>

        {/* Financial Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {financialStats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className={stat.trend === "up" ? "text-green-600" : "text-red-600"}>{stat.change}</span> from
                  last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Revenue vs Expenses Chart Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue vs Expenses</CardTitle>
            <CardDescription>Monthly financial overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-lg">
              <div className="text-center">
                <TrendingUp className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Financial chart would be displayed here</p>
                <p className="text-sm text-muted-foreground">Integration with charting library needed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search and Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Transaction Search</CardTitle>
            <CardDescription>Find transactions by ID, description, or patient</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="revenue">Revenue</SelectItem>
                  <SelectItem value="expense">Expenses</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Transactions Table */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>{filteredTransactions.length} transactions found</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Payment Method</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">{transaction.id}</TableCell>
                    <TableCell>
                      <Badge className={getTypeColor(transaction.type)}>{transaction.type}</Badge>
                    </TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell>{transaction.patient}</TableCell>
                    <TableCell>
                      <span className={transaction.amount > 0 ? "text-green-600" : "text-red-600"}>
                        ${Math.abs(transaction.amount).toLocaleString()}
                      </span>
                    </TableCell>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                        {transaction.paymentMethod}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(transaction.status)}>{transaction.status}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Generate Invoice</CardTitle>
              <CardDescription>Create new patient invoice</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">
                <Receipt className="mr-2 h-4 w-4" />
                New Invoice
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Process Payroll</CardTitle>
              <CardDescription>Run monthly staff payroll</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-transparent" variant="outline">
                <DollarSign className="mr-2 h-4 w-4" />
                Run Payroll
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Insurance Claims</CardTitle>
              <CardDescription>Manage insurance processing</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-transparent" variant="outline">
                <CreditCard className="mr-2 h-4 w-4" />
                View Claims
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  )
}
