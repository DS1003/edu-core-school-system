'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Upload,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Mail,
  Phone,
  Grid3X3,
  List,
  ChevronDown
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { mockStudents, mockClasses } from '@/lib/mock-data'
import type { Student } from '@/types'

export default function StudentsPage() {
  const [view, setView] = useState<'list' | 'grid'>('list')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedClass, setSelectedClass] = useState<string>('all')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')

  const filteredStudents = mockStudents.filter(student => {
    const matchesSearch = 
      student.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.matricule.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesClass = selectedClass === 'all' || student.classId === selectedClass
    const matchesStatus = selectedStatus === 'all' || student.status === selectedStatus

    return matchesSearch && matchesClass && matchesStatus
  })

  const getStatusBadge = (status: Student['status']) => {
    const styles = {
      active: 'bg-emerald-500/10 text-emerald-500',
      inactive: 'bg-red-500/10 text-red-500',
      graduated: 'bg-blue-500/10 text-blue-500',
      transferred: 'bg-amber-500/10 text-amber-500'
    }
    const labels = {
      active: 'Actif',
      inactive: 'Inactif',
      graduated: 'Diplômé',
      transferred: 'Transféré'
    }
    return (
      <span className={cn('px-2 py-1 rounded-full text-xs font-medium', styles[status])}>
        {labels[status]}
      </span>
    )
  }

  const getClassName = (classId: string) => {
    const cls = mockClasses.find(c => c.id === classId)
    return cls?.name || 'N/A'
  }

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Élèves</h1>
          <p className="text-muted-foreground">Gérez tous les élèves de votre établissement</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Upload className="h-4 w-4" />
            <span className="hidden sm:inline">Importer</span>
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Exporter</span>
          </Button>
          <Link href="/dashboard/students/new">
            <Button size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Nouvel élève</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un élève..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center gap-2">
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="h-10 rounded-lg border border-border bg-card px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">Toutes les classes</option>
            {mockClasses.map(cls => (
              <option key={cls.id} value={cls.id}>{cls.name}</option>
            ))}
          </select>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="h-10 rounded-lg border border-border bg-card px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">Tous les statuts</option>
            <option value="active">Actif</option>
            <option value="inactive">Inactif</option>
            <option value="graduated">Diplômé</option>
            <option value="transferred">Transféré</option>
          </select>
          <div className="hidden sm:flex items-center gap-1 border border-border rounded-lg p-1">
            <button
              onClick={() => setView('list')}
              className={cn(
                'p-2 rounded-md transition-colors',
                view === 'list' ? 'bg-secondary' : 'hover:bg-secondary/50'
              )}
            >
              <List className="h-4 w-4" />
            </button>
            <button
              onClick={() => setView('grid')}
              className={cn(
                'p-2 rounded-md transition-colors',
                view === 'grid' ? 'bg-secondary' : 'hover:bg-secondary/50'
              )}
            >
              <Grid3X3 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total élèves', value: mockStudents.length, color: 'text-blue-500' },
          { label: 'Actifs', value: mockStudents.filter(s => s.status === 'active').length, color: 'text-emerald-500' },
          { label: 'Nouveaux ce mois', value: 23, color: 'text-purple-500' },
          { label: 'Taux de présence', value: '94.5%', color: 'text-amber-500' }
        ].map((stat, i) => (
          <div key={i} className="bg-card border border-border rounded-xl p-4">
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className={cn('text-2xl font-bold', stat.color)}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {filteredStudents.length} élève{filteredStudents.length > 1 ? 's' : ''} trouvé{filteredStudents.length > 1 ? 's' : ''}
        </p>
      </div>

      {/* List View */}
      {view === 'list' && (
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-secondary/30">
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Élève</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground hidden md:table-cell">Matricule</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground hidden sm:table-cell">Classe</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground hidden lg:table-cell">Contact</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Statut</th>
                  <th className="text-right p-4 text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.slice(0, 20).map((student, index) => (
                  <motion.tr
                    key={student.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.02 }}
                    className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/50 to-accent/50 flex items-center justify-center text-white font-medium">
                          {student.firstName[0]}{student.lastName[0]}
                        </div>
                        <div>
                          <p className="font-medium">{student.firstName} {student.lastName}</p>
                          <p className="text-sm text-muted-foreground md:hidden">{student.matricule}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 hidden md:table-cell">
                      <code className="text-sm bg-muted px-2 py-1 rounded">{student.matricule}</code>
                    </td>
                    <td className="p-4 hidden sm:table-cell">
                      <span className="text-sm">{getClassName(student.classId)}</span>
                    </td>
                    <td className="p-4 hidden lg:table-cell">
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        {student.email && (
                          <span className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {student.email.split('@')[0]}...
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      {getStatusBadge(student.status)}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-1">
                        <Link href={`/dashboard/students/${student.id}`}>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Link href={`/dashboard/students/${student.id}/edit`}>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Grid View */}
      {view === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredStudents.slice(0, 20).map((student, index) => (
            <motion.div
              key={student.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
              className="bg-card border border-border rounded-2xl p-5 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/50 to-accent/50 flex items-center justify-center text-white font-bold text-lg">
                  {student.firstName[0]}{student.lastName[0]}
                </div>
                {getStatusBadge(student.status)}
              </div>
              <h3 className="font-semibold mb-1">{student.firstName} {student.lastName}</h3>
              <p className="text-sm text-muted-foreground mb-3">{getClassName(student.classId)}</p>
              <code className="text-xs bg-muted px-2 py-1 rounded">{student.matricule}</code>
              
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
                <Link href={`/dashboard/students/${student.id}`} className="flex-1">
                  <Button variant="outline" size="sm" className="w-full">
                    Voir profil
                  </Button>
                </Link>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Affichage de 1-20 sur {filteredStudents.length}
        </p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>Précédent</Button>
          <Button variant="outline" size="sm">Suivant</Button>
        </div>
      </div>
    </div>
  )
}
