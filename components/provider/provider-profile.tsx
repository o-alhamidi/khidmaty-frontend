'use client'

import { Star, MapPin, Clock, BadgeCheck, Phone, MessageSquare, Heart, Share2, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useState } from 'react'

type ProviderProfileProps = {
  provider?: {
    name: string
    role: string
    rating: number
    reviews: number
    location: string
    responseTime: string
    verified: boolean
    hourlyRate: number
    jobsCompleted: number
    yearsExperience: number
    biography: string
    skills: string[]
    specialties: string[]
  }
}

const DEFAULT_PROVIDER = {
  name: 'كريم السيد',
  role: 'فني كهرباء معتمد',
  rating: 4.9,
  reviews: 312,
  location: 'تعز، اليمن',
  responseTime: 'أقل من 15 دقيقة',
  verified: true,
  hourlyRate: 2500,
  jobsCompleted: 540,
  yearsExperience: 12,
  biography:
    'أنا فني كهرباء معتمد بخبرة تزيد عن 12 عاماً في الأعمال الكهربائية السكنية والتجارية. متخصص في تركيبات المنازل الذكية، تحديث لوحات الكهرباء، وأنظمة التمديد المعقدة. أفخر بتقديم عمل عالي الجودة مع اهتمام دقيق بالتفاصيل.',
  skills: ['تمديدات كهربائية', 'تركيب لوحات', 'منازل ذكية', 'قواطع دوائر', 'إضاءة LED', 'الامتثال للسلامة'],
  specialties: ['تمديدات سكنية', 'تركيبات تجارية', 'أنظمة المنازل الذكية', 'إصلاحات طارئة'],
}

export function ProviderProfile({ provider = DEFAULT_PROVIDER }: ProviderProfileProps) {
  const [isFavorited, setIsFavorited] = useState(false)
  const [expandedReview, setExpandedReview] = useState<number | null>(null)

  const reviews = [
    {
      id: 1,
      author: 'أمينة محمد',
      rating: 5,
      date: 'منذ أسبوعين',
      title: 'عمل ممتاز واحترافي جداً',
      comment:
        'قام كريم بتركيب تمديدات كهربائية جديدة في شقتي. كان دقيقاً في مواعيده، محترفاً، وشرح كل شيء بوضوح. أوصي به بشدة لأي عمل كهربائي.',
      verified: true,
    },
    {
      id: 2,
      author: 'حسن إبراهيم',
      rating: 5,
      date: 'منذ شهر',
      title: 'تركيب منزل ذكي - مثالي!',
      comment:
        'قام بتركيب نظام منزل ذكي كامل يشمل الإضاءة والتحكم بالتكييف. الجودة استثنائية وعملية الإعداد كانت سلسة. راضٍ جداً عن النتائج.',
      verified: true,
    },
    {
      id: 3,
      author: 'ليلى عبدالعزيز',
      rating: 4,
      date: 'منذ 6 أسابيع',
      title: 'خدمة رائعة، تأخير بسيط في الرد',
      comment: 'قام بعمل ممتاز في إصلاح لوحة الكهرباء الخاصة بي. كل شيء يعمل بشكل مثالي الآن. تأخير بسيط في الرد ولكن بشكل عام راضية جداً.',
      verified: true,
    },
  ]

  const availability = [
    { day: 'السبت', hours: '08:00 ص - 06:00 م', available: true },
    { day: 'الأحد', hours: '08:00 ص - 06:00 م', available: true },
    { day: 'الإثنين', hours: '08:00 ص - 06:00 م', available: true },
    { day: 'الثلاثاء', hours: '08:00 ص - 06:00 م', available: true },
    { day: 'الأربعاء', hours: '08:00 ص - 06:00 م', available: true },
    { day: 'الخميس', hours: '08:00 ص - 06:00 م', available: true },
    { day: 'الجمعة', hours: 'مغلق', available: false },
  ]

  return (
    <div className="min-h-screen bg-background text-start">
      {/* Hero section */}
      <div className="border-b border-border/60 bg-gradient-to-b from-primary/5 to-transparent py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-8">
            {/* Avatar */}
            <div className="flex flex-col gap-4">
              <div className="flex h-32 w-32 items-center justify-center rounded-2xl bg-primary/15 text-5xl font-bold text-primary md:h-40 md:w-40 md:text-6xl">
                {provider.name.charAt(0)}
                {provider.name.split(' ')[1]?.charAt(0)}
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-32"
                onClick={() => setIsFavorited(!isFavorited)}
              >
                <Heart className={`h-4 w-4 ${isFavorited ? 'fill-destructive text-destructive' : ''}`} />
                <span>{isFavorited ? 'في المفضلة' : 'أضف للمفضلة'}</span>
              </Button>
            </div>

            {/* Header info */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-3xl font-bold md:text-4xl">{provider.name}</h1>
                {provider.verified && <BadgeCheck className="h-6 w-6 text-primary" />}
              </div>

              <p className="mt-1 text-lg text-muted-foreground">{provider.role}</p>

              <div className="mt-4 flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 rounded-full bg-amber-500/10 px-3 py-1">
                    <Star className="h-5 w-5 fill-amber-500 text-amber-500" />
                    <span className="font-semibold text-amber-600">{provider.rating}</span>
                    <span className="text-sm text-amber-600">({provider.reviews} تقييم)</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-5 w-5" />
                  <span>{provider.location}</span>
                </div>

                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-5 w-5" />
                  <span>يرد خلال {provider.responseTime}</span>
                </div>
              </div>

              {/* Stats grid */}
              <div className="mt-6 grid grid-cols-3 gap-4 md:gap-6">
                <div>
                  <div className="text-2xl font-bold">{provider.jobsCompleted}</div>
                  <div className="text-xs text-muted-foreground md:text-sm">المهام المنجزة</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{provider.yearsExperience}</div>
                  <div className="text-xs text-muted-foreground md:text-sm">سنوات الخبرة</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{provider.hourlyRate} ريال</div>
                  <div className="text-xs text-muted-foreground md:text-sm">سعر الساعة</div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="mt-6 flex flex-wrap gap-3">
                <Button size="lg" className="flex-1 md:flex-none">
                  <MessageSquare className="h-4 w-4" />
                  تواصل مع المزود
                </Button>
                <Button size="lg" className="flex-1 md:flex-none">
                  احجز الخدمة
                </Button>
                <Button variant="outline" size="lg" className="md:flex-none">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
        <Tabs defaultValue="overview" className="w-full text-start">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
            <TabsTrigger value="reviews">التقييمات</TabsTrigger>
            <TabsTrigger value="availability">أوقات العمل</TabsTrigger>
            <TabsTrigger value="details">التفاصيل</TabsTrigger>
          </TabsList>

          {/* Overview tab */}
          <TabsContent value="overview" className="mt-6 space-y-6">
            {/* Biography */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold">نبذة عني</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">{provider.biography}</p>
            </Card>

            {/* Skills */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold">المهارات</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {provider.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-sm">
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card>

            {/* Specialties */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold">التخصصات الدقيقة</h2>
              <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
                {provider.specialties.map((specialty) => (
                  <div key={specialty} className="flex items-start gap-3 border-s-2 border-primary/30 ps-4">
                    <div className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                    <span className="text-muted-foreground">{specialty}</span>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Reviews tab */}
          <TabsContent value="reviews" className="mt-6 space-y-6">
            {/* Rating summary */}
            <Card className="p-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="flex flex-col items-center justify-center">
                  <div className="text-5xl font-bold text-primary">{provider.rating}</div>
                  <div className="mt-2 flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.round(provider.rating) ? 'fill-amber-500 text-amber-500' : 'text-border'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">بناءً على {provider.reviews} تقييم</p>
                </div>

                <div className="col-span-1 space-y-2 md:col-span-2">
                  {[5, 4, 3, 2, 1].map((star) => (
                    <div key={star} className="flex items-center gap-3">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground w-16" dir="ltr">
                        {[...Array(star)].map((_, i) => (
                          <Star key={i} className="h-3 w-3 fill-amber-500 text-amber-500" />
                        ))}
                      </div>
                      <div className="h-2 w-full rounded-full bg-border overflow-hidden">
                        <div
                          className="h-full bg-amber-500 transition-all"
                          style={{ width: `${star === 5 ? 75 : star === 4 ? 20 : star === 3 ? 5 : 0}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-muted-foreground w-12 text-end">
                        {star === 5 ? '225' : star === 4 ? '60' : star === 3 ? '15' : '0'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Individual reviews */}
            <div className="space-y-4">
              {reviews.map((review) => (
                <Card key={review.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold">{review.author}</h3>
                      <div className="mt-1 flex items-center gap-2">
                        <div className="flex gap-0.5" dir="ltr">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3.5 w-3.5 ${
                                i < review.rating ? 'fill-amber-500 text-amber-500' : 'text-border'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground">{review.date}</span>
                        {review.verified && (
                          <Badge variant="outline" className="text-xs">
                            موثق
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  <h4 className="mt-3 font-medium">{review.title}</h4>
                  <p className={`mt-2 text-muted-foreground text-sm ${expandedReview !== review.id && 'line-clamp-2'}`}>
                    {review.comment}
                  </p>

                  {review.comment.length > 100 && (
                    <button
                      onClick={() => setExpandedReview(expandedReview === review.id ? null : review.id)}
                      className="mt-2 text-sm font-medium text-primary hover:underline flex items-center gap-1"
                    >
                      {expandedReview === review.id ? 'عرض أقل' : 'عرض المزيد'}
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${expandedReview === review.id ? 'rotate-180' : ''}`}
                      />
                    </button>
                  )}
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Availability tab */}
          <TabsContent value="availability" className="mt-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold">جدول أوقات العمل</h2>
              <div className="mt-6 space-y-3">
                {availability.map((slot) => (
                  <div
                    key={slot.day}
                    className="flex items-center justify-between rounded-lg border border-border/50 bg-card p-4"
                  >
                    <span className="font-medium">{slot.day}</span>
                    <div className="flex items-center gap-3">
                      <span className={`text-sm ${slot.available ? 'text-muted-foreground' : 'text-destructive'}`} dir="ltr">
                        {slot.hours}
                      </span>
                      <div
                        className={`h-2 w-2 rounded-full ${slot.available ? 'bg-green-500' : 'bg-destructive'}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Details tab */}
          <TabsContent value="details" className="mt-6 space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold">المعلومات المهنية</h2>
              <div className="mt-6 space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">سنوات الخبرة</p>
                    <p className="mt-1 text-lg font-semibold">{provider.yearsExperience} سنوات</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">المهام المنجزة</p>
                    <p className="mt-1 text-lg font-semibold">{provider.jobsCompleted} مهمة</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">سعر الساعة</p>
                    <p className="mt-1 text-lg font-semibold">{provider.hourlyRate} ريال</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">سرعة الاستجابة</p>
                    <p className="mt-1 text-lg font-semibold">{provider.responseTime}</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold">الشهادات والاعتمادات</h2>
              <div className="mt-4 space-y-3">
                <div className="flex items-center gap-3 rounded-lg border border-green-500/30 bg-green-500/5 p-3">
                  <BadgeCheck className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-sm">رخصة فني كهرباء معتمد</p>
                    <p className="text-xs text-muted-foreground">صالحة حتى 2026</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg border border-green-500/30 bg-green-500/5 p-3">
                  <BadgeCheck className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-sm">شهادة السلامة المهنية</p>
                    <p className="text-xs text-muted-foreground">معتمد من الأوشا (OSHA)</p>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Sticky footer on mobile */}
      <div className="sticky bottom-0 border-t border-border/60 bg-card p-4 md:hidden">
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1">
            <MessageSquare className="h-4 w-4" />
          </Button>
          <Button className="flex-1">احجز الخدمة</Button>
        </div>
      </div>
    </div>
  )
}