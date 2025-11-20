import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { productSchema } from '@/schemas/validation'
import { PAGINATION } from '@/constants'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || String(PAGINATION.DEFAULT_LIMIT))
    const search = searchParams.get('search') || ''
    const category = searchParams.get('category')

    const skip = (page - 1) * limit
    const where: any = {}

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { description: { contains: search } },
      ]
    }

    if (category) where.category = category

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.product.count({ where }),
    ])

    return NextResponse.json({
      success: true,
      data: products,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validated = productSchema.parse(body)

    const product = await prisma.product.create({
      data: validated,
    })

    return NextResponse.json({
      success: true,
      data: product,
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to create product' },
      { status: 400 }
    )
  }
}
