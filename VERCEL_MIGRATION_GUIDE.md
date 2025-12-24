# HEIZcenter Website Vercel Migration Guide

## Executive Summary

**Current State:**
- Code: Local machine (Cursor/Claude Code) → jedAI GitHub repo
- Deployment: Automated to jedAI Vercel account
- Domain: heizcenter.de on Strato (old Odoo website)

**Target State:**
- Code: Local machine (Cursor/Claude Code) → GitHub repo
- Deployment: HEIZcenter-owned Vercel account
- Domain: heizcenter.de connected to HEIZcenter Vercel
- Developer maintains access for updates

---

## 1. Architecture Decision: Repository Strategy

### Recommended Approach: **Transfer Repository to HEIZcenter Organization**

**Why this approach:**
- Clean ownership transfer
- Preserves git history
- Maintains existing CI/CD workflows
- Professional client ownership
- Developer can be added as collaborator

### Alternative Options (NOT recommended):

| Option | Pros | Cons |
|--------|------|------|
| **Fork repo** | Quick setup | Creates two repos, confusion about "source of truth" |
| **New repo** | Fresh start | Loses git history, requires manual code copy |
| **Keep jedAI repo** | No change | Poor optics for client ownership |

---

## 2. Pre-Migration Preparation

### 2.1 Inventory Current Setup

```bash
# Document current Vercel project settings
cd /Users/Q285389/Desktop/jedAI/ClaudeCode/HeizCenter-Website

# Check git status
git remote -v
git branch -a
git log --oneline -10

# Document environment variables (DO NOT commit sensitive values)
# List all env vars used in production
```

**Action Checklist:**
- [ ] List all Vercel environment variables
- [ ] Document build settings (Build Command, Output Directory, Install Command)
- [ ] Note any custom Vercel configurations (redirects, headers, edge functions)
- [ ] Backup current production database (if applicable)
- [ ] Document all third-party integrations (n8n webhooks, analytics, etc.)

### 2.2 Create HEIZcenter GitHub Organization (if not exists)

```bash
# Option 1: Create GitHub Organization
# Go to: https://github.com/organizations/plan
# Create organization: "HEIZcenter" (or "HEIZcenter-GmbH")

# Option 2: Use HEIZcenter's existing GitHub account
# (Can be personal account if organization is not needed)
```

**Decision Point:** Organization vs Personal Account
- **Organization** (Recommended): Professional, supports teams, better for business
- **Personal Account**: Simpler, cheaper (free), sufficient for single client

### 2.3 Prepare Access Credentials

**GitHub Access:**
- Client GitHub account credentials (or org owner)
- Your developer account for collaborator access

**Vercel Access:**
- Client email for Vercel account creation
- Payment method (Vercel Pro ~$20/month recommended for production)

**Domain Access:**
- Strato account credentials
- DNS management access

---

## 3. Migration Steps (Zero-Downtime Strategy)

### Phase 1: Repository Migration (Day 1)

#### Step 1.1: Create HEIZcenter Vercel Account

```bash
# Client (or you on behalf of client):
# 1. Go to https://vercel.com/signup
# 2. Sign up with HEIZcenter email (e.g., admin@heizcenter.de)
# 3. Choose "Hobby" plan (free) initially - can upgrade later
# 4. Connect GitHub account/organization
```

#### Step 1.2: Transfer GitHub Repository

**Option A: Transfer Existing Repo (Recommended)**

```bash
# This must be done by jedAI-Solutions org owner via GitHub UI:
# 1. Go to: https://github.com/jedAI-Solutions/HeizCenter-Website/settings
# 2. Scroll to "Danger Zone"
# 3. Click "Transfer ownership"
# 4. Enter new owner: "HEIZcenter" (or account name)
# 5. Confirm transfer

# After transfer, update your local remote:
cd /Users/Q285389/Desktop/jedAI/ClaudeCode/HeizCenter-Website
git remote set-url origin https://github.com/HEIZcenter/HeizCenter-Website.git
git remote -v  # Verify change
```

**Option B: Create New Repo and Push (Fallback)**

```bash
# Only if transfer fails or is not desired
# Client creates new repo: https://github.com/new
# Repository name: HeizCenter-Website
# Keep private

# Update local remote
cd /Users/Q285389/Desktop/jedAI/ClaudeCode/HeizCenter-Website
git remote rename origin old-origin
git remote add origin https://github.com/HEIZcenter/HeizCenter-Website.git
git push -u origin main --force
git push --tags
```

#### Step 1.3: Grant Developer Access

```bash
# Client or org owner adds you as collaborator:
# Go to: https://github.com/HEIZcenter/HeizCenter-Website/settings/access
# Click "Add people"
# Enter your GitHub username
# Role: "Write" or "Maintain" (not Admin, for security)
```

### Phase 2: Vercel Setup (Day 1-2)

#### Step 2.1: Import Project to HEIZcenter Vercel

```bash
# In HEIZcenter Vercel account:
# 1. Click "Add New Project"
# 2. Import Git Repository
# 3. Select: HEIZcenter/HeizCenter-Website
# 4. Configure project:
```

**Vercel Project Settings:**
```yaml
Framework Preset: Next.js
Root Directory: ./
Build Command: npm run build
Output Directory: .next
Install Command: npm install
Node Version: 20.x (or current LTS)
```

#### Step 2.2: Configure Environment Variables

```bash
# In Vercel Project Settings → Environment Variables
# Add all variables from .env.example:

# Production Environment:
N8N_WEBHOOK_BASE_URL=https://heizcenter.app.n8n.cloud
NEXT_PUBLIC_SITE_URL=https://heizcenter.de
NEXT_PUBLIC_SITE_NAME=HeizCenter
NEXT_PUBLIC_CONTACT_EMAIL=info@heizcenter.de
NEXT_PUBLIC_CONTACT_PHONE=+49 8234 9665900

# Preview Environment:
# (Same values, or use staging n8n webhook if available)

# Development Environment:
# (Local values for testing)
```

**IMPORTANT:**
- Set environment scope: Production, Preview, Development
- Never commit sensitive keys to git
- Use Vercel's encrypted environment variable storage

#### Step 2.3: Test Deployment on Vercel Preview URL

```bash
# DO NOT connect domain yet
# First deployment will create a preview URL like:
# https://heizcenter-website-abc123.vercel.app

# Test thoroughly:
# 1. Navigate all pages
# 2. Test contact forms → verify n8n webhook delivery
# 3. Check console for errors
# 4. Test mobile responsiveness
# 5. Verify analytics tracking
# 6. Test all CTAs and links
```

**Testing Checklist:**
- [ ] Homepage loads correctly
- [ ] All service pages (Wärmepumpe, Heizung, Sanitär, etc.)
- [ ] Location pages (Bobingen, Gutenzell-Hürbel)
- [ ] Contact form submits successfully
- [ ] n8n webhook receives lead data
- [ ] Emergency contact form works
- [ ] No console errors
- [ ] Images load correctly
- [ ] SEO meta tags present
- [ ] Google Analytics tracking fires

### Phase 3: Domain Migration (Day 3-5)

#### Step 3.1: Prepare for DNS Switch

**Timeline Considerations:**
- DNS propagation: 1-48 hours (typically 1-4 hours)
- SSL certificate issuance: 5-10 minutes
- Downtime window: Plan for off-peak hours (e.g., 2-4 AM local time)

#### Step 3.2: Add Domain to Vercel

```bash
# In HEIZcenter Vercel Project:
# Go to: Settings → Domains
# Click "Add Domain"
# Enter: heizcenter.de
# Also add: www.heizcenter.de (recommended)

# Vercel will show DNS configuration needed
# DO NOT update DNS yet - wait for confirmation
```

**Vercel will provide:**
```
Type    Name    Value                           TTL
A       @       76.76.21.21                     3600
CNAME   www     cname.vercel-dns.com           3600
```

#### Step 3.3: Lower DNS TTL (24h before switch)

```bash
# Login to Strato DNS management
# Find current DNS records for heizcenter.de
# Lower TTL from 86400 (24h) to 300 (5 min)
# Wait 24 hours for old TTL to expire

# This ensures fast propagation when you make the switch
```

#### Step 3.4: DNS Cutover (Low-Traffic Window)

```bash
# Recommended timing: 2-4 AM CET on a weeknight

# In Strato DNS Management:
# 1. Backup existing DNS records (screenshot or export)
# 2. Update A record:
#    Type: A
#    Host: @ (or blank)
#    Value: 76.76.21.21 (Vercel IP)
#    TTL: 300 (5 minutes)
#
# 3. Add/Update CNAME for www:
#    Type: CNAME
#    Host: www
#    Value: cname.vercel-dns.com
#    TTL: 300

# 4. Remove old A/CNAME records pointing to Strato
# 5. Keep MX records (email) unchanged (if using Strato email)
```

**CRITICAL: Email Considerations**
- If HEIZcenter uses email@heizcenter.de hosted on Strato:
  - DO NOT DELETE MX records
  - Verify MX records remain intact after DNS change
- Common MX records for Strato:
  ```
  MX   @   mx01.strato.de   10
  MX   @   mx02.strato.de   20
  ```

#### Step 3.5: Monitor DNS Propagation

```bash
# Check DNS propagation globally:
# Online tool: https://www.whatsmydns.net/#A/heizcenter.de

# Terminal check:
dig heizcenter.de
dig www.heizcenter.de

# Expected output:
# heizcenter.de → 76.76.21.21 (Vercel)
# www.heizcenter.de → cname.vercel-dns.com

# Check from multiple locations:
dig @8.8.8.8 heizcenter.de    # Google DNS
dig @1.1.1.1 heizcenter.de    # Cloudflare DNS
```

#### Step 3.6: Verify SSL Certificate

```bash
# Vercel auto-issues Let's Encrypt SSL
# Usually completes in 5-10 minutes after DNS verification

# Check SSL status:
# Vercel Dashboard → Domains → heizcenter.de
# Status should show: "Valid Certificate"

# Verify in browser:
# https://heizcenter.de
# - Should show padlock icon
# - Certificate issued by Let's Encrypt
# - Valid for heizcenter.de and www.heizcenter.de
```

### Phase 4: Post-Migration Validation (Day 3-5)

#### Step 4.1: Comprehensive Production Testing

```bash
# Run full test suite on production domain
# Use production URL: https://heizcenter.de

# Testing Checklist:
```

**Critical Path Tests:**
- [ ] Homepage loads (https://heizcenter.de)
- [ ] WWW redirect works (https://www.heizcenter.de → https://heizcenter.de)
- [ ] SSL certificate valid
- [ ] All navigation links work
- [ ] Contact form submission → n8n webhook delivery confirmed
- [ ] Quote form submission → n8n webhook delivery confirmed
- [ ] Emergency contact form → n8n webhook delivery confirmed
- [ ] Google Analytics tracking verified (check GA4 Real-Time reports)
- [ ] Google Maps embed loads
- [ ] All images load correctly
- [ ] Mobile responsive design works
- [ ] Page load speed acceptable (< 3s)

**SEO Verification:**
```bash
# Check Google Search Console
# - Add new property for https://heizcenter.de (if not already)
# - Verify ownership via DNS TXT record or HTML file
# - Submit sitemap: https://heizcenter.de/sitemap.xml

# Check robots.txt:
curl https://heizcenter.de/robots.txt

# Verify structured data:
# Use Google Rich Results Test:
# https://search.google.com/test/rich-results
```

#### Step 4.2: Monitor Error Rates

```bash
# Vercel Analytics (first 24-48 hours):
# - Check Error Rate
# - Monitor 404s
# - Watch for 500 errors
# - Review Core Web Vitals

# n8n Webhook Monitoring:
# - Verify leads are being received
# - Check for webhook failures
# - Test email notifications working
```

#### Step 4.3: Raise DNS TTL Back

```bash
# After 48 hours of stable operation:
# Login to Strato DNS
# Increase TTL back to normal:
# - A record TTL: 3600 or 86400
# - CNAME TTL: 3600 or 86400
```

### Phase 5: Cleanup (Day 7-14)

#### Step 5.1: Decommission Old jedAI Vercel Deployment

```bash
# In jedAI Vercel account:
# Only after confirming new site stable for 7+ days
# 1. Go to old project settings
# 2. Archive or delete project
# 3. Remove old domain connections (if any)

# IMPORTANT: Do NOT delete until new site proven stable
```

#### Step 5.2: Update Documentation

```bash
# Update repository README:
# - Change deployment instructions
# - Update Vercel project URL
# - Document new repo location

# Update team documentation:
# - New GitHub repo URL
# - New Vercel project URL
# - Access credentials locations
```

#### Step 5.3: Archive Old Strato Website

```bash
# Login to Strato hosting
# Backup old Odoo website files (if any)
# Create archive for historical reference
# Can decommission Strato hosting (if no longer needed)

# KEEP:
# - Email hosting (if using Strato email)
# - Domain registration (still needed for DNS)
```

---

## 4. Rollback Plan

### Scenario 1: Vercel Deployment Fails

**Symptoms:**
- New Vercel site not building
- Critical errors on preview URL

**Rollback:**
```bash
# Do NOT update DNS
# Fix issues on Vercel preview
# Test again before DNS switch
# Old Strato site remains live
```

### Scenario 2: DNS Switch Issues

**Symptoms:**
- SSL certificate won't issue
- Site unreachable after DNS update
- Email delivery broken

**Immediate Rollback (within 1 hour):**
```bash
# Login to Strato DNS
# Revert A record to old IP:
# (You backed up old DNS records in Step 3.4, right?)
# Example:
# A   @   [OLD_STRATO_IP]   300

# Check propagation:
dig heizcenter.de
# Should revert to old IP within 5-15 minutes (due to low TTL)
```

### Scenario 3: Production Issues After Migration

**Symptoms:**
- Forms not submitting
- n8n webhooks failing
- Critical functionality broken

**Rollback Process:**
```bash
# Option A: Quick fix on Vercel (preferred)
# 1. Identify issue via Vercel logs
# 2. Roll back to previous deployment:
#    Vercel Dashboard → Deployments → Select last working version → Promote
# 3. Fix issue in code
# 4. Deploy fixed version

# Option B: Full DNS rollback (if Option A fails)
# 1. Revert DNS to old Strato site (see Scenario 2)
# 2. Fix issues locally
# 3. Test on Vercel preview
# 4. Re-attempt migration when ready
```

### Rollback Communication Plan

**Stakeholders:**
- HEIZcenter management
- Development team
- Support team (if any)

**Notification Template:**
```
Subject: Website Migration Rollback - Action Required

We have rolled back the website migration due to [specific issue].

Current Status:
- Domain: Pointing to [old/new] infrastructure
- Impact: [None/Minimal/Significant]
- ETA for resolution: [timeframe]

Action Items:
- [ ] [Specific tasks]

Next Steps:
- [Resolution plan]
```

---

## 5. Post-Migration Verification Checklist

### Week 1 Monitoring

**Daily Checks:**
- [ ] Site uptime (should be 99.9%+)
- [ ] Form submissions working
- [ ] n8n webhook delivery rate
- [ ] Error rates in Vercel Analytics
- [ ] Google Analytics tracking
- [ ] Core Web Vitals scores

**Weekly Review:**
- [ ] Traffic patterns normalized
- [ ] SEO rankings maintained (check Google Search Console)
- [ ] No increase in bounce rate
- [ ] Conversion rates stable
- [ ] Page load times acceptable

### Month 1 Review

**Performance Metrics:**
- [ ] Average page load time < 3 seconds
- [ ] Lighthouse scores: Performance > 90, SEO > 95
- [ ] Core Web Vitals: All green
- [ ] Uptime: 99.9%+

**Business Metrics:**
- [ ] Lead volume unchanged or increased
- [ ] Contact form submissions stable
- [ ] Organic search traffic maintained
- [ ] No drop in conversion rate

---

## 6. Ongoing Maintenance Workflow

### Developer Workflow (You)

```bash
# Local Development
cd /Users/Q285389/Desktop/jedAI/ClaudeCode/HeizCenter-Website

# Make changes in Cursor/Claude Code
# Test locally:
npm run dev  # http://localhost:3000

# When ready to deploy:
git add .
git commit -m "feat: description of changes"
git push origin main

# Vercel auto-deploys to production
# Monitor deployment:
# https://vercel.com/heizcenter/heizcenter-website
```

### Recommended Git Workflow

```bash
# Use branching for larger features:
git checkout -b feature/new-service-page
# Make changes
# Test locally
git add .
git commit -m "feat: add new service page"
git push origin feature/new-service-page

# Create Pull Request on GitHub
# Review changes
# Merge to main → triggers Vercel production deployment

# For urgent fixes:
git checkout -b hotfix/contact-form-bug
# Fix issue
# Test locally and on Vercel preview
git push origin hotfix/contact-form-bug
# Quick review and merge
```

### Deployment Process

**Automatic Deployments:**
- Push to `main` → Vercel Production
- Push to any branch → Vercel Preview
- Pull Request → Vercel Preview with comment

**Manual Deployments (if needed):**
```bash
# Install Vercel CLI (one-time)
npm install -g vercel

# Link project (one-time)
cd /Users/Q285389/Desktop/jedAI/ClaudeCode/HeizCenter-Website
vercel link
# Follow prompts to link to HEIZcenter Vercel project

# Deploy to production:
vercel --prod

# Deploy to preview:
vercel
```

### Access Management

**GitHub Repository:**
- Client: Owner
- Developer (you): Write access
- Additional team members: Read or Write as needed

**Vercel Project:**
- Client: Owner
- Developer (you): Member with deploy permissions
- Grant access: Vercel Project Settings → Team → Invite

**Best Practice:**
```bash
# Use separate accounts, not shared credentials
# Enable 2FA on GitHub and Vercel
# Use environment variables for secrets
# Never commit API keys or passwords
```

---

## 7. Cost Analysis

### Vercel Pricing

**Hobby Plan (Free):**
- Suitable for: Low-traffic sites, testing
- Limits: 100GB bandwidth/month, 100 builds/day
- SSL: Free (Let's Encrypt)
- Preview deployments: Unlimited

**Pro Plan ($20/month - Recommended):**
- Unlimited bandwidth
- Commercial use allowed
- Advanced analytics
- Password protection for previews
- Team collaboration features
- Priority support

### Domain Costs

**Strato Domain Registration:**
- Keep domain registered with Strato (~€15-20/year)
- Just use for DNS pointing to Vercel
- Or transfer domain to Vercel (~$15/year) for simpler management

### Total Monthly Cost Estimate

| Item | Cost (Monthly) | Notes |
|------|----------------|-------|
| Vercel Pro | €20 | Recommended for production |
| Domain (Strato) | €1.50 | Keep or transfer |
| **Total** | **~€22/month** | Plus any n8n costs separately |

**Compared to old Strato hosting:**
- Strato web hosting: €10-30/month (estimate)
- Odoo hosting: Variable
- Migration saves complexity, improves performance

---

## 8. Troubleshooting Guide

### Issue: DNS not propagating

**Diagnosis:**
```bash
dig heizcenter.de
# If shows old IP after 4+ hours:
```

**Solution:**
- Check DNS TTL is low (300-3600)
- Verify correct DNS records in Strato
- Try flushing local DNS: `sudo killall -HUP mDNSResponder` (macOS)
- Wait longer (can take up to 48h in rare cases)
- Check Strato DNS nameservers are responding

### Issue: SSL certificate not issuing

**Diagnosis:**
```bash
# Vercel shows "Certificate Error" or "Pending"
```

**Solution:**
- Verify DNS is pointing to Vercel (A record = 76.76.21.21)
- Wait 10-30 minutes after DNS propagation
- Remove and re-add domain in Vercel
- Check for CAA DNS records blocking Let's Encrypt
- Contact Vercel support if persists > 1 hour

### Issue: Forms not submitting after migration

**Diagnosis:**
```bash
# Check browser console for errors
# Check Vercel function logs
# Check n8n webhook execution history
```

**Solution:**
- Verify environment variables in Vercel
- Check NEXT_PUBLIC_SITE_URL is set correctly
- Test n8n webhook URL manually (curl or Postman)
- Check CORS settings on n8n
- Review Vercel function logs for errors

### Issue: Images/assets not loading

**Diagnosis:**
```bash
# 404 errors on image URLs
# Check network tab in browser DevTools
```

**Solution:**
- Verify images are committed to git repo
- Check public folder structure matches expectations
- Review next.config.mjs for image domain settings
- Clear Vercel build cache and redeploy
- Check file paths are case-sensitive

### Issue: Environment variables not working

**Diagnosis:**
```bash
# Features work locally but not on Vercel
# "undefined" values in production
```

**Solution:**
- Verify env vars are set in Vercel Project Settings
- Check variable names match exactly (case-sensitive)
- Ensure NEXT_PUBLIC_ prefix for client-side variables
- Redeploy after adding new env vars
- Check correct environment scope (Production/Preview/Development)

---

## 9. Success Criteria

### Technical Metrics

- [ ] Site accessible at https://heizcenter.de
- [ ] SSL certificate valid (A+ on SSL Labs)
- [ ] 99.9%+ uptime (first month)
- [ ] Page load time < 3 seconds (desktop)
- [ ] Lighthouse scores: Performance > 90, SEO > 95
- [ ] Core Web Vitals: All green
- [ ] Zero critical errors in Vercel logs

### Business Metrics

- [ ] Lead volume maintained or increased
- [ ] Form submission rate unchanged
- [ ] Organic search traffic stable
- [ ] No increase in bounce rate
- [ ] Contact form to n8n pipeline working 100%

### Operational Metrics

- [ ] Developer can deploy updates easily
- [ ] Client has full ownership and control
- [ ] Documentation complete and accurate
- [ ] Team trained on new workflow
- [ ] Rollback plan tested (in staging)

---

## 10. Timeline Summary

| Phase | Duration | Activities | Downtime |
|-------|----------|------------|----------|
| **Preparation** | 1-2 days | Inventory, create accounts, backup | None |
| **Repo Migration** | 2-4 hours | Transfer repo, update remotes | None |
| **Vercel Setup** | 4-8 hours | Import project, configure, test preview | None |
| **DNS Prep** | 24 hours | Lower TTL, prepare records | None |
| **DNS Cutover** | 2-4 hours | Update DNS, monitor propagation | 5-30 min |
| **Validation** | 2-3 days | Testing, monitoring, verification | None |
| **Stabilization** | 7-14 days | Monitor, fix issues, optimize | None |
| **Cleanup** | Ongoing | Decommission old, documentation | None |

**Total Timeline:** 2-3 weeks from start to full completion
**Expected Downtime:** 5-30 minutes during DNS cutover

---

## 11. Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| DNS propagation delay | Medium | Low | Lower TTL 24h in advance, plan off-peak |
| SSL cert issuance failure | Low | Medium | Test on preview first, have Vercel support ready |
| Email delivery interruption | Low | High | Do NOT touch MX records, backup DNS config |
| Form submission failure | Low | High | Thorough testing on preview, n8n webhook verification |
| Search ranking drop | Very Low | High | No URL structure changes, maintain redirects |
| Unexpected downtime | Low | Medium | Have rollback plan ready, monitor closely |
| Cost overrun | Very Low | Low | Pro plan is fixed cost, bandwidth unlimited |

---

## 12. Support Contacts

### During Migration

**Vercel Support:**
- Enterprise support (if Pro plan): https://vercel.com/support
- Community: https://github.com/vercel/vercel/discussions

**Strato Support:**
- Phone: (Check Strato account for support number)
- Web: https://www.strato.de/faq

**Developer (You):**
- Available during cutover window
- Monitor for first 24-48 hours

### Post-Migration

**Vercel Issues:**
- Check status: https://www.vercel-status.com
- Support tickets via dashboard

**Domain/DNS Issues:**
- Strato support for DNS
- Vercel support for SSL/domain verification

**Application Issues:**
- Developer handles code/config issues
- n8n support for webhook problems

---

## 13. Final Pre-Migration Checklist

### 24 Hours Before

- [ ] All stakeholders notified of migration window
- [ ] Backups completed (database, files, DNS records)
- [ ] Vercel preview tested thoroughly
- [ ] Environment variables verified in Vercel
- [ ] DNS TTL lowered to 300 seconds
- [ ] Rollback plan documented and ready
- [ ] Support contacts available
- [ ] Monitoring tools configured

### 1 Hour Before

- [ ] Final test of Vercel preview URL
- [ ] Verify n8n webhooks responding
- [ ] Check Strato DNS management access
- [ ] Announce maintenance window (if applicable)
- [ ] Screenshot current DNS records
- [ ] Have Vercel DNS values ready to paste

### During Cutover

- [ ] Update A record in Strato DNS
- [ ] Update CNAME for www
- [ ] Start DNS propagation monitoring
- [ ] Monitor Vercel for SSL certificate issuance
- [ ] Test site as soon as DNS resolves
- [ ] Check form submissions to n8n

### Immediately After

- [ ] Verify https://heizcenter.de loads
- [ ] Test all critical user paths
- [ ] Confirm SSL certificate valid
- [ ] Check email still working (if using domain email)
- [ ] Monitor Vercel analytics for errors
- [ ] Verify n8n receiving leads
- [ ] Announce migration complete

---

## Appendix A: Vercel DNS Reference

### Required DNS Records

```
# Apex domain
Type: A
Name: @ (or blank)
Value: 76.76.21.21
TTL: 3600

# WWW subdomain
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

### Email Preservation (Strato Example)

```
# Keep these records unchanged:
Type: MX
Name: @
Value: mx01.strato.de
Priority: 10

Type: MX
Name: @
Value: mx02.strato.de
Priority: 20

Type: TXT
Name: @
Value: "v=spf1 include:_spf.strato.de ~all"
```

---

## Appendix B: Environment Variables Reference

```bash
# Production (.env for Vercel)
N8N_WEBHOOK_BASE_URL=https://heizcenter.app.n8n.cloud
NEXT_PUBLIC_SITE_URL=https://heizcenter.de
NEXT_PUBLIC_SITE_NAME=HeizCenter
NEXT_PUBLIC_CONTACT_EMAIL=info@heizcenter.de
NEXT_PUBLIC_CONTACT_PHONE=+49 8234 9665900

# Optional (if added later):
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GOOGLE_MAPS_KEY=AIza...
SENTRY_DSN=https://...
```

**Security Notes:**
- Never commit to git (use .env.local for local dev)
- Store securely in password manager
- Rotate API keys periodically
- Use Vercel's encrypted storage

---

## Appendix C: Testing Checklist Template

Copy this for each deployment test:

```markdown
## Deployment Test - [Date] - [Environment]

### Pre-Deployment
- [ ] Build succeeds locally
- [ ] No TypeScript errors
- [ ] No ESLint warnings
- [ ] Tests pass (if applicable)

### Functional Testing
- [ ] Homepage loads
- [ ] Navigation works
- [ ] All service pages load
- [ ] Location pages load
- [ ] Contact form submits
- [ ] n8n webhook receives data
- [ ] Quote form works
- [ ] Emergency contact works

### Technical Testing
- [ ] SSL certificate valid
- [ ] No console errors
- [ ] Images load correctly
- [ ] Mobile responsive
- [ ] Page speed acceptable (<3s)
- [ ] SEO meta tags present
- [ ] Structured data valid

### Analytics
- [ ] Google Analytics tracking
- [ ] Event tracking fires
- [ ] Conversion tracking works

### Notes
[Any issues or observations]
```

---

## Document Version

- **Version:** 1.0
- **Last Updated:** 2025-12-19
- **Author:** HEIZcenter Deployment Team
- **Next Review:** Post-migration (after completion)

---

## Quick Start Summary

**For the impatient developer:**

1. Create HEIZcenter Vercel account
2. Transfer GitHub repo to HEIZcenter
3. Import repo to Vercel, configure env vars
4. Test on preview URL thoroughly
5. Lower DNS TTL on Strato (wait 24h)
6. Update DNS A record to 76.76.21.21
7. Wait for propagation (1-4h)
8. Verify SSL and production site
9. Monitor for 7 days
10. Decommission old jedAI Vercel project

**Expected time:** 2-3 weeks total, ~30 min downtime

**Need help?** Contact Vercel support or refer to detailed sections above.
