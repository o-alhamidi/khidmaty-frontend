import {
  Zap,
  Wrench,
  Hammer,
  PaintRoller,
  Cpu,
  Sparkles,
  Truck,
  Leaf,
  AirVent,
  Lock,
  Camera,
  HardHat,
} from "lucide-react"
import { Card } from "@/components/ui/card"

const categories = [
  { icon: Zap, name: "كهرباء", count: 248, tone: "text-amber-600 bg-amber-500/10" },
  { icon: Wrench, name: "سباكة", count: 192, tone: "text-sky-600 bg-sky-500/10" },
  { icon: AirVent, name: "تكييف وتبريد", count: 156, tone: "text-cyan-600 bg-cyan-500/10" },
  { icon: Hammer, name: "نجارة", count: 134, tone: "text-orange-600 bg-orange-500/10" },
  { icon: PaintRoller, name: "دهانات", count: 98, tone: "text-rose-600 bg-rose-500/10" },
  { icon: HardHat, name: "هندسة ومقاولات", count: 76, tone: "text-emerald-600 bg-emerald-500/10" },
  { icon: Cpu, name: "تقنية وصيانة", count: 210, tone: "text-indigo-600 bg-indigo-500/10" },
  { icon: Sparkles, name: "نظافة عامة", count: 312, tone: "text-fuchsia-600 bg-fuchsia-500/10" },
  { icon: Truck, name: "نقل عفش", count: 64, tone: "text-yellow-700 bg-yellow-500/10" },
  { icon: Leaf, name: "تنسيق حدائق", count: 88, tone: "text-green-600 bg-green-500/10" },
  { icon: Lock, name: "أقفال ومفاتيح", count: 42, tone: "text-slate-600 bg-slate-500/10" },
  { icon: Camera, name: "كاميرات وحماية", count: 71, tone: "text-red-600 bg-red-500/10" },
]

export function CategoriesSection() {
  return (
    <section id="categories" className="border-b border-border/60 bg-background py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-medium text-primary">تصفح</p>
            <h2 className="mt-1 text-3xl font-semibold tracking-tight md:text-4xl">تصنيفات الخدمات</h2>
            <p className="mt-2 max-w-xl text-muted-foreground">
              استكشف الخدمات المهنية الأكثر طلباً في منصة الخدمات الذكية.
            </p>
          </div>
          <a href="#" className="text-sm font-medium text-primary hover:underline">
            عرض كل التصنيفات ←
          </a>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {categories.map(({ icon: Icon, name, count, tone }) => (
            <Card
              key={name}
              className="group relative cursor-pointer overflow-hidden border-border p-5 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
            >
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${tone}`}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="mt-4">
                <h3 className="text-sm font-semibold">{name}</h3>
                <p className="mt-0.5 text-xs text-muted-foreground">{count} مزود خدمة</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}