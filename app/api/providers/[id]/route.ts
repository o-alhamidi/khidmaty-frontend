import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json()
    const { verificationStatus } = body

    const provider = await prisma.provider.update({
      where: { id: parseInt(params.id) },
      data: {
        verificationStatus,
        verified: verificationStatus === 'VERIFIED',
      },
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            email: true,
          },
        },
      },
    })

    return NextResponse.json({
      success: true,
      message: verificationStatus === 'VERIFIED' ? 'تم توثيق المزود بنجاح' : 'تم رفض طلب التوثيق',
      data: provider,
    })
  } catch (error) {
    console.error('Verify provider error:', error)
    return NextResponse.json(
      { success: false, message: 'حدث خطأ أثناء تحديث حالة المزود' },
      { status: 500 }
    )
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.provider.delete({
      where: { id: parseInt(params.id) },
    })

    return NextResponse.json({
      success: true,
      message: 'تم حذف المزود بنجاح',
    })
  } catch (error) {
    console.error('Delete provider error:', error)
    return NextResponse.json(
      { success: false, message: 'حدث خطأ أثناء حذف المزود' },
      { status: 500 }
    )
  }
}