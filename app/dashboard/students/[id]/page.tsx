'use client'

import { use } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  ArrowLeft,
  Edit,
  Mail,
  Phone,
  MapPin,
  Calendar,
  User,
  FileText,
  DollarSign,
  ClipboardList,
  Clock,
  Award,
  QrCode
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { mockStudents, mockClasses, formatDate, formatCFA } from '@/lib/mock-data'

export default function StudentProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const student = mockStudents.find(s => s.id === id) || mockStudents[0]
  const studentClass = mockClasses.find(c => c.id === student.classId)

  const tabs = [
    { id: 'overview', label: 'Aperçu', icon: User },
    { id: 'grades', label: 'Notes', icon: ClipboardList },
    { id: 'attendance', label: 'Présences', icon: Clock },
    { id: 'payments', label: 'Paiements', icon: DollarSign },
    { id: 'documents', label: 'Documents', icon: FileText },
  ]

  const grades = [
    { subject: 'Mathématiques', grade: 14.5, coef: 5, teacher: 'M. Diallo' },
    { subject: 'Physique-Chimie', grade: 13.0, coef: 4, teacher: 'Mme Sow' },
    { subject: 'Français', grade: 15.5, coef: 4, teacher: 'M. Ndiaye' },
    { subject: 'Anglais', grade: 12.0, coef: 3, teacher: 'Mme Fall' },
    { subject: 'Histoire-Géographie', grade: 16.0, coef: 3, teacher: 'M. Ba' },
    { subject: 'SVT', grade: 14.0, coef: 3, teacher: 'Mme Diop' },
  ]

  const payments = [
    { id: 1, description: 'Frais 1er trimestre', amount: 175000, status: 'paid', date: new Date('2025-10-15') },
    { id: 2, description: 'Frais 2ème trimestre', amount: 175000, status: 'paid', date: new Date('2026-01-10') },
    { id: 3, description: 'Frais 3ème trimestre', amount: 175000, status: 'pending', date: new Date('2026-04-01') },
  ]

  const average = grades.reduce((acc, g) => acc + g.grade * g.coef, 0) / grades.reduce((acc, g) => acc + g.coef, 0)

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard/students">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">Profil Élève</h1>
          <p className="text-muted-foreground">{student.matricule}</p>
        </div>
        <Link href={`/dashboard/students/${id}/edit`}>
          <Button variant="outline" className="gap-2">
            <Edit className="h-4 w-4" />
            Modifier
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Profile Card */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card border border-border rounded-2xl p-6"
          >
            <div className="text-center mb-6">
              <div className="w-24 h-24 mx-auto rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-3xl font-bold mb-4">
                {student.firstName[0]}{student.lastName[0]}
              </div>
              <h2 className="text-xl font-bold">{student.firstName} {student.lastName}</h2>
              <p className="text-muted-foreground">{studentClass?.name}</p>
              <div className={cn(
                'inline-flex items-center gap-1 mt-2 px-3 py-1 rounded-full text-sm font-medium',
                student.status === 'active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'
              )}>
                <span className={cn(
                  'w-2 h-2 rounded-full',
                  student.status === 'active' ? 'bg-emerald-500' : 'bg-red-500'
                )} />
                {student.status === 'active' ? 'Actif' : 'Inactif'}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="truncate">{student.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{student.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="line-clamp-2">{student.address}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Né(e) le {formatDate(student.dateOfBirth)}</span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-border">
              <div className="flex items-center justify-center gap-2 p-4 bg-secondary/50 rounded-xl">
                <QrCode className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm font-medium">{student.matricule}</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card border border-border rounded-2xl p-6"
          >
            <h3 className="font-semibold mb-4">Statistiques rapides</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Moyenne générale</span>
                <span className="font-bold text-primary">{average.toFixed(2)}/20</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Classement</span>
                <span className="font-bold">8ème / 42</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Taux de présence</span>
                <span className="font-bold text-emerald-500">96.5%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Absences</span>
                <span className="font-bold">3 jours</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column - Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Grades Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card border border-border rounded-2xl overflow-hidden"
          >
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Notes du semestre</h3>
                <Link href={`/dashboard/students/${id}/grades`}>
                  <Button variant="ghost" size="sm">Voir tout</Button>
                </Link>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-secondary/30">
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Matière</th>
                    <th className="text-center p-4 text-sm font-medium text-muted-foreground">Note</th>
                    <th className="text-center p-4 text-sm font-medium text-muted-foreground">Coef</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground hidden sm:table-cell">Enseignant</th>
                  </tr>
                </thead>
                <tbody>
                  {grades.map((grade, index) => (
                    <tr key={index} className="border-b border-border last:border-0">
                      <td className="p-4 text-sm font-medium">{grade.subject}</td>
                      <td className="p-4 text-center">
                        <span className={cn(
                          'px-2 py-1 rounded-lg text-sm font-bold',
                          grade.grade >= 14 ? 'bg-emerald-500/10 text-emerald-500' :
                          grade.grade >= 10 ? 'bg-amber-500/10 text-amber-500' :
                          'bg-red-500/10 text-red-500'
                        )}>
                          {grade.grade.toFixed(1)}
                        </span>
                      </td>
                      <td className="p-4 text-center text-sm text-muted-foreground">{grade.coef}</td>
                      <td className="p-4 text-sm text-muted-foreground hidden sm:table-cell">{grade.teacher}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-secondary/50">
                    <td className="p-4 text-sm font-bold">Moyenne générale</td>
                    <td className="p-4 text-center">
                      <span className="px-3 py-1 rounded-lg text-sm font-bold bg-primary/10 text-primary">
                        {average.toFixed(2)}
                      </span>
                    </td>
                    <td colSpan={2}></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </motion.div>

          {/* Payments Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card border border-border rounded-2xl overflow-hidden"
          >
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Paiements</h3>
                <Link href={`/dashboard/students/${id}/payments`}>
                  <Button variant="ghost" size="sm">Voir tout</Button>
                </Link>
              </div>
            </div>
            <div className="p-4">
              <div className="space-y-3">
                {payments.map((payment) => (
                  <div
                    key={payment.id}
                    className="flex items-center justify-between p-4 bg-secondary/30 rounded-xl"
                  >
                    <div>
                      <p className="font-medium">{payment.description}</p>
                      <p className="text-sm text-muted-foreground">{formatDate(payment.date)}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{formatCFA(payment.amount)}</p>
                      <span className={cn(
                        'text-xs px-2 py-1 rounded-full',
                        payment.status === 'paid' 
                          ? 'bg-emerald-500/10 text-emerald-500' 
                          : 'bg-amber-500/10 text-amber-500'
                      )}>
                        {payment.status === 'paid' ? 'Payé' : 'En attente'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Attendance Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-card border border-border rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Présences ce mois</h3>
              <Link href={`/dashboard/students/${id}/attendance`}>
                <Button variant="ghost" size="sm">Détails</Button>
              </Link>
            </div>
            <div className="grid grid-cols-7 gap-2">
              {[...Array(28)].map((_, i) => {
                const isPresent = Math.random() > 0.1
                const isAbsent = !isPresent && Math.random() > 0.5
                return (
                  <div
                    key={i}
                    className={cn(
                      'aspect-square rounded-lg flex items-center justify-center text-xs font-medium',
                      isPresent && 'bg-emerald-500/10 text-emerald-500',
                      isAbsent && 'bg-red-500/10 text-red-500',
                      !isPresent && !isAbsent && 'bg-amber-500/10 text-amber-500'
                    )}
                  >
                    {i + 1}
                  </div>
                )
              })}
            </div>
            <div className="flex items-center justify-center gap-6 mt-4 text-xs">
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-emerald-500/30" /> Présent
              </span>
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-red-500/30" /> Absent
              </span>
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-amber-500/30" /> Retard
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
