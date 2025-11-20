import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
})

export const registerSchema = z.object({
  email: z.string().email('Email invalide'),
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Les mots de passe ne correspondent pas',
  path: ['confirmPassword'],
})

export const userSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Email invalide'),
  role: z.enum(['ADMIN', 'MANAGER', 'USER']),
  status: z.enum(['ACTIVE', 'INACTIVE', 'SUSPENDED']),
})

export const productSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  description: z.string().optional(),
  sku: z.string().min(3, 'Le SKU doit contenir au moins 3 caractères'),
  price: z.number().positive('Le prix doit être positif'),
  quantity: z.number().int().min(0, 'La quantité doit être positive'),
  category: z.string().min(2, 'La catégorie doit contenir au moins 2 caractères'),
})

export const orderSchema = z.object({
  userId: z.string().min(1, 'L\'utilisateur est requis'),
  items: z.array(z.object({
    productId: z.string(),
    quantity: z.number().int().positive(),
  })).min(1, 'Au moins un article est requis'),
})

export type LoginInput = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema>
export type UserInput = z.infer<typeof userSchema>
export type ProductInput = z.infer<typeof productSchema>
export type OrderInput = z.infer<typeof orderSchema>
