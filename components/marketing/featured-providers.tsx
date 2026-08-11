import { Star, MapPin, BadgeCheck, Clock } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

type Provider = {
  name: string
  role: string
  initials: string
  rating: number
  reviews: number
  jobs: number
  location: string
  rate: number
  tags: string[]
  responseTime: string
  verified?: boolean
  tone: string
}

const providers: Provider[] = [
  {
    name: "كريم السيد",
    role: "فني كهرباء معتمد",
    initials: "ك.س",
    rating: 4.9,
    reviews: 312,
    jobs: 540,
    location: "صالة، تعز",
    rate: 3000,
    tags: ["تمديدات", "لوحات كهربائية", "سمارت هوم"],
    responseTime: "أقل من 15 دقيقة",
    verified: true,
    tone: "from-chart-1/20 to-transparent",
  },
  {
    name: "منى حسن",
    role: "مهندسة مدنية",
    initials: "م.ح",
    rating: 5.0,
    reviews: 142,
    jobs: 86,
    location: "المظفر، تعز",
    rate: 8000,
    tags: ["معاينات", "ترميمات"],
    responseTime: "أقل من ساعة",
    verified: true,
    tone: "from-chart-2/25 to-transparent",
  },
  {
    name: "حسام عادل",
    role: "أخصائي سباكة",
    initials: "ح.ع",
    rating: 4.8,
    reviews: 487,
    jobs: 920,
    location: "القاهرة، تعز",
    rate: 2500,
    tags: ["تسريبات", "سخانات", "صرف صحي"],
    responseTime: "أقل من 30 دقيقة",
    verified: true,
    tone: "from-chart-3/25 to-transparent",
  },
  {
    name: "سارة إبراهيم",
    role: "فنية تكييف وتبريد",
    initials: "س.إ",
    rating: 4.9,
    reviews: 256,
    jobs: 410,
    location: "الحوبان، تعز",
    rate: 4000,
    tags: ["تركيب مكيفات", "صيانة دورية"],
    responseTime: "أقل من 20 دقيقة",
    verified: true,
    tone: "from-chart-4/25 to-transparent",
  },
]

export function FeaturedProviders() {
  return (
    <section id="providers" className="border-b border-border/60 bg-secondary/30 py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-medium text-primary">الأعلى تقييماً</p>
            <h2 className="mt-1 text-3xl font-semibold tracking-tight md:text-4xl">أبرز مزودي الخدمة</h2>
            <p className="mt-2 max-w-xl text-muted-foreground">
              محترفون مختارون بعناية يقدمون خدمات بخمس نجوم وموثوقون تماماً.
            </p>
          </div>
          <a href="#" className="text-sm font-medium text-primary hover:underline">
            عرض جميع مزودي الخدمة ←
          </a>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {providers.map((p) => (
            <Card
              key={p.name}
              className="group relative overflow-hidden border-border p-0 transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className={`h-20 bg-gradient-to-b ${p.tone}`} />
              <div className="-mt-10 px-5 pb-5">
                <div className="flex items-end justify-between">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl border-4 border-card bg-primary/15 text-base font-semibold text-primary">
                    {p.initials}
                  </div>
                  <div className="flex items-center gap-1 rounded-full bg-card px-2 py-1 text-xs shadow-sm ring-1 ring-border">
                    <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                    <span className="font-semibold">{p.rating}</span>
                    <span className="text-muted-foreground">({p.reviews})</span>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-base font-semibold">{p.name}</h3>
                    {p.verified && <BadgeCheck className="h-4 w-4 text-primary" />}
                  </div>
                  <p className="text-sm text-muted-foreground">{p.role}</p>
                </div>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <Badge key={t} variant="secondary" className="font-normal">
                      {t}
                    </Badge>
                  ))}
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5" /> {p.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" /> {p.responseTime}
                  </span>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                  <div>
                    <div className="text-xs text-muted-foreground">تبدأ من</div>
                    <div className="text-sm font-semibold">
                      {p.rate} ريال
                      <span className="text-xs font-normal text-muted-foreground"> / ساعة</span>
                    </div>
                  </div>
                  <Button size="sm">احجز الآن</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}