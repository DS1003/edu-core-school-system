"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Search, Plus, Filter, MoreVertical, Mail, Phone, 
  GraduationCap, BookOpen, Calendar, Star, Edit, Trash2, Eye,
  ChevronDown, Download, Upload
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { mockTeachers } from "@/lib/mock-data"

export default function TeachersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const departments = ["All", "Sciences", "Mathematics", "Languages", "Arts", "Physical Education"]

  const filteredTeachers = mockTeachers.filter(teacher => {
    const matchesSearch = teacher.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDepartment = !selectedDepartment || selectedDepartment === "All" || 
      teacher.specialization.includes(selectedDepartment)
    return matchesSearch && matchesDepartment
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Teachers</h1>
          <p className="text-muted-foreground">Manage your teaching staff</p>
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
          <Link href="/dashboard/teachers/new">
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              Add Teacher
            </Button>
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search teachers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-card border-border/50"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
          {departments.map((dept) => (
            <Button
              key={dept}
              variant={selectedDepartment === dept || (!selectedDepartment && dept === "All") ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedDepartment(dept === "All" ? null : dept)}
              className="whitespace-nowrap"
            >
              {dept}
            </Button>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: "Total Teachers", value: mockTeachers.length, color: "text-primary" },
          { label: "Active", value: mockTeachers.filter(t => t.status === "active").length, color: "text-emerald-500" },
          { label: "Inactive", value: mockTeachers.filter(t => t.status === "inactive").length, color: "text-amber-500" },
          { label: "On Leave", value: mockTeachers.filter(t => t.status === "on_leave").length, color: "text-red-500" },
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

      {/* Teachers Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filteredTeachers.map((teacher, index) => (
            <motion.div
              key={teacher.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.05 }}
              className="group relative overflow-hidden rounded-xl border border-border/50 bg-card p-5 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="absolute right-3 top-3">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" /> View Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" /> Edit
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="flex items-start gap-4">
                <div className="relative">
                  <div className="h-14 w-14 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-lg font-semibold text-primary">
                    {teacher.firstName[0]}{teacher.lastName[0]}
                  </div>
                  <div className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-card ${
                    teacher.status === "active" ? "bg-emerald-500" : 
                    teacher.status === "on_leave" ? "bg-amber-500" : "bg-zinc-400"
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <Link href={`/dashboard/teachers/${teacher.id}`} className="hover:underline">
                    <h3 className="font-semibold text-foreground truncate">
                      {teacher.firstName} {teacher.lastName}
                    </h3>
                  </Link>
                  <p className="text-sm text-muted-foreground">{teacher.specialization}</p>
                  <Badge variant="outline" className="mt-1 text-xs">
                    Temps plein
                  </Badge>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span className="truncate">{teacher.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>{teacher.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <BookOpen className="h-4 w-4" />
                  <span>{teacher.specialization}</span>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-border/50 pt-4">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <span className="text-sm font-medium">4.5</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {teacher.classIds?.length || 0} classes assigned
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredTeachers.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <GraduationCap className="h-12 w-12 text-muted-foreground/50" />
          <h3 className="mt-4 text-lg font-medium">No teachers found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  )
}
