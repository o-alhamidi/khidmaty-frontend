import jwt from 'jsonwebtoken'
import { NextRequest } from 'next/server'

export type AuthenticatedUser = {
  userId: string
  email: string
  role: 'CUSTOMER' | 'PROVIDER' | 'ADMIN'
}

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export function getAuthenticatedUser(req: NextRequest): AuthenticatedUser | null {
  const header = req.headers.get('authorization')
  if (!header?.startsWith('Bearer ')) return null

  try {
    return jwt.verify(header.slice(7), JWT_SECRET) as AuthenticatedUser
  } catch {
    return null
  }
}

export function isAdmin(req: NextRequest) {
  return getAuthenticatedUser(req)?.role === 'ADMIN'
}
