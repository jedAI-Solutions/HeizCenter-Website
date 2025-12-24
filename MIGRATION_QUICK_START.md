# HEIZcenter Vercel Migration - Quick Start Guide

**For:** Developers who want to get started quickly
**Time to read:** 5 minutes
**Time to execute:** 2-3 weeks (mostly waiting for DNS propagation and stabilization)

---

## TL;DR - Migration in 10 Steps

1. **Create HEIZcenter Vercel account** (15 min)
2. **Transfer GitHub repo to HEIZcenter** (30 min)
3. **Import project to Vercel** (20 min)
4. **Configure environment variables** (15 min)
5. **Test on preview URL** (2-4 hours)
6. **Lower DNS TTL on Strato** (5 min, then wait 24h)
7. **Update DNS to point to Vercel** (10 min)
8. **Wait for DNS propagation** (1-4 hours)
9. **Verify everything works** (2-4 hours)
10. **Monitor for 7 days, then cleanup** (ongoing)

**Expected downtime:** 5-30 minutes during DNS cutover

---

## Pre-Flight Decision Tree

### Question 1: Who owns the GitHub repository?

**Current:** jedAI-Solutions/HeizCenter-Website

**Options:**
- **Transfer repo to HEIZcenter** ← Recommended (clean ownership)
- Keep jedAI repo, connect to different Vercel ← Not recommended

**Decision:** [  ] Transfer repo  [  ] Keep jedAI repo

### Question 2: What Vercel plan?

**Options:**
- **Hobby (Free):** $0/month, 100GB bandwidth, commercial use limited
- **Pro:** $20/month, unlimited bandwidth, commercial use allowed ← Recommended for production

**Decision:** [  ] Start with Hobby, upgrade later  [  ] Start with Pro

### Question 3: Who needs access?

**GitHub Access:**
- [  ] Client (owner)
- [  ] Developer (you) - Write access
- [  ] Other team members: _________________

**Vercel Access:**
- [  ] Client (owner)
- [  ] Developer (you) - Member
- [  ] Other team members: _________________

### Question 4: Email hosting?

**Current email hosting:** Likely Strato (info@heizcenter.de, etc.)

**Important:** DNS migration will NOT affect email if you preserve MX records

**Action needed:** [  ] Verify email is on Strato  [  ] Document MX records  [  ] Do NOT touch MX records during migration

### Question 5: When to migrate?

**Best time:**
- Low-traffic period (e.g., 2-4 AM CET)
- Mid-week (Tuesday-Thursday)
- Not during holidays or peak season

**Proposed migration window:** _________________

---

## Phase 1: Preparation (Day 1-2)

### Checklist: Account Setup

```
[  ] Create HEIZcenter Vercel account
    - Email: _________________
    - Plan: Hobby / Pro
    - GitHub connected

[  ] Create HEIZcenter GitHub organization (or use existing account)
    - Name: _________________
    - Owner: _________________

[  ] Verify access credentials
    - Strato login works
    - Can access DNS management
    - GitHub admin access available
```

### Checklist: Documentation

```
[  ] Screenshot current Strato DNS records
[  ] Document current Vercel environment variables (jedAI account)
[  ] Export .env.example from project
[  ] Document current site URLs and redirects
[  ] Note any custom Vercel configurations
```

### Checklist: Testing Environment

```
[  ] Local dev environment working (npm run dev)
[  ] Can build project successfully (npm run build)
[  ] Git status clean (no uncommitted changes)
[  ] Tests passing (if applicable)
```

---

## Phase 2: Repository Migration (Day 2-3)

### Option A: Transfer Existing Repo (Recommended)

**Preparation:**
```bash
# 1. Backup current repo state
cd /Users/Q285389/Desktop/jedAI/ClaudeCode/HeizCenter-Website
git tag backup-pre-migration-$(date +%Y%m%d)
git push origin --tags

# 2. Ensure all changes are pushed
git status  # Should show "working tree clean"
git push origin main
```

**Transfer (via GitHub UI):**
```
[  ] Login to GitHub as jedAI-Solutions admin
[  ] Go to: https://github.com/jedAI-Solutions/HeizCenter-Website/settings
[  ] Scroll to "Danger Zone"
[  ] Click "Transfer ownership"
[  ] New owner: [HEIZcenter organization/account name]
[  ] Confirm transfer
[  ] Verify repo now at: https://github.com/HEIZcenter/HeizCenter-Website
```

**Update Local Remote:**
```bash
cd /Users/Q285389/Desktop/jedAI/ClaudeCode/HeizCenter-Website
git remote set-url origin https://github.com/HEIZcenter/HeizCenter-Website.git
git remote -v  # Verify
git fetch origin
```

### Grant Developer Access

```
[  ] Client adds your GitHub username as collaborator
[  ] Role: Write or Maintain
[  ] Accept invitation
[  ] Test: Can you push to repo?
```

---

## Phase 3: Vercel Setup (Day 3-5)

### Import Project

**In HEIZcenter Vercel account:**
```
[  ] Click "Add New Project"
[  ] Select "Import Git Repository"
[  ] Choose: HEIZcenter/HeizCenter-Website
[  ] Configure:
    - Framework Preset: Next.js
    - Root Directory: ./
    - Build Command: npm run build
    - Output Directory: .next
    - Install Command: npm install
    - Node Version: 20.x
[  ] Do NOT add domain yet
[  ] Click "Deploy"
```

### Configure Environment Variables

**Add these in Vercel → Project Settings → Environment Variables:**

```
Variable Name                   Value                                      Environments
-----------------------------------------------------------------------------------------
N8N_WEBHOOK_BASE_URL           https://heizcenter.app.n8n.cloud           Production, Preview
NEXT_PUBLIC_SITE_URL           https://heizcenter.de                       Production
NEXT_PUBLIC_SITE_URL           https://[preview-url].vercel.app           Preview
NEXT_PUBLIC_SITE_NAME          HeizCenter                                  All
NEXT_PUBLIC_CONTACT_EMAIL      info@heizcenter.de                          All
NEXT_PUBLIC_CONTACT_PHONE      +49 8234 9665900                            All
```

**Checklist:**
```
[  ] All environment variables added
[  ] Correct environments selected (Production/Preview/Development)
[  ] No sensitive keys committed to git
[  ] Redeploy after adding env vars
```

### Test Preview Deployment

**Preview URL:** https://heizcenter-website-[random].vercel.app

**Test checklist:**
```
[  ] Homepage loads
[  ] All service pages load
    [  ] /leistungen/waermepumpe
    [  ] /leistungen/heizung
    [  ] /leistungen/sanitaer
    [  ] /leistungen/klimaanlage
    [  ] /leistungen/solar
[  ] Location pages load
    [  ] /standorte/bobingen
    [  ] /standorte/gutenzell-huerbel
[  ] Contact form submits
[  ] n8n webhook receives test lead
[  ] Emergency contact works
[  ] Quote form works
[  ] No console errors
[  ] Images load correctly
[  ] Mobile responsive
[  ] Page load time < 3 seconds
```

**If ANY tests fail:** Fix before proceeding to DNS migration

---

## Phase 4: DNS Preparation (Day 6)

### Lower TTL (24 Hours Before DNS Change)

**Login to Strato:**
```
[  ] Go to: https://www.strato.de
[  ] Login with customer credentials
[  ] Navigate to: Domains → heizcenter.de → DNS Settings
[  ] Switch to "Expert Mode" (if available)
```

**Change TTL for these records:**
```
Record Type    Host    Current Value              Old TTL    New TTL
------------------------------------------------------------------------
A              @       [OLD_IP]                   86400      300
CNAME          www     heizcenter.de              86400      300
```

**Important:**
```
[  ] Change ONLY the TTL, not the IP/values
[  ] Save changes
[  ] Screenshot confirmation
[  ] Set calendar reminder for 24 hours from now
```

### Verify TTL Change

**After 5-10 minutes:**
```bash
dig heizcenter.de | grep -i ttl
# Should show TTL: 300
```

---

## Phase 5: DNS Migration (Day 7 - Migration Day)

### Pre-Migration Checklist

**Morning of migration:**
```
[  ] 24+ hours passed since TTL change
[  ] Vercel preview site fully tested
[  ] All stakeholders notified
[  ] Rollback plan ready
[  ] Strato login verified
[  ] Low-traffic time window planned: [__:__] to [__:__] CET
```

### Add Domain to Vercel

**In Vercel → Project Settings → Domains:**
```
[  ] Click "Add Domain"
[  ] Enter: heizcenter.de
[  ] Click "Add"
[  ] Note DNS requirements shown:
    A record: @ → 76.76.21.21
[  ] Also add: www.heizcenter.de
[  ] Note CNAME requirement:
    CNAME: www → cname.vercel-dns.com
```

**Do NOT click "Verify" yet** - DNS still points to old server

### Backup Current DNS

```bash
# Save current DNS configuration
dig heizcenter.de ANY +noall +answer > dns-backup-$(date +%Y%m%d).txt
dig www.heizcenter.de ANY +noall +answer >> dns-backup-$(date +%Y%m%d).txt
cat dns-backup-*.txt  # Review backup
```

**Also screenshot all Strato DNS records**

### Update DNS in Strato

**Time:** [__:__] CET (your planned migration window)

**Step 1: Update A record**
```
[  ] Login to Strato DNS management
[  ] Find A record for @ (apex domain)
[  ] Click "Edit"
[  ] Change:
    Type: A (don't change)
    Host: @ (don't change)
    Points to: 76.76.21.21  ← NEW VALUE
    TTL: 300 (already set)
[  ] Save
[  ] Screenshot confirmation
```

**Step 2: Update CNAME for www**
```
[  ] Find CNAME record for www
[  ] Click "Edit"
[  ] Change:
    Type: CNAME (don't change)
    Host: www (don't change)
    Points to: cname.vercel-dns.com  ← NEW VALUE
    TTL: 300 (already set)
[  ] Save
[  ] Screenshot confirmation
```

**Step 3: Verify email records UNTOUCHED**
```
[  ] MX record 1: @ → mx01.strato.de (Priority 10) - NOT CHANGED
[  ] MX record 2: @ → mx02.strato.de (Priority 20) - NOT CHANGED
[  ] SPF record: "v=spf1 include:_spf.strato.de ~all" - NOT CHANGED
```

### Monitor DNS Propagation

**Start monitoring immediately:**
```bash
# Terminal 1: Monitor DNS
watch -n 10 'dig heizcenter.de +short'

# Expected: Will change from [OLD_IP] to 76.76.21.21
```

**Timeline expectations:**
- First change visible: 5-10 minutes
- 50% propagation: 30-60 minutes
- 90% propagation: 2-4 hours
- Full global propagation: 4-24 hours

**Check from multiple DNS servers:**
```bash
dig @8.8.8.8 heizcenter.de +short     # Google DNS
dig @1.1.1.1 heizcenter.de +short     # Cloudflare DNS
dig @208.67.222.222 heizcenter.de +short  # OpenDNS
```

**Online tools:**
- https://www.whatsmydns.net/#A/heizcenter.de
- https://dnschecker.org/#A/heizcenter.de

### Verify SSL Certificate

**After DNS propagates to Vercel's nameservers (5-15 min):**

```
[  ] In Vercel → Domains → heizcenter.de
[  ] Status should change from "Invalid Configuration" to "Valid Configuration"
[  ] SSL Certificate: "Certificate issued" (may take 5-10 min)
[  ] If stuck on "Pending": Wait 30 min, then contact Vercel support
```

**Test SSL in browser:**
```bash
# Should show green padlock
open https://heizcenter.de
```

---

## Phase 6: Post-Migration Verification (Day 7-8)

### Immediate Verification (Within 1 Hour)

**DNS Tests:**
```bash
[  ] dig heizcenter.de +short
    → Should return: 76.76.21.21

[  ] dig www.heizcenter.de +short
    → Should return: cname.vercel-dns.com

[  ] dig heizcenter.de MX
    → Should show: mx01.strato.de and mx02.strato.de
```

**Website Tests:**
```
[  ] https://heizcenter.de loads (200 OK)
[  ] https://www.heizcenter.de redirects/loads correctly
[  ] SSL certificate valid (green padlock)
[  ] No browser console errors
[  ] Homepage renders correctly
```

### Comprehensive Testing (2-4 Hours)

**Run full test suite:**
```bash
cd /Users/Q285389/Desktop/jedAI/ClaudeCode/HeizCenter-Website
./test-production.sh  # If you created this script
```

**Or manual checklist:**
```
Critical Paths:
[  ] Homepage: https://heizcenter.de
[  ] Service pages (all 5)
[  ] Location pages (both)
[  ] Contact page: /kontakt
[  ] Emergency page: /notdienst

Forms:
[  ] Contact form submits
[  ] n8n webhook receives lead
[  ] Email notification sent
[  ] Quote form works
[  ] Emergency contact works

Technical:
[  ] All images load
[  ] Navigation works
[  ] Mobile responsive
[  ] No 404 errors
[  ] Page speed acceptable
[  ] Google Analytics tracking (if enabled)

SEO:
[  ] Meta tags present
[  ] Structured data valid
[  ] Sitemap accessible: /sitemap.xml
[  ] robots.txt correct: /robots.txt
```

### Email Verification

**CRITICAL - Test immediately:**
```
[  ] Send test email TO: info@heizcenter.de
[  ] Receive test email FROM: info@heizcenter.de
[  ] Check spam folder if not received
[  ] Verify email signatures/formatting intact
```

**If email fails:**
```bash
# Check MX records
dig heizcenter.de MX

# Should show:
# heizcenter.de. 300 IN MX 10 mx01.strato.de.
# heizcenter.de. 300 IN MX 20 mx02.strato.de.

# If missing, ADD THEM BACK IMMEDIATELY in Strato DNS
```

---

## Phase 7: Monitoring (Day 7-14)

### Daily Checks (First Week)

**Day 1-3:**
```
[  ] Check uptime (Vercel dashboard)
[  ] Review error logs
[  ] Verify form submissions working
[  ] Check n8n webhook delivery
[  ] Monitor DNS stability
[  ] Test email send/receive
```

**Day 4-7:**
```
[  ] Review Vercel Analytics
[  ] Check Core Web Vitals
[  ] Monitor traffic patterns
[  ] Verify SEO rankings maintained
[  ] Check for any 404/500 errors
```

### Weekly Review (Week 2)

```
[  ] Traffic comparison (vs pre-migration)
[  ] Conversion rate check
[  ] Lead volume comparison
[  ] Performance metrics review
[  ] Error rate analysis
[  ] User feedback collection
```

### Increase DNS TTL (After 7 Days Stable)

**If everything stable:**
```
[  ] Login to Strato DNS
[  ] Change TTL for A record: 300 → 3600
[  ] Change TTL for CNAME: 300 → 3600
[  ] Save changes
```

---

## Phase 8: Cleanup (Day 14+)

### Decommission Old jedAI Vercel Project

**Only after confirming new site stable for 7+ days:**

```
[  ] In jedAI Vercel account
[  ] Navigate to old HEIZcenter project
[  ] Settings → Advanced → Archive Project
[  ] Confirm archive
[  ] Remove old domain connections (if any)
[  ] Document for future reference
```

**Note:** Keep jedAI Vercel account active (may have other projects)

### Update Documentation

```
[  ] Update README.md with new repo URL
[  ] Update deployment docs with Vercel info
[  ] Document new workflow for team
[  ] Archive migration docs for reference
[  ] Update any external documentation
```

### Archive Old Strato Site (Optional)

**If decommissioning Strato hosting:**
```
[  ] Backup old website files (FTP/SFTP)
[  ] Export any databases
[  ] Create archive ZIP
[  ] Store securely for records
[  ] Cancel Strato hosting (keep domain registration!)
```

**KEEP:**
- Domain registration on Strato
- Email hosting (if using @heizcenter.de addresses)
- DNS management (still using Strato nameservers)

---

## Rollback Procedure (If Things Go Wrong)

### When to Rollback

**Rollback if:**
- Site completely down for >30 minutes
- Critical functionality broken (forms, lead capture)
- Email delivery stopped
- Unable to resolve issues quickly

### Quick Rollback Steps

**1. Revert DNS in Strato (5 minutes):**
```
[  ] Login to Strato DNS
[  ] Change A record:
    @ → [OLD_STRATO_IP from backup]
[  ] Change CNAME:
    www → heizcenter.de (or old value)
[  ] Save immediately
```

**2. Monitor rollback:**
```bash
watch -n 10 'dig heizcenter.de +short'
# Should return to old IP within 5-15 minutes
```

**3. Verify old site working:**
```bash
curl -I https://heizcenter.de
# Should return 200 OK from old Strato site
```

**4. Communicate:**
```
[  ] Notify stakeholders of rollback
[  ] Document issue encountered
[  ] Plan fix and re-attempt migration
```

---

## Success Criteria

### Technical Metrics

```
[  ] Site uptime: 99.9%+
[  ] Page load time: < 3 seconds
[  ] Lighthouse Performance: > 90
[  ] Lighthouse SEO: > 95
[  ] Core Web Vitals: All green
[  ] Zero critical errors in logs
[  ] SSL Grade: A or A+
```

### Business Metrics

```
[  ] Lead volume: Maintained or increased
[  ] Contact form submissions: Same rate
[  ] Organic search traffic: Maintained
[  ] Bounce rate: No increase
[  ] Conversion rate: Stable
```

### Operational Metrics

```
[  ] Developer can deploy easily
[  ] Client has full ownership
[  ] Team trained on new workflow
[  ] Documentation complete
[  ] Rollback plan tested
```

---

## Ongoing Maintenance Workflow

### Daily Development

```bash
# Make changes locally
cd /Users/Q285389/Desktop/jedAI/ClaudeCode/HeizCenter-Website

# Test locally
npm run dev

# Commit and push
git add .
git commit -m "feat: description"
git push origin main

# Vercel auto-deploys to production
# Monitor: https://vercel.com/heizcenter/heizcenter-website
```

### Feature Development (Using Branches)

```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes, test locally
npm run dev

# Commit and push
git add .
git commit -m "feat: new feature"
git push origin feature/new-feature

# Vercel creates preview deployment
# Review preview URL in GitHub PR

# Merge to main when ready
# → Auto-deploys to production
```

### Emergency Hotfix

```bash
# Create hotfix branch
git checkout -b hotfix/critical-issue

# Fix issue
# Test locally

# Commit and push
git add .
git commit -m "fix: critical issue"
git push origin hotfix/critical-issue

# Quick review, merge to main
# Vercel deploys immediately
```

---

## Cost Breakdown

### Monthly Costs

```
Service                 Plan        Cost/Month    Notes
----------------------------------------------------------------------
Vercel                 Pro         $20           Recommended for production
Domain (Strato)        .de         ~$1.50        Keep for DNS/email
Email (Strato)         Basic       Included      If using Strato email
----------------------------------------------------------------------
TOTAL                              ~$22/month
```

### Annual Costs

```
Service                 Cost/Year   Notes
----------------------------------------------------------------------
Vercel Pro             $240        Unlimited bandwidth
Domain Registration    ~$18        .de domain renewal
----------------------------------------------------------------------
TOTAL                  ~$258/year
```

**Compared to old setup:**
- Simpler infrastructure
- Better performance
- Easier maintenance
- Client ownership

---

## Quick Reference

### Essential Commands

```bash
# Check DNS
dig heizcenter.de +short

# Test website
curl -I https://heizcenter.de

# Deploy to Vercel
vercel --prod

# View logs
vercel logs --prod

# Update git remote
git remote set-url origin https://github.com/HEIZcenter/HeizCenter-Website.git
```

### Essential Links

```
GitHub Repo:          https://github.com/HEIZcenter/HeizCenter-Website
Vercel Dashboard:     https://vercel.com/heizcenter
Strato DNS:           https://www.strato.de/apps/CustomerService
DNS Propagation:      https://www.whatsmydns.net/#A/heizcenter.de
SSL Test:             https://www.ssllabs.com/ssltest/analyze.html?d=heizcenter.de
```

### Support Contacts

```
Vercel Support:       https://vercel.com/support
Strato Support:       Via customer portal
Developer (You):      [Your contact info]
```

---

## Timeline At-a-Glance

```
Day 1-2:   Preparation (accounts, documentation)
Day 2-3:   Repository migration
Day 3-5:   Vercel setup and testing
Day 6:     Lower DNS TTL, wait 24h
Day 7:     DNS cutover (30 min downtime expected)
Day 7-8:   Post-migration verification
Day 7-14:  Monitoring and stabilization
Day 14+:   Cleanup and optimization

Total: 2-3 weeks from start to finish
Active work: ~10-15 hours
Downtime: 5-30 minutes
```

---

## Next Steps

1. **Review full migration guide:** VERCEL_MIGRATION_GUIDE.md
2. **Study DNS details:** DNS_CONFIGURATION_REFERENCE.md
3. **Prepare commands:** MIGRATION_COMMANDS.md
4. **Make a decision:** Fill out decision tree above
5. **Set timeline:** Choose migration date
6. **Get approvals:** Notify stakeholders
7. **Start Phase 1:** Account setup

---

## Document Information

- **Version:** 1.0
- **Last Updated:** 2025-12-19
- **Purpose:** Quick-start guide for HEIZcenter Vercel migration
- **Related Docs:**
  - VERCEL_MIGRATION_GUIDE.md (comprehensive guide)
  - MIGRATION_COMMANDS.md (command reference)
  - DNS_CONFIGURATION_REFERENCE.md (DNS details)

**Questions?** Review the comprehensive guide or contact Vercel support.

**Ready to start?** Begin with Phase 1: Preparation.

Good luck with the migration!
