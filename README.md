Next.js Project

This is a Next.js project bootstrapped with create-next-app.
## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js: The JavaScript runtime environment. It's required to run the Next.js application. You can download it from the Node.js official website.

- PostgreSQL: The relational database system. This project uses PostgreSQL as its database. You can download and install it from the PostgreSQL official website.

- Prisma: The database toolkit used for handling migrations and database operations. Prisma will be added to the project as a dependency.

## Getting Started
### Migrating Database Schema with Prisma

Before running the development server, apply any pending database migrations using Prisma:

```bash

npx prisma migrate dev
```
This command will create new migrations for any changes in your Prisma schema and apply them to your development database.

### Running the Development Server

After migrating your database, start the development server:

```bash

npm run dev
```

Open http://localhost:3000 with your browser for development enviroment.
