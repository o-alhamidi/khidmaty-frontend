'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Calendar, Clock, MapPin, MoreHorizontal, Star } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

type ApiBooking = {
  id: string
  date: string
  time: string
  address: string
  totalPrice: number
  status: 'PENDING' | 'CONFIRMED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'
  service?: { title: string }
  provider?: { profile?: { fullName?: string } }
}

const statusLabels: Record<ApiBooking['status'], string> = {
  PENDING: 'قيد الانتظار',
  CONFIRMED: 'مؤكد',
  IN_PROGRESS: 'قيد التنفيذ',
  COMPLETED: 'مكتمل',
  CANCELLED: 'ملغى',
}

const statusStyles: Record<ApiBooking['status'], string> = {
  PENDING: 'bg-muted text-muted-foreground border-border',
  CONFIRMED: 'bg-primary/10 text-primary border-primary/20',
  IN_PROGRESS: 'bg-amber-500/10 text-amber-700 border-amber-500/20',
  COMPLETED: 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20',
  CANCELLED: 'bg-destructive/10 text-destructive border-destructive/20',
}

export function BookingsList() {
  const [bookings, setBookings] = useState<ApiBooking[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || 'null')
    if (!user?.id) {
      setIsLoading(false)
      return
    }

    fetch(`/api/bookings?customerId=${encodeURIComponent(user.id)}`)
      .then(async (response) => {
        const result = await response.json()
        if (!response.ok || !result.success) throw new Error(result.message)
        setBookings(result.data)
      })
      .catch((err) => setError(err instanceof Error ? err.message : 'تعذر جلب الحجوزات'))
      .finally(() => setIsLoading(false))
  }, [])

  return (
    <Card className="overflow-hidden p-0 text-start">
      <div className="flex items-center justify-between border-b border-border p-5">
        <div>
          <h3 className="text-base font-semibold">الحجوزات الأخيرة</h3>
          <p className="mt-1 text-xs text-muted-foreground">تتبع وأدر جميع مواعيد خدماتك</p>
        </div>
        <Link href="/services"><Button variant="outline" size="sm">حجز جديد</Button></Link>
      </div>

      <div className="divide-y divide-border">
        {isLoading && <p className="p-6 text-sm text-muted-foreground">جاري تحميل الحجوزات...</p>}
        {!isLoading && error && <p className="p-6 text-sm text-destructive">{error}</p>}
        {!isLoading && !error && bookings.length === 0 && (
          <div className="p-8 text-center">
            <p className="text-sm text-muted-foreground">لا توجد حجوزات حتى الآن.</p>
            <Link href="/services" className="mt-3 inline-block text-sm font-medium text-primary hover:underline">استكشف الخدمات</Link>
          </div>
        )}
        {!isLoading && !error && bookings.map((booking) => {
          const providerName = booking.provider?.profile?.fullName || 'مقدم الخدمة'
          return (
            <div key={booking.id} className="flex flex-col gap-4 p-5 transition-colors hover:bg-secondary/40 sm:flex-row sm:items-center">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-sm font-semibold text-primary">{providerName.slice(0, 2)}</div>
              <div className="min-w-0 flex-1">
                <h4 className="truncate text-sm font-semibold">{booking.service?.title || 'خدمة'}</h4>
                <p className="mt-0.5 text-xs text-muted-foreground">مع {providerName}</p>
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{new Date(booking.date).toLocaleDateString('ar-YE')}</span>
                  <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{booking.time}</span>
                  <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{booking.address}</span>
                </div>
              </div>
              <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end sm:gap-2">
                <Badge variant="outline" className={statusStyles[booking.status]}>{statusLabels[booking.status]}</Badge>
                <div className="text-sm font-semibold">{booking.totalPrice.toLocaleString('ar-YE')} ريال</div>
              </div>
              <Button variant="ghost" size="icon" className="hidden sm:inline-flex" aria-label="خيارات إضافية"><MoreHorizontal className="h-4 w-4" /></Button>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
