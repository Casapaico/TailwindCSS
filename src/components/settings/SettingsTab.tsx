"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Switch } from "@/components/ui/switch"

export function SettingsTab() {
  const [saved,  setSaved]  = useState(false)
  const [loading, setLoading] = useState(false)
  const [settings, setSettings] = useState({
    orgName:       "Mi Organización",
    adminEmail:    "admin@example.com",
    language:      "es",
    timezone:      "America/Lima",
    notifications: true,
    darkMode:      false,
    autoSave:      true,
    tasksPerPage:  "10",
  })

  const set = (field: keyof typeof settings, value: unknown) =>
    setSettings(prev => ({ ...prev, [field]: value }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    }, 800)
  }

  return (
    <div className="space-y-6 max-w-2xl">
      {saved && (
        <Alert>
          <AlertDescription>✓ Configuración guardada correctamente.</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* General */}
        <Card>
          <CardHeader>
            <CardTitle>General</CardTitle>
            <CardDescription>Configuración básica de la organización</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label>Nombre de la organización</Label>
              <Input value={settings.orgName}
                onChange={e => set("orgName", e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label>Email del administrador</Label>
              <Input type="email" value={settings.adminEmail}
                onChange={e => set("adminEmail", e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Idioma</Label>
                <Select value={settings.language} onValueChange={v => set("language", v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="pt">Português</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Zona horaria</Label>
                <Select value={settings.timezone} onValueChange={v => set("timezone", v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="America/Lima">America/Lima</SelectItem>
                    <SelectItem value="America/Bogota">America/Bogota</SelectItem>
                    <SelectItem value="America/Mexico_City">America/Mexico_City</SelectItem>
                    <SelectItem value="America/Santiago">America/Santiago</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Preferencias */}
        <Card>
          <CardHeader>
            <CardTitle>Preferencias</CardTitle>
            <CardDescription>Personaliza tu experiencia</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { field: "notifications", label: "Notificaciones",      desc: "Recibir alertas de actividad" },
              { field: "darkMode",      label: "Modo oscuro",          desc: "Cambiar apariencia de la interfaz" },
              { field: "autoSave",      label: "Guardado automático",  desc: "Guardar cambios automáticamente" },
            ].map(({ field, label, desc }) => (
              <div key={field} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="text-sm font-medium">{label}</p>
                  <p className="text-xs text-muted-foreground">{desc}</p>
                </div>
                <Switch
                  checked={!!settings[field as keyof typeof settings]}
                  onCheckedChange={v => set(field as keyof typeof settings, v)}
                />
              </div>
            ))}

            <div className="grid gap-2">
              <Label>Tareas por página</Label>
              <Select value={settings.tasksPerPage} onValueChange={v => set("tasksPerPage", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Guardando..." : "Guardar configuración"}
        </Button>
      </form>
    </div>
  )
}
