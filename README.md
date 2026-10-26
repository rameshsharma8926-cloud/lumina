# AccessSaathi 360 AI

An inclusive accessibility platform prototype built for Indian users — footpath hazard awareness, communication tools, read-aloud assistance and interface accessibility settings.

Built with **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS v4** and **Lucide** icons. The spec suggested React + Vite + React Router; Next.js App Router provides the same reusable-component, file-based routing model and deploys to Vercel with zero config.

## Pages

| Route | Page |
| --- | --- |
| `/` | Home |
| `/tools` | Explore Tools |
| `/tools/raahdrishti` | RaahDrishti — footpath hazards |
| `/reports` | Community Reports (search + filters) |
| `/reports/new` | Submit a Report |
| `/reports/[id]` | Report detail |
| `/tools/vani-chitra` | Vani-Chitra — communication |
| `/tools/dhwani-sarthi` | Dhwani-Sarthi — read and listen |
| `/settings` | Sparsh-UI — accessibility settings |
| `/about` | About + feature status |

## Feature status

| Feature | Status |
| --- | --- |
| Read aloud with pause / resume / stop, language, rate | Functional (Web Speech API) |
| Type-to-speak + quick phrases (English, Hindi) | Functional |
| Text size, high contrast, reduced motion, focus, labels | Functional (sessionStorage) |
| Search and filter reports | Functional (client-side) |
| Submit report with photo preview + geolocation | Simulated — session only, nothing uploaded |
| Sample reports and statuses | Simulated — labelled demo data |
| Sign-language recognition | Planned |
| Map view, verification workflow, AI hazard detection | Planned |

## Run locally

Requires Node.js 20+ and pnpm.

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # production build
pnpm start      # serve the production build
```

## Upload to GitHub

```bash
git init
git add .
git commit -m "Initial commit: AccessSaathi 360 AI"
git branch -M main
git remote add origin https://github.com/<your-username>/accesssaathi-360-ai.git
git push -u origin main
```

Or, in v0, open **Settings → Git** and connect a repository directly.

## Future API integrations

No backend or secrets are used today. When adding a database, map provider or AI model, store keys in environment variables (e.g. `.env.local`, never committed) and call them only from server code (Route Handlers / Server Actions). Only variables prefixed with `NEXT_PUBLIC_` reach the browser — never put secret keys there.
