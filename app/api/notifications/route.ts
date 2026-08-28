import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// GET all notifications
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get('userId')
    const filter = searchParams.get('filter') || 'all'

    const where: any = {}
    if (userId) where.userId = parseInt(userId)
    if (filter === 'unread') where.read = false
    if (filter === 'read') where.read = true

    const notifications = await prisma.notification.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({
      success: true,
      data: notifications,
    })
  } catch (error) {
    console.error('Get notifications error:', error)
    return NextResponse.json(
      { success: false, message: 'حدث خطأ أثناء جلب الإشعارات' },
      { status: 500 }
    )
  }
}

// POST create notification
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { userId, type, title, message, severity } = body

    const notification = await prisma.notification.create({
      data: {
        userId: userId ? parseInt(userId) : null,
        type,
        title,
        message,
        severity: severity || 'INFO',
        read: false,
      },
    })

    return NextResponse.json({
      success: true,
      message: 'تم إنشاء الإشعار بنجاح',
      data: notification,
    })
  } catch (error) {
    console.error('Create notification error:', error)
    return NextResponse.json(
      { success: false, message: 'حدث خطأ أثناء إنشاء الإشعار' },
      { status: 500 }
    )
  }
}