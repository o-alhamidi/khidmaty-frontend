'use client'

import * as React from 'react'
import { Bell, Search, Filter, Menu, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ThemeToggle } from '@/components/theme-toggle'
import { LanguageToggle } from '@/components/language-toggle'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

const adminNotifications = [
  {
    title: 'في انتظار التوثيق',
    desc: 'أحمد حسن (فني كهرباء) في انتظار الموافقة على وثائقه.',
    time: 'منذ 5 دقائق',
    unread: true,
    tone: 'bg-amber-500',
  },
  {
    title: 'تنبيه: ضغط عالي',
    desc: 'قام النظام بمعالجة 2,450 حجز اليوم (أعلى من المتوسط بـ 20%).',
    time: 'منذ 30 دقيقة',
    unread: true,
    tone: 'bg-blue-500',
  },
  {
    title: 'شكوى جديدة',
    desc: 'أبلغ عميل عن مشكلة مع مزود خدمة في الطلب رقم #4521.',
    time: 'منذ ساعة',
    unread: false,
    tone: 'bg-red-500',
  },
]

export function AdminNavbar() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur md:px-6">
      <Button variant="ghost" size="icon" className="md:hidden" aria-label="القائمة">
        <Menu className="h-5 w-5" />
      </Button>

      <div className="relative w-full max-w-md">
        <Search className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="ابحث عن مستخدمين، مزودين، خدمات..."
          className="h-10 bg-secondary/60 border-transparent ps-9 focus-visible:bg-background"
        />
      </div>

      <div className="ms-auto flex items-center gap-1.5">
        <Button size="sm" variant="outline" className="hidden gap-1.5 sm:inline-flex">
          <Filter className="h-4 w-4" />
          تصفية
        </Button>

        <Button size="sm" variant="outline" className="hidden gap-1.5 sm:inline-flex">
          <Download className="h-4 w-4" />
          تصدير
        </Button>

        <LanguageToggle />
        <ThemeToggle />

        {/* إشعارات الإدارة */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative" aria-label="الإشعارات">
              <Bell className="h-4 w-4" />
              <span className="absolute start-2 top-2 flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-destructive/60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-destructive" />
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 p-0 rtl:text-right">
            <div className="flex items-center justify-between p-3">
              <span className="text-sm font-semibold">تنبيهات الإدارة</span>
              <button className="text-xs text-muted-foreground hover:text-foreground">
                مسح الكل
              </button>
            </div>
            <DropdownMenuSeparator />
            <div className="max-h-80 overflow-y-auto">
              {adminNotifications.map((n, i) => (
                <button
                  key={i}
                  className="flex w-full gap-3 px-3 py-3 text-start transition-colors hover:bg-secondary"
                >
                  <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${n.tone}`} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-medium leading-snug">{n.title}</p>
                      <span className="shrink-0 text-[10px] text-muted-foreground">{n.time}</span>
                    </div>
                    <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">{n.desc}</p>
                  </div>
                </button>
              ))}
            </div>
            <DropdownMenuSeparator />
            <div className="p-2">
              <Button variant="ghost" className="w-full text-xs" size="sm">
                عرض جميع التنبيهات
              </Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* ملف الإدارة */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="ms-1 flex items-center gap-2 rounded-full p-1 transition-colors hover:bg-secondary">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-destructive/15 text-xs font-semibold text-destructive">
                  م.إ
                </AvatarFallback>
              </Avatar>
              <div className="hidden text-start lg:block">
                <p className="text-xs font-semibold leading-none">مدير النظام</p>
                <p className="mt-1 text-[10px] leading-none text-muted-foreground">صلاحيات كاملة</p>
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 rtl:text-right">
            <DropdownMenuLabel>
              <div>مدير النظام</div>
              <div className="text-xs font-normal text-muted-foreground">admin@smart-service.com</div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>لوحة التحكم</DropdownMenuItem>
            <DropdownMenuItem>إعدادات الحساب</DropdownMenuItem>
            <DropdownMenuItem>سجل النشاطات</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive focus:text-destructive">
              تسجيل الخروج
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}