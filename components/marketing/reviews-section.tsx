import { Star, Quote } from "lucide-react"
import { Card } from "@/components/ui/card"

const reviews = [
  {
    name: "ليلى م.",
    role: "مالك منزل",
    initials: "ل.م",
    rating: 5,
    title: "أنقذوا عطلة نهاية الأسبوع",
    body: "حجزت فني كهرباء صباح السبت، وصل خلال 20 دقيقة وأصلح كل شيء باحترافية ونظافة. بالتأكيد سأستخدم المنصة مرة أخرى.",
    service: "كهرباء",
  },
  {
    name: "عمر ط.",
    role: "مدير مكتب",
    initials: "ع.ط",
    rating: 5,
    title: "موثوقون لشركتنا",
    body: "نستخدم المنصة الآن لكل احتياجات الصيانة لدينا. الأسعار شفافة، ولوحة التحكم تجعل جدولة المواعيد في غاية السهولة.",
    service: "تكييف وتبريد",
  },
  {
    name: "نور أ.",
    role: "مستأجر",
    initials: "ن.أ",
    rating: 4,
    title: "تجربة سلسة",
    body: "كان السباك محترفًا وشرح لي كل شيء بصدر رحب. تتبع الحجز في الوقت الفعلي ميزة رائعة جداً أضافت لي الكثير من الطمأنينة.",
    service: "سباكة",
  },
]

export function ReviewsSection() {
  return (
    <section id="reviews" className="border-b border-border/60 bg-secondary/30 py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-primary">المفضلة لدى عملائنا</p>
          <h2 className="mt-1 text-3xl font-semibold tracking-tight md:text-4xl">ماذا يقولون عنا؟</h2>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {reviews.map((r) => (
            <Card key={r.name} className="relative overflow-hidden p-6">
              <Quote className="absolute left-5 top-5 h-8 w-8 text-primary/15 rtl:-scale-x-100" />
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < r.rating ? "fill-amber-500 text-amber-500" : "text-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>
              <h3 className="mt-4 text-base font-semibold">{r.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.body}</p>
              <div className="mt-6 flex items-center gap-3 border-t border-border pt-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                  {r.initials}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium">{r.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {r.role} · {r.service}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}