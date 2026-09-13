# 青枢控制台

A production-quality admin dashboard skeleton built with Next.js App Router, TypeScript, and Tailwind CSS. The UI uses Chinese labels; code and comments stay in English. All data is mocked on the client — there is no backend, authentication, or external API.

## What’s included

- App shell: dark sidebar, sticky top bar, and a responsive main content area (desktop-first, usable on tablet)
- Navigation: 概览, 用户管理, 内容 / 资源, 设置
- Dashboard: KPI cards, a Recharts traffic chart, channel mix, and a recent-activity table
- Users: search, role/status filters, and a data table with loading and empty states
- Content library: card grid with type/status filters
- Settings: profile and preference form stored in `localStorage` (name, theme, density, notifications)

## Requirements

- Node.js 20+
- npm (the lockfile in this repo is for npm)

## Install and run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Other scripts

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # ESLint
```

## Routes

| Path        | Page        |
| ----------- | ----------- |
| `/`         | 概览         |
| `/users`    | 用户管理     |
| `/content`  | 内容 / 资源  |
| `/settings` | 设置         |

Top-bar search navigates to `/users?q=…`. Theme and density also apply immediately from the header or the settings form.

## Project layout

```
src/
  app/                 # App Router pages and loading/not-found states
  components/
    layout/            # Sidebar, top bar, shell
    dashboard/         # Overview widgets
    users/             # User table
    content/           # Resource grid
    settings/          # Preferences form
    ui/                # Lightweight shadcn-style primitives
  lib/                 # Mock data, nav, helpers
  providers/           # Local preferences + theme
```

## Notes

This is a front-end skeleton meant to be extended. Swap `src/lib/mock-data.ts` for real API calls when you add a backend.
