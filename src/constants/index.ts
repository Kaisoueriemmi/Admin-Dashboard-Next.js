import { Role } from '@/types'

export const ROLES = {
  ADMIN: 'ADMIN',
  MANAGER: 'MANAGER',
  USER: 'USER',
}

export const ROLE_PERMISSIONS: Record<Role, string[]> = {
  ADMIN: ['read', 'write', 'delete', 'manage-users', 'manage-settings'],
  MANAGER: ['read', 'write', 'manage-products', 'manage-orders'],
  USER: ['read'],
}

export const ROLE_LABELS: Record<Role, string> = {
  ADMIN: 'Administrateur',
  MANAGER: 'Gestionnaire',
  USER: 'Utilisateur',
}

export const STATUS_LABELS: Record<string, string> = {
  ACTIVE: 'Actif',
  INACTIVE: 'Inactif',
  SUSPENDED: 'Suspendu',
}

export const ORDER_STATUS_LABELS: Record<string, string> = {
  PENDING: 'En attente',
  CONFIRMED: 'Confirmé',
  SHIPPED: 'Expédié',
  DELIVERED: 'Livré',
  CANCELLED: 'Annulé',
}

export const STATUS_COLORS: Record<string, string> = {
  ACTIVE: 'bg-green-100 text-green-800',
  INACTIVE: 'bg-gray-100 text-gray-800',
  SUSPENDED: 'bg-red-100 text-red-800',
  PENDING: 'bg-yellow-100 text-yellow-800',
  CONFIRMED: 'bg-blue-100 text-blue-800',
  SHIPPED: 'bg-purple-100 text-purple-800',
  DELIVERED: 'bg-green-100 text-green-800',
  CANCELLED: 'bg-red-100 text-red-800',
}

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
}

export const API_ROUTES = {
  AUTH: {
    LOGIN: '/api/auth/login',
    LOGOUT: '/api/auth/logout',
    REGISTER: '/api/auth/register',
    PROFILE: '/api/auth/profile',
  },
  USERS: {
    LIST: '/api/users',
    CREATE: '/api/users',
    GET: (id: string) => `/api/users/${id}`,
    UPDATE: (id: string) => `/api/users/${id}`,
    DELETE: (id: string) => `/api/users/${id}`,
  },
  PRODUCTS: {
    LIST: '/api/products',
    CREATE: '/api/products',
    GET: (id: string) => `/api/products/${id}`,
    UPDATE: (id: string) => `/api/products/${id}`,
    DELETE: (id: string) => `/api/products/${id}`,
  },
  ORDERS: {
    LIST: '/api/orders',
    CREATE: '/api/orders',
    GET: (id: string) => `/api/orders/${id}`,
    UPDATE: (id: string) => `/api/orders/${id}`,
  },
  ACTIVITY: {
    LIST: '/api/activity-logs',
  },
}
