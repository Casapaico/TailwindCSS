"use client"

import { useState } from "react"
import { useApp, Member } from "@/context/AppContext"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MemberForm } from "./MemberForm"

export function TeamTab() {
  const { members, deleteMember, projects } = useApp()
  const [formOpen, setFormOpen] = useState(false)
  const [editing,  setEditing]  = useState<Member | null>(null)

  const handleEdit  = (m: Member) => { setEditing(m); setFormOpen(true) }
  const handleClose = () => { setFormOpen(false); setEditing(null) }

  const getProjectName = (id: string) =>
    projects.find(p => p.id === id)?.name ?? "—"

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={() => { setEditing(null); setFormOpen(true) }}>
          + Nuevo Miembro
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Miembros del Equipo</CardTitle>
          <CardDescription>
            {members.filter(m => m.isActive).length} activos de {members.length} totales
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {members.map(member => (
              <div key={member.userId}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarFallback>
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{member.name}</p>
                    <p className="text-sm text-muted-foreground">{member.position}</p>
                    <p className="text-xs text-muted-foreground">{member.email}</p>
                    <p className="text-xs text-muted-foreground">
                      📁 {getProjectName(member.projectId)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={member.isActive ? "default" : "secondary"}>
                    {member.isActive ? "Activo" : "Inactivo"}
                  </Badge>
                  <Button size="sm" variant="outline" onClick={() => handleEdit(member)}>
                    Editar
                  </Button>
                  <Button size="sm" variant="destructive"
                    onClick={() => deleteMember(member.userId)}>
                    Eliminar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <MemberForm open={formOpen} onClose={handleClose} member={editing} />
    </div>
  )
}
