const fs = require('fs');
const path = require('path');

const pages = [
  // Dashboard
  { path: 'app/dashboard/analytics/page.tsx', title: 'Analyses & Statistiques', icon: 'BarChart3' },
  { path: 'app/dashboard/students/cards/page.tsx', title: 'Cartes Scolaires', icon: 'Users' },
  { path: 'app/dashboard/teachers/assignments/page.tsx', title: 'Affectations Enseignants', icon: 'GraduationCap' },
  { path: 'app/dashboard/classes/departments/page.tsx', title: 'Filières', icon: 'School' },
  { path: 'app/dashboard/classes/levels/page.tsx', title: 'Niveaux', icon: 'School' },
  { path: 'app/dashboard/subjects/page.tsx', title: 'Matières', icon: 'BookOpen' },
  { path: 'app/dashboard/grades/rankings/page.tsx', title: 'Classements', icon: 'Trophy' },
  { path: 'app/dashboard/grades/stats/page.tsx', title: 'Statistiques des notes', icon: 'BarChart' },
  { path: 'app/dashboard/reports/page.tsx', title: 'Bulletins Scolaires', icon: 'FileText' },
  { path: 'app/dashboard/finance/payments/page.tsx', title: 'Paiements', icon: 'CreditCard' },
  { path: 'app/dashboard/finance/invoices/page.tsx', title: 'Factures', icon: 'FileText' },
  { path: 'app/dashboard/finance/tuition/page.tsx', title: 'Frais de scolarité', icon: 'DollarSign' },
  { path: 'app/dashboard/communication/page.tsx', title: 'Communication', icon: 'MessageSquare' },
  { path: 'app/dashboard/documents/page.tsx', title: 'Documents', icon: 'FolderOpen' },
  { path: 'app/dashboard/campuses/page.tsx', title: 'Campus', icon: 'Building2' },
  { path: 'app/dashboard/campuses/years/page.tsx', title: 'Années académiques', icon: 'Calendar' },
  { path: 'app/dashboard/settings/roles/page.tsx', title: 'Rôles & Permissions', icon: 'Shield' },
  { path: 'app/dashboard/settings/integrations/page.tsx', title: 'Intégrations', icon: 'Plug' },
  
  // Portal
  { path: 'app/portal/attendance/page.tsx', title: 'Présences', icon: 'UserCheck' },
  { path: 'app/portal/schedule/page.tsx', title: 'Emploi du temps', icon: 'Calendar' },
  { path: 'app/portal/reports/page.tsx', title: 'Bulletins', icon: 'FileText' },
  { path: 'app/portal/payments/page.tsx', title: 'Paiements', icon: 'CreditCard' },
  { path: 'app/portal/contact/page.tsx', title: 'Contact', icon: 'MessageSquare' },
];

const template = (title, icon) => `'use client'

import { motion } from 'framer-motion'
import { ${icon} } from 'lucide-react'

export default function Page() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 space-y-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
          <${icon} className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">${title}</h1>
          <p className="text-muted-foreground">Cette page est en cours de développement.</p>
        </div>
      </div>
      
      <div className="bg-card border border-border rounded-2xl p-8 text-center flex flex-col items-center justify-center min-h-[400px]">
        <${icon} className="w-16 h-16 text-muted-foreground/30 mb-4" />
        <h2 className="text-xl font-semibold mb-2">Module en construction</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Les fonctionnalités pour "${title}" seront bientôt disponibles dans la prochaine mise à jour.
        </p>
      </div>
    </motion.div>
  )
}
`;

pages.forEach(p => {
  const fullPath = path.join('c:/Users/seydiop07/Downloads/edu-core-school-system', p.path);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, template(p.title, p.icon));
  console.log('Created/Updated', fullPath);
});

// Create portal layout
const portalLayoutPath = path.join('c:/Users/seydiop07/Downloads/edu-core-school-system', 'app/portal/layout.tsx');
if (!fs.existsSync(portalLayoutPath)) {
  const portalLayoutContent = `import Link from 'next/link'
import { GraduationCap, LogOut, User, Bell } from 'lucide-react'

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      {/* Portal Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/portal" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <GraduationCap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg hidden sm:inline-block">EduCore Espace Parent</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-muted-foreground hover:bg-secondary rounded-full transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-background"></span>
            </button>
            <div className="flex items-center gap-2 border-l border-border pl-4">
              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                <User className="h-4 w-4 text-muted-foreground" />
              </div>
              <span className="text-sm font-medium hidden sm:inline-block">Parent Diallo</span>
              <Link href="/auth/login" className="p-2 text-muted-foreground hover:bg-secondary rounded-full transition-colors ml-2">
                <LogOut className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  )
}`

  fs.writeFileSync(portalLayoutPath, portalLayoutContent);
  console.log('Created', portalLayoutPath);
}

// Redirect for /dashboard/timetable to /dashboard/schedule
const timetablePath = path.join('c:/Users/seydiop07/Downloads/edu-core-school-system', 'app/dashboard/timetable/page.tsx');
if (!fs.existsSync(timetablePath)) {
  fs.mkdirSync(path.dirname(timetablePath), { recursive: true });
  fs.writeFileSync(timetablePath, `import { redirect } from 'next/navigation';

export default function TimetableRedirect() {
  redirect('/dashboard/schedule');
}
`);
  console.log('Created', timetablePath);
}
