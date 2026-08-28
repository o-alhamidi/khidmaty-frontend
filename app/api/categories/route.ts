import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// GET all categories
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const search = searchParams.get('search') || ''
    const status = searchParams.get('status') || ''

    const where: any = {}
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ]
    }
    if (status) where.status = status

    const categories = await prisma.category.findMany({
      where,
      include: {
        _count: {
          select: { services: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({
      success: true,
      data: categories,
    })
  } catch (error) {
    console.error('Get categories error:', error)
    return NextResponse.json(
      { success: false, message: 'حدث خطأ أثناء جلب التصنيفات' },
      { status: 500 }
    )
  }
}

// POST create category
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, slug, description, icon, color, featured } = body

    if (!name || !slug) {
      return NextResponse.json(
        { success: false, message: 'الاسم والمعرف مطلوبان' },
        { status: 400 }
      )
    }

    const category = await prisma.category.create({
      data: {
        name,
        slug,
        description,
        icon,
        color,
        featured: featured || false,
      },
    })

    return NextResponse.json({
      success: true,
      message: 'تم إنشاء التصنيف بنجاح',
      data: category,
    })
  } catch (error) {
    console.error('Create category error:', error)
    return NextResponse.json(
      { success: false, message: 'حدث خطأ أثناء إنشاء التصنيف' },
      { status: 500 }
    )
  }
}