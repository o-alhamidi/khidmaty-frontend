import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { isAdmin } from '@/lib/server-auth'
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!isAdmin(req)) return NextResponse.json({ success: false, message: 'غير مصرح' }, { status: 403 })
  const { id } = await params
  try { const body = await req.json(); const category = await prisma.category.update({ where: { id }, data: { name: body.name, slug: body.slug, description: body.description, icon: body.icon, color: body.color, featured: body.featured === undefined ? undefined : Boolean(body.featured), status: body.status } }); return NextResponse.json({ success: true, data: category }) } catch { return NextResponse.json({ success: false, message: 'تعذر تحديث التصنيف' }, { status: 400 }) }
}
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!isAdmin(req)) return NextResponse.json({ success: false, message: 'غير مصرح' }, { status: 403 })
  const { id } = await params
  try { await prisma.category.delete({ where: { id } }); return NextResponse.json({ success: true }) } catch { return NextResponse.json({ success: false, message: 'لا يمكن حذف تصنيف مرتبط بخدمات' }, { status: 409 }) }
}
