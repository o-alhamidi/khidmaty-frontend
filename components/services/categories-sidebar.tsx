'use client'

import * as React from 'react'
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
} from 'lucide-react'
import { Card } from '@/components/ui/card'

const categories = [
  { icon: Zap, name: 'كهرباء', count: 248, id: 'electrical' },
  { icon: Wrench, name: 'سباكة', count: 192, id: 'plumbing' },
  { icon: AirVent, name: 'تكييف وتبريد', count: 156, id: 'hvac' },
  { icon: Hammer, name: 'نجارة', count: 134, id: 'carpentry' },
  { icon: PaintRoller, name: 'دهانات', count: 98, id: 'painting' },
  { icon: HardHat, name: 'هندسة مدنية', count: 76, id: 'engineering' },
  { icon: Cpu, name: 'تقنية وشبكات', count: 210, id: 'tech' },
  { icon: Sparkles, name: 'نظافة عامة', count: 312, id: 'cleaning' },
  { icon: Truck, name: 'نقل عفش', count: 64, id: 'moving' },
  { icon: Leaf, name: 'تنسيق حدائق', count: 88, id: 'gardening' },
  { icon: Lock, name: 'أقفال ومفاتيح', count: 42, id: 'locksmith' },
  { icon: Camera, name: 'أنظمة أمنية', count: 71, id: 'security' },
]

const colorMap: Record<string, { bg: string; text: string }> = {
  electrical: { bg: 'bg-amber-500/10', text: 'text-amber-600' },
  plumbing: { bg: 'bg-sky-500/10', text: 'text-sky-600' },
  hvac: { bg: 'bg-cyan-500/10', text: 'text-cyan-600' },
  carpentry: { bg: 'bg-orange-500/10', text: 'text-orange-600' },
  painting: { bg: 'bg-rose-500/10', text: 'text-rose-600' },
  engineering: { bg: 'bg-emerald-500/10', text: 'text-emerald-600' },
  tech: { bg: 'bg-indigo-500/10', text: 'text-indigo-600' },
  cleaning: { bg: 'bg-fuchsia-500/10', text: 'text-fuchsia-600' },
  moving: { bg: 'bg-yellow-500/10', text: 'text-yellow-700' },
  gardening: { bg: 'bg-green-500/10', text: 'text-green-600' },
  locksmith: { bg: 'bg-slate-500/10', text: 'text-slate-600' },
  security: { bg: 'bg-red-500/10', text: 'text-red-600' },
}

type CategoriesSidebarProps = {
  selectedCategory: string | null
  onCategoryChange: (categoryId: string | null) => void
}

export function CategoriesSidebar({ selectedCategory, onCategoryChange }: CategoriesSidebarProps) {
  return (
    <div className="space-y-2 text-start">
      <h3 className="font-semibold text-lg mb-4">التصنيفات</h3>
      {categories.map(({ icon: Icon, name, count, id }) => {
        const colors = colorMap[id]
        const isSelected = selectedCategory === id
        return (
          <button
            key={id}
            onClick={() => onCategoryChange(isSelected ? null : id)}
            className={`w-full rounded-lg border transition-all p-3 text-start flex items-center gap-3 ${
              isSelected
                ? 'border-primary/40 bg-primary/5'
                : 'border-border hover:border-border/80 hover:bg-secondary/50'
            }`}
          >
            <div className={`flex h-8 w-8 items-center justify-center rounded-md flex-shrink-0 ${colors.bg} ${colors.text}`}>
              <Icon className="h-4 w-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm">{name}</div>
              <div className="text-xs text-muted-foreground">{count} مزود خدمة</div>
            </div>
          </button>
        )
      })}
    </div>
  )
}