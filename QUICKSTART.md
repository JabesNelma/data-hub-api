# Quick Start Guide - Data Hub API

Get up and running with Data Hub API in 5 minutes.

---

## 📋 Prerequisites

- Node.js 18+
- Bun (recommended) or npm/yarn
- Git

---

## 🚀 Installation & Setup

### 1. Clone and Install

```bash
# Clone the repository
git clone https://github.com/your-username/data-hub-api.git
cd data-hub-api

# Install dependencies
bun install
```

### 2. Configure Environment

```bash
# Copy environment template
cp .env.example .env

# Edit .env with your values
# Use the following defaults for development:
DATABASE_URL="file:./db/custom.db"
JWT_SECRET="development-secret-key-change-in-production-32-chars"
JWT_REFRESH_SECRET="development-refresh-secret-key-change-in-production-32-chars"
SEED_KEY="admin-setup-key"
NODE_ENV="development"
```

### 3. Set Up Database

```bash
# Push schema to database
bun run db:push
```

### 4. Start Development Server

```bash
bun run dev
```

The server will start at http://localhost:3000

---

## 👤 Create Admin User

Once the server is running, create your first admin user:

```bash
curl -X POST http://localhost:3000/api/admin/seed \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "secure-password-123",
    "seedKey": "admin-setup-key"
  }'
```

Response:
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "clxxxxxxx",
      "email": "admin@example.com",
      "role": "admin"
    },
    "categories": [...],
    "types": [...]
  },
  "message": "Admin user and default data seeded successfully"
}
```

---

## 🔐 Login

Login to get your access token:

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "secure-password-123"
  }'
```

Save the `accessToken` from the response for authenticated requests.

---

## 📊 Create Your First Data Entry

Use the access token to create data:

```bash
curl -X POST http://localhost:3000/api/data \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "categoryId": "category-id-from-seed-response",
    "typeId": "type-id-from-seed-response",
    "title": "My First Data Entry",
    "content": {
      "key": "value",
      "nested": {
        "data": "here"
      }
    },
    "source": "quick-start-guide"
  }'
```

---

## 📖 View Documentation

Visit http://localhost:3000 to see the complete API documentation with:
- Overview and features
- Authentication guide
- All API endpoints
- Example requests
- Getting started guide

---

## 🧪 Test API Endpoints

### Get All Data (Public)
```bash
curl http://localhost:3000/api/data
```

### Get Categories (Public)
```bash
curl http://localhost:3000/api/categories
```

### Get Types (Public)
```bash
curl http://localhost:3000/api/types
```

### Update Data (Admin Only)
```bash
curl -X PUT http://localhost:3000/api/data/DATA_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "title": "Updated Title",
    "content": { "updated": "value" }
  }'
```

### Delete Data (Admin Only)
```bash
curl -X DELETE http://localhost:3000/api/data/DATA_ID \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

---

## 📝 Common Commands

```bash
# Development
bun run dev              # Start development server
bun run lint             # Check code quality
bun run db:push          # Push schema changes to database
bun run db:studio        # Open Prisma Studio (database GUI)

# Production
bun run build            # Build for production
bun start                # Start production server
```

---

## 🔧 Troubleshooting

### Port Already in Use

```bash
# Kill process on port 3000 (macOS/Linux)
lsof -ti:3000 | xargs kill -9

# Or use a different port
PORT=3001 bun run dev
```

### Database Issues

```bash
# Reset database (deletes all data)
rm db/custom.db
bun run db:push
bun run dev
```

### Login Fails

```bash
# Recreate admin user
curl -X POST http://localhost:3000/api/admin/seed \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "new-password",
    "seedKey": "admin-setup-key"
  }'
```

---

## 📚 Next Steps

1. **Read the full documentation**: http://localhost:3000
2. **Review API specification**: See API.md file
3. **Check deployment guide**: See DEPLOYMENT.md
4. **Explore the codebase**: src/app/api/

---

## 🌟 Example Use Cases

### 1. Product Catalog

```json
{
  "title": "Laptop",
  "content": {
    "name": "MacBook Pro",
    "price": 1999,
    "specs": {
      "cpu": "M3 Pro",
      "ram": "18GB",
      "storage": "512GB"
    }
  },
  "source": "inventory-system"
}
```

### 2. Blog Posts

```json
{
  "title": "Getting Started with Data Hub",
  "content": {
    "author": "John Doe",
    "published": true,
    "tags": ["tutorial", "api", "data"],
    "body": "Full blog post content here..."
  },
  "source": "cms"
}
```

### 3. Configuration Data

```json
{
  "title": "App Configuration",
  "content": {
    "theme": "dark",
    "language": "en",
    "notifications": {
      "email": true,
      "push": false
    }
  },
  "source": "settings"
}
```

---

## 💡 Tips

- **Refresh tokens**: Use `/api/auth/refresh` when access token expires
- **Filter data**: Use query params `?categoryId=X&typeId=Y`
- **Flexible content**: Store any valid JSON in the `content` field
- **Categories & Types**: Seed creates defaults, add more via direct database operations

---

## 🆘 Need Help?

- Check the full README.md for detailed information
- Review API.md for complete API specification
- Open an issue on GitHub for bugs or questions

---

**Happy building! 🚀**
