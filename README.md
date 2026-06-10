# Bookmarks App

A simple bookmarks application built using Next.js, Supabase, Resend, and Vercel.

## Features

- User Authentication
- Welcome Email using Resend
- CRUD Bookmarks
- Public / Private Bookmarks
- Public Profile Page
- Supabase RLS Security
- Vercel Deployment

## Tech Stack

- Next.js
- TypeScript
- Supabase
- Resend
- Tailwind CSS
- Vercel

## Local Setup

1. Clone repository

```bash
git clone <repo-url>
```

2. Install dependencies

```bash
npm install
```

3. Create .env.local

```env
NEXT_PUBLIC_SUPABASE_URL=YOUR_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_KEY
RESEND_API_KEY=YOUR_KEY
```

4. Run

```bash
npm run dev
```

## AI Agent Mistakes & Fixes

The AI initially generated code using a Supabase server client that did not exist in my project. This caused build errors. I fixed it by using my existing Supabase client.

The AI also generated incorrect Next.js route parameter handling. I checked the error logs, corrected the route code, and verified it against my database schema.

## Future Improvements

- Bookmark Categories
- Search Functionality
- Better UI Design
- Email Verification