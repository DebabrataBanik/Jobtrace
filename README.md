# Jobtrace

A full-stack job application tracker. Built to learn by building something real — authentication, TypeScript on the backend, data modeling, and full CRUD.

---

## What is this?

Jobtrace lets you track every job application you've sent out — where it stands, what happened, and when. Each application moves through a defined lifecycle (Applied → OA/Interview → Offer/Rejected), and every status change is recorded in a timeline so you have a full history.

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
- `cookie-parser` — httpOnly cookie handling

**Frontend**

- React 19
- React Router v7 (Data Mode)
- TanStack Query v5 — server state management
- TanStack Table v8 — table UI with sorting, filtering, pagination and row selection
- Tailwind CSS v4
- Lucide React

**Tooling**

- `tsx` for development (no compile step)
- `tsc` for production builds
- ESLint + Prettier

---

## Project Structure

```
server/src/
├── config/       # DB connection, env loader
├── controllers/  # Route handlers
├── middlewares/  # Auth, validation, rate limiting
├── models/       # Mongoose schemas
├── routes/       # Express routers
├── schema/       # Zod schemas and inferred types
├── services/     # Business logic
├── types/        # Express type extensions
└── utils/        # ApiError, token generation

client/src/
├── components/   # UI components
├── context/      # Router and theme contexts
├── middleware/   # Auth and guest route guards
├── pages/        # Route-level components
├── services/     # API fetch functions
├── lib/          # Shared QueryClient instance
└── types/        # Shared TypeScript types
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
cd ../client && npm install
```

### Environment Setup

**Backend** - copy the example file and fill in your values:

```bash
copy .env.example .env.development
```

Then edit `.env.development`:

```env
PORT=3000
MONGO_DB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_min_32_chars
JWT_EXPIRY=24h
NODE_ENV=development
FRONTEND_URL=your_client_localhost_url
```

`JWT_SECRET` can be any long random string in development. For production,
generate one properly:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Frontend** - create `.env.development` in `client/`:

```env
VITE_API_URL=http://localhost:3000
```

### Run

```bash
# Backend
cd server && npm run dev

# Frontend
cd client && npm run dev
```

---

## API Reference

Base URL: `http://localhost:3000`

All `/applications` routes require a valid session cookie set on login.

### Auth

| Method | Route            | Description                          |
| ------ | ---------------- | ------------------------------------ |
| POST   | `/auth/register` | Register a new user                  |
| POST   | `/auth/login`    | Login and receive a session cookie   |
| POST   | `/auth/logout`   | Clear the session cookie             |
| GET    | `/auth/me`       | Get the currently authenticated user |

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
- `Offer` and `Rejected` are terminal — no further status change allowed.

Every status transition is appended to the `timeline` array:

```json
"timeline": [
  { "status": "Applied", "date": "2025-01-10T00:00:00.000Z" },
  { "status": "Interview", "date": "2025-01-15T00:00:00.000Z" },
  { "status": "Offer", "date": "2025-01-20T00:00:00.000Z" }
]
```

---

## Auth Flow

Authentication uses httpOnly cookies. On login or register, the server sets an `access_token` cookie. Every protected request sends it automatically via `credentials: "include"`.
On the frontend, React Router v7 middleware runs before any protected route renders. `authMiddleware` calls `/auth/me` — if the response is 401 the user is redirected to `/login`. If it succeeds, the user object is passed through router context and consumed by the layout loader, making it available to `UserItem` via `useLoaderData`.

On logout, the server clears the cookie and the client calls `queryClient.clear()` to purge all cached data before navigating to `/login`, preventing data leaking between accounts.

---

## Security

- Passwords hashed with `bcryptjs` (cost factor 10)
- JWTs signed with HS256 via `jose`, stored in httpOnly cookies
- Cookie `secure` and `sameSite` are environment-aware
- Auth routes rate-limited to 5 requests per 10 minutes per IP+email
- Application routes rate-limited to 100 per 5 minutes per user, with progressive delay after 50
- `sanitizeFilter` enabled globally on Mongoose
- Request bodies capped at 20kb
- `helmet` sets standard security headers
- `Cache-Control: no-store` on all auth and application routes

---

## Known Gaps

- **Stateless JWT logout** — no token invalidation on the server. Logout clears the cookie client-side but a captured token remains valid until expiry. Access/refresh token rotation is planned.
- **No tests** — test script is configured, none written yet.
- **Add/edit/delete UI** — backend is fully implemented, frontend forms not built yet.

## What's Next

- Add, edit, delete application UI
- Access + refresh token implementation
- Loader-based prefetching with TanStack Query
