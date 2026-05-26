"use client"

import { useState, useEffect } from "react"
import { useApp, Member } from "@/context/AppContext"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface Props {
  open: boolean
  onClose: () => void
  member?: Member | null
}

const EMPTY: Omit<Member, "userId"> = {
  role: "", name: "", email: "", position: "",
  birthdate: "", phone: "", projectId: "", isActive: true,
}

export function MemberForm({ open, onClose, member }: Props) {
  const { addMember, updateMember, projects } = useApp()
  const [form, setForm]       = useState<Omit<Member, "userId">>(EMPTY)
  const [error, setError]     = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setForm(member ? { ...member } : EMPTY)
    setError("")
  }, [member, open])

  const set = (field: keyof Omit<Member, "userId">, value: unknown) =>
    setForm(prev => ({ ...prev, [field]: value }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.role || !form.projectId) {
      setError("Nombre, email, rol y proyecto son obligatorios.")
      return
    }
    if (!form.email.includes("@")) {
      setError("El email no es válido.")
      return
    }
    setLoading(true)
    setTimeout(() => {
      member ? updateMember({ ...form, userId: member.userId }) : addMember(form)
      setLoading(false)
      onClose()
    }, 800)
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[560px] max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{member ? "Editar Miembro" : "Nuevo Miembro"}</DialogTitle>
            <DialogDescription>Completa los datos del miembro del equipo.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Nombre <span className="text-red-500">*</span></Label>
                <Input value={form.name}
                  onChange={e => set("name", e.target.value)}
                  placeholder="Juan Pérez" />
              </div>
              <div className="grid gap-2">
                <Label>Email <span className="text-red-500">*</span></Label>
                <Input type="email" value={form.email}
                  onChange={e => set("email", e.target.value)}
                  placeholder="juan@example.com" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Rol <span className="text-red-500">*</span></Label>
                <Select value={form.role} onValueChange={v => set("role", v)}>
                  <SelectTrigger><SelectValue placeholder="Selecciona" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="developer">Developer</SelectItem>
                    <SelectItem value="designer">Designer</SelectItem>
                    <SelectItem value="devops">DevOps</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="qa">QA</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Cargo</Label>
                <Input value={form.position}
                  onChange={e => set("position", e.target.value)}
                  placeholder="Frontend Developer" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Teléfono</Label>
                <Input value={form.phone}
                  onChange={e => set("phone", e.target.value)}
                  placeholder="999888777" />
              </div>
              <div className="grid gap-2">
                <Label>Fecha de nacimiento</Label>
                <Input
                  type="date"
                  value={form.birthdate}
                  onChange={e => set("birthdate", e.target.value)}
                />
              </div>
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
                <Label>Estado</Label>
                <Select
                  value={form.isActive ? "active" : "inactive"}
                  onValueChange={v => set("isActive", v === "active")}
                >
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Activo</SelectItem>
                    <SelectItem value="inactive">Inactivo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Cancelar</Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Guardando..." : member ? "Actualizar" : "Agregar Miembro"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
