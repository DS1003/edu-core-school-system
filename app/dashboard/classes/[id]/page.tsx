"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { 
  ArrowLeft, Edit, Users, Clock, BookOpen, Calendar,
  MoreVertical, Search, UserPlus, Download, Mail,
  TrendingUp, Award, Target, ChevronRight
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { mockClasses, mockStudents } from "@/lib/mock-data"

export default function ClassDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  
  const classData = mockClasses.find(c => c.id === params.id) || mockClasses[0]
  const classStudents = mockStudents.slice(0, classData.studentCount || 30)

  const filteredStudents = classStudents.filter(student =>
    student.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.lastName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const subjects = [
    { name: "Mathematics", teacher: "M. Diallo", hours: 6, progress: 72 },
    { name: "French", teacher: "Mme. Ndiaye", hours: 5, progress: 68 },
    { name: "English", teacher: "M. Sow", hours: 4, progress: 75 },
    { name: "Physics", teacher: "M. Fall", hours: 4, progress: 60 },
    { name: "History-Geography", teacher: "Mme. Ba", hours: 3, progress: 80 },
    { name: "SVT", teacher: "M. Sarr", hours: 3, progress: 65 },
  ]

  const schedule = [
    { time: "08:00 - 09:00", mon: "French", tue: "Math", wed: "English", thu: "Physics", fri: "Math" },
    { time: "09:00 - 10:00", mon: "French", tue: "Math", wed: "English", thu: "Physics", fri: "Math" },
    { time: "10:15 - 11:15", mon: "Math", tue: "History", wed: "French", thu: "SVT", fri: "French" },
    { time: "11:15 - 12:15", mon: "Math", tue: "History", wed: "French", thu: "SVT", fri: "French" },
    { time: "15:00 - 16:00", mon: "Physics", tue: "English", wed: "-", thu: "Math", fri: "History" },
    { time: "16:00 - 17:00", mon: "SVT", tue: "English", wed: "-", thu: "French", fri: "History" },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-foreground">{classData.name}</h1>
          <p className="text-muted-foreground">{classData.level} - {classData.academicYear || "2024-2025"}</p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
        <Link href={`/dashboard/classes/${classData.id}/edit`}>
          <Button className="bg-primary hover:bg-primary/90">
            <Edit className="mr-2 h-4 w-4" />
            Edit Class
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: "Students", value: classData.studentCount, icon: Users, color: "text-primary" },
          { label: "Subjects", value: subjects.length, icon: BookOpen, color: "text-emerald-500" },
          { label: "Weekly Hours", value: "32h", icon: Clock, color: "text-amber-500" },
          { label: "Avg. Grade", value: "14.5/20", icon: Award, color: "text-blue-500" },
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

      {/* Tabs */}
      <Tabs defaultValue="students" className="space-y-4">
        <TabsList className="bg-muted/50">
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="subjects">Subjects</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        {/* Students Tab */}
        <TabsContent value="students" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search students..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-card border-border/50"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Mail className="mr-2 h-4 w-4" />
                Email All
              </Button>
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                <UserPlus className="mr-2 h-4 w-4" />
                Add Student
              </Button>
            </div>
          </div>

          <div className="rounded-xl border border-border/50 bg-card overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Student</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Matricule</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Average</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Rank</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {filteredStudents.slice(0, 10).map((student, index) => (
                  <tr key={student.id} className="hover:bg-muted/30 transition-colors">
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
                    <td className="px-4 py-3">
                      <span className="font-medium">{(14 + Math.random() * 4).toFixed(2)}/20</span>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="outline">{index + 1}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={student.status === "active" ? "default" : "secondary"}>
                        {student.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Profile</DropdownMenuItem>
                          <DropdownMenuItem>View Grades</DropdownMenuItem>
                          <DropdownMenuItem>Contact Parent</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">Remove from Class</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        {/* Subjects Tab */}
        <TabsContent value="subjects" className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {subjects.map((subject, index) => (
              <motion.div
                key={subject.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="rounded-xl border border-border/50 bg-card p-5"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                  <Badge variant="outline">{subject.hours}h/week</Badge>
                </div>
                <h3 className="font-semibold text-foreground">{subject.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{subject.teacher}</p>
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{subject.progress}%</span>
                  </div>
                  <Progress value={subject.progress} className="h-2" />
                </div>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* Schedule Tab */}
        <TabsContent value="schedule">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border border-border/50 bg-card overflow-hidden"
          >
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Time</th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-muted-foreground">Monday</th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-muted-foreground">Tuesday</th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-muted-foreground">Wednesday</th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-muted-foreground">Thursday</th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-muted-foreground">Friday</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {schedule.map((row) => (
                  <tr key={row.time}>
                    <td className="px-4 py-3 text-sm font-medium">{row.time}</td>
                    <td className="px-4 py-3 text-center">
                      <Badge variant="outline" className={row.mon !== "-" ? "bg-primary/5" : ""}>{row.mon}</Badge>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Badge variant="outline" className={row.tue !== "-" ? "bg-primary/5" : ""}>{row.tue}</Badge>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Badge variant="outline" className={row.wed !== "-" ? "bg-primary/5" : ""}>{row.wed}</Badge>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Badge variant="outline" className={row.thu !== "-" ? "bg-primary/5" : ""}>{row.thu}</Badge>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Badge variant="outline" className={row.fri !== "-" ? "bg-primary/5" : ""}>{row.fri}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border border-border/50 bg-card p-5"
            >
              <h3 className="font-semibold text-foreground mb-4">Grade Distribution</h3>
              <div className="space-y-4">
                {[
                  { range: "16-20 (Excellent)", count: 8, percentage: 27, color: "bg-emerald-500" },
                  { range: "14-16 (Good)", count: 12, percentage: 40, color: "bg-primary" },
                  { range: "10-14 (Average)", count: 7, percentage: 23, color: "bg-amber-500" },
                  { range: "< 10 (Below)", count: 3, percentage: 10, color: "bg-red-500" },
                ].map((grade) => (
                  <div key={grade.range}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-muted-foreground">{grade.range}</span>
                      <span className="font-medium">{grade.count} ({grade.percentage}%)</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div className={`h-full ${grade.color}`} style={{ width: `${grade.percentage}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-xl border border-border/50 bg-card p-5"
            >
              <h3 className="font-semibold text-foreground mb-4">Top Performers</h3>
              <div className="space-y-3">
                {classStudents.slice(0, 5).map((student, i) => (
                  <div key={student.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/30 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        i === 0 ? "bg-amber-100 text-amber-700" :
                        i === 1 ? "bg-zinc-200 text-zinc-700" :
                        i === 2 ? "bg-orange-100 text-orange-700" :
                        "bg-muted text-muted-foreground"
                      }`}>
                        {i + 1}
                      </div>
                      <span className="font-medium">{student.firstName} {student.lastName}</span>
                    </div>
                    <span className="font-semibold text-primary">{(18 - i * 0.5).toFixed(2)}/20</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
