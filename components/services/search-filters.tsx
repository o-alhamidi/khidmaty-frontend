'use client'

import * as React from 'react'
import { Search, ChevronDown, MapPin, Star, BadgeCheck, Clock, Sliders } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Checkbox } from '@/components/ui/checkbox'

type SearchFiltersProps = {
  onSearch: (query: string) => void
  onLocationChange: (location: string) => void
  onRatingChange: (rating: number) => void
  onSortChange: (sort: string) => void
}

const locations = ['صنعاء', 'عدن', 'تعز', 'إب', 'الحديدة', 'حضرموت', 'مأرب']
const sortOptions = [
  { value: 'relevance', label: 'الأكثر صلة' },
  { value: 'rating', label: 'الأعلى تقييماً' },
  { value: 'price-low', label: 'السعر: من الأقل للأعلى' },
  { value: 'price-high', label: 'السعر: من الأعلى للأقل' },
  { value: 'reviews', label: 'الأكثر مراجعة' },
]

export function SearchFilters({
  onSearch,
  onLocationChange,
  onRatingChange,
  onSortChange,
}: SearchFiltersProps) {
  const [searchQuery, setSearchQuery] = React.useState('')

  return (
    <div className="space-y-4">
      {/* Search bar */}
      <div className="relative">
        <Search className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="ابحث عن الخدمات، المهارات، أو الفنيين..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value)
            onSearch(e.target.value)
          }}
          className="ps-10"
          dir="rtl"
        />
      </div>

      {/* Desktop filters */}
      <div className="hidden gap-3 md:flex flex-col text-start">
        <Select onValueChange={onLocationChange} dir="rtl">
          <SelectTrigger className="w-full text-start">
            <SelectValue placeholder="اختر المدينة" />
          </SelectTrigger>
          <SelectContent>
            {locations.map((loc) => (
              <SelectItem key={loc} value={loc} className="text-start">
                {loc}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={(value) => onRatingChange(Number(value))} dir="rtl">
          <SelectTrigger className="w-full text-start">
            <SelectValue placeholder="الحد الأدنى للتقييم" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0" className="text-start">أي تقييم</SelectItem>
            <SelectItem value="4" className="text-start">4 نجوم فأكثر</SelectItem>
            <SelectItem value="4.5" className="text-start">4.5 نجوم فأكثر</SelectItem>
            <SelectItem value="5" className="text-start">5 نجوم فقط</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={onSortChange} dir="rtl">
          <SelectTrigger className="w-full text-start">
            <SelectValue placeholder="الترتيب حسب" />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value} className="text-start">
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

type FiltersPanelProps = {
  onLocationChange: (location: string) => void
  onRatingChange: (rating: number) => void
  selectedRating: number
}

export function FiltersPanel({ onLocationChange, onRatingChange, selectedRating }: FiltersPanelProps) {
  return (
    <div className="space-y-6 text-start">
      <div>
        <h3 className="font-semibold mb-3">المدينة</h3>
        <div className="space-y-2">
          {locations.map((loc) => (
            <label key={loc} className="flex items-center gap-2 cursor-pointer">
              <Checkbox onCheckedChange={(checked) => checked && onLocationChange(loc)} />
              <span className="text-sm">{loc}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">التقييم</h3>
        <div className="space-y-2">
          {[
            { value: 0, label: 'أي تقييم' },
            { value: 4, label: '4 نجوم فأكثر' },
            { value: 4.5, label: '4.5 نجوم فأكثر' },
            { value: 5, label: '5 نجوم فقط' },
          ].map(({ value, label }) => (
            <label key={value} className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={selectedRating === value}
                onCheckedChange={(checked) => checked && onRatingChange(value)}
              />
              <span className="text-sm">{label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">نطاق السعر (ريال)</h3>
        <div className="space-y-2">
          {['أقل من 2000', '2000 - 5000', '5000 - 10000', '10000+'].map((range) => (
            <label key={range} className="flex items-center gap-2 cursor-pointer">
              <Checkbox />
              <span className="text-sm">{range}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">التوثيق</h3>
        <label className="flex items-center gap-2 cursor-pointer">
          <Checkbox />
          <span className="text-sm">مزودو خدمة معتمدون فقط</span>
        </label>
      </div>
    </div>
  )
}