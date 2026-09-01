'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function DashboardSettingsPage() {
  const user = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') || 'null') : null
  const [name, setName] = useState(user?.fullName || '')
  const [phone, setPhone] = useState(user?.phone || '')
  const [message, setMessage] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  const saveSettings = async () => {
    if (!user?.id) return
    setIsSaving(true)
    setMessage('')
    try {
      const response = await fetch(`/api/users/${user.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token') || ''}` },
        body: JSON.stringify({ fullName: name, phone }),
      })
      const result = await response.json()
      if (!response.ok || !result.success) throw new Error(result.message)
      localStorage.setItem('user', JSON.stringify({ ...user, fullName: name, phone }))
      setMessage('تم حفظ التعديلات بنجاح.')
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'تعذر حفظ التعديلات')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-10 text-start">
      <div className="max-w-2xl rounded-xl border border-border bg-card p-8">
        <h1 className="text-2xl font-semibold tracking-tight">الإعدادات</h1>
        <p className="mt-2 text-muted-foreground">حدّث معلومات حسابك الأساسية.</p>
        <div className="mt-6 space-y-4">
          <div><label className="mb-2 block text-sm font-medium">الاسم</label><Input value={name} onChange={(event) => setName(event.target.value)} /></div>
          <div><label className="mb-2 block text-sm font-medium">رقم الهاتف</label><Input value={phone} onChange={(event) => setPhone(event.target.value)} /></div>
          <Button type="button" onClick={saveSettings} disabled={isSaving}>{isSaving ? 'جاري الحفظ...' : 'حفظ التعديلات'}</Button>
          {message && <p className="text-sm text-muted-foreground">{message}</p>}
        </div>
      </div>
    </div>
  )
}
