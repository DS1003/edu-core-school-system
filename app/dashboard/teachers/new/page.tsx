"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, Upload, X, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function NewTeacherPage() {
  const router = useRouter()
  const [subjects, setSubjects] = useState<string[]>([])
  const [newSubject, setNewSubject] = useState("")
  const [qualifications, setQualifications] = useState<string[]>([])
  const [newQualification, setNewQualification] = useState("")

  const addSubject = () => {
    if (newSubject && !subjects.includes(newSubject)) {
      setSubjects([...subjects, newSubject])
      setNewSubject("")
    }
  }

  const removeSubject = (subject: string) => {
    setSubjects(subjects.filter(s => s !== subject))
  }

  const addQualification = () => {
    if (newQualification && !qualifications.includes(newQualification)) {
      setQualifications([...qualifications, newQualification])
      setNewQualification("")
    }
  }

  const removeQualification = (qual: string) => {
    setQualifications(qualifications.filter(q => q !== qual))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Add New Teacher</h1>
          <p className="text-muted-foreground">Enter teacher information to create a new profile</p>
        </div>
      </div>

      <form className="space-y-6">
        {/* Photo Upload */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-border/50 bg-card p-6"
        >
          <h3 className="font-semibold text-foreground mb-4">Profile Photo</h3>
          <div className="flex items-center gap-6">
            <div className="h-24 w-24 rounded-2xl bg-muted flex items-center justify-center">
              <Upload className="h-8 w-8 text-muted-foreground" />
            </div>
            <div>
              <Button type="button" variant="outline">
                <Upload className="mr-2 h-4 w-4" />
                Upload Photo
              </Button>
              <p className="text-sm text-muted-foreground mt-2">JPG, PNG or GIF. Max 2MB.</p>
            </div>
          </div>
        </motion.div>

        {/* Personal Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-xl border border-border/50 bg-card p-6"
        >
          <h3 className="font-semibold text-foreground mb-4">Personal Information</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name *</Label>
              <Input id="firstName" placeholder="Enter first name" className="bg-background" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name *</Label>
              <Input id="lastName" placeholder="Enter last name" className="bg-background" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input id="email" type="email" placeholder="teacher@school.edu" className="bg-background" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input id="phone" placeholder="+221 77 123 4567" className="bg-background" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dob">Date of Birth</Label>
              <Input id="dob" type="date" className="bg-background" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="address">Address</Label>
              <Textarea id="address" placeholder="Enter full address" className="bg-background" rows={3} />
            </div>
          </div>
        </motion.div>

        {/* Employment Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-xl border border-border/50 bg-card p-6"
        >
          <h3 className="font-semibold text-foreground mb-4">Employment Details</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="employeeId">Employee ID</Label>
              <Input id="employeeId" placeholder="TCH-2024-001" className="bg-background" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hireDate">Hire Date *</Label>
              <Input id="hireDate" type="date" className="bg-background" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="department">Department *</Label>
              <Select>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sciences">Sciences</SelectItem>
                  <SelectItem value="mathematics">Mathematics</SelectItem>
                  <SelectItem value="languages">Languages</SelectItem>
                  <SelectItem value="arts">Arts</SelectItem>
                  <SelectItem value="physical-education">Physical Education</SelectItem>
                  <SelectItem value="social-sciences">Social Sciences</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="contractType">Contract Type *</Label>
              <Select>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Select contract type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full-time">Full-time</SelectItem>
                  <SelectItem value="part-time">Part-time</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="salary">Monthly Salary (XOF)</Label>
              <Input id="salary" type="number" placeholder="500000" className="bg-background" />
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
          </div>
        </motion.div>

        {/* Subjects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-xl border border-border/50 bg-card p-6"
        >
          <h3 className="font-semibold text-foreground mb-4">Subjects</h3>
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value)}
                placeholder="Add a subject"
                className="bg-background"
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSubject())}
              />
              <Button type="button" onClick={addSubject}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {subjects.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {subjects.map((subject) => (
                  <Badge key={subject} variant="secondary" className="gap-1">
                    {subject}
                    <button type="button" onClick={() => removeSubject(subject)} className="hover:text-destructive">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* Qualifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-xl border border-border/50 bg-card p-6"
        >
          <h3 className="font-semibold text-foreground mb-4">Qualifications</h3>
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={newQualification}
                onChange={(e) => setNewQualification(e.target.value)}
                placeholder="Add a qualification"
                className="bg-background"
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addQualification())}
              />
              <Button type="button" onClick={addQualification}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {qualifications.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {qualifications.map((qual) => (
                  <Badge key={qual} variant="secondary" className="gap-1">
                    {qual}
                    <button type="button" onClick={() => removeQualification(qual)} className="hover:text-destructive">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* Emergency Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="rounded-xl border border-border/50 bg-card p-6"
        >
          <h3 className="font-semibold text-foreground mb-4">Emergency Contact</h3>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="emergencyName">Contact Name</Label>
              <Input id="emergencyName" placeholder="Full name" className="bg-background" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="emergencyRelation">Relationship</Label>
              <Input id="emergencyRelation" placeholder="e.g., Spouse, Parent" className="bg-background" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="emergencyPhone">Phone Number</Label>
              <Input id="emergencyPhone" placeholder="+221 77 123 4567" className="bg-background" />
            </div>
          </div>
        </motion.div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" className="bg-primary hover:bg-primary/90">
            Create Teacher Profile
          </Button>
        </div>
      </form>
    </div>
  )
}
