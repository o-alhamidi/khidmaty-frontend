import { StatsCards } from "@/components/dashboard/stats-cards"
import { ActivityChart } from "@/components/dashboard/activity-chart"
import { BookingsList } from "@/components/dashboard/bookings-list"
import { FavoriteProviders } from "@/components/dashboard/favorite-providers"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-10 text-start">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">مرحباً بعودتك، يارا</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            إليك ما يحدث في طلباتك وخدماتك اليوم.
          </p>
        </div>
        <Button className="gap-1.5 md:self-end">
          <Plus className="h-4 w-4" />
          حجز جديد
        </Button>
      </div>

      <div className="mt-8 space-y-6">
        <StatsCards />

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ActivityChart />
          </div>
          <QuickActions />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <BookingsList />
          </div>
          <FavoriteProviders />
        </div>
      </div>
    </div>
  )
}