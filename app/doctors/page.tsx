"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Stethoscope, GraduationCap } from "lucide-react";

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDoctors() {
      setLoading(true);
      const res = await fetch("/api/doctors");
      const data = await res.json();
      setDoctors(data);
      setLoading(false);
    }
    fetchDoctors();
  }, []);

  const filteredDoctors = doctors.filter((doctor) => {
    const term = searchTerm.toLowerCase();
    return (
      doctor.name?.toLowerCase().includes(term) ||
      doctor.department?.toLowerCase().includes(term) ||
      doctor.specialty?.toLowerCase().includes(term)
    );
  });

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
              <a href="#" className="nav-link">About</a>
              <a href="#" className="nav-link">Centers of Excellence</a>
              <a href="#" className="nav-link">Specialities</a>
              <a href="#" className="nav-link">Locations</a>
              <a href="#" className="nav-link">Health Packages</a>
              <a href="#" className="nav-link">Patients Portal</a>
              <a href="#" className="nav-link">Blog & Journal</a>
              <a href="#" className="nav-link">News & Events</a>
            </nav>

            {/* Right side actions */}
            <div className="flex items-center gap-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search"
                  className="search-bar pl-10"
                />
              </div>
              <Button className="btn-outline hidden md:inline-flex">
                Find Doctor
              </Button>
              <Button className="btn-outline hidden md:inline-flex">
                Book Appointment
              </Button>
              <Button className="emergency-button">
                Emergency
              </Button>
              <Button className="btn-primary">
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="kauvery-gradient py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Find a Doctor</h1>
          <p className="text-xl opacity-90 mb-8">Detecting your nearest hospital...</p>
          
          {/* Search Filters */}
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <select className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-pink-500 focus:border-transparent">
                  <option>Search by Location</option>
                  <option>Chennai - Alwarpet</option>
                  <option>Chennai - Radial Road</option>
                  <option>Chennai - Vadapalani</option>
                  <option>Trichy</option>
                </select>
              </div>
              <div className="relative">
                <Stethoscope className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <select className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-pink-500 focus:border-transparent">
                  <option>Search by Specialty</option>
                  <option>Cardiology</option>
                  <option>Orthopedics</option>
                  <option>Neurology</option>
                  <option>Radiology</option>
                </select>
              </div>
            </div>
            
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search by name, department, or specialty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 py-3 text-lg bg-white text-gray-900 border-0 focus:ring-2 focus:ring-white"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Doctors Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600"></div>
              <p className="mt-4 text-gray-600">Loading doctors...</p>
            </div>
          ) : filteredDoctors.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No doctors found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredDoctors.map((doctor) => (
                <Card key={doctor._id} className="doctor-card bg-white">
                  <div className="relative">
                    <div className="doctor-image bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center">
                        <Stethoscope className="w-12 h-12 text-gray-500" />
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="text-center mb-4">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{doctor.name}</h3>
                      <Badge className="kauvery-pink text-white mb-2">
                        {doctor.department || "General Medicine"}
                      </Badge>
                      
                      <div className="space-y-2 text-sm text-gray-600">
                        {doctor.qualifications && (
                          <div className="flex items-center justify-center gap-2">
                            <GraduationCap className="w-4 h-4" />
                            <span>{doctor.qualifications}</span>
                          </div>
                        )}
                        {doctor.specialty && (
                          <div className="flex items-center justify-center gap-2">
                            <Stethoscope className="w-4 h-4" />
                            <span>{doctor.specialty}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <Button className="btn-primary w-full kauvery-hover">
                      Book Appointment
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* WhatsApp Float Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative">
          <Button className="w-16 h-16 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
            </svg>
          </Button>
          <div className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs px-2 py-1 rounded-full transform rotate-12">
            FOR APPOINTMENT
          </div>
          <div className="absolute -bottom-8 right-0 bg-pink-600 text-white text-xs px-2 py-1 rounded">
            CLICK HERE
          </div>
        </div>
      </div>
    </div>
  );
}