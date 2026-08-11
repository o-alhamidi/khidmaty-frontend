"use client"

import * as React from "react"
import { Search, MapPin, ShieldCheck, Star, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-border/60">
      {/* subtle decorative grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.4] dark:opacity-[0.25]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage: "radial-gradient(ellipse 60% 50% at 50% 0%, #000 50%, transparent 100%)",
        }}
      />

      <div className="container relative mx-auto grid items-center gap-10 px-4 py-16 md:grid-cols-2 md:px-6 md:py-24">
        <div className="flex flex-col gap-6">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs font-medium text-muted-foreground">
            <span className="flex h-2 w-2 rounded-full bg-primary" />
            موثوق من قبل +12,000 عميل
          </div>

          <h1 className="text-pretty text-4xl font-semibold leading-tight tracking-tight md:text-5xl lg:text-6xl">
            ابحث عن أمهر المحترفين لكل احتياجات <span className="text-primary">منزلك وعملك</span>.
          </h1>

          <p className="max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            احجز أفضل المستقلين، الفنيين، ومقدمي الخدمات الموثوقين في دقائق. أسعار شفافة، تقييمات معتمدة، وحجز فوري.
          </p>

          {/* search bar */}
          <div className="mt-2 flex flex-col gap-2 rounded-2xl border border-border bg-card p-2 shadow-sm sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="أي خدمة تحتاج؟"
                className="h-11 border-transparent bg-transparent ps-9 shadow-none focus-visible:ring-0"
              />
            </div>
            <div className="hidden h-6 w-px bg-border sm:block" />
            <div className="relative flex-1">
              <MapPin className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="موقعك"
                defaultValue="تعز، اليمن"
                className="h-11 border-transparent bg-transparent ps-9 shadow-none focus-visible:ring-0"
              />
            </div>
            <Button size="lg" className="h-11 gap-1.5">
              بحث
              <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-primary" /> مزودون معتمدون
            </span>
            <span className="flex items-center gap-1.5">
              <Star className="h-4 w-4 fill-amber-500 text-amber-500" /> متوسط تقييم 4.9
            </span>
            <span>·</span>
            <span>إلغاء مجاني</span>
          </div>
        </div>

        {/* preview card */}
        <div className="relative">
          <div className="absolute -right-6 top-10 hidden rounded-2xl border border-border bg-card p-4 shadow-lg md:block animate-in fade-in slide-in-from-right-4 duration-700">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-semibold">
                أح
              </div>
              <div>
                <p className="text-sm font-medium leading-none">أحمد حجز فني كهرباء</p>
                <p className="mt-1 text-xs text-muted-foreground">منذ دقيقتين · تعز</p>
              </div>
            </div>
          </div>

          <div className="absolute -left-4 bottom-6 hidden rounded-2xl border border-border bg-card p-4 shadow-lg md:block animate-in fade-in slide-in-from-left-4 duration-700 delay-200">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
              <span className="text-sm font-semibold">5.0</span>
              <span className="text-xs text-muted-foreground">· 240 تقييم</span>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">"عمل سريع، احترافي، ونظيف."</p>
          </div>

          <div className="rounded-3xl border border-border bg-gradient-to-br from-primary/10 via-card to-card p-1 shadow-xl">
            <div className="rounded-[calc(1.5rem-4px)] bg-card p-6">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "مزود نشط", value: "8.4 ألف" },
                  { label: "مهمة منجزة", value: "120 ألف" },
                  { label: "متوسط الرد", value: "12 دقيقة" },
                  { label: "مدينة مدعومة", value: "32" },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-xl border border-border bg-background p-4">
                    <div className="text-2xl font-semibold tracking-tight">{stat.value}</div>
                    <div className="mt-1 text-xs text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-xl border border-border bg-background p-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">حجوزات اليوم</div>
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                    مباشر
                  </span>
                </div>
                <div className="mt-3 space-y-2">
                  {[
                    { t: "09:00", s: "صيانة مكيفات", who: "طارق م.", c: "bg-chart-1/20 text-chart-1" },
                    { t: "11:30", s: "سباكة", who: "سارة خ.", c: "bg-chart-2/20 text-chart-2" },
                    { t: "14:00", s: "تمديد كهرباء", who: "حسام أ.", c: "bg-chart-3/20 text-chart-3" },
                  ].map((b) => (
                    <div
                      key={b.t}
                      className="flex items-center gap-3 rounded-lg px-2 py-1.5 transition-colors hover:bg-secondary"
                    >
                      <span className="font-mono text-xs text-muted-foreground">{b.t}</span>
                      <span className="text-sm">{b.s}</span>
                      <span className={`mr-auto rounded-full px-2 py-0.5 text-xs ${b.c}`}>{b.who}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}