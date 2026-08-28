import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const body = await req.json()
    const { status } = body

    const user = await prisma.profile.update({
      where: { id: id },
      data: { status },
      select: {
        id: true,
        fullName: true,
        email: true,
        status: true,
      },
    })

    return NextResponse.json({
      success: true,
      message: 'تم تحديث حالة المستخدم بنجاح',
      data: user,
    })
  } catch (error) {
    console.error('Update user error:', error)
    return NextResponse.json(
      { success: false, message: 'حدث خطأ أثناء تحديث المستخدم' },
      { status: 500 }
    )
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    await prisma.profile.delete({
      where: { id: id },
    })

    return NextResponse.json({
      success: true,
      message: 'تم حذف المستخدم بنجاح',
    })
  } catch (error) {
    console.error('Delete user error:', error)
    return NextResponse.json(
      { success: false, message: 'حدث خطأ أثناء حذف المستخدم' },
      { status: 500 }
    )
  }
}