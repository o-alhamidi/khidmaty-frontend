import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(req: NextRequest) {
  try {
    // Get counts
    const totalUsers = await prisma.profile.count()
    const totalCustomers = await prisma.profile.count({ where: { role: 'CUSTOMER' } })
    const totalProviders = await prisma.provider.count()
    const totalBookings = await prisma.booking.count()
    const pendingBookings = await prisma.booking.count({ where: { status: 'PENDING' } })
    const completedBookings = await prisma.booking.count({ where: { status: 'COMPLETED' } })
    const totalRevenue = await prisma.booking.aggregate({
      where: { status: 'COMPLETED' },
      _sum: { totalPrice: true },
    })
    const pendingVerifications = await prisma.provider.count({ where: { status: 'PENDING' } })

    // Get monthly revenue
    const now = new Date()
    const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1)

    const monthlyRevenue = await prisma.booking.groupBy({
      by: ['createdAt'],
      where: {
        status: 'COMPLETED',
        createdAt: { gte: sixMonthsAgo },
      },
      _sum: { totalPrice: true },
    })

    // Get bookings by status
    const bookingsByStatus = await prisma.booking.groupBy({
      by: ['status'],
      _count: { id: true },
    })

    // Get top providers
    const topProviders = await prisma.provider.findMany({
      take: 5,
      orderBy: { earnings: 'desc' },
      include: {
        profile: {
          select: { fullName: true, email: true },
        },
      },
    })

    // Get category distribution
    const categoryDistribution = await prisma.category.findMany({
      include: {
        _count: { select: { services: true } },
      },
    })

    return NextResponse.json({
      success: true,
      data: {
        overview: {
          totalUsers,
          totalCustomers,
          totalProviders,
          totalBookings,
          pendingBookings,
          completedBookings,
          totalRevenue: totalRevenue._sum.totalPrice || 0,
          pendingVerifications,
        },
        monthlyRevenue,
        bookingsByStatus,
        topProviders,
        categoryDistribution,
      },
    })
  } catch (error) {
    console.error('Analytics error:', error)
    return NextResponse.json(
      { success: false, message: 'حدث خطأ أثناء جلب التحليلات' },
      { status: 500 }
    )
  }
}