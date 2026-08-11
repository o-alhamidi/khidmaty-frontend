"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  MessageSquare,
  Wallet,
  Star,
  Settings,
  HelpCircle,
  LogOut,
  Wrench,
  BookmarkCheck,
} from "lucide-react"
import { cn } from "@/lib/utils"

const main = [
  { href: "/dashboard", label: "نظرة عامة", icon: LayoutDashboard },
  { href: "/dashboard/bookings", label: "الحجوزات", icon: CalendarDays, badge: "4" },
  { href: "/dashboard/providers", label: "مزودو الخدمة", icon: Users },
  { href: "/dashboard/messages", label: "الرسائل", icon: MessageSquare, badge: "12" },
  { href: "/dashboard/saved", label: "المحفوظات", icon: BookmarkCheck },
  { href: "/dashboard/reviews", label: "التقييمات", icon: Star },
  { href: "/dashboard/payments", label: "المدفوعات", icon: Wallet },
]

const secondary = [
  { href: "/dashboard/settings", label: "الإعدادات", icon: Settings },
  { href: "/dashboard/help", label: "مركز المساعدة", icon: HelpCircle },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden w-64 shrink-0 border-e border-sidebar-border bg-sidebar text-sidebar-foreground md:flex md:flex-col text-start">
      <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-5">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
          <Wrench className="h-4 w-4" />
        </span>
        <span className="font-semibold tracking-tight">خدماتي</span>
      </div>

      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-3">
        <div className="px-2 py-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          مساحة العمل
        </div>
        {main.map((item) => {
          const active = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
              )}
            >
              <item.icon className="h-4 w-4" />
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-medium text-primary">
                  {item.badge}
                </span>
              )}
            </Link>
          )
        })}

        <div className="mt-6 px-2 py-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          عام
        </div>
        {secondary.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="border-t border-sidebar-border p-3">
        <div className="rounded-xl border border-sidebar-border bg-sidebar-accent/40 p-4">
          <p className="text-sm font-medium">الترقية إلى برو (Pro)</p>
          <p className="mt-1 text-xs text-muted-foreground">
            احصل على دعم بأولوية وأدوات متقدمة.
          </p>
          <button className="mt-3 inline-flex h-8 items-center justify-center rounded-md bg-primary px-3 text-xs font-medium text-primary-foreground hover:opacity-90">
            ترقية
          </button>
        </div>
        <button className="mt-3 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground">
          <LogOut className="h-4 w-4 rtl:rotate-180" />
          تسجيل الخروج
        </button>
      </div>
    </aside>
  )
}