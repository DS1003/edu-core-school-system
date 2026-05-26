'use client'

import { useEffect, useCallback } from 'react'
import { useAppStore } from '@/store/app-store'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  X, 
  Users, 
  GraduationCap, 
  DollarSign, 
  FileText,
  Settings,
  ArrowRight
} from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const quickActions = [
  { title: 'Ajouter un élève', href: '/dashboard/students/new', icon: Users, color: 'text-blue-500' },
  { title: 'Saisir des notes', href: '/dashboard/grades', icon: FileText, color: 'text-emerald-500' },
  { title: 'Nouveau paiement', href: '/dashboard/finances/payments/new', icon: DollarSign, color: 'text-amber-500' },
  { title: 'Ajouter un enseignant', href: '/dashboard/teachers/new', icon: GraduationCap, color: 'text-purple-500' },
]

const recentSearches = [
  { title: 'Mamadou Diallo', type: 'Élève', href: '/dashboard/students/std-001' },
  { title: 'Terminale S1', type: 'Classe', href: '/dashboard/classes/cls-001' },
  { title: 'Paiements en attente', type: 'Finances', href: '/dashboard/finances/payments?status=pending' },
]

export function SearchPalette() {
  const { searchOpen, setSearchOpen, searchQuery, setSearchQuery } = useAppStore()

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault()
      setSearchOpen(true)
    }
    if (e.key === 'Escape') {
      setSearchOpen(false)
    }
  }, [setSearchOpen])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  return (
    <AnimatePresence>
      {searchOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
            onClick={() => setSearchOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed left-1/2 top-[15%] -translate-x-1/2 z-50 w-full max-w-2xl mx-4"
          >
            <div className="bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">
              {/* Search input */}
              <div className="flex items-center gap-3 px-4 border-b border-border">
                <Search className="h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Rechercher un élève, une classe, un enseignant..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 h-14 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none"
                  autoFocus
                />
                <button
                  onClick={() => setSearchOpen(false)}
                  className="p-2 rounded-lg hover:bg-secondary transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="max-h-[60vh] overflow-y-auto">
                {/* Quick Actions */}
                <div className="p-4">
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                    Actions rapides
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {quickActions.map((action) => (
                      <Link
                        key={action.href}
                        href={action.href}
                        onClick={() => setSearchOpen(false)}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-secondary transition-colors group"
                      >
                        <div className={cn("p-2 rounded-lg bg-secondary", action.color)}>
                          <action.icon className="h-4 w-4" />
                        </div>
                        <span className="text-sm font-medium">{action.title}</span>
                        <ArrowRight className="h-4 w-4 text-muted-foreground ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Recent Searches */}
                <div className="p-4 border-t border-border">
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                    Recherches récentes
                  </h3>
                  <div className="space-y-1">
                    {recentSearches.map((item, index) => (
                      <Link
                        key={index}
                        href={item.href}
                        onClick={() => setSearchOpen(false)}
                        className="flex items-center justify-between p-3 rounded-xl hover:bg-secondary transition-colors"
                      >
                        <span className="text-sm">{item.title}</span>
                        <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                          {item.type}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Search Tips */}
                <div className="p-4 border-t border-border bg-secondary/30">
                  <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <kbd className="px-1.5 py-0.5 rounded border border-border bg-muted">↑</kbd>
                      <kbd className="px-1.5 py-0.5 rounded border border-border bg-muted">↓</kbd>
                      pour naviguer
                    </span>
                    <span className="flex items-center gap-1">
                      <kbd className="px-1.5 py-0.5 rounded border border-border bg-muted">↵</kbd>
                      pour sélectionner
                    </span>
                    <span className="flex items-center gap-1">
                      <kbd className="px-1.5 py-0.5 rounded border border-border bg-muted">esc</kbd>
                      pour fermer
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
