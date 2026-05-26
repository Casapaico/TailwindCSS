"use client"

import { useState } from "react"
import { useApp, Task } from "@/context/AppContext"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Pagination, PaginationContent, PaginationItem,
  PaginationLink, PaginationNext, PaginationPrevious,
} from "@/components/ui/pagination"
import { TaskForm } from "./TaskForm"

const PAGE_SIZE = 4

const statusVariant = (s: string) =>
  s === "Completado" ? "default" : s === "En progreso" ? "secondary" : "outline"

const priorityVariant = (p: string) =>
  p === "Urgente" ? "destructive" : p === "Alta" ? "default" : p === "Media" ? "secondary" : "outline"

export function TasksTab() {
  const { tasks, deleteTask, members, projects } = useApp()
  const [formOpen, setFormOpen] = useState(false)
  const [editing,  setEditing]  = useState<Task | null>(null)
  const [page,     setPage]     = useState(1)

  const totalPages  = Math.max(1, Math.ceil(tasks.length / PAGE_SIZE))
  const paginated   = tasks.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const handleEdit  = (t: Task) => { setEditing(t); setFormOpen(true) }
  const handleClose = () => { setFormOpen(false); setEditing(null) }

  const getMemberName  = (id: string) => members.find(m => m.userId === id)?.name  ?? "—"
  const getProjectName = (id: string) => projects.find(p => p.id    === id)?.name  ?? "—"

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={() => { setEditing(null); setFormOpen(true) }}>
          + Nueva Tarea
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Gestión de Tareas</CardTitle>
          <CardDescription>
            {tasks.filter(t => t.status === "Completado").length} completadas de {tasks.length} totales
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40px]"><Checkbox /></TableHead>
                  <TableHead>Descripción</TableHead>
                  <TableHead>Proyecto</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Prioridad</TableHead>
                  <TableHead>Responsable</TableHead>
                  <TableHead>Fecha límite</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginated.map(task => (
                  <TableRow key={task.id}>
                    <TableCell><Checkbox /></TableCell>
                    <TableCell className="font-medium">{task.description}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {getProjectName(task.projectId)}
                    </TableCell>
                    <TableCell>
                      <Badge variant={statusVariant(task.status)}>{task.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={priorityVariant(task.priority)}>{task.priority}</Badge>
                    </TableCell>
                    <TableCell className="text-sm">{getMemberName(task.userId)}</TableCell>
                    <TableCell className="text-sm">{task.deadline || "—"}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button size="sm" variant="ghost" onClick={() => handleEdit(task)}>
                          Editar
                        </Button>
                        <Button size="sm" variant="destructive"
                          onClick={() => deleteTask(task.id)}>
                          Eliminar
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Paginación */}
          <div className="mt-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    className={page === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                  <PaginationItem key={n}>
                    <PaginationLink
                      isActive={page === n}
                      onClick={() => setPage(n)}
                      className="cursor-pointer"
                    >
                      {n}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    className={page === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>

      <TaskForm open={formOpen} onClose={handleClose} task={editing} />
    </div>
  )
}
