'use client'

import { useTheme } from 'next-themes'
import { useAppStore } from '@/store/app-store'
import { useTranslation } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import { timeAgo } from '@/lib/mock-data'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  Bell, 
  Menu, 
  Moon, 
  Sun, 
  ChevronDown,
  LogOut,
  User,
  Settings,
  HelpCircle,
  Check,
  Info,
  AlertTriangle,
  CheckCircle,
  XCircle
} from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

export function Topbar() {
  const { theme, setTheme } = useTheme()
  const { t, language, setLanguage } = useTranslation()
  const { 
    toggleSidebar, 
    currentUser, 
    notifications, 
    unreadCount, 
    markAsRead, 
    markAllAsRead,
    setSearchOpen 
  } = useAppStore()
  
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const notifRef = useRef<HTMLDivElement>(null)
  const profileRef = useRef<HTMLDivElement>(null)
  const langRef = useRef<HTMLDivElement>(null)

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false)
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false)
      }
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setLangOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="h-4 w-4 text-emerald-500" />
      case 'warning': return <AlertTriangle className="h-4 w-4 text-amber-500" />
      case 'error': return <XCircle className="h-4 w-4 text-red-500" />
      default: return <Info className="h-4 w-4 text-blue-500" />
    }
  }

  return (
    <header className="sticky top-0 z-40 h-16 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="flex items-center justify-between h-full px-4 lg:px-6">
        {/* Left side */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
          >
            <Menu className="h-5 w-5" />
          </button>
          
          {/* Search */}
          <button
            onClick={() => setSearchOpen(true)}
            className="hidden sm:flex items-center gap-3 h-10 px-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors text-muted-foreground w-64 lg:w-80"
          >
            <Search className="h-4 w-4" />
            <span className="text-sm">{t('topbar.search')}</span>
            <kbd className="ml-auto hidden lg:inline-flex h-5 items-center gap-1 rounded border border-border bg-muted px-1.5 text-[10px] font-medium text-muted-foreground">
              <span className="text-xs">⌘</span>K
            </kbd>
          </button>
          
          <button
            onClick={() => setSearchOpen(true)}
            className="sm:hidden p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground"
          >
            <Search className="h-5 w-5" />
          </button>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Language Selector */}
          <div ref={langRef} className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 h-10 px-3 rounded-xl hover:bg-secondary transition-colors text-muted-foreground font-semibold text-xs uppercase"
            >
              <span>{language === 'fr' ? '🇫🇷 FR' : '🇵🇹 PT'}</span>
              <ChevronDown className="h-3.5 w-3.5 opacity-60" />
            </button>
            
            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-36 bg-card border border-border rounded-xl shadow-xl overflow-hidden p-1 z-50"
                >
                  <button
                    onClick={() => {
                      setLanguage('fr')
                      setLangOpen(false)
                    }}
                    className={cn(
                      "flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-xs font-semibold hover:bg-secondary transition-colors text-left",
                      language === 'fr' ? "bg-primary/10 text-primary font-bold" : "text-muted-foreground"
                    )}
                  >
                    <span className="text-sm">🇫🇷</span> Français
                  </button>
                  <button
                    onClick={() => {
                      setLanguage('pt')
                      setLangOpen(false)
                    }}
                    className={cn(
                      "flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-xs font-semibold hover:bg-secondary transition-colors text-left",
                      language === 'pt' ? "bg-primary/10 text-primary font-bold" : "text-muted-foreground"
                    )}
                  >
                    <span className="text-sm">🇵🇹</span> Português
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Theme toggle */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2.5 rounded-xl hover:bg-secondary transition-colors text-muted-foreground"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          {/* Notifications */}
          <div ref={notifRef} className="relative">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="relative p-2.5 rounded-xl hover:bg-secondary transition-colors text-muted-foreground"
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            <AnimatePresence>
              {notificationsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-80 sm:w-96 bg-card border border-border rounded-2xl shadow-xl overflow-hidden"
                >
                  <div className="flex items-center justify-between p-4 border-b border-border">
                    <h3 className="font-semibold">{t('topbar.notifications')}</h3>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllAsRead}
                        className="text-xs text-primary hover:underline"
                      >
                        {t('topbar.markAllRead')}
                      </button>
                    )}
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-8 text-center text-muted-foreground">
                        <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">{t('topbar.noNotifications')}</p>
                      </div>
                    ) : (
                      notifications.map((notif) => (
                        <div
                          key={notif.id}
                          className={cn(
                            "flex gap-3 p-4 border-b border-border last:border-0 hover:bg-secondary/50 transition-colors cursor-pointer",
                            !notif.isRead && "bg-primary/5"
                          )}
                          onClick={() => markAsRead(notif.id)}
                        >
                          <div className="flex-shrink-0 mt-0.5">
                            {getNotificationIcon(notif.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={cn(
                              "text-sm",
                              !notif.isRead && "font-medium"
                            )}>
                              {notif.title}
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                              {notif.message}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {timeAgo(notif.createdAt)}
                            </p>
                          </div>
                          {!notif.isRead && (
                            <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2" />
                          )}
                        </div>
                      ))
                    )}
                  </div>
                  <div className="p-3 border-t border-border">
                    <Link
                      href="/dashboard/notifications"
                      className="block text-center text-sm text-primary hover:underline"
                    >
                      {t('topbar.viewAllNotifications')}
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Profile */}
          <div ref={profileRef} className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 p-1.5 pr-3 rounded-xl hover:bg-secondary transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-semibold text-sm">
                {currentUser?.firstName[0]}{currentUser?.lastName[0]}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium">{currentUser?.firstName} {currentUser?.lastName}</p>
                <p className="text-xs text-muted-foreground capitalize">{currentUser?.role.replace('_', ' ')}</p>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground hidden sm:block" />
            </button>

            <AnimatePresence>
              {profileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-56 bg-card border border-border rounded-2xl shadow-xl overflow-hidden"
                >
                  <div className="p-4 border-b border-border">
                    <p className="font-medium">{currentUser?.firstName} {currentUser?.lastName}</p>
                    <p className="text-sm text-muted-foreground">{currentUser?.email}</p>
                  </div>
                  <div className="p-2">
                    <Link
                      href="/dashboard/profile"
                      className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-secondary transition-colors"
                    >
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{t('topbar.profile')}</span>
                    </Link>
                    <Link
                      href="/dashboard/settings"
                      className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-secondary transition-colors"
                    >
                      <Settings className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{t('topbar.settings')}</span>
                    </Link>
                    <Link
                      href="/help"
                      className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-secondary transition-colors"
                    >
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{t('topbar.help')}</span>
                    </Link>
                  </div>
                  <div className="p-2 border-t border-border">
                    <button
                      className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-destructive/10 transition-colors w-full text-left text-destructive"
                    >
                      <LogOut className="h-4 w-4" />
                      <span className="text-sm">{t('topbar.signOut')}</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  )
}
