"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { OverviewTab }  from "@/components/overview/OverviewTab"
import { ProjectsTab }  from "@/components/projects/ProjectsTab"
import { TeamTab }      from "@/components/team/TeamTab"
import { TasksTab }     from "@/components/tasks/TasksTab"
import { SettingsTab }  from "@/components/settings/SettingsTab"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-slate-100 p-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Dashboard de Proyectos
          </h1>
          <p className="text-slate-600">
            Gestiona tus proyectos y tareas con shadcn/ui
          </p>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid grid-cols-5 w-full">
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
