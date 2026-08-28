import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json()
    const { status } = body

    const booking = await prisma.booking.update({
      where: { id: params.id },
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