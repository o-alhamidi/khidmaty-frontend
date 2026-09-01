'use client'

import { useEffect, useState } from "react"
import { TrendingUp, CalendarDays, Wallet, Users, Star } from "lucide-react"
import { Card } from "@/components/ui/card"

type Booking = { status: string; totalPrice: number; providerId: string; review?: { rating: number } | null }

export function StatsCards() {
  const [bookings, setBookings] = useState<Booking[]>([])

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || 'null')
    if (!user?.id) return
    fetch(`/api/bookings?customerId=${encodeURIComponent(user.id)}`)
      .then((response) => response.json())
      .then((result) => result.success && setBookings(result.data))
      .catch(() => undefined)
  }, [])

  const activeCount = bookings.filter((booking) => ['PENDING', 'CONFIRMED', 'IN_PROGRESS'].includes(booking.status)).length
  const totalSpent = bookings.reduce((sum, booking) => sum + booking.totalPrice, 0)
  const providerCount = new Set(bookings.map((booking) => booking.providerId)).size
  const ratings = bookings.flatMap((booking) => booking.review ? [booking.review.rating] : [])
  const averageRating = ratings.length ? (ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length).toFixed(1) : '—'

  const stats = [
    { label: "الحجوزات النشطة", value: String(activeCount), icon: CalendarDays, tone: "bg-primary/10 text-primary" },
    { label: "إجمالي الإنفاق", value: `${totalSpent.toLocaleString('ar-YE')} ريال`, icon: Wallet, tone: "bg-emerald-500/10 text-emerald-600" },
    { label: "مزودون مختلفون", value: String(providerCount), icon: Users, tone: "bg-sky-500/10 text-sky-600" },
    { label: "متوسط التقييم", value: averageRating, icon: Star, tone: "bg-amber-500/10 text-amber-600" },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 text-start">
      {stats.map((stat) => (
        <Card key={stat.label} className="p-5">
          <div className="flex items-start justify-between">
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.tone}`}><stat.icon className="h-5 w-5" /></div>
            <span className="flex items-center gap-1 text-xs font-medium text-muted-foreground"><TrendingUp className="h-3.5 w-3.5" /> مباشر</span>
          </div>
          <div className="mt-5"><div className="text-2xl font-semibold tracking-tight">{stat.value}</div><div className="mt-1 text-xs text-muted-foreground">{stat.label}</div></div>
        </Card>
      ))}
    </div>
  )
}
