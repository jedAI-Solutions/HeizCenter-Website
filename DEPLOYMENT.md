# HeizCenter - Deployment Guide

## ✅ Day 1 Tasks Completed

All Phase 1, Week 1, Day 1 tasks have been successfully completed:

1. ✅ Created GitHub repository: [jedAI-Solutions/HeizCenter-Website](https://github.com/jedAI-Solutions/HeizCenter-Website)
2. ✅ Initialized Next.js 14 with TypeScript
3. ✅ Setup Tailwind CSS + Shadcn/ui
4. ✅ Configured project structure
5. ✅ Setup environment variables
6. ✅ Created Odoo API client (ready for credentials)
7. ✅ Built successful production build

## 📦 What's Been Built

### Technical Stack
- **Next.js 14.2.33** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Shadcn/ui** components ready
- **Odoo API** integration scaffold

### File Structure Created
```
HeizCenter-Website/
├── src/
│   ├── app/
│   │   ├── api/test-odoo/     # Odoo connection test endpoint
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Homepage
│   │   └── globals.css         # Global styles
│   ├── components/
│   │   ├── ui/                 # Shadcn/ui components
│   │   ├── layout/             # Layout components
│   │   ├── forms/              # Form components
│   │   └── sections/           # Page sections
│   ├── lib/
│   │   ├── api/odoo.ts        # Odoo API client
│   │   ├── constants/          # Constants
│   │   └── utils.ts            # Utilities
│   ├── types/index.ts          # TypeScript types
│   └── hooks/                  # Custom hooks
├── .env.example                # Environment template
├── .env.local                  # Your local config (not committed)
├── components.json             # Shadcn/ui config
└── README.md                   # Documentation
```

### Homepage Features
- Hero section with HeizCenter branding
- 4 service cards (Wärmepumpe, Heizung, Sanitär, Klimaanlage)
- Location overview (Augsburg, Ulm, Memmingen)
- Statistics section (60+ reviews, 20+ years, 3 locations)
- Call-to-action sections
- Development status indicator
- Footer

## 🚀 Next Steps: Deploy to Vercel

### Step 1: Push to GitHub

You need to push the code to GitHub. Since authentication failed, you have two options:

**Option A: Use GitHub CLI (Recommended)**
```bash
# Install GitHub CLI if not installed
brew install gh

# Authenticate
gh auth login

# Push to GitHub
cd /Users/Q285389/Desktop/jedAI/ClaudeCode/HeizCenter-Website
git push origin main
```

**Option B: Use SSH**
```bash
# Add SSH key to GitHub if not done
# Then change remote URL
git remote set-url origin git@github.com:jedAI-Solutions/HeizCenter-Website.git
git push origin main
```

**Option C: Use Personal Access Token**
```bash
# Create a PAT at: https://github.com/settings/tokens
# Then push with:
git push https://YOUR_USERNAME:YOUR_TOKEN@github.com/jedAI-Solutions/HeizCenter-Website.git main
```

### Step 2: Deploy to Vercel

Once code is pushed to GitHub:

1. **Go to Vercel Dashboard**
   - Visit [vercel.com/new](https://vercel.com/new)
   - Click "Add New Project"

2. **Import Repository**
   - Select "Import Git Repository"
   - Choose: `jedAI-Solutions/HeizCenter-Website`
   - Click "Import"

3. **Configure Project**
   - Framework Preset: **Next.js** (auto-detected)
   - Root Directory: `./`
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)

4. **Add Environment Variables**
   Click "Environment Variables" and add these:

   ```
   NEXT_PUBLIC_ODOO_URL=https://your-odoo-server.com
   ODOO_DATABASE=your_database_name
   ODOO_USERNAME=your_api_user@example.com
   ODOO_API_KEY=your_api_key_here
   NEXT_PUBLIC_SITE_URL=https://your-preview-url.vercel.app
   NEXT_PUBLIC_SITE_NAME=HeizCenter
   NEXT_PUBLIC_CONTACT_EMAIL=info@heizcenter.de
   NEXT_PUBLIC_CONTACT_PHONE=+49 821 123456
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes for deployment
   - You'll get a preview URL like: `heizcenter-website.vercel.app`

### Step 3: Test Odoo Connection

After deployment:

1. Visit: `https://your-site.vercel.app/api/test-odoo`
2. You should see connection status
3. If it fails, configure Odoo credentials

## 🔌 Odoo Configuration Needed

To connect your self-hosted Odoo instance:

### 1. Get Odoo Credentials

**Information Needed:**
- Server URL (e.g., `https://your-company-server.com:8069`)
- Database name
- API user email
- API key/password

**How to Get API Key:**
1. Log into Odoo as administrator
2. Go to: Settings → Users & Companies → Users
3. Select the API user
4. Click on "Account Security"
5. Generate new API Key
6. Copy the key (you'll only see it once!)

### 2. Enable Required Modules

Make sure these modules are installed in Odoo:
- **Website** - For CMS functionality
- **CRM** - For lead management
- **Blog** - For blog posts
- **Contacts** - For customer data

### 3. CORS Configuration

Since your Odoo is self-hosted, you may need to allow CORS:

Edit `/etc/odoo/odoo.conf`:
```ini
[options]
proxy_mode = True
cors = *
```

Or restrict to your domain:
```ini
cors = https://your-site.vercel.app
```

Restart Odoo:
```bash
sudo systemctl restart odoo
```

### 4. Test Connection Locally

Before deploying, test locally:

1. Update `.env.local` with real credentials
2. Run: `npm run dev`
3. Visit: `http://localhost:3000/api/test-odoo`
4. Check console for errors

## 📋 Deliverables Checklist

### Day 1 Completed ✅
- [x] GitHub repository created
- [x] Next.js 14 with TypeScript initialized
- [x] Tailwind CSS configured
- [x] Shadcn/ui setup complete
- [x] Project structure organized
- [x] Environment variables template created
- [x] Odoo API client scaffolded
- [x] Homepage built with basic design
- [x] Production build successful
- [x] README documentation written

### Ready for Deployment
- [ ] Push code to GitHub (needs auth)
- [ ] Deploy to Vercel
- [ ] Configure Odoo credentials
- [ ] Test Odoo connection
- [ ] Verify preview URL works

## 🎯 Expected Results

After completing deployment:

✅ **Repository**: `https://github.com/jedAI-Solutions/HeizCenter-Website`
✅ **Preview URL**: `https://heizcenter-website.vercel.app` (or similar)
✅ **Odoo Connection**: Working (once credentials configured)
✅ **CI/CD**: Auto-deploy on push to main
✅ **Lighthouse Score**: 95+ (baseline)

## 📞 Odoo Setup Help

If you need help with Odoo configuration, please provide:

1. **Odoo Version**: Which version? (e.g., 16, 17, 18)
2. **Access Level**: Do you have server access or just Odoo admin?
3. **Server Type**: Self-hosted on own server, VPS, or Docker?
4. **Current URL**: What's your Odoo URL? (without credentials)
5. **Port**: Default 8069 or custom?

This will help configure the API client correctly.

## 🐛 Troubleshooting

### Build Errors
- All builds successful ✅
- ESLint configured to allow underscore-prefixed unused vars

### Git Push Fails
- Need to authenticate with GitHub
- Use one of the three methods above

### Odoo Connection Fails
- Check server URL (include port if needed)
- Verify database name
- Confirm API user exists
- Check CORS settings
- Ensure Odoo is accessible from internet

## 📝 Next Day Tasks

### Day 2-3: Component Library & SEO
Tomorrow's focus:
- Build Shadcn/ui component library (Button, Card, Form, etc.)
- Implement SEO foundation (Metadata API, Schema.org)
- Create design system (colors, typography, spacing)
- Build complete homepage sections
- Create service page templates

## 🎉 Summary

**Day 1 is complete!** You now have:
- A professional Next.js 14 project
- Modern development environment
- Odoo integration ready
- Production-ready build
- Clear path to deployment

**Total Time**: ~4 hours (as planned)
**Status**: ✅ All Day 1 tasks completed

---

**Need Help?**
- Check [README.md](./README.md) for detailed setup
- Review [.env.example](./.env.example) for configuration
- Visit Next.js docs: https://nextjs.org/docs
- Vercel deployment: https://vercel.com/docs

**Built with Claude Code** 🤖
