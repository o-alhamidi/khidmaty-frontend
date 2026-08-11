'use client'

import { useState } from 'react'
import { Plus, Search, Edit2, Trash2, MoreHorizontal, Eye } from 'lucide-react'
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

const mockCategories = [
  {
    id: '1',
    name: 'كهرباء',
    slug: 'electrical-services',
    description: 'فنيون متخصصون في تأسيس وصيانة الأنظمة الكهربائية',
    providers: 324,
    bookings: 2845,
    status: 'نشط',
    featured: true,
  },
  {
    id: '2',
    name: 'سباكة',
    slug: 'plumbing',
    description: 'خدمات تركيب وإصلاح شبكات المياه والصرف الصحي',
    providers: 287,
    bookings: 1924,
    status: 'نشط',
    featured: true,
  },
  {
    id: '3',
    name: 'تكييف وتبريد',
    slug: 'hvac',
    description: 'تركيب وصيانة أجهزة التكييف وأنظمة التهوية',
    providers: 156,
    bookings: 1245,
    status: 'نشط',
    featured: false,
  },
  {
    id: '4',
    name: 'نجارة',
    slug: 'carpentry',
    description: 'تركيب الأثاث، إصلاح الأبواب، والأعمال الخشبية',
    providers: 198,
    bookings: 856,
    status: 'نشط',
    featured: false,
  },
  {
    id: '5',
    name: 'نظافة عامة',
    slug: 'cleaning',
    description: 'خدمات التنظيف الاحترافية للمنازل والمكاتب',
    providers: 412,
    bookings: 3421,
    status: 'نشط',
    featured: true,
  },
  {
    id: '6',
    name: 'تنسيق حدائق',
    slug: 'landscaping',
    description: 'العناية بالحدائق، زراعة الأشجار، وتنسيق المساحات الخارجية',
    providers: 165,
    bookings: 542,
    status: 'غير نشط',
    featured: false,
  },
]

export default function CategoriesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('الكل')
  const [isAddingCategory, setIsAddingCategory] = useState(false)

  const filteredCategories = mockCategories.filter((category) => {
    const matchesSearch =
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'الكل' || category.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'نشط':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-400'
      case 'غير نشط':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-400'
      default:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-950/30 dark:text-blue-400'
    }
  }

  return (
    <div className="flex-1 space-y-6 overflow-auto p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">تصنيفات الخدمات</h1>
          <p className="text-sm text-muted-foreground mt-1">
            أدر تصنيفات الخدمات ونظم الأقسام المتاحة للعملاء
          </p>
        </div>
        <Button onClick={() => setIsAddingCategory(true)} className="w-full md:w-auto gap-2">
          <Plus className="h-4 w-4" />
          إضافة تصنيف
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-3">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="ابحث عن تصنيف..."
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
          </select>
        </div>
      </Card>

      {/* Grid View */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCategories.length > 0 ? (
          filteredCategories.map((category) => (
            <Card key={category.id} className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
              {/* Header */}
              <div className="relative flex items-start justify-between p-6 border-b border-border">
                <div className="flex-1 text-start">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold">{category.name}</h3>
                    {category.featured && (
                      <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-950/30 dark:text-amber-400">
                        مميز
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {category.description}
                  </p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="rtl:text-right">
                    <DropdownMenuLabel>الإجراءات</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="flex gap-2">
                      <Eye className="h-4 w-4" />
                      عرض
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex gap-2">
                      <Edit2 className="h-4 w-4" />
                      تعديل
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="flex gap-2 text-destructive focus:text-destructive">
                      <Trash2 className="h-4 w-4" />
                      حذف
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Stats */}
              <div className="flex flex-1 items-end justify-between p-6">
                <div className="flex gap-6 text-start">
                  <div>
                    <p className="text-2xl font-bold">{category.providers}</p>
                    <p className="text-xs text-muted-foreground">مزود خدمة</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{category.bookings}</p>
                    <p className="text-xs text-muted-foreground">حجز</p>
                  </div>
                </div>
                <span
                  className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                    category.status
                  )}`}
                >
                  {category.status}
                </span>
              </div>
            </Card>
          ))
        ) : (
          <Card className="col-span-full p-8 text-center">
            <p className="text-muted-foreground">لم يتم العثور على تصنيفات تطابق بحثك</p>
          </Card>
        )}
      </div>

      {/* Add Category Modal */}
      {isAddingCategory && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 md:p-0">
          <Card className="w-full max-w-lg">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h2 className="text-xl font-semibold">إضافة تصنيف جديد</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsAddingCategory(false)}
              >
                ✕
              </Button>
            </div>

            <form className="p-6 space-y-4">
              <div className="space-y-2 text-start">
                <label className="text-sm font-medium">اسم التصنيف</label>
                <Input placeholder="مثال: خدمات كهربائية" />
              </div>

              <div className="space-y-2 text-start">
                <label className="text-sm font-medium">الوصف</label>
                <textarea
                  placeholder="وصف موجز عن هذا التصنيف والخدمات التي يشملها..."
                  className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary min-h-24 resize-none"
                />
              </div>

              <div className="space-y-2 text-start">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="rounded border-input accent-primary cursor-pointer"
                  />
                  <span className="text-sm font-medium">تصنيف مميز (يظهر في الرئيسية)</span>
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsAddingCategory(false)}
                  className="flex-1"
                >
                  إلغاء
                </Button>
                <Button
                  type="button"
                  onClick={() => setIsAddingCategory(false)}
                  className="flex-1"
                >
                  إنشاء التصنيف
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  )
}