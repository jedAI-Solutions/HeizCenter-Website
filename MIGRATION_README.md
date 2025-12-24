# HEIZcenter Website Vercel Migration - Documentation Overview

## Purpose

This documentation package provides a complete guide for migrating the HEIZcenter website from the jedAI Vercel instance to a client-owned HEIZcenter Vercel instance, while migrating the domain from Strato to Vercel hosting.

## Migration Goals

**From:**
- Code maintained locally (Cursor/Claude Code)
- GitHub repository: jedAI-Solutions/HeizCenter-Website
- Deployment: jedAI Vercel account
- Domain: heizcenter.de hosted on Strato (old Odoo website)

**To:**
- Code still maintained locally (Cursor/Claude Code)
- GitHub repository: HEIZcenter/HeizCenter-Website (client-owned)
- Deployment: HEIZcenter Vercel account (client-owned)
- Domain: heizcenter.de pointing to Vercel (production Next.js site)
- Developer maintains deployment access

**Key Requirements:**
- Zero-downtime deployment strategy
- Preserve email functionality (MX records)
- Client ownership and control
- Developer can still deploy updates
- Rollback plan if issues arise

---

## Documentation Structure

### 1. MIGRATION_QUICK_START.md
**For:** Developers who want to get started immediately
**Contents:**
- TL;DR 10-step process
- Decision tree for key choices
- Phase-by-phase checklist
- Quick reference commands
- Success criteria

**Start here if you:** Want an executive summary and clear action items

### 2. VERCEL_MIGRATION_GUIDE.md
**For:** Complete step-by-step migration instructions
**Contents:**
- Architecture options analysis
- Detailed migration phases (8 phases)
- Rollback procedures
- Post-migration verification
- Ongoing maintenance workflow
- Cost analysis
- Troubleshooting guide
- 50+ pages of comprehensive guidance

**Use this for:** Full migration execution, troubleshooting, planning

### 3. MIGRATION_COMMANDS.md
**For:** Command-line reference during migration
**Contents:**
- Git commands (remote updates, branching, tagging)
- Vercel CLI commands (deployment, env vars, domains)
- DNS testing commands (dig, nslookup, curl)
- Environment setup scripts
- Testing scripts (pre-migration, post-DNS, production)
- Monitoring commands
- Backup and rollback commands

**Use this for:** Copy-paste commands during execution

### 4. DNS_CONFIGURATION_REFERENCE.md
**For:** DNS-specific configuration and troubleshooting
**Contents:**
- Current DNS configuration (Strato)
- Target DNS configuration (Vercel)
- Strato-specific DNS management guide
- Email preservation (MX records, SPF, DKIM)
- DNS verification commands
- Migration timeline with DNS states
- Common DNS issues and solutions
- DNS record types explained

**Use this for:** DNS changes, email preservation, DNS troubleshooting

---

## Quick Navigation

### I need to...

**Get started quickly**
→ Read: MIGRATION_QUICK_START.md
→ Time: 5 minutes

**Understand the full plan**
→ Read: VERCEL_MIGRATION_GUIDE.md (Sections 1-3)
→ Time: 20 minutes

**Execute the migration**
→ Use: MIGRATION_QUICK_START.md (checklists) + MIGRATION_COMMANDS.md (commands)
→ Time: 2-3 weeks (mostly waiting)

**Configure DNS**
→ Read: DNS_CONFIGURATION_REFERENCE.md
→ Use: MIGRATION_COMMANDS.md (DNS Testing section)
→ Time: 30 minutes active work, 24h waiting

**Troubleshoot issues**
→ Check: VERCEL_MIGRATION_GUIDE.md (Section 8: Troubleshooting)
→ Check: DNS_CONFIGURATION_REFERENCE.md (Common DNS Issues)
→ Time: Varies by issue

**Roll back if needed**
→ Follow: VERCEL_MIGRATION_GUIDE.md (Section 4: Rollback Plan)
→ Follow: MIGRATION_QUICK_START.md (Rollback Procedure)
→ Time: 5-15 minutes

---

## Migration Overview

### Architecture Decision: Transfer Repository

**Recommended approach:** Transfer GitHub repository to HEIZcenter ownership

**Rationale:**
- Clean client ownership
- Preserves complete git history
- Maintains existing workflows
- Professional presentation
- Developer remains collaborator

**Alternative:** Keep jedAI repo, connect to new Vercel (not recommended)

### Timeline Summary

```
Phase                   Duration        Downtime    Key Activities
-------------------------------------------------------------------------
1. Preparation          1-2 days        None        Accounts, backups, docs
2. Repo Migration       2-4 hours       None        Transfer GitHub repo
3. Vercel Setup         4-8 hours       None        Import, configure, test
4. DNS Preparation      24 hours        None        Lower TTL, wait
5. DNS Cutover          2-4 hours       5-30 min    Update DNS, propagate
6. Verification         2-3 days        None        Test, monitor, validate
7. Stabilization        7-14 days       None        Monitor, optimize
8. Cleanup              Ongoing         None        Decommission old setup

Total Timeline:         2-3 weeks
Active Work:            10-15 hours
Expected Downtime:      5-30 minutes
```

### Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| DNS propagation delay | Medium | Low | Lower TTL 24h early |
| SSL cert failure | Low | Medium | Test preview first |
| Email disruption | Low | High | Don't touch MX records |
| Form failure | Low | High | Thorough preview testing |
| Search ranking drop | Very Low | High | No URL changes |

### Cost Estimate

**Monthly:**
- Vercel Pro: $20/month
- Domain (Strato): ~$1.50/month
- **Total: ~$22/month**

**One-time:**
- Migration work: ~10-15 hours
- Testing: ~4-8 hours

---

## Key Decisions Required

### Before Starting Migration

**Decision 1: Repository Strategy**
- [  ] Transfer repo to HEIZcenter (recommended)
- [  ] Keep jedAI repo, different Vercel project

**Decision 2: Vercel Plan**
- [  ] Start with Pro plan ($20/month)
- [  ] Start with Hobby (free), upgrade later

**Decision 3: Access Management**
- Who needs GitHub access? ________________
- Who needs Vercel access? ________________

**Decision 4: Migration Timing**
- Proposed date: ________________
- Time window: _______ to _______ CET
- Backup date (if issues): ________________

**Decision 5: Stakeholder Communication**
- Who needs to be notified? ________________
- Communication plan: ________________

---

## Success Criteria

### Technical Success

- [  ] Site accessible at https://heizcenter.de
- [  ] SSL certificate valid (A+ rating)
- [  ] 99.9%+ uptime in first month
- [  ] Page load time < 3 seconds
- [  ] All forms working, n8n integration intact
- [  ] Core Web Vitals: All green
- [  ] Zero critical errors in production

### Business Success

- [  ] Lead volume maintained or increased
- [  ] Contact form submission rate unchanged
- [  ] Organic search traffic stable
- [  ] Email delivery working 100%
- [  ] No customer complaints about site

### Operational Success

- [  ] Client has full ownership and control
- [  ] Developer can deploy updates easily
- [  ] Documentation complete and accurate
- [  ] Team trained on new workflow
- [  ] Rollback plan tested (in preview environment)

---

## Critical Success Factors

### 1. Email Preservation

**Why critical:** HEIZcenter uses info@heizcenter.de, etc.
**How to preserve:**
- Do NOT modify MX records during DNS migration
- Verify MX records after DNS change
- Test email send/receive immediately after migration

**MX Records to preserve:**
```
MX  @  mx01.strato.de  Priority 10
MX  @  mx02.strato.de  Priority 20
```

### 2. n8n Webhook Integration

**Why critical:** Lead capture depends on n8n webhooks
**How to verify:**
- Test contact form on preview URL before DNS change
- Verify webhook delivery in n8n dashboard
- Test immediately after production deployment

**Environment variable:**
```
N8N_WEBHOOK_BASE_URL=https://heizcenter.app.n8n.cloud
```

### 3. Zero URL Changes

**Why critical:** Prevent SEO ranking loss
**How to ensure:**
- Vercel deploys same Next.js app
- All routes remain identical
- No redirect changes
- Same URL structure

### 4. Testing on Preview

**Why critical:** Catch issues before production
**How to test:**
- Test all critical user paths on preview URL
- Verify forms, navigation, images
- Check mobile responsiveness
- Test all service and location pages

### 5. DNS Propagation Understanding

**Why critical:** Manage expectations, prevent panic
**Key points:**
- TTL affects propagation speed
- Not all users switch at same time
- Can take 1-48 hours globally
- Lower TTL before migration (faster propagation)

---

## Pre-Migration Checklist

### Technical Preparation

```
[  ] Local development environment working
[  ] Can build project successfully (npm run build)
[  ] All tests passing (if applicable)
[  ] Git status clean, all changes committed
[  ] Environment variables documented
[  ] Current DNS records screenshotted
[  ] Vercel jedAI project settings documented
```

### Access Verification

```
[  ] Strato login verified
[  ] Can access Strato DNS management
[  ] GitHub admin access available (for repo transfer)
[  ] HEIZcenter email for Vercel signup
[  ] Payment method for Vercel Pro (if starting with Pro)
```

### Planning

```
[  ] Migration date chosen
[  ] Stakeholders notified
[  ] Low-traffic time window identified
[  ] Rollback plan reviewed
[  ] Testing checklist prepared
[  ] Monitoring plan ready
```

### Documentation

```
[  ] All migration docs read
[  ] Questions answered or noted
[  ] Team aligned on approach
[  ] Communication plan ready
```

---

## During Migration - Quick Reference

### Phase 1: DNS Preparation (24h before)

```bash
# Lower DNS TTL in Strato
# A record TTL: 86400 → 300
# CNAME TTL: 86400 → 300
# WAIT 24 HOURS
```

### Phase 2: DNS Cutover

```bash
# In Strato DNS:
# 1. Update A record
#    @ → 76.76.21.21
#
# 2. Update CNAME
#    www → cname.vercel-dns.com
#
# 3. VERIFY MX records UNCHANGED
```

### Phase 3: Monitor Propagation

```bash
# Watch DNS change
watch -n 10 'dig heizcenter.de +short'

# Check from multiple sources
dig @8.8.8.8 heizcenter.de +short
dig @1.1.1.1 heizcenter.de +short

# Online: https://www.whatsmydns.net/#A/heizcenter.de
```

### Phase 4: Verify Production

```bash
# Check site loads
curl -I https://heizcenter.de

# Check SSL
echo | openssl s_client -connect heizcenter.de:443 -servername heizcenter.de

# Test critical paths
curl https://heizcenter.de
curl https://heizcenter.de/leistungen/waermepumpe
curl https://heizcenter.de/kontakt
```

---

## Post-Migration - What to Monitor

### First 24 Hours

**Check every 2-4 hours:**
- Site uptime (should be 100%)
- Error rate in Vercel dashboard
- Form submissions working
- n8n webhook delivery
- Email send/receive
- DNS stability

**Red flags:**
- Site completely down
- Forms not submitting
- Email bouncing
- 500 errors in Vercel logs

### First Week

**Check daily:**
- Vercel Analytics (traffic patterns)
- Core Web Vitals scores
- Form submission rate
- Lead volume in n8n
- Error logs
- User feedback

**Green flags:**
- Traffic same as pre-migration
- No increase in bounce rate
- Forms converting at same rate
- No critical errors
- Users report no issues

### After 7 Days

**If all green flags:**
- Increase DNS TTL (300 → 3600)
- Decommission old jedAI Vercel project
- Archive migration documentation
- Celebrate success!

**If red flags persist:**
- Review rollback plan
- Consult troubleshooting guides
- Contact Vercel support
- Consider temporary rollback while fixing

---

## Rollback Decision Tree

### When to Roll Back

**Immediate rollback if:**
- Site completely unreachable for >30 minutes
- Email completely broken
- Critical data loss (forms not saving)
- Security breach or vulnerability

**Consider rollback if:**
- Form submission rate drops >50%
- Multiple critical errors
- Unable to diagnose issue quickly
- Stakeholder loss of confidence

**Do NOT rollback for:**
- Minor visual issues
- Slow DNS propagation (normal)
- Isolated user reports (cache issue)
- Non-critical 404s

### How to Roll Back

**Quick rollback (5-15 minutes):**
1. Login to Strato DNS
2. Change A record back to old IP (from backup)
3. Change CNAME back to old value
4. Monitor: `watch -n 10 'dig heizcenter.de +short'`
5. Verify old site loads

**See:** VERCEL_MIGRATION_GUIDE.md Section 4 for detailed rollback steps

---

## Common Questions

### Q: Will this affect our Google search rankings?

**A:** No, if executed correctly. The migration:
- Keeps all URLs identical
- Maintains same site structure
- Preserves metadata and schema markup
- Uses proper redirects (www → apex if configured)
- Results in faster load times (may improve rankings)

**Action:** Monitor Google Search Console for 2-4 weeks post-migration

### Q: What happens to our email during migration?

**A:** Email continues working normally if MX records are preserved. The migration changes where the website is hosted, but email hosting remains on Strato (unless you also migrate email, which this guide does not cover).

**Critical:** Do NOT modify MX records during DNS migration

### Q: How long will the website be down?

**A:** Expected downtime is 5-30 minutes during DNS propagation. Some users may see the old site for up to 4 hours depending on their DNS cache. This is why we lower TTL 24 hours in advance.

**Actual downtime:** Typically 10-15 minutes in practice

### Q: Can I test everything before going live?

**A:** Yes! Vercel creates preview URLs where you can test the entire site before changing DNS. This is a critical step and mandatory before DNS cutover.

**Preview URL example:** https://heizcenter-website-abc123.vercel.app

### Q: What if something goes wrong?

**A:** We have a comprehensive rollback plan that can revert DNS in 5-15 minutes, pointing back to the old Strato site. This is why we keep the old site running for 7-14 days after migration.

**See:** Rollback section in each guide

### Q: Who will have access after migration?

**A:**
- **GitHub:** Client is owner, developer is collaborator (Write access)
- **Vercel:** Client is owner, developer is team member
- **Domain:** Client maintains Strato account, developer can assist with DNS

**You (developer) retain the ability to deploy updates**

### Q: How much will this cost?

**A:** ~$22/month ongoing cost:
- Vercel Pro: $20/month (recommended for production)
- Domain: ~$2/month (stays with Strato)

**One-time costs:**
- Your time for migration: 10-15 hours
- No data migration fees
- No domain transfer fees (domain stays with Strato)

### Q: Can we roll back after the migration is complete?

**A:** Yes, within the first 7-14 days while old Strato site is still active. After old site is decommissioned, rollback would require restoring from backups.

**Recommendation:** Keep old Strato site for 30 days "just in case"

---

## Support and Resources

### During Migration

**Vercel Support:**
- Status: https://www.vercel-status.com
- Support: https://vercel.com/support (Pro plan has priority)
- Docs: https://vercel.com/docs

**Strato Support:**
- Login: https://www.strato.de
- FAQ: https://www.strato.de/faq
- Support: Via customer portal

**DNS Tools:**
- Propagation check: https://www.whatsmydns.net
- SSL test: https://www.ssllabs.com/ssltest
- DNS lookup: https://mxtoolbox.com

### After Migration

**Vercel Resources:**
- Analytics dashboard (monitor traffic)
- Deployment logs (debug issues)
- Edge function logs (if using)
- Community: https://github.com/vercel/vercel/discussions

**Next.js Resources:**
- Docs: https://nextjs.org/docs
- GitHub: https://github.com/vercel/next.js

---

## Getting Started

### Step 1: Read Quick Start

```bash
# Open and read
open MIGRATION_QUICK_START.md
# Time: 5 minutes
```

### Step 2: Make Decisions

Fill out the decision tree in MIGRATION_QUICK_START.md:
- Repository strategy
- Vercel plan
- Access management
- Migration timing

### Step 3: Review Full Guide

```bash
# Skim the comprehensive guide
open VERCEL_MIGRATION_GUIDE.md
# Time: 20-30 minutes
```

### Step 4: Prepare Commands

```bash
# Bookmark for copy-paste during migration
open MIGRATION_COMMANDS.md
```

### Step 5: Understand DNS

```bash
# Read DNS reference (especially if unfamiliar with DNS)
open DNS_CONFIGURATION_REFERENCE.md
# Time: 15-20 minutes
```

### Step 6: Begin Phase 1

Follow MIGRATION_QUICK_START.md Phase 1: Preparation
- Create accounts
- Document current setup
- Verify access

---

## Success Stories & Learnings

### What Usually Goes Well

- Vercel deployment (fast, reliable)
- DNS propagation (faster than expected with low TTL)
- SSL certificate issuance (automatic, 5-10 min)
- Preview testing catches most issues
- Developer workflow improves (easier deployments)

### Common Challenges

- Forgetting to lower TTL 24h early (leads to slow propagation)
- Not testing thoroughly on preview (issues found in production)
- Email verification skipped (panic when first email sent)
- Stakeholders not informed (confusion about changes)
- Documentation incomplete (team unsure of new workflow)

### Lessons Learned

1. **Lower TTL early** - Don't skip this step
2. **Test everything on preview** - No shortcuts
3. **Verify email immediately** - First thing after DNS change
4. **Monitor closely first 24h** - Catch issues early
5. **Document as you go** - Future you will thank you
6. **Keep old site longer** - Better safe than sorry
7. **Communicate proactively** - Reduce anxiety

---

## Conclusion

This migration guide provides everything you need to successfully migrate the HEIZcenter website from jedAI's Vercel instance to a client-owned setup while moving the domain from Strato to Vercel hosting.

**Key Takeaways:**
- Comprehensive documentation covers every scenario
- Zero-downtime migration is achievable
- Rollback plan ensures safety net
- Client gains ownership and control
- Developer maintains deployment access
- Cost-effective solution (~$22/month)

**Recommended Reading Order:**
1. This README (you're here)
2. MIGRATION_QUICK_START.md
3. VERCEL_MIGRATION_GUIDE.md
4. Bookmark MIGRATION_COMMANDS.md and DNS_CONFIGURATION_REFERENCE.md for reference

**Next Steps:**
1. Review all documentation
2. Make key decisions
3. Get stakeholder approval
4. Set migration date
5. Begin Phase 1

**Questions or Issues?**
- Review troubleshooting sections in guides
- Check Vercel documentation
- Contact Vercel support (for Vercel issues)
- Contact Strato support (for DNS/domain issues)

---

## Document Information

- **Version:** 1.0
- **Last Updated:** 2025-12-19
- **Author:** HEIZcenter Deployment Team
- **Purpose:** Overview and navigation for migration documentation
- **Package Contents:**
  - MIGRATION_README.md (this file)
  - MIGRATION_QUICK_START.md
  - VERCEL_MIGRATION_GUIDE.md
  - MIGRATION_COMMANDS.md
  - DNS_CONFIGURATION_REFERENCE.md

**Good luck with the migration!**
