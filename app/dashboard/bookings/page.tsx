import { BookingsList } from '@/components/dashboard/bookings-list'

export default function DashboardBookingsPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-10 text-start">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">حجوزاتي</h1>
        <p className="mt-1 text-sm text-muted-foreground">تابع حالة طلباتك ومواعيد خدماتك من مكان واحد.</p>
      </div>
      <BookingsList />
    </div>
  )
}
