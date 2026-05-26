"use client"

import * as React from "react"

export interface CalendarProps {
  mode?: "single"
  selected?: Date
  onSelect?: (date: Date | undefined) => void
  initialFocus?: boolean
}

export function Calendar({ selected, onSelect }: CalendarProps) {
  const value = selected ? selected.toISOString().split("T")[0] : ""

  return (
    <div className="p-3">
      <input
        type="date"
        value={value}
        onChange={e => {
          const d = e.target.value ? new Date(e.target.value + "T00:00:00") : undefined
          onSelect?.(d)
        }}
        className="border rounded-md px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  )
}
