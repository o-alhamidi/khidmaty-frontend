"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const data = [
  { m: "يناير", bookings: 8, spend: 380 },
  { m: "فبراير", bookings: 12, spend: 540 },
  { m: "مارس", bookings: 9, spend: 420 },
  { m: "أبريل", bookings: 14, spend: 680 },
  { m: "مايو", bookings: 18, spend: 820 },
  { m: "يونيو", bookings: 16, spend: 740 },
  { m: "يوليو", bookings: 22, spend: 980 },
  { m: "أغسطس", bookings: 20, spend: 880 },
  { m: "سبتمبر", bookings: 25, spend: 1120 },
  { m: "أكتوبر", bookings: 28, spend: 1240 },
  { m: "نوفمبر", bookings: 24, spend: 1080 },
  { m: "ديسمبر", bookings: 30, spend: 1340 },
]

export function ActivityChart() {
  return (
    <Card className="p-5 text-start">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold">نظرة عامة على النشاط</h3>
          <p className="mt-1 text-xs text-muted-foreground">الحجوزات والإنفاق على مدار العام</p>
        </div>
        <Tabs defaultValue="year" dir="rtl">
          <TabsList className="h-8">
            <TabsTrigger value="month" className="text-xs">
              شهر
            </TabsTrigger>
            <TabsTrigger value="quarter" className="text-xs">
              ربع سنة
            </TabsTrigger>
            <TabsTrigger value="year" className="text-xs">
              سنة
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="mt-6 h-64" dir="ltr">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 8, left: -16, bottom: 0 }}>
            <defs>
              <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.35} />
                <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-chart-3)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="var(--color-chart-3)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
            <XAxis dataKey="m" tickLine={false} axisLine={false} fontSize={11} stroke="var(--color-muted-foreground)" />
            <YAxis tickLine={false} axisLine={false} fontSize={11} stroke="var(--color-muted-foreground)" />
            <Tooltip
              contentStyle={{
                background: "var(--color-card)",
                border: "1px solid var(--color-border)",
                borderRadius: 8,
                fontSize: 12,
                textAlign: "right"
              }}
              formatter={(value, name) => [value, name === 'bookings' ? 'الحجوزات' : 'الإنفاق (ريال)']}
            />
            <Area
              name="bookings"
              type="monotone"
              dataKey="bookings"
              stroke="var(--color-primary)"
              strokeWidth={2}
              fill="url(#colorBookings)"
            />
            <Area
              name="spend"
              type="monotone"
              dataKey="spend"
              stroke="var(--color-chart-3)"
              strokeWidth={2}
              fill="url(#colorSpend)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}