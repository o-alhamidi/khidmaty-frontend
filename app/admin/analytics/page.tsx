'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Download, Calendar, TrendingUp, TrendingDown } from 'lucide-react'
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

const dateRanges = ['آخر 7 أيام', 'آخر 30 يوم', 'آخر 90 يوم', 'العام الماضي']

const dailyRevenueData = [
  { date: 'الإثنين', revenue: 8500, cost: 2100 },
  { date: 'الثلاثاء', revenue: 12200, cost: 2400 },
  { date: 'الأربعاء', revenue: 9800, cost: 2200 },
  { date: 'الخميس', revenue: 15600, cost: 3100 },
  { date: 'الجمعة', revenue: 18900, cost: 3800 },
  { date: 'السبت', revenue: 16200, cost: 3200 },
  { date: 'الأحد', revenue: 12400, cost: 2800 },
]

const conversionData = [
  { day: 'الإثنين', views: 2400, bookings: 240, cancellations: 24 },
  { day: 'الثلاثاء', views: 3210, bookings: 321, cancellations: 32 },
  { day: 'الأربعاء', views: 2290, bookings: 229, cancellations: 23 },
  { day: 'الخميس', views: 3800, bookings: 380, cancellations: 38 },
  { day: 'الجمعة', views: 4200, bookings: 420, cancellations: 42 },
  { day: 'السبت', views: 3950, bookings: 395, cancellations: 40 },
  { day: 'الأحد', views: 2800, bookings: 280, cancellations: 28 },
]

const categoryPerformanceData = [
  { name: 'كهرباء', value: 2845, percentage: 35 },
  { name: 'نظافة عامة', value: 2145, percentage: 26 },
  { name: 'سباكة', value: 1924, percentage: 24 },
  { name: 'أخرى', value: 1286, percentage: 15 },
]

const ratingDistribution = [
  { rating: '5★', count: 4230, percentage: 52 },
  { rating: '4★', count: 2180, percentage: 27 },
  { rating: '3★', count: 920, percentage: 11 },
  { rating: '2★', count: 325, percentage: 4 },
  { rating: '1★', count: 145, percentage: 2 },
]

const topProvidersData = [
  { name: 'فاطمة أحمد', earnings: 78300, jobs: 215, rating: 4.7 },
  { name: 'كريم السيد', earnings: 65200, jobs: 156, rating: 4.8 },
  { name: 'ليلى محمد', earnings: 52100, jobs: 134, rating: 4.6 },
  { name: 'أحمد فرح', earnings: 48500, jobs: 89, rating: 4.9 },
  { name: 'عمر إبراهيم', earnings: 35600, jobs: 72, rating: 4.4 },
]

const COLORS = ['hsl(var(--primary))', 'hsl(var(--destructive))', 'hsl(var(--amber-500))', 'hsl(var(--emerald-500))']

export default function AnalyticsPage() {
  return (
    <div className="flex-1 space-y-6 overflow-auto p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">التحليلات والتقارير</h1>
          <p className="text-sm text-muted-foreground mt-1">
            مقاييس الأداء التفصيلية ورؤى المنصة الذكية
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <select className="rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
            {dateRanges.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            تصدير التقرير
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        {[
          {
            label: 'إجمالي الأرباح',
            value: '485,230 ريال',
            change: '+23.1%',
            trend: 'up',
          },
          {
            label: 'متوسط قيمة الطلب',
            value: '540 ريال',
            change: '+5.2%',
            trend: 'up',
          },
          {
            label: 'معدل التحويل',
            value: '9.8%',
            change: '-1.2%',
            trend: 'down',
          },
          {
            label: 'رضا العملاء',
            value: '4.6/5',
            change: '+0.3%',
            trend: 'up',
          },
        ].map((metric) => (
          <Card key={metric.label} className="p-4">
            <p className="text-sm text-muted-foreground font-medium">{metric.label}</p>
            <p className="text-2xl font-bold mt-2">{metric.value}</p>
            <p
              className={`text-xs font-medium mt-2 flex items-center gap-1 ${
                metric.trend === 'up'
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : 'text-red-600 dark:text-red-400'
              }`}
            >
              {metric.trend === 'up' ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              {metric.change}
            </p>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Daily Revenue */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">الأرباح اليومية</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={dailyRevenueData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', textAlign: 'right' }} />
              <Legend />
              <Area name="التكاليف" type="monotone" dataKey="cost" fill="hsl(var(--destructive))" fillOpacity={0.2} stroke="hsl(var(--destructive))" />
              <Area name="الأرباح" type="monotone" dataKey="revenue" fill="url(#colorRevenue)" stroke="hsl(var(--primary))" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Conversion Funnel */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">مسار التحويل والمبيعات</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={conversionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', textAlign: 'right' }} />
              <Legend />
              <Bar name="الإلغاءات" dataKey="cancellations" fill="hsl(var(--destructive))" />
              <Bar name="الحجوزات" dataKey="bookings" fill="hsl(var(--primary))" />
              <Bar name="المشاهدات" dataKey="views" fill="hsl(var(--muted-foreground))" opacity={0.3} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Category & Rating Distribution */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Category Distribution */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">الحجوزات حسب التصنيف</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={categoryPerformanceData} cx="50%" cy="50%" labelLine={false} label={({ name, percentage }) => `${name} ${percentage}%`} outerRadius={80} fill="#8884d8" dataKey="value">
                {categoryPerformanceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', textAlign: 'right' }} />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Rating Distribution */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">توزيع تقييمات العملاء</h3>
          <div className="space-y-4">
            {ratingDistribution.map((rating) => (
              <div key={rating.rating}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">{rating.rating}</span>
                  <span className="text-sm text-muted-foreground">{rating.count} تقييم</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-primary h-full transition-all"
                    style={{ width: `${rating.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Top Providers Table */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">أفضل مزودي الخدمة أداءً</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-start">
            <thead>
              <tr className="border-b border-border">
                <th className="text-start text-xs font-medium text-muted-foreground uppercase tracking-wider py-3">
                  المزود
                </th>
                <th className="text-start text-xs font-medium text-muted-foreground uppercase tracking-wider py-3">
                  إجمالي الأرباح
                </th>
                <th className="text-start text-xs font-medium text-muted-foreground uppercase tracking-wider py-3">
                  المهام المنجزة
                </th>
                <th className="text-start text-xs font-medium text-muted-foreground uppercase tracking-wider py-3">
                  التقييم
                </th>
              </tr>
            </thead>
            <tbody>
              {topProvidersData.map((provider) => (
                <tr key={provider.name} className="border-b border-border hover:bg-secondary/30 transition-colors">
                  <td className="py-4 font-medium text-start">{provider.name}</td>
                  <td className="py-4 text-muted-foreground text-start">{provider.earnings.toLocaleString()} ريال</td>
                  <td className="py-4 text-muted-foreground text-start">{provider.jobs}</td>
                  <td className="py-4 text-start">
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-amber-100 dark:bg-amber-950/30 text-amber-800 dark:text-amber-400 text-sm font-medium">
                      ★ {provider.rating}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}