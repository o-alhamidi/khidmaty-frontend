'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function DashboardSettingsPage() {
  const user = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') || 'null') : null
  const [name, setName] = useState(user?.fullName || '')
  const [phone, setPhone] = useState(user?.phone || '')

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-10 text-start">
      <div className="max-w-2xl rounded-xl border border-border bg-card p-8">
        <h1 className="text-2xl font-semibold tracking-tight">الإعدادات</h1>
        <p className="mt-2 text-muted-foreground">حدّث معلومات حسابك الأساسية.</p>
        <div className="mt-6 space-y-4">
          <div><label className="mb-2 block text-sm font-medium">الاسم</label><Input value={name} onChange={(event) => setName(event.target.value)} /></div>
          <div><label className="mb-2 block text-sm font-medium">رقم الهاتف</label><Input value={phone} onChange={(event) => setPhone(event.target.value)} /></div>
          <Button type="button" onClick={() => window.alert('سيتم تفعيل حفظ التعديلات بعد إضافة واجهة تحديث الملف الشخصي.')}>حفظ التعديلات</Button>
        </div>
      </div>
    </div>
  )
}
