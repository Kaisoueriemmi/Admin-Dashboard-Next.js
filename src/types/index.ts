export type Role = 'ADMIN' | 'MANAGER' | 'USER'
export type Status = 'ACTIVE' | 'INACTIVE' | 'SUSPENDED'
export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED'

export interface User {
  id: string
  email: string
  name: string
  role: Role
  status: Status
  avatar?: string
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date
}

export interface Product {
  id: string
  name: string
  description?: string
  sku: string
  price: number
  quantity: number
  category: string
  image?: string
  status: Status
  createdAt: Date
  updatedAt: Date
}

export interface Order {
  id: string
  orderNo: string
  userId: string
  items: OrderItem[]
  total: number
  status: OrderStatus
  createdAt: Date
  updatedAt: Date
}

export interface OrderItem {
  id: string
  orderId: string
  productId: string
  quantity: number
  price: number
}

export interface ActivityLog {
  id: string
  userId: string
  action: string
  entity: string
  entityId?: string
  details?: string
  createdAt: Date
}

export interface AuthUser extends User {
  token?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}
