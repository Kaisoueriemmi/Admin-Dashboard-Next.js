import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { PAGINATION } from '@/constants'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || String(PAGINATION.DEFAULT_LIMIT))
    const userId = searchParams.get('userId')

    const skip = (page - 1) * limit
    const where: any = {}

    if (userId) where.userId = userId

    const [logs, total] = await Promise.all([
      prisma.activityLog.findMany({
        where,
        skip,
        take: limit,
        include: {
          user: {
            select: {
              name: true,
              email: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.activityLog.count({ where }),
    ])

    return NextResponse.json({
      success: true,
      data: logs,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to fetch activity logs' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const log = await prisma.activityLog.create({
      data: body,
    })

    return NextResponse.json({
      success: true,
      data: log,
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to create activity log' },
      { status: 400 }
    )
  }
}
