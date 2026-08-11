'use client'

import { useState } from 'react'
import {
  AlertCircle,
  CheckCircle2,
  AlertTriangle,
  Info,
  Trash2,
  Archive,
  Bell,
  Filter,
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const mockNotifications = [
  {
    id: '1',
    type: 'verification',
    icon: AlertCircle,
    title: 'طلب توثيق جديد',
    message: 'قدم أحمد حسن (فني كهرباء) وثائق الاعتماد وهو بانتظار الموافقة.',
    timestamp: 'منذ 5 دقائق',
    read: false,
    severity: 'warning',
  },
  {
    id: '2',
    type: 'dispute',
    icon: AlertTriangle,
    title: 'شكوى جديدة',
    message: 'العميلة يارا سالم قدمت شكوى ضد المزود كريم السيد بخصوص الطلب #4521.',
    timestamp: 'منذ 15 دقيقة',
    read: false,
    severity: 'critical',
  },
  {
    id: '3',
    type: 'system',
    icon: Info,
    title: 'تنبيه أداء النظام',
    message: 'زادت أوقات استعلام قاعدة البيانات بنسبة 40% في الساعة الماضية. يرجى التحقق من الأداء.',
    timestamp: 'منذ ساعة',
    read: false,
    severity: 'info',
  },
  {
    id: '4',
    type: 'verification_approved',
    icon: CheckCircle2,
    title: 'تمت الموافقة على توثيق المزود',
    message: 'تم توثيق منى حسن (سباكة) بنجاح وهي الآن نشطة.',
    timestamp: 'منذ 3 ساعات',
    read: true,
    severity: 'success',
  },
  {
    id: '5',
    type: 'payment',
    icon: Info,
    title: 'ضغط عالي في النظام',
    message: 'قامت المنصة بمعالجة 2,450 حجز اليوم (أعلى من المتوسط بـ 20%). الأرباح: 485,230 ريال.',
    timestamp: 'بالأمس',
    read: true,
    severity: 'info',
  },
  {
    id: '6',
    type: 'compliance',
    icon: AlertCircle,
    title: 'مراجعة الامتثال مطلوبة',
    message: 'المزودة ليلى محمد لم تكمل المراجعة المطلوبة للامتثال خلال 30 يوماً.',
    timestamp: 'منذ يومين',
    read: true,
    severity: 'warning',
  },
  {
    id: '7',
    type: 'fraud',
    icon: AlertTriangle,
    title: 'اكتشاف نشاط مشبوه',
    message: 'تم اكتشاف محاولات دفع فاشلة متعددة من عنوان IP 192.168.1.1. تم وضع علامة على الحساب للمراجعة.',
    timestamp: 'منذ 3 أيام',
    read: true,
    severity: 'critical',
  },
  {
    id: '8',
    type: 'update',
    icon: Info,
    title: 'اكتمل تحديث النظام',
    message: 'اكتملت صيانة المنصة بنجاح. جميع الأنظمة تعمل بشكل طبيعي ومستقرة.',
    timestamp: 'منذ أسبوع',
    read: true,
    severity: 'success',
  },
]

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications)
  const [filterType, setFilterType] = useState('all')

  const filteredNotifications = notifications.filter((n) => {
    if (filterType === 'unread') return !n.read
    if (filterType === 'read') return n.read
    return true
  })

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-800 dark:bg-red-950/30 dark:text-red-400 border-s-4 border-red-500'
      case 'warning':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-950/30 dark:text-amber-400 border-s-4 border-amber-500'
      case 'success':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-400 border-s-4 border-emerald-500'
      default:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-950/30 dark:text-blue-400 border-s-4 border-blue-500'
    }
  }

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  return (
    <div className="flex-1 space-y-6 overflow-auto p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">الإشعارات</h1>
          <p className="text-sm text-muted-foreground mt-1">
            تنبيهات النظام، الموافقات، والتحديثات الهامة للمنصة
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={markAllAsRead}>
            تحديد الكل كمقروء
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex items-center gap-3">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">جميع الإشعارات</option>
            <option value="unread">غير مقروءة</option>
            <option value="read">مقروءة</option>
          </select>
        </div>
      </Card>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification) => {
            const Icon = notification.icon
            return (
              <Card
                key={notification.id}
                className={`p-4 cursor-pointer transition-all hover:shadow-md text-start ${
                  getSeverityColor(notification.severity)
                } ${!notification.read ? 'border-s-8' : ''}`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <Icon className="h-5 w-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <h3 className="font-semibold text-base leading-snug">
                          {notification.title}
                        </h3>
                        <p className="text-sm opacity-90 mt-1">
                          {notification.message}
                        </p>
                      </div>
                      {!notification.read && (
                        <div className="flex-shrink-0 h-2 w-2 rounded-full bg-blue-500 mt-2" />
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <p className="text-xs opacity-75">{notification.timestamp}</p>
                      <div className="flex items-center gap-2">
                        {!notification.read && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => markAsRead(notification.id)}
                            className="h-8 px-2 text-xs"
                          >
                            تحديد كمقروء
                          </Button>
                        )}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              ⋮
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="rtl:text-right">
                            <DropdownMenuLabel>الإجراءات</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {!notification.read && (
                              <DropdownMenuItem
                                onClick={() => markAsRead(notification.id)}
                              >
                                تحديد كمقروء
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem className="flex gap-2">
                              <Archive className="h-4 w-4" />
                              أرشفة
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-destructive focus:text-destructive flex gap-2"
                              onClick={() => deleteNotification(notification.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                              حذف
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            )
          })
        ) : (
          <Card className="p-8 text-center">
            <Bell className="h-12 w-12 mx-auto text-muted-foreground opacity-50 mb-4" />
            <p className="text-muted-foreground">
              {filterType === 'unread'
                ? 'لا توجد إشعارات غير مقروءة'
                : 'لا توجد إشعارات'}
            </p>
          </Card>
        )}
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <p>
          عرض {filteredNotifications.length} من أصل {notifications.length} إشعار
        </p>
        <p>
          {notifications.filter((n) => !n.read).length} غير مقروء
        </p>
      </div>
    </div>
  )
}