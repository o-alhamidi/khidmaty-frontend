import { Calendar, Clock, MapPin, MoreHorizontal, Star } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

type Booking = {
  service: string
  provider: string
  initials: string
  date: string
  time: string
  location: string
  status: "قادم" | "قيد التنفيذ" | "مكتمل" | "قيد الانتظار"
  price: string
  rating?: number
}

const bookings: Booking[] = [
  {
    service: "فحص تمديدات كهربائية",
    provider: "كريم السيد",
    initials: "ك.س",
    date: "غداً",
    time: "09:00 صباحاً",
    location: "تعز",
    status: "قادم",
    price: "480 ريال",
  },
  {
    service: "إصلاح سباكة الحمام",
    provider: "حسام عادل",
    initials: "ح.ع",
    date: "اليوم",
    time: "02:30 مساءً",
    location: "عدن",
    status: "قيد التنفيذ",
    price: "320 ريال",
  },
  {
    service: "صيانة مكيفات هواء",
    provider: "سارة إبراهيم",
    initials: "س.إ",
    date: "12 مارس",
    time: "11:00 صباحاً",
    location: "صنعاء",
    status: "مكتمل",
    price: "650 ريال",
    rating: 5,
  },
  {
    service: "تركيب خزائن مطبخ",
    provider: "طارق مصطفى",
    initials: "ط.م",
    date: "18 مارس",
    time: "10:00 صباحاً",
    location: "إب",
    status: "قيد الانتظار",
    price: "1,200 ريال",
  },
]

const statusStyles: Record<Booking["status"], string> = {
  "قادم": "bg-primary/10 text-primary border-primary/20",
  "قيد التنفيذ": "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20",
  "مكتمل": "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20",
  "قيد الانتظار": "bg-muted text-muted-foreground border-border",
}

export function BookingsList() {
  return (
    <Card className="overflow-hidden p-0 text-start">
      <div className="flex items-center justify-between border-b border-border p-5">
        <div>
          <h3 className="text-base font-semibold">الحجوزات الأخيرة</h3>
          <p className="mt-1 text-xs text-muted-foreground">تتبع وأدر جميع مواعيد خدماتك</p>
        </div>
        <Button variant="outline" size="sm">
          عرض الكل
        </Button>
      </div>

      <div className="divide-y divide-border">
        {bookings.map((b) => (
          <div
            key={b.service}
            className="flex flex-col gap-4 p-5 transition-colors hover:bg-secondary/40 sm:flex-row sm:items-center"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-sm font-semibold text-primary">
              {b.initials}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h4 className="truncate text-sm font-semibold">{b.service}</h4>
                {b.rating && (
                  <span className="flex items-center gap-0.5 text-xs text-muted-foreground">
                    <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                    {b.rating}.0
                  </span>
                )}
              </div>
              <p className="mt-0.5 text-xs text-muted-foreground">مع {b.provider}</p>
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {b.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {b.time}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  {b.location}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end sm:gap-2">
              <Badge variant="outline" className={statusStyles[b.status]}>
                {b.status}
              </Badge>
              <div className="text-sm font-semibold">{b.price}</div>
            </div>

            <Button variant="ghost" size="icon" className="hidden sm:inline-flex" aria-label="خيارات إضافية">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </Card>
  )
}