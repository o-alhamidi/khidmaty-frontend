'use client'

import { useState } from 'react'
import { Search, ChevronDown, MoreHorizontal, Trash2, Eye, CheckCircle2, XCircle, Clock, Star } from 'lucide-react'
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

const mockProviders = [
  {
    id: '1',
    name: 'كريم السيد',
    email: 'karim.elsayed@example.com',
    specialization: 'خدمات كهربائية',
    location: 'تعز',
    joinDate: '2024-01-10',
    rating: 4.8,
    reviews: 124,
    jobs: 156,
    earnings: '45,200 ريال',
    status: 'موثق',
    compliance: 'ممتثل',
  },
  {
    id: '2',
    name: 'منى حسن',
    email: 'mona.hassan@example.com',
    specialization: 'سباكة',
    location: 'عدن',
    joinDate: '2024-02-15',
    rating: 4.6,
    reviews: 89,
    jobs: 98,
    earnings: '32,100 ريال',
    status: 'قيد الانتظار',
    compliance: 'ممتثل',
  },
  {
    id: '3',
    name: 'أحمد فرح',
    email: 'ahmed.farah@example.com',
    specialization: 'تكييف وتبريد',
    location: 'صنعاء',
    joinDate: '2024-03-20',
    rating: 4.9,
    reviews: 56,
    jobs: 62,
    earnings: '28,500 ريال',
    status: 'موثق',
    compliance: 'ممتثل',
  },
  {
    id: '4',
    name: 'ليلى محمد',
    email: 'layla.mohamed@example.com',
    specialization: 'نجارة',
    location: 'تعز',
    joinDate: '2024-01-25',
    rating: 4.5,
    reviews: 42,
    jobs: 51,
    earnings: '19,800 ريال',
    status: 'موثق',
    compliance: 'إنذار',
  },
  {
    id: '5',
    name: 'عمر إبراهيم',
    email: 'omar.ibrahim@example.com',
    specialization: 'نظافة عامة',
    location: 'إب',
    joinDate: '2024-04-10',
    rating: 3.8,
    reviews: 15,
    jobs: 18,
    earnings: '5,400 ريال',
    status: 'قيد الانتظار',
    compliance: 'ممتثل',
  },
  {
    id: '6',
    name: 'فاطمة أحمد',
    email: 'fatima.ahmed@example.com',
    specialization: 'تنسيق حدائق',
    location: 'تعز',
    joinDate: '2023-12-15',
    rating: 4.7,
    reviews: 178,
    jobs: 215,
    earnings: '78,300 ريال',
    status: 'موثق',
    compliance: 'ممتثل',
  },
]

export default function ProvidersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('الكل')
  const [selectedProviders, setSelectedProviders] = useState<string[]>([])

  const filteredProviders = mockProviders.filter((provider) => {
    const matchesSearch =
      provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      provider.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      provider.specialization.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'الكل' || provider.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'موثق':
        return <CheckCircle2 className="h-4 w-4 text-emerald-600" />
      case 'قيد الانتظار':
        return <Clock className="h-4 w-4 text-amber-600" />
      case 'مرفوض':
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'موثق':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-400'
      case 'قيد الانتظار':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-950/30 dark:text-amber-400'
      case 'مرفوض':
        return 'bg-red-100 text-red-800 dark:bg-red-950/30 dark:text-red-400'
      default:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-950/30 dark:text-blue-400'
    }
  }

  const getComplianceColor = (compliance: string) => {
    switch (compliance) {
      case 'ممتثل':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-400'
      case 'إنذار':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-950/30 dark:text-amber-400'
      case 'حرج':
        return 'bg-red-100 text-red-800 dark:bg-red-950/30 dark:text-red-400'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-400'
    }
  }

  return (
    <div className="flex-1 space-y-6 overflow-auto p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">إدارة مزودي الخدمة</h1>
          <p className="text-sm text-muted-foreground mt-1">
            أدر مزودي الخدمة، تحقق من بيانات الاعتماد الخاصة بهم، وراقب أداءهم
          </p>
        </div>
        <Button className="w-full md:w-auto">إضافة مزود خدمة</Button>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-3">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="ابحث بالاسم، البريد الإلكتروني، أو التخصص..."
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
            <option value="موثق">موثق</option>
            <option value="قيد الانتظار">قيد الانتظار</option>
            <option value="مرفوض">مرفوض</option>
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
                    checked={selectedProviders.length === filteredProviders.length && filteredProviders.length > 0}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedProviders(filteredProviders.map((p) => p.id))
                      } else {
                        setSelectedProviders([])
                      }
                    }}
                  />
                </th>
                <th className="px-4 py-3 text-start text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  المزود
                </th>
                <th className="px-4 py-3 text-start text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  التخصص
                </th>
                <th className="px-4 py-3 text-start text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  التقييم
                </th>
                <th className="px-4 py-3 text-start text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  الأداء
                </th>
                <th className="px-4 py-3 text-start text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  التوثيق
                </th>
                <th className="px-4 py-3 text-start text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  الامتثال
                </th>
                <th className="px-4 py-3 text-start text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  إجراءات
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredProviders.length > 0 ? (
                filteredProviders.map((provider) => (
                  <tr key={provider.id} className="border-b border-border hover:bg-secondary/30 transition-colors">
                    <td className="px-4 py-4 text-start">
                      <input
                        type="checkbox"
                        className="rounded border-input accent-primary cursor-pointer"
                        checked={selectedProviders.includes(provider.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedProviders([...selectedProviders, provider.id])
                          } else {
                            setSelectedProviders(selectedProviders.filter((id) => id !== provider.id))
                          }
                        }}
                      />
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-primary/15 text-xs font-semibold">
                            {provider.name
                              .split(' ')
                              .map((n) => n[0])
                              .join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{provider.name}</p>
                          <p className="text-xs text-muted-foreground">{provider.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm text-start">
                        <p className="font-medium">{provider.specialization}</p>
                        <p className="text-xs text-muted-foreground">{provider.location}</p>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-start">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                        <span className="text-sm font-medium">{provider.rating}</span>
                        <span className="text-xs text-muted-foreground">({provider.reviews})</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-start">
                      <div className="text-sm">
                        <p className="font-medium">{provider.jobs} مهمة</p>
                        <p className="text-xs text-muted-foreground">{provider.earnings}</p>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-start">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(provider.status)}`}>
                        {getStatusIcon(provider.status)}
                        {provider.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-start">
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${getComplianceColor(provider.compliance)}`}>
                        {provider.compliance}
                      </span>
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
                            عرض الملف الشخصي
                          </DropdownMenuItem>
                          {provider.status === 'قيد الانتظار' && (
                            <>
                              <DropdownMenuItem className="flex gap-2 text-emerald-600">
                                <CheckCircle2 className="h-4 w-4" />
                                قبول
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex gap-2 text-red-600">
                                <XCircle className="h-4 w-4" />
                                رفض
                              </DropdownMenuItem>
                            </>
                          )}
                          <DropdownMenuItem className="flex gap-2">
                            عرض التقييمات
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex gap-2">
                            عرض النزاعات
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="flex gap-2 text-destructive focus:text-destructive">
                            <Trash2 className="h-4 w-4" />
                            إزالة المزود
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-muted-foreground">
                    لم يتم العثور على مزودي خدمة يطابقون بحثك
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
          عرض {filteredProviders.length} من أصل {mockProviders.length} مزود خدمة
        </p>
        {selectedProviders.length > 0 && (
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">
              تم تحديد {selectedProviders.length}
            </span>
            <Button variant="outline" size="sm">
              إجراءات مجمعة
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}