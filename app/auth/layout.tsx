'use client'

import { usePathname } from 'next/navigation'
import { GraduationCap } from 'lucide-react'
import Link from 'next/link'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isOnboarding = pathname === '/auth/onboarding'

  if (isOnboarding) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen flex">
      {/* Left side - Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Link href="/" className="flex items-center justify-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <GraduationCap className="h-7 w-7 text-white" />
            </div>
            <span className="font-bold text-2xl">EduCore</span>
          </Link>
          {children}
        </div>
      </div>

      {/* Right side - Illustration */}
      <div className="hidden lg:flex lg:flex-1 bg-gradient-to-br from-primary/10 via-accent/5 to-background border-l border-border items-center justify-center p-12">
        <div className="max-w-lg text-center">
          <div className="mb-8">
            <div className="w-64 h-64 mx-auto relative">
              {/* Abstract illustration */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl" />
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="grid grid-cols-3 gap-3">
                  {[...Array(9)].map((_, i) => (
                    <div 
                      key={i}
                      className="w-16 h-16 rounded-2xl bg-card border border-border shadow-lg flex items-center justify-center"
                      style={{
                        transform: `rotate(${(i % 3 - 1) * 5}deg)`,
                        opacity: 0.7 + (i % 3) * 0.1
                      }}
                    >
                      <div className={`w-8 h-8 rounded-lg ${
                        i % 4 === 0 ? 'bg-primary/30' :
                        i % 4 === 1 ? 'bg-accent/30' :
                        i % 4 === 2 ? 'bg-amber-500/30' :
                        'bg-blue-500/30'
                      }`} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-4">
            Gérez votre établissement en toute simplicité
          </h2>
          <p className="text-muted-foreground">
            Plus de 500 établissements au Sénégal et en Guinée-Bissau font confiance à EduCore 
            pour gérer leurs élèves, enseignants et finances.
          </p>
        </div>
      </div>
    </div>
  )
}
