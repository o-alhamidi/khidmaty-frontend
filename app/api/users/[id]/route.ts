import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json()
    const { status } = body

    const user = await prisma.user.update({
      where: { id: parseInt(params.id) },
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

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.user.delete({
      where: { id: parseInt(params.id) },
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