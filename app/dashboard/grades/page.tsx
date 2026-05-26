"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  Search, Filter, Download, Upload, Plus, 
  BookOpen, Users, Award, TrendingUp, Calendar,
  ChevronDown, FileText, Printer
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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

export default function GradesPage() {
  const [selectedClass, setSelectedClass] = useState<string | null>(null)
  const [selectedTerm, setSelectedTerm] = useState("term1")
  const [searchQuery, setSearchQuery] = useState("")

  const terms = [
    { value: "term1", label: "1st Trimester" },
    { value: "term2", label: "2nd Trimester" },
    { value: "term3", label: "3rd Trimester" },
  ]

  const subjects = ["Mathematics", "French", "English", "Physics", "History", "Biology"]

  // Mock grade data
  const gradeData = mockStudents.slice(0, 15).map(student => ({
    ...student,
    grades: subjects.reduce((acc, subject) => {
      acc[subject] = {
        coefficient: Math.floor(Math.random() * 3) + 2,
        score: Math.floor(Math.random() * 8) + 12,
      }
      return acc
    }, {} as Record<string, { coefficient: number; score: number }>),
    average: (Math.random() * 6 + 12).toFixed(2),
    rank: 0,
  })).sort((a, b) => parseFloat(b.average) - parseFloat(a.average))
    .map((s, i) => ({ ...s, rank: i + 1 }))

  const filteredGrades = gradeData.filter(student =>
    student.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.lastName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const classStats = {
    classAverage: "14.32",
    passRate: "93%",
    highestAvg: "18.45",
    lowestAvg: "9.87",
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Grades Management</h1>
          <p className="text-muted-foreground">Manage and track student grades across all classes</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Upload className="mr-2 h-4 w-4" />
            Import
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Link href="/dashboard/grades/entry">
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              Enter Grades
            </Button>
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <Select value={selectedClass || ""} onValueChange={setSelectedClass}>
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
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: "Class Average", value: classStats.classAverage, icon: TrendingUp, color: "text-primary" },
          { label: "Pass Rate", value: classStats.passRate, icon: Award, color: "text-emerald-500" },
          { label: "Highest Average", value: classStats.highestAvg, icon: TrendingUp, color: "text-blue-500" },
          { label: "Lowest Average", value: classStats.lowestAvg, icon: TrendingUp, color: "text-amber-500" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-xl border border-border/50 bg-card p-4"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Grades Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl border border-border/50 bg-card overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground sticky left-0 bg-muted/50">Rank</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground sticky left-12 bg-muted/50">Student</th>
                {subjects.map(subject => (
                  <th key={subject} className="px-4 py-3 text-center text-sm font-medium text-muted-foreground min-w-[100px]">
                    {subject}
                  </th>
                ))}
                <th className="px-4 py-3 text-center text-sm font-medium text-muted-foreground">Average</th>
                <th className="px-4 py-3 text-center text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {filteredGrades.map((student) => (
                <tr key={student.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 sticky left-0 bg-card">
                    <Badge variant={student.rank <= 3 ? "default" : "outline"} className={
                      student.rank === 1 ? "bg-amber-500" :
                      student.rank === 2 ? "bg-zinc-400" :
                      student.rank === 3 ? "bg-orange-400" : ""
                    }>
                      {student.rank}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 sticky left-12 bg-card">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary">
                        {student.firstName[0]}{student.lastName[0]}
                      </div>
                      <div>
                        <Link href={`/dashboard/students/${student.id}`} className="font-medium hover:text-primary">
                          {student.firstName} {student.lastName}
                        </Link>
                        <p className="text-xs text-muted-foreground">{student.matricule}</p>
                      </div>
                    </div>
                  </td>
                  {subjects.map(subject => (
                    <td key={subject} className="px-4 py-3 text-center">
                      <span className={`font-medium ${
                        student.grades[subject].score >= 16 ? "text-emerald-500" :
                        student.grades[subject].score >= 12 ? "text-primary" :
                        student.grades[subject].score >= 10 ? "text-amber-500" : "text-red-500"
                      }`}>
                        {student.grades[subject].score}
                      </span>
                      <span className="text-xs text-muted-foreground ml-1">
                        (×{student.grades[subject].coefficient})
                      </span>
                    </td>
                  ))}
                  <td className="px-4 py-3 text-center">
                    <span className={`text-lg font-bold ${
                      parseFloat(student.average) >= 16 ? "text-emerald-500" :
                      parseFloat(student.average) >= 12 ? "text-primary" :
                      parseFloat(student.average) >= 10 ? "text-amber-500" : "text-red-500"
                    }`}>
                      {student.average}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          Actions <ChevronDown className="ml-1 h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <FileText className="mr-2 h-4 w-4" />
                          View Report Card
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Printer className="mr-2 h-4 w-4" />
                          Print Report Card
                        </DropdownMenuItem>
                        <DropdownMenuItem>Edit Grades</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Link href="/dashboard/grades/entry">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border border-border/50 bg-card p-5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all cursor-pointer"
          >
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
              <Plus className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-semibold">Enter Grades</h3>
            <p className="text-sm text-muted-foreground">Add new grades for a class or student</p>
          </motion.div>
        </Link>
        <Link href="/dashboard/grades/reports">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-xl border border-border/50 bg-card p-5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all cursor-pointer"
          >
            <div className="h-10 w-10 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-3">
              <FileText className="h-5 w-5 text-emerald-500" />
            </div>
            <h3 className="font-semibold">Report Cards</h3>
            <p className="text-sm text-muted-foreground">Generate and print report cards</p>
          </motion.div>
        </Link>
        <Link href="/dashboard/grades/analytics">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-xl border border-border/50 bg-card p-5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all cursor-pointer"
          >
            <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center mb-3">
              <TrendingUp className="h-5 w-5 text-blue-500" />
            </div>
            <h3 className="font-semibold">Analytics</h3>
            <p className="text-sm text-muted-foreground">View grade trends and insights</p>
          </motion.div>
        </Link>
      </div>
    </div>
  )
}
