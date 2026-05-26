"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  Search, Download, Upload, Plus, Filter, 
  DollarSign, TrendingUp, TrendingDown, CreditCard,
  Users, Calendar, ChevronDown, MoreVertical,
  AlertCircle, CheckCircle, Clock, FileText
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { mockStudents } from "@/lib/mock-data"

export default function FinancePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Mock financial data
  const financialStats = {
    totalRevenue: 125000000,
    collected: 98500000,
    pending: 18750000,
    overdue: 7750000,
    thisMonth: 15600000,
  }

  const students = mockStudents.slice(0, 20).map(student => ({
    ...student,
    tuitionFee: 850000,
    paid: Math.floor(Math.random() * 850000),
    paymentStatus: Math.random() > 0.7 ? "paid" : Math.random() > 0.3 ? "partial" : "overdue",
    lastPayment: "2024-02-15",
    dueDate: "2024-03-01",
  })).map(s => ({
    ...s,
    remaining: s.tuitionFee - s.paid,
    percentage: Math.round((s.paid / s.tuitionFee) * 100),
  }))

  const filteredStudents = students.filter(student => {
    const matchesSearch = 
      student.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || student.paymentStatus === statusFilter
    return matchesSearch && matchesStatus
  })

  const recentTransactions = [
    { id: 1, student: "Amadou Diallo", amount: 425000, type: "tuition", date: "2024-03-14", status: "completed" },
    { id: 2, student: "Fatou Ndiaye", amount: 850000, type: "tuition", date: "2024-03-13", status: "completed" },
    { id: 3, student: "Moussa Sow", amount: 200000, type: "partial", date: "2024-03-12", status: "completed" },
    { id: 4, student: "Aissatou Ba", amount: 50000, type: "registration", date: "2024-03-11", status: "completed" },
    { id: 5, student: "Ibrahima Fall", amount: 425000, type: "tuition", date: "2024-03-10", status: "completed" },
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fr-SN", { style: "currency", currency: "XOF", maximumFractionDigits: 0 }).format(amount)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Financial Management</h1>
          <p className="text-muted-foreground">Track payments, fees, and financial reports</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Link href="/dashboard/finance/payments/new">
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              Record Payment
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {[
          { label: "Total Revenue", value: financialStats.totalRevenue, icon: DollarSign, color: "text-primary", bgColor: "bg-primary/10" },
          { label: "Collected", value: financialStats.collected, icon: CheckCircle, color: "text-emerald-500", bgColor: "bg-emerald-500/10" },
          { label: "Pending", value: financialStats.pending, icon: Clock, color: "text-amber-500", bgColor: "bg-amber-500/10" },
          { label: "Overdue", value: financialStats.overdue, icon: AlertCircle, color: "text-red-500", bgColor: "bg-red-500/10" },
          { label: "This Month", value: financialStats.thisMonth, icon: TrendingUp, color: "text-blue-500", bgColor: "bg-blue-500/10" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-xl border border-border/50 bg-card p-4"
          >
            <div className="flex items-center gap-3">
              <div className={`h-10 w-10 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className={`text-lg font-bold ${stat.color}`}>{formatCurrency(stat.value)}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Collection Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl border border-border/50 bg-card p-5"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-foreground">Collection Progress</h3>
            <p className="text-sm text-muted-foreground">Academic Year 2024-2025</p>
          </div>
          <Badge variant="outline" className="text-emerald-500">
            {Math.round((financialStats.collected / financialStats.totalRevenue) * 100)}% collected
          </Badge>
        </div>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-muted-foreground">Overall Collection</span>
              <span className="font-medium">{formatCurrency(financialStats.collected)} / {formatCurrency(financialStats.totalRevenue)}</span>
            </div>
            <Progress value={(financialStats.collected / financialStats.totalRevenue) * 100} className="h-3" />
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <Tabs defaultValue="students" className="space-y-4">
        <TabsList className="bg-muted/50">
          <TabsTrigger value="students">Student Payments</TabsTrigger>
          <TabsTrigger value="transactions">Recent Transactions</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
        </TabsList>

        {/* Student Payments Tab */}
        <TabsContent value="students" className="space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search students..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-card border-border/50"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40 bg-card">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="partial">Partial</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-xl border border-border/50 bg-card overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Student</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Tuition Fee</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Paid</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Remaining</th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-muted-foreground">Progress</th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-muted-foreground">Status</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {filteredStudents.slice(0, 10).map((student) => (
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
                          <p className="text-xs text-muted-foreground">{student.matricule}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-medium">{formatCurrency(student.tuitionFee)}</td>
                    <td className="px-4 py-3 text-emerald-500 font-medium">{formatCurrency(student.paid)}</td>
                    <td className="px-4 py-3 text-muted-foreground">{formatCurrency(student.remaining)}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Progress value={student.percentage} className="h-2 w-20" />
                        <span className="text-sm">{student.percentage}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Badge variant={
                        student.paymentStatus === "paid" ? "default" :
                        student.paymentStatus === "partial" ? "secondary" : "destructive"
                      }>
                        {student.paymentStatus === "paid" ? "Paid" :
                         student.paymentStatus === "partial" ? "Partial" : "Overdue"}
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
                          <DropdownMenuItem>Record Payment</DropdownMenuItem>
                          <DropdownMenuItem>View History</DropdownMenuItem>
                          <DropdownMenuItem>Send Reminder</DropdownMenuItem>
                          <DropdownMenuItem>Generate Invoice</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        {/* Recent Transactions Tab */}
        <TabsContent value="transactions" className="space-y-4">
          <div className="rounded-xl border border-border/50 bg-card overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Date</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Student</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Type</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Amount</th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-muted-foreground">Status</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {recentTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 text-muted-foreground">{transaction.date}</td>
                    <td className="px-4 py-3 font-medium">{transaction.student}</td>
                    <td className="px-4 py-3">
                      <Badge variant="outline">{transaction.type}</Badge>
                    </td>
                    <td className="px-4 py-3 font-medium text-emerald-500">{formatCurrency(transaction.amount)}</td>
                    <td className="px-4 py-3 text-center">
                      <Badge variant="default">Completed</Badge>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Button variant="ghost" size="sm">
                        <FileText className="mr-2 h-4 w-4" />
                        Receipt
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        {/* Invoices Tab */}
        <TabsContent value="invoices" className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <Link href="/dashboard/finance/invoices">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl border border-border/50 bg-card p-5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all cursor-pointer"
              >
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold">Generate Invoices</h3>
                <p className="text-sm text-muted-foreground">Create invoices for students</p>
              </motion.div>
            </Link>
            <Link href="/dashboard/finance/fee-structure">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="rounded-xl border border-border/50 bg-card p-5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all cursor-pointer"
              >
                <div className="h-10 w-10 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-3">
                  <CreditCard className="h-5 w-5 text-emerald-500" />
                </div>
                <h3 className="font-semibold">Fee Structure</h3>
                <p className="text-sm text-muted-foreground">Manage tuition and fees</p>
              </motion.div>
            </Link>
            <Link href="/dashboard/finance/reports">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="rounded-xl border border-border/50 bg-card p-5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all cursor-pointer"
              >
                <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center mb-3">
                  <TrendingUp className="h-5 w-5 text-blue-500" />
                </div>
                <h3 className="font-semibold">Financial Reports</h3>
                <p className="text-sm text-muted-foreground">View detailed reports</p>
              </motion.div>
            </Link>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
