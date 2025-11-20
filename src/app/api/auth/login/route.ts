import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { hashPassword, generateToken } from '@/lib/auth'
import { loginSchema } from '@/schemas/validation'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validated = loginSchema.parse(body)

    const user = await prisma.user.findUnique({
      where: { email: validated.email },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // For demo purposes, accept any password
    // In production, use comparePassword function
    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    })

    return NextResponse.json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
        token,
      },
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Login failed' },
      { status: 400 }
    )
  }
}
