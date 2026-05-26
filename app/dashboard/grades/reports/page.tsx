"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  Search, Download, Printer, FileText, Eye,
  Calendar, Filter, ChevronDown, Mail
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
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
import Link from "next/link"
import { mockClasses, mockStudents } from "@/lib/mock-data"

export default function ReportCardsPage() {
  const [selectedClass, setSelectedClass] = useState<string>("")
  const [selectedTerm, setSelectedTerm] = useState("term1")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStudents, setSelectedStudents] = useState<string[]>([])

  const terms = [
    { value: "term1", label: "1st Trimester" },
    { value: "term2", label: "2nd Trimester" },
    { value: "term3", label: "3rd Trimester" },
    { value: "annual", label: "Annual Report" },
  ]

  const students = mockStudents.slice(0, 20).map((student, i) => ({
    ...student,
    average: (Math.random() * 6 + 12).toFixed(2),
    rank: i + 1,
    status: Math.random() > 0.1 ? "generated" : "pending",
    generatedAt: "2024-03-15",
  }))

  const filteredStudents = students.filter(student =>
    student.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.lastName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const toggleStudent = (id: string) => {
    setSelectedStudents(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    )
  }

  const selectAll = () => {
    if (selectedStudents.length === filteredStudents.length) {
      setSelectedStudents([])
    } else {
      setSelectedStudents(filteredStudents.map(s => s.id))
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Report Cards</h1>
          <p className="text-muted-foreground">Generate and manage student report cards</p>
        </div>
        <div className="flex items-center gap-3">
          {selectedStudents.length > 0 && (
            <>
              <Button variant="outline" size="sm">
                <Mail className="mr-2 h-4 w-4" />
                Email ({selectedStudents.length})
              </Button>
              <Button variant="outline" size="sm">
                <Printer className="mr-2 h-4 w-4" />
                Print ({selectedStudents.length})
              </Button>
              <Button className="bg-primary hover:bg-primary/90" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Download ({selectedStudents.length})
              </Button>
            </>
          )}
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
        <Select value={selectedTerm} onValueChange={setSelectedTerm}>
          <SelectTrigger className="w-40 bg-card">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {terms.map(term => (
              <SelectItem key={term.value} value={term.value}>{term.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search students..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-card border-border/50"
          />
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: "Total Students", value: students.length, color: "text-primary" },
          { label: "Generated", value: students.filter(s => s.status === "generated").length, color: "text-emerald-500" },
          { label: "Pending", value: students.filter(s => s.status === "pending").length, color: "text-amber-500" },
          { label: "Selected", value: selectedStudents.length, color: "text-blue-500" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-xl border border-border/50 bg-card p-4"
          >
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Report Cards Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl border border-border/50 bg-card overflow-hidden"
      >
        <div className="p-4 border-b border-border/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Checkbox
              checked={selectedStudents.length === filteredStudents.length && filteredStudents.length > 0}
              onCheckedChange={selectAll}
            />
            <span className="text-sm text-muted-foreground">
              {selectedStudents.length > 0 ? `${selectedStudents.length} selected` : "Select all"}
            </span>
          </div>
          <Button variant="outline" size="sm">
            Generate All Report Cards
          </Button>
        </div>
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground w-12"></th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Student</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Matricule</th>
              <th className="px-4 py-3 text-center text-sm font-medium text-muted-foreground">Average</th>
              <th className="px-4 py-3 text-center text-sm font-medium text-muted-foreground">Rank</th>
              <th className="px-4 py-3 text-center text-sm font-medium text-muted-foreground">Status</th>
              <th className="px-4 py-3 text-center text-sm font-medium text-muted-foreground">Generated</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {filteredStudents.map((student) => (
              <tr key={student.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-4 py-3">
                  <Checkbox
                    checked={selectedStudents.includes(student.id)}
                    onCheckedChange={() => toggleStudent(student.id)}
                  />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary">
                      {student.firstName[0]}{student.lastName[0]}
                    </div>
                    <div>
                      <Link href={`/dashboard/students/${student.id}`} className="font-medium hover:text-primary">
                        {student.firstName} {student.lastName}
                      </Link>
                      <p className="text-xs text-muted-foreground">{student.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{student.matricule}</td>
                <td className="px-4 py-3 text-center">
                  <span className={`font-bold ${
                    parseFloat(student.average) >= 14 ? "text-emerald-500" :
                    parseFloat(student.average) >= 10 ? "text-primary" : "text-red-500"
                  }`}>
                    {student.average}/20
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <Badge variant="outline">{student.rank}</Badge>
                </td>
                <td className="px-4 py-3 text-center">
                  <Badge variant={student.status === "generated" ? "default" : "secondary"}>
                    {student.status === "generated" ? "Ready" : "Pending"}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-center text-sm text-muted-foreground">
                  {student.status === "generated" ? student.generatedAt : "-"}
                </td>
                <td className="px-4 py-3 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        Actions <ChevronDown className="ml-1 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        Preview
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="mr-2 h-4 w-4" />
                        Download PDF
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Printer className="mr-2 h-4 w-4" />
                        Print
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Mail className="mr-2 h-4 w-4" />
                        Email to Parent
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  )
}
