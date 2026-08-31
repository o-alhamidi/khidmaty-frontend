'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Calendar, Clock, MapPin, User, DollarSign, MessageSquare, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'

interface BookingFormProps {
  providerId?: string
  serviceId?: string
}

export function BookingForm({ providerId = '1', serviceId = '1' }: BookingFormProps) {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    address: '',
    notes: '',
  })

  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const router = useRouter()

  // Mock provider data
  const provider = {
    id: providerId,
    name: 'كريم السيد',
    role: 'فني كهرباء معتمد',
    rating: 4.9,
    avatar: 'ك.س',
    hourlyRate: 2500,
    serviceTime: 2, // hours
  }

  // Mock service data
  const service = {
    id: serviceId,
    name: 'تحديث وتطوير لوحة الكهرباء',
    description: 'فحص شامل وتحديث كامل للوحة المفاتيح الكهربائية',
  }

  // Available time slots
  const timeSlots = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00']

  // Calculate price
  const basePrice = provider.hourlyRate * provider.serviceTime
  const tax = basePrice * 0.15
  const total = basePrice + tax

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleDateSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value)
    setSelectedDate(date)
    setFormData((prev) => ({
      ...prev,
      date: e.target.value,
    }))
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
    setFormData((prev) => ({
      ...prev,
      time,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    const token = localStorage.getItem('token')
    const user = JSON.parse(localStorage.getItem('user') || 'null')
    if (!token || !user?.id) {
      router.push('/login')
      return
    }

    setIsSubmitting(true)
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          customerId: user.id,
          providerId,
          serviceId,
          ...formData,
        }),
      })
      const result = await response.json()
      if (!response.ok || !result.success) {
        throw new Error(result.message || 'تعذر إنشاء الحجز')
      }
      setSuccess('تم إنشاء الحجز بنجاح، وسيظهر في لوحة التحكم.')
      setTimeout(() => router.push('/dashboard'), 1000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'تعذر إنشاء الحجز، حاول مرة أخرى.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Get minimum date (tomorrow)
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const minDate = tomorrow.toISOString().split('T')[0]

  // Get maximum date (30 days from now)
  const maxDate = new Date()
  maxDate.setDate(maxDate.getDate() + 30)
  const maxDateString = maxDate.toISOString().split('T')[0]

  return (
    <div className="min-h-screen bg-background text-start">
      {/* Header */}
      <div className="border-b border-border/60 bg-card">
        <div className="container mx-auto px-4 py-4 md:px-6 md:py-6">
          <Link href="/services" className="flex items-center gap-2 text-primary mb-4 hover:underline w-fit">
            <ArrowRight className="h-5 w-5 rtl:rotate-180" />
            العودة للخدمات
          </Link>
          <h1 className="text-3xl font-bold md:text-4xl">حجز خدمة</h1>
          <p className="mt-2 text-muted-foreground">أكمل تفاصيل حجزك مع {provider.name}</p>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left column - Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Service Details */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold">تفاصيل الخدمة</h2>
                <div className="mt-4 space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">الخدمة المطلوبة</Label>
                    <div className="mt-2 p-4 rounded-lg bg-secondary/50 border border-border/50">
                      <p className="font-semibold">{service.name}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{service.description}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">المدة المقدرة</Label>
                      <div className="mt-2 flex items-center gap-2">
                        <Clock className="h-4 w-4 text-primary flex-shrink-0" />
                        <span className="font-medium">{provider.serviceTime} ساعات</span>
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">التصنيف</Label>
                      <Badge className="mt-2 block w-fit">أعمال كهربائية</Badge>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Date & Time Selection */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold">حدد الوقت والتاريخ</h2>
                <div className="mt-4 space-y-4">
                  <div>
                    <Label htmlFor="date" className="text-sm font-medium">
                      التاريخ المفضل *
                    </Label>
                    <div className="mt-2 relative">
                      <Calendar className="absolute start-3 top-1/2 h-4 w-4 text-muted-foreground -translate-y-1/2 pointer-events-none" />
                      <input
                        type="date"
                        id="date"
                        name="date"
                        required
                        min={minDate}
                        max={maxDateString}
                        value={formData.date}
                        onChange={handleDateSelect}
                        className="w-full ps-10 pe-4 py-2 border border-border rounded-lg bg-background text-foreground"
                      />
                    </div>
                  </div>

                  {formData.date && (
                    <div>
                      <Label className="text-sm font-medium mb-3 block">
                        الأوقات المتاحة
                      </Label>
                      <div className="grid grid-cols-4 gap-2 md:grid-cols-5" dir="ltr">
                        {timeSlots.map((time) => (
                          <button
                            key={time}
                            type="button"
                            onClick={() => handleTimeSelect(time)}
                            className={`py-2 px-3 rounded-lg border text-sm font-medium transition-colors ${
                              selectedTime === time
                                ? 'bg-primary text-primary-foreground border-primary'
                                : 'border-border bg-background hover:border-primary/50'
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </Card>

              {/* Location & Address */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold">موقع الخدمة</h2>
                <div className="mt-4 space-y-4">
                  <div>
                    <Label htmlFor="address" className="text-sm font-medium">
                      العنوان بالتفصيل *
                    </Label>
                    <div className="mt-2 relative">
                      <MapPin className="absolute start-3 top-1/2 h-4 w-4 text-muted-foreground -translate-y-1/2 pointer-events-none" />
                      <input
                        type="text"
                        id="address"
                        name="address"
                        required
                        placeholder="أدخل عنوانك بالكامل"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full ps-10 pe-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground"
                      />
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">
                      يرجى كتابة العنوان التفصيلي للمكان الذي سيتم تقديم الخدمة فيه
                    </p>
                  </div>
                </div>
              </Card>

              {/* Additional Notes */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold">معلومات إضافية</h2>
                <div className="mt-4">
                  <Label htmlFor="notes" className="text-sm font-medium">
                    ملاحظات أو طلبات خاصة (اختياري)
                  </Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    placeholder="أخبر الفني بأي تفاصيل أو متطلبات خاصة بالخدمة..."
                    value={formData.notes}
                    onChange={handleInputChange}
                    className="mt-2 min-h-32 border border-border rounded-lg bg-background p-4 text-foreground placeholder-muted-foreground"
                  />
                  <p className="mt-2 text-xs text-muted-foreground">
                    مثال: اللوحة الكهربائية موجودة في الدور الأرضي وتحتاج لصيانة قديمة.
                  </p>
                </div>
              </Card>

              {error && (
                <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
                  {error}
                </div>
              )}
              {success && (
                <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm text-emerald-700">
                  {success}
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={isSubmitting || !formData.date || !selectedTime || !formData.address}
              >
                {isSubmitting ? 'جاري إنشاء الحجز...' : 'المتابعة لإتمام الحجز'}
              </Button>
            </form>
          </div>

          {/* Right column - Summary */}
          <div className="lg:col-span-1">
            {/* Provider Card */}
            <Card className="sticky top-4 p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold">مقدم الخدمة</h3>
                <div className="mt-4 flex items-start gap-4">
                  <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-primary/15 text-2xl font-bold text-primary">
                    {provider.avatar}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">{provider.name}</p>
                    <p className="text-sm text-muted-foreground">{provider.role}</p>
                    <div className="mt-2 flex items-center gap-1">
                      <span className="text-sm font-semibold text-amber-600">★ {provider.rating}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-border/60 pt-4">
                <button className="w-full py-2 px-3 rounded-lg border border-border hover:bg-secondary/50 transition-colors flex items-center justify-center gap-2 text-sm font-medium">
                  <MessageSquare className="h-4 w-4" />
                  تواصل مع المزود
                </button>
              </div>

              {/* Booking Summary */}
              <div className="border-t border-border/60 pt-4">
                <h4 className="font-semibold mb-4">ملخص الحجز</h4>
                <div className="space-y-3 text-sm">
                  {formData.date && (
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        التاريخ
                      </span>
                      <span className="font-medium" dir="ltr">
                        {new Date(formData.date).toLocaleDateString('ar-EG', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                  )}

                  {selectedTime && (
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        الوقت
                      </span>
                      <span className="font-medium" dir="ltr">{selectedTime}</span>
                    </div>
                  )}

                  {formData.address && (
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <span className="flex-1">
                        <span className="text-muted-foreground">الموقع</span>
                        <p className="font-medium text-foreground truncate">{formData.address}</p>
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="border-t border-border/60 pt-4">
                <h4 className="font-semibold mb-4">ملخص الفاتورة</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      الخدمة ({provider.serviceTime} ساعات × {provider.hourlyRate} ريال)
                    </span>
                    <span className="font-medium">{basePrice.toLocaleString()} ريال</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">ضريبة (15%)</span>
                    <span className="font-medium">{tax.toLocaleString('en-US', { maximumFractionDigits: 0 })} ريال</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-border/60 pt-2">
                    <span className="font-semibold">الإجمالي</span>
                    <span className="text-lg font-bold text-primary">{total.toLocaleString('en-US', { maximumFractionDigits: 0 })} ريال</span>
                  </div>
                </div>
              </div>

              {/* Info Box */}
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 text-xs text-muted-foreground space-y-1">
                <p>✓ ضمان جودة الخدمة</p>
                <p>✓ دفع آمن وموثوق</p>
                <p>✓ إلغاء مجاني قبل 24 ساعة</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}