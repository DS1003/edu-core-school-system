'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { 
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Building2,
  Save,
  Loader2,
  Upload
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { mockClasses } from '@/lib/mock-data'

const studentSchema = z.object({
  firstName: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères'),
  lastName: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Adresse email invalide').optional().or(z.literal('')),
  phone: z.string().optional(),
  dateOfBirth: z.string().min(1, 'Date de naissance requise'),
  gender: z.enum(['M', 'F'], { required_error: 'Genre requis' }),
  address: z.string().min(5, 'Adresse requise'),
  classId: z.string().min(1, 'Classe requise'),
  parentFirstName: z.string().min(2, 'Prénom du parent requis'),
  parentLastName: z.string().min(2, 'Nom du parent requis'),
  parentEmail: z.string().email('Email parent invalide'),
  parentPhone: z.string().min(9, 'Téléphone parent requis'),
})

type StudentFormData = z.infer<typeof studentSchema>

export default function NewStudentPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [avatar, setAvatar] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StudentFormData>({
    resolver: zodResolver(studentSchema),
  })

  const onSubmit = async (data: StudentFormData) => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    console.log('Student data:', data)
    setIsLoading(false)
    router.push('/dashboard/students')
  }

  return (
    <div className="p-4 lg:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/dashboard/students">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Nouvel élève</h1>
            <p className="text-muted-foreground">Ajoutez un nouvel élève à votre établissement</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Photo Upload */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card border border-border rounded-2xl p-6"
          >
            <h2 className="font-semibold mb-4">Photo de l&apos;élève</h2>
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-2xl bg-secondary flex items-center justify-center overflow-hidden">
                {avatar ? (
                  <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <User className="h-10 w-10 text-muted-foreground" />
                )}
              </div>
              <div>
                <Button type="button" variant="outline" className="gap-2">
                  <Upload className="h-4 w-4" />
                  Télécharger une photo
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  JPG, PNG ou GIF. Max 2MB.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Personal Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card border border-border rounded-2xl p-6"
          >
            <h2 className="font-semibold mb-6">Informations personnelles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Prénom *</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    {...register('firstName')}
                    placeholder="Prénom"
                    className={cn("pl-10 h-11", errors.firstName && "border-destructive")}
                  />
                </div>
                {errors.firstName && (
                  <p className="text-xs text-destructive">{errors.firstName.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Nom *</label>
                <Input
                  {...register('lastName')}
                  placeholder="Nom de famille"
                  className={cn("h-11", errors.lastName && "border-destructive")}
                />
                {errors.lastName && (
                  <p className="text-xs text-destructive">{errors.lastName.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Date de naissance *</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    {...register('dateOfBirth')}
                    type="date"
                    className={cn("pl-10 h-11", errors.dateOfBirth && "border-destructive")}
                  />
                </div>
                {errors.dateOfBirth && (
                  <p className="text-xs text-destructive">{errors.dateOfBirth.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Genre *</label>
                <select
                  {...register('gender')}
                  className={cn(
                    "w-full h-11 rounded-lg border border-border bg-card px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary",
                    errors.gender && "border-destructive"
                  )}
                >
                  <option value="">Sélectionner</option>
                  <option value="M">Masculin</option>
                  <option value="F">Féminin</option>
                </select>
                {errors.gender && (
                  <p className="text-xs text-destructive">{errors.gender.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    {...register('email')}
                    type="email"
                    placeholder="email@example.com"
                    className="pl-10 h-11"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Téléphone</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    {...register('phone')}
                    placeholder="+221 77 123 45 67"
                    className="pl-10 h-11"
                  />
                </div>
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-medium">Adresse *</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <textarea
                    {...register('address')}
                    placeholder="Adresse complète"
                    rows={2}
                    className={cn(
                      "w-full pl-10 pt-2 rounded-lg border border-border bg-card px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none",
                      errors.address && "border-destructive"
                    )}
                  />
                </div>
                {errors.address && (
                  <p className="text-xs text-destructive">{errors.address.message}</p>
                )}
              </div>
            </div>
          </motion.div>

          {/* Academic Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card border border-border rounded-2xl p-6"
          >
            <h2 className="font-semibold mb-6">Informations académiques</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Classe *</label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <select
                    {...register('classId')}
                    className={cn(
                      "w-full h-11 rounded-lg border border-border bg-card pl-10 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary",
                      errors.classId && "border-destructive"
                    )}
                  >
                    <option value="">Sélectionner une classe</option>
                    {mockClasses.map(cls => (
                      <option key={cls.id} value={cls.id}>{cls.name}</option>
                    ))}
                  </select>
                </div>
                {errors.classId && (
                  <p className="text-xs text-destructive">{errors.classId.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Date d&apos;inscription</label>
                <Input
                  type="date"
                  defaultValue={new Date().toISOString().split('T')[0]}
                  className="h-11"
                />
              </div>
            </div>
          </motion.div>

          {/* Parent Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card border border-border rounded-2xl p-6"
          >
            <h2 className="font-semibold mb-6">Informations du parent/tuteur</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Prénom du parent *</label>
                <Input
                  {...register('parentFirstName')}
                  placeholder="Prénom"
                  className={cn("h-11", errors.parentFirstName && "border-destructive")}
                />
                {errors.parentFirstName && (
                  <p className="text-xs text-destructive">{errors.parentFirstName.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Nom du parent *</label>
                <Input
                  {...register('parentLastName')}
                  placeholder="Nom"
                  className={cn("h-11", errors.parentLastName && "border-destructive")}
                />
                {errors.parentLastName && (
                  <p className="text-xs text-destructive">{errors.parentLastName.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Email du parent *</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    {...register('parentEmail')}
                    type="email"
                    placeholder="parent@email.com"
                    className={cn("pl-10 h-11", errors.parentEmail && "border-destructive")}
                  />
                </div>
                {errors.parentEmail && (
                  <p className="text-xs text-destructive">{errors.parentEmail.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Téléphone du parent *</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    {...register('parentPhone')}
                    placeholder="+221 77 123 45 67"
                    className={cn("pl-10 h-11", errors.parentPhone && "border-destructive")}
                  />
                </div>
                {errors.parentPhone && (
                  <p className="text-xs text-destructive">{errors.parentPhone.message}</p>
                )}
              </div>
            </div>
          </motion.div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-4">
            <Link href="/dashboard/students">
              <Button type="button" variant="outline">
                Annuler
              </Button>
            </Link>
            <Button type="submit" disabled={isLoading} className="gap-2">
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Enregistrement...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Enregistrer l&apos;élève
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
