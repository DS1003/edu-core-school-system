"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, Save, Plus, Trash2, Calculator } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { mockClasses, mockStudents } from "@/lib/mock-data"

export default function GradeEntryPage() {
  const router = useRouter()
  const [selectedClass, setSelectedClass] = useState<string>("")
  const [selectedSubject, setSelectedSubject] = useState<string>("")
  const [selectedExamType, setSelectedExamType] = useState<string>("")
  const [grades, setGrades] = useState<Record<string, number | null>>({})

  const subjects = ["Mathematics", "French", "English", "Physics", "Chemistry", "History", "Biology"]
  const examTypes = [
    { value: "homework", label: "Homework", coefficient: 1 },
    { value: "quiz", label: "Quiz", coefficient: 1 },
    { value: "midterm", label: "Midterm Exam", coefficient: 2 },
    { value: "final", label: "Final Exam", coefficient: 3 },
  ]

  const classStudents = mockStudents.slice(0, 15)

  const updateGrade = (studentId: string, value: string) => {
    const numValue = value === "" ? null : Math.min(20, Math.max(0, parseFloat(value)))
    setGrades(prev => ({ ...prev, [studentId]: numValue }))
  }

  const calculateStats = () => {
    const values = Object.values(grades).filter((v): v is number => v !== null)
    if (values.length === 0) return { avg: 0, min: 0, max: 0, count: 0 }
    return {
      avg: (values.reduce((a, b) => a + b, 0) / values.length).toFixed(2),
      min: Math.min(...values),
      max: Math.max(...values),
      count: values.length,
    }
  }

  const stats = calculateStats()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-foreground">Grade Entry</h1>
          <p className="text-muted-foreground">Enter grades for students</p>
        </div>
        <Button variant="outline">
          <Calculator className="mr-2 h-4 w-4" />
          Auto Calculate
        </Button>
        <Button className="bg-primary hover:bg-primary/90">
          <Save className="mr-2 h-4 w-4" />
          Save Grades
        </Button>
      </div>

      {/* Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl border border-border/50 bg-card p-6"
      >
        <h3 className="font-semibold text-foreground mb-4">Select Class & Subject</h3>
        <div className="grid gap-4 sm:grid-cols-4">
          <div className="space-y-2">
            <Label>Class *</Label>
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Select class" />
              </SelectTrigger>
              <SelectContent>
                {mockClasses.map(cls => (
                  <SelectItem key={cls.id} value={cls.id}>{cls.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Subject *</Label>
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Select subject" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map(subject => (
                  <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Exam Type *</Label>
            <Select value={selectedExamType} onValueChange={setSelectedExamType}>
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {examTypes.map(type => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label} (×{type.coefficient})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Date</Label>
            <Input type="date" className="bg-background" defaultValue={new Date().toISOString().split("T")[0]} />
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      {Object.keys(grades).length > 0 && (
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: "Students Graded", value: `${stats.count}/${classStudents.length}`, color: "text-primary" },
            { label: "Class Average", value: stats.avg, color: "text-emerald-500" },
            { label: "Highest Grade", value: stats.max, color: "text-blue-500" },
            { label: "Lowest Grade", value: stats.min, color: "text-amber-500" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-xl border border-border/50 bg-card p-4"
            >
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
            </motion.div>
          ))}
        </div>
      )}

      {/* Grade Entry Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-xl border border-border/50 bg-card overflow-hidden"
      >
        <div className="p-4 border-b border-border/50 flex items-center justify-between">
          <h3 className="font-semibold">Student Grades</h3>
          <div className="flex items-center gap-2">
            <Badge variant="outline">Max: 20</Badge>
            <Badge variant="outline">Pass: 10</Badge>
          </div>
        </div>
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground w-12">#</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Student</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Matricule</th>
              <th className="px-4 py-3 text-center text-sm font-medium text-muted-foreground w-32">Grade /20</th>
              <th className="px-4 py-3 text-center text-sm font-medium text-muted-foreground w-24">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {classStudents.map((student, index) => {
              const grade = grades[student.id]
              return (
                <tr key={student.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 text-muted-foreground">{index + 1}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary">
                        {student.firstName[0]}{student.lastName[0]}
                      </div>
                      <span className="font-medium">{student.firstName} {student.lastName}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{student.matricule}</td>
                  <td className="px-4 py-3">
                    <Input
                      type="number"
                      min="0"
                      max="20"
                      step="0.5"
                      placeholder="--"
                      value={grade ?? ""}
                      onChange={(e) => updateGrade(student.id, e.target.value)}
                      className="w-20 mx-auto text-center bg-background"
                    />
                  </td>
                  <td className="px-4 py-3 text-center">
                    {grade !== null && grade !== undefined ? (
                      <Badge variant={grade >= 10 ? "default" : "destructive"}>
                        {grade >= 10 ? "Pass" : "Fail"}
                      </Badge>
                    ) : (
                      <Badge variant="outline">Pending</Badge>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </motion.div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {stats.count} of {classStudents.length} students graded
        </p>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button className="bg-primary hover:bg-primary/90">
            <Save className="mr-2 h-4 w-4" />
            Save All Grades
          </Button>
        </div>
      </div>
    </div>
  )
}
