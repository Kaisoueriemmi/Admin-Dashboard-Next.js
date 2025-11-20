# Admin Dashboard PRO - Next.js 14 SaaS Solution

A comprehensive, production-ready admin dashboard built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, **shadcn/ui**, and **Prisma ORM**. This is a complete SaaS-level solution with authentication, role-based access control, and full CRUD modules.

## ✨ Features

### 🔐 Authentication & Security
- Secure login/logout system
- JWT token-based authentication
- Role-based access control (ADMIN, MANAGER, USER)
- Protected API routes with middleware
- Password hashing with bcryptjs
- NextAuth.js integration ready

### 🎨 UI/UX Design
- Beautiful dark/light mode theme
- Responsive design (mobile, tablet, desktop)
- Tailwind CSS with custom colors
- shadcn/ui components
- Smooth animations with Framer Motion
- Lucide React icons
- Accessible forms with validation

### 📊 Dashboard Features
- Analytics dashboard with KPIs
- Real-time statistics
- Charts and visualizations (Recharts)
- User management (CRUD)
- Product management (CRUD)
- Order management
- Activity logging
- Settings panel

### 📦 Modules Included

#### Users Management
- Create, read, update, delete users
- Role assignment
- Status management
- Search and filtering
- Pagination

#### Products Management
- Full inventory management
- Product details (name, SKU, price, quantity)
- Category organization
- Image support
- Stock management
- Status tracking

#### Orders Management
- Create and manage orders
- Order tracking
- Customer information
- Order status updates
- Item-level details

#### Activity Logging
- Track all system activities
- User action history
- Detailed logs
- Timestamp tracking

### 🛠 Technical Stack
- **Frontend**: React 18 + Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Custom CSS
- **Components**: shadcn/ui
- **Forms**: React Hook Form + Zod
- **Database**: Prisma ORM with SQLite/PostgreSQL
- **Authentication**: NextAuth.js + JWT
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **API**: REST API with Next.js Route Handlers
- **Deployment**: Docker + Docker Compose

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Docker (optional)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd admin-dashboard-next-pro
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:
```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
JWT_SECRET="your-jwt-secret"
NEXT_PUBLIC_API_URL="http://localhost:3000"
```

4. **Setup database**
```bash
npx prisma db push
npx prisma db seed
```

5. **Run development server**
```bash
npm run dev
```

Visit `http://localhost:3000`

## 📝 Demo Credentials

**Admin Account:**
- Email: `admin@example.com`
- Password: `password123`

**Manager Account:**
- Email: `manager@example.com`
- Password: `password123`

**User Account:**
- Email: `user@example.com`
- Password: `password123`

## 📂 Project Structure

```
admin-dashboard-next-pro/
├── src/
│   ├── app/
│   │   ├── api/                 # API routes
│   │   │   ├── auth/           # Authentication endpoints
│   │   │   ├── users/          # Users CRUD
│   │   │   ├── products/       # Products CRUD
│   │   │   ├── orders/         # Orders CRUD
│   │   │   └── activity-logs/  # Activity logging
│   │   ├── dashboard/          # Dashboard pages
│   │   │   ├── page.tsx        # Main dashboard
│   │   │   ├── users/
│   │   │   ├── products/
│   │   │   ├── orders/
│   │   │   ├── activity-log/
│   │   │   ├── settings/
│   │   │   └── layout.tsx
│   │   ├── login/              # Login page
│   │   ├── register/           # Registration page
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Home page
│   │   └── globals.css         # Global styles
│   ├── components/
│   │   ├── ui/                 # shadcn/ui components
│   │   ├── layout/             # Layout components
│   │   │   ├── Sidebar.tsx
│   │   │   └── Navbar.tsx
│   │   └── forms/              # Form components
│   ├── lib/
│   │   ├── auth.ts             # Auth utilities
│   │   ├── permissions.ts      # Permission checks
│   │   ├── prisma.ts           # Prisma client
│   │   ├── middlewares.ts      # API middlewares
│   │   └── utils.ts            # Helper functions
│   ├── schemas/
│   │   └── validation.ts       # Zod validation schemas
│   ├── constants/
│   │   └── index.ts            # App constants
│   ├── types/
│   │   └── index.ts            # TypeScript types
│   └── middleware.ts           # Next.js middleware
├── prisma/
│   └── schema.prisma           # Database schema
├── public/                     # Static assets
├── Dockerfile                  # Docker configuration
├── docker-compose.yml          # Docker Compose
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
├── next.config.js
└── README.md
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout
- `GET /api/auth/profile` - Get user profile

### Users
- `GET /api/users` - List users (with pagination, search)
- `POST /api/users` - Create user
- `GET /api/users/[id]` - Get user by ID
- `PUT /api/users/[id]` - Update user
- `DELETE /api/users/[id]` - Delete user

### Products
- `GET /api/products` - List products (with pagination, filtering)
- `POST /api/products` - Create product
- `GET /api/products/[id]` - Get product by ID
- `PUT /api/products/[id]` - Update product
- `DELETE /api/products/[id]` - Delete product

### Orders
- `GET /api/orders` - List orders
- `POST /api/orders` - Create order
- `GET /api/orders/[id]` - Get order by ID
- `PUT /api/orders/[id]` - Update order status

### Activity Logs
- `GET /api/activity-logs` - Get activity logs
- `POST /api/activity-logs` - Create activity log

## 🔐 Role-Based Permissions

| Role | Permissions |
|------|-------------|
| **ADMIN** | Full access - read, write, delete, manage users, manage settings |
| **MANAGER** | Can manage products and orders, view analytics |
| **USER** | Read-only access to dashboard |

## 🎨 Customization

### Change Theme Colors
Edit `tailwind.config.ts`:
```typescript
colors: {
  primary: {
    50: '#f0f9ff',
    600: '#0284c7',
    // ... more colors
  }
}
```

### Modify Sidebar Items
Edit `src/components/layout/Sidebar.tsx`:
```typescript
const SIDEBAR_ITEMS = [
  // Add or remove items here
]
```

### Add New Pages
1. Create folder in `src/app/dashboard/[feature]`
2. Create `page.tsx`
3. Add to sidebar items

## 🚢 Deployment

### Docker Deployment
```bash
# Build image
docker build -t admin-dashboard-pro .

# Run container
docker run -p 3000:3000 admin-dashboard-pro
```

### Docker Compose
```bash
docker-compose up -d
```

### Vercel Deployment
```bash
npm install -g vercel
vercel
```

### Environment Variables for Production
- Change `NEXTAUTH_SECRET` to a strong random string
- Use PostgreSQL instead of SQLite
- Set proper `NEXTAUTH_URL` for production domain
- Enable CORS for your API domain

## 🧪 Testing

### Run TypeScript Check
```bash
npm run type-check
```

### Run Linter
```bash
npm run lint
```

## 📚 Database Schema

### Users Table
- id (UUID)
- email (string, unique)
- name (string)
- password (string, hashed)
- role (ADMIN, MANAGER, USER)
- status (ACTIVE, INACTIVE, SUSPENDED)
- avatar (string, optional)
- createdAt, updatedAt, deletedAt

### Products Table
- id (UUID)
- name (string)
- description (string, optional)
- sku (string, unique)
- price (number)
- quantity (int)
- category (string)
- image (string, optional)
- status (ACTIVE, INACTIVE)
- createdAt, updatedAt

### Orders Table
- id (UUID)
- orderNo (string, unique)
- userId (UUID)
- total (number)
- status (PENDING, CONFIRMED, SHIPPED, DELIVERED, CANCELLED)
- createdAt, updatedAt

### OrderItems Table
- id (UUID)
- orderId (UUID)
- productId (UUID)
- quantity (int)
- price (number)

### ActivityLogs Table
- id (UUID)
- userId (UUID)
- action (string)
- entity (string)
- entityId (string, optional)
- details (string, optional)
- createdAt

## 🐛 Troubleshooting

### Database Issues
```bash
# Reset database
npx prisma migrate reset

# Regenerate Prisma client
npx prisma generate
```

### Port Already in Use
```bash
# Change port in package.json dev script
# Or kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### Styling Issues
```bash
# Rebuild Tailwind
npm run build
```

## 📖 Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [TypeScript](https://www.typescriptlang.org/docs)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Support

For support, email support@example.com or create an issue in the repository.

## 🚀 Performance Tips

- Enable compression in production
- Use CDN for static assets
- Implement caching strategies
- Optimize images
- Use database indexes on frequently queried fields
- Implement pagination for large datasets

## 🔄 Updates & Maintenance

- Keep Next.js updated
- Update dependencies regularly
- Monitor security advisories
- Backup database regularly
- Monitor performance metrics

---

**Made with ❤️ by Your Team**
