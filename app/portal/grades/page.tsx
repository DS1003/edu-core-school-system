"use client"

import { motion } from "framer-motion"
import { 
  ArrowLeft, TrendingUp, BookOpen, Award, Calendar,
  ChevronDown, Download
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Link from "next/link"

export default function PortalGradesPage() {
  const subjects = [
    { name: "Mathematics", average: 16.5, grades: [17, 16, 15, 18, 16], teacher: "M. Diallo", coefficient: 4 },
    { name: "French", average: 14.2, grades: [15, 13, 14, 15, 14], teacher: "Mme. Ndiaye", coefficient: 4 },
    { name: "English", average: 17.0, grades: [18, 17, 16, 17, 17], teacher: "M. Sow", coefficient: 3 },
    { name: "Physics", average: 15.5, grades: [16, 15, 15, 16, 15], teacher: "M. Fall", coefficient: 3 },
    { name: "History-Geography", average: 13.8, grades: [14, 13, 14, 14, 14], teacher: "Mme. Ba", coefficient: 3 },
    { name: "Biology", average: 15.0, grades: [15, 16, 14, 15, 15], teacher: "M. Sarr", coefficient: 2 },
  ]

  const overallAverage = (subjects.reduce((acc, s) => acc + s.average * s.coefficient, 0) / 
    subjects.reduce((acc, s) => acc + s.coefficient, 0)).toFixed(2)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-card/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/portal">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="font-bold text-lg">Grades & Progress</h1>
            <p className="text-sm text-muted-foreground">Amadou Diallo - 6ème A</p>
          </div>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Term Selector */}
        <div className="flex items-center gap-3">
          <Select defaultValue="term2">
            <SelectTrigger className="w-48 bg-card">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="term1">1st Trimester</SelectItem>
              <SelectItem value="term2">2nd Trimester</SelectItem>
              <SelectItem value="term3">3rd Trimester</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: "Overall Average", value: `${overallAverage}/20`, icon: TrendingUp, color: "text-emerald-500" },
            { label: "Class Rank", value: "#3", icon: Award, color: "text-amber-500" },
            { label: "Subjects", value: subjects.length.toString(), icon: BookOpen, color: "text-primary" },
            { label: "Exams Taken", value: "28", icon: Calendar, color: "text-blue-500" },
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

        {/* Subjects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <h3 className="font-semibold text-lg">Subject Grades</h3>
          <div className="space-y-3">
            {subjects.map((subject, index) => (
              <motion.div
                key={subject.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                className="rounded-xl border border-border/50 bg-card p-4"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">{subject.name}</h4>
                      <p className="text-sm text-muted-foreground">{subject.teacher} • Coef. {subject.coefficient}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-2xl font-bold ${
                      subject.average >= 16 ? "text-emerald-500" :
                      subject.average >= 12 ? "text-primary" :
                      subject.average >= 10 ? "text-amber-500" : "text-red-500"
                    }`}>
                      {subject.average}/20
                    </p>
                    <Badge variant={subject.average >= 14 ? "default" : "secondary"}>
                      {subject.average >= 16 ? "Excellent" :
                       subject.average >= 14 ? "Good" :
                       subject.average >= 10 ? "Average" : "Needs Work"}
                    </Badge>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Recent grades</span>
                  </div>
                  <div className="flex gap-2">
                    {subject.grades.map((grade, i) => (
                      <div key={i} className={`flex-1 text-center py-2 rounded-lg ${
                        grade >= 16 ? "bg-emerald-500/10 text-emerald-500" :
                        grade >= 12 ? "bg-primary/10 text-primary" :
                        grade >= 10 ? "bg-amber-500/10 text-amber-500" : "bg-red-500/10 text-red-500"
                      }`}>
                        <span className="font-medium">{grade}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Grade Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-xl border border-border/50 bg-card p-5"
        >
          <h3 className="font-semibold mb-4">Grade Distribution</h3>
          <div className="space-y-4">
            {[
              { range: "16-20 (Excellent)", percentage: 35, color: "bg-emerald-500" },
              { range: "14-16 (Good)", percentage: 40, color: "bg-primary" },
              { range: "10-14 (Average)", percentage: 20, color: "bg-amber-500" },
              { range: "< 10 (Below)", percentage: 5, color: "bg-red-500" },
            ].map((grade) => (
              <div key={grade.range}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-muted-foreground">{grade.range}</span>
                  <span className="font-medium">{grade.percentage}%</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div className={`h-full ${grade.color}`} style={{ width: `${grade.percentage}%` }} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  )
}
