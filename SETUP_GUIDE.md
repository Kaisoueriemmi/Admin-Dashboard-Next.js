# 🚀 Admin Dashboard PRO - Complete Setup Guide

## Prerequisites

Before starting, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org)
- **npm** or **yarn** package manager
- **Git** (optional, for cloning)
- **Docker & Docker Compose** (optional, for containerized deployment)

Check your installations:
```bash
node --version
npm --version
```

## Step 1: Project Setup

### Option A: Clone from Repository
```bash
git clone <your-repo-url>
cd admin-dashboard-next-pro
```

### Option B: Manual Setup
The project structure is already set up in this workspace.

## Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages:
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Prisma ORM
- Zod validation
- React Hook Form
- NextAuth.js
- And more...

**Installation time**: ~3-5 minutes depending on internet speed

## Step 3: Environment Configuration

### Create Environment File
```bash
cp .env.example .env.local
```

### Edit `.env.local`
Update the following values:

```env
# Database Configuration
DATABASE_URL="file:./dev.db"              # SQLite (development)
# DATABASE_URL="postgresql://user:password@localhost:5432/admin_db"  # PostgreSQL (production)

# Authentication
NEXTAUTH_SECRET="your-super-secret-key-change-this"
NEXTAUTH_URL="http://localhost:3000"

# JWT
JWT_SECRET="your-jwt-secret-key-change-this"

# API
NEXT_PUBLIC_API_URL="http://localhost:3000"

# Features
NEXT_PUBLIC_ENABLE_DARK_MODE=true
NEXT_PUBLIC_ENABLE_NOTIFICATIONS=true
```

**For production**, make sure to:
- Generate strong random secrets using: `openssl rand -base64 32`
- Update NEXTAUTH_URL to your production domain
- Switch to PostgreSQL for better scalability

## Step 4: Database Setup

### Initialize Database
```bash
# Create database and run migrations
npx prisma db push

# Optional: Open Prisma Studio to view data
npx prisma studio
```

### Seed Demo Data
The database will be automatically seeded with demo users and products.

Demo Users:
- **Admin**: admin@example.com / password123
- **Manager**: manager@example.com / password123
- **User**: user@example.com / password123

## Step 5: Build and Run

### Development Mode
```bash
npm run dev
```

The application will be available at: **http://localhost:3000**

### Production Build
```bash
# Build the project
npm run build

# Start production server
npm start
```

## Step 6: Access the Application

1. **Home Page**: http://localhost:3000
2. **Login Page**: http://localhost:3000/login
3. **Dashboard**: http://localhost:3000/dashboard

### First Time Login
Use these credentials to test:
- Email: `admin@example.com`
- Password: `password123`

## Docker Deployment (Optional)

### Using Docker Compose (Recommended)
```bash
# Start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Using Docker Manually
```bash
# Build image
docker build -t admin-dashboard-pro .

# Run container
docker run -p 3000:3000 \
  -e DATABASE_URL="file:./dev.db" \
  -e NEXTAUTH_SECRET="your-secret" \
  admin-dashboard-pro
```

## Troubleshooting

### Issue: Port 3000 Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 npm run dev
```

### Issue: Database Connection Error
```bash
# Reset database
npx prisma migrate reset

# Regenerate Prisma client
npx prisma generate
```

### Issue: Module Not Found
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue: TypeScript Errors
```bash
# Type check
npm run type-check

# Fix ESLint issues
npm run lint
```

## Verification Checklist

After setup, verify everything is working:

- [ ] Dependencies installed successfully
- [ ] `.env.local` file created and configured
- [ ] Database initialized
- [ ] `npm run dev` starts without errors
- [ ] Browser shows home page at http://localhost:3000
- [ ] Can login with demo credentials
- [ ] Dashboard loads correctly
- [ ] Dark/light mode toggle works
- [ ] All sidebar links working
- [ ] Forms validation working

## Project Structure Overview

```
src/
├── app/                          # Next.js App Router
│   ├── dashboard/               # Dashboard pages
│   ├── api/                     # API routes
│   ├── login/                   # Login page
│   ├── register/                # Registration page
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Home page
├── components/
│   ├── ui/                      # shadcn/ui components
│   └── layout/                  # Layout components
├── lib/                         # Utilities and helpers
├── schemas/                     # Validation schemas
├── types/                       # TypeScript types
└── constants/                   # App constants
```

## Key Commands

```bash
# Development
npm run dev                 # Start dev server

# Building
npm run build              # Build for production
npm run type-check         # Check TypeScript
npm run lint               # Run ESLint

# Database
npx prisma db push        # Apply migrations
npx prisma studio         # Open Prisma Studio
npx prisma generate       # Regenerate Prisma client
npx prisma migrate reset  # Reset database
```

## Next Steps

### Customization
1. Update colors in `tailwind.config.ts`
2. Modify sidebar items in `src/components/layout/Sidebar.tsx`
3. Add new modules in `src/app/dashboard/`

### Features to Implement
- [ ] Real charts with Recharts
- [ ] Image upload integration
- [ ] Email notifications
- [ ] Advanced search filters
- [ ] User role permissions
- [ ] Audit logging
- [ ] Export to CSV/PDF

### Security Improvements
- [ ] Enable HTTPS in production
- [ ] Setup CORS properly
- [ ] Add rate limiting
- [ ] Implement 2FA
- [ ] Setup bot protection
- [ ] Add input sanitization

### Performance Optimization
- [ ] Implement caching
- [ ] Optimize images
- [ ] Code splitting
- [ ] Database indexing
- [ ] CDN integration

## Production Deployment

### Vercel (Recommended for Next.js)
```bash
npm i -g vercel
vercel
```

### AWS
- Use AWS Amplify or Elastic Beanstalk
- Setup RDS for database
- Configure S3 for file storage

### Azure
- Use Azure App Service
- Configure Azure SQL Database
- Setup Azure Storage

### DigitalOcean / Linode
- Create droplet
- Install Node.js
- Deploy using PM2 or Docker

## Support & Documentation

- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript](https://www.typescriptlang.org/docs)
- [shadcn/ui](https://ui.shadcn.com)

## Common Issues & Solutions

### ESM/CJS Compatibility Issues
Add to `package.json`:
```json
"type": "module"
```

### Memory Issues During Build
```bash
# Increase Node memory
NODE_OPTIONS=--max-old-space-size=4096 npm run build
```

### Database Lock Issues
```bash
# Reset database completely
npx prisma migrate reset --force
```

## Performance Monitoring

Monitor your application:

1. **Development**: Built-in Next.js analytics
2. **Production**: 
   - Use Vercel Analytics
   - Setup Sentry for error tracking
   - Use New Relic or Datadog

## Backup & Recovery

### Backup Database
```bash
# SQLite
cp dev.db dev.db.backup

# PostgreSQL
pg_dump database_name > backup.sql
```

### Restore Database
```bash
# SQLite
cp dev.db.backup dev.db

# PostgreSQL
psql database_name < backup.sql
```

## Updates & Maintenance

Keep your project updated:

```bash
# Check for outdated packages
npm outdated

# Update dependencies
npm update

# Major version updates
npm outdated --long
# Then manually update package.json and run npm install
```

---

**Setup Complete!** 🎉

You now have a fully functional, production-ready admin dashboard. Happy coding!

For questions or issues, please refer to the main README.md or create an issue in the repository.
