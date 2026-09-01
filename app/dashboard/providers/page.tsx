import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function DashboardProvidersPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-10 text-start">
      <div className="rounded-xl border border-border bg-card p-8">
        <h1 className="text-2xl font-semibold tracking-tight">مزودو الخدمة</h1>
        <p className="mt-2 text-muted-foreground">اكتشف مزودي الخدمة الموثقين واحجز الخدمة المناسبة لك.</p>
        <Button asChild className="mt-6"><Link href="/services">تصفح مزودي الخدمة</Link></Button>
      </div>
    </div>
  )
}
