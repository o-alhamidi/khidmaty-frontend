'use client'

import { useState } from 'react'
import { Search, ChevronDown, MoreHorizontal, Trash2, Eye, Lock, Unlock, Mail } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

const mockUsers = [
  {
    id: '1',
    name: 'يارا سالم',
    email: 'yara.salem@example.com',
    phone: '+967 771 123 456',
    joinDate: '2024-01-15',
    bookings: 24,
    status: 'نشط',
    role: 'عميل',
    lastActive: 'منذ ساعتين',
  },
  {
    id: '2',
    name: 'أحمد السيد',
    email: 'ahmed.elsayed@example.com',
    phone: '+967 771 234 567',
    joinDate: '2024-02-20',
    bookings: 12,
    status: 'نشط',
    role: 'عميل',
    lastActive: 'منذ 5 دقائق',
  },
  {
    id: '3',
    name: 'منى حسن',
    email: 'mona.hassan@example.com',
    phone: '+967 733 345 678',
    joinDate: '2024-03-10',
    bookings: 0,
    status: 'غير نشط',
    role: 'عميل',
    lastActive: 'منذ 3 أسابيع',
  },
  {
    id: '4',
    name: 'فاطمة أحمد',
    email: 'fatima.ahmed@example.com',
    phone: '+967 711 456 789',
    joinDate: '2024-01-05',
    bookings: 42,
    status: 'نشط',
    role: 'عميل',
    lastActive: 'منذ ساعة',
  },
  {
    id: '5',
    name: 'عمر إبراهيم',
    email: 'omar.ibrahim@example.com',
    phone: '+967 774 567 890',
    joinDate: '2024-04-15',
    bookings: 8,
    status: 'نشط',
    role: 'عميل',
    lastActive: 'منذ 30 دقيقة',
  },
  {
    id: '6',
    name: 'ليلى محمد',
    email: 'layla.mohamed@example.com',
    phone: '+967 735 678 901',
    joinDate: '2024-02-25',
    bookings: 0,
    status: 'موقوف',
    role: 'عميل',
    lastActive: 'منذ شهرين',
  },
]

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('الكل')
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])

  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'الكل' || user.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'نشط':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-400'
      case 'غير نشط':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-400'
      case 'موقوف':
        return 'bg-red-100 text-red-800 dark:bg-red-950/30 dark:text-red-400'
      default:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-950/30 dark:text-blue-400'
    }
  }

  return (
    <div className="flex-1 space-y-6 overflow-auto p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">إدارة المستخدمين</h1>
          <p className="text-sm text-muted-foreground mt-1">
            أدر مستخدمي المنصة واطلع على التفاصيل الدقيقة لكل مستخدم.
          </p>
        </div>
        <Button className="w-full md:w-auto">إضافة مستخدم</Button>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-3">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="ابحث عن مستخدم بالاسم أو البريد..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="ps-9 bg-secondary/50"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="الكل">جميع الحالات</option>
            <option value="نشط">نشط</option>
            <option value="غير نشط">غير نشط</option>
            <option value="موقوف">موقوف</option>
          </select>
        </div>
      </Card>

      {/* Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-start">
            <thead>
              <tr className="border-b border-border bg-secondary/30">
                <th className="px-4 py-3 text-start">
                  <input
                    type="checkbox"
                    className="rounded border-input accent-primary cursor-pointer"
                    checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedUsers(filteredUsers.map((u) => u.id))
                      } else {
                        setSelectedUsers([])
                      }
                    }}
                  />
                </th>
                <th className="px-4 py-3 text-start text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  المستخدم
                </th>
                <th className="px-4 py-3 text-start text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  معلومات التواصل
                </th>
                <th className="px-4 py-3 text-start text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  تاريخ الانضمام
                </th>
                <th className="px-4 py-3 text-start text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  الحجوزات
                </th>
                <th className="px-4 py-3 text-start text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  الحالة
                </th>
                <th className="px-4 py-3 text-start text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  آخر ظهور
                </th>
                <th className="px-4 py-3 text-start text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  إجراءات
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-border hover:bg-secondary/30 transition-colors">
                    <td className="px-4 py-4 text-start">
                      <input
                        type="checkbox"
                        className="rounded border-input accent-primary cursor-pointer"
                        checked={selectedUsers.includes(user.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedUsers([...selectedUsers, user.id])
                          } else {
                            setSelectedUsers(selectedUsers.filter((id) => id !== user.id))
                          }
                        }}
                      />
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-primary/15 text-xs font-semibold">
                            {user.name
                              .split(' ')
                              .map((n) => n[0])
                              .join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{user.name}</p>
                          <p className="text-xs text-muted-foreground">{user.role}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm">
                        <p className="font-medium">{user.email}</p>
                        <p className="text-xs text-muted-foreground">{user.phone}</p>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-start">
                      <p className="text-sm text-muted-foreground">{user.joinDate}</p>
                    </td>
                    <td className="px-4 py-4 text-start">
                      <p className="text-sm font-medium">{user.bookings}</p>
                    </td>
                    <td className="px-4 py-4 text-start">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-start">
                      <p className="text-sm text-muted-foreground">{user.lastActive}</p>
                    </td>
                    <td className="px-4 py-4 text-start">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="rtl:text-right">
                          <DropdownMenuLabel>الإجراءات</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="flex gap-2">
                            <Eye className="h-4 w-4" />
                            عرض التفاصيل
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex gap-2">
                            <Mail className="h-4 w-4" />
                            إرسال بريد
                          </DropdownMenuItem>
                          {user.status === 'نشط' ? (
                            <>
                              <DropdownMenuItem className="flex gap-2">
                                <Lock className="h-4 w-4" />
                                إيقاف الحساب
                              </DropdownMenuItem>
                            </>
                          ) : (
                            <DropdownMenuItem className="flex gap-2">
                              <Unlock className="h-4 w-4" />
                              تنشيط الحساب
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="flex gap-2 text-destructive focus:text-destructive">
                            <Trash2 className="h-4 w-4" />
                            حذف المستخدم
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-muted-foreground">
                    لم يتم العثور على مستخدمين يطابقون بحثك
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          عرض {filteredUsers.length} من أصل {mockUsers.length} مستخدم
        </p>
        {selectedUsers.length > 0 && (
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">
              تم تحديد {selectedUsers.length}
            </span>
            <Button variant="outline" size="sm">
              إيقاف المحدد
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}