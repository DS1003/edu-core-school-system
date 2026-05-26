"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  User, School, Bell, Shield, Palette, Globe, 
  CreditCard, Database, Mail, Key, Save, Upload,
  Building2, Users, Calendar, FileText
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(true)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">Manage your school and account settings</p>
      </div>

      <Tabs defaultValue="school" className="space-y-6">
        <TabsList className="bg-muted/50 flex-wrap h-auto gap-1">
          <TabsTrigger value="school" className="gap-2">
            <School className="h-4 w-4" /> School
          </TabsTrigger>
          <TabsTrigger value="academic" className="gap-2">
            <Calendar className="h-4 w-4" /> Academic
          </TabsTrigger>
          <TabsTrigger value="users" className="gap-2">
            <Users className="h-4 w-4" /> Users
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="h-4 w-4" /> Notifications
          </TabsTrigger>
          <TabsTrigger value="billing" className="gap-2">
            <CreditCard className="h-4 w-4" /> Billing
          </TabsTrigger>
          <TabsTrigger value="appearance" className="gap-2">
            <Palette className="h-4 w-4" /> Appearance
          </TabsTrigger>
        </TabsList>

        {/* School Settings */}
        <TabsContent value="school" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border border-border/50 bg-card p-6"
          >
            <h3 className="font-semibold text-foreground mb-4">School Information</h3>
            <div className="flex items-start gap-6 mb-6">
              <div className="h-24 w-24 rounded-xl bg-muted flex items-center justify-center">
                <School className="h-10 w-10 text-muted-foreground" />
              </div>
              <div>
                <Button variant="outline" size="sm">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Logo
                </Button>
                <p className="text-sm text-muted-foreground mt-2">PNG, JPG up to 2MB</p>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="schoolName">School Name</Label>
                <Input id="schoolName" defaultValue="Ecole Excellence Dakar" className="bg-background" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="schoolCode">School Code</Label>
                <Input id="schoolCode" defaultValue="EED-2024" className="bg-background" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" defaultValue="contact@ecole-excellence.sn" className="bg-background" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" defaultValue="+221 33 123 4567" className="bg-background" />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="address">Address</Label>
                <Textarea id="address" defaultValue="123 Avenue Cheikh Anta Diop, Dakar, Senegal" className="bg-background" rows={2} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Select defaultValue="senegal">
                  <SelectTrigger className="bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="senegal">Senegal</SelectItem>
                    <SelectItem value="guinea-bissau">Guinea-Bissau</SelectItem>
                    <SelectItem value="mali">Mali</SelectItem>
                    <SelectItem value="gambia">Gambia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select defaultValue="gmt">
                  <SelectTrigger className="bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gmt">GMT (UTC+0)</SelectItem>
                    <SelectItem value="wat">WAT (UTC+1)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-xl border border-border/50 bg-card p-6"
          >
            <h3 className="font-semibold text-foreground mb-4">Campus Management</h3>
            <div className="space-y-4">
              {[
                { name: "Main Campus - Dakar", address: "123 Avenue Cheikh Anta Diop", students: 850 },
                { name: "Secondary Campus - Thies", address: "45 Rue de la Liberté", students: 320 },
              ].map((campus, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Building2 className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{campus.name}</p>
                      <p className="text-sm text-muted-foreground">{campus.address}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline">{campus.students} students</Badge>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                <Building2 className="mr-2 h-4 w-4" />
                Add Campus
              </Button>
            </div>
          </motion.div>
        </TabsContent>

        {/* Academic Settings */}
        <TabsContent value="academic" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border border-border/50 bg-card p-6"
          >
            <h3 className="font-semibold text-foreground mb-4">Academic Year</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Current Academic Year</Label>
                <Select defaultValue="2024-2025">
                  <SelectTrigger className="bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024-2025">2024-2025</SelectItem>
                    <SelectItem value="2025-2026">2025-2026</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Grading System</Label>
                <Select defaultValue="french">
                  <SelectTrigger className="bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="french">French System (0-20)</SelectItem>
                    <SelectItem value="portuguese">Portuguese System (0-20)</SelectItem>
                    <SelectItem value="percentage">Percentage (0-100)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Input type="date" defaultValue="2024-10-01" className="bg-background" />
              </div>
              <div className="space-y-2">
                <Label>End Date</Label>
                <Input type="date" defaultValue="2025-06-30" className="bg-background" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-xl border border-border/50 bg-card p-6"
          >
            <h3 className="font-semibold text-foreground mb-4">Terms / Trimesters</h3>
            <div className="space-y-3">
              {[
                { name: "1st Trimester", start: "Oct 1", end: "Dec 20", status: "completed" },
                { name: "2nd Trimester", start: "Jan 6", end: "Mar 28", status: "active" },
                { name: "3rd Trimester", start: "Apr 14", end: "Jun 30", status: "upcoming" },
              ].map((term, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                  <div>
                    <p className="font-medium">{term.name}</p>
                    <p className="text-sm text-muted-foreground">{term.start} - {term.end}</p>
                  </div>
                  <Badge variant={
                    term.status === "active" ? "default" :
                    term.status === "completed" ? "secondary" : "outline"
                  }>
                    {term.status}
                  </Badge>
                </div>
              ))}
            </div>
          </motion.div>
        </TabsContent>

        {/* Users Settings */}
        <TabsContent value="users" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border border-border/50 bg-card p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">User Roles & Permissions</h3>
              <Button size="sm">Add Role</Button>
            </div>
            <div className="space-y-3">
              {[
                { role: "Super Admin", users: 2, permissions: "Full access" },
                { role: "Admin", users: 5, permissions: "Manage school data" },
                { role: "Teacher", users: 45, permissions: "Manage classes, grades" },
                { role: "Accountant", users: 3, permissions: "Financial management" },
                { role: "Parent", users: 820, permissions: "View student data" },
              ].map((role, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Shield className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{role.role}</p>
                      <p className="text-sm text-muted-foreground">{role.permissions}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline">{role.users} users</Badge>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </TabsContent>

        {/* Notifications Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border border-border/50 bg-card p-6"
          >
            <h3 className="font-semibold text-foreground mb-4">Email Notifications</h3>
            <div className="space-y-4">
              {[
                { label: "Payment reminders", description: "Send automatic payment reminders to parents" },
                { label: "Grade updates", description: "Notify parents when grades are published" },
                { label: "Attendance alerts", description: "Alert parents of student absences" },
                { label: "School announcements", description: "Send general school announcements" },
                { label: "Report cards", description: "Notify when report cards are ready" },
              ].map((setting, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{setting.label}</p>
                    <p className="text-sm text-muted-foreground">{setting.description}</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-xl border border-border/50 bg-card p-6"
          >
            <h3 className="font-semibold text-foreground mb-4">SMS Notifications</h3>
            <div className="space-y-4">
              {[
                { label: "Urgent alerts", description: "Critical messages requiring immediate attention" },
                { label: "Attendance SMS", description: "Daily attendance notifications" },
              ].map((setting, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{setting.label}</p>
                    <p className="text-sm text-muted-foreground">{setting.description}</p>
                  </div>
                  <Switch defaultChecked={i === 0} />
                </div>
              ))}
            </div>
          </motion.div>
        </TabsContent>

        {/* Billing Settings */}
        <TabsContent value="billing" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border border-border/50 bg-card p-6"
          >
            <h3 className="font-semibold text-foreground mb-4">Current Plan</h3>
            <div className="flex items-center justify-between p-4 rounded-lg bg-primary/5 border border-primary/20">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-lg font-semibold">Professional Plan</h4>
                  <Badge>Active</Badge>
                </div>
                <p className="text-sm text-muted-foreground">Up to 1,500 students • Unlimited teachers</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">$99/mo</p>
                <p className="text-sm text-muted-foreground">Next billing: Apr 1, 2024</p>
              </div>
            </div>
            <div className="mt-4 flex gap-3">
              <Button variant="outline">View Plans</Button>
              <Button variant="outline">Billing History</Button>
            </div>
          </motion.div>
        </TabsContent>

        {/* Appearance Settings */}
        <TabsContent value="appearance" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border border-border/50 bg-card p-6"
          >
            <h3 className="font-semibold text-foreground mb-4">Theme</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Dark Mode</p>
                <p className="text-sm text-muted-foreground">Use dark theme across the application</p>
              </div>
              <Switch checked={darkMode} onCheckedChange={setDarkMode} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-xl border border-border/50 bg-card p-6"
          >
            <h3 className="font-semibold text-foreground mb-4">Language</h3>
            <Select defaultValue="fr">
              <SelectTrigger className="w-48 bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="pt">Português</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>
        </TabsContent>
      </Tabs>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button className="bg-primary hover:bg-primary/90">
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>
    </div>
  )
}
