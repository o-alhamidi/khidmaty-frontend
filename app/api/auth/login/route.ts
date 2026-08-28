import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, password } = body

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'البريد الإلكتروني وكلمة المرور مطلوبان' },
        { status: 400 }
      )
    }

    // Find user
    const user = await prisma.profile.findUnique({
      where: { email },
      include: { provider: true },
    })

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' },
        { status: 401 }
      )
    }

    // Check password
    const isValid = !!user.password && await bcrypt.compare(password, user.password)
    if (!isValid) {
      return NextResponse.json(
        { success: false, message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' },
        { status: 401 }
      )
    }

    // Check user status
    if (user.status === 'SUSPENDED') {
      return NextResponse.json(
        { success: false, message: 'تم إيقاف حسابك. يرجى التواصل مع الدعم' },
        { status: 403 }
      )
    }

    // Update last active
    await prisma.profile.update({
      where: { id: user.id },
      data: { lastActive: new Date() },
    })

    // Generate token
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    )

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json({
      success: true,
      message: 'تم تسجيل الدخول بنجاح',
      data: {
        user: userWithoutPassword,
        token,
      },
    })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { success: false, message: 'حدث خطأ أثناء تسجيل الدخول' },
      { status: 500 }
    )
  }
}