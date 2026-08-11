import { Search, CalendarCheck, Sparkles, Star } from "lucide-react"

const steps = [
  {
    icon: Search,
    title: "ابحث عن الخدمة",
    desc: "أخبرنا بما تحتاجه وموقعك. وتصفح قائمة من المحترفين الموثوقين في منطقتك فوراً.",
  },
  {
    icon: CalendarCheck,
    title: "احجز في ثوانٍ",
    desc: "اختر الوقت المناسب لك. واحصل على تأكيد وتحديثات مباشرة من مزود الخدمة.",
  },
  {
    icon: Sparkles,
    title: "تنفيذ باحترافية",
    desc: "تابع حالة طلبك. وادفع بكل أمان وموثوقية بعد اكتمال العمل على أكمل وجه.",
  },
  {
    icon: Star,
    title: "قيّم واطلب مجدداً",
    desc: "اترك تقييمك، احفظ الفنيين المفضلين لديك، وأعد الطلب بضغطة زر عندما تحتاج إليهم.",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="border-b border-border/60 bg-background py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-primary">آلية العمل</p>
          <h2 className="mt-1 text-3xl font-semibold tracking-tight md:text-4xl">
            من الطلب إلى التنفيذ في 4 خطوات بسيطة
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <div
              key={s.title}
              className="relative rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <span className="absolute left-5 top-5 font-mono text-xs text-muted-foreground">
                0{i + 1}
              </span>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <s.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-base font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}