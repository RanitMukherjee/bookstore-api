# bookstore REST API

A NestJS-based RESTful API for managing books with JWT authentication, PostgreSQL, and Prisma ORM.

## 🚀 Quick Start (Docker)

### Prerequisites
- Docker and Docker Compose installed
- Node.js (v16+) for local development (optional)

### 1. Clone the repository
```bash
git clone https://github.com/RanitMukherjee/bookstore-api.git
cd bookstore-api
```

### 2. Start the services
```bash
docker-compose up -d
```

This will start:
- PostgreSQL on port 5432
- NestJS API on port 3000
- Prisma Studio on port 5555

### 3. Apply database migrations
```bash
docker exec -it bookstore-api npx prisma migrate dev
```

### 4. Access services
- API: http://localhost:3000
- Swagger Docs: http://localhost:3000/api
- Prisma Studio: http://localhost:5555

---

## 📦 Manual Setup (Without Docker)

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment
Create `.env` file:
```bash
DATABASE_URL="your-db-url-here"
```

### 3. Start database
```bash
docker-compose up -d postgres
```

### 4. Run migrations
```bash
npx prisma migrate dev
```

### 5. Start the server
```bash
npm run start:dev
```

---

## 🌐 API Endpoints

### Authentication

| Method | Endpoint       | Description          |
|--------|----------------|----------------------|
| POST   | `/auth/register` | Register new user   |
| POST   | `/auth/login`    | Login and get JWT   |

**Sample Requests:**

```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

### Books (Requires JWT)

| Method | Endpoint       | Description          |
|--------|----------------|----------------------|
| GET    | `/books`       | Get all books (filterable) |
| POST   | `/books`       | Create new book      |
| GET    | `/books/:id`   | Get book by ID       |
| PATCH  | `/books/:id`   | Update book          |
| DELETE | `/books/:id`   | Delete book          |

**Sample Protected Request:**

```http
GET /books?author=Robert&rating[gte]=4.5
Authorization: Bearer your.jwt.token.here
```

```http
POST /books
Authorization: Bearer your.jwt.token.here
Content-Type: application/json

{
  "title": "Clean Code",
  "author": "Robert Martin",
  "category": "Programming",
  "price": 39.99,
  "rating": 4.7,
  "publishedAt": "2020-06-01T00:00:00.000Z"
}
```

---

## 📝 Notes

- Swagger documentation available at `/api`
- PostgreSQL data persists in Docker volume

---
