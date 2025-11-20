const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log(' Seeding database...');

  // Clear existing data
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.activityLog.deleteMany();
  await prisma.user.deleteMany();

  // Create demo users
  const admin = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      name: 'Admin User',
      password: '\\\',
      role: 'ADMIN',
      status: 'ACTIVE',
    },
  });

  const manager = await prisma.user.create({
    data: {
      email: 'manager@example.com',
      name: 'Manager User',
      password: '\\\',
      role: 'MANAGER',
      status: 'ACTIVE',
    },
  });

  const user = await prisma.user.create({
    data: {
      email: 'user@example.com',
      name: 'Regular User',
      password: '\\\',
      role: 'USER',
      status: 'ACTIVE',
    },
  });

  // Create demo products
  const products = await Promise.all([
    prisma.product.create({
      data: {
        name: 'Laptop Pro',
        description: 'High-performance laptop for professionals',
        sku: 'LP-001',
        price: 1299.99,
        quantity: 45,
        category: 'Electronics',
        status: 'ACTIVE',
      },
    }),
    prisma.product.create({
      data: {
        name: 'Wireless Mouse',
        description: 'Ergonomic wireless mouse',
        sku: 'WM-001',
        price: 29.99,
        quantity: 150,
        category: 'Accessories',
        status: 'ACTIVE',
      },
    }),
    prisma.product.create({
      data: {
        name: 'USB-C Hub',
        description: '7-in-1 USB-C hub with power delivery',
        sku: 'UC-001',
        price: 49.99,
        quantity: 80,
        category: 'Accessories',
        status: 'ACTIVE',
      },
    }),
    prisma.product.create({
      data: {
        name: 'Mechanical Keyboard',
        description: 'RGB mechanical keyboard',
        sku: 'MK-001',
        price: 129.99,
        quantity: 60,
        category: 'Accessories',
        status: 'ACTIVE',
      },
    }),
  ]);

  // Create demo orders
  await prisma.order.create({
    data: {
      orderNo: 'ORD-001',
      userId: admin.id,
      total: 1359.97,
      status: 'DELIVERED',
      items: {
        create: [
          {
            productId: products[0].id,
            quantity: 1,
            price: 1299.99,
          },
          {
            productId: products[1].id,
            quantity: 2,
            price: 29.99,
          },
        ],
      },
    },
  });

  await prisma.order.create({
    data: {
      orderNo: 'ORD-002',
      userId: manager.id,
      total: 179.97,
      status: 'SHIPPED',
      items: {
        create: [
          {
            productId: products[2].id,
            quantity: 2,
            price: 49.99,
          },
          {
            productId: products[3].id,
            quantity: 1,
            price: 129.99,
          },
        ],
      },
    },
  });

  // Create activity logs
  await prisma.activityLog.create({
    data: {
      userId: admin.id,
      action: 'LOGIN',
      entity: 'USER',
      details: 'Admin logged in',
    },
  });

  console.log(' Database seeded successfully!');
  console.log(' Created:');
  console.log('   - 3 demo users');
  console.log('   - 4 demo products');
  console.log('   - 2 demo orders');
  console.log('   - 1 activity log entry');
}

main()
  .catch((e) => {
    console.error(' Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.\();
  });
