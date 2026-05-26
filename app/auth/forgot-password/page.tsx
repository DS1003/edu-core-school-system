'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Loader2, Mail, ArrowLeft, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

const forgotPasswordSchema = z.object({
  email: z.string().email('Adresse email invalide'),
})

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  })

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    console.log('Forgot password data:', data)
    setIsLoading(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center"
      >
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-emerald-500/10 flex items-center justify-center">
          <CheckCircle className="h-8 w-8 text-emerald-500" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Email envoyé!</h1>
        <p className="text-muted-foreground mb-6">
          Nous avons envoyé un lien de réinitialisation à{' '}
          <span className="font-medium text-foreground">{getValues('email')}</span>
        </p>
        <p className="text-sm text-muted-foreground mb-8">
          Vérifiez votre boîte de réception et suivez les instructions pour réinitialiser votre mot de passe.
        </p>
        <div className="space-y-3">
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => setIsSubmitted(false)}
          >
            Renvoyer l&apos;email
          </Button>
          <Link href="/auth/login">
            <Button variant="ghost" className="w-full gap-2">
              <ArrowLeft className="h-4 w-4" />
              Retour à la connexion
            </Button>
          </Link>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold">Mot de passe oublié?</h1>
        <p className="text-muted-foreground mt-2">
          Entrez votre email pour recevoir un lien de réinitialisation
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Adresse email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              {...register('email')}
              id="email"
              type="email"
              placeholder="nom@etablissement.edu.sn"
              className={cn(
                "pl-10 h-11",
                errors.email && "border-destructive"
              )}
            />
          </div>
          {errors.email && (
            <p className="text-xs text-destructive">{errors.email.message}</p>
          )}
        </div>

        <Button type="submit" className="w-full h-11" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Envoi en cours...
            </>
          ) : (
            'Envoyer le lien'
          )}
        </Button>
      </form>

      <Link 
        href="/auth/login"
        className="flex items-center justify-center gap-2 mt-6 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Retour à la connexion
      </Link>
    </motion.div>
  )
}
