import { Role, ROLE_PERMISSIONS } from '@/constants'

export const hasPermission = (role: Role, permission: string): boolean => {
  const permissions = ROLE_PERMISSIONS[role] || []
  return permissions.includes(permission)
}

export const canAccessRoute = (role: Role, requiredRole: Role): boolean => {
  const roleHierarchy: Record<Role, number> = {
    ADMIN: 3,
    MANAGER: 2,
    USER: 1,
  }
  
  return roleHierarchy[role] >= roleHierarchy[requiredRole]
}

export const requireRole = (allowedRoles: Role[]) => {
  return (userRole: Role): boolean => {
    return allowedRoles.includes(userRole)
  }
}
