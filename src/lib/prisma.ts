import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient()
}

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

export const prisma = globalThis.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma

// Initialize database with demo users
export async function initializeDemoData() {
  try {
    const userCount = await prisma.user.count()

    if (userCount > 0) {
      return // Data already exists
    }

    // Create demo users
    await prisma.user.createMany({
      data: [
        {
          email: 'admin@example.com',
          name: 'Admin User',
          password: '$2a$10$demo', // password123 hashed
          role: 'ADMIN',
          status: 'ACTIVE',
        },
        {
          email: 'manager@example.com',
          name: 'Manager User',
          password: '$2a$10$demo',
          role: 'MANAGER',
          status: 'ACTIVE',
        },
        {
          email: 'user@example.com',
          name: 'Regular User',
          password: '$2a$10$demo',
          role: 'USER',
          status: 'ACTIVE',
        },
      ],
    })

    // Create demo products
    await prisma.product.createMany({
      data: [
        {
          name: 'Laptop Pro',
          description: 'High-performance laptop',
          sku: 'LP-001',
          price: 1299.99,
          quantity: 50,
          category: 'Electronics',
          status: 'ACTIVE',
        },
        {
          name: 'Wireless Mouse',
          description: 'Ergonomic wireless mouse',
          sku: 'WM-001',
          price: 49.99,
          quantity: 200,
          category: 'Accessories',
          status: 'ACTIVE',
        },
        {
          name: 'USB-C Cable',
          description: 'Fast charging cable',
          sku: 'UC-001',
          price: 19.99,
          quantity: 500,
          category: 'Accessories',
          status: 'ACTIVE',
        },
      ],
    })

    console.log('Demo data initialized')
  } catch (error) {
    console.error('Failed to initialize demo data:', error)
  }
}
