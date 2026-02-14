# Valentine's Day Website

A romantic Next.js website featuring Snoopy-themed Valentine's Day proposal with an interactive Connections game.

## Features

- Landing page with romantic Snoopy image and interactive Yes/No buttons
- "I Love You" page with romantic message
- NYT Connections-style puzzle game
- Secret code revealed upon game completion

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables (optional):
   - Copy `.env.local.example` to `.env.local`
   - Set your secret code: `NEXT_PUBLIC_SECRET_CODE=YOUR_SECRET_CODE`

3. Add your images:
   - Place a romantic Snoopy image at `public/images/snoopy3.jpg` (or update the path in `app/page.tsx`)
   - Place your "I Love You" page image at `public/images/snoopy4.jpg` (or update the path in `app/iloveyou/page.tsx`)

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Game Setup

The Connections game includes 4 categories with 4 items each. To customize the game:
- Edit the `CATEGORIES` array in `app/connections/page.tsx`
- Update the secret code in `.env.local` or it will default to "LOVE2024"## Project Structure- `app/page.tsx` - Landing page with interactive buttons
- `app/iloveyou/page.tsx` - "I Love You" page
- `app/connections/page.tsx` - Connections puzzle game
- `public/images/` - Image assets directory
