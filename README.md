This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).


## Prerequisites

Before you begin, ensure you have the following installed:

Node.js: The JavaScript runtime environment. It's required to run the Next.js application. You can download it from Node.js official website.

PostgreSQL: The relational database system. This project uses PostgreSQL as its database. You can download and install it from the PostgreSQL official website.

Prisma: The database toolkit used for handling migrations and database operations. Prisma will be added to the project as a dependency, so it does not need to be installed globally.


## Getting Started

Migrate database changes on prisma with;

```bash
npx prisma migrate dev
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

