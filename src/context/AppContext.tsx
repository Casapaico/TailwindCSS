"use client"

import { createContext, useContext, useState, ReactNode } from "react"

export interface Project {
  id: string
  name: string
  description: string
  category: string
  priority: string
  status: string
  progress: number
  members: string[]
}

export interface Member {
  userId: string
  role: string
  name: string
  email: string
  position: string
  birthdate: string
  phone: string
  projectId: string
  isActive: boolean
}

export interface Task {
  id: string
  description: string
  projectId: string
  status: "Pendiente" | "En progreso" | "Completado"
  priority: "Baja" | "Media" | "Alta" | "Urgente"
  userId: string
  deadline: string
}

interface AppContextType {
  projects: Project[]
  members: Member[]
  tasks: Task[]
  addProject:    (p: Omit<Project, "id">)  => void
  updateProject: (p: Project)              => void
  deleteProject: (id: string)              => void
  addMember:     (m: Omit<Member, "userId">) => void
  updateMember:  (m: Member)               => void
  deleteMember:  (id: string)              => void
  addTask:       (t: Omit<Task, "id">)     => void
  updateTask:    (t: Task)                 => void
  deleteTask:    (id: string)              => void
}

const INITIAL_PROJECTS: Project[] = [
  { id: "p1", name: "E-commerce Platform",  description: "Plataforma con Next.js",     category: "web",    priority: "high",   status: "En progreso", progress: 65,  members: ["m1","m2"] },
  { id: "p2", name: "Mobile App",           description: "App con React Native",        category: "mobile", priority: "medium", status: "En revisión", progress: 90,  members: ["m3"] },
  { id: "p3", name: "Dashboard Analytics",  description: "Panel con visualizaciones",   category: "web",    priority: "low",    status: "Planificado", progress: 20,  members: ["m4"] },
  { id: "p4", name: "API Gateway",          description: "Microservicios con Node.js",  category: "web",    priority: "urgent", status: "En progreso", progress: 45,  members: ["m2","m4"] },
  { id: "p5", name: "Design System",        description: "Librería de componentes",     category: "design", priority: "medium", status: "Completado",  progress: 100, members: ["m1"] },
  { id: "p6", name: "Marketing Website",    description: "Sitio web institucional",     category: "marketing", priority: "low", status: "En progreso", progress: 75, members: ["m5"] },
]

const INITIAL_MEMBERS: Member[] = [
  { userId: "m1", role: "developer", name: "María García",   email: "maria@example.com",  position: "Frontend Developer", birthdate: "1995-03-15", phone: "999111222", projectId: "p1", isActive: true  },
  { userId: "m2", role: "developer", name: "Juan Pérez",     email: "juan@example.com",   position: "Backend Developer",  birthdate: "1993-07-22", phone: "999333444", projectId: "p1", isActive: true  },
  { userId: "m3", role: "designer",  name: "Ana López",      email: "ana@example.com",    position: "UI/UX Designer",     birthdate: "1997-11-08", phone: "999555666", projectId: "p2", isActive: false },
  { userId: "m4", role: "devops",    name: "Carlos Ruiz",    email: "carlos@example.com", position: "DevOps Engineer",    birthdate: "1990-05-30", phone: "999777888", projectId: "p3", isActive: true  },
  { userId: "m5", role: "manager",   name: "Laura Martínez", email: "laura@example.com",  position: "Project Manager",    birthdate: "1988-09-12", phone: "999999000", projectId: "p6", isActive: true  },
]

const INITIAL_TASKS: Task[] = [
  { id: "t1", description: "Implementar autenticación",  projectId: "p1", status: "En progreso", priority: "Alta",    userId: "m1", deadline: "2025-11-15" },
  { id: "t2", description: "Diseñar pantalla de perfil", projectId: "p2", status: "Pendiente",   priority: "Media",   userId: "m3", deadline: "2025-11-20" },
  { id: "t3", description: "Configurar CI/CD",           projectId: "p4", status: "Completado",  priority: "Alta",    userId: "m4", deadline: "2025-11-10" },
  { id: "t4", description: "Optimizar queries SQL",      projectId: "p1", status: "En progreso", priority: "Urgente", userId: "m2", deadline: "2025-11-12" },
  { id: "t5", description: "Documentar API endpoints",   projectId: "p4", status: "Pendiente",   priority: "Baja",    userId: "m5", deadline: "2025-11-25" },
  { id: "t6", description: "Testing E2E",                projectId: "p1", status: "Pendiente",   priority: "Alta",    userId: "m1", deadline: "2025-11-28" },
  { id: "t7", description: "Deploy en producción",       projectId: "p2", status: "Pendiente",   priority: "Urgente", userId: "m4", deadline: "2025-11-30" },
]

const AppContext = createContext<AppContextType | null>(null)

const uid = () => Math.random().toString(36).slice(2, 9)

export function AppProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS)
  const [members,  setMembers]  = useState<Member[]>(INITIAL_MEMBERS)
  const [tasks,    setTasks]    = useState<Task[]>(INITIAL_TASKS)

  // Projects
  const addProject    = (p: Omit<Project, "id">)  => setProjects(prev => [...prev, { ...p, id: uid() }])
  const updateProject = (p: Project)              => setProjects(prev => prev.map(x => x.id === p.id ? p : x))
  const deleteProject = (id: string)              => setProjects(prev => prev.filter(x => x.id !== id))

  // Members
  const addMember     = (m: Omit<Member, "userId">) => setMembers(prev => [...prev, { ...m, userId: uid() }])
  const updateMember  = (m: Member)               => setMembers(prev => prev.map(x => x.userId === m.userId ? m : x))
  const deleteMember  = (id: string)              => setMembers(prev => prev.filter(x => x.userId !== id))

  // Tasks
  const addTask       = (t: Omit<Task, "id">)     => setTasks(prev => [...prev, { ...t, id: uid() }])
  const updateTask    = (t: Task)                 => setTasks(prev => prev.map(x => x.id === t.id ? t : x))
  const deleteTask    = (id: string)              => setTasks(prev => prev.filter(x => x.id !== id))

  return (
    <AppContext.Provider value={{
      projects, members, tasks,
      addProject, updateProject, deleteProject,
      addMember,  updateMember,  deleteMember,
      addTask,    updateTask,    deleteTask,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error("useApp must be used within AppProvider")
  return ctx
}
