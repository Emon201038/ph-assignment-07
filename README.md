# ph-assignment-07

Full-stack portfolio project used for Programming Hero Assignment 7.

This repository contains two main folders:

- `client/` — Next.js 13+ TypeScript React front-end (app router)
- `server/` — Node/Express TypeScript backend with REST APIs

## Tech stack

- Frontend: Next.js (app router), React, TypeScript, Tailwind CSS (likely), React Hook Form, Zod (validation)
- Backend: Node.js, Express, TypeScript
- Other: Cloudinary for image uploads, Prisma or other DB (check server config), JWT-based auth

> Note: This README is written from the current workspace contents. If you modify package managers, Node versions, or environment variables, update these instructions accordingly.

---

## Getting started (Windows / macOS / Linux)

Prerequisites

- Node.js 18+ (recommended)
- npm or pnpm or yarn

Clone the repo and install dependencies for both client and server:

```bash
# from repository root
cd client
npm install

# in a second terminal
cd server
npm install
```

If you prefer pnpm or yarn, use those instead.

### Environment variables

The server expects environment variables for database and cloudinary/auth. Check `server/src/app/config/env.ts` for exact names. Typical variables:

- DATABASE_URL - your database connection string
- PORT - optional server port (default 5000)
- JWT_SECRET - secret used for signing JWTs
- CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET - for image uploads

The client may expect runtime envs for API base URL or NextAuth. Check `client/src/auth.config.ts` and `client/src/actions/index.ts` for references.

Create `.env` files in `server/` (and `client/` if needed) and populate them before running.

### Running in development

Start the server

```bash
# from server/
npm run dev
# or if the project uses ts-node-dev or nodemon, the script may be 'dev'
```

Start the client

```bash
# from client/
npm run dev
# Next.js default runs on http://localhost:3000
```

Open http://localhost:3000 to view the app.

### Build for production

Build client

```bash
cd client
npm run build
npm run start
```

Build server

```bash
cd server
npm run build
npm run start
```

---

## Project structure (high level)

client/

- `src/app` — Next.js app router pages and layouts
- `src/components` — React UI components (Hero, Projects, Blogs, dashboard components)
- `src/lib` — helper functions and data loaders
- `src/providers` — theme and context providers
- `public/` — static assets and sample data in `public/data`

server/

- `src/app` — main server entry points
- `src/app/config` — environment config and DB connection
- `src/app/modules` — feature folders (auth, project, blog, user)
- `src/app/middlewares` — Express middlewares

---

## Tests and linting

Check `client/package.json` and `server/package.json` for available scripts. Run `npm run lint` or `npm test` where available.

## Notes & verification

- Verify exact env var names by opening `server/src/app/config/env.ts` and `client/src/auth.config.ts`.
- If you see type or build errors after install, run `npm run build` locally to identify missing types or config.

## Contact / Author

Repository owner: `Emon201038`

---

If you'd like, I can:

- add example `.env.example` files for client and server
- add npm scripts or a root-level workspace/package.json to start both with a single command
- generate a quick setup script for Windows (PowerShell/Bash)

Tell me which follow-up you'd like.
