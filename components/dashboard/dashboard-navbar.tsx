"use client"

import * as React from "react"
import { Bell, Search, Plus, Menu, CheckCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const notifications = [
  {
    title: "تم تأكيد الحجز",
    desc: "وافق كريم السيد على طلبك للخدمة الكهربائية غداً الساعة 9 صباحاً.",
    time: "منذ دقيقتين",
    unread: true,
    tone: "bg-primary",
  },
  {
    title: "رسالة جديدة",
    desc: "أرسلت لك منى حسن تسعيرة تقديرية.",
    time: "منذ ساعة",
    unread: true,
    tone: "bg-amber-500",
  },
  {
    title: "تم استلام الدفعة",
    desc: "تمت معالجة دفعتك البالغة 480 ريال بنجاح.",
    time: "بالأمس",
    unread: false,
    tone: "bg-emerald-500",
  },
]

export function DashboardNavbar() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur md:px-6 text-start">
      <Button variant="ghost" size="icon" className="md:hidden" aria-label="القائمة">
        <Menu className="h-5 w-5" />
      </Button>

      <div className="relative w-full max-w-md">
        <Search className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="ابحث عن الحجوزات، مزودي الخدمة، الخدمات..."
          className="h-10 bg-secondary/60 border-transparent ps-9 focus-visible:bg-background"
        />
      </div>

      <div className="ms-auto flex items-center gap-1.5">
        <Button size="sm" className="hidden gap-1.5 sm:inline-flex">
          <Plus className="h-4 w-4" />
          حجز جديد
        </Button>

        <LanguageToggle />
        <ThemeToggle />

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative" aria-label="الإشعارات">
              <Bell className="h-4 w-4" />
              <span className="absolute end-2 top-2 flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 p-0 rtl:text-right">
            <div className="flex items-center justify-between p-3">
              <span className="text-sm font-semibold">الإشعارات</span>
              <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
                <CheckCheck className="h-3.5 w-3.5" /> تحديد الكل كمقروء
              </button>
            </div>
            <DropdownMenuSeparator />
            <div className="max-h-80 overflow-y-auto">
              {notifications.map((n, i) => (
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
                عرض جميع الإشعارات
              </Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="ms-1 flex items-center gap-2 rounded-full p-1 transition-colors hover:bg-secondary">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary/15 text-xs font-semibold text-primary">
                  ي.س
                </AvatarFallback>
              </Avatar>
              <div className="hidden text-start lg:block">
                <p className="text-xs font-semibold leading-none">يارا سالم</p>
                <p className="mt-1 text-[10px] leading-none text-muted-foreground">عميل</p>
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 rtl:text-right">
            <DropdownMenuLabel>
              <div>يارا سالم</div>
              <div className="text-xs font-normal text-muted-foreground">yara@example.com</div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>ملفي الشخصي</DropdownMenuItem>
            <DropdownMenuItem>إعدادات الحساب</DropdownMenuItem>
            <DropdownMenuItem>المدفوعات والفواتير</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>التبديل إلى مزود خدمة</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive focus:text-destructive">
              تسجيل الخروج
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}