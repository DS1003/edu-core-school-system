// School Group and Campus Types
export interface SchoolGroup {
  id: string
  name: string
  logo?: string
  country: 'Senegal' | 'Guinea-Bissau'
  createdAt: Date
  campuses: Campus[]
}

export interface Campus {
  id: string
  name: string
  address: string
  city: string
  phone: string
  email: string
  schoolGroupId: string
  isMainCampus: boolean
}

// User Types
export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  role: UserRole
  avatar?: string
  campusId: string
  createdAt: Date
}

export type UserRole = 'super_admin' | 'admin' | 'teacher' | 'student' | 'parent' | 'accountant'

// Student Types
export interface Student {
  id: string
  matricule: string
  firstName: string
  lastName: string
  dateOfBirth: Date
  gender: 'M' | 'F'
  address: string
  phone?: string
  email?: string
  avatar?: string
  classId: string
  parentId?: string
  enrollmentDate: Date
  status: 'active' | 'inactive' | 'graduated' | 'transferred'
}

export interface Parent {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  occupation?: string
  studentIds: string[]
}

// Teacher Types
export interface Teacher {
  id: string
  matricule: string
  firstName: string
  lastName: string
  email: string
  phone: string
  avatar?: string
  specialization: string
  subjectIds: string[]
  classIds: string[]
  hireDate: Date
  salary: number
  status: 'active' | 'on_leave' | 'inactive'
}

// Academic Structure Types
export interface Department {
  id: string
  name: string
  code: string
  campusId: string
  headTeacherId?: string
}

export interface ClassLevel {
  id: string
  name: string
  code: string
  departmentId: string
  order: number
}

export interface SchoolClass {
  id: string
  name: string
  classLevelId: string
  academicYearId: string
  mainTeacherId?: string
  maxStudents: number
  currentStudents: number
}

export interface AcademicYear {
  id: string
  name: string
  startDate: Date
  endDate: Date
  isCurrent: boolean
  semesters: Semester[]
}

export interface Semester {
  id: string
  name: string
  startDate: Date
  endDate: Date
  academicYearId: string
}

// Subject Types
export interface Subject {
  id: string
  name: string
  code: string
  coefficient: number
  weeklyHours: number
  departmentId: string
  teacherIds: string[]
}

// Grade Types
export interface Grade {
  id: string
  studentId: string
  subjectId: string
  semesterId: string
  examType: ExamType
  score: number
  maxScore: number
  teacherId: string
  createdAt: Date
}

export type ExamType = 'devoir' | 'composition' | 'examen' | 'td' | 'tp'

export interface ReportCard {
  id: string
  studentId: string
  semesterId: string
  average: number
  rank: number
  totalStudents: number
  appreciation: string
  conductGrade: string
  absences: number
  generatedAt: Date
}

// Timetable Types
export interface TimetableSlot {
  id: string
  dayOfWeek: number
  startTime: string
  endTime: string
  subjectId: string
  teacherId: string
  classId: string
  roomId: string
}

export interface Room {
  id: string
  name: string
  capacity: number
  type: 'classroom' | 'lab' | 'auditorium' | 'office'
  campusId: string
}

// Financial Types
export interface TuitionFee {
  id: string
  name: string
  amount: number
  classLevelId: string
  academicYearId: string
  dueDate: Date
}

export interface Payment {
  id: string
  studentId: string
  tuitionFeeId: string
  amount: number
  method: 'cash' | 'bank_transfer' | 'mobile_money' | 'card'
  status: 'pending' | 'completed' | 'failed' | 'refunded'
  reference: string
  paidAt: Date
}

export interface Invoice {
  id: string
  studentId: string
  items: InvoiceItem[]
  totalAmount: number
  paidAmount: number
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled'
  dueDate: Date
  createdAt: Date
}

export interface InvoiceItem {
  description: string
  amount: number
  quantity: number
}

// Attendance Types
export interface Attendance {
  id: string
  studentId: string
  date: Date
  status: 'present' | 'absent' | 'late' | 'excused'
  classId: string
  recordedBy: string
  note?: string
}

// Communication Types
export interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'warning' | 'success' | 'error'
  recipientIds: string[]
  isRead: boolean
  createdAt: Date
}

export interface Announcement {
  id: string
  title: string
  content: string
  authorId: string
  targetAudience: ('students' | 'teachers' | 'parents' | 'all')[]
  campusIds: string[]
  publishedAt: Date
  expiresAt?: Date
}

// Dashboard Stats Types
export interface DashboardStats {
  totalStudents: number
  totalTeachers: number
  totalClasses: number
  totalRevenue: number
  attendanceRate: number
  averageGrade: number
  pendingPayments: number
  upcomingEvents: number
}

export interface ChartData {
  name: string
  value: number
  color?: string
}

export interface RevenueData {
  month: string
  revenue: number
  expenses: number
}

export interface AttendanceData {
  date: string
  present: number
  absent: number
  late: number
}

// Navigation Types
export interface NavItem {
  title: string
  href: string
  icon: string
  badge?: string | number
  children?: NavItem[]
}

export interface BreadcrumbItem {
  label: string
  href?: string
}
