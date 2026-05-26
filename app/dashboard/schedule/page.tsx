"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  ChevronLeft, ChevronRight, Plus, Clock, Users,
  BookOpen, MapPin, Download, Upload
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { mockClasses, mockTeachers } from "@/lib/mock-data"

export default function SchedulePage() {
  const [currentWeek, setCurrentWeek] = useState(new Date())
  const [selectedClass, setSelectedClass] = useState<string>("")
  const [viewMode, setViewMode] = useState<"class" | "teacher">("class")

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
  const timeSlots = [
    "08:00 - 09:00",
    "09:00 - 10:00",
    "10:15 - 11:15",
    "11:15 - 12:15",
    "15:00 - 16:00",
    "16:00 - 17:00",
  ]

  // Mock schedule data
  const scheduleData: Record<string, Record<string, { subject: string; teacher: string; room: string } | null>> = {
    "08:00 - 09:00": {
      Monday: { subject: "French", teacher: "Mme. Ndiaye", room: "A101" },
      Tuesday: { subject: "Mathematics", teacher: "M. Diallo", room: "B202" },
      Wednesday: { subject: "English", teacher: "M. Sow", room: "A103" },
      Thursday: { subject: "Physics", teacher: "M. Fall", room: "Lab 1" },
      Friday: { subject: "Mathematics", teacher: "M. Diallo", room: "B202" },
    },
    "09:00 - 10:00": {
      Monday: { subject: "French", teacher: "Mme. Ndiaye", room: "A101" },
      Tuesday: { subject: "Mathematics", teacher: "M. Diallo", room: "B202" },
      Wednesday: { subject: "English", teacher: "M. Sow", room: "A103" },
      Thursday: { subject: "Physics", teacher: "M. Fall", room: "Lab 1" },
      Friday: { subject: "Mathematics", teacher: "M. Diallo", room: "B202" },
    },
    "10:15 - 11:15": {
      Monday: { subject: "Mathematics", teacher: "M. Diallo", room: "B202" },
      Tuesday: { subject: "History", teacher: "Mme. Ba", room: "A105" },
      Wednesday: { subject: "French", teacher: "Mme. Ndiaye", room: "A101" },
      Thursday: { subject: "Biology", teacher: "M. Sarr", room: "Lab 2" },
      Friday: { subject: "French", teacher: "Mme. Ndiaye", room: "A101" },
    },
    "11:15 - 12:15": {
      Monday: { subject: "Mathematics", teacher: "M. Diallo", room: "B202" },
      Tuesday: { subject: "History", teacher: "Mme. Ba", room: "A105" },
      Wednesday: { subject: "French", teacher: "Mme. Ndiaye", room: "A101" },
      Thursday: { subject: "Biology", teacher: "M. Sarr", room: "Lab 2" },
      Friday: { subject: "French", teacher: "Mme. Ndiaye", room: "A101" },
    },
    "15:00 - 16:00": {
      Monday: { subject: "Physics", teacher: "M. Fall", room: "Lab 1" },
      Tuesday: { subject: "English", teacher: "M. Sow", room: "A103" },
      Wednesday: null,
      Thursday: { subject: "Mathematics", teacher: "M. Diallo", room: "B202" },
      Friday: { subject: "History", teacher: "Mme. Ba", room: "A105" },
    },
    "16:00 - 17:00": {
      Monday: { subject: "Biology", teacher: "M. Sarr", room: "Lab 2" },
      Tuesday: { subject: "English", teacher: "M. Sow", room: "A103" },
      Wednesday: null,
      Thursday: { subject: "French", teacher: "Mme. Ndiaye", room: "A101" },
      Friday: { subject: "History", teacher: "Mme. Ba", room: "A105" },
    },
  }

  const getSubjectColor = (subject: string) => {
    const colors: Record<string, string> = {
      Mathematics: "bg-blue-500/10 border-blue-500/30 text-blue-500",
      French: "bg-purple-500/10 border-purple-500/30 text-purple-500",
      English: "bg-emerald-500/10 border-emerald-500/30 text-emerald-500",
      Physics: "bg-amber-500/10 border-amber-500/30 text-amber-500",
      History: "bg-rose-500/10 border-rose-500/30 text-rose-500",
      Biology: "bg-teal-500/10 border-teal-500/30 text-teal-500",
    }
    return colors[subject] || "bg-primary/10 border-primary/30 text-primary"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Schedule</h1>
          <p className="text-muted-foreground">View and manage class schedules</p>
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
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="mr-2 h-4 w-4" />
            Add Class
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Select value={viewMode} onValueChange={(v: "class" | "teacher") => setViewMode(v)}>
            <SelectTrigger className="w-40 bg-card">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="class">By Class</SelectItem>
              <SelectItem value="teacher">By Teacher</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedClass} onValueChange={setSelectedClass}>
            <SelectTrigger className="w-48 bg-card">
              <SelectValue placeholder={viewMode === "class" ? "Select class" : "Select teacher"} />
            </SelectTrigger>
            <SelectContent>
              {viewMode === "class" ? (
                mockClasses.map(cls => (
                  <SelectItem key={cls.id} value={cls.id}>{cls.name}</SelectItem>
                ))
              ) : (
                mockTeachers.map(teacher => (
                  <SelectItem key={teacher.id} value={teacher.id}>
                    {teacher.firstName} {teacher.lastName}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => setCurrentWeek(new Date(currentWeek.getTime() - 7 * 24 * 60 * 60 * 1000))}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium px-4">
            Week of {currentWeek.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </span>
          <Button variant="outline" size="icon" onClick={() => setCurrentWeek(new Date(currentWeek.getTime() + 7 * 24 * 60 * 60 * 1000))}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Schedule Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl border border-border/50 bg-card overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground w-32">Time</th>
                {days.map(day => (
                  <th key={day} className="px-4 py-3 text-center text-sm font-medium text-muted-foreground">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {timeSlots.map((time, i) => (
                <tr key={time}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{time}</span>
                    </div>
                  </td>
                  {days.map(day => {
                    const slot = scheduleData[time]?.[day]
                    return (
                      <td key={day} className="px-2 py-2">
                        {slot ? (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05 }}
                            className={`rounded-lg border p-3 ${getSubjectColor(slot.subject)} cursor-pointer hover:shadow-md transition-shadow`}
                          >
                            <p className="font-medium text-sm">{slot.subject}</p>
                            <div className="mt-2 space-y-1 text-xs opacity-80">
                              <div className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                <span>{slot.teacher}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                <span>{slot.room}</span>
                              </div>
                            </div>
                          </motion.div>
                        ) : (
                          <div className="h-full min-h-[80px] rounded-lg border border-dashed border-border/50 flex items-center justify-center">
                            <Button variant="ghost" size="sm" className="text-muted-foreground">
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4">
        <span className="text-sm text-muted-foreground">Subjects:</span>
        {["Mathematics", "French", "English", "Physics", "History", "Biology"].map(subject => (
          <Badge key={subject} variant="outline" className={getSubjectColor(subject)}>
            {subject}
          </Badge>
        ))}
      </div>
    </div>
  )
}
