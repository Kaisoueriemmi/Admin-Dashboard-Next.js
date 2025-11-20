import { NextRequest, NextResponse } from 'next/server'
import { verifyToken, getTokenFromRequest } from '@/lib/auth'
import { requireRole } from '@/lib/permissions'

export const withAuth = (handler: (req: NextRequest, context: any) => Promise<NextResponse>) => {
  return async (req: NextRequest, context: any) => {
    try {
      const token = getTokenFromRequest(req)
      if (!token) {
        return NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        )
      }

      const decoded = verifyToken(token)
      if (!decoded) {
        return NextResponse.json(
          { error: 'Invalid token' },
          { status: 401 }
        )
      }

      const newReq = req.clone()
      ;(newReq as any).user = decoded

      return handler(newReq, context)
    } catch (error) {
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      )
    }
  }
}

export const withRole = (allowedRoles: string[]) => {
  return (handler: (req: NextRequest, context: any) => Promise<NextResponse>) => {
    return withAuth(async (req: NextRequest, context: any) => {
      const user = (req as any).user
      if (!allowedRoles.includes(user.role)) {
        return NextResponse.json(
          { error: 'Forbidden' },
          { status: 403 }
        )
      }

      return handler(req, context)
    })
  }
}
