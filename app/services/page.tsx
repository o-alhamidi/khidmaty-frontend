'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
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
  serviceId?: string
  minRating?: number
}

export default function ServicesPage() {
  const [searchQuery, setSearchQuery] = React.useState('')
  const [selectedLocation, setSelectedLocation] = React.useState('')
  const [selectedRating, setSelectedRating] = React.useState(0)
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null)
  const [sortBy, setSortBy] = React.useState('relevance')
  const [allProviders, setAllProviders] = React.useState<ServiceProvider[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [loadError, setLoadError] = React.useState('')
  const router = useRouter()

  React.useEffect(() => {
    fetch('/api/providers?status=VERIFIED')
      .then(async (response) => {
        const result = await response.json()
        if (!response.ok || !result.success) throw new Error(result.message)
        const providers = result.data.map((item: any) => {
          const profile = item.profile || {}
          const category = item.categories?.[0]
          return {
            id: item.id,
            serviceId: item.services?.[0]?.id,
            name: profile.fullName || 'مزود خدمة',
            role: item.specialization,
            initials: (profile.fullName || 'م خ').slice(0, 2),
            rating: item.rating || 0,
            reviews: item.reviewCount || item.reviewsCount || 0,
            jobs: item.jobCount || item.jobsCompleted || 0,
            location: item.location,
            rate: item.hourlyRate || 0,
            tags: (item.skills || item.specialties || '').split(',').map((tag: string) => tag.trim()).filter(Boolean),
            responseTime: 'يرد خلال ساعة',
            verified: item.verified || item.status === 'VERIFIED',
            tone: 'from-primary/20 to-transparent',
            category: category?.slug || '',
          } satisfies ServiceProvider
        })
        setAllProviders(providers)
      })
      .catch((error) => setLoadError(error instanceof Error ? error.message : 'تعذر جلب مزودي الخدمة'))
      .finally(() => setIsLoading(false))
  }, [])

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
            {isLoading ? (
              <div className="rounded-lg border border-border bg-secondary/30 p-12 text-center text-muted-foreground">جاري تحميل مزودي الخدمة...</div>
            ) : loadError ? (
              <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-12 text-center text-destructive">{loadError}</div>
            ) : filteredProviders.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProviders.map((provider) => (
                  <ServiceCard
                    key={provider.id}
                    provider={provider}
                    onBook={() => provider.serviceId && router.push(`/booking/${provider.id}/${provider.serviceId}`)}
                    onFavorite={() => {}}
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
