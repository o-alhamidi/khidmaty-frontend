'use client'

import { TrendingUp, Users, Briefcase, DollarSign, AlertCircle, CheckCircle2, Clock } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { AreaChart, Area, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const statCards = [
  {
    title: 'إجمالي المستخدمين',
    value: '12,584',
    change: '+12.5%',
    icon: Users,
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50 dark:bg-blue-950',
  },
  {
    title: 'المزودون النشطون',
    value: '3,294',
    change: '+8.2%',
    icon: Briefcase,
    color: 'from-emerald-500 to-emerald-600',
    bgColor: 'bg-emerald-50 dark:bg-emerald-950',
  },
  {
    title: 'إجمالي الأرباح',
    value: '485,230 ريال',
    change: '+23.1%',
    icon: DollarSign,
    color: 'from-amber-500 to-amber-600',
    bgColor: 'bg-amber-50 dark:bg-amber-950',
  },
  {
    title: 'حجوزات اليوم',
    value: '2,847',
    change: '+5.3%',
    icon: Clock,
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-50 dark:bg-purple-950',
  },
]

const alertCards = [
  {
    icon: AlertCircle,
    title: 'في انتظار التوثيق',
    value: '12',
    description: 'مزودو خدمة بانتظار الموافقة',
    color: 'text-amber-600 dark:text-amber-400',
    bgColor: 'bg-amber-50 dark:bg-amber-950/30',
  },
  {
    icon: AlertCircle,
    title: 'شكاوى مفتوحة',
    value: '3',
    description: 'نزاعات بين العملاء والمزودين',
    color: 'text-red-600 dark:text-red-400',
    bgColor: 'bg-red-50 dark:bg-red-950/30',
  },
  {
    icon: CheckCircle2,
    title: 'حالة النظام',
    value: '99.8%',
    description: 'نسبة استقرار المنصة هذا الشهر',
    color: 'text-emerald-600 dark:text-emerald-400',
    bgColor: 'bg-emerald-50 dark:bg-emerald-950/30',
  },
]

const revenueData = [
  { date: 'يناير', revenue: 24000, target: 28000 },
  { date: 'فبراير', revenue: 32000, target: 28000 },
  { date: 'مارس', revenue: 28500, target: 28000 },
  { date: 'أبريل', revenue: 35200, target: 32000 },
  { date: 'مايو', revenue: 42800, target: 35000 },
  { date: 'يونيو', revenue: 48500, target: 40000 },
]

const bookingData = [
  { day: 'الإثنين', bookings: 420, completed: 385 },
  { day: 'الثلاثاء', bookings: 520, completed: 485 },
  { day: 'الأربعاء', bookings: 380, completed: 340 },
  { day: 'الخميس', bookings: 680, completed: 645 },
  { day: 'الجمعة', bookings: 750, completed: 710 },
  { day: 'السبت', bookings: 640, completed: 595 },
  { day: 'الأحد', bookings: 380, completed: 340 },
]

const userTrendData = [
  { month: 'يناير', customers: 2400, providers: 1240 },
  { month: 'فبراير', customers: 3210, providers: 1398 },
  { month: 'مارس', customers: 4200, providers: 1521 },
  { month: 'أبريل', customers: 5820, providers: 1854 },
  { month: 'مايو', customers: 7420, providers: 2254 },
  { month: 'يونيو', customers: 8584, providers: 3294 },
]

export default function AdminDashboard() {
  return (
    <div className="flex-1 space-y-6 overflow-auto p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">لوحة تحكم الإدارة</h1>
        <p className="text-muted-foreground">مرحباً بعودتك. إليك ملخص لما يحدث في منصتك اليوم.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title} className="overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">{stat.title}</p>
                    <p className="text-2xl font-bold mt-2">{stat.value}</p>
                    <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium mt-2">
                      {stat.change}
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.color} text-white`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Alert Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        {alertCards.map((alert) => {
          const Icon = alert.icon
          return (
            <Card key={alert.title} className={`p-6 ${alert.bgColor}`}>
              <div className="flex items-start gap-4">
                <Icon className={`w-8 h-8 ${alert.color}`} />
                <div>
                  <p className="text-sm font-semibold text-foreground">{alert.title}</p>
                  <p className="text-2xl font-bold mt-1">{alert.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{alert.description}</p>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Revenue Chart */}
        <Card className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold">مؤشر الأرباح</h3>
            <p className="text-xs text-muted-foreground mt-1">الأرباح الشهرية مقارنة بالهدف</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueData}>
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
              <Area name="الهدف" type="monotone" dataKey="target" stroke="hsl(var(--muted-foreground))" strokeDasharray="5 5" fill="none" />
              <Area name="الأرباح" type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorRevenue)" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Booking Status Chart */}
        <Card className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold">الحجوزات الأسبوعية</h3>
            <p className="text-xs text-muted-foreground mt-1">إجمالي الحجوزات مقارنة بالطلبات المكتملة</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={bookingData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', textAlign: 'right' }} />
              <Legend />
              <Bar name="مكتملة" dataKey="completed" fill="hsl(var(--primary))" />
              <Bar name="إجمالي الحجوزات" dataKey="bookings" fill="hsl(var(--muted-foreground))" opacity={0.3} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* User Growth Chart */}
      <Card className="p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold">نمو المستخدمين</h3>
          <p className="text-xs text-muted-foreground mt-1">معدل زيادة العملاء ومزودي الخدمة بمرور الوقت</p>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={userTrendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
            <YAxis stroke="hsl(var(--muted-foreground))" />
            <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', textAlign: 'right' }} />
            <Legend />
            <Line name="العملاء" type="monotone" dataKey="customers" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ fill: 'hsl(var(--primary))' }} />
            <Line name="المزودون" type="monotone" dataKey="providers" stroke="hsl(var(--destructive))" strokeWidth={2} dot={{ fill: 'hsl(var(--destructive))' }} />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  )
}