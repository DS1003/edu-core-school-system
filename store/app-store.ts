import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Campus, User, SchoolClass, Notification } from '@/types'
import { mockCampuses, mockNotifications } from '@/lib/mock-data'

interface AppState {
  // Sidebar state
  sidebarOpen: boolean
  sidebarCollapsed: boolean
  setSidebarOpen: (open: boolean) => void
  setSidebarCollapsed: (collapsed: boolean) => void
  toggleSidebar: () => void
  
  // Current user
  currentUser: User | null
  setCurrentUser: (user: User | null) => void
  
  // Current campus
  currentCampus: Campus | null
  setCurrentCampus: (campus: Campus | null) => void
  availableCampuses: Campus[]
  
  // Notifications
  notifications: Notification[]
  unreadCount: number
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  addNotification: (notification: Notification) => void
  
  // Search
  searchOpen: boolean
  setSearchOpen: (open: boolean) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  
  // Selected class for filtering
  selectedClass: SchoolClass | null
  setSelectedClass: (cls: SchoolClass | null) => void
  
  // View preferences
  tableView: 'grid' | 'list'
  setTableView: (view: 'grid' | 'list') => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Sidebar
      sidebarOpen: true,
      sidebarCollapsed: false,
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
      toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      
      // Current user - mock admin user
      currentUser: {
        id: 'admin-001',
        firstName: 'Abdoulaye',
        lastName: 'Diallo',
        email: 'admin@excellence-africaine.edu.sn',
        phone: '+221 77 123 45 67',
        role: 'super_admin',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AdminAbdoulaye',
        campusId: 'camp-001',
        createdAt: new Date('2020-01-15')
      },
      setCurrentUser: (user) => set({ currentUser: user }),
      
      // Current campus
      currentCampus: mockCampuses[0],
      setCurrentCampus: (campus) => set({ currentCampus: campus }),
      availableCampuses: mockCampuses,
      
      // Notifications
      notifications: mockNotifications,
      unreadCount: mockNotifications.filter(n => !n.isRead).length,
      markAsRead: (id) => set((state) => {
        const notifications = state.notifications.map(n => 
          n.id === id ? { ...n, isRead: true } : n
        )
        return { 
          notifications, 
          unreadCount: notifications.filter(n => !n.isRead).length 
        }
      }),
      markAllAsRead: () => set((state) => ({
        notifications: state.notifications.map(n => ({ ...n, isRead: true })),
        unreadCount: 0
      })),
      addNotification: (notification) => set((state) => ({
        notifications: [notification, ...state.notifications],
        unreadCount: state.unreadCount + 1
      })),
      
      // Search
      searchOpen: false,
      setSearchOpen: (open) => set({ searchOpen: open }),
      searchQuery: '',
      setSearchQuery: (query) => set({ searchQuery: query }),
      
      // Selected class
      selectedClass: null,
      setSelectedClass: (cls) => set({ selectedClass: cls }),
      
      // View preferences
      tableView: 'list',
      setTableView: (view) => set({ tableView: view })
    }),
    {
      name: 'educore-storage',
      partialize: (state) => ({
        sidebarCollapsed: state.sidebarCollapsed,
        tableView: state.tableView
      })
    }
  )
)
