"use client"

import { motion } from "framer-motion"
import { 
  GraduationCap, BookOpen, Calendar, CreditCard,
  FileText, Bell, Clock, TrendingUp, Award,
  ChevronRight, CheckCircle, AlertCircle
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"

export default function ParentPortalPage() {
  // Mock child data
  const children = [
    {
      id: "1",
      name: "Amadou Diallo",
      class: "6ème A",
      photo: null,
      average: 15.5,
      rank: 3,
      attendance: 98,
      tuitionPaid: 75,
      nextPayment: "Mar 15, 2024",
      recentGrades: [
        { subject: "Mathematics", grade: 16, date: "Mar 10" },
        { subject: "French", grade: 14, date: "Mar 8" },
        { subject: "English", grade: 17, date: "Mar 5" },
      ],
    },
  ]

  const announcements = [
    { id: 1, title: "School Holiday - Easter Break", date: "Mar 25-Apr 8", type: "holiday" },
    { id: 2, title: "Parent-Teacher Meeting", date: "Mar 20, 2024", type: "event" },
    { id: 3, title: "End of Term Exams Schedule", date: "Mar 18-22", type: "exam" },
  ]

  const child = children[0]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-card/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg">EduCore</h1>
              <p className="text-xs text-muted-foreground">Parent Portal</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary">
              MD
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-border/50 p-6"
        >
          <h2 className="text-xl font-bold text-foreground">Welcome back, M. Diallo</h2>
          <p className="text-muted-foreground">Here is an overview of your child&apos;s progress</p>
        </motion.div>

        {/* Child Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-xl border border-border/50 bg-card p-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-2xl font-bold text-white">
              {child.name.split(" ").map(n => n[0]).join("")}
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold">{child.name}</h3>
              <p className="text-muted-foreground">{child.class}</p>
              <div className="flex flex-wrap gap-3 mt-3">
                <Badge variant="outline" className="gap-1">
                  <Award className="h-3 w-3" />
                  Rank: {child.rank}
                </Badge>
                <Badge variant="outline" className="gap-1 text-emerald-500 border-emerald-500/30">
                  <TrendingUp className="h-3 w-3" />
                  Avg: {child.average}/20
                </Badge>
                <Badge variant="outline" className="gap-1">
                  <CheckCircle className="h-3 w-3" />
                  Attendance: {child.attendance}%
                </Badge>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: "Average", value: `${child.average}/20`, icon: TrendingUp, color: "text-emerald-500", link: "/portal/grades" },
            { label: "Rank", value: `#${child.rank}`, icon: Award, color: "text-amber-500", link: "/portal/grades" },
            { label: "Attendance", value: `${child.attendance}%`, icon: Clock, color: "text-blue-500", link: "/portal/attendance" },
            { label: "Tuition Paid", value: `${child.tuitionPaid}%`, icon: CreditCard, color: "text-primary", link: "/portal/payments" },
          ].map((stat, i) => (
            <Link key={stat.label} href={stat.link}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
                className="rounded-xl border border-border/50 bg-card p-4 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all cursor-pointer"
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
            </Link>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Recent Grades */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-xl border border-border/50 bg-card p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Recent Grades</h3>
              <Link href="/portal/grades">
                <Button variant="ghost" size="sm">
                  View All <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="space-y-3">
              {child.recentGrades.map((grade, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{grade.subject}</p>
                      <p className="text-xs text-muted-foreground">{grade.date}</p>
                    </div>
                  </div>
                  <span className={`text-lg font-bold ${
                    grade.grade >= 16 ? "text-emerald-500" :
                    grade.grade >= 12 ? "text-primary" :
                    grade.grade >= 10 ? "text-amber-500" : "text-red-500"
                  }`}>
                    {grade.grade}/20
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Tuition Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="rounded-xl border border-border/50 bg-card p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Tuition Status</h3>
              <Link href="/portal/payments">
                <Button variant="ghost" size="sm">
                  Details <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Annual Tuition</span>
                  <span className="font-medium">637,500 / 850,000 XOF</span>
                </div>
                <Progress value={child.tuitionPaid} className="h-3" />
              </div>
              <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-amber-500">Next Payment Due</p>
                    <p className="text-sm text-muted-foreground">{child.nextPayment} - 212,500 XOF</p>
                  </div>
                </div>
              </div>
              <Button className="w-full bg-primary hover:bg-primary/90">
                <CreditCard className="mr-2 h-4 w-4" />
                Make Payment
              </Button>
            </div>
          </motion.div>

          {/* Announcements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-xl border border-border/50 bg-card p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Announcements</h3>
              <Badge variant="outline">{announcements.length} new</Badge>
            </div>
            <div className="space-y-3">
              {announcements.map((announcement) => (
                <div key={announcement.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 cursor-pointer hover:bg-muted/50 transition-colors">
                  <div className={`h-9 w-9 rounded-lg flex items-center justify-center ${
                    announcement.type === "holiday" ? "bg-emerald-500/10" :
                    announcement.type === "event" ? "bg-blue-500/10" : "bg-amber-500/10"
                  }`}>
                    {announcement.type === "holiday" ? <Calendar className="h-5 w-5 text-emerald-500" /> :
                     announcement.type === "event" ? <Bell className="h-5 w-5 text-blue-500" /> :
                     <FileText className="h-5 w-5 text-amber-500" />}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{announcement.title}</p>
                    <p className="text-sm text-muted-foreground">{announcement.date}</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="rounded-xl border border-border/50 bg-card p-5"
          >
            <h3 className="font-semibold mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "View Grades", icon: TrendingUp, href: "/portal/grades" },
                { label: "Attendance", icon: Clock, href: "/portal/attendance" },
                { label: "Schedule", icon: Calendar, href: "/portal/schedule" },
                { label: "Report Cards", icon: FileText, href: "/portal/reports" },
                { label: "Payments", icon: CreditCard, href: "/portal/payments" },
                { label: "Contact School", icon: Bell, href: "/portal/contact" },
              ].map((action) => (
                <Link key={action.label} href={action.href}>
                  <div className="flex items-center gap-3 p-3 rounded-lg border border-border/50 hover:border-primary/30 hover:bg-primary/5 transition-all cursor-pointer">
                    <action.icon className="h-5 w-5 text-primary" />
                    <span className="font-medium text-sm">{action.label}</span>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
