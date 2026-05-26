"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Search, Plus, Filter, MoreVertical, Users, Clock, 
  BookOpen, Calendar, ChevronRight, GraduationCap,
  Download, Upload, LayoutGrid, List
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { mockClasses } from "@/lib/mock-data"

export default function ClassesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const levels = ["All", "6ème", "5ème", "4ème", "3ème", "2nde", "1ère", "Terminale"]

  const filteredClasses = mockClasses.filter(cls => {
    const matchesSearch = cls.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesLevel = !selectedLevel || selectedLevel === "All" || cls.level === selectedLevel
    return matchesSearch && matchesLevel
  })

  const classStats = {
    total: mockClasses.length,
    totalStudents: mockClasses.reduce((acc, cls) => acc + cls.studentCount, 0),
    avgClassSize: Math.round(mockClasses.reduce((acc, cls) => acc + cls.studentCount, 0) / mockClasses.length),
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Classes</h1>
          <p className="text-muted-foreground">Manage your school classes and sections</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Link href="/dashboard/classes/new">
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              Create Class
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Classes", value: classStats.total, icon: BookOpen, color: "text-primary" },
          { label: "Total Students", value: classStats.totalStudents, icon: Users, color: "text-emerald-500" },
          { label: "Avg. Class Size", value: classStats.avgClassSize, icon: GraduationCap, color: "text-amber-500" },
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
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search classes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-card border-border/50"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
            {levels.map((level) => (
              <Button
                key={level}
                variant={selectedLevel === level || (!selectedLevel && level === "All") ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedLevel(level === "All" ? null : level)}
                className="whitespace-nowrap"
              >
                {level}
              </Button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("grid")}
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("list")}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Classes Grid */}
      {viewMode === "grid" ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredClasses.map((cls, index) => (
              <motion.div
                key={cls.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link href={`/dashboard/classes/${cls.id}`}>
                  <div className="group relative overflow-hidden rounded-xl border border-border/50 bg-card p-5 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
                    <div className="absolute right-3 top-3">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => e.preventDefault()}>
                          <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit Class</DropdownMenuItem>
                          <DropdownMenuItem>Manage Students</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                        <BookOpen className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground truncate">{cls.name}</h3>
                        <p className="text-sm text-muted-foreground">{cls.level}</p>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>{cls.studentCount} students</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <GraduationCap className="h-4 w-4" />
                        <span>{cls.teacherName || "Unassigned"}</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-border/50">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Curriculum Progress</span>
                        <span className="font-medium">{cls.progress || 65}%</span>
                      </div>
                      <Progress value={cls.progress || 65} className="h-2" />
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        {cls.academicYear || "2024-2025"}
                      </Badge>
                      <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="rounded-xl border border-border/50 bg-card overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Class Name</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Level</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Students</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Teacher</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Progress</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {filteredClasses.map((cls) => (
                <tr key={cls.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3">
                    <Link href={`/dashboard/classes/${cls.id}`} className="font-medium hover:text-primary">
                      {cls.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{cls.level}</td>
                  <td className="px-4 py-3 text-muted-foreground">{cls.studentCount}</td>
                  <td className="px-4 py-3 text-muted-foreground">{cls.teacherName || "Unassigned"}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Progress value={cls.progress || 65} className="h-2 w-20" />
                      <span className="text-sm">{cls.progress || 65}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit Class</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {filteredClasses.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <BookOpen className="h-12 w-12 text-muted-foreground/50" />
          <h3 className="mt-4 text-lg font-medium">No classes found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  )
}
