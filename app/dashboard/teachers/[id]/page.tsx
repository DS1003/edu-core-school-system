"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { 
  ArrowLeft, Mail, Phone, MapPin, Calendar, Edit, 
  BookOpen, Users, Award, Clock, Star, TrendingUp,
  FileText, Download, MessageSquare
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { mockTeachers, mockClasses } from "@/lib/mock-data"

export default function TeacherProfilePage() {
  const params = useParams()
  const router = useRouter()
  const teacher = mockTeachers.find(t => t.id === params.id) || mockTeachers[0]

  const teacherClasses = mockClasses.filter(c => c.teacherId === teacher.id)

  const schedule = [
    { day: "Monday", classes: ["6ème A - Math", "5ème B - Math", "4ème A - Math"] },
    { day: "Tuesday", classes: ["6ème B - Math", "3ème A - Math"] },
    { day: "Wednesday", classes: ["5ème A - Math", "6ème A - Math"] },
    { day: "Thursday", classes: ["4ème B - Math", "3ème B - Math", "5ème B - Math"] },
    { day: "Friday", classes: ["6ème B - Math", "4ème A - Math"] },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-foreground">Teacher Profile</h1>
          <p className="text-muted-foreground">View and manage teacher information</p>
        </div>
        <Button variant="outline">
          <MessageSquare className="mr-2 h-4 w-4" />
          Message
        </Button>
        <Link href={`/dashboard/teachers/${teacher.id}/edit`}>
          <Button className="bg-primary hover:bg-primary/90">
            <Edit className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
        </Link>
      </div>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-border/50 bg-card overflow-hidden"
      >
        <div className="h-32 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent" />
        <div className="px-6 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-12">
            <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-3xl font-bold text-white shadow-lg ring-4 ring-card">
              {teacher.firstName[0]}{teacher.lastName[0]}
            </div>
            <div className="flex-1 pb-2">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold text-foreground">
                  {teacher.firstName} {teacher.lastName}
                </h2>
                <Badge variant={teacher.status === "active" ? "default" : "secondary"}>
                  {teacher.status}
                </Badge>
              </div>
              <p className="text-muted-foreground">{teacher.department} Department</p>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{teacherClasses.length}</p>
                <p className="text-muted-foreground">Classes</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-emerald-500">156</p>
                <p className="text-muted-foreground">Students</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1">
                  <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                  <span className="text-2xl font-bold">{teacher.rating?.toFixed(1) || "4.8"}</span>
                </div>
                <p className="text-muted-foreground">Rating</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Info */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-xl border border-border/50 bg-card p-5"
          >
            <h3 className="font-semibold text-foreground mb-4">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="text-sm font-medium">{teacher.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Phone</p>
                  <p className="text-sm font-medium">{teacher.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Address</p>
                  <p className="text-sm font-medium">{teacher.address || "Dakar, Senegal"}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Joined</p>
                  <p className="text-sm font-medium">{new Date(teacher.hireDate).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-xl border border-border/50 bg-card p-5"
          >
            <h3 className="font-semibold text-foreground mb-4">Subjects</h3>
            <div className="flex flex-wrap gap-2">
              {teacher.subjects.map((subject) => (
                <Badge key={subject} variant="outline" className="bg-primary/5">
                  {subject}
                </Badge>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-xl border border-border/50 bg-card p-5"
          >
            <h3 className="font-semibold text-foreground mb-4">Qualifications</h3>
            <div className="space-y-3">
              {teacher.qualifications?.map((qual, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Award className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">{qual}</p>
                  </div>
                </div>
              )) || (
                <>
                  <div className="flex items-start gap-3">
                    <Award className="h-5 w-5 text-primary mt-0.5" />
                    <p className="text-sm">Master in Education</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Award className="h-5 w-5 text-primary mt-0.5" />
                    <p className="text-sm">Teaching Certification</p>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </div>

        {/* Right Column - Tabs */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="schedule" className="space-y-4">
            <TabsList className="bg-muted/50">
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
              <TabsTrigger value="classes">Classes</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>

            <TabsContent value="schedule" className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl border border-border/50 bg-card p-5"
              >
                <h3 className="font-semibold text-foreground mb-4">Weekly Schedule</h3>
                <div className="space-y-4">
                  {schedule.map((day) => (
                    <div key={day.day} className="flex gap-4">
                      <div className="w-24 shrink-0">
                        <p className="font-medium text-sm">{day.day}</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {day.classes.map((cls, i) => (
                          <Badge key={i} variant="outline" className="bg-primary/5">
                            {cls}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="classes" className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                {(teacherClasses.length > 0 ? teacherClasses : mockClasses.slice(0, 4)).map((cls, index) => (
                  <motion.div
                    key={cls.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="rounded-xl border border-border/50 bg-card p-5"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold">{cls.name}</h4>
                      <Badge>{cls.level}</Badge>
                    </div>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span>{cls.studentCount} students</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{cls.schedule || "Mon, Wed, Fri - 8:00 AM"}</span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{cls.progress || 65}%</span>
                      </div>
                      <Progress value={cls.progress || 65} className="h-2" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="performance" className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  { label: "Attendance Rate", value: "98%", trend: "+2%", icon: Clock },
                  { label: "Student Pass Rate", value: "94%", trend: "+5%", icon: TrendingUp },
                  { label: "Avg Class Rating", value: "4.8", trend: "+0.3", icon: Star },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="rounded-xl border border-border/50 bg-card p-5"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <stat.icon className="h-5 w-5 text-primary" />
                      </div>
                      <span className="text-sm text-muted-foreground">{stat.label}</span>
                    </div>
                    <div className="flex items-end gap-2">
                      <span className="text-3xl font-bold">{stat.value}</span>
                      <span className="text-sm text-emerald-500 mb-1">{stat.trend}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="documents" className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl border border-border/50 bg-card p-5"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Documents</h3>
                  <Button size="sm" variant="outline">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload
                  </Button>
                </div>
                <div className="space-y-3">
                  {[
                    { name: "Employment Contract.pdf", size: "2.4 MB", date: "Jan 15, 2024" },
                    { name: "Teaching Certificate.pdf", size: "1.2 MB", date: "Mar 20, 2023" },
                    { name: "ID Document.pdf", size: "856 KB", date: "Jan 10, 2024" },
                  ].map((doc) => (
                    <div key={doc.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-primary" />
                        <div>
                          <p className="text-sm font-medium">{doc.name}</p>
                          <p className="text-xs text-muted-foreground">{doc.size} • {doc.date}</p>
                        </div>
                      </div>
                      <Button size="icon" variant="ghost">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
