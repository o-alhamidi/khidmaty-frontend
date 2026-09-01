'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminNavbar } from "@/components/admin/admin-navbar"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const user = JSON.parse(localStorage.getItem('user') || 'null')
    if (!token || user?.role !== 'ADMIN') {
      router.replace('/login')
      return
    }
    setIsAuthorized(true)
  }, [router])

  if (!isAuthorized) {
    return <div className="flex min-h-screen items-center justify-center text-muted-foreground">جاري التحقق من الصلاحيات...</div>
  }

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <AdminNavbar />
        <main className="flex-1 overflow-x-hidden">{children}</main>
      </div>
    </div>
  )
}
