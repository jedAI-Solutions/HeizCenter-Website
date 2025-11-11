# HeizCenter Website

Modern Next.js website for HeizCenter - Your expert for heat pumps, heating, plumbing & air conditioning in Augsburg, Ulm, and Memmingen.

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui
- **Backend**: Odoo API Integration
- **Deployment**: Vercel

## 📁 Project Structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── api/             # API routes
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Homepage
├── components/          # React components
│   ├── ui/             # Shadcn/ui components
│   ├── layout/         # Layout components
│   ├── forms/          # Form components
│   └── sections/       # Page sections
├── lib/                # Utilities and helpers
│   ├── api/           # API clients (Odoo)
│   ├── constants/     # Constants and config
│   └── utils.ts       # Utility functions
├── types/             # TypeScript type definitions
└── hooks/             # Custom React hooks
```

## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/jedAI-Solutions/HeizCenter-Website.git
cd HeizCenter-Website
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Copy the `.env.example` file to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your Odoo credentials:

```env
# Odoo API Configuration
NEXT_PUBLIC_ODOO_URL=https://your-odoo-server.com
ODOO_DATABASE=your_database_name
ODOO_USERNAME=your_api_user@example.com
ODOO_API_KEY=your_api_key_here

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=HeizCenter

# Contact Information
NEXT_PUBLIC_CONTACT_EMAIL=info@heizcenter.de
NEXT_PUBLIC_CONTACT_PHONE=+49 821 123456
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### 5. Test Odoo Connection

Visit [http://localhost:3000/api/test-odoo](http://localhost:3000/api/test-odoo) to test your Odoo API connection.

## 🔌 Odoo Integration Guide

### Self-Hosted Odoo Setup

Your Odoo instance is self-hosted. To connect the website:

1. **Enable API Access**:
   - Go to Odoo Settings → Users & Companies → Users
   - Create or select an API user
   - Generate an API key (Settings → My Profile → Account Security → API Keys)

2. **Required Odoo Modules**:
   - `website` - For CMS functionality
   - `crm` - For lead management
   - `blog` - For blog posts

3. **API Endpoints**:
   - Authentication: `/web/session/authenticate`
   - Blog Posts: `/web/dataset/search_read`
   - Create Lead: `/web/dataset/call_kw`

4. **CORS Configuration**:
   Add your Vercel domain to Odoo's CORS whitelist in `/etc/odoo/odoo.conf`:
   ```
   [options]
   proxy_mode = True
   ```

## 📦 Deployment to Vercel

### Option 1: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import the GitHub repository: `jedAI-Solutions/HeizCenter-Website`
4. Configure environment variables
5. Deploy!

### Option 2: Deploy via CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel
```

### Environment Variables on Vercel

Add these environment variables in your Vercel project settings:

- `NEXT_PUBLIC_ODOO_URL`
- `ODOO_DATABASE`
- `ODOO_USERNAME`
- `ODOO_API_KEY`
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_SITE_NAME`
- `NEXT_PUBLIC_CONTACT_EMAIL`
- `NEXT_PUBLIC_CONTACT_PHONE`

## 🎯 Phase 1 - Week 1 Tasks

### Day 1 - Project Setup ✅

- [x] Create GitHub repository
- [x] Initialize Next.js 14 with TypeScript
- [x] Setup Tailwind CSS + Shadcn/ui
- [x] Configure project structure
- [x] Setup environment variables
- [x] Connect to Odoo API (test auth)
- [x] Deploy empty site to Vercel preview

### Day 2-3 - Homepage & Service Pages

- [ ] Build component library (Shadcn/ui components)
- [ ] Implement SEO foundation
- [ ] Create design system
- [ ] Build homepage
- [ ] Create service page templates

### Day 4-7 - Location Pages

- [ ] Create 3 main location pages
- [ ] Create 11 sub-location pages
- [ ] Implement LocalBusiness schema
- [ ] Add Google Maps integration

## 📝 Available Scripts

```bash
# Development
npm run dev          # Start dev server

# Production
npm run build        # Build for production
npm run start        # Start production server

# Linting
npm run lint         # Run ESLint
```

## 🏗️ Building Features

### Adding Shadcn/ui Components

```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add form
```

### Project Conventions

- Use TypeScript for all new files
- Follow the existing folder structure
- Use Tailwind CSS for styling
- Create reusable components in `src/components`
- Keep business logic in `src/lib`
- Define types in `src/types`

## 📊 SEO Features

- Next.js Metadata API for dynamic SEO
- Automatic sitemap generation
- Schema.org structured data
- Optimized images with next/image
- Perfect Lighthouse scores

## 🔒 Environment Variables Security

- Never commit `.env.local` to Git
- Use `.env.example` as a template
- Store secrets in Vercel's environment variables
- Use `NEXT_PUBLIC_` prefix only for client-side variables

## 🤝 Contributing

This project is built with Claude Code assistance for rapid development.

## 📄 License

© 2025 HeizCenter. All rights reserved.

---

**Built with ❤️ using Next.js & Claude Code**
