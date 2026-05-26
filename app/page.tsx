'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { 
  GraduationCap, 
  Users, 
  BarChart3, 
  Shield, 
  Zap, 
  Globe,
  ArrowRight,
  Check,
  Star,
  Sun,
  Moon,
  ChevronDown,
  BookOpen,
  Wallet,
  Smartphone,
  LineChart,
  Award,
  MessageSquare,
  Calendar,
  Bell,
  FileText,
  CheckCircle2,
  Menu,
  X
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const features = [
  {
    icon: Users,
    title: 'Gestion des élèves',
    description: 'Gérez facilement les inscriptions, profils, dossiers et documents administratifs de tous vos élèves.'
  },
  {
    icon: BarChart3,
    title: 'Analytics avancées',
    description: 'Tableaux de bord en temps réel pour suivre les performances académiques et le taux d\'absentéisme.'
  },
  {
    icon: Shield,
    title: 'Sécurité renforcée',
    description: 'Protection des données conforme aux standards et sauvegardes automatiques toutes les heures.'
  },
  {
    icon: Zap,
    title: 'Performance optimale',
    description: 'Interface ultra rapide et fluide, même en connexion 3G/4G limitée ou avec des milliers d\'élèves.'
  },
  {
    icon: Globe,
    title: 'Multi-campus',
    description: 'Gérez plusieurs établissements scolaires depuis une seule plateforme centrale unifiée.'
  },
  {
    icon: GraduationCap,
    title: 'Gestion académique',
    description: 'Notes, bulletins scolaires automatisés, emplois du temps intelligents et cahier de texte en ligne.'
  }
]

const stats = [
  { value: '500+', label: 'Établissements' },
  { value: '250K+', label: 'Élèves gérés' },
  { value: '99.9%', label: 'Disponibilité' },
  { value: '24/7', label: 'Support & Formation' }
]

const tabs = [
  {
    id: 'pedagogie',
    label: 'Pédagogie & Bulletins',
    icon: BookOpen,
    color: 'from-blue-500 to-indigo-600',
    title: 'Suivi académique et bulletins automatisés',
    description: 'Saisissez les notes en quelques secondes, suivez le cahier de texte et générez automatiquement des bulletins scolaires irréprochables aux formats officiels.',
    points: [
      'Saisie rapide des notes sur web ou mobile',
      'Calcul automatique des moyennes et classements',
      'Configuration des coefficients et matières',
      'Impression en masse de bulletins officiels'
    ]
  },
  {
    id: 'finance',
    label: 'Finance & Mobile Money',
    icon: Wallet,
    color: 'from-emerald-500 to-teal-600',
    title: 'Gestion des scolarités et encaissement Mobile Money',
    description: 'Simplifiez la collecte des frais de scolarité. Les parents paient par Wave ou Orange Money et reçoivent instantanément leur reçu par SMS.',
    points: [
      'Intégration directe Wave, Orange Money et Free Money',
      'Relances automatiques par SMS pour les impayés',
      'Suivi en temps réel du taux de recouvrement',
      'Gestion complète de la comptabilité et des dépenses'
    ]
  },
  {
    id: 'parents',
    label: 'Portail Parents Mobile',
    icon: Smartphone,
    color: 'from-amber-500 to-orange-600',
    title: 'Une communication fluide avec les familles',
    description: 'Offrez aux parents une visibilité complète sur la scolarité de leurs enfants : notes, retards, devoirs et actualités de l\'école.',
    points: [
      'Application mobile intuitive pour les parents',
      'Notifications instantanées pour les absences ou retards',
      'Consultation en direct du cahier de texte et des devoirs',
      'Messagerie directe avec l\'administration'
    ]
  },
  {
    id: 'stats',
    label: 'Analyses & IA',
    icon: LineChart,
    color: 'from-purple-500 to-pink-600',
    title: 'Des analyses intelligentes pour votre pilotage',
    description: 'Accédez à des graphiques et des statistiques clés pour prendre les meilleures décisions pour la croissance et la qualité de votre école.',
    points: [
      'Évolution des effectifs et des inscriptions',
      'Analyses prédictives du décrochage scolaire',
      'Répartition des revenus par classe et niveau',
      'Suivi de la présence du personnel en un coup d\'œil'
    ]
  }
]

const testimonials = [
  {
    name: 'Mamadou Diallo',
    role: 'Directeur Général',
    school: 'Groupe Scolaire Sainte Marie (Dakar)',
    avatar: 'MD',
    content: 'EduCore a complètement transformé notre gestion scolaire. Le gain de temps sur la génération des bulletins est de plus de 80% et les erreurs de calcul ont totalement disparu.',
    rating: 5
  },
  {
    name: 'Mariama Sow',
    role: 'Directrice Financière',
    school: 'Complexe Éducatif d\'Oussouye (Casamance)',
    avatar: 'MS',
    content: 'Le suivi des paiements de scolarité par Mobile Money (Wave et Orange Money) nous a permis de réduire les impayés de 90%. Plus de files d\'attente interminables aux guichets !',
    rating: 5
  },
  {
    name: 'Julio Mendonça',
    role: 'Directeur des Études',
    school: 'Escola Amílcar Cabral (Bissau)',
    avatar: 'JM',
    content: 'Mesmo com conexões limitadas às vezes, a plataforma é super leve e o suporte é incrível. Acompanhar a assiduidade dos professores e alunos ficou muito fácil.',
    rating: 5
  }
]

const faqs = [
  {
    q: 'EduCore est-il facile à prendre en main pour les enseignants ?',
    a: 'Absolument. Nous avons conçu EduCore pour qu\'il soit le plus simple possible. Une formation initiale de 2 heures suffit généralement pour que tout votre personnel maîtrise les fonctionnalités de base comme l\'appel et la saisie des notes.'
  },
  {
    q: 'La plateforme fonctionne-t-elle hors-ligne en cas de coupure internet ?',
    a: 'Oui ! Notre application mobile intègre un mode hors-ligne intelligent. Les enseignants peuvent faire l\'appel ou enregistrer des notes sans internet. Les données seront automatiquement synchronisées dès qu\'une connexion sera détectée.'
  },
  {
    q: 'Comment sont sécurisées nos données d\'élèves et financières ?',
    a: 'La sécurité est notre priorité absolue. Les données sont chiffrées de bout en bout et sauvegardées automatiquement toutes les heures sur des serveurs sécurisés conformes aux normes internationales. Vous restez l\'unique propriétaire de vos données.'
  },
  {
    q: 'Comment fonctionne l\'intégration Wave et Orange Money ?',
    a: 'Lorsqu\'un paiement est dû, les parents reçoivent un lien de paiement par SMS. Ils cliquent sur le lien, paient de manière sécurisée en 2 clics avec leur compte Wave ou Orange Money, et le statut est immédiatement mis à jour sur votre tableau de bord.'
  }
]

export default function HomePage() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const [activeTab, setActiveTab] = useState('pedagogie')
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly')
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 relative overflow-hidden">
      {/* Background Grid & Ambient Blobs */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-60 pointer-events-none" />
      
      <div className="absolute top-20 left-1/4 w-[400px] h-[400px] bg-primary/5 dark:bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-accent/5 dark:bg-accent/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/10">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">EduCore</span>
            </Link>
            
            {/* Desktop menu */}
            <div className="hidden md:flex items-center gap-8">
              <Link href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Fonctionnalités
              </Link>
              <Link href="#interactive-demo" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Démo Interactive
              </Link>
              <Link href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Tarifs
              </Link>
              <Link href="#testimonials" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Témoignages
              </Link>
              <Link href="#faq" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Aide & FAQ
              </Link>
            </div>

            <div className="hidden md:flex items-center gap-3">
              {/* Theme Switcher Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="w-10 h-10 rounded-xl hover:bg-secondary transition-colors"
                aria-label="Changer de thème"
              >
                {mounted ? (
                  <motion.div
                    key={theme}
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    {theme === 'dark' ? (
                      <Sun className="h-5 w-5 text-amber-500" />
                    ) : (
                      <Moon className="h-5 w-5 text-slate-700" />
                    )}
                  </motion.div>
                ) : (
                  <div className="h-5 w-5 rounded bg-muted animate-pulse" />
                )}
              </Button>

              <Link href="/auth/login">
                <Button variant="ghost" size="sm" className="font-medium">Connexion</Button>
              </Link>
              <Link href="/auth/register">
                <Button size="sm" className="gap-2 font-medium bg-primary text-primary-foreground hover:bg-primary/95 shadow-md shadow-primary/20">
                  Démarrer <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="flex md:hidden items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="w-10 h-10 rounded-xl"
                aria-label="Changer de thème"
              >
                {mounted && theme === 'dark' ? (
                  <Sun className="h-5 w-5 text-amber-500" />
                ) : (
                  <Moon className="h-5 w-5 text-slate-700" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="w-10 h-10 rounded-xl"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile menu panel */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-b border-border bg-background"
            >
              <div className="px-4 pt-2 pb-6 space-y-3">
                <Link
                  href="#features"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-base font-medium text-muted-foreground hover:text-foreground hover:bg-secondary"
                >
                  Fonctionnalités
                </Link>
                <Link
                  href="#interactive-demo"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-base font-medium text-muted-foreground hover:text-foreground hover:bg-secondary"
                >
                  Démo Interactive
                </Link>
                <Link
                  href="#pricing"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-base font-medium text-muted-foreground hover:text-foreground hover:bg-secondary"
                >
                  Tarifs
                </Link>
                <Link
                  href="#testimonials"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-base font-medium text-muted-foreground hover:text-foreground hover:bg-secondary"
                >
                  Témoignages
                </Link>
                <Link
                  href="#faq"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-base font-medium text-muted-foreground hover:text-foreground hover:bg-secondary"
                >
                  Aide & FAQ
                </Link>
                <div className="pt-4 border-t border-border flex flex-col gap-2">
                  <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full justify-center">Connexion</Button>
                  </Link>
                  <Link href="/auth/register" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full justify-center">Démarrer</Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-semibold mb-8 border border-primary/20 backdrop-blur-md shadow-sm">
              <Star className="h-4 w-4 fill-primary" />
              La plateforme #1 de gestion scolaire au Sénégal et en Guinée-Bissau
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
              Pilotez votre école avec{' '}
              <span className="gradient-text font-black bg-gradient-to-r from-primary to-accent">excellence</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              EduCore unifie la gestion académique, la vie scolaire, les relevés de notes et la facturation Mobile Money. La solution préférée des directeurs d&apos;établissements d&apos;Afrique de l&apos;Ouest.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/auth/register" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto gap-2 h-14 px-8 text-base font-semibold shadow-lg shadow-primary/20 bg-primary text-primary-foreground hover:bg-primary/95">
                  Essayer gratuitement <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="#interactive-demo" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto h-14 px-8 text-base font-semibold border-border hover:bg-secondary">
                  Voir la démo interactive
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Premium Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-16 relative mx-auto max-w-5xl"
          >
            {/* Ambient glows behind mockup */}
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary to-accent opacity-10 blur-xl group-hover:opacity-20 transition duration-1000" />
            
            <div className="bg-card border border-border/80 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-md">
              {/* Browser control header */}
              <div className="bg-secondary/60 px-4 py-3.5 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 rounded-full bg-red-500/80" />
                  <div className="w-3.5 h-3.5 rounded-full bg-yellow-500/80" />
                  <div className="w-3.5 h-3.5 rounded-full bg-green-500/80" />
                </div>
                <div className="bg-background/80 px-10 py-1 rounded-md text-xs text-muted-foreground border border-border max-w-xs truncate">
                  app.educore-school.com/dashboard
                </div>
                <div className="w-12" /> {/* spacer */}
              </div>

              {/* Mockup content */}
              <div className="p-6 sm:p-8 bg-gradient-to-br from-background to-secondary/15">
                {/* Metric grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  {[
                    { label: 'Total Élèves', value: '2,847', color: 'text-blue-600 dark:text-blue-400', pct: '+12% ce mois' },
                    { label: 'Enseignants Actifs', value: '156', color: 'text-purple-600 dark:text-purple-400', pct: 'Taux présence 98%' },
                    { label: 'Revenus Recouvrés', value: '18,48M F CFA', color: 'text-emerald-600 dark:text-emerald-400', pct: '88% de scolarités' },
                    { label: 'Présence Élèves', value: '96.2%', color: 'text-amber-600 dark:text-amber-400', pct: 'Aujourd\'hui' }
                  ].map((stat, i) => (
                    <div key={i} className="bg-card border border-border/60 rounded-xl p-5 shadow-sm transition-transform hover:-translate-y-1 duration-200">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                      <p className={`text-2xl sm:text-3xl font-extrabold my-2 ${stat.color}`}>{stat.value}</p>
                      <span className="text-[10px] sm:text-xs font-medium text-emerald-500 flex items-center gap-1">
                        <Check className="h-3.5 w-3.5" /> {stat.pct}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Sub-grid with visual graphs */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Performance chart widget */}
                  <div className="lg:col-span-2 bg-card border border-border/60 rounded-xl p-5 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-sm font-bold">Évolution des Inscriptions & Rentrées Financières</h4>
                      <span className="text-xs text-muted-foreground bg-secondary px-2.5 py-1 rounded-md font-medium">Année Scolaire 2025-2026</span>
                    </div>
                    <div className="h-48 flex items-end justify-between gap-3 pt-6 border-b border-border/80 pb-2">
                      {[
                        { h: '30%', label: 'Oct' },
                        { h: '55%', label: 'Nov' },
                        { h: '75%', label: 'Déc' },
                        { h: '65%', label: 'Jan' },
                        { h: '85%', label: 'Fév' },
                        { h: '90%', label: 'Mar' },
                        { h: '98%', label: 'Avr' }
                      ].map((item, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                          <div className="w-full relative group">
                            <motion.div 
                              initial={{ height: 0 }}
                              animate={{ height: item.h }}
                              transition={{ duration: 1, delay: i * 0.1 }}
                              className="w-full bg-gradient-to-t from-primary/90 to-primary rounded-t-md relative"
                            >
                              <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-foreground text-background text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-bold">
                                {item.h}
                              </div>
                            </motion.div>
                          </div>
                          <span className="text-[10px] sm:text-xs text-muted-foreground font-semibold">{item.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right side widgets (Recent events & wave/om stats) */}
                  <div className="bg-card border border-border/60 rounded-xl p-5 shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-sm font-bold">Encaissements Live</h4>
                        <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      </div>
                      <div className="space-y-3">
                        {[
                          { parent: 'Dr. Cissé', method: 'Wave', sum: '150,000 CFA', time: 'Il y a 3 min' },
                          { parent: 'Mme. Diop', method: 'Orange Money', sum: '45,000 CFA', time: 'Il y a 12 min' },
                          { parent: 'M. Touré', method: 'Wave', sum: '80,000 CFA', time: 'Il y a 45 min' }
                        ].map((tx, idx) => (
                          <div key={idx} className="flex items-center justify-between text-xs py-2 border-b border-border/40 last:border-0">
                            <div>
                              <p className="font-semibold">{tx.parent}</p>
                              <p className="text-[10px] text-muted-foreground">via {tx.method}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-emerald-600 dark:text-emerald-400">+{tx.sum}</p>
                              <p className="text-[9px] text-muted-foreground">{tx.time}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs">
                      <span className="text-muted-foreground font-medium">Objectif mensuel de collecte :</span>
                      <span className="font-bold text-primary">85% atteint</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Fade effect at the bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none z-10" />
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-secondary/40 border-y border-border transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <p className="text-3xl sm:text-4xl font-extrabold gradient-text bg-gradient-to-r from-primary to-accent">{stat.value}</p>
                <p className="text-sm font-medium text-muted-foreground mt-1.5">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Showcase Section */}
      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 tracking-tight">
              Tout ce dont vous avez besoin pour réussir
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg">
              Une suite complète d&apos;outils pensés pour simplifier la vie de l&apos;administration, des enseignants et des parents.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                className="bg-card border border-border/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-lg mb-2.5">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Demonstration Section (Tabs) */}
      <section id="interactive-demo" className="py-24 bg-secondary/25 border-y border-border transition-colors duration-300 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 tracking-tight">
              Découvrez la simplicité d&apos;EduCore
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg">
              Explorez nos modules à travers notre simulateur interactif. Cliquez sur les différents onglets pour voir comment la plateforme s&apos;adapte.
            </p>
          </div>

          {/* Interactive tabs navigation */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20 scale-105'
                    : 'bg-card border border-border hover:bg-secondary text-muted-foreground hover:text-foreground'
                }`}
              >
                <tab.icon className="h-4.5 w-4.5" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab content panel */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Info side */}
            <div className="lg:col-span-5 space-y-6">
              <AnimatePresence mode="wait">
                {tabs.map((tab) => tab.id === activeTab && (
                  <motion.div
                    key={tab.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-5"
                  >
                    <span className="text-xs font-bold uppercase tracking-wider text-primary px-3 py-1 bg-primary/10 rounded-full">
                      Module Intelligent
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                      {tab.title}
                    </h3>
                    <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                      {tab.description}
                    </p>
                    <ul className="space-y-3.5">
                      {tab.points.map((pt, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm">
                          <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mt-0.5 shrink-0">
                            <Check className="h-3.5 w-3.5 stroke-[3]" />
                          </div>
                          <span className="text-foreground/90 font-medium">{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Right Interactive Mockup side */}
            <div className="lg:col-span-7 bg-card border border-border/80 rounded-2xl shadow-xl p-5 sm:p-6 overflow-hidden h-[420px] relative flex flex-col">
              <div className="flex items-center justify-between border-b border-border/60 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/70" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <div className="w-3 h-3 rounded-full bg-green-500/70" />
                </div>
                <div className="text-[11px] font-bold text-muted-foreground tracking-wider uppercase flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  Visualisation Live
                </div>
              </div>

              <div className="flex-1 overflow-y-auto relative pr-1">
                <AnimatePresence mode="wait">
                  {activeTab === 'pedagogie' && (
                    <motion.div
                      key="pedagogie-demo"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      {/* Sub-header inside preview */}
                      <div className="bg-secondary/40 p-3.5 rounded-xl flex items-center justify-between">
                        <div>
                          <p className="text-xs text-muted-foreground">Classe</p>
                          <p className="text-sm font-bold">Troisième A (3ème A)</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">Moyenne Générale</p>
                          <p className="text-sm font-extrabold text-indigo-600 dark:text-indigo-400">14.65 / 20</p>
                        </div>
                      </div>

                      {/* Mockup Table */}
                      <div className="border border-border/50 rounded-xl overflow-hidden text-xs bg-card">
                        <div className="grid grid-cols-12 bg-secondary/30 p-2.5 font-bold border-b border-border/50 text-muted-foreground">
                          <div className="col-span-5">Nom de l&apos;élève</div>
                          <div className="col-span-3 text-center">Maths (Coeff 4)</div>
                          <div className="col-span-2 text-center">Français</div>
                          <div className="col-span-2 text-right">Moyenne</div>
                        </div>
                        {[
                          { name: 'Aicha Diop', m: '18.5', f: '16.0', avg: '17.25', badge: '1ère', badgeColor: 'bg-emerald-500/10 text-emerald-600' },
                          { name: 'Boubacar Camara', m: '14.0', f: '15.5', avg: '14.75', badge: '4ème', badgeColor: 'bg-blue-500/10 text-blue-600' },
                          { name: 'Moussa Ndiaye', m: '11.0', f: '13.0', avg: '12.00', badge: '11ème', badgeColor: 'bg-slate-500/10 text-slate-600' }
                        ].map((student, idx) => (
                          <div key={idx} className="grid grid-cols-12 p-3 border-b border-border/30 last:border-0 items-center">
                            <div className="col-span-5 font-semibold flex items-center gap-2">
                              <span className="w-6 h-6 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-[10px]">
                                {student.name[0]}
                              </span>
                              <div>
                                <p>{student.name}</p>
                                <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${student.badgeColor}`}>{student.badge}</span>
                              </div>
                            </div>
                            <div className="col-span-3 text-center font-medium">{student.m}</div>
                            <div className="col-span-2 text-center font-medium">{student.f}</div>
                            <div className="col-span-2 text-right font-bold text-primary">{student.avg}</div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'finance' && (
                    <motion.div
                      key="finance-demo"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      {/* Metric widgets */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
                          <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">Total Encaissé</p>
                          <p className="text-lg sm:text-xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">12,845,000 CFA</p>
                          <div className="mt-2 w-full bg-emerald-500/10 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-emerald-500 h-full rounded-full" style={{ width: '84%' }} />
                          </div>
                        </div>
                        <div className="bg-red-500/5 dark:bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                          <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">Impayés Restants</p>
                          <p className="text-lg sm:text-xl font-extrabold text-red-600 dark:text-red-400 mt-1">2,450,000 CFA</p>
                          <div className="mt-2 w-full bg-red-500/10 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-red-500 h-full rounded-full" style={{ width: '16%' }} />
                          </div>
                        </div>
                      </div>

                      {/* Wave/OM Transactions */}
                      <div className="space-y-2.5">
                        <p className="text-xs font-bold text-muted-foreground uppercase">Paiements Récents (Mobile Money)</p>
                        {[
                          { label: 'Wave', amount: '120,000 F CFA', detail: 'Frais Inscription - Aicha Diop', date: 'Aujourd\'hui 10:24', status: 'Payé', statusColor: 'bg-emerald-500/10 text-emerald-600' },
                          { label: 'Orange Money', amount: '45,000 F CFA', detail: 'Mensualité Mai - Boubacar Camara', date: 'Aujourd\'hui 08:15', status: 'Payé', statusColor: 'bg-emerald-500/10 text-emerald-600' },
                          { label: 'Wave', amount: '120,000 F CFA', detail: 'Frais Inscription - Moussa Ndiaye', date: 'Hier 16:45', status: 'Payé', statusColor: 'bg-emerald-500/10 text-emerald-600' }
                        ].map((item, idx) => (
                          <div key={idx} className="bg-card border border-border/50 rounded-xl p-3 flex items-center justify-between text-xs">
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-[10px] ${
                                item.label === 'Wave' ? 'bg-blue-500/10 text-blue-600' : 'bg-orange-500/10 text-orange-600'
                              }`}>
                                {item.label[0]}
                              </div>
                              <div>
                                <p className="font-bold">{item.detail}</p>
                                <p className="text-[10px] text-muted-foreground">{item.date} • via {item.label}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-extrabold text-emerald-600 dark:text-emerald-400">{item.amount}</p>
                              <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${item.statusColor}`}>{item.status}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'parents' && (
                    <motion.div
                      key="parents-demo"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center justify-center h-full pb-4"
                    >
                      {/* Mobile viewport frame mockup */}
                      <div className="w-64 h-[320px] rounded-2xl border-4 border-slate-700 bg-slate-900 text-white relative shadow-lg overflow-hidden flex flex-col">
                        {/* Mobile Status Bar */}
                        <div className="bg-slate-950 px-3 py-1 flex items-center justify-between text-[8px] font-semibold text-slate-400">
                          <span>12:30</span>
                          <div className="flex items-center gap-1">
                            <span>4G</span>
                            <div className="w-3 h-1.5 bg-slate-400 rounded-sm" />
                          </div>
                        </div>
                        
                        {/* App header */}
                        <div className="bg-slate-800 p-2.5 border-b border-slate-700 flex items-center justify-between">
                          <span className="text-[10px] font-bold text-slate-100 flex items-center gap-1">
                            <GraduationCap className="h-3.5 w-3.5 text-primary" />
                            EduCore Parent
                          </span>
                          <div className="relative">
                            <Bell className="h-3 w-3 text-slate-400" />
                            <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-red-500 rounded-full" />
                          </div>
                        </div>

                        {/* Notifications Feed */}
                        <div className="flex-1 p-2 space-y-2 overflow-y-auto text-[9px]">
                          <div className="bg-slate-800/80 p-2 rounded-lg border border-slate-700">
                            <div className="flex items-center justify-between mb-1 font-bold text-slate-200">
                              <span>📝 Relevé disponible</span>
                              <span className="text-[8px] text-slate-400">À l&apos;instant</span>
                            </div>
                            <p className="text-slate-300">Le bulletin de notes du 2ème Trimestre de Aicha est disponible en téléchargement.</p>
                          </div>
                          
                          <div className="bg-slate-800/80 p-2 rounded-lg border border-slate-700">
                            <div className="flex items-center justify-between mb-1 font-bold text-slate-200">
                              <span>📅 Devoir à faire</span>
                              <span className="text-[8px] text-slate-400">1h de retard</span>
                            </div>
                            <p className="text-slate-300">Histoire-Géo : Apprendre le chapitre 4 pour le Lundi 28 Mai.</p>
                          </div>

                          <div className="bg-slate-800/80 p-2 rounded-lg border border-slate-700">
                            <div className="flex items-center justify-between mb-1 font-bold text-slate-200">
                              <span>🔔 Notification d&apos;appel</span>
                              <span className="text-[8px] text-slate-400">Hier</span>
                            </div>
                            <p className="text-slate-300">Aicha a été marquée absente au cours d&apos;Anglais de 08:00.</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'stats' && (
                    <motion.div
                      key="stats-demo"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      {/* Simulated Chart Graph */}
                      <div className="bg-secondary/40 p-4 rounded-xl border border-border/50">
                        <div className="flex items-center justify-between mb-3">
                          <p className="text-xs font-bold">Répartition Filles / Garçons par Niveau</p>
                          <span className="text-[10px] text-muted-foreground">Total: 856 Élèves</span>
                        </div>
                        
                        <div className="space-y-3">
                          {[
                            { level: 'Primaire', boys: 120, girls: 140, total: 260 },
                            { level: 'Collège', boys: 156, girls: 164, total: 320 },
                            { level: 'Lycée', boys: 160, girls: 116, total: 276 }
                          ].map((item, idx) => (
                            <div key={idx} className="space-y-1 text-[11px]">
                              <div className="flex items-center justify-between">
                                <span className="font-semibold">{item.level}</span>
                                <span className="text-muted-foreground text-[10px]">{item.total} élèves</span>
                              </div>
                              <div className="w-full h-3 bg-secondary rounded-full overflow-hidden flex">
                                <div className="bg-indigo-500 h-full" style={{ width: `${(item.boys / item.total) * 100}%` }} title="Garçons" />
                                <div className="bg-pink-500 h-full" style={{ width: `${(item.girls / item.total) * 100}%` }} title="Filles" />
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Chart Legend */}
                        <div className="flex justify-center gap-6 mt-4 text-[10px] font-semibold text-muted-foreground">
                          <span className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 bg-indigo-500 rounded-sm" />
                            Garçons (51%)
                          </span>
                          <span className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 bg-pink-500 rounded-sm" />
                            Filles (49%)
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              Des tarifs simples et transparents
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto mb-8">
              Sélectionnez le forfait adapté à la taille de votre établissement. Profitez de 30 jours d&apos;essai gratuit.
            </p>

            {/* Toggle Billing switch */}
            <div className="flex items-center justify-center gap-3">
              <span className={`text-sm font-semibold ${billingCycle === 'monthly' ? 'text-foreground' : 'text-muted-foreground'}`}>Mensuel</span>
              <button
                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                className="w-12 h-6.5 rounded-full bg-primary/20 p-1 transition-colors duration-200 cursor-pointer relative flex items-center"
              >
                <div
                  className={`w-4.5 h-4.5 rounded-full bg-primary transition-transform duration-200 ${
                    billingCycle === 'yearly' ? 'translate-x-5.5' : 'translate-x-0'
                  }`}
                />
              </button>
              <span className={`text-sm font-semibold flex items-center gap-1.5 ${billingCycle === 'yearly' ? 'text-foreground' : 'text-muted-foreground'}`}>
                Annuel
                <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                  -20%
                </span>
              </span>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-5xl mx-auto">
            {/* Plan 1 */}
            <div className="bg-card border border-border/80 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-sm relative">
              <div>
                <h3 className="text-xl font-bold">Pack Primaire</h3>
                <p className="text-xs text-muted-foreground mt-2">Pour les écoles primaires de petite taille.</p>
                <div className="my-6">
                  <span className="text-3xl sm:text-4xl font-extrabold text-foreground">
                    {billingCycle === 'yearly' ? '12 000' : '15 000'} F CFA
                  </span>
                  <span className="text-xs text-muted-foreground font-semibold"> / mois</span>
                  {billingCycle === 'yearly' && (
                    <p className="text-[10px] text-primary font-bold mt-1">Facturé 144 000 F CFA à l&apos;année</p>
                  )}
                </div>
                <hr className="border-border/60 my-6" />
                <ul className="space-y-3.5 text-xs text-muted-foreground font-medium">
                  <li className="flex items-center gap-2">
                    <Check className="h-4.5 w-4.5 text-emerald-500 shrink-0" />
                    Jusqu&apos;à 300 élèves
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4.5 w-4.5 text-emerald-500 shrink-0" />
                    Saisie des notes & Bulletins
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4.5 w-4.5 text-emerald-500 shrink-0" />
                    Appel & Absences
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4.5 w-4.5 text-emerald-500 shrink-0" />
                    Support email standard
                  </li>
                </ul>
              </div>
              <Link href="/auth/register" className="mt-8">
                <Button variant="outline" className="w-full justify-center">Démarrer l&apos;essai gratuit</Button>
              </Link>
            </div>

            {/* Plan 2 (Popular) */}
            <div className="bg-card border-2 border-primary rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-md relative scale-100 lg:scale-105">
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[10px] uppercase font-bold tracking-wider px-3.5 py-1 rounded-full shadow-sm">
                Recommandé
              </span>
              <div>
                <h3 className="text-xl font-bold">Pack Collège & Lycée</h3>
                <p className="text-xs text-muted-foreground mt-2">La formule complète pour une gestion robuste.</p>
                <div className="my-6">
                  <span className="text-3xl sm:text-4xl font-extrabold text-foreground">
                    {billingCycle === 'yearly' ? '28 000' : '35 000'} F CFA
                  </span>
                  <span className="text-xs text-muted-foreground font-semibold"> / mois</span>
                  {billingCycle === 'yearly' && (
                    <p className="text-[10px] text-primary font-bold mt-1">Facturé 336 000 F CFA à l&apos;année</p>
                  )}
                </div>
                <hr className="border-border/60 my-6" />
                <ul className="space-y-3.5 text-xs text-muted-foreground font-medium">
                  <li className="flex items-center gap-2 text-foreground">
                    <Check className="h-4.5 w-4.5 text-emerald-500 shrink-0" />
                    Jusqu&apos;à 1500 élèves
                  </li>
                  <li className="flex items-center gap-2 text-foreground">
                    <Check className="h-4.5 w-4.5 text-emerald-500 shrink-0" />
                    Tout le pack Primaire
                  </li>
                  <li className="flex items-center gap-2 text-foreground">
                    <Check className="h-4.5 w-4.5 text-emerald-500 shrink-0" />
                    Gestion Wave / Orange Money
                  </li>
                  <li className="flex items-center gap-2 text-foreground">
                    <Check className="h-4.5 w-4.5 text-emerald-500 shrink-0" />
                    Portail Parents Mobile
                  </li>
                  <li className="flex items-center gap-2 text-foreground">
                    <Check className="h-4.5 w-4.5 text-emerald-500 shrink-0" />
                    Alertes SMS automatisées
                  </li>
                  <li className="flex items-center gap-2 text-foreground">
                    <Check className="h-4.5 w-4.5 text-emerald-500 shrink-0" />
                    Support WhatsApp 6j/7
                  </li>
                </ul>
              </div>
              <Link href="/auth/register" className="mt-8">
                <Button className="w-full justify-center bg-primary text-primary-foreground hover:bg-primary/95 shadow-md shadow-primary/25">Démarrer l&apos;essai gratuit</Button>
              </Link>
            </div>

            {/* Plan 3 */}
            <div className="bg-card border border-border/80 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-sm relative">
              <div>
                <h3 className="text-xl font-bold">Pack Institutionnel</h3>
                <p className="text-xs text-muted-foreground mt-2">Pour universités ou groupes scolaires multi-campus.</p>
                <div className="my-6">
                  <span className="text-3xl sm:text-4xl font-extrabold text-foreground">
                    Sur Mesure
                  </span>
                  <p className="text-xs text-muted-foreground font-semibold mt-1">Tarifs adaptés selon besoins</p>
                </div>
                <hr className="border-border/60 my-6" />
                <ul className="space-y-3.5 text-xs text-muted-foreground font-medium">
                  <li className="flex items-center gap-2">
                    <Check className="h-4.5 w-4.5 text-emerald-500 shrink-0" />
                    Élèves illimités
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4.5 w-4.5 text-emerald-500 shrink-0" />
                    Multi-établissements / Multi-campus
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4.5 w-4.5 text-emerald-500 shrink-0" />
                    Nom de domaine personnalisé
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4.5 w-4.5 text-emerald-500 shrink-0" />
                    SLA et disponibilité de 99.9%
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4.5 w-4.5 text-emerald-500 shrink-0" />
                    Gestionnaire de compte dédié
                  </li>
                </ul>
              </div>
              <Link href="/contact" className="mt-8">
                <Button variant="outline" className="w-full justify-center">Contacter l&apos;équipe</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-secondary/25 border-y border-border transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              Ils font confiance à EduCore
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto">
              Découvrez les témoignages des directeurs d&apos;établissements qui digitalisent leur quotidien.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((t, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="bg-card border border-border/80 rounded-2xl p-6 shadow-sm flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex gap-1 text-amber-500">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="h-4.5 w-4.5 fill-current" />
                    ))}
                  </div>
                  <p className="text-foreground/90 font-medium italic text-sm leading-relaxed">&ldquo;{t.content}&rdquo;</p>
                </div>
                
                <div className="flex items-center gap-3.5 mt-6 pt-5 border-t border-border/60">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-extrabold text-xs shadow-sm">
                    {t.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-foreground">{t.name}</h4>
                    <p className="text-[10px] text-muted-foreground font-semibold">{t.role} • {t.school}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section id="faq" className="py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            Questions Fréquentes
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">
            Trouvez les réponses aux questions les plus courantes sur le fonctionnement de la plateforme EduCore.
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index
            return (
              <div
                key={index}
                className="bg-card border border-border/80 rounded-2xl overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left font-bold text-sm sm:text-base transition-colors hover:bg-secondary/40 cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="h-4.5 w-4.5 text-muted-foreground" />
                  </motion.div>
                </button>
                
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-primary/10 via-primary/5 to-accent/15 border border-primary/20 rounded-3xl p-8 sm:p-14 text-center relative overflow-hidden shadow-sm"
          >
            {/* Floating details inside card */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/10 rounded-full blur-2xl pointer-events-none" />

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4 text-foreground">
              Prêt à moderniser votre école ?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
              Rejoignez plus de 500 établissements scolaires qui font confiance à EduCore pour gérer sereinement leur scolarité et leurs finances.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/auth/register" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto gap-2 h-13 px-8 text-base font-semibold shadow-md shadow-primary/20 bg-primary text-primary-foreground hover:bg-primary/95">
                  Démarrer l&apos;essai gratuit <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/contact" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto h-13 px-8 text-base font-semibold border-border hover:bg-secondary">
                  Demander une démo privée
                </Button>
              </Link>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 mt-10 text-xs text-muted-foreground font-semibold">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500 fill-emerald-500/10" />
                Essai gratuit de 30 jours
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500 fill-emerald-500/10" />
                Aucune carte bancaire requise
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500 fill-emerald-500/10" />
                Installation en 24h
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1 space-y-4">
              <Link href="/" className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-md shadow-primary/10">
                  <GraduationCap className="h-6 w-6 text-white" />
                </div>
                <span className="font-bold text-xl tracking-tight">EduCore</span>
              </Link>
              <p className="text-xs text-muted-foreground leading-relaxed max-w-xs">
                La plateforme ERP scolaire cloud de référence en Afrique de l&apos;Ouest (Sénégal, Guinée-Bissau).
              </p>
            </div>
            <div>
              <h4 className="font-bold text-sm mb-4 text-foreground">Produit</h4>
              <ul className="space-y-2.5 text-xs text-muted-foreground font-medium">
                <li><Link href="#features" className="hover:text-foreground transition-colors">Fonctionnalités</Link></li>
                <li><Link href="#pricing" className="hover:text-foreground transition-colors">Tarifs & Forfaits</Link></li>
                <li><Link href="#interactive-demo" className="hover:text-foreground transition-colors">Démo Interactive</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-sm mb-4 text-foreground">Développement</h4>
              <ul className="space-y-2.5 text-xs text-muted-foreground font-medium">
                <li><Link href="#" className="hover:text-foreground transition-colors">À propos d&apos;EduCore</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Blog & Actualités</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Nous Contacter</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-sm mb-4 text-foreground">Légal</h4>
              <ul className="space-y-2.5 text-xs text-muted-foreground font-medium">
                <li><Link href="#" className="hover:text-foreground transition-colors">Confidentialité des données</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Conditions Générales (CGU)</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Mentions Légales</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground font-semibold">
              © 2026 EduCore. Tous droits réservés.
            </p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground font-semibold">
              <span>Bureaux : Dakar, Sénégal • Bissau, Guinée-Bissau</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
