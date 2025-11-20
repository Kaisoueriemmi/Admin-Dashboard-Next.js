import jwt from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'
import { AuthUser } from '@/types'

const JWT_SECRET = process.env.JWT_SECRET || 'default-secret-key'

export const generateToken = (user: { id: string; email: string; role: string }): string => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: '24h' }
  )
}

export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (error) {
    return null
  }
}

export const hashPassword = async (password: string): Promise<string> => {
  return bcryptjs.hash(password, 10)
}

export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcryptjs.compare(password, hashedPassword)
}

export const getTokenFromRequest = (request: Request): string | null => {
  const authHeader = request.headers.get('Authorization')
  if (!authHeader) return null
  
  const parts = authHeader.split(' ')
  if (parts.length !== 2 || parts[0] !== 'Bearer') return null
  
  return parts[1]
}
