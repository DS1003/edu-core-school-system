"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, Save, Search, CreditCard, Banknote, Smartphone, Receipt } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { mockStudents } from "@/lib/mock-data"

export default function NewPaymentPage() {
  const router = useRouter()
  const [selectedStudent, setSelectedStudent] = useState<string>("")
  const [studentSearch, setStudentSearch] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("cash")
  const [amount, setAmount] = useState("")

  const student = mockStudents.find(s => s.id === selectedStudent)

  const filteredStudents = mockStudents.filter(s =>
    s.firstName.toLowerCase().includes(studentSearch.toLowerCase()) ||
    s.lastName.toLowerCase().includes(studentSearch.toLowerCase()) ||
    s.matricule.toLowerCase().includes(studentSearch.toLowerCase())
  )

  // Mock student financial info
  const studentFinance = student ? {
    tuitionFee: 850000,
    paid: 425000,
    remaining: 425000,
    dueDate: "2024-03-01",
  } : null

  const formatCurrency = (amt: number) => {
    return new Intl.NumberFormat("fr-SN", { style: "currency", currency: "XOF", maximumFractionDigits: 0 }).format(amt)
  }

  const paymentMethods = [
    { value: "cash", label: "Cash", icon: Banknote },
    { value: "card", label: "Credit/Debit Card", icon: CreditCard },
    { value: "mobile", label: "Mobile Money", icon: Smartphone },
    { value: "transfer", label: "Bank Transfer", icon: Receipt },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Record Payment</h1>
          <p className="text-muted-foreground">Record a new payment for a student</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Student Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border border-border/50 bg-card p-6"
          >
            <h3 className="font-semibold text-foreground mb-4">Select Student</h3>
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by name or matricule..."
                  value={studentSearch}
                  onChange={(e) => setStudentSearch(e.target.value)}
                  className="pl-10 bg-background"
                />
              </div>
              {studentSearch && (
                <div className="max-h-48 overflow-y-auto space-y-2 rounded-lg border border-border/50 p-2">
                  {filteredStudents.slice(0, 10).map(s => (
                    <div
                      key={s.id}
                      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedStudent === s.id ? "bg-primary/10 border border-primary/30" : "hover:bg-muted/50"
                      }`}
                      onClick={() => {
                        setSelectedStudent(s.id)
                        setStudentSearch("")
                      }}
                    >
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary">
                        {s.firstName[0]}{s.lastName[0]}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{s.firstName} {s.lastName}</p>
                        <p className="text-sm text-muted-foreground">{s.matricule}</p>
                      </div>
                      <Badge variant="outline">{s.currentClass || "6ème A"}</Badge>
                    </div>
                  ))}
                </div>
              )}
              {student && !studentSearch && (
                <div className="flex items-center gap-3 p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-lg font-medium text-primary">
                    {student.firstName[0]}{student.lastName[0]}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">{student.firstName} {student.lastName}</p>
                    <p className="text-sm text-muted-foreground">{student.matricule} • {student.currentClass || "6ème A"}</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setSelectedStudent("")}>
                    Change
                  </Button>
                </div>
              )}
            </div>
          </motion.div>

          {/* Payment Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-xl border border-border/50 bg-card p-6"
          >
            <h3 className="font-semibold text-foreground mb-4">Payment Details</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="paymentType">Payment Type *</Label>
                <Select>
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tuition">Tuition Fee</SelectItem>
                    <SelectItem value="registration">Registration Fee</SelectItem>
                    <SelectItem value="exam">Exam Fee</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Amount (XOF) *</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="bg-background"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="term">Term/Period</Label>
                <Select>
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Select term" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="term1">1st Trimester</SelectItem>
                    <SelectItem value="term2">2nd Trimester</SelectItem>
                    <SelectItem value="term3">3rd Trimester</SelectItem>
                    <SelectItem value="annual">Annual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Payment Date</Label>
                <Input id="date" type="date" className="bg-background" defaultValue={new Date().toISOString().split("T")[0]} />
              </div>
            </div>
          </motion.div>

          {/* Payment Method */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-xl border border-border/50 bg-card p-6"
          >
            <h3 className="font-semibold text-foreground mb-4">Payment Method</h3>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="grid gap-3 sm:grid-cols-2">
              {paymentMethods.map((method) => (
                <div key={method.value}>
                  <RadioGroupItem value={method.value} id={method.value} className="peer sr-only" />
                  <Label
                    htmlFor={method.value}
                    className="flex items-center gap-3 rounded-lg border border-border/50 bg-background p-4 cursor-pointer transition-all peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
                  >
                    <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                      <method.icon className="h-5 w-5 text-primary" />
                    </div>
                    <span className="font-medium">{method.label}</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>

            {paymentMethod === "mobile" && (
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="mobileProvider">Mobile Provider</Label>
                  <Select>
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder="Select provider" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="orange">Orange Money</SelectItem>
                      <SelectItem value="wave">Wave</SelectItem>
                      <SelectItem value="free">Free Money</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="transactionId">Transaction ID</Label>
                  <Input id="transactionId" placeholder="Enter transaction ID" className="bg-background" />
                </div>
              </div>
            )}

            {paymentMethod === "transfer" && (
              <div className="mt-4 space-y-2">
                <Label htmlFor="reference">Bank Reference</Label>
                <Input id="reference" placeholder="Enter bank reference number" className="bg-background" />
              </div>
            )}
          </motion.div>

          {/* Notes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-xl border border-border/50 bg-card p-6"
          >
            <h3 className="font-semibold text-foreground mb-4">Additional Notes</h3>
            <Textarea placeholder="Add any notes about this payment..." className="bg-background" rows={3} />
          </motion.div>
        </div>

        {/* Summary Sidebar */}
        <div className="space-y-6">
          {studentFinance && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="rounded-xl border border-border/50 bg-card p-5 sticky top-4"
            >
              <h3 className="font-semibold text-foreground mb-4">Student Balance</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Total Tuition</span>
                  <span className="font-medium">{formatCurrency(studentFinance.tuitionFee)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Already Paid</span>
                  <span className="font-medium text-emerald-500">{formatCurrency(studentFinance.paid)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Due Date</span>
                  <span className="font-medium">{studentFinance.dueDate}</span>
                </div>
                <hr className="border-border/50" />
                <div className="flex items-center justify-between">
                  <span className="font-medium">Remaining Balance</span>
                  <span className="text-lg font-bold text-amber-500">{formatCurrency(studentFinance.remaining)}</span>
                </div>
                {amount && (
                  <>
                    <hr className="border-border/50" />
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">This Payment</span>
                      <span className="font-medium text-primary">{formatCurrency(parseInt(amount) || 0)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">New Balance</span>
                      <span className="text-lg font-bold">
                        {formatCurrency(Math.max(0, studentFinance.remaining - (parseInt(amount) || 0)))}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          )}

          {/* Actions */}
          <div className="flex flex-col gap-3">
            <Button className="w-full bg-primary hover:bg-primary/90">
              <Save className="mr-2 h-4 w-4" />
              Record Payment
            </Button>
            <Button variant="outline" className="w-full">
              <Receipt className="mr-2 h-4 w-4" />
              Save & Print Receipt
            </Button>
            <Button variant="ghost" className="w-full" onClick={() => router.back()}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
