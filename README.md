This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Time Auditor

A time-audit and todo app built for ADHD time-blindness. My first full-stack app, built by hand as a learning project - every line of application logic written without AI code generation.

## The Problem

People with ADHD often lose track of where their time actually goes, even when following a todo list. This app pairs a daily todo list with mindful time-tracking prompts throughout the day, turning vague "I worked all day" into a clear picture of focus, breaks, and distractions.

## Status

🚧 In active development — Phase 0 (project setup), April 2026.

## Features

**Status:** ✅ Built · 🚧 In progress · 📋 Planned (MVP) · 💡 Future version

### Todo Management

- 📋 Drag-and-drop todo list with three priority categories (High / Medium / Low)

### Time Audit Chrome Extension

- 📋 Configurable interval timer (15 / 30 / 60 / 90 min)
- 📋 Post-interval check-in: log focus, task switch, break, or distraction
- 📋 End timer early when you switch tasks mid-session

### Insights

- 📋 Colour-coded calendar view of how you spent your time
- 📋 Focus / break / distracted breakdown by day, week, and month

### Future Versions

- 💡 AI time-management coach
- 💡 AI-generated daily schedules from your todo list and past behaviour
- 💡 Calendar sync to auto-pause prompts during meetings

## Tech Stack

- **Frontend:** Next.js 15 (App Router), TypeScript, Tailwind CSS, shadcn/ui
- **Backend:** Next.js API routes, Prisma ORM
- **Database & Auth:** Supabase (PostgreSQL)
- **Extension:** Chrome Extension (Manifest V3)
- **Testing:** Vitest, Playwright
- **Hosting:** Vercel

## Getting Started

_Setup instructions coming soon as the project takes shape._

## Author

Lawrence Dinh — [https://www.linkedin.com/in/lawrence-dinh-6b74121b5/](https://www.linkedin.com/in/lawrence-dinh-6b74121b5/) · Melbourne, AU
