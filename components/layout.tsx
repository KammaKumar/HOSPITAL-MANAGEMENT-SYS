"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
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
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      {/* Desktop Sidebar */}
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold">HMS</span>
              </div>
              <span>Hospital MS</span>
            </Link>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4 space-y-1">
              <NavItems />
            </nav>
          </div>
          <div className="p-4 border-t">
            <div className="flex items-center gap-3 p-2 rounded-lg bg-muted">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                <User className="h-4 w-4 text-primary-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">Dr. Admin</p>
                <Badge variant="secondary" className="text-xs">
                  {userRole}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        {/* Header */}
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0 md:hidden bg-transparent">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link href="/" className="flex items-center gap-2 text-lg font-semibold mb-4">
                  <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                    <span className="text-primary-foreground font-bold">HMS</span>
                  </div>
                  <span>Hospital MS</span>
                </Link>
                <NavItems />
              </nav>
            </SheetContent>
          </Sheet>

          <div className="w-full flex-1">
            <h2 className="text-lg font-semibold">
              {pathname === "/" ? "Dashboard" : pathname.slice(1).charAt(0).toUpperCase() + pathname.slice(2)}
            </h2>
          </div>

          <Button variant="outline" size="icon" className="relative bg-transparent">
            <Bell className="h-4 w-4" />
            {notifications > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                {notifications}
              </Badge>
            )}
            <span className="sr-only">Toggle notifications</span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
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
        </header>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-6">{children}</main>
      </div>
    </div>
  )
}
