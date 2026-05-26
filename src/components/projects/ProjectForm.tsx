"use client"

import { useState, useEffect } from "react"
import { useApp, Project } from "@/context/AppContext"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface Props {
  open: boolean
  onClose: () => void
  project?: Project | null
}

const EMPTY: Omit<Project, "id"> = {
  name: "", description: "", category: "",
  priority: "", status: "Planificado", progress: 0, members: [],
}

export function ProjectForm({ open, onClose, project }: Props) {
  const { addProject, updateProject, members } = useApp()
  const [form, setForm]     = useState<Omit<Project, "id">>(EMPTY)
  const [error, setError]   = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setForm(project ? { ...project } : EMPTY)
    setError("")
  }, [project, open])

  const set = (field: keyof Omit<Project, "id">, value: unknown) =>
    setForm(prev => ({ ...prev, [field]: value }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.category || !form.priority) {
      setError("Completa todos los campos obligatorios.")
      return
    }
    setLoading(true)
    setTimeout(() => {
      project ? updateProject({ ...form, id: project.id }) : addProject(form)
      setLoading(false)
      onClose()
    }, 800)
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[540px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{project ? "Editar Proyecto" : "Nuevo Proyecto"}</DialogTitle>
            <DialogDescription>Completa la información del proyecto.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="grid gap-2">
              <Label>Nombre <span className="text-red-500">*</span></Label>
              <Input value={form.name} onChange={e => set("name", e.target.value)}
                placeholder="Mi Proyecto" required />
            </div>

            <div className="grid gap-2">
              <Label>Descripción</Label>
              <Input value={form.description} onChange={e => set("description", e.target.value)}
                placeholder="Breve descripción..." />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Categoría <span className="text-red-500">*</span></Label>
                <Select value={form.category} onValueChange={v => set("category", v)}>
                  <SelectTrigger><SelectValue placeholder="Selecciona" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="web">Desarrollo Web</SelectItem>
                    <SelectItem value="mobile">Mobile</SelectItem>
                    <SelectItem value="design">Diseño</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="other">Otro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label>Prioridad <span className="text-red-500">*</span></Label>
                <Select value={form.priority} onValueChange={v => set("priority", v)}>
                  <SelectTrigger><SelectValue placeholder="Selecciona" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Baja</SelectItem>
                    <SelectItem value="medium">Media</SelectItem>
                    <SelectItem value="high">Alta</SelectItem>
                    <SelectItem value="urgent">Urgente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Estado</Label>
                <Select value={form.status} onValueChange={v => set("status", v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Planificado">Planificado</SelectItem>
                    <SelectItem value="En progreso">En progreso</SelectItem>
                    <SelectItem value="En revisión">En revisión</SelectItem>
                    <SelectItem value="Completado">Completado</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label>Progreso (%)</Label>
                <Input type="number" min={0} max={100}
                  value={form.progress}
                  onChange={e => set("progress", Number(e.target.value))} />
              </div>
            </div>

            <div className="grid gap-2">
              <Label>Miembros del equipo</Label>
              <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto border rounded-md p-2">
                {members.map(m => (
                  <label key={m.userId} className="flex items-center gap-2 text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.members.includes(m.userId)}
                      onChange={e => {
                        const updated = e.target.checked
                          ? [...form.members, m.userId]
                          : form.members.filter(id => id !== m.userId)
                        set("members", updated)
                      }}
                      className="accent-primary"
                    />
                    {m.name}
                  </label>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Cancelar</Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Guardando..." : project ? "Actualizar" : "Crear Proyecto"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
