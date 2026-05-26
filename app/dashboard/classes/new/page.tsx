"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, Plus, X, Search, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { mockTeachers, mockStudents } from "@/lib/mock-data"

export default function NewClassPage() {
  const router = useRouter()
  const [selectedStudents, setSelectedStudents] = useState<string[]>([])
  const [studentSearch, setStudentSearch] = useState("")
  const [selectedSubjects, setSelectedSubjects] = useState<{ name: string; teacherId: string; hours: number }[]>([])

  const availableSubjects = [
    "Mathematics", "French", "English", "Physics", "Chemistry", 
    "Biology", "History", "Geography", "Philosophy", "Physical Education"
  ]

  const filteredStudents = mockStudents.filter(student =>
    (student.firstName.toLowerCase().includes(studentSearch.toLowerCase()) ||
    student.lastName.toLowerCase().includes(studentSearch.toLowerCase())) &&
    !selectedStudents.includes(student.id)
  )

  const toggleStudent = (studentId: string) => {
    setSelectedStudents(prev =>
      prev.includes(studentId)
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    )
  }

  const addSubject = () => {
    setSelectedSubjects([...selectedSubjects, { name: "", teacherId: "", hours: 3 }])
  }

  const updateSubject = (index: number, field: string, value: string | number) => {
    const updated = [...selectedSubjects]
    updated[index] = { ...updated[index], [field]: value }
    setSelectedSubjects(updated)
  }

  const removeSubject = (index: number) => {
    setSelectedSubjects(selectedSubjects.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Create New Class</h1>
          <p className="text-muted-foreground">Set up a new class for the academic year</p>
        </div>
      </div>

      <form className="space-y-6">
        {/* Basic Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-border/50 bg-card p-6"
        >
          <h3 className="font-semibold text-foreground mb-4">Basic Information</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Class Name *</Label>
              <Input id="name" placeholder="e.g., 6ème A" className="bg-background" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="level">Level *</Label>
              <Select>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="6eme">6ème</SelectItem>
                  <SelectItem value="5eme">5ème</SelectItem>
                  <SelectItem value="4eme">4ème</SelectItem>
                  <SelectItem value="3eme">3ème</SelectItem>
                  <SelectItem value="2nde">2nde</SelectItem>
                  <SelectItem value="1ere">1ère</SelectItem>
                  <SelectItem value="tle">Terminale</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="academicYear">Academic Year *</Label>
              <Select>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024-2025">2024-2025</SelectItem>
                  <SelectItem value="2025-2026">2025-2026</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="campus">Campus</Label>
              <Select>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Select campus" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="main">Main Campus - Dakar</SelectItem>
                  <SelectItem value="secondary">Secondary Campus - Thies</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="mainTeacher">Main Teacher</Label>
              <Select>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Select main teacher" />
                </SelectTrigger>
                <SelectContent>
                  {mockTeachers.map(teacher => (
                    <SelectItem key={teacher.id} value={teacher.id}>
                      {teacher.firstName} {teacher.lastName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="room">Classroom</Label>
              <Input id="room" placeholder="e.g., Room 101" className="bg-background" />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Optional class description" className="bg-background" rows={3} />
            </div>
          </div>
        </motion.div>

        {/* Subjects & Teachers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-xl border border-border/50 bg-card p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Subjects & Teachers</h3>
            <Button type="button" variant="outline" size="sm" onClick={addSubject}>
              <Plus className="mr-2 h-4 w-4" />
              Add Subject
            </Button>
          </div>
          
          {selectedSubjects.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>No subjects added yet. Click &quot;Add Subject&quot; to get started.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {selectedSubjects.map((subject, index) => (
                <div key={index} className="flex items-end gap-4 p-4 rounded-lg bg-muted/30">
                  <div className="flex-1 space-y-2">
                    <Label>Subject</Label>
                    <Select value={subject.name} onValueChange={(v) => updateSubject(index, "name", v)}>
                      <SelectTrigger className="bg-background">
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableSubjects.map(s => (
                          <SelectItem key={s} value={s}>{s}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex-1 space-y-2">
                    <Label>Teacher</Label>
                    <Select value={subject.teacherId} onValueChange={(v) => updateSubject(index, "teacherId", v)}>
                      <SelectTrigger className="bg-background">
                        <SelectValue placeholder="Select teacher" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockTeachers.map(teacher => (
                          <SelectItem key={teacher.id} value={teacher.id}>
                            {teacher.firstName} {teacher.lastName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="w-24 space-y-2">
                    <Label>Hours/Week</Label>
                    <Input
                      type="number"
                      value={subject.hours}
                      onChange={(e) => updateSubject(index, "hours", parseInt(e.target.value) || 0)}
                      className="bg-background"
                      min={1}
                      max={10}
                    />
                  </div>
                  <Button type="button" variant="ghost" size="icon" onClick={() => removeSubject(index)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Students */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-xl border border-border/50 bg-card p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-foreground">Students</h3>
              <p className="text-sm text-muted-foreground">{selectedStudents.length} students selected</p>
            </div>
          </div>

          {selectedStudents.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedStudents.map(id => {
                const student = mockStudents.find(s => s.id === id)
                return student ? (
                  <Badge key={id} variant="secondary" className="gap-1">
                    {student.firstName} {student.lastName}
                    <button type="button" onClick={() => toggleStudent(id)} className="hover:text-destructive">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ) : null
              })}
            </div>
          )}

          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search students to add..."
              value={studentSearch}
              onChange={(e) => setStudentSearch(e.target.value)}
              className="pl-10 bg-background"
            />
          </div>

          <div className="max-h-64 overflow-y-auto space-y-2 rounded-lg border border-border/50 p-2">
            {filteredStudents.slice(0, 20).map(student => (
              <div
                key={student.id}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                onClick={() => toggleStudent(student.id)}
              >
                <Checkbox checked={selectedStudents.includes(student.id)} />
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary">
                  {student.firstName[0]}{student.lastName[0]}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{student.firstName} {student.lastName}</p>
                  <p className="text-xs text-muted-foreground">{student.matricule}</p>
                </div>
                <Badge variant="outline" className="text-xs">{student.currentClass || "Unassigned"}</Badge>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" className="bg-primary hover:bg-primary/90">
            Create Class
          </Button>
        </div>
      </form>
    </div>
  )
}
