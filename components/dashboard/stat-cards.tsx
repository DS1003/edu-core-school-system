'use client'

import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

interface StatCardProps {
  title: string
  value: string | number
  change?: string
  changeType?: 'positive' | 'negative' | 'neutral'
  icon: React.ReactNode
  color?: string
}

export function StatCard({ title, value, change, changeType = 'neutral', icon, color }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-all duration-300"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p className="text-2xl font-bold tracking-tight">{value}</p>
          {change && (
            <p className={cn(
              "text-xs mt-2 flex items-center gap-1",
              changeType === 'positive' && "text-emerald-500",
              changeType === 'negative' && "text-red-500",
              changeType === 'neutral' && "text-muted-foreground"
            )}>
              {changeType === 'positive' && '↑'}
              {changeType === 'negative' && '↓'}
              {change}
            </p>
          )}
        </div>
        <div className={cn(
          "p-3 rounded-xl",
          color || "bg-primary/10 text-primary"
        )}>
          {icon}
        </div>
      </div>
    </motion.div>
  )
}

interface QuickActionCardProps {
  title: string
  description: string
  icon: React.ReactNode
  onClick?: () => void
  href?: string
}

export function QuickActionCard({ title, description, icon, onClick }: QuickActionCardProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="flex items-center gap-4 p-4 bg-card border border-border rounded-2xl hover:bg-secondary/50 transition-colors text-left w-full"
    >
      <div className="p-3 rounded-xl bg-primary/10 text-primary">
        {icon}
      </div>
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </motion.button>
  )
}

interface ActivityItemProps {
  type: string
  description: string
  time: string
  amount?: number
}

export function ActivityItem({ type, description, time, amount }: ActivityItemProps) {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'payment': return 'bg-emerald-500/10 text-emerald-500'
      case 'enrollment': return 'bg-blue-500/10 text-blue-500'
      case 'grade': return 'bg-purple-500/10 text-purple-500'
      case 'attendance': return 'bg-amber-500/10 text-amber-500'
      case 'announcement': return 'bg-pink-500/10 text-pink-500'
      case 'teacher': return 'bg-indigo-500/10 text-indigo-500'
      default: return 'bg-muted text-muted-foreground'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'payment': return '💰'
      case 'enrollment': return '📝'
      case 'grade': return '📊'
      case 'attendance': return '✅'
      case 'announcement': return '📢'
      case 'teacher': return '👨‍🏫'
      default: return '📌'
    }
  }

  return (
    <div className="flex items-center gap-3 py-3">
      <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center text-lg", getTypeColor(type))}>
        {getTypeIcon(type)}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm truncate">{description}</p>
        <p className="text-xs text-muted-foreground">{time}</p>
      </div>
      {amount && (
        <p className="text-sm font-medium text-emerald-500">
          +{new Intl.NumberFormat('fr-FR').format(amount)} CFA
        </p>
      )}
    </div>
  )
}

interface ProgressBarProps {
  label: string
  value: number
  max: number
  color?: string
}

export function ProgressBar({ label, value, max, color = 'bg-primary' }: ProgressBarProps) {
  const percentage = Math.round((value / max) * 100)
  
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span>{label}</span>
        <span className="text-muted-foreground">{percentage}%</span>
      </div>
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={cn("h-full rounded-full", color)}
        />
      </div>
    </div>
  )
}

interface EventCardProps {
  title: string
  date: Date
  type: string
}

export function EventCard({ title, date, type }: EventCardProps) {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'meeting': return 'border-l-blue-500'
      case 'exam': return 'border-l-red-500'
      case 'training': return 'border-l-purple-500'
      case 'event': return 'border-l-emerald-500'
      default: return 'border-l-muted-foreground'
    }
  }

  return (
    <div className={cn(
      "p-3 bg-secondary/50 rounded-lg border-l-4",
      getTypeColor(type)
    )}>
      <p className="text-sm font-medium">{title}</p>
      <p className="text-xs text-muted-foreground mt-1">
        {new Intl.DateTimeFormat('fr-FR', {
          weekday: 'short',
          day: 'numeric',
          month: 'short',
          hour: '2-digit',
          minute: '2-digit'
        }).format(date)}
      </p>
    </div>
  )
}
