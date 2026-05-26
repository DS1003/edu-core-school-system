'use client'

import { motion } from 'framer-motion'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend
} from 'recharts'
import { formatCFA } from '@/lib/mock-data'

interface ChartCardProps {
  title: string
  subtitle?: string
  children: React.ReactNode
  action?: React.ReactNode
}

export function ChartCard({ title, subtitle, children, action }: ChartCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-card border border-border rounded-2xl p-6"
    >
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="font-semibold">{title}</h3>
          {subtitle && <p className="text-sm text-muted-foreground mt-0.5">{subtitle}</p>}
        </div>
        {action}
      </div>
      {children}
    </motion.div>
  )
}

interface RevenueChartProps {
  data: { month: string; revenue: number; expenses: number }[]
}

export function RevenueChart({ data }: RevenueChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="oklch(0.637 0.237 276.966)" stopOpacity={0.3} />
            <stop offset="95%" stopColor="oklch(0.637 0.237 276.966)" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="oklch(0.696 0.17 162.48)" stopOpacity={0.3} />
            <stop offset="95%" stopColor="oklch(0.696 0.17 162.48)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.3 0 0)" vertical={false} />
        <XAxis 
          dataKey="month" 
          axisLine={false} 
          tickLine={false}
          tick={{ fill: 'oklch(0.65 0 0)', fontSize: 12 }}
        />
        <YAxis 
          axisLine={false} 
          tickLine={false}
          tick={{ fill: 'oklch(0.65 0 0)', fontSize: 12 }}
          tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`}
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: 'oklch(0.18 0.005 285)', 
            border: '1px solid oklch(0.28 0.005 285)',
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
          }}
          labelStyle={{ color: 'oklch(0.985 0 0)' }}
          formatter={(value: number) => formatCFA(value)}
        />
        <Area
          type="monotone"
          dataKey="revenue"
          name="Revenus"
          stroke="oklch(0.637 0.237 276.966)"
          strokeWidth={2}
          fill="url(#revenueGradient)"
        />
        <Area
          type="monotone"
          dataKey="expenses"
          name="Dépenses"
          stroke="oklch(0.696 0.17 162.48)"
          strokeWidth={2}
          fill="url(#expenseGradient)"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

interface AttendanceChartProps {
  data: { date: string; present: number; absent: number; late: number }[]
}

export function AttendanceChart({ data }: AttendanceChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} barGap={2}>
        <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.3 0 0)" vertical={false} />
        <XAxis 
          dataKey="date" 
          axisLine={false} 
          tickLine={false}
          tick={{ fill: 'oklch(0.65 0 0)', fontSize: 12 }}
        />
        <YAxis 
          axisLine={false} 
          tickLine={false}
          tick={{ fill: 'oklch(0.65 0 0)', fontSize: 12 }}
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: 'oklch(0.18 0.005 285)', 
            border: '1px solid oklch(0.28 0.005 285)',
            borderRadius: '12px'
          }}
        />
        <Bar dataKey="present" name="Présents" fill="oklch(0.696 0.17 162.48)" radius={[4, 4, 0, 0]} />
        <Bar dataKey="absent" name="Absents" fill="oklch(0.577 0.245 27.325)" radius={[4, 4, 0, 0]} />
        <Bar dataKey="late" name="Retards" fill="oklch(0.769 0.188 70.08)" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

interface ClassDistributionChartProps {
  data: { name: string; students: number; color: string }[]
}

export function ClassDistributionChart({ data }: ClassDistributionChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          paddingAngle={2}
          dataKey="students"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip 
          contentStyle={{ 
            backgroundColor: 'oklch(0.18 0.005 285)', 
            border: '1px solid oklch(0.28 0.005 285)',
            borderRadius: '12px'
          }}
          formatter={(value: number) => `${value} élèves`}
        />
        <Legend 
          verticalAlign="bottom"
          formatter={(value) => <span style={{ color: 'oklch(0.65 0 0)', fontSize: '12px' }}>{value}</span>}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}

interface SubjectPerformanceChartProps {
  data: { subject: string; average: number; passRate: number }[]
}

export function SubjectPerformanceChart({ data }: SubjectPerformanceChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.3 0 0)" vertical={false} />
        <XAxis 
          dataKey="subject" 
          axisLine={false} 
          tickLine={false}
          tick={{ fill: 'oklch(0.65 0 0)', fontSize: 11 }}
          angle={-45}
          textAnchor="end"
          height={60}
        />
        <YAxis 
          yAxisId="left"
          axisLine={false} 
          tickLine={false}
          tick={{ fill: 'oklch(0.65 0 0)', fontSize: 12 }}
          domain={[0, 20]}
        />
        <YAxis 
          yAxisId="right"
          orientation="right"
          axisLine={false} 
          tickLine={false}
          tick={{ fill: 'oklch(0.65 0 0)', fontSize: 12 }}
          domain={[0, 100]}
          tickFormatter={(value) => `${value}%`}
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: 'oklch(0.18 0.005 285)', 
            border: '1px solid oklch(0.28 0.005 285)',
            borderRadius: '12px'
          }}
        />
        <Line 
          yAxisId="left"
          type="monotone" 
          dataKey="average" 
          name="Moyenne"
          stroke="oklch(0.637 0.237 276.966)" 
          strokeWidth={2}
          dot={{ fill: 'oklch(0.637 0.237 276.966)', r: 4 }}
        />
        <Line 
          yAxisId="right"
          type="monotone" 
          dataKey="passRate" 
          name="Taux de réussite"
          stroke="oklch(0.696 0.17 162.48)" 
          strokeWidth={2}
          dot={{ fill: 'oklch(0.696 0.17 162.48)', r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
