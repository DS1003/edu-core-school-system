'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useAppStore } from '@/store/app-store'
import { useTranslation } from '@/lib/i18n'
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
  translationKey: string
  items: NavItemType[]
}

interface NavItemType {
  title: string
  translationKey: string
  href: string
  icon: React.ElementType
  badge?: string | number
  children?: { title: string; translationKey: string; href: string }[]
}

const navGroups: NavGroup[] = [
  {
    title: 'Vue Générale',
    translationKey: 'sidebar.groups.overview',
    items: [
      { title: 'Tableau de bord', translationKey: 'sidebar.items.dashboard', href: '/dashboard', icon: LayoutDashboard },
      { title: 'Analyses', translationKey: 'sidebar.items.analytics', href: '/dashboard/analytics', icon: BarChart3 },
    ]
  },
  {
    title: 'Gestion Académique',
    translationKey: 'sidebar.groups.academic',
    items: [
      { 
        title: 'Élèves', 
        translationKey: 'sidebar.items.students',
        href: '/dashboard/students', 
        icon: Users,
        badge: 2847,
        children: [
          { title: 'Liste des élèves', translationKey: 'sidebar.items.studentsList', href: '/dashboard/students' },
          { title: 'Ajouter un élève', translationKey: 'sidebar.items.studentsAdd', href: '/dashboard/students/new' },
          { title: 'Cartes scolaires', translationKey: 'sidebar.items.studentsCards', href: '/dashboard/students/cards' },
        ]
      },
      { 
        title: 'Enseignants', 
        translationKey: 'sidebar.items.teachers',
        href: '/dashboard/teachers', 
        icon: GraduationCap,
        children: [
          { title: 'Liste des enseignants', translationKey: 'sidebar.items.teachersList', href: '/dashboard/teachers' },
          { title: 'Ajouter un enseignant', translationKey: 'sidebar.items.teachersAdd', href: '/dashboard/teachers/new' },
          { title: 'Affectations', translationKey: 'sidebar.items.teachersAssignments', href: '/dashboard/teachers/assignments' },
        ]
      },
      { 
        title: 'Classes', 
        translationKey: 'sidebar.items.classes',
        href: '/dashboard/classes', 
        icon: School,
        children: [
          { title: 'Toutes les classes', translationKey: 'sidebar.items.classesList', href: '/dashboard/classes' },
          { title: 'Filières', translationKey: 'sidebar.items.classesDeps', href: '/dashboard/classes/departments' },
          { title: 'Niveaux', translationKey: 'sidebar.items.classesLevels', href: '/dashboard/classes/levels' },
        ]
      },
      { title: 'Matières', translationKey: 'sidebar.items.subjects', href: '/dashboard/subjects', icon: BookOpen },
    ]
  },
  {
    title: 'Évaluation',
    translationKey: 'sidebar.groups.evaluation',
    items: [
      { 
        title: 'Notes', 
        translationKey: 'sidebar.items.grades',
        href: '/dashboard/grades', 
        icon: ClipboardList,
        children: [
          { title: 'Saisie des notes', translationKey: 'sidebar.items.gradesEntry', href: '/dashboard/grades' },
          { title: 'Classements', translationKey: 'sidebar.items.gradesRankings', href: '/dashboard/grades/rankings' },
          { title: 'Statistiques', translationKey: 'sidebar.items.gradesStats', href: '/dashboard/grades/stats' },
        ]
      },
      { title: 'Bulletins', translationKey: 'sidebar.items.reports', href: '/dashboard/reports', icon: FileText },
      { title: 'Emploi du temps', translationKey: 'sidebar.items.schedule', href: '/dashboard/schedule', icon: Calendar },
      { title: 'Présences', translationKey: 'sidebar.items.attendance', href: '/dashboard/attendance', icon: UserCheck },
    ]
  },
  {
    title: 'Administration',
    translationKey: 'sidebar.groups.admin',
    items: [
      { 
        title: 'Finances', 
        translationKey: 'sidebar.items.finance',
        href: '/dashboard/finance', 
        icon: DollarSign,
        badge: '234',
        children: [
          { title: 'Tableau de bord', translationKey: 'sidebar.items.financeDb', href: '/dashboard/finance' },
          { title: 'Paiements', translationKey: 'sidebar.items.financePayments', href: '/dashboard/finance/payments' },
          { title: 'Factures', translationKey: 'sidebar.items.financeInvoices', href: '/dashboard/finance/invoices' },
          { title: 'Frais de scolarité', translationKey: 'sidebar.items.financeTuition', href: '/dashboard/finance/tuition' },
        ]
      },
      { title: 'Communication', translationKey: 'sidebar.items.communication', href: '/dashboard/communication', icon: MessageSquare },
      { title: 'Documents', translationKey: 'sidebar.items.documents', href: '/dashboard/documents', icon: FolderOpen },
    ]
  },
  {
    title: 'Configuration',
    translationKey: 'sidebar.groups.config',
    items: [
      { 
        title: 'Campus', 
        translationKey: 'sidebar.items.campuses',
        href: '/dashboard/campuses', 
        icon: Building2,
        children: [
          { title: 'Tous les campus', translationKey: 'sidebar.items.campusesList', href: '/dashboard/campuses' },
          { title: 'Années académiques', translationKey: 'sidebar.items.campusesYears', href: '/dashboard/campuses/years' },
        ]
      },
      { 
        title: 'Paramètres', 
        translationKey: 'sidebar.items.settings',
        href: '/dashboard/settings', 
        icon: Settings,
        children: [
          { title: 'Général', translationKey: 'sidebar.items.settingsGen', href: '/dashboard/settings' },
          { title: 'Rôles & Permissions', translationKey: 'sidebar.items.settingsRoles', href: '/dashboard/settings/roles' },
          { title: 'Intégrations', translationKey: 'sidebar.items.settingsIntegrations', href: '/dashboard/settings/integrations' },
        ]
      },
    ]
  }
]

function NavItem({ item, collapsed }: { item: NavItemType; collapsed: boolean }) {
  const pathname = usePathname()
  const { t } = useTranslation()
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
        title={t(item.translationKey, item.title)}
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
            <span className="flex-1 text-sm font-medium">{t(item.translationKey, item.title)}</span>
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
            <span className="flex-1 text-sm font-medium">{t(item.translationKey, item.title)}</span>
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
                  {t(child.translationKey, child.title)}
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
  const { t } = useTranslation()
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
              <h1 className="font-bold text-lg text-foreground">{t('sidebar.brand', 'EduCore')}</h1>
              <p className="text-xs text-muted-foreground">{t('sidebar.subBrand', 'Gestion Scolaire')}</p>
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
                            {t('sidebar.mainCampusBadge', 'Principal')}
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
                  {t(group.translationKey, group.title)}
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
              <span className="text-sm font-medium">{t('sidebar.collapseLabel', 'Réduire')}</span>
            )}
          </button>
        </div>
      </motion.aside>
    </>
  )
}
