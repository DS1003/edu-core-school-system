'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { 
  Building2, 
  MapPin, 
  GraduationCap, 
  DollarSign, 
  Users,
  Check,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Loader2,
  Plus,
  Trash2,
  Globe,
  Phone,
  Calendar,
  Wallet,
  BookOpen,
  Award,
  Zap,
  Sparkles
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

const steps = [
  { id: 1, title: 'Groupe scolaire', icon: Building2, description: 'Informations de base' },
  { id: 2, title: 'Campus', icon: MapPin, description: 'Ajoutez vos campus' },
  { id: 3, title: 'Configuration académique', icon: GraduationCap, description: 'Année et niveaux' },
  { id: 4, title: 'Configuration financière', icon: DollarSign, description: 'Frais de scolarité' },
  { id: 5, title: 'Inviter des admins', icon: Users, description: 'Ajoutez votre équipe' },
]

export default function OnboardingPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  
  // Step 1 states
  const [schoolName, setSchoolName] = useState('')
  const [country, setCountry] = useState('senegal')
  const [address, setAddress] = useState('')
  const [phonePrefix, setPhonePrefix] = useState('+221')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [website, setWebsite] = useState('')

  // Step 2 states
  const [campuses, setCampuses] = useState([
    { name: 'Campus Principal', city: 'Dakar', address: 'Avenue Cheikh Anta Diop' }
  ])

  // Step 3 states
  const [startDate, setStartDate] = useState('2025-10-01')
  const [endDate, setEndDate] = useState('2026-07-15')
  const [selectedLevels, setSelectedLevels] = useState<string[]>(['Collège', 'Lycée'])
  const [gradingSystem, setGradingSystem] = useState('20')

  // Step 4 states
  const [currency, setCurrency] = useState('XOF')
  const [paymentMethods, setPaymentMethods] = useState<string[]>(['cash', 'mobile', 'bank'])
  const [paymentFrequency, setPaymentFrequency] = useState('monthly')

  // Step 5 states
  const [admins, setAdmins] = useState([
    { email: '', role: 'admin' }
  ])

  // Sync phone prefix when country changes
  useEffect(() => {
    if (country === 'senegal') {
      setPhonePrefix('+221')
    } else if (country === 'guinea-bissau') {
      setPhonePrefix('+245')
    }
  }, [country])

  const addCampus = () => {
    setCampuses([...campuses, { name: '', city: '', address: '' }])
  }

  const removeCampus = (index: number) => {
    if (campuses.length > 1) {
      setCampuses(campuses.filter((_, i) => i !== index))
    }
  }

  const addAdmin = () => {
    setAdmins([...admins, { email: '', role: 'admin' }])
  }

  const removeAdmin = (index: number) => {
    if (admins.length > 1) {
      setAdmins(admins.filter((_, i) => i !== index))
    }
  }

  const toggleLevel = (level: string) => {
    if (selectedLevels.includes(level)) {
      setSelectedLevels(selectedLevels.filter(l => l !== level))
    } else {
      setSelectedLevels([...selectedLevels, level])
    }
  }

  const togglePaymentMethod = (method: string) => {
    if (paymentMethods.includes(method)) {
      setPaymentMethods(paymentMethods.filter(m => m !== method))
    } else {
      setPaymentMethods([...paymentMethods, method])
    }
  }

  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const finishSetup = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex transition-colors duration-300 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 dark:bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 dark:bg-accent/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Sidebar Progress */}
      <div className="hidden lg:flex lg:w-80 bg-card border-r border-border flex-col p-8 z-10 select-none">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/10">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          <span className="font-extrabold text-xl tracking-tight">EduCore</span>
        </div>

        <div className="flex-1 space-y-6">
          <div>
            <h2 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">
              Configuration initiale
            </h2>
            <p className="text-xs text-muted-foreground">Suivez les étapes pour configurer votre établissement en 2 minutes.</p>
          </div>
          
          <nav className="space-y-3">
            {steps.map((step) => {
              const isCompleted = currentStep > step.id
              const isActive = currentStep === step.id
              
              return (
                <div
                  key={step.id}
                  className={cn(
                    "flex items-center gap-4 p-3 rounded-xl transition-all duration-200 border",
                    isActive 
                      ? "bg-primary/5 border-primary/20 shadow-sm" 
                      : "border-transparent",
                    isCompleted && "opacity-80"
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center text-sm font-semibold transition-all duration-200 shrink-0",
                    isActive && "bg-primary text-primary-foreground shadow-md shadow-primary/15 scale-105",
                    isCompleted && "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20",
                    !isActive && !isCompleted && "bg-secondary text-muted-foreground border border-border"
                  )}>
                    {isCompleted ? (
                      <Check className="h-4 w-4 stroke-[3]" />
                    ) : (
                      step.id
                    )}
                  </div>
                  <div>
                    <p className={cn(
                      "text-xs font-bold leading-none mb-1 transition-colors",
                      isActive ? "text-foreground" : "text-muted-foreground"
                    )}>
                      {step.title}
                    </p>
                    <p className="text-[10px] text-muted-foreground font-medium">{step.description}</p>
                  </div>
                </div>
              )
            })}
          </nav>
        </div>

        <div className="pt-6 border-t border-border flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary shrink-0" />
          <p className="text-[10px] text-muted-foreground font-medium leading-relaxed">
            Besoin d&apos;aide? Écrivez-nous à <span className="font-bold text-foreground">support@educore.sn</span>
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col z-10">
        {/* Mobile Header / Progress Bar */}
        <div className="lg:hidden p-5 border-b border-border bg-card">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <GraduationCap className="h-5.5 w-5.5 text-white" />
              </div>
              <span className="font-extrabold tracking-tight">EduCore</span>
            </div>
            <span className="text-xs font-bold text-muted-foreground bg-secondary px-2.5 py-1 rounded-md border border-border">
              Étape {currentStep} / 5
            </span>
          </div>
          {/* Progress bar */}
          <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-500"
              style={{ width: `${(currentStep / 5) * 100}%` }}
            />
          </div>
        </div>

        {/* Form Content Wrapper */}
        <div className="flex-1 p-6 sm:p-10 lg:p-16 overflow-y-auto flex items-center justify-center">
          <div className="max-w-xl w-full">
            <AnimatePresence mode="wait">
              {/* Step 1: School Group Info */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-primary px-3 py-1 bg-primary/10 rounded-full">
                      Étape 1 • Informations Générales
                    </span>
                    <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-3 mb-2">Informations du groupe scolaire</h1>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Entrez les détails administratifs fondamentaux de votre groupe scolaire pour commencer.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-foreground">Nom du groupe scolaire</label>
                      <Input
                        value={schoolName}
                        onChange={(e) => setSchoolName(e.target.value)}
                        placeholder="Ex: Groupe Scolaire Excellence Africaine"
                        className="h-11 border-border/80 focus-visible:ring-primary/30"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-foreground">Pays</label>
                        <div className="relative">
                          <select
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            className="w-full h-11 rounded-lg border border-border/80 bg-background hover:bg-secondary/40 px-3 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none cursor-pointer"
                          >
                            <option value="senegal">🇸🇳 Sénégal</option>
                            <option value="guinea-bissau">🇬🇼 Guinée-Bissau</option>
                          </select>
                          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
                            <ChevronDown className="h-4 w-4" />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-foreground">Adresse du siège</label>
                        <div className="relative">
                          <Input
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Ex: Fann Résidence, Dakar"
                            className="h-11 pl-9 border-border/80 focus-visible:ring-primary/30"
                          />
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-foreground">Téléphone</label>
                        <div className="flex gap-2">
                          <span className="inline-flex items-center justify-center px-3 rounded-lg border border-border/80 bg-secondary/30 text-xs font-bold select-none shrink-0 min-w-[56px]">
                            {phonePrefix}
                          </span>
                          <Input
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="77 123 45 67"
                            className="h-11 border-border/80 focus-visible:ring-primary/30"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-foreground">Site web <span className="text-muted-foreground font-normal">(Optionnel)</span></label>
                        <div className="relative">
                          <Input
                            value={website}
                            onChange={(e) => setWebsite(e.target.value)}
                            placeholder="Ex: www.excellence.edu.sn"
                            className="h-11 pl-9 border-border/80 focus-visible:ring-primary/30"
                          />
                          <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Campuses Configuration */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-primary px-3 py-1 bg-primary/10 rounded-full">
                      Étape 2 • Infrastructures
                    </span>
                    <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-3 mb-2">Ajoutez vos campus</h1>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Configurez les implantations physiques ou bâtiments de votre groupe scolaire.
                    </p>
                  </div>

                  <div className="space-y-4 max-h-[350px] overflow-y-auto pr-1">
                    {campuses.map((campus, index) => (
                      <div key={index} className="p-4 sm:p-5 bg-card border border-border/80 rounded-xl space-y-4 shadow-sm relative group">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-primary flex items-center gap-1.5 bg-primary/5 px-2.5 py-1 rounded-md">
                            <Building2 className="h-3.5 w-3.5" /> Campus #{index + 1}
                          </span>
                          {campuses.length > 1 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeCampus(index)}
                              className="h-7 px-2 text-destructive hover:bg-destructive/10 hover:text-destructive shrink-0"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-[11px] font-bold text-muted-foreground uppercase">Nom du campus</label>
                            <Input
                              placeholder="Campus Principal"
                              className="h-10 border-border/80 focus-visible:ring-primary/30 text-xs"
                              value={campus.name}
                              onChange={(e) => {
                                const newCampuses = [...campuses]
                                newCampuses[index].name = e.target.value
                                setCampuses(newCampuses)
                              }}
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[11px] font-bold text-muted-foreground uppercase">Ville</label>
                            <Input
                              placeholder="Dakar"
                              className="h-10 border-border/80 focus-visible:ring-primary/30 text-xs"
                              value={campus.city}
                              onChange={(e) => {
                                const newCampuses = [...campuses]
                                newCampuses[index].city = e.target.value
                                setCampuses(newCampuses)
                              }}
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-muted-foreground uppercase">Adresse complète</label>
                          <Input
                            placeholder="Ex: Route du Front de Terre"
                            className="h-10 border-border/80 focus-visible:ring-primary/30 text-xs"
                            value={campus.address}
                            onChange={(e) => {
                              const newCampuses = [...campuses]
                              newCampuses[index].address = e.target.value
                              setCampuses(newCampuses)
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    onClick={addCampus}
                    className="w-full h-11 gap-2 border-dashed border-border hover:bg-secondary"
                  >
                    <Plus className="h-4 w-4 text-primary" />
                    Ajouter un campus supplémentaire
                  </Button>
                </motion.div>
              )}

              {/* Step 3: Academic Settings */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-primary px-3 py-1 bg-primary/10 rounded-full">
                      Étape 3 • Configuration Académique
                    </span>
                    <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-3 mb-2">Configuration académique</h1>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Paramétrez l&apos;année scolaire en cours et cochez vos niveaux d&apos;enseignement.
                    </p>
                  </div>

                  <div className="space-y-5">
                    {/* Academic dates */}
                    <div className="space-y-3.5">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                        <Calendar className="h-4 w-4" /> Date de l&apos;Année Académique
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-muted-foreground">Début des cours</label>
                          <Input 
                            type="date" 
                            className="h-10 border-border/80 focus-visible:ring-primary/30" 
                            value={startDate} 
                            onChange={(e) => setStartDate(e.target.value)} 
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-muted-foreground">Fin des cours</label>
                          <Input 
                            type="date" 
                            className="h-10 border-border/80 focus-visible:ring-primary/30" 
                            value={endDate} 
                            onChange={(e) => setEndDate(e.target.value)} 
                          />
                        </div>
                      </div>
                    </div>

                    {/* Educational levels Cards selector */}
                    <div className="space-y-3.5">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                        <GraduationCap className="h-4 w-4" /> Niveaux d&apos;enseignement
                      </h3>
                      <div className="grid grid-cols-2 gap-3.5">
                        {[
                          { name: 'Primaire', icon: BookOpen, desc: 'CI à CM2' },
                          { name: 'Collège', icon: Award, desc: '6ème à 3ème' },
                          { name: 'Lycée', icon: GraduationCap, desc: 'Seconde à Terminale' },
                          { name: 'Technique', icon: Zap, desc: 'CAP, BTS, Pro' }
                        ].map((level) => {
                          const isSelected = selectedLevels.includes(level.name)
                          return (
                            <button
                              key={level.name}
                              type="button"
                              onClick={() => toggleLevel(level.name)}
                              className={cn(
                                "flex items-center gap-3.5 p-4 rounded-xl cursor-pointer border text-left transition-all duration-200 hover:shadow-sm",
                                isSelected 
                                  ? "bg-primary/5 border-primary ring-2 ring-primary/10" 
                                  : "bg-card border-border hover:bg-secondary/40"
                              )}
                            >
                              <div className={cn(
                                "w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors",
                                isSelected ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                              )}>
                                <level.icon className="h-4.5 w-4.5" />
                              </div>
                              <div className="overflow-hidden">
                                <p className="text-xs font-bold text-foreground">{level.name}</p>
                                <p className="text-[10px] text-muted-foreground truncate">{level.desc}</p>
                              </div>
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    {/* Grading system */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-foreground">Système de notation par défaut</label>
                      <div className="relative">
                        <select
                          value={gradingSystem}
                          onChange={(e) => setGradingSystem(e.target.value)}
                          className="w-full h-11 rounded-lg border border-border bg-background px-3 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none cursor-pointer"
                        >
                          <option value="20">Sur 20 (Système d&apos;Afrique Francophone)</option>
                          <option value="100">Sur 100 (Système Anglo-Saxon / Bissau)</option>
                          <option value="gpa">Lettres / GPA (A, B, C, D, F)</option>
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
                          <ChevronDown className="h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Financial settings */}
              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-primary px-3 py-1 bg-primary/10 rounded-full">
                      Étape 4 • Paramètres Financiers
                    </span>
                    <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-3 mb-2">Configuration financière</h1>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Définissez la monnaie d&apos;échange et les canaux de scolarité approuvés.
                    </p>
                  </div>

                  <div className="space-y-5">
                    {/* Currency selector */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-foreground">Devise principale de facturation</label>
                      <div className="relative">
                        <select
                          value={currency}
                          onChange={(e) => setCurrency(e.target.value)}
                          className="w-full h-11 rounded-lg border border-border bg-background px-3 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none cursor-pointer"
                        >
                          <option value="XOF">Franc CFA BCEAO (FCFA / XOF) - Sénégal & Bissau</option>
                          <option value="EUR">Euro (€)</option>
                          <option value="USD">Dollar US ($)</option>
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
                          <ChevronDown className="h-4 w-4" />
                        </div>
                      </div>
                    </div>

                    {/* Payment methods selectors */}
                    <div className="space-y-3">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Modes de paiement collectés</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { id: 'mobile', label: 'Mobile Money', desc: 'Wave, Orange Money' },
                          { id: 'cash', label: 'Espèces', desc: 'Dépôt direct caisse' },
                          { id: 'bank', label: 'Virement bancaire', desc: 'Banque partenaire' },
                          { id: 'card', label: 'Carte Bancaire', desc: 'Paiement en ligne' }
                        ].map((method) => {
                          const isSelected = paymentMethods.includes(method.id)
                          return (
                            <button
                              key={method.id}
                              type="button"
                              onClick={() => togglePaymentMethod(method.id)}
                              className={cn(
                                "flex items-center gap-3 p-3.5 rounded-xl cursor-pointer border text-left transition-all duration-200 hover:shadow-xs",
                                isSelected 
                                  ? "bg-primary/5 border-primary ring-2 ring-primary/10" 
                                  : "bg-card border-border hover:bg-secondary/40"
                              )}
                            >
                              <div className={cn(
                                "w-5 h-5 rounded flex items-center justify-center shrink-0 border transition-all duration-200",
                                isSelected ? "bg-primary border-primary text-primary-foreground" : "bg-background border-border"
                              )}>
                                {isSelected && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                              </div>
                              <div className="overflow-hidden">
                                <p className="text-xs font-bold text-foreground leading-none mb-1">{method.label}</p>
                                <p className="text-[10px] text-muted-foreground truncate">{method.desc}</p>
                              </div>
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    {/* Payment Frequency */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-foreground">Échéance périodique de facturation scolaire</label>
                      <div className="relative">
                        <select
                          value={paymentFrequency}
                          onChange={(e) => setPaymentFrequency(e.target.value)}
                          className="w-full h-11 rounded-lg border border-border bg-background px-3 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none cursor-pointer"
                        >
                          <option value="monthly">Chaque mois (Mensuel)</option>
                          <option value="trimester">Chaque trimestre (Trimestriel)</option>
                          <option value="annual">Une fois par an (Annuel)</option>
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
                          <ChevronDown className="h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 5: Invite Administrators */}
              {currentStep === 5 && (
                <motion.div
                  key="step5"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-primary px-3 py-1 bg-primary/10 rounded-full">
                      Étape 5 • Équipe & Droits
                    </span>
                    <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-3 mb-2">Invitez votre équipe</h1>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Ajoutez des profils administratifs clés pour piloter conjointement votre établissement.
                    </p>
                  </div>

                  <div className="space-y-4 max-h-[350px] overflow-y-auto pr-1">
                    {admins.map((admin, index) => (
                      <div key={index} className="flex items-center gap-3 bg-card border border-border/80 p-3 rounded-xl shadow-xs">
                        <div className="flex-1 relative">
                          <Input
                            type="email"
                            placeholder="email@etablissement.edu.sn"
                            className="h-10 border-border/80 focus-visible:ring-primary/30 text-xs"
                            value={admin.email}
                            onChange={(e) => {
                              const newAdmins = [...admins]
                              newAdmins[index].email = e.target.value
                              setAdmins(newAdmins)
                            }}
                          />
                        </div>
                        
                        <div className="relative shrink-0">
                          <select
                            className="h-10 w-32 sm:w-36 rounded-lg border border-border/80 bg-background px-3.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none cursor-pointer"
                            value={admin.role}
                            onChange={(e) => {
                              const newAdmins = [...admins]
                              newAdmins[index].role = e.target.value
                              setAdmins(newAdmins)
                            }}
                          >
                            <option value="admin">Administrateur</option>
                            <option value="accountant">Comptable</option>
                            <option value="secretary">Secrétaire</option>
                          </select>
                          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
                            <ChevronDown className="h-3.5 w-3.5" />
                          </div>
                        </div>

                        {admins.length > 1 && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeAdmin(index)}
                            className="h-10 w-10 text-destructive hover:bg-destructive/10 shrink-0 rounded-lg"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    onClick={addAdmin}
                    className="w-full h-11 gap-2 border-dashed border-border hover:bg-secondary"
                  >
                    <Plus className="h-4 w-4 text-primary" />
                    Ajouter un collaborateur
                  </Button>

                  <p className="text-[11px] text-muted-foreground font-medium bg-secondary/30 border border-border p-3 rounded-lg flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-primary shrink-0" />
                    Les invitations d&apos;accès sécurisés seront transmises directement par email après confirmation.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Footer Navigation Buttons */}
        <div className="p-6 border-t border-border bg-card/60 backdrop-blur-md">
          <div className="max-w-xl mx-auto flex items-center justify-between gap-4">
            <Button
              variant="ghost"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="gap-2 h-11 px-5 font-semibold text-xs text-muted-foreground hover:text-foreground cursor-pointer disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" />
              Précédent
            </Button>

            {currentStep < 5 ? (
              <Button 
                onClick={nextStep} 
                className="gap-2 h-11 px-6 font-semibold text-xs shadow-md shadow-primary/10 bg-primary text-primary-foreground hover:bg-primary/95 cursor-pointer"
              >
                Suivant
                <ChevronRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button 
                onClick={finishSetup} 
                disabled={isLoading} 
                className="gap-2 h-11 px-6 font-semibold text-xs shadow-md shadow-primary/25 bg-primary text-primary-foreground hover:bg-primary/95 cursor-pointer min-w-[170px]"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Configuration...
                  </>
                ) : (
                  <>
                    Valider la configuration
                    <Check className="h-4 w-4" />
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
