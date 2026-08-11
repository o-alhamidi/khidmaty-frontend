import { Card } from "@/components/ui/card"
import { Zap, Wrench, AirVent, Sparkles, Hammer, PaintRoller } from "lucide-react"

const items = [
  { icon: Zap, label: "كهرباء", tone: "bg-amber-500/10 text-amber-600" },
  { icon: Wrench, label: "سباكة", tone: "bg-sky-500/10 text-sky-600" },
  { icon: AirVent, label: "مكيفات", tone: "bg-cyan-500/10 text-cyan-600" },
  { icon: Sparkles, label: "تنظيف", tone: "bg-fuchsia-500/10 text-fuchsia-600" },
  { icon: Hammer, label: "نجارة", tone: "bg-orange-500/10 text-orange-600" },
  { icon: PaintRoller, label: "دهانات", tone: "bg-rose-500/10 text-rose-600" },
]

export function QuickActions() {
  return (
    <Card className="p-5 text-start">
      <h3 className="text-base font-semibold">حجز سريع</h3>
      <p className="mt-1 text-xs text-muted-foreground">الخدمات الأكثر طلباً، بضغطة زر</p>

      <div className="mt-5 grid grid-cols-3 gap-3">
        {items.map((it) => (
          <button
            key={it.label}
            className="flex flex-col items-center gap-2 rounded-xl border border-border p-3 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-sm"
          >
            <span className={`flex h-9 w-9 items-center justify-center rounded-lg ${it.tone}`}>
              <it.icon className="h-4 w-4" />
            </span>
            <span className="text-xs font-medium">{it.label}</span>
          </button>
        ))}
      </div>
    </Card>
  )
}