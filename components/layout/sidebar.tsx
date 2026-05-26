'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useAppStore } from '@/store/app-store'
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  Calendar,
  ClipboardList,
  FileText,
  DollarSign,
  MessageSquare,
  Settings,
  Building2,
  ChevronDown,
  ChevronLeft,
  UserCheck,
  BarChart3,
  FolderOpen,
  Bell,
  School
} from 'lucide-react'
import { useState } from 'react'

interface NavGroup {
  title: string
  items: NavItemType[]
}

interface NavItemType {
  title: string
  href: string
  icon: React.ElementType
  badge?: string | number
  children?: { title: string; href: string }[]
}

const navGroups: NavGroup[] = [
  {
    title: 'Vue Générale',
    items: [
      { title: 'Tableau de bord', href: '/dashboard', icon: LayoutDashboard },
      { title: 'Analyses', href: '/dashboard/analytics', icon: BarChart3 },
    ]
  },
  {
    title: 'Gestion Académique',
    items: [
      { 
        title: 'Élèves', 
        href: '/dashboard/students', 
        icon: Users,
        badge: 2847,
        children: [
          { title: 'Liste des élèves', href: '/dashboard/students' },
          { title: 'Ajouter un élève', href: '/dashboard/students/new' },
          { title: 'Cartes scolaires', href: '/dashboard/students/cards' },
        ]
      },
      { 
        title: 'Enseignants', 
        href: '/dashboard/teachers', 
        icon: GraduationCap,
        children: [
          { title: 'Liste des enseignants', href: '/dashboard/teachers' },
          { title: 'Ajouter un enseignant', href: '/dashboard/teachers/new' },
          { title: 'Affectations', href: '/dashboard/teachers/assignments' },
        ]
      },
      { 
        title: 'Classes', 
        href: '/dashboard/classes', 
        icon: School,
        children: [
          { title: 'Toutes les classes', href: '/dashboard/classes' },
          { title: 'Filières', href: '/dashboard/classes/departments' },
          { title: 'Niveaux', href: '/dashboard/classes/levels' },
        ]
      },
      { title: 'Matières', href: '/dashboard/subjects', icon: BookOpen },
    ]
  },
  {
    title: 'Évaluation',
    items: [
      { 
        title: 'Notes', 
        href: '/dashboard/grades', 
        icon: ClipboardList,
        children: [
          { title: 'Saisie des notes', href: '/dashboard/grades' },
          { title: 'Classements', href: '/dashboard/grades/rankings' },
          { title: 'Statistiques', href: '/dashboard/grades/stats' },
        ]
      },
      { title: 'Bulletins', href: '/dashboard/reports', icon: FileText },
      { title: 'Emploi du temps', href: '/dashboard/schedule', icon: Calendar },
      { title: 'Présences', href: '/dashboard/attendance', icon: UserCheck },
    ]
  },
  {
    title: 'Administration',
    items: [
      { 
        title: 'Finances', 
        href: '/dashboard/finance', 
        icon: DollarSign,
        badge: '234',
        children: [
          { title: 'Tableau de bord', href: '/dashboard/finance' },
          { title: 'Paiements', href: '/dashboard/finance/payments' },
          { title: 'Factures', href: '/dashboard/finance/invoices' },
          { title: 'Frais de scolarité', href: '/dashboard/finance/tuition' },
        ]
      },
      { title: 'Communication', href: '/dashboard/communication', icon: MessageSquare },
      { title: 'Documents', href: '/dashboard/documents', icon: FolderOpen },
    ]
  },
  {
    title: 'Configuration',
    items: [
      { 
        title: 'Campus', 
        href: '/dashboard/campuses', 
        icon: Building2,
        children: [
          { title: 'Tous les campus', href: '/dashboard/campuses' },
          { title: 'Années académiques', href: '/dashboard/campuses/years' },
        ]
      },
      { 
        title: 'Paramètres', 
        href: '/dashboard/settings', 
        icon: Settings,
        children: [
          { title: 'Général', href: '/dashboard/settings' },
          { title: 'Rôles & Permissions', href: '/dashboard/settings/roles' },
          { title: 'Intégrations', href: '/dashboard/settings/integrations' },
        ]
      },
    ]
  }
]

function NavItem({ item, collapsed }: { item: NavItemType; collapsed: boolean }) {
  const pathname = usePathname()
  const [expanded, setExpanded] = useState(false)
  const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
  const hasChildren = item.children && item.children.length > 0
  const Icon = item.icon

  if (collapsed) {
    return (
      <Link
        href={item.href}
        className={cn(
          'flex items-center justify-center w-10 h-10 rounded-xl mx-auto transition-all duration-200',
          isActive 
            ? 'bg-primary text-primary-foreground' 
            : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
        )}
        title={item.title}
      >
        <Icon className="h-5 w-5" />
      </Link>
    )
  }

  return (
    <div>
      <div
        className={cn(
          'flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200',
          isActive 
            ? 'bg-primary text-primary-foreground' 
            : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
        )}
        onClick={() => hasChildren ? setExpanded(!expanded) : null}
      >
        {hasChildren ? (
          <>
            <Icon className="h-5 w-5 flex-shrink-0" />
            <span className="flex-1 text-sm font-medium">{item.title}</span>
            {item.badge && (
              <span className={cn(
                "text-xs px-2 py-0.5 rounded-full",
                isActive ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted text-muted-foreground"
              )}>
                {item.badge}
              </span>
            )}
            <ChevronDown className={cn(
              "h-4 w-4 transition-transform duration-200",
              expanded && "rotate-180"
            )} />
          </>
        ) : (
          <Link href={item.href} className="flex items-center gap-3 flex-1">
            <Icon className="h-5 w-5 flex-shrink-0" />
            <span className="flex-1 text-sm font-medium">{item.title}</span>
            {item.badge && (
              <span className={cn(
                "text-xs px-2 py-0.5 rounded-full",
                isActive ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted text-muted-foreground"
              )}>
                {item.badge}
              </span>
            )}
          </Link>
        )}
      </div>
      
      <AnimatePresence>
        {hasChildren && expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="ml-6 mt-1 space-y-1 border-l border-border pl-4">
              {item.children?.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  className={cn(
                    'block px-3 py-2 text-sm rounded-lg transition-colors duration-200',
                    pathname === child.href
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                  )}
                >
                  {child.title}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function Sidebar() {
  const { sidebarCollapsed, toggleSidebar, currentCampus, availableCampuses, setCurrentCampus } = useAppStore()
  const [campusDropdownOpen, setCampusDropdownOpen] = useState(false)

  return (
    <>
      {/* Mobile overlay */}
      <div 
        className={cn(
          "fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden transition-opacity",
          sidebarCollapsed ? "opacity-0 pointer-events-none" : "opacity-100"
        )}
        onClick={toggleSidebar}
      />
      
      <motion.aside
        initial={false}
        animate={{ width: sidebarCollapsed ? 72 : 280 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className={cn(
          "fixed top-0 left-0 z-50 h-screen bg-sidebar border-r border-sidebar-border flex flex-col",
          "lg:relative lg:z-0",
          !sidebarCollapsed ? "w-[280px]" : "w-[72px]"
        )}
      >
        {/* Logo */}
        <div className={cn(
          "flex items-center h-16 border-b border-sidebar-border px-4",
          sidebarCollapsed ? "justify-center" : "gap-3"
        )}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          {!sidebarCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h1 className="font-bold text-lg text-foreground">EduCore</h1>
              <p className="text-xs text-muted-foreground">Gestion Scolaire</p>
            </motion.div>
          )}
        </div>

        {/* Campus Switcher */}
        {!sidebarCollapsed && (
          <div className="px-3 py-3 border-b border-sidebar-border">
            <div 
              className="flex items-center gap-3 p-2.5 rounded-xl bg-secondary/50 cursor-pointer hover:bg-secondary transition-colors"
              onClick={() => setCampusDropdownOpen(!campusDropdownOpen)}
            >
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Building2 className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{currentCampus?.name.replace('Campus ', '')}</p>
                <p className="text-xs text-muted-foreground">{currentCampus?.city}</p>
              </div>
              <ChevronDown className={cn(
                "h-4 w-4 text-muted-foreground transition-transform",
                campusDropdownOpen && "rotate-180"
              )} />
            </div>
            
            <AnimatePresence>
              {campusDropdownOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="mt-2 space-y-1">
                    {availableCampuses.map((campus) => (
                      <div
                        key={campus.id}
                        className={cn(
                          "flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors",
                          campus.id === currentCampus?.id
                            ? "bg-primary/10 text-primary"
                            : "hover:bg-secondary text-muted-foreground"
                        )}
                        onClick={() => {
                          setCurrentCampus(campus)
                          setCampusDropdownOpen(false)
                        }}
                      >
                        <Building2 className="h-4 w-4" />
                        <span className="text-sm">{campus.name.replace('Campus ', '')}</span>
                        {campus.isMainCampus && (
                          <span className="ml-auto text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded">
                            Principal
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
          {navGroups.map((group) => (
            <div key={group.title}>
              {!sidebarCollapsed && (
                <h3 className="px-3 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {group.title}
                </h3>
              )}
              <div className="space-y-1">
                {group.items.map((item) => (
                  <NavItem key={item.href} item={item} collapsed={sidebarCollapsed} />
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* Collapse Button */}
        <div className="p-3 border-t border-sidebar-border">
          <button
            onClick={toggleSidebar}
            className={cn(
              "flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors",
              sidebarCollapsed && "justify-center"
            )}
          >
            <ChevronLeft className={cn(
              "h-5 w-5 transition-transform duration-300",
              sidebarCollapsed && "rotate-180"
            )} />
            {!sidebarCollapsed && (
              <span className="text-sm font-medium">Réduire</span>
            )}
          </button>
        </div>
      </motion.aside>
    </>
  )
}
