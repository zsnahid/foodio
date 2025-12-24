<!-- Foodio Backend README -->

## Foodio — Backend (NestJS)

This repository contains the backend API for Foodio, built with NestJS and TypeScript.

**Prerequisites:**

- **Node.js** v16 or later
- **pnpm** (preferred package manager) — install with `npm i -g pnpm` if needed
- (Optional) Docker and Docker Compose for containerized runs

**Quick start**

1. Install dependencies:

```bash
pnpm install
```

2. Create a `.env` file (copy from `.env.example` if present) and set required environment variables (PORT, DATABASE_URL, JWT_SECRET, etc.).

3. Run the app in development (watch mode):

```bash
pnpm run start:dev
```

4. Build and run for production:

```bash
pnpm run build
pnpm run start:prod
```

Available npm scripts (defined in `package.json`):

- `pnpm run start` — run the compiled app
- `pnpm run start:dev` — start in watch/dev mode
- `pnpm run start:prod` — run in production mode
- `pnpm run build` — compile TypeScript
- `pnpm run test` — run unit tests
- `pnpm run test:e2e` — run end-to-end tests
- `pnpm run test:cov` — run tests and show coverage

Environment variables

- Provide a `.env` file in the project root. Typical variables:
  - `PORT` — server port (default 3000)
  - `DATABASE_URL` — database connection string
  - `JWT_SECRET` — secret for JWT auth

Testing

Run unit tests:

```bash
pnpm run test
```

Run e2e tests:

```bash
pnpm run test:e2e
```

Docker (optional)

Example Dockerfile and compose usage if you want to run the app in a container:

```bash
# build image
docker build -t foodio-backend .

# run container (example)
docker run -e DATABASE_URL="<your-db-url>" -p 3000:3000 foodio-backend
```

Notes & tips

- If you don't use `pnpm`, the scripts work with `npm`/`yarn` after installing dependencies accordingly.
- Keep secrets out of version control; use `.env` or a secrets manager.

Contributing

Feel free to open issues or PRs. For major changes, please open an issue first to discuss the design.

License

This project follows the same license as the original Nest starter (MIT) unless otherwise specified.
