"use client"

import { TrendingUp, TrendingDown, CalendarDays, Wallet, Users, Star } from "lucide-react"
import { Card } from "@/components/ui/card"

const stats = [
  {
    label: "الحجوزات النشطة",
    value: "12",
    change: "+3",
    trend: "up" as const,
    icon: CalendarDays,
    tone: "bg-primary/10 text-primary",
  },
  {
    label: "إجمالي الإنفاق",
    value: "4,820 ريال",
    change: "+12%",
    trend: "up" as const,
    icon: Wallet,
    tone: "bg-emerald-500/10 text-emerald-600",
  },
  {
    label: "المزودون المفضلون",
    value: "8",
    change: "+2",
    trend: "up" as const,
    icon: Users,
    tone: "bg-sky-500/10 text-sky-600",
  },
  {
    label: "متوسط التقييم",
    value: "4.7",
    change: "0.1−",
    trend: "down" as const,
    icon: Star,
    tone: "bg-amber-500/10 text-amber-600",
  },
]

export function StatsCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 text-start">
      {stats.map((s) => (
        <Card key={s.label} className="p-5">
          <div className="flex items-start justify-between">
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${s.tone}`}>
              <s.icon className="h-5 w-5" />
            </div>
            <span
              className={`flex items-center gap-1 text-xs font-medium ${
                s.trend === "up" ? "text-emerald-600" : "text-rose-600"
              }`}
            >
              {s.trend === "up" ? (
                <TrendingUp className="h-3.5 w-3.5" />
              ) : (
                <TrendingDown className="h-3.5 w-3.5" />
              )}
              {s.change}
            </span>
          </div>
          <div className="mt-5">
            <div className="text-2xl font-semibold tracking-tight">{s.value}</div>
            <div className="mt-1 text-xs text-muted-foreground">{s.label}</div>
          </div>
        </Card>
      ))}
    </div>
  )
}