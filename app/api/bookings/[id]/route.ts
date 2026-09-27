import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getAuthenticatedUser } from '@/lib/server-auth'

const prisma = new PrismaClient()

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const auth = getAuthenticatedUser(req)
    if (!auth) return NextResponse.json({ success: false, message: 'غير مصرح' }, { status: 401 })
    const existing = await prisma.booking.findUnique({ where: { id }, include: { provider: true } })
    if (!existing || (auth.role !== 'ADMIN' && existing.customerId !== auth.userId && existing.provider.profileId !== auth.userId)) return NextResponse.json({ success: false, message: 'غير مصرح بتعديل هذا الحجز' }, { status: 403 })
    const body = await req.json()
    const { status } = body

    const booking = await prisma.booking.update({
      where: { id: id },
      data: { status },
      include: {
        customer: { select: { id: true, fullName: true } },
        provider: { include: { profile: { select: { id: true, fullName: true } } } },
        service: true,
      },
    })

    return NextResponse.json({
      success: true,
      message: 'تم تحديث حالة الحجز بنجاح',
      data: booking,
    })
  } catch (error) {
    console.error('Update booking error:', error)
    return NextResponse.json(
      { success: false, message: 'حدث خطأ أثناء تحديث الحجز' },
      { status: 500 }
    )
  }
}