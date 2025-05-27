# Invo.dev

A minimal PDF invoice generator. Create and download professional invoices without the overhead.

## Features

- Simple form for invoice creation
- Real-time preview
- PDF download
- No account required
- No watermarks

## Development

The following environment variables are necessary to run the web app. For the Cloudflare token, make sure the Browser Rendering API is in permission scope.

As of May 2025 API access has been introduced to the app, so a Clerk and an Unkey deployment are also required.

```env
CLOUDFLARE_ACCOUNT_ID=...
CLOUDFLARE_API_TOKEN=...
PRODUCTION_HOSTNAME=...
UNKEY_ROOT_KEY=...
UNKEY_API_ID=...
VITE_CLERK_PUBLISHABLE_KEY...
CLERK_SECRET_KEY=...
```

## Tech Stack

Front

- React Router + TypeScript
- Radix UI
- Zustand/Immer
- TailwindCSS

Back

- Clerk
- Unkey
- Posthog
- Railway
- Cloudflare

## License

MIT
