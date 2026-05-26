'use client'

import { motion } from 'framer-motion'
import { CreditCard } from 'lucide-react'

export default function Page() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 space-y-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
          <CreditCard className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Paiements</h1>
          <p className="text-muted-foreground">Cette page est en cours de développement.</p>
        </div>
      </div>
      
      <div className="bg-card border border-border rounded-2xl p-8 text-center flex flex-col items-center justify-center min-h-[400px]">
        <CreditCard className="w-16 h-16 text-muted-foreground/30 mb-4" />
        <h2 className="text-xl font-semibold mb-2">Module en construction</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Les fonctionnalités pour "Paiements" seront bientôt disponibles dans la prochaine mise à jour.
        </p>
      </div>
    </motion.div>
  )
}
