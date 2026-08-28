import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// PATCH mark as read
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const notification = await prisma.notification.update({
      where: { id: params.id },
      data: { read: true },
    })

    return NextResponse.json({
      success: true,
      message: 'تم تحديد الإشعار كمقروء',
      data: notification,
    })
  } catch (error) {
    console.error('Update notification error:', error)
    return NextResponse.json(
      { success: false, message: 'حدث خطأ' },
      { status: 500 }
    )
  }
}

// DELETE notification
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.notification.delete({
      where: { id: params.id },
    })

    return NextResponse.json({
      success: true,
      message: 'تم حذف الإشعار بنجاح',
    })
  } catch (error) {
    console.error('Delete notification error:', error)
    return NextResponse.json(
      { success: false, message: 'حدث خطأ أثناء حذف الإشعار' },
      { status: 500 }
    )
  }
}

// POST mark all as read
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { userId } = body

    const where: any = { read: false }
    if (userId) where.userId = userId

    await prisma.notification.updateMany({
      where,
      data: { read: true },
    })

    return NextResponse.json({
      success: true,
      message: 'تم تحديد جميع الإشعارات كمقروءة',
    })
  } catch (error) {
    console.error('Mark all read error:', error)
    return NextResponse.json(
      { success: false, message: 'حدث خطأ' },
      { status: 500 }
    )
  }
}