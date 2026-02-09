# API Specification - Data Hub API

This document provides a complete API specification for the Data Hub API.

---

## Base URL

```
https://your-domain.com/api
```

---

## Authentication

The API uses JWT (JSON Web Tokens) for authentication.

### Headers

```http
Authorization: Bearer {access_token}
```

### Token Types

- **Access Token**: Expires in 15 minutes, used for API requests
- **Refresh Token**: Expires in 7 days, used to obtain new access tokens

---

## Response Format

All API responses follow this format:

```json
{
  "success": true,
  "data": { ... },
  "message": "Operation completed successfully"
}
```

---

## Endpoints

### Authentication

#### Login

Authenticate with email and password.

```http
POST /auth/login
```

**Request Body**

```json
{
  "email": "admin@example.com",
  "password": "your-password"
}
```

**Response (200 OK)**

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "clxxxxxxx",
      "email": "admin@example.com",
      "role": "admin"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
  },
  "message": "Login successful"
}
```

**Errors**

- `400 Bad Request`: Missing email or password
- `401 Unauthorized`: Invalid credentials
- `403 Forbidden`: Account disabled

---

#### Refresh Token

Refresh access token using refresh token.

```http
POST /auth/refresh
```

**Request Body**

```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Response (200 OK)**

```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIs..."
  },
  "message": "Token refreshed successfully"
}
```

**Errors**

- `400 Bad Request`: Missing refresh token
- `401 Unauthorized`: Invalid or expired refresh token

---

#### Logout

Logout current session.

```http
POST /auth/logout
```

**Response (200 OK)**

```json
{
  "success": true,
  "message": "Logout successful"
}
```

---

### Data Management

#### Get All Data Entries

Retrieve all data entries with optional filtering.

```http
GET /data
```

**Query Parameters**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| categoryId | string | No | Filter by category ID |
| typeId | string | No | Filter by type ID |

**Response (200 OK)**

```json
{
  "success": true,
  "data": [
    {
      "id": "clxxxxxxx",
      "categoryId": "clxxxxxxx",
      "typeId": "clxxxxxxx",
      "title": "Sample Data Entry",
      "content": {
        "key": "value",
        "nested": {
          "field": "data"
        }
      },
      "source": "external-api",
      "createdAt": "2025-01-01T00:00:00.000Z",
      "updatedAt": "2025-01-01T00:00:00.000Z",
      "category": {
        "id": "clxxxxxxx",
        "name": "General",
        "description": "General data entries"
      },
      "type": {
        "id": "clxxxxxxx",
        "name": "JSON",
        "description": "JSON formatted data"
      }
    }
  ],
  "message": "Data entries retrieved successfully"
}
```

**Errors**

- `500 Internal Server Error`: Server error

---

#### Get Data Entry by ID

Retrieve a specific data entry.

```http
GET /data/:id
```

**Path Parameters**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | string | Yes | Data entry ID |

**Response (200 OK)**

```json
{
  "success": true,
  "data": {
    "id": "clxxxxxxx",
    "categoryId": "clxxxxxxx",
    "typeId": "clxxxxxxx",
    "title": "Sample Data Entry",
    "content": {
      "key": "value"
    },
    "source": "external-api",
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:00:00.000Z",
    "category": {
      "id": "clxxxxxxx",
      "name": "General",
      "description": "General data entries"
    },
    "type": {
      "id": "clxxxxxxx",
      "name": "JSON",
      "description": "JSON formatted data"
    }
  },
  "message": "Data entry retrieved successfully"
}
```

**Errors**

- `404 Not Found`: Data entry not found
- `500 Internal Server Error`: Server error

---

#### Create Data Entry

Create a new data entry (Admin only).

```http
POST /data
```

**Headers**

```http
Authorization: Bearer {access_token}
```

**Request Body**

```json
{
  "categoryId": "clxxxxxxx",
  "typeId": "clxxxxxxx",
  "title": "New Data Entry",
  "content": {
    "key": "value",
    "nested": {
      "field": "data"
    }
  },
  "source": "my-application"
}
```

**Fields**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| categoryId | string | Yes | Category ID |
| typeId | string | Yes | Type ID |
| title | string | Yes | Entry title |
| content | object/string | Yes | JSON content |
| source | string | No | Data source |

**Response (201 Created)**

```json
{
  "success": true,
  "data": {
    "id": "clxxxxxxx",
    "categoryId": "clxxxxxxx",
    "typeId": "clxxxxxxx",
    "title": "New Data Entry",
    "content": {
      "key": "value",
      "nested": {
        "field": "data"
      }
    },
    "source": "my-application",
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:00:00.000Z",
    "category": { ... },
    "type": { ... }
  },
  "message": "Data entry created successfully"
}
```

**Errors**

- `400 Bad Request`: Missing required fields, invalid JSON
- `401 Unauthorized`: Invalid or missing token
- `403 Forbidden`: Not an admin
- `404 Not Found`: Category or type not found
- `500 Internal Server Error`: Server error

---

#### Update Data Entry

Update an existing data entry (Admin only).

```http
PUT /data/:id
```

**Headers**

```http
Authorization: Bearer {access_token}
```

**Path Parameters**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | string | Yes | Data entry ID |

**Request Body**

```json
{
  "categoryId": "clxxxxxxx",
  "typeId": "clxxxxxxx",
  "title": "Updated Title",
  "content": {
    "updated": "value"
  },
  "source": "updated-source"
}
```

All fields are optional.

**Response (200 OK)**

```json
{
  "success": true,
  "data": {
    "id": "clxxxxxxx",
    ...
  },
  "message": "Data entry updated successfully"
}
```

**Errors**

- `400 Bad Request`: Invalid JSON
- `401 Unauthorized`: Invalid or missing token
- `403 Forbidden`: Not an admin
- `404 Not Found`: Data entry, category, or type not found
- `500 Internal Server Error`: Server error

---

#### Delete Data Entry

Delete a data entry (Admin only).

```http
DELETE /data/:id
```

**Headers**

```http
Authorization: Bearer {access_token}
```

**Path Parameters**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | string | Yes | Data entry ID |

**Response (200 OK)**

```json
{
  "success": true,
  "message": "Data entry deleted successfully"
}
```

**Errors**

- `401 Unauthorized`: Invalid or missing token
- `403 Forbidden`: Not an admin
- `404 Not Found`: Data entry not found
- `500 Internal Server Error`: Server error

---

### Categories

#### Get All Categories

Retrieve all categories.

```http
GET /categories
```

**Response (200 OK)**

```json
{
  "success": true,
  "data": [
    {
      "id": "clxxxxxxx",
      "name": "General",
      "description": "General data entries",
      "createdAt": "2025-01-01T00:00:00.000Z",
      "updatedAt": "2025-01-01T00:00:00.000Z",
      "_count": {
        "dataEntries": 10
      }
    }
  ],
  "message": "Categories retrieved successfully"
}
```

**Errors**

- `500 Internal Server Error`: Server error

---

### Data Types

#### Get All Data Types

Retrieve all data types.

```http
GET /types
```

**Response (200 OK)**

```json
{
  "success": true,
  "data": [
    {
      "id": "clxxxxxxx",
      "name": "JSON",
      "description": "JSON formatted data",
      "createdAt": "2025-01-01T00:00:00.000Z",
      "updatedAt": "2025-01-01T00:00:00.000Z",
      "_count": {
        "dataEntries": 15
      }
    }
  ],
  "message": "Data types retrieved successfully"
}
```

**Errors**

- `500 Internal Server Error`: Server error

---

### Admin Setup

#### Create Admin User

Create initial admin user and seed default data.

```http
POST /admin/seed
```

**Request Body**

```json
{
  "email": "admin@example.com",
  "password": "secure-password",
  "seedKey": "admin-setup-key"
}
```

**Fields**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| email | string | Yes | Admin email |
| password | string | Yes | Admin password |
| seedKey | string | Yes | Setup verification key |

**Response (201 Created)**

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

**Errors**

- `400 Bad Request`: Missing required fields
- `403 Forbidden`: Invalid seed key
- `409 Conflict`: User already exists
- `500 Internal Server Error`: Server error

---

## Error Codes

| Code | Description |
|------|-------------|
| 200 | OK |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 409 | Conflict |
| 500 | Internal Server Error |

---

## Rate Limiting

Public endpoints may be rate limited. Check headers for rate limit information:

```http
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1640995200
```

---

## CORS

The API supports CORS for cross-origin requests.

Configure allowed origins in your environment or request headers.

---

## Versioning

Current API version: v1

Version is indicated in the response headers:

```http
X-API-Version: 1.0.0
```
