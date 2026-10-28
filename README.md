# Library Information System

## Description
This is an API for a library information system  that allows user and staff registration. Users can borrow books, return books and keep track of their borrowed books. Staff can see all borrowed and returned books, they can add, edit and delete books.

## Who it's for
Small libraries — school, community or office libraries — that need a simple backend to manage their catalogue and lending, and developers who want a ready-made API to put a frontend on.

## Built with
- Node.js and Express
- MongoDB with Mongoose
- JWT authentication (`jsonwebtoken`) and password hashing (`bcrypt`)
- Request validation with Joi
- ESLint and Prettier

## Roles
- **User** — registers, browses books, borrows and returns books, sees their own borrowed books
- **Admin (staff)** — adds, edits and deletes books, sees all users and all borrowed books
- **Super admin** — everything an admin can do, plus listing and removing staff

## Set Up
1. Ensure you have Node.js (18+) and npm installed, and a MongoDB database (local or Atlas).
2. Clone this repository and install packages:
   ```
   git clone https://github.com/tolanibadmus/Library_information_system.git
   cd Library_information_system
   npm install
   ```
3. Copy `.env.sample` to `.env` and fill in `MONGODB_URL`, `JWT_SECRET` and `PORT`.
4. Start the API with `npm run dev` (or `npm start`). It runs on `http://localhost:8080` by default.

## API overview
Authenticated routes expect the JWT in the `x-access-token` header.

| Method | Route | Access |
| --- | --- | --- |
| POST | `/user/register`, `/user/login` | Public |
| POST | `/staff/register`, `/staff/login` | Public |
| GET | `/books`, `/books/:id` | Public |
| POST | `/books/:id/borrow`, `/books/:id/return` | Logged-in user |
| GET | `/user/borrowed` | Logged-in user |
| POST | `/books` | Staff |
| PUT / DELETE | `/books/:id` | Staff |
| GET | `/users`, `/borrowed` | Staff |
| GET | `/staff` | Super admin |
| DELETE | `/staff/:id` | Super admin |
| GET | `/healthCheck` | Public |

## Roadmap
See [ROADMAP.md](ROADMAP.md).

## License
MIT — see [LICENSE](LICENSE).
