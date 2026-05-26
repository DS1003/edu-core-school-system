"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Users, Printer, Search, Filter, CheckCircle2, 
  Clock, Download, MoreVertical, CreditCard
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { mockStudents, mockClasses } from "@/lib/mock-data"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription
} from "@/components/ui/dialog"
import Image from "next/image"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

export default function CartesScolairesPage() {
  const [isMounted, setIsMounted] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedClass, setSelectedClass] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  // Generate some mock status for cards
  const studentsWithCardStatus = mockStudents.map((student, idx) => ({
    ...student,
    cardStatus: idx % 3 === 0 ? "generated" : "pending",
    cardId: `ID-${student.matricule}-2026`
  }))

  const filteredStudents = studentsWithCardStatus.filter(student => {
    const matchesSearch = student.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.matricule.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesClass = selectedClass === "all" || student.classId === selectedClass
    const matchesStatus = statusFilter === "all" || student.cardStatus === statusFilter

    return matchesSearch && matchesClass && matchesStatus
  })

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-4 sm:p-6 space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <CreditCard className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Cartes Scolaires</h1>
            <p className="text-muted-foreground">Générez et imprimez les cartes d'identité des élèves</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Exporter (PDF)</span>
          </Button>
          <Button className="bg-primary hover:bg-primary/90 gap-2">
            <Printer className="w-4 h-4" />
            <span className="hidden sm:inline">Tout imprimer</span>
          </Button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-card border border-border/50 rounded-xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
            <Users className="w-6 h-6 text-blue-500" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Total Élèves</p>
            <p className="text-2xl font-bold">{mockStudents.length}</p>
          </div>
        </div>
        <div className="bg-card border border-border/50 rounded-xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6 text-emerald-500" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Cartes Générées</p>
            <p className="text-2xl font-bold">
              {studentsWithCardStatus.filter(s => s.cardStatus === "generated").length}
            </p>
          </div>
        </div>
        <div className="bg-card border border-border/50 rounded-xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center">
            <Clock className="w-6 h-6 text-amber-500" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">En Attente</p>
            <p className="text-2xl font-bold">
              {studentsWithCardStatus.filter(s => s.cardStatus === "pending").length}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Filters & Search */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 p-4 bg-card border border-border/50 rounded-xl">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Rechercher un élève, matricule..." 
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          <Select value={selectedClass} onValueChange={setSelectedClass}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Toutes les classes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les classes</SelectItem>
              {mockClasses.map(c => (
                <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="generated">Générées</SelectItem>
              <SelectItem value="pending">En attente</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </motion.div>

      {/* Cards Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredStudents.slice(0, 12).map((student, index) => {
            const studentClass = mockClasses.find(c => c.id === student.classId)
            
            return (
              <motion.div
                key={student.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
                className="group flex flex-col"
              >
                {/* ID Card Design */}
                <div className="relative w-full aspect-[1.586/1] rounded-2xl overflow-hidden border border-border/50 bg-card shadow-sm hover:shadow-md transition-shadow">
                  {/* Card Header Background */}
                  <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-r from-primary/90 to-primary" />
                  
                  {/* School Info */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-primary-foreground">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                        <CreditCard className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-xs font-bold leading-tight">GROUPE SCOLAIRE</p>
                        <p className="text-[10px] opacity-80 leading-tight">EXCELLENCE AFRICAINE</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold leading-tight">CARTE SCOLAIRE</p>
                      <p className="text-[10px] opacity-80 leading-tight">2025 - 2026</p>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="absolute top-14 left-4 right-4 bottom-4 bg-background rounded-xl shadow-sm border border-border/50 p-4 flex gap-4">
                    {/* Photo */}
                    <div className="w-24 h-24 rounded-lg overflow-hidden bg-secondary border border-border flex-shrink-0 relative mt-2">
                      <Image 
                        src={student.avatar} 
                        alt={`Photo ${student.firstName}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    
                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-center space-y-2 mt-2">
                      <div>
                        <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">Nom & Prénom</p>
                        <p className="font-bold text-sm leading-tight text-foreground">{student.firstName} {student.lastName}</p>
                      </div>
                      
                      <div className="flex justify-between items-end">
                        <div>
                          <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">Matricule</p>
                          <p className="font-bold text-xs text-foreground font-mono">{student.matricule}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">Classe</p>
                          <p className="font-bold text-xs text-foreground">{studentClass?.name || 'N/A'}</p>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">Date de naissance</p>
                        <p className="font-bold text-xs text-foreground">
                          {student.dateOfBirth.toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Barcode (Mock) */}
                  <div className="absolute bottom-6 right-6 flex items-center justify-end opacity-20 group-hover:opacity-100 transition-opacity">
                    <div className="w-24 h-6 flex gap-[2px]">
                      {[...Array(20)].map((_, i) => (
                        <div key={i} className="bg-foreground h-full" style={{ width: Math.random() * 3 + 1 + 'px' }} />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="flex items-center justify-between mt-3 px-2">
                  <Badge 
                    variant="outline" 
                    className={cn("gap-1", student.cardStatus === "generated" ? "border-emerald-500 text-emerald-500 bg-emerald-500/10" : "")}
                  >
                    {student.cardStatus === "generated" ? (
                      <><CheckCircle2 className="w-3 h-3" /> Générée</>
                    ) : (
                      <><Clock className="w-3 h-3" /> En attente</>
                    )}
                  </Badge>
                  <div className="flex items-center gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 px-2 text-primary hover:bg-primary/10">
                          Voir
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Détails de la Carte Scolaire</DialogTitle>
                          <DialogDescription>
                            Aperçu détaillé pour {student.firstName} {student.lastName}.
                          </DialogDescription>
                        </DialogHeader>
                        
                        <div className="flex flex-col items-center space-y-4 py-4">
                          <div className="w-full aspect-[1.586/1] max-w-[340px] rounded-2xl overflow-hidden border border-border/50 bg-card shadow-lg relative mx-auto">
                            {/* Card Header Background */}
                            <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-r from-primary/90 to-primary" />
                            
                            {/* School Info */}
                            <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-primary-foreground">
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 bg-white/20 rounded flex items-center justify-center backdrop-blur-sm">
                                  <CreditCard className="w-3 h-3 text-white" />
                                </div>
                                <div>
                                  <p className="text-[10px] font-bold leading-tight">GROUPE SCOLAIRE</p>
                                  <p className="text-[8px] opacity-80 leading-tight">EXCELLENCE AFRICAINE</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-[10px] font-bold leading-tight">CARTE SCOLAIRE</p>
                                <p className="text-[8px] opacity-80 leading-tight">2025 - 2026</p>
                              </div>
                            </div>

                            {/* Card Content */}
                            <div className="absolute top-12 left-3 right-3 bottom-3 bg-background rounded-xl shadow-sm border border-border/50 p-3 flex gap-3">
                              <div className="w-20 h-20 rounded-lg overflow-hidden bg-secondary border border-border flex-shrink-0 relative mt-1">
                                <Image 
                                  src={student.avatar} 
                                  alt={`Photo ${student.firstName}`}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              
                              <div className="flex-1 flex flex-col justify-center space-y-1 mt-1">
                                <div>
                                  <p className="text-[8px] text-muted-foreground font-semibold uppercase tracking-wider">Nom & Prénom</p>
                                  <p className="font-bold text-[11px] leading-tight text-foreground">{student.firstName} {student.lastName}</p>
                                </div>
                                
                                <div className="flex justify-between items-end">
                                  <div>
                                    <p className="text-[8px] text-muted-foreground font-semibold uppercase tracking-wider">Matricule</p>
                                    <p className="font-bold text-[10px] text-foreground font-mono">{student.matricule}</p>
                                  </div>
                                  <div>
                                    <p className="text-[8px] text-muted-foreground font-semibold uppercase tracking-wider">Classe</p>
                                    <p className="font-bold text-[10px] text-foreground">{studentClass?.name || 'N/A'}</p>
                                  </div>
                                </div>
                                
                                <div>
                                  <p className="text-[8px] text-muted-foreground font-semibold uppercase tracking-wider">Date de naissance</p>
                                  <p className="font-bold text-[10px] text-foreground">
                                    {student.dateOfBirth.toLocaleDateString('fr-FR')}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4 w-full text-sm mt-4">
                            <div className="space-y-1 p-3 bg-muted/50 rounded-lg border border-border/50">
                              <p className="text-xs text-muted-foreground">Statut</p>
                              <Badge 
                                variant="outline" 
                                className={cn("gap-1 mt-1", student.cardStatus === "generated" ? "border-emerald-500 text-emerald-500 bg-emerald-500/10" : "")}
                              >
                                {student.cardStatus === "generated" ? "Générée" : "En attente"}
                              </Badge>
                            </div>
                            <div className="space-y-1 p-3 bg-muted/50 rounded-lg border border-border/50">
                              <p className="text-xs text-muted-foreground">Sexe</p>
                              <p className="font-medium text-foreground">{student.gender === 'M' ? 'Masculin' : 'Féminin'}</p>
                            </div>
                            <div className="space-y-1 p-3 bg-muted/50 rounded-lg border border-border/50">
                              <p className="text-xs text-muted-foreground">Téléphone Parent</p>
                              <p className="font-medium text-foreground">{student.phone || 'Non renseigné'}</p>
                            </div>
                            <div className="space-y-1 p-3 bg-muted/50 rounded-lg border border-border/50">
                              <p className="text-xs text-muted-foreground">Inscription</p>
                              <p className="font-medium text-foreground">{student.enrollmentDate.toLocaleDateString('fr-FR')}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex justify-end gap-3 pt-2">
                          <Button className="gap-2 bg-secondary text-foreground hover:bg-secondary/80">
                            <Printer className="w-4 h-4" /> Imprimer cette carte
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button size="sm" className="h-8 gap-2 bg-secondary text-foreground hover:bg-secondary/80">
                      <Printer className="w-3 h-3" /> Imprimer
                    </Button>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </motion.div>
      
      {filteredStudents.length === 0 && (
        <div className="py-12 text-center flex flex-col items-center">
          <CreditCard className="w-12 h-12 text-muted-foreground/30 mb-4" />
          <h3 className="text-lg font-medium">Aucun élève trouvé</h3>
          <p className="text-muted-foreground">Modifiez vos filtres de recherche.</p>
        </div>
      )}
    </motion.div>
  )
}
