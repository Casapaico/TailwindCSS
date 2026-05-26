"use client"

import dynamic from "next/dynamic"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const OverviewTab  = dynamic(() => import("@/components/overview/OverviewTab").then(m => ({ default: m.OverviewTab })),  { ssr: false })
const ProjectsTab  = dynamic(() => import("@/components/projects/ProjectsTab").then(m => ({ default: m.ProjectsTab })), { ssr: false })
const TeamTab      = dynamic(() => import("@/components/team/TeamTab").then(m => ({ default: m.TeamTab })),              { ssr: false })
const TasksTab     = dynamic(() => import("@/components/tasks/TasksTab").then(m => ({ default: m.TasksTab })),           { ssr: false })
const SettingsTab  = dynamic(() => import("@/components/settings/SettingsTab").then(m => ({ default: m.SettingsTab })), { ssr: false })

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Dashboard de Proyectos
          </h1>
          <p className="text-slate-600">
            Gestiona tus proyectos y tareas con shadcn/ui
          </p>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="flex w-full overflow-x-auto">
            <TabsTrigger value="overview">Resumen</TabsTrigger>
            <TabsTrigger value="projects">Proyectos</TabsTrigger>
            <TabsTrigger value="team">Equipo</TabsTrigger>
            <TabsTrigger value="tasks">Tareas</TabsTrigger>
            <TabsTrigger value="settings">Configuración</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">  <OverviewTab />  </TabsContent>
          <TabsContent value="projects">  <ProjectsTab />  </TabsContent>
          <TabsContent value="team">      <TeamTab />      </TabsContent>
          <TabsContent value="tasks">     <TasksTab />     </TabsContent>
          <TabsContent value="settings">  <SettingsTab />  </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
