import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// GET all bookings
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const customerId = searchParams.get('customerId')
    const providerId = searchParams.get('providerId')
    const status = searchParams.get('status')

    const where: any = {}
    if (customerId) where.customerId = parseInt(customerId)
    if (providerId) where.providerId = parseInt(providerId)
    if (status) where.status = status

    const bookings = await prisma.booking.findMany({
      where,
      include: {
        customer: {
          select: { id: true, fullName: true, email: true, phone: true },
        },
        provider: {
          include: {
            user: {
              select: { id: true, fullName: true, email: true, phone: true },
            },
          },
        },
        service: true,
        review: true,
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({
      success: true,
      data: bookings,
    })
  } catch (error) {
    console.error('Get bookings error:', error)
    return NextResponse.json(
      { success: false, message: 'حدث خطأ أثناء جلب الحجوزات' },
      { status: 500 }
    )
  }
}

// POST create booking
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { customerId, providerId, serviceId, date, time, address, notes } = body

    if (!customerId || !providerId || !serviceId || !date || !time || !address) {
      return NextResponse.json(
        { success: false, message: 'جميع الحقول المطلوبة يجب ملؤها' },
        { status: 400 }
      )
    }

    // Get service price
    const service = await prisma.service.findUnique({
      where: { id: parseInt(serviceId) },
    })

    if (!service) {
      return NextResponse.json(
        { success: false, message: 'الخدمة غير موجودة' },
        { status: 404 }
      )
    }

    const basePrice = service.price || service.duration * 2500
    const tax = Math.round(basePrice * 0.15)
    const totalPrice = basePrice + tax

    const booking = await prisma.booking.create({
      data: {
        customerId: parseInt(customerId),
        providerId: parseInt(providerId),
        serviceId: parseInt(serviceId),
        date: new Date(date),
        time,
        address,
        notes: notes || '',
        basePrice,
        tax,
        totalPrice,
        status: 'PENDING',
      },
      include: {
        customer: {
          select: { id: true, fullName: true, email: true },
        },
        provider: {
          include: {
            user: {
              select: { id: true, fullName: true, email: true },
            },
          },
        },
        service: true,
      },
    })

    return NextResponse.json({
      success: true,
      message: 'تم إنشاء الحجز بنجاح',
      data: booking,
    })
  } catch (error) {
    console.error('Create booking error:', error)
    return NextResponse.json(
      { success: false, message: 'حدث خطأ أثناء إنشاء الحجز' },
      { status: 500 }
    )
  }
}