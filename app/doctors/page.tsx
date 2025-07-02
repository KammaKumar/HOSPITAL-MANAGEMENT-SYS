"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
    <div className="max-w-5xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Find a Doctor</h1>
      <div className="mb-6 flex gap-4">
        <Input
          placeholder="Search by name, department, or specialty..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md"
        />
      </div>
      {loading ? (
        <div>Loading doctors...</div>
      ) : filteredDoctors.length === 0 ? (
        <div>No doctors found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doctor) => (
            <Card key={doctor._id} className="flex flex-col justify-between h-full">
              <CardHeader>
                <CardTitle>{doctor.name}</CardTitle>
                <div className="text-sm text-muted-foreground mb-1">
                  {doctor.department || "-"}
                </div>
                <div className="text-xs text-gray-500">
                  {doctor.qualifications || ""}
                </div>
                <div className="text-xs text-gray-500">
                  {doctor.specialty || ""}
                </div>
              </CardHeader>
              <CardContent>
                <Button className="w-full mt-4">Book Appointment</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
} 