# Roadmap

## Fixes
- [ ] Return correct HTTP status codes (401/403 for auth and role failures instead of 400/200)
- [ ] Use `Date.now` for schema date defaults so timestamps aren't fixed at server start
- [ ] Stop the server from starting when the database connection fails
- [ ] Prevent public sign-up from creating staff accounts with any role

## Features
- [ ] Pagination, search and category filters on `GET /books`
- [ ] Track available copies separately from total quantity
- [ ] Due dates on rentals, overdue list and late fines
- [ ] Book reservations / waitlist when no copies are available
- [ ] Password reset and refresh tokens
- [ ] Audit log of staff actions

## Quality
- [ ] Integration tests with Jest, Supertest and an in-memory MongoDB
- [ ] OpenAPI (Swagger) documentation served at `/docs`
- [ ] Seed script with made-up sample books and users
- [ ] GitHub Actions: lint and test on every push
- [ ] Dockerfile and docker-compose for local setup

## Later
- [ ] Simple web frontend for members and staff
