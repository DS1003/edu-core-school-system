'use client'

import { motion } from 'framer-motion'
import { Trophy } from 'lucide-react'
import { useTranslation } from '@/lib/i18n'

export default function Page() {
  const { t } = useTranslation()
  const isPt = t('dashboard.attendanceToday') === 'Hoje'
  const subTitle = isPt ? 'Esta página está em desenvolvimento.' : 'Cette page est en cours de développement.'
  const underConstruction = isPt ? 'Módulo em construção' : 'Module en construction'
  const descText = isPt 
    ? `As funcionalidades para "Classements" estarão disponíveis em breve na próxima atualização.` 
    : `Les fonctionnalités pour "Classements" seront bientôt disponibles dans la prochaine mise à jour.`

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 space-y-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
          <Trophy className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Classements</h1>
          <p className="text-muted-foreground">{subTitle}</p>
        </div>
      </div>
      
      <div className="bg-card border border-border rounded-2xl p-8 text-center flex flex-col items-center justify-center min-h-[400px]">
        <Trophy className="w-16 h-16 text-muted-foreground/30 mb-4" />
        <h2 className="text-xl font-semibold mb-2">{underConstruction}</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          {descText}
        </p>
      </div>
    </motion.div>
  )
}
