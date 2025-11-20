import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { PAGINATION } from '@/constants'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || String(PAGINATION.DEFAULT_LIMIT))
    const status = searchParams.get('status')

    const skip = (page - 1) * limit
    const where: any = {}

    if (status) where.status = status

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        skip,
        take: limit,
        include: {
          items: {
            include: {
              product: true,
            },
          },
          user: {
            select: {
              name: true,
              email: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.order.count({ where }),
    ])

    return NextResponse.json({
      success: true,
      data: orders,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to fetch orders' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { userId, items } = body

    // Calculate total
    const products = await prisma.product.findMany({
      where: {
        id: { in: items.map((item: any) => item.productId) },
      },
    })

    let total = 0
    const orderItems = items.map((item: any) => {
      const product = products.find((p) => p.id === item.productId)
      const itemTotal = product ? product.price * item.quantity : 0
      total += itemTotal
      return {
        ...item,
        price: product?.price || 0,
      }
    })

    const order = await prisma.order.create({
      data: {
        orderNo: `ORD-${Date.now()}`,
        userId,
        total,
        items: {
          create: orderItems,
        },
      },
      include: {
        items: true,
      },
    })

    return NextResponse.json({
      success: true,
      data: order,
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to create order' },
      { status: 400 }
    )
  }
}
