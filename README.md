# Jobtrace

A full-stack job application tracker. Built to learn by building something real — authentication, TypeScript on the backend, data modeling, and full CRUD.

---

## What is this?

Jobtrace lets you track every job application you've sent out — where it stands, what happened, and when. Each application moves through a defined lifecycle (Applied → OA/Interview → Offer/Rejected), and every status change is recorded in a timeline so you have a full history.

Frontend is in progress. This document covers the backend.

---

## Tech Stack

**Backend**

- Node.js + Express 5
- TypeScript (NodeNext module resolution)
- MongoDB + Mongoose
- `jose` — JWT signing and verification
- `bcryptjs` — password hashing
- Zod v4 — request validation
- `express-rate-limit` + `express-slow-down` — rate limiting and throttling
- `helmet` + `morgan`

**Tooling**

- `tsx` for development (no compile step)
- `tsc` for production builds
- ESLint + Prettier

---

## Project Structure

```
server/src/
├── config/
│   ├── db.ts                  # MongoDB connection
│   └── env.ts
├── controllers/
│   ├── auth.controller.ts
│   └── application.controller.ts
├── middlewares/
│   ├── auth.middleware.ts     # JWT auth
│   ├── request.middleware.ts  # request and object id validation
│   └── rateLimiter.ts
├── models/
│   ├── user.model.ts
│   └── application.model.ts
├── routes/
│   ├── auth.router.ts
│   └── application.router.ts
├── schema/
│   ├── auth.schema.ts         # Zod schemas + inferred types
│   └── application.schema.ts
├── services/
│   ├── auth.service.ts        # Business logic: register, login
│   └── application.service.ts # Business logic: CRUD + status transitions
├── types/
│   └── express.d.ts           # Extends Express Request with `user`
├── utils/
│   ├── ApiError.ts            # Custom operational error class
│   └── generateToken.ts       # JWT generation utility
└── index.ts                   # App entry point, middleware setup, error handler
```

---

## Getting Started

### Prerequisites

- Node.js >= 20
- MongoDB (local or Atlas)

### Clone the repo

```
git clone https://github.com/DebabrataBanik/jobtrace.git
cd jobtrace/server && npm install
```

### Environment Setup

Copy the example file and fill in your values:

```bash
copy .env.example .env.development
```

Then edit `.env.development`:

```env
PORT=3000
MONGO_DB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_min_32_chars
NODE_ENV=development
```

`JWT_SECRET` can be any long random string in development. For production,
generate one properly:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Run

```bash
npm run dev    # development with watch mode
npm run build  # compile TypeScript
npm start      # production (requires build first)
```

---

## API Reference

Base URL: `http://localhost:3000`

All `/applications` routes require an `Authorization: Token <jwt>` header.

### Auth

| Method | Route            | Description             |
| ------ | ---------------- | ----------------------- |
| POST   | `/auth/register` | Register a new user     |
| POST   | `/auth/login`    | Login and receive a JWT |

**Register body**

```json
{
  "username": "string (2–100 chars)",
  "email": "string",
  "password": "string (min 6 chars)"
}
```

**Login body**

```json
{
  "email": "string",
  "password": "string"
}
```

**Both return**

```json
{
  "status": "success",
  "token": "<jwt>",
  "user": { "id": "...", "name": "...", "email": "..." }
}
```

---

### Applications

| Method | Route               | Description                                     |
| ------ | ------------------- | ----------------------------------------------- |
| GET    | `/applications`     | Get all applications for the authenticated user |
| POST   | `/applications`     | Create a new application                        |
| GET    | `/applications/:id` | Get a single application                        |
| PATCH  | `/applications/:id` | Update an application                           |
| DELETE | `/applications/:id` | Delete an application                           |

**Create body**

```json
{
  "company": "string",
  "title": "string",
  "status": "Applied",
  "appliedDate": "ISO date string",
  "url": "string (optional)",
  "description": "string (optional)",
  "notes": "string (optional)"
}
```

> Status on creation must be `Applied`. This is enforced at the service layer.

**Update body** (all fields optional)

```json
{
  "company": "string",
  "title": "string",
  "status": "OA | Interview | Offer | Rejected",
  "url": "string",
  "description": "string",
  "notes": "string"
}
```

> `Applied` cannot be set via update — only on creation. `Offer` and `Rejected` are terminal states; once reached, no further status changes are allowed.

---

## Application Lifecycle

```
Applied → OA → Interview → Offer
                        ↘ Rejected
```

- `Applied` is set only at creation.
- `OA` and `Interview` are repeatable (multiple interview rounds are valid).
- `Offer` and `Rejected` are terminal — the application is closed.

Every status transition is appended to the `timeline` array on the document, giving you a full audit trail:

```json
"timeline": [
  { "status": "Applied", "date": "2025-01-10T00:00:00.000Z" },
  { "status": "Interview", "date": "2025-01-15T00:00:00.000Z" },
  { "status": "Offer", "date": "2025-01-20T00:00:00.000Z" }
]
```

---

## Security

- Passwords are hashed with `bcryptjs` (cost factor 10).
- JWTs are signed with HS256 via `jose`. Tokens expire in 30 minutes.
- Auth routes are rate-limited to 5 requests per 10 minutes per IP+email combination.
- Application routes are rate-limited to 100 requests per 5 minutes per user, with progressive delay after 50.
- Mongoose `sanitizeFilter` is enabled globally to prevent query injection.
- Request bodies are capped at 20kb.
- `helmet` sets standard security headers.

---

## Error Handling

All errors flow through a single Express error handler. The `ApiError` class is used for expected operational errors (wrong password, not found, etc.). Unexpected errors return a generic 500. JOSE errors (invalid/expired token) are caught specifically and return 401.

Validation errors from Zod return 400 with a structured issues array:

```json
{
  "message": {
    "type": "ZodError",
    "issues": [
      { "name": "email", "error": "Please provide a valid email address" }
    ]
  }
}
```

---

## Known Gaps

- **Stateless JWT logout** — there is no token invalidation mechanism yet. Logout on the client just discards the token. Access/refresh token rotation is planned.
- **No tests yet** — the `test` script is configured, but no tests have been written.

---

## What's Next

- [ ] Access + refresh token implementation
- [ ] React frontend
