import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const search = searchParams.get('search') || ''
    const status = searchParams.get('status') || ''
    const specialization = searchParams.get('specialization') || ''

    const where: any = {}

    if (search) {
      where.OR = [
        { user: { fullName: { contains: search, mode: 'insensitive' } } },
        { user: { email: { contains: search, mode: 'insensitive' } } },
        { specialization: { contains: search, mode: 'insensitive' } },
      ]
    }

    if (status) where.verificationStatus = status
    if (specialization) where.specialization = specialization

    const providers = await prisma.provider.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            email: true,
            phone: true,
            status: true,
            createdAt: true,
          },
        },
        categories: true,
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({
      success: true,
      data: providers,
    })
  } catch (error) {
    console.error('Get providers error:', error)
    return NextResponse.json(
      { success: false, message: 'حدث خطأ أثناء جلب مزودي الخدمة' },
      { status: 500 }
    )
  }
}