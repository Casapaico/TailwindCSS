"use client"

import { useState, useEffect } from "react"
import { useApp, Task } from "@/context/AppContext"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface Props {
  open: boolean
  onClose: () => void
  task?: Task | null
}

const EMPTY: Omit<Task, "id"> = {
  description: "", projectId: "", status: "Pendiente",
  priority: "Media", userId: "", deadline: "",
}

export function TaskForm({ open, onClose, task }: Props) {
  const { addTask, updateTask, projects, members } = useApp()
  const [form, setForm]       = useState<Omit<Task, "id">>(EMPTY)
  const [error, setError]     = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setForm(task ? { ...task } : EMPTY)
    setError("")
  }, [task, open])

  const set = (field: keyof Omit<Task, "id">, value: unknown) =>
    setForm(prev => ({ ...prev, [field]: value }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.description || !form.projectId || !form.userId) {
      setError("Descripción, proyecto y responsable son obligatorios.")
      return
    }
    setLoading(true)
    setTimeout(() => {
      task ? updateTask({ ...form, id: task.id }) : addTask(form)
      setLoading(false)
      onClose()
    }, 800)
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[540px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{task ? "Editar Tarea" : "Nueva Tarea"}</DialogTitle>
            <DialogDescription>Completa los datos de la tarea.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="grid gap-2">
              <Label>Descripción <span className="text-red-500">*</span></Label>
              <Input value={form.description}
                onChange={e => set("description", e.target.value)}
                placeholder="Descripción de la tarea" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Proyecto <span className="text-red-500">*</span></Label>
                <Select value={form.projectId} onValueChange={v => set("projectId", v)}>
                  <SelectTrigger><SelectValue placeholder="Selecciona" /></SelectTrigger>
                  <SelectContent>
                    {projects.map(p => (
                      <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Responsable <span className="text-red-500">*</span></Label>
                <Select value={form.userId} onValueChange={v => set("userId", v)}>
                  <SelectTrigger><SelectValue placeholder="Selecciona" /></SelectTrigger>
                  <SelectContent>
                    {members.map(m => (
                      <SelectItem key={m.userId} value={m.userId}>{m.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Estado</Label>
                <Select value={form.status} onValueChange={v => set("status", v as Task["status"])}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pendiente">Pendiente</SelectItem>
                    <SelectItem value="En progreso">En progreso</SelectItem>
                    <SelectItem value="Completado">Completado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Prioridad</Label>
                <Select value={form.priority} onValueChange={v => set("priority", v as Task["priority"])}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Baja">Baja</SelectItem>
                    <SelectItem value="Media">Media</SelectItem>
                    <SelectItem value="Alta">Alta</SelectItem>
                    <SelectItem value="Urgente">Urgente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-2">
              <Label>Fecha límite</Label>
              <Input
                type="date"
                value={form.deadline}
                onChange={e => set("deadline", e.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Cancelar</Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Guardando..." : task ? "Actualizar" : "Crear Tarea"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
