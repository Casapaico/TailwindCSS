"use client"

import dynamic from "next/dynamic"
import { useState } from "react"

const OverviewTab  = dynamic(() => import("@/components/overview/OverviewTab").then(m => ({ default: m.OverviewTab })),  { ssr: false })
const ProjectsTab  = dynamic(() => import("@/components/projects/ProjectsTab").then(m => ({ default: m.ProjectsTab })), { ssr: false })
const TeamTab      = dynamic(() => import("@/components/team/TeamTab").then(m => ({ default: m.TeamTab })),              { ssr: false })
const TasksTab     = dynamic(() => import("@/components/tasks/TasksTab").then(m => ({ default: m.TasksTab })),           { ssr: false })
const SettingsTab  = dynamic(() => import("@/components/settings/SettingsTab").then(m => ({ default: m.SettingsTab })), { ssr: false })

const TABS = [
  { id: "overview",  label: "Resumen",        Component: OverviewTab  },
  { id: "projects",  label: "Proyectos",       Component: ProjectsTab  },
  { id: "team",      label: "Equipo",          Component: TeamTab      },
  { id: "tasks",     label: "Tareas",          Component: TasksTab     },
  { id: "settings",  label: "Configuración",   Component: SettingsTab  },
]

export default function DashboardPage() {
  const [active, setActive] = useState("overview")

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

        {/* Tabs manual — evita bug de hidratación de shadcn en producción */}
        <div className="space-y-4">
          <div className="flex w-full gap-1 rounded-lg bg-muted p-1 overflow-x-auto">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActive(tab.id)}
                className={`
                  flex-1 px-3 py-1.5 text-sm font-medium rounded-md transition-all
                  ${active === tab.id
                    ? "bg-background text-foreground shadow"
                    : "text-muted-foreground hover:text-foreground"}
                `}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div>
            {TABS.map(({ id, Component }) => (
              <div key={id} className={active === id ? "block" : "hidden"}>
                <Component />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
