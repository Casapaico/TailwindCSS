"use client"

import { useState } from "react"
import { useApp, Project } from "@/context/AppContext"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ProjectForm } from "./ProjectForm"
import { ProjectDetail } from "./ProjectDetail"

const priorityLabel: Record<string, string> = {
  low: "Baja", medium: "Media", high: "Alta", urgent: "Urgente"
}

export function ProjectsTab() {
  const { projects, deleteProject } = useApp()
  const [formOpen,   setFormOpen]   = useState(false)
  const [editing,    setEditing]    = useState<Project | null>(null)
  const [detailProject, setDetail]  = useState<Project | null>(null)

  const handleEdit = (p: Project) => { setEditing(p); setFormOpen(true) }
  const handleClose = () => { setFormOpen(false); setEditing(null) }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={() => { setEditing(null); setFormOpen(true) }}>
          + Nuevo Proyecto
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map(project => (
          <Card key={project.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{project.name}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </div>
                <Badge variant={
                  project.status === "Completado"  ? "default"   :
                  project.status === "En revisión" ? "secondary" : "outline"
                }>
                  {project.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex gap-2 flex-wrap">
                  <Badge variant="outline">{priorityLabel[project.priority] ?? project.priority}</Badge>
                  <Badge variant="secondary">{project.members.length} miembros</Badge>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Progreso</span>
                    <span className="font-medium">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                    <div className="h-full bg-primary transition-all"
                      style={{ width: `${project.progress}%` }} />
                  </div>
                </div>

                <div className="flex gap-2 pt-1">
                  <Button size="sm" variant="outline"
                    className="flex-1" onClick={() => setDetail(project)}>
                    Ver detalles
                  </Button>
                  <Button size="sm" variant="ghost"
                    className="flex-1" onClick={() => handleEdit(project)}>
                    Editar
                  </Button>
                  <Button size="sm" variant="destructive"
                    onClick={() => deleteProject(project.id)}>
                    Eliminar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <ProjectForm open={formOpen} onClose={handleClose} project={editing} />
      <ProjectDetail project={detailProject} onClose={() => setDetail(null)} />
    </div>
  )
}
