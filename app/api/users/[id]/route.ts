import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getAuthenticatedUser, isAdmin } from '@/lib/server-auth'

const prisma = new PrismaClient()

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const authenticatedUser = getAuthenticatedUser(req)
    if (!authenticatedUser || (authenticatedUser.userId !== id && !isAdmin(req))) {
      return NextResponse.json({ success: false, message: 'غير مصرح' }, { status: 403 })
    }
    const body = await req.json()
    const { status, fullName, phone } = body
    const data = isAdmin(req) ? { status, fullName, phone } : { fullName, phone }

    const user = await prisma.profile.update({
      where: { id: id },
      data,
      select: {
        id: true,
        fullName: true,
        email: true,
        status: true,
        phone: true,
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
    if (!isAdmin(req)) return NextResponse.json({ success: false, message: 'غير مصرح' }, { status: 403 })
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