import { Star, BadgeCheck } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const providers = [
  { name: "كريم السيد", role: "كهربائي", initials: "ك.س", rating: 4.9, jobs: 12 },
  { name: "حسام عادل", role: "سباك", initials: "ح.ع", rating: 4.8, jobs: 8 },
  { name: "منى حسن", role: "مهندسة", initials: "م.ح", rating: 5.0, jobs: 3 },
  { name: "سارة إبراهيم", role: "فنية تكييف", initials: "س.إ", rating: 4.9, jobs: 5 },
]

export function FavoriteProviders() {
  return (
    <Card className="p-5 text-start">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold">المزودون المفضلون</h3>
          <p className="mt-1 text-xs text-muted-foreground">حجز سريع لمن تثق بهم</p>
        </div>
        <Button variant="ghost" size="sm" className="text-xs">
          عرض الكل
        </Button>
      </div>

      <div className="mt-5 space-y-3">
        {providers.map((p) => (
          <div
            key={p.name}
            className="flex items-center gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-secondary/40"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-xs font-semibold text-primary">
              {p.initials}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1">
                <p className="truncate text-sm font-medium">{p.name}</p>
                <BadgeCheck className="h-3.5 w-3.5 shrink-0 text-primary" />
              </div>
              <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
                <span>{p.role}</span>
                <span>·</span>
                <span className="flex items-center gap-0.5" dir="ltr">
                  <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                  {p.rating}
                </span>
              </div>
            </div>
            <span className="text-xs text-muted-foreground">{p.jobs} مهمة</span>
          </div>
        ))}
      </div>
    </Card>
  )
}