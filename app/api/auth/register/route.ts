import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { fullName, email, phone, password, role, specialization, location, experience, certifications } = body

    // Validation
    if (!fullName || !email || !phone || !password) {
      return NextResponse.json(
        { success: false, message: 'جميع الحقول المطلوبة يجب ملؤها' },
        { status: 400 }
      )
    }

    // Check if email exists
    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'البريد الإلكتروني مستخدم بالفعل' },
        { status: 409 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const userData: any = {
      fullName,
      email,
      phone,
      password: hashedPassword,
      role: role || 'CUSTOMER',
    }

    // If provider, create provider profile
    if (role === 'PROVIDER') {
      if (!specialization || !location || !experience) {
        return NextResponse.json(
          { success: false, message: 'معلومات المزود مطلوبة' },
          { status: 400 }
        )
      }
      userData.provider = {
        create: {
          specialization,
          location,
          experience,
          certifications: certifications || '',
          verificationStatus: 'PENDING',
        },
      }
    }

    const user = await prisma.user.create({
      data: userData,
      include: { provider: true },
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
      message: 'تم إنشاء الحساب بنجاح',
      data: {
        user: userWithoutPassword,
        token,
      },
    })
  } catch (error) {
    console.error('Register error:', error)
    return NextResponse.json(
      { success: false, message: 'حدث خطأ أثناء إنشاء الحساب' },
      { status: 500 }
    )
  }
}