# 🎵 Top Spotify Songs Since 2017

> An infinite-scrolling gallery of popular Spotify tracks, backed by Supabase and paginated 20 at a time.

![Next.js](https://img.shields.io/badge/Next.js-13-black?logo=next.js)
![React](https://img.shields.io/badge/React-18-61dafb?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?logo=tailwindcss)
![Supabase](https://img.shields.io/badge/Supabase-Postgres-3ecf8e?logo=supabase)

### 🚀 [Try it live →](https://image-infinite-scroll.vercel.app)

A practice project exploring scroll-driven pagination against a real dataset. Track artwork lives in a Supabase Postgres table and is fetched in pages of 20 from a Next.js Route Handler — when the container's bottom hits the viewport, the next offset loads. Searching by artist switches to a wider range query (200 rows) and resets the feed.

## ✨ Features

- Scroll-triggered pagination using `getBoundingClientRect` against the viewport
- Debounced artist-name search powered by Supabase `ilike` filtering
- Progressive image loading via a custom `BlurredImage` component
- Skeleton placeholders while the first page resolves
- Dark/light theme toggle via `next-themes`
- Typed Supabase client with generated `Database` types
- shadcn/ui primitives on top of Radix + Tailwind

## 🛠️ Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js 13 (App Router) |
| Language | TypeScript |
| UI | React 18, Tailwind CSS, shadcn/ui, Radix Slot |
| Icons | lucide-react |
| Theming | next-themes |
| Data | Supabase (Postgres) via `@supabase/supabase-js` |
| Async state | TanStack Query |
| Utilities | clsx, tailwind-merge, lodash |

## 📖 Getting Started

```bash
pnpm install
pnpm dev
```

Copy `.env.sample` to `.env.local` and fill in your Supabase project URL and secret key, then open [http://localhost:3000](http://localhost:3000).

```env
NEXT_PUBLIC_SUPABASE_URL=
SUPABASE_SECRET_KEY=
```

The app expects a `spotify` table with columns including `artistName` and `addedAT` — see `types/supabase.ts` for the full row shape.

## 🙌 Credits

Built by [Mohamed Gado](https://mohamedgado.com).
