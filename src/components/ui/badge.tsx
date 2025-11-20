'use client'

export const Badge = ({ children, variant = "default" }: { children: React.ReactNode; variant?: string }) => {
  const variants = {
    default: "bg-blue-100 text-blue-800",
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    danger: "bg-red-100 text-red-800",
    secondary: "bg-gray-100 text-gray-800",
  }

  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${variants[variant as keyof typeof variants] || variants.default}`}>
      {children}
    </span>
  )
}
