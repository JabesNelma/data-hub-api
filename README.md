# Data Hub API

**A Generic Open Data Backend**

A production-ready, open-source REST API that can store and serve ANY type of data using categories and flexible JSON structures.

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)

---

## 📖 Overview

Data Hub API is a generic open data backend designed to store and serve ANY type of data using categories and flexible JSON structures. The API is designed to be consumed by:

- Web applications
- Mobile applications
- Dashboards
- External services

This project provides:
- **RESTful API** with Next.js App Router
- **JWT Authentication** with access/refresh tokens
- **Role-based access control** (admin/user roles)
- **Flexible JSON data storage**
- **Developer documentation frontend**

---

## ✨ Features

### 🔐 Authentication & Security
- JWT-based authentication with access and refresh tokens
- Role-based access control (admin/user)
- bcrypt password hashing
- Public read access for all data
- Admin-only write operations

### 🗄️ Data Management
- Flexible JSON-based data storage
- Categorization system
- Data type classification
- Full CRUD operations for admin users

### 🚀 API Features
- RESTful API design
- Consistent response format
- JSON content storage
- Query parameter filtering
- Comprehensive error handling

### 📚 Documentation
- Interactive API documentation
- Example requests (curl and fetch)
- Clear authentication flow
- Developer-friendly guides

---

## 🛠️ Tech Stack

### Backend
- **Next.js 16** - React framework with App Router
- **TypeScript 5** - Type-safe development
- **Prisma ORM** - Database toolkit
- **SQLite** - Database (production-ready for PostgreSQL migration)
- **jose** - JWT token generation/verification
- **bcrypt** - Password hashing

### Frontend Documentation
- **Next.js 16** with App Router
- **TypeScript 5**
- **Tailwind CSS 4**
- **shadcn/ui** components
- **Lucide icons**

---

## 📊 Database Schema

### Tables

#### `users`
User accounts with authentication support
- `id` - Primary key
- `email` - Unique email address
- `passwordHash` - Bcrypt hashed password
- `role` - User role (admin/user)
- `isActive` - Account status
- `createdAt` - Creation timestamp
- `updatedAt` - Update timestamp

#### `categories`
Categories for organizing data
- `id` - Primary key
- `name` - Category name
- `description` - Category description
- `createdAt` - Creation timestamp
- `updatedAt` - Update timestamp

#### `dataTypes`
Data type classification
- `id` - Primary key
- `name` - Type name
- `description` - Type description
- `createdAt` - Creation timestamp
- `updatedAt` - Update timestamp

#### `dataEntries`
Flexible data entries with JSON content
- `id` - Primary key
- `categoryId` - Foreign key to categories
- `typeId` - Foreign key to dataTypes
- `title` - Entry title
- `content` - JSON content (stored as TEXT)
- `source` - Data source
- `createdAt` - Creation timestamp
- `updatedAt` - Update timestamp

---

## 🔑 API Endpoints

### Authentication

#### `POST /api/auth/login`
Authenticate with email and password.

**Request Body:**
```json
{
  "email": "admin@example.com",
  "password": "your-password"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user-id",
      "email": "admin@example.com",
      "role": "admin"
    },
    "accessToken": "jwt-access-token",
    "refreshToken": "jwt-refresh-token"
  },
  "message": "Login successful"
}
```

#### `POST /api/auth/refresh`
Refresh access token using refresh token.

**Request Body:**
```json
{
  "refreshToken": "jwt-refresh-token"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "accessToken": "new-jwt-access-token"
  },
  "message": "Token refreshed successfully"
}
```

#### `POST /api/auth/logout`
Logout current session.

**Response:**
```json
{
  "success": true,
  "message": "Logout successful"
}
```

---

### Data Management

#### `GET /api/data`
Get all data entries (public read access).

**Query Parameters:**
- `categoryId` (optional) - Filter by category
- `typeId` (optional) - Filter by type

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "entry-id",
      "categoryId": "category-id",
      "typeId": "type-id",
      "title": "Entry Title",
      "content": { "key": "value" },
      "source": "source",
      "createdAt": "2025-01-01T00:00:00Z",
      "updatedAt": "2025-01-01T00:00:00Z",
      "category": { "id": "...", "name": "..." },
      "type": { "id": "...", "name": "..." }
    }
  ],
  "message": "Data entries retrieved successfully"
}
```

#### `GET /api/data/:id`
Get data entry by ID (public read access).

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "entry-id",
    "categoryId": "category-id",
    "typeId": "type-id",
    "title": "Entry Title",
    "content": { "key": "value" },
    "source": "source",
    "createdAt": "2025-01-01T00:00:00Z",
    "updatedAt": "2025-01-01T00:00:00Z",
    "category": { "id": "...", "name": "..." },
    "type": { "id": "...", "name": "..." }
  },
  "message": "Data entry retrieved successfully"
}
```

#### `POST /api/data` (Admin Only)
Create new data entry.

**Request Headers:**
```
Authorization: Bearer {access-token}
```

**Request Body:**
```json
{
  "categoryId": "category-id",
  "typeId": "type-id",
  "title": "Entry Title",
  "content": { "key": "value", "nested": { "data": "here" } },
  "source": "optional-source"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "entry-id",
    "categoryId": "category-id",
    "typeId": "type-id",
    "title": "Entry Title",
    "content": { "key": "value" },
    "source": "optional-source",
    "createdAt": "2025-01-01T00:00:00Z",
    "updatedAt": "2025-01-01T00:00:00Z",
    "category": { "id": "...", "name": "..." },
    "type": { "id": "...", "name": "..." }
  },
  "message": "Data entry created successfully"
}
```

#### `PUT /api/data/:id` (Admin Only)
Update data entry.

**Request Headers:**
```
Authorization: Bearer {access-token}
```

**Request Body:**
```json
{
  "categoryId": "category-id",
  "typeId": "type-id",
  "title": "Updated Title",
  "content": { "key": "updated-value" },
  "source": "updated-source"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "entry-id",
    ...
  },
  "message": "Data entry updated successfully"
}
```

#### `DELETE /api/data/:id` (Admin Only)
Delete data entry.

**Request Headers:**
```
Authorization: Bearer {access-token}
```

**Response:**
```json
{
  "success": true,
  "message": "Data entry deleted successfully"
}
```

---

### Categories & Types

#### `GET /api/categories`
Get all categories (public read access).

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "category-id",
      "name": "General",
      "description": "General data entries",
      "createdAt": "2025-01-01T00:00:00Z",
      "updatedAt": "2025-01-01T00:00:00Z",
      "_count": { "dataEntries": 10 }
    }
  ],
  "message": "Categories retrieved successfully"
}
```

#### `GET /api/types`
Get all data types (public read access).

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "type-id",
      "name": "JSON",
      "description": "JSON formatted data",
      "createdAt": "2025-01-01T00:00:00Z",
      "updatedAt": "2025-01-01T00:00:00Z",
      "_count": { "dataEntries": 15 }
    }
  ],
  "message": "Data types retrieved successfully"
}
```

---

### Admin Setup

#### `POST /api/admin/seed`
Create initial admin user and default data.

**Request Body:**
```json
{
  "email": "admin@example.com",
  "password": "secure-password",
  "seedKey": "admin-setup-key"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": { "id": "...", "email": "...", "role": "admin" },
    "categories": [...],
    "types": [...]
  },
  "message": "Admin user and default data seeded successfully"
}
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Bun (recommended) or npm/yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/data-hub-api.git
   cd data-hub-api
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```

   Edit `.env` and update the values:
   ```env
   DATABASE_URL="file:./db/custom.db"
   JWT_SECRET="your-secret-key-min-32-chars"
   JWT_REFRESH_SECRET="your-refresh-secret-key-min-32-chars"
   SEED_KEY="admin-setup-key"
   NODE_ENV="development"
   ```

   **IMPORTANT:** Generate strong secrets for production!

4. **Set up the database**
   ```bash
   bun run db:push
   ```

5. **Create admin user**
   ```bash
   curl -X POST http://localhost:3000/api/admin/seed \
     -H "Content-Type: application/json" \
     -d '{
       "email": "admin@example.com",
       "password": "your-secure-password",
       "seedKey": "admin-setup-key"
     }'
   ```

6. **Start the development server**
   ```bash
   bun run dev
   ```

7. **Access the application**
   - API: http://localhost:3000/api
   - Documentation: http://localhost:3000

---

## 📝 Example Requests

### Login with curl

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "your-password"
  }'
```

### Get data with curl

```bash
# Get all data
curl http://localhost:3000/api/data

# Get data with filters
curl "http://localhost:3000/api/data?categoryId=category-id&typeId=type-id"

# Get specific entry
curl http://localhost:3000/api/data/entry-id
```

### Create data with curl

```bash
curl -X POST http://localhost:3000/api/data \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "categoryId": "category-id",
    "typeId": "type-id",
    "title": "My Data Entry",
    "content": {
      "key": "value",
      "nested": {
        "data": "here"
      }
    },
    "source": "my-app"
  }'
```

### Fetch data with JavaScript

```javascript
// Get all data (public)
const response = await fetch('http://localhost:3000/api/data');
const { success, data, message } = await response.json();

if (success) {
  console.log('Data entries:', data);
}

// Create data entry (requires admin token)
const createResponse = await fetch('http://localhost:3000/api/data', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_ACCESS_TOKEN'
  },
  body: JSON.stringify({
    categoryId: 'category-id',
    typeId: 'type-id',
    title: 'New Entry',
    content: { key: 'value' },
    source: 'my-app'
  })
});
const result = await createResponse.json();
```

---

## 📦 Project Structure

```
data-hub-api/
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── migrations/         # Database migrations
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/       # Authentication routes
│   │   │   │   ├── login/
│   │   │   │   ├── refresh/
│   │   │   │   └── logout/
│   │   │   ├── data/       # Data management routes
│   │   │   │   └── [id]/
│   │   │   ├── categories/
│   │   │   ├── types/
│   │   │   └── admin/
│   │   │       └── seed/
│   │   ├── page.tsx        # Documentation landing page
│   │   └── layout.tsx
│   ├── components/
│   │   └── ui/             # shadcn/ui components
│   └── lib/
│       ├── db.ts           # Prisma client
│       ├── auth.ts         # JWT utilities
│       └── api-auth.ts     # API authentication middleware
├── db/
│   └── custom.db           # SQLite database file
├── .env.example            # Environment variables template
├── LICENSE                 # MIT License
├── README.md               # This file
└── package.json
```

---

## 🔒 Authentication & Authorization

### Token Types

#### Access Token
- **Lifetime:** 15 minutes
- **Usage:** API requests
- **Header:** `Authorization: Bearer {token}`

#### Refresh Token
- **Lifetime:** 7 days
- **Usage:** Get new access tokens
- **More secure, long-lived**

### Authentication Flow

1. Send POST request to `/api/auth/login` with email and password
2. Receive access token and refresh token in response
3. Include access token in Authorization header: `Bearer {token}`
4. When access token expires, use refresh token to get a new one
5. Include new access token in subsequent requests

### Access Control

- **Public Access:** GET requests to `/api/data`, `/api/categories`, `/api/types`
- **Admin Required:** POST, PUT, DELETE requests to `/api/data/*`

---

## 🚢 Deployment

### Deploy to Vercel

1. **Push your code to GitHub**
2. **Connect repository to Vercel**
3. **Configure environment variables** in Vercel dashboard:
   - `DATABASE_URL`
   - `JWT_SECRET`
   - `JWT_REFRESH_SECRET`
   - `SEED_KEY`
   - `NODE_ENV` (set to `production`)
4. **Deploy**

### Deploy to Other Platforms

This project can be deployed to any platform that supports Next.js:
- Vercel (recommended)
- Netlify
- Railway
- Render
- Self-hosted with Docker

### Environment Variables

Make sure to set these in your production environment:

```env
DATABASE_URL="your-database-url"
JWT_SECRET="strong-secret-at-least-32-characters"
JWT_REFRESH_SECRET="another-strong-secret-at-least-32-characters"
SEED_KEY="unique-seed-key-for-initial-setup"
NODE_ENV="production"
```

**IMPORTANT:** Use strong, randomly generated secrets in production!

---

## 🧪 Development

### Running Tests

```bash
bun run lint
```

### Database Management

```bash
# Push schema changes to database
bun run db:push

# Open Prisma Studio (database GUI)
bun run db:studio

# Generate Prisma Client
bun run db:generate
```

### Code Quality

```bash
# Lint code
bun run lint

# Type check
bun run type-check
```

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📞 Support

For issues, questions, or contributions:

- Open an issue on GitHub
- Check the documentation at http://localhost:3000
- Review the API endpoints above

---

## 🌟 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Database toolkit by [Prisma](https://www.prisma.io/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)

---

**Made with ❤️ for the developer community**

---

## Data Hub API - Generic Open Data Backend

Created by Jabes Nelma

Junior Full Stack Developer • MIT License • Open Source
