"use client"

import { useApp, Project } from "@/context/AppContext"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface Props {
  project: Project | null
  onClose: () => void
}

const priorityLabel: Record<string, string> = {
  low: "Baja", medium: "Media", high: "Alta", urgent: "Urgente"
}

export function ProjectDetail({ project, onClose }: Props) {
  const { members, tasks } = useApp()
  if (!project) return null

  const projectMembers = members.filter(m => project.members.includes(m.userId))
  const projectTasks   = tasks.filter(t => t.projectId === project.id)

  return (
    <Dialog open={!!project} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[560px]">
        <DialogHeader>
          <DialogTitle>{project.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">{project.description}</p>

          <div className="flex gap-2 flex-wrap">
            <Badge>{project.status}</Badge>
            <Badge variant="outline">{priorityLabel[project.priority] ?? project.priority}</Badge>
            <Badge variant="secondary">{project.category}</Badge>
          </div>

          {/* Progreso */}
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

          {/* Miembros */}
          {projectMembers.length > 0 && (
            <div>
              <p className="text-sm font-medium mb-2">Equipo ({projectMembers.length})</p>
              <div className="space-y-2">
                {projectMembers.map(m => (
                  <div key={m.userId} className="flex items-center gap-2">
                    <Avatar className="h-7 w-7">
                      <AvatarFallback className="text-xs">
                        {m.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{m.name}</p>
                      <p className="text-xs text-muted-foreground">{m.position}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tareas */}
          {projectTasks.length > 0 && (
            <div>
              <p className="text-sm font-medium mb-2">Tareas ({projectTasks.length})</p>
              <div className="space-y-1">
                {projectTasks.map(t => (
                  <div key={t.id} className="flex items-center justify-between text-sm border rounded px-3 py-1.5">
                    <span>{t.description}</span>
                    <Badge variant="outline" className="text-xs">{t.status}</Badge>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
