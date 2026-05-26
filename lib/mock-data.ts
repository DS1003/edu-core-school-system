import type { 
  Student, 
  Teacher, 
  SchoolClass, 
  Subject, 
  Payment, 
  DashboardStats,
  RevenueData,
  AttendanceData,
  Notification,
  Announcement,
  SchoolGroup,
  Campus,
  Department,
  AcademicYear
} from '@/types'

// Senegalese and Guinea-Bissau names
const firstNamesMale = [
  'Mamadou', 'Ibrahima', 'Moussa', 'Ousmane', 'Abdoulaye', 'Cheikh', 'Modou',
  'Aliou', 'Babacar', 'Serigne', 'Papa', 'Amadou', 'Saliou', 'Malick', 'Pape',
  'Lamine', 'Djibril', 'Souleymane', 'Tidiane', 'Bamba'
]

const firstNamesFemale = [
  'Fatou', 'Aminata', 'Aissatou', 'Mariama', 'Ndèye', 'Awa', 'Khady', 'Dieynaba',
  'Coumba', 'Mame', 'Sokhna', 'Adja', 'Rama', 'Khadija', 'Seynabou', 'Ndeye',
  'Bineta', 'Rokhaya', 'Astou', 'Yacine'
]

const lastNames = [
  'Diallo', 'Diop', 'Ndiaye', 'Fall', 'Sow', 'Ba', 'Sy', 'Gueye', 'Faye',
  'Mbaye', 'Thiam', 'Sarr', 'Diouf', 'Kane', 'Seck', 'Niang', 'Cisse', 'Toure',
  'Balde', 'Diagne', 'Camara', 'Mbengue', 'Wade', 'Ly'
]

const cities = ['Dakar', 'Thiès', 'Saint-Louis', 'Kaolack', 'Ziguinchor', 'Bissau', 'Bafatá', 'Gabú']

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function generateMatricule(prefix: string, index: number): string {
  return `${prefix}${new Date().getFullYear()}${String(index).padStart(4, '0')}`
}

// Mock School Group
export const mockSchoolGroup: SchoolGroup = {
  id: 'sg-001',
  name: 'Groupe Scolaire Excellence Africaine',
  logo: '/logo.png',
  country: 'Senegal',
  createdAt: new Date('2020-01-15'),
  campuses: []
}

// Mock Campuses
export const mockCampuses: Campus[] = [
  {
    id: 'camp-001',
    name: 'Campus Principal - Dakar',
    address: 'Avenue Cheikh Anta Diop, Dakar',
    city: 'Dakar',
    phone: '+221 33 123 45 67',
    email: 'dakar@excellence-africaine.edu.sn',
    schoolGroupId: 'sg-001',
    isMainCampus: true
  },
  {
    id: 'camp-002',
    name: 'Campus Thiès',
    address: 'Boulevard de la République, Thiès',
    city: 'Thiès',
    phone: '+221 33 951 23 45',
    email: 'thies@excellence-africaine.edu.sn',
    schoolGroupId: 'sg-001',
    isMainCampus: false
  },
  {
    id: 'camp-003',
    name: 'Campus Bissau',
    address: 'Avenida dos Combatentes, Bissau',
    city: 'Bissau',
    phone: '+245 955 123 456',
    email: 'bissau@excellence-africaine.edu.gw',
    schoolGroupId: 'sg-001',
    isMainCampus: false
  }
]

// Mock Departments
export const mockDepartments: Department[] = [
  { id: 'dep-001', name: 'Sciences', code: 'SCI', campusId: 'camp-001', headTeacherId: 'tch-001' },
  { id: 'dep-002', name: 'Lettres', code: 'LET', campusId: 'camp-001', headTeacherId: 'tch-002' },
  { id: 'dep-003', name: 'Sciences Économiques', code: 'ECO', campusId: 'camp-001', headTeacherId: 'tch-003' },
  { id: 'dep-004', name: 'Technique', code: 'TEC', campusId: 'camp-001', headTeacherId: 'tch-004' }
]

// Mock Academic Year
export const mockAcademicYears: AcademicYear[] = [
  {
    id: 'ay-001',
    name: '2025-2026',
    startDate: new Date('2025-10-01'),
    endDate: new Date('2026-07-15'),
    isCurrent: true,
    semesters: [
      { id: 'sem-001', name: 'Premier Semestre', startDate: new Date('2025-10-01'), endDate: new Date('2026-01-31'), academicYearId: 'ay-001' },
      { id: 'sem-002', name: 'Deuxième Semestre', startDate: new Date('2026-02-01'), endDate: new Date('2026-07-15'), academicYearId: 'ay-001' }
    ]
  },
  {
    id: 'ay-002',
    name: '2024-2025',
    startDate: new Date('2024-10-01'),
    endDate: new Date('2025-07-15'),
    isCurrent: false,
    semesters: [
      { id: 'sem-003', name: 'Premier Semestre', startDate: new Date('2024-10-01'), endDate: new Date('2025-01-31'), academicYearId: 'ay-002' },
      { id: 'sem-004', name: 'Deuxième Semestre', startDate: new Date('2025-02-01'), endDate: new Date('2025-07-15'), academicYearId: 'ay-002' }
    ]
  }
]

// Mock Classes
export const mockClasses: SchoolClass[] = [
  { id: 'cls-001', name: 'Terminale S1', classLevelId: 'lvl-001', academicYearId: 'ay-001', mainTeacherId: 'tch-001', maxStudents: 45, currentStudents: 42 },
  { id: 'cls-002', name: 'Terminale S2', classLevelId: 'lvl-001', academicYearId: 'ay-001', mainTeacherId: 'tch-002', maxStudents: 45, currentStudents: 38 },
  { id: 'cls-003', name: 'Terminale L1', classLevelId: 'lvl-002', academicYearId: 'ay-001', mainTeacherId: 'tch-003', maxStudents: 40, currentStudents: 35 },
  { id: 'cls-004', name: 'Première S1', classLevelId: 'lvl-003', academicYearId: 'ay-001', mainTeacherId: 'tch-004', maxStudents: 45, currentStudents: 44 },
  { id: 'cls-005', name: 'Première S2', classLevelId: 'lvl-003', academicYearId: 'ay-001', mainTeacherId: 'tch-005', maxStudents: 45, currentStudents: 40 },
  { id: 'cls-006', name: 'Seconde S', classLevelId: 'lvl-004', academicYearId: 'ay-001', mainTeacherId: 'tch-006', maxStudents: 50, currentStudents: 48 },
  { id: 'cls-007', name: 'Troisième A', classLevelId: 'lvl-005', academicYearId: 'ay-001', mainTeacherId: 'tch-007', maxStudents: 50, currentStudents: 47 },
  { id: 'cls-008', name: 'Quatrième A', classLevelId: 'lvl-006', academicYearId: 'ay-001', mainTeacherId: 'tch-008', maxStudents: 50, currentStudents: 45 }
]

// Mock Subjects
export const mockSubjects: Subject[] = [
  { id: 'sub-001', name: 'Mathématiques', code: 'MATH', coefficient: 5, weeklyHours: 6, departmentId: 'dep-001', teacherIds: ['tch-001', 'tch-005'] },
  { id: 'sub-002', name: 'Physique-Chimie', code: 'PC', coefficient: 4, weeklyHours: 5, departmentId: 'dep-001', teacherIds: ['tch-002', 'tch-006'] },
  { id: 'sub-003', name: 'Sciences de la Vie et de la Terre', code: 'SVT', coefficient: 3, weeklyHours: 4, departmentId: 'dep-001', teacherIds: ['tch-003'] },
  { id: 'sub-004', name: 'Français', code: 'FR', coefficient: 4, weeklyHours: 5, departmentId: 'dep-002', teacherIds: ['tch-004', 'tch-009'] },
  { id: 'sub-005', name: 'Anglais', code: 'ANG', coefficient: 3, weeklyHours: 4, departmentId: 'dep-002', teacherIds: ['tch-007'] },
  { id: 'sub-006', name: 'Histoire-Géographie', code: 'HG', coefficient: 3, weeklyHours: 4, departmentId: 'dep-002', teacherIds: ['tch-008'] },
  { id: 'sub-007', name: 'Philosophie', code: 'PHILO', coefficient: 4, weeklyHours: 5, departmentId: 'dep-002', teacherIds: ['tch-010'] },
  { id: 'sub-008', name: 'Économie', code: 'ECO', coefficient: 4, weeklyHours: 4, departmentId: 'dep-003', teacherIds: ['tch-011'] },
  { id: 'sub-009', name: 'Informatique', code: 'INFO', coefficient: 2, weeklyHours: 2, departmentId: 'dep-004', teacherIds: ['tch-012'] },
  { id: 'sub-010', name: 'Éducation Physique', code: 'EPS', coefficient: 2, weeklyHours: 2, departmentId: 'dep-004', teacherIds: ['tch-013'] }
]

// Generate Mock Students
export const mockStudents: Student[] = Array.from({ length: 150 }, (_, i) => {
  const gender = Math.random() > 0.5 ? 'M' : 'F'
  const firstName = gender === 'M' ? randomItem(firstNamesMale) : randomItem(firstNamesFemale)
  const lastName = randomItem(lastNames)
  
  return {
    id: `std-${String(i + 1).padStart(3, '0')}`,
    matricule: generateMatricule('STD', i + 1),
    firstName,
    lastName,
    dateOfBirth: new Date(2000 + Math.floor(Math.random() * 10), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
    gender,
    address: `${Math.floor(Math.random() * 200) + 1} ${randomItem(['Rue', 'Avenue', 'Boulevard'])} ${randomItem(lastNames)}, ${randomItem(cities)}`,
    phone: `+221 7${Math.floor(Math.random() * 9)}${String(Math.floor(Math.random() * 10000000)).padStart(7, '0')}`,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@student.edu.sn`,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${firstName}${lastName}`,
    classId: randomItem(mockClasses).id,
    parentId: `par-${String(Math.floor(i / 2) + 1).padStart(3, '0')}`,
    enrollmentDate: new Date(2020 + Math.floor(Math.random() * 5), 9, 1),
    status: Math.random() > 0.1 ? 'active' : randomItem(['inactive', 'graduated', 'transferred'])
  }
})

// Generate Mock Teachers
export const mockTeachers: Teacher[] = Array.from({ length: 25 }, (_, i) => {
  const gender = Math.random() > 0.4 ? 'M' : 'F'
  const firstName = gender === 'M' ? randomItem(firstNamesMale) : randomItem(firstNamesFemale)
  const lastName = randomItem(lastNames)
  const subject = randomItem(mockSubjects)
  
  return {
    id: `tch-${String(i + 1).padStart(3, '0')}`,
    matricule: generateMatricule('TCH', i + 1),
    firstName,
    lastName,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@excellence-africaine.edu.sn`,
    phone: `+221 7${Math.floor(Math.random() * 9)}${String(Math.floor(Math.random() * 10000000)).padStart(7, '0')}`,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${firstName}${lastName}teacher`,
    specialization: subject.name,
    subjectIds: [subject.id],
    classIds: mockClasses.slice(0, Math.floor(Math.random() * 4) + 1).map(c => c.id),
    hireDate: new Date(2015 + Math.floor(Math.random() * 10), Math.floor(Math.random() * 12), 1),
    salary: 250000 + Math.floor(Math.random() * 400000),
    status: Math.random() > 0.1 ? 'active' : randomItem(['on_leave', 'inactive'])
  }
})

// Mock Payments
export const mockPayments: Payment[] = Array.from({ length: 200 }, (_, i) => {
  const student = randomItem(mockStudents)
  const amount = [75000, 125000, 175000, 225000][Math.floor(Math.random() * 4)]
  
  return {
    id: `pay-${String(i + 1).padStart(3, '0')}`,
    studentId: student.id,
    tuitionFeeId: `fee-001`,
    amount,
    method: randomItem(['cash', 'bank_transfer', 'mobile_money', 'card']),
    status: randomItem(['completed', 'completed', 'completed', 'pending', 'failed']),
    reference: `REF${Date.now()}${Math.floor(Math.random() * 1000)}`,
    paidAt: new Date(2025, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1)
  }
})

// Mock Dashboard Stats
export const mockDashboardStats: DashboardStats = {
  totalStudents: 2847,
  totalTeachers: 156,
  totalClasses: 72,
  totalRevenue: 485750000,
  attendanceRate: 94.5,
  averageGrade: 13.7,
  pendingPayments: 234,
  upcomingEvents: 12
}

// Mock Revenue Data
export const mockRevenueData: RevenueData[] = [
  { month: 'Oct', revenue: 42500000, expenses: 28000000 },
  { month: 'Nov', revenue: 38750000, expenses: 26500000 },
  { month: 'Dec', revenue: 35000000, expenses: 25000000 },
  { month: 'Jan', revenue: 52500000, expenses: 30000000 },
  { month: 'Fév', revenue: 48250000, expenses: 29500000 },
  { month: 'Mar', revenue: 45000000, expenses: 27500000 },
  { month: 'Avr', revenue: 55000000, expenses: 32000000 },
  { month: 'Mai', revenue: 62500000, expenses: 35000000 },
]

// Mock Attendance Data
export const mockAttendanceData: AttendanceData[] = [
  { date: 'Lun', present: 2650, absent: 127, late: 70 },
  { date: 'Mar', present: 2720, absent: 87, late: 40 },
  { date: 'Mer', present: 2680, absent: 112, late: 55 },
  { date: 'Jeu', present: 2700, absent: 95, late: 52 },
  { date: 'Ven', present: 2590, absent: 185, late: 72 },
]

// Mock Notifications
export const mockNotifications: Notification[] = [
  {
    id: 'notif-001',
    title: 'Nouveau paiement reçu',
    message: 'Le paiement de Mamadou Diallo pour le trimestre 2 a été confirmé.',
    type: 'success',
    recipientIds: ['admin-001'],
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 5)
  },
  {
    id: 'notif-002',
    title: 'Rappel: Conseil de classe',
    message: 'Le conseil de classe de Terminale S1 aura lieu demain à 14h00.',
    type: 'info',
    recipientIds: ['admin-001'],
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 30)
  },
  {
    id: 'notif-003',
    title: 'Retard de paiement',
    message: '45 élèves ont des paiements en retard pour ce mois.',
    type: 'warning',
    recipientIds: ['admin-001'],
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2)
  },
  {
    id: 'notif-004',
    title: 'Absence signalée',
    message: 'Prof. Ibrahima Sow a signalé son absence pour demain.',
    type: 'warning',
    recipientIds: ['admin-001'],
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5)
  },
  {
    id: 'notif-005',
    title: 'Rapport mensuel disponible',
    message: 'Le rapport de performance d\'avril est maintenant disponible.',
    type: 'info',
    recipientIds: ['admin-001'],
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24)
  }
]

// Mock Announcements
export const mockAnnouncements: Announcement[] = [
  {
    id: 'ann-001',
    title: 'Vacances de Pâques',
    content: 'L\'établissement sera fermé du 15 au 22 avril pour les vacances de Pâques. Les cours reprendront le 23 avril.',
    authorId: 'admin-001',
    targetAudience: ['all'],
    campusIds: ['camp-001', 'camp-002', 'camp-003'],
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 48)
  },
  {
    id: 'ann-002',
    title: 'Examen blanc - Terminales',
    content: 'Les examens blancs pour les classes de Terminale auront lieu du 5 au 12 mai. Veuillez consulter l\'emploi du temps détaillé.',
    authorId: 'admin-001',
    targetAudience: ['students', 'teachers', 'parents'],
    campusIds: ['camp-001'],
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24)
  },
  {
    id: 'ann-003',
    title: 'Journée portes ouvertes',
    content: 'Nous organisons une journée portes ouvertes le samedi 20 mai. Parents et futurs élèves sont les bienvenus!',
    authorId: 'admin-001',
    targetAudience: ['all'],
    campusIds: ['camp-001', 'camp-002'],
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 72)
  }
]

// Recent Activities
export const mockRecentActivities = [
  { id: 1, type: 'payment', description: 'Paiement reçu de Fatou Diop', amount: 175000, time: '5 min' },
  { id: 2, type: 'enrollment', description: 'Nouvel élève inscrit: Aliou Ba', time: '15 min' },
  { id: 3, type: 'grade', description: 'Notes de Maths Terminale S1 publiées', time: '1h' },
  { id: 4, type: 'attendance', description: 'Rapport de présence du jour généré', time: '2h' },
  { id: 5, type: 'announcement', description: 'Nouvelle annonce publiée', time: '3h' },
  { id: 6, type: 'payment', description: 'Paiement reçu de Mamadou Ndiaye', amount: 225000, time: '4h' },
  { id: 7, type: 'teacher', description: 'Emploi du temps modifié pour Prof. Sow', time: '5h' },
  { id: 8, type: 'enrollment', description: 'Transfert approuvé: Aminata Fall', time: '6h' },
]

// Class Distribution Data
export const mockClassDistribution = [
  { name: 'Terminale', students: 312, color: '#6366f1' },
  { name: 'Première', students: 425, color: '#8b5cf6' },
  { name: 'Seconde', students: 487, color: '#a855f7' },
  { name: 'Troisième', students: 523, color: '#d946ef' },
  { name: 'Quatrième', students: 498, color: '#ec4899' },
  { name: 'Cinquième', students: 412, color: '#f43f5e' },
  { name: 'Sixième', students: 390, color: '#f97316' },
]

// Performance by Subject
export const mockSubjectPerformance = [
  { subject: 'Maths', average: 12.5, passRate: 72 },
  { subject: 'Physique', average: 11.8, passRate: 68 },
  { subject: 'Français', average: 13.2, passRate: 78 },
  { subject: 'Anglais', average: 12.1, passRate: 71 },
  { subject: 'Histoire-Géo', average: 13.8, passRate: 82 },
  { subject: 'SVT', average: 14.1, passRate: 85 },
  { subject: 'Philosophie', average: 11.5, passRate: 65 },
]

// Upcoming Events
export const mockUpcomingEvents = [
  { id: 1, title: 'Conseil de classe Terminale', date: new Date(Date.now() + 1000 * 60 * 60 * 24), type: 'meeting' },
  { id: 2, title: 'Examen de Mathématiques', date: new Date(Date.now() + 1000 * 60 * 60 * 48), type: 'exam' },
  { id: 3, title: 'Réunion des parents', date: new Date(Date.now() + 1000 * 60 * 60 * 72), type: 'meeting' },
  { id: 4, title: 'Formation pédagogique', date: new Date(Date.now() + 1000 * 60 * 60 * 96), type: 'training' },
  { id: 5, title: 'Sortie scolaire - Gorée', date: new Date(Date.now() + 1000 * 60 * 60 * 168), type: 'event' },
]

// Format currency in CFA
export function formatCFA(amount: number): string {
  return new Intl.NumberFormat('fr-SN', {
    style: 'currency',
    currency: 'XOF',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}

// Format date in French
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date)
}

// Format time ago
export function timeAgo(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000)
  
  if (seconds < 60) return 'À l\'instant'
  if (seconds < 3600) return `Il y a ${Math.floor(seconds / 60)} min`
  if (seconds < 86400) return `Il y a ${Math.floor(seconds / 3600)}h`
  if (seconds < 604800) return `Il y a ${Math.floor(seconds / 86400)}j`
  
  return formatDate(date)
}
