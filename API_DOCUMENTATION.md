# 📚 API Documentation

## Base URL
```
http://localhost:3000/api
```

## Authentication

### JWT Token
All protected endpoints require a Bearer token in the Authorization header:

```bash
Authorization: Bearer <your_jwt_token>
```

### Getting a Token
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "password123"
  }'
```

Response:
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "clh4vn...",
      "email": "admin@example.com",
      "name": "Admin User",
      "role": "ADMIN"
    },
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

## Authentication Endpoints

### POST `/auth/login`
Login user and get JWT token.

**Request:**
```json
{
  "email": "admin@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {...},
    "token": "..."
  }
}
```

**Response (401):**
```json
{
  "error": "Invalid credentials"
}
```

---

### POST `/auth/register`
Register new user.

**Request:**
```json
{
  "email": "user@example.com",
  "name": "John Doe",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {...},
    "token": "..."
  }
}
```

---

### POST `/auth/logout`
Logout current user.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

### GET `/auth/profile`
Get current user profile.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "...",
    "email": "...",
    "name": "...",
    "role": "...",
    "status": "..."
  }
}
```

---

## Users Endpoints

### GET `/users`
List all users with pagination and search.

**Query Parameters:**
- `page` (int): Page number (default: 1)
- `limit` (int): Items per page (default: 10)
- `search` (string): Search by name or email
- `role` (string): Filter by role (ADMIN, MANAGER, USER)
- `status` (string): Filter by status (ACTIVE, INACTIVE, SUSPENDED)

**Example:**
```bash
GET /api/users?page=1&limit=10&search=john&role=USER
```

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "...",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "USER",
      "status": "ACTIVE",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ],
  "pagination": {
    "total": 25,
    "page": 1,
    "limit": 10,
    "totalPages": 3
  }
}
```

---

### POST `/users`
Create new user.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request:**
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "role": "MANAGER",
  "status": "ACTIVE"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "clh5ab...",
    "name": "Jane Smith",
    "email": "jane@example.com",
    "role": "MANAGER",
    "status": "ACTIVE",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

---

### GET `/users/{id}`
Get user by ID.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "USER",
    "status": "ACTIVE",
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

---

### PUT `/users/{id}`
Update user.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request:**
```json
{
  "name": "John Updated",
  "role": "MANAGER",
  "status": "INACTIVE"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {...}
}
```

---

### DELETE `/users/{id}`
Delete user.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "User deleted successfully"
}
```

---

## Products Endpoints

### GET `/products`
List all products with pagination and filtering.

**Query Parameters:**
- `page` (int): Page number
- `limit` (int): Items per page
- `search` (string): Search by name or description
- `category` (string): Filter by category

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "...",
      "name": "Laptop Pro",
      "sku": "LP-001",
      "price": 1299.99,
      "quantity": 50,
      "category": "Electronics",
      "status": "ACTIVE",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ],
  "pagination": {...}
}
```

---

### POST `/products`
Create new product.

**Request:**
```json
{
  "name": "Wireless Mouse",
  "description": "Ergonomic wireless mouse",
  "sku": "WM-001",
  "price": 49.99,
  "quantity": 200,
  "category": "Accessories"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {...}
}
```

---

### GET `/products/{id}`
Get product by ID.

**Response (200):**
```json
{
  "success": true,
  "data": {...}
}
```

---

### PUT `/products/{id}`
Update product.

**Request:**
```json
{
  "name": "Updated Product Name",
  "price": 59.99,
  "quantity": 150
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {...}
}
```

---

### DELETE `/products/{id}`
Delete product.

**Response (200):**
```json
{
  "success": true,
  "message": "Product deleted successfully"
}
```

---

## Orders Endpoints

### GET `/orders`
List all orders.

**Query Parameters:**
- `page` (int): Page number
- `limit` (int): Items per page
- `status` (string): Filter by status

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "...",
      "orderNo": "ORD-1705334400000",
      "userId": "...",
      "user": {
        "name": "John Doe",
        "email": "john@example.com"
      },
      "items": [...],
      "total": 1349.98,
      "status": "PENDING",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ],
  "pagination": {...}
}
```

---

### POST `/orders`
Create new order.

**Request:**
```json
{
  "userId": "user-id",
  "items": [
    {
      "productId": "product-id-1",
      "quantity": 1
    },
    {
      "productId": "product-id-2",
      "quantity": 2
    }
  ]
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "...",
    "orderNo": "ORD-1705334400000",
    "userId": "...",
    "items": [...],
    "total": 1349.98,
    "status": "PENDING",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

---

### GET `/orders/{id}`
Get order by ID.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "...",
    "orderNo": "...",
    "userId": "...",
    "user": {...},
    "items": [
      {
        "id": "...",
        "productId": "...",
        "product": {...},
        "quantity": 1,
        "price": 1299.99
      }
    ],
    "total": 1299.99,
    "status": "PENDING",
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

---

### PUT `/orders/{id}`
Update order status.

**Request:**
```json
{
  "status": "CONFIRMED"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {...}
}
```

---

## Activity Logs Endpoints

### GET `/activity-logs`
Get activity logs.

**Query Parameters:**
- `page` (int): Page number
- `limit` (int): Items per page
- `userId` (string): Filter by user

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "...",
      "userId": "...",
      "user": {
        "name": "Admin User",
        "email": "admin@example.com"
      },
      "action": "CREATE",
      "entity": "USER",
      "entityId": "user-id",
      "details": "Created new user",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ],
  "pagination": {...}
}
```

---

### POST `/activity-logs`
Create activity log.

**Request:**
```json
{
  "userId": "user-id",
  "action": "UPDATE",
  "entity": "PRODUCT",
  "entityId": "product-id",
  "details": "Updated product price"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {...}
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "Validation error message"
}
```

### 401 Unauthorized
```json
{
  "error": "Invalid credentials" 
}
```

### 403 Forbidden
```json
{
  "error": "You don't have permission to access this resource"
}
```

### 404 Not Found
```json
{
  "error": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error"
}
```

---

## Rate Limiting

Currently not implemented. To add rate limiting:

```javascript
// Install rate-limit package
npm install express-rate-limit

// Add to API routes
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
```

---

## Pagination

All list endpoints support pagination:

```
?page=1&limit=10
```

Response includes:
```json
{
  "pagination": {
    "total": 100,
    "page": 1,
    "limit": 10,
    "totalPages": 10
  }
}
```

---

## Sorting

Add sorting support (to be implemented):

```
?sort=-createdAt&sort=name
```

---

## Testing with cURL

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"password123"}'
```

### Get Users
```bash
curl -X GET "http://localhost:3000/api/users?page=1&limit=10" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Create Product
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "name":"New Product",
    "sku":"NP-001",
    "price":99.99,
    "quantity":50,
    "category":"Electronics"
  }'
```

---

## Testing with Postman

1. Import endpoints into Postman
2. Set up environment variables:
   - `baseUrl`: http://localhost:3000/api
   - `token`: Your JWT token
3. Use {{baseUrl}} and {{token}} in requests

---

## Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 500 | Server Error |

---

**API Version**: 1.0  
**Last Updated**: November 2024
