'use client'

import { Star, MapPin, Clock, BadgeCheck, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

type ServiceProvider = {
  id: string
  name: string
  role: string
  initials: string
  image?: string
  rating: number
  reviews: number
  jobs: number
  location: string
  rate: number
  tags: string[]
  responseTime: string
  verified: boolean
  tone: string
}

type ServiceCardProps = {
  provider: ServiceProvider
  onBook?: () => void
  onFavorite?: () => void
}

export function ServiceCard({ provider, onBook, onFavorite }: ServiceCardProps) {
  return (
    <Card className="group relative overflow-hidden border-border transition-all hover:-translate-y-1 hover:shadow-lg text-start">
      {/* Gradient header */}
      <div className={`h-24 bg-gradient-to-b ${provider.tone}`} />

      <div className="px-5 pb-5 -mt-10">
        {/* Avatar and rating */}
        <div className="flex items-end justify-between gap-2">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border-4 border-card bg-primary/15 text-sm font-semibold text-primary flex-shrink-0">
            {provider.initials}
          </div>
          <div className="flex items-center gap-1 rounded-full bg-card px-2 py-1 text-xs shadow-sm ring-1 ring-border">
            <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
            <span className="font-semibold">{provider.rating}</span>
            <span className="text-muted-foreground">({provider.reviews})</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-destructive"
            onClick={onFavorite}
            aria-label="أضف إلى المفضلة"
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>

        {/* Provider info */}
        <div className="mt-3">
          <div className="flex items-center gap-1.5">
            <h3 className="font-semibold text-base">{provider.name}</h3>
            {provider.verified && <BadgeCheck className="h-4 w-4 text-primary flex-shrink-0" />}
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">{provider.role}</p>
        </div>

        {/* Tags */}
        <div className="mt-2.5 flex flex-wrap gap-1">
          {provider.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs font-normal">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Location and response time */}
        <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-1 truncate">
            <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
            <span className="truncate">{provider.location}</span>
          </span>
          <span className="flex items-center gap-1 truncate">
            <Clock className="h-3.5 w-3.5 flex-shrink-0" />
            <span className="truncate">{provider.responseTime}</span>
          </span>
        </div>

        {/* Stats */}
        <div className="mt-3 flex justify-between text-xs text-muted-foreground border-t border-border pt-2">
          <div>
            <div className="font-medium">{provider.jobs}</div>
            <div className="text-muted-foreground">مهمة مكتملة</div>
          </div>
          <div className="text-end">
            <div className="font-semibold">{provider.rate} ريال<span className="text-xs font-normal text-muted-foreground"> / ساعة</span></div>
            <div className="text-muted-foreground">يبدأ من</div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="mt-4 flex gap-2">
          <Button variant="outline" className="flex-1" size="sm">
            عرض الملف
          </Button>
          <Button className="flex-1" size="sm" onClick={onBook}>
            احجز الآن
          </Button>
        </div>
      </div>
    </Card>
  )
}