'use client'

import { motion } from 'framer-motion'
import { 
  Users, 
  GraduationCap, 
  DollarSign, 
  TrendingUp,
  UserCheck,
  BarChart2,
  CalendarDays,
  ArrowRight,
  Plus
} from 'lucide-react'
import Link from 'next/link'
import { StatCard, ActivityItem, EventCard, ProgressBar } from '@/components/dashboard/stat-cards'
import { ChartCard, RevenueChart, AttendanceChart, ClassDistributionChart, SubjectPerformanceChart } from '@/components/dashboard/charts'
import { 
  mockDashboardStats, 
  mockRevenueData, 
  mockAttendanceData, 
  mockClassDistribution,
  mockSubjectPerformance,
  mockRecentActivities,
  mockUpcomingEvents,
  formatCFA 
} from '@/lib/mock-data'
import { Button } from '@/components/ui/button'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

export default function DashboardPage() {
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-4 lg:p-6 space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Tableau de bord</h1>
          <p className="text-muted-foreground">Bienvenue! Voici un aperçu de votre établissement.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <CalendarDays className="h-4 w-4" />
            <span className="hidden sm:inline">Mai 2026</span>
          </Button>
          <Button size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Nouvelle action</span>
          </Button>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Élèves"
          value={mockDashboardStats.totalStudents.toLocaleString('fr-FR')}
          change="+12% ce mois"
          changeType="positive"
          icon={<Users className="h-5 w-5" />}
          color="bg-blue-500/10 text-blue-500"
        />
        <StatCard
          title="Enseignants"
          value={mockDashboardStats.totalTeachers}
          change="+3 ce trimestre"
          changeType="positive"
          icon={<GraduationCap className="h-5 w-5" />}
          color="bg-purple-500/10 text-purple-500"
        />
        <StatCard
          title="Revenus du mois"
          value={formatCFA(62500000)}
          change="+18.5% vs. mois dernier"
          changeType="positive"
          icon={<DollarSign className="h-5 w-5" />}
          color="bg-emerald-500/10 text-emerald-500"
        />
        <StatCard
          title="Taux de présence"
          value={`${mockDashboardStats.attendanceRate}%`}
          change="-0.5% cette semaine"
          changeType="negative"
          icon={<UserCheck className="h-5 w-5" />}
          color="bg-amber-500/10 text-amber-500"
        />
      </motion.div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <ChartCard 
            title="Revenus vs Dépenses" 
            subtitle="Aperçu financier des 8 derniers mois"
            action={
              <Link href="/dashboard/finances" className="text-sm text-primary hover:underline flex items-center gap-1">
                Voir détails <ArrowRight className="h-3 w-3" />
              </Link>
            }
          >
            <RevenueChart data={mockRevenueData} />
          </ChartCard>
        </motion.div>

        <motion.div variants={itemVariants}>
          <ChartCard 
            title="Répartition des élèves" 
            subtitle="Par niveau"
          >
            <ClassDistributionChart data={mockClassDistribution} />
          </ChartCard>
        </motion.div>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <ChartCard 
            title="Présences de la semaine"
            subtitle="Statistiques de présence par jour"
            action={
              <Link href="/dashboard/attendance" className="text-sm text-primary hover:underline flex items-center gap-1">
                Voir détails <ArrowRight className="h-3 w-3" />
              </Link>
            }
          >
            <AttendanceChart data={mockAttendanceData} />
          </ChartCard>
        </motion.div>

        <motion.div variants={itemVariants}>
          <div className="bg-card border border-border rounded-2xl p-6 h-full">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-semibold">Activités récentes</h3>
                <p className="text-sm text-muted-foreground">Dernières actions</p>
              </div>
            </div>
            <div className="space-y-1 divide-y divide-border">
              {mockRecentActivities.slice(0, 5).map((activity) => (
                <ActivityItem
                  key={activity.id}
                  type={activity.type}
                  description={activity.description}
                  time={activity.time}
                  amount={activity.amount}
                />
              ))}
            </div>
            <Link 
              href="/dashboard/activities"
              className="block text-center text-sm text-primary hover:underline mt-4 pt-4 border-t border-border"
            >
              Voir toutes les activités
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Third Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <ChartCard 
            title="Performance par matière"
            subtitle="Moyenne et taux de réussite"
          >
            <SubjectPerformanceChart data={mockSubjectPerformance} />
          </ChartCard>
        </motion.div>

        <motion.div variants={itemVariants}>
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-semibold">Événements à venir</h3>
                <p className="text-sm text-muted-foreground">Cette semaine</p>
              </div>
              <Link href="/dashboard/calendar" className="text-sm text-primary hover:underline">
                Voir tout
              </Link>
            </div>
            <div className="space-y-3">
              {mockUpcomingEvents.map((event) => (
                <EventCard
                  key={event.id}
                  title={event.title}
                  date={event.date}
                  type={event.type}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Progress Section */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-2xl p-6">
          <h4 className="text-sm font-medium mb-4">Taux de recouvrement</h4>
          <ProgressBar label="Paiements reçus" value={76} max={100} color="bg-emerald-500" />
          <p className="text-xs text-muted-foreground mt-3">
            {formatCFA(368250000)} sur {formatCFA(485750000)}
          </p>
        </div>
        <div className="bg-card border border-border rounded-2xl p-6">
          <h4 className="text-sm font-medium mb-4">Capacité des classes</h4>
          <ProgressBar label="Occupation" value={89} max={100} color="bg-blue-500" />
          <p className="text-xs text-muted-foreground mt-3">
            2,534 / 2,847 places occupées
          </p>
        </div>
        <div className="bg-card border border-border rounded-2xl p-6">
          <h4 className="text-sm font-medium mb-4">Moyenne générale</h4>
          <ProgressBar label="Performance" value={68.5} max={100} color="bg-purple-500" />
          <p className="text-xs text-muted-foreground mt-3">
            13.7/20 - Taux de réussite: 72%
          </p>
        </div>
        <div className="bg-card border border-border rounded-2xl p-6">
          <h4 className="text-sm font-medium mb-4">Objectif du mois</h4>
          <ProgressBar label="Progression" value={85} max={100} color="bg-amber-500" />
          <p className="text-xs text-muted-foreground mt-3">
            17 jours restants
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}
