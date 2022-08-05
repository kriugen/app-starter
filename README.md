## Authentication

Go to https://manage.auth0.com and create Regular Web Application

Add the following variables to .env file:

From Application Settings:

AUTH0_ISSUER_BASE_URL='https://[Domain]'
AUTH0_CLIENT_ID = '[Client ID]'
AUTH0_CLIENT_SECRET = '[Client Secret]'

Generate key (this is sample):
AUTH0_SECRET ='889b1ddbbfa647f4f555a9e2bc12384771997237223d2aa092b7cc4645ef94ed'

Use you project domain in the following variables:
AUTH0_BASE_URL='http://localhost:3000'  - set this also to [Allowed Logout URLs]
AUTH0_CALLBACK_URL = 'http://localhost:3000/api/auth/callback' - set this also to [Allowed Callback URLs]

## Database

Add the following variable to .env file:

DATABASE_URL='[postgres db connection string]'

Run the following commands:

```bash
npx prisma db push
npx prisma db seed
```

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
