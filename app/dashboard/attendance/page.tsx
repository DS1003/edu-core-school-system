"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  Search, Filter, Download, Calendar, Clock,
  CheckCircle, XCircle, AlertCircle, Users, ChevronDown
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { mockClasses, mockStudents } from "@/lib/mock-data"

export default function AttendancePage() {
  const [selectedClass, setSelectedClass] = useState<string>("")
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])
  const [searchQuery, setSearchQuery] = useState("")

  const students = mockStudents.slice(0, 30).map(student => ({
    ...student,
    status: Math.random() > 0.85 ? "absent" : Math.random() > 0.95 ? "late" : "present",
  }))

  const filteredStudents = students.filter(student =>
    student.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.lastName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const stats = {
    present: students.filter(s => s.status === "present").length,
    absent: students.filter(s => s.status === "absent").length,
    late: students.filter(s => s.status === "late").length,
    total: students.length,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Attendance</h1>
          <p className="text-muted-foreground">Track and manage student attendance</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button className="bg-primary hover:bg-primary/90">
            Save Attendance
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <Select value={selectedClass} onValueChange={setSelectedClass}>
          <SelectTrigger className="w-48 bg-card">
            <SelectValue placeholder="Select class" />
          </SelectTrigger>
          <SelectContent>
            {mockClasses.map(cls => (
              <SelectItem key={cls.id} value={cls.id}>{cls.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="w-48 bg-card"
        />
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search students..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-card border-border/50"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: "Present", value: stats.present, icon: CheckCircle, color: "text-emerald-500", bgColor: "bg-emerald-500/10" },
          { label: "Absent", value: stats.absent, icon: XCircle, color: "text-red-500", bgColor: "bg-red-500/10" },
          { label: "Late", value: stats.late, icon: Clock, color: "text-amber-500", bgColor: "bg-amber-500/10" },
          { label: "Total", value: stats.total, icon: Users, color: "text-primary", bgColor: "bg-primary/10" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-xl border border-border/50 bg-card p-4"
          >
            <div className="flex items-center gap-3">
              <div className={`h-10 w-10 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Attendance Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl border border-border/50 bg-card overflow-hidden"
      >
        <div className="p-4 border-b border-border/50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <span className="font-medium">{new Date(selectedDate).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">Mark All Present</Button>
          </div>
        </div>
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground w-12">#</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Student</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Matricule</th>
              <th className="px-4 py-3 text-center text-sm font-medium text-muted-foreground">Status</th>
              <th className="px-4 py-3 text-center text-sm font-medium text-muted-foreground">Time</th>
              <th className="px-4 py-3 text-center text-sm font-medium text-muted-foreground">Notes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {filteredStudents.map((student, index) => (
              <tr key={student.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-4 py-3 text-muted-foreground">{index + 1}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary">
                      {student.firstName[0]}{student.lastName[0]}
                    </div>
                    <div>
                      <p className="font-medium">{student.firstName} {student.lastName}</p>
                      <p className="text-xs text-muted-foreground">{student.currentClass || "6ème A"}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{student.matricule}</td>
                <td className="px-4 py-3 text-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className={`gap-2 ${
                        student.status === "present" ? "text-emerald-500" :
                        student.status === "absent" ? "text-red-500" : "text-amber-500"
                      }`}>
                        {student.status === "present" ? <CheckCircle className="h-4 w-4" /> :
                         student.status === "absent" ? <XCircle className="h-4 w-4" /> :
                         <Clock className="h-4 w-4" />}
                        {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                        <ChevronDown className="h-3 w-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem className="text-emerald-500">
                        <CheckCircle className="mr-2 h-4 w-4" /> Present
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-500">
                        <XCircle className="mr-2 h-4 w-4" /> Absent
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-amber-500">
                        <Clock className="mr-2 h-4 w-4" /> Late
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <AlertCircle className="mr-2 h-4 w-4" /> Excused
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
                <td className="px-4 py-3 text-center text-sm text-muted-foreground">
                  {student.status === "late" ? "08:15" : student.status === "present" ? "08:00" : "-"}
                </td>
                <td className="px-4 py-3 text-center">
                  <Input placeholder="Add note..." className="h-8 text-sm bg-background max-w-[150px] mx-auto" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  )
}
