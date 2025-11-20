import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { userSchema } from '@/schemas/validation'
import { PAGINATION } from '@/constants'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || String(PAGINATION.DEFAULT_LIMIT))
    const search = searchParams.get('search') || ''
    const role = searchParams.get('role')
    const status = searchParams.get('status')

    const skip = (page - 1) * limit
    const where: any = {}

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { email: { contains: search } },
      ]
    }

    if (role) where.role = role
    if (status) where.status = status

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: limit,
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          status: true,
          createdAt: true,
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.user.count({ where }),
    ])

    return NextResponse.json({
      success: true,
      data: users,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to fetch users' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validated = userSchema.parse(body)

    const user = await prisma.user.create({
      data: {
        ...validated,
        password: 'default-password', // Should be hashed in production
      },
    })

    return NextResponse.json({
      success: true,
      data: user,
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to create user' },
      { status: 400 }
    )
  }
}
