"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Home,
  Users,
  UserCheck,
  Calendar,
  DollarSign,
  FileText,
  Settings,
  Bell,
  Menu,
  LogOut,
  User,
  Search,
  Phone,
  ChevronDown,
} from "lucide-react"

interface LayoutProps {
  children: React.ReactNode
  userRole: string
}

export function Layout({ children, userRole }: LayoutProps) {
  const pathname = usePathname()
  const [notifications] = useState(3)

  const navigation = [
    {
      name: "Dashboard",
      href: "/",
      icon: Home,
      roles: ["Admin", "Doctor", "Nurse", "Finance", "Receptionist"],
    },
    {
      name: "Patients",
      href: "/patients",
      icon: Users,
      roles: ["Admin", "Doctor", "Nurse", "Receptionist"],
    },
    {
      name: "Staff",
      href: "/staff",
      icon: UserCheck,
      roles: ["Admin"],
    },
    {
      name: "Appointments",
      href: "/appointments",
      icon: Calendar,
      roles: ["Admin", "Doctor", "Nurse", "Receptionist"],
    },
    {
      name: "Finance",
      href: "/finance",
      icon: DollarSign,
      roles: ["Admin", "Finance"],
    },
    {
      name: "Reports",
      href: "/reports",
      icon: FileText,
      roles: ["Admin", "Finance"],
    },
    {
      name: "Settings",
      href: "/settings",
      icon: Settings,
      roles: ["Admin"],
    },
  ]

  const filteredNavigation = navigation.filter((item) => item.roles.includes(userRole))

  const NavItems = () => (
    <>
      {filteredNavigation.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors nav-link",
            pathname === item.href
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground hover:bg-muted",
          )}
        >
          <item.icon className="h-4 w-4" />
          {item.name}
        </Link>
      ))}
    </>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="header-nav sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="logo-container">
              <div className="logo-icon">
                K
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Kauvery</h1>
                <p className="text-xs text-gray-600">Hospital</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              <Link href="/" className="nav-link">About</Link>
              <Link href="/doctors" className="nav-link">Centers of Excellence</Link>
              <Link href="/appointments" className="nav-link">Specialities</Link>
              <Link href="/patients" className="nav-link">Locations</Link>
              <Link href="/staff" className="nav-link">Health Packages</Link>
              <Link href="/finance" className="nav-link">Patients Portal</Link>
              <Link href="/reports" className="nav-link">Blog & Journal</Link>
              <Link href="/reports" className="nav-link">News & Events</Link>
            </nav>

            {/* Right side actions */}
            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search"
                  className="search-bar pl-10"
                />
              </div>

              {/* Action Buttons */}
              <Button className="btn-outline hidden md:inline-flex">
                Find Doctor
              </Button>
              <Button className="btn-outline hidden md:inline-flex">
                Book Appointment
              </Button>
              
              {/* Emergency Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="emergency-button">
                    <Phone className="h-4 w-4" />
                    Emergency
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64">
                  <DropdownMenuLabel>Emergency Contacts</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <div className="flex flex-col">
                      <span className="font-medium">Chennai Alwarpet</span>
                      <span className="text-sm text-gray-600">044 40006000</span>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <div className="flex flex-col">
                      <span className="font-medium">Chennai Radial Road</span>
                      <span className="text-sm text-gray-600">044 40504050</span>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <div className="flex flex-col">
                      <span className="font-medium">Chennai Vadapalani</span>
                      <span className="text-sm text-gray-600">044 40006000</span>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <div className="flex flex-col">
                      <span className="font-medium">Trichy</span>
                      <span className="text-sm text-gray-600">0431 4077777</span>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button className="btn-primary">
                Contact Us
              </Button>

              {/* Mobile menu */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="flex flex-col">
                  <div className="logo-container mb-6">
                    <div className="logo-icon">
                      K
                    </div>
                    <div>
                      <h1 className="text-lg font-bold">Kauvery</h1>
                      <p className="text-xs text-gray-600">Hospital</p>
                    </div>
                  </div>
                  <nav className="flex flex-col gap-2">
                    <NavItems />
                  </nav>
                </SheetContent>
              </Sheet>

              {/* Notifications */}
              <Button variant="outline" size="icon" className="relative">
                <Bell className="h-4 w-4" />
                {notifications > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500">
                    {notifications}
                  </Badge>
                )}
              </Button>

              {/* User menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar for admin panel */}
      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden md:block w-64 bg-white border-r min-h-screen">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="logo-icon">
                HMS
              </div>
              <div>
                <h2 className="font-bold text-gray-900">Hospital MS</h2>
                <Badge variant="secondary" className="text-xs">
                  {userRole}
                </Badge>
              </div>
            </div>
            <nav className="space-y-2">
              <NavItems />
            </nav>
          </div>
          
          {/* User info at bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-gray-50">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                <User className="h-4 w-4 text-primary-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">Dr. Admin</p>
                <Badge variant="secondary" className="text-xs">
                  {userRole}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}