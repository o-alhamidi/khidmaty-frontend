'use client'

import * as React from 'react'
import Link from 'next/link'
import { Sliders, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SiteHeader } from '@/components/site-header'
import { SearchFilters, FiltersPanel } from '@/components/services/search-filters'
import { ServiceCard } from '@/components/services/service-card'
import { CategoriesSidebar } from '@/components/services/categories-sidebar'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

type ServiceProvider = {
  id: string
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
  verified: boolean
  tone: string
  category: string
  minRating?: number
}

const allProviders: ServiceProvider[] = [
  {
    id: '1',
    name: 'كريم السيد',
    role: 'فني كهرباء محترف',
    initials: 'ك.س',
    rating: 4.9,
    reviews: 312,
    jobs: 540,
    location: 'تعز',
    rate: 2500,
    tags: ['تمديدات', 'لوحات تحكم', 'منازل ذكية'],
    responseTime: 'أقل من 15 دقيقة',
    verified: true,
    tone: 'from-amber-500/20 to-transparent',
    category: 'electrical',
  },
  {
    id: '2',
    name: 'منى حسن',
    role: 'مهندسة مدنية',
    initials: 'م.ح',
    rating: 5.0,
    reviews: 142,
    jobs: 86,
    location: 'صنعاء',
    rate: 6500,
    tags: ['فحص مباني', 'ترميم'],
    responseTime: 'أقل من ساعة',
    verified: true,
    tone: 'from-emerald-500/20 to-transparent',
    category: 'engineering',
  },
  {
    id: '3',
    name: 'حسام عادل',
    role: 'أخصائي سباكة',
    initials: 'ح.ع',
    rating: 4.8,
    reviews: 487,
    jobs: 920,
    location: 'عدن',
    rate: 2200,
    tags: ['تسربات', 'سخانات', 'صرف صحي'],
    responseTime: 'أقل من 30 دقيقة',
    verified: true,
    tone: 'from-sky-500/20 to-transparent',
    category: 'plumbing',
  },
  {
    id: '4',
    name: 'سارة إبراهيم',
    role: 'فنية تكييف وتبريد',
    initials: 'س.إ',
    rating: 4.9,
    reviews: 256,
    jobs: 410,
    location: 'تعز',
    rate: 3200,
    tags: ['تركيب مكيفات', 'صيانة دورية'],
    responseTime: 'أقل من 20 دقيقة',
    verified: true,
    tone: 'from-cyan-500/20 to-transparent',
    category: 'hvac',
  },
  {
    id: '5',
    name: 'أحمد منصور',
    role: 'نجار مباني وأثاث',
    initials: 'أ.م',
    rating: 4.7,
    reviews: 198,
    jobs: 312,
    location: 'إب',
    rate: 3500,
    tags: ['أثاث', 'أبواب', 'أرفف'],
    responseTime: 'أقل من ساعتين',
    verified: true,
    tone: 'from-orange-500/20 to-transparent',
    category: 'carpentry',
  },
  {
    id: '6',
    name: 'ليلى الرشيد',
    role: 'أخصائية تنظيف',
    initials: 'ل.ر',
    rating: 4.9,
    reviews: 523,
    jobs: 1250,
    location: 'صنعاء',
    rate: 1800,
    tags: ['تنظيف عميق', 'تعقيم', 'مواد صديقة للبيئة'],
    responseTime: 'أقل من ساعة',
    verified: true,
    tone: 'from-fuchsia-500/20 to-transparent',
    category: 'cleaning',
  },
  {
    id: '7',
    name: 'عمر خالد',
    role: 'فني شبكات وتقنية',
    initials: 'ع.خ',
    rating: 4.6,
    reviews: 287,
    jobs: 456,
    location: 'تعز',
    rate: 2500,
    tags: ['شبكات', 'حل أعطال', 'تأسيس'],
    responseTime: 'أقل من 30 دقيقة',
    verified: true,
    tone: 'from-indigo-500/20 to-transparent',
    category: 'tech',
  },
  {
    id: '8',
    name: 'فاطمة السيد',
    role: 'أخصائية دهانات',
    initials: 'ف.س',
    rating: 4.8,
    reviews: 156,
    jobs: 234,
    location: 'عدن',
    rate: 2000,
    tags: ['داخلي', 'خارجي', 'تشطيبات'],
    responseTime: 'أقل من 45 دقيقة',
    verified: true,
    tone: 'from-rose-500/20 to-transparent',
    category: 'painting',
  },
  {
    id: '9',
    name: 'حسن الرشيد',
    role: 'مختص نقل عفش',
    initials: 'ح.ر',
    rating: 4.7,
    reviews: 112,
    jobs: 189,
    location: 'تعز',
    rate: 4000,
    tags: ['منازل', 'مكاتب', 'تخزين'],
    responseTime: 'أقل من ساعتين',
    verified: true,
    tone: 'from-yellow-500/20 to-transparent',
    category: 'moving',
  },
  {
    id: '10',
    name: 'نادية السيد',
    role: 'خبيرة تنسيق حدائق',
    initials: 'ن.س',
    rating: 4.9,
    reviews: 89,
    jobs: 156,
    location: 'صنعاء',
    rate: 2200,
    tags: ['تنسيق', 'صيانة', 'تصميم'],
    responseTime: 'أقل من ساعة',
    verified: true,
    tone: 'from-green-500/20 to-transparent',
    category: 'gardening',
  },
  {
    id: '11',
    name: 'محمد سمير',
    role: 'فني أقفال ومفاتيح',
    initials: 'م.س',
    rating: 4.6,
    reviews: 78,
    jobs: 124,
    location: 'إب',
    rate: 1500,
    tags: ['طوارئ', 'تركيب', 'إصلاح'],
    responseTime: 'أقل من 20 دقيقة',
    verified: true,
    tone: 'from-slate-500/20 to-transparent',
    category: 'locksmith',
  },
  {
    id: '12',
    name: 'أمير حسن',
    role: 'خبير أنظمة أمنية',
    initials: 'أ.ح',
    rating: 4.8,
    reviews: 134,
    jobs: 267,
    location: 'عدن',
    rate: 5000,
    tags: ['كاميرات', 'أجهزة إنذار', 'مراقبة'],
    responseTime: 'أقل من ساعة',
    verified: true,
    tone: 'from-red-500/20 to-transparent',
    category: 'security',
  },
] 


export default function ServicesPage() {
  const [searchQuery, setSearchQuery] = React.useState('')
  const [selectedLocation, setSelectedLocation] = React.useState('')
  const [selectedRating, setSelectedRating] = React.useState(0)
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null)
  const [sortBy, setSortBy] = React.useState('relevance')

  // Filter providers
  const filteredProviders = React.useMemo(() => {
    let filtered = allProviders

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.role.toLowerCase().includes(query) ||
          p.tags.some((t) => t.toLowerCase().includes(query))
      )
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter((p) => p.category === selectedCategory)
    }

    // Filter by location
    if (selectedLocation) {
      filtered = filtered.filter((p) => p.location.includes(selectedLocation))
    }

    // Filter by rating
    if (selectedRating > 0) {
      filtered = filtered.filter((p) => p.rating >= selectedRating)
    }

    // Sort
    if (sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating)
    } else if (sortBy === 'price-low') {
      filtered.sort((a, b) => a.rate - b.rate)
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => b.rate - a.rate)
    } else if (sortBy === 'reviews') {
      filtered.sort((a, b) => b.reviews - a.reviews)
    }

    return filtered
  }, [searchQuery, selectedLocation, selectedRating, selectedCategory, sortBy])

  return (
    <main className="bg-background">
      <SiteHeader />

      {/* Breadcrumb */}
      <div className="border-b border-border/60 bg-secondary/30 py-3">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">
              الرئيسية
            </Link>
            <ChevronRight className="h-4 w-4 rtl:rotate-180" />
            <span className="text-foreground font-medium">الخدمات</span>
          </div>
        </div>
      </div>

      {/* Page header */}
      <div className="border-b border-border/60 bg-gradient-to-b from-primary/5 to-transparent py-8">
        <div className="container mx-auto px-4 md:px-6 text-start">
          <h1 className="text-4xl font-bold tracking-tight">تصفح الخدمات</h1>
          <p className="mt-2 text-muted-foreground max-w-2xl">
            ابحث عن محترفين موثوقين في جميع التخصصات. يمكنك البحث باستخدام نوع الخدمة، الموقع، أو اسم مزود الخدمة.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Sidebar - Desktop */}
          <div className="hidden lg:block">
            <div className="sticky top-20 space-y-6">
              <SearchFilters
                onSearch={setSearchQuery}
                onLocationChange={setSelectedLocation}
                onRatingChange={(rating) => setSelectedRating(Number(rating))}
                onSortChange={setSortBy}
              />
              <div className="border-t border-border pt-6">
                <CategoriesSidebar
                  selectedCategory={selectedCategory}
                  onCategoryChange={setSelectedCategory}
                />
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="lg:col-span-3 text-start">
            {/* Search bar - Mobile */}
            <div className="mb-6 lg:hidden">
              <div className="flex gap-2 items-center">
                <div className="flex-1">
                  <SearchFilters
                    onSearch={setSearchQuery}
                    onLocationChange={setSelectedLocation}
                    onRatingChange={(rating) => setSelectedRating(Number(rating))}
                    onSortChange={setSortBy}
                  />
                </div>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="h-10 shrink-0">
                      <Sliders className="h-4 w-4" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-80 rtl:text-right">
                    <SheetHeader>
                      <SheetTitle>عوامل التصفية</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6 space-y-6 text-start">
                      <FiltersPanel
                        onLocationChange={setSelectedLocation}
                        onRatingChange={(rating) => setSelectedRating(rating)}
                        selectedRating={selectedRating}
                      />
                      <div className="border-t border-border pt-6">
                        <CategoriesSidebar
                          selectedCategory={selectedCategory}
                          onCategoryChange={setSelectedCategory}
                        />
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>

            {/* Results count and sort */}
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                عرض <span className="font-semibold text-foreground">{filteredProviders.length}</span> مزود خدمة
                {selectedCategory && ` في التصنيف المحدد`}
                {selectedLocation && ` في ${selectedLocation}`}
              </p>
            </div>

            {/* Service cards grid */}
            {filteredProviders.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProviders.map((provider) => (
                  <ServiceCard
                    key={provider.id}
                    provider={provider}
                    onBook={() => alert(`حجز ${provider.name}...`)}
                    onFavorite={() => alert(`تمت إضافة ${provider.name} إلى المفضلة`)}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-lg border border-border bg-secondary/30 p-12 text-center">
                <p className="text-muted-foreground">لم يتم العثور على مزودي خدمة يطابقون بحثك.</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedCategory(null)
                    setSelectedLocation('')
                    setSelectedRating(0)
                  }}
                >
                  مسح جميع الفلاتر
                </Button>
              </div>
            )}

            {/* Pagination placeholder */}
            {filteredProviders.length > 0 && (
              <div className="mt-8 flex items-center justify-center gap-2" dir="ltr">
                <Button variant="outline" size="sm" disabled>
                  السابق
                </Button>
                <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">
                  1
                </Button>
                <Button variant="outline" size="sm">
                  2
                </Button>
                <Button variant="outline" size="sm">
                  3
                </Button>
                <Button variant="outline" size="sm">
                  التالي
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
