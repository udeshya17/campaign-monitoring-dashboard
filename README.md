## Campaign Monitoring Dashboard

A focused dashboard for monitoring advertising campaigns: aggregate KPIs, campaign list with server-backed filtering, and a campaign detail page with real-time updates via SSE.

## Tech stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Real-time**: SSE (`EventSource`)
- **Deployment target**: Vercel

## Scope (intentionally small)

- **Pages (3)**
  - **Overview**: `/dashboard` — KPI summary + charts
  - **Campaigns**: `/campaigns` — list with search/filter/sort (API-backed)
  - **Campaign detail**: `/campaigns/[id]` — KPIs + real-time panel (SSE)
- **Navigation**
  - Desktop sidebar + mobile top bar + drawer menu

## How to run locally

### 1) Install

```bash
npm install
```

### 2) Environment variables

Create `.env.local` in the project root:

```bash
API_BASE_URL=https://mixo-fe-backend-task.vercel.app
NEXT_PUBLIC_API_BASE_URL=https://mixo-fe-backend-task.vercel.app
```

- **`API_BASE_URL`**: used on the server (Server Components / Route Handlers)
- **`NEXT_PUBLIC_API_BASE_URL`**: used in the browser (SSE via `EventSource`)

### 3) Start dev server

```bash
npm run dev
```

Open `http://localhost:3000` (it redirects to `/dashboard`).

## Key behavior (good to mention in interviews)

### Rate limiting strategy

The backend is rate-limited (example: 10 requests/min). The UI is designed to avoid unnecessary requests:

- **Server-side fetches** for initial page loads
- **Manual refresh** button for user-controlled updates
- **Campaigns filtering** calls a lightweight Next.js API route with debounce + short cache

### Real-time metrics (SSE)

On `/campaigns/[id]`, the app connects to:

- `GET /campaigns/<id>/insights/stream` (SSE)

The UI shows a **LIVE/OFFLINE** state and supports manual reconnect.

## API endpoints used

- **`GET /campaigns`**: campaigns list + platform breakdown chart data
- **`GET /campaigns/insights`**: aggregate KPIs for overview
- **`GET /campaigns/<id>`**: campaign detail header
- **`GET /campaigns/<id>/insights`**: campaign KPIs
- **`GET /campaigns/<id>/insights/stream`**: SSE live metrics

## Architecture (high level)

### Data flow

- **Server Components** fetch the initial data for pages (`/dashboard`, `/campaigns`, `/campaigns/[id]`)
- **Client Components** handle interactive UX:
  - campaigns filters/search/sort
  - refresh buttons
  - SSE live panel

### Error handling

Backend errors are surfaced in a user-friendly way (showing the backend’s `error` and `message`).

## Project structure (high signal map)

```text
src/
  app/
    dashboard/                 # overview page
    campaigns/                 # list page
      [id]/                    # detail page + loader
    api/campaigns/             # API-backed search/filter/sort
    about/                     # docs
  components/
    charts/                    # recharts wrappers
    common/                    # shared UI pieces
    dashboard/                 # overview widgets
    insights/                  # SSE panel + live indicators
    layout/                    # navbar + headers
  config/
    env.server.ts              # server env (API_BASE_URL)
    env.client.ts              # browser env (NEXT_PUBLIC_API_BASE_URL)
  services/                    # backend API calls
  types/                       # typed API shapes
  utils/                       # formatting helpers
```

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```
