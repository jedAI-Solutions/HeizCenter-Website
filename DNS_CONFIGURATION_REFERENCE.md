# DNS Configuration Reference for HEIZcenter Migration

## Overview

This document provides DNS configuration details for migrating heizcenter.de from Strato to Vercel hosting while preserving email functionality.

---

## Current DNS Configuration (Strato - Before Migration)

### To Document Before Making Changes

**CRITICAL: Before changing ANY DNS records, document your current configuration:**

1. Login to Strato customer portal
2. Navigate to: Domains → heizcenter.de → DNS Settings
3. Take screenshots of ALL DNS records
4. Export or manually document each record

**Expected Current Records (Example):**

```
Type    Host    Value                       TTL     Notes
----------------------------------------------------------------------
A       @       [OLD_STRATO_IP]            86400   Website server
CNAME   www     heizcenter.de              86400   WWW redirect
MX      @       mx01.strato.de             86400   Email server (primary)
MX      @       mx02.strato.de             86400   Email server (secondary)
TXT     @       "v=spf1 ..."               86400   Email authentication
TXT     _dmarc  "v=DMARC1; ..."           86400   Email policy
```

**Save this information securely** - you'll need it for rollback if required.

---

## Target DNS Configuration (Vercel - After Migration)

### Required Changes

#### Step 1: Lower TTL (24 Hours Before DNS Change)

**Why:** Ensures faster propagation when you make the actual change.

```
Type    Host    Value                       TTL     Action
----------------------------------------------------------------------
A       @       [KEEP_CURRENT_VALUE]       300     CHANGE TTL ONLY
CNAME   www     [KEEP_CURRENT_VALUE]       300     CHANGE TTL ONLY
```

**DO NOT change the IP/values yet** - only change TTL from 86400 to 300.

#### Step 2: Production DNS Records (During Migration)

```
Type    Host    Value                       TTL     Priority
----------------------------------------------------------------------
A       @       76.76.21.21                300     -
CNAME   www     cname.vercel-dns.com       300     -
```

**CRITICAL - Do NOT Change These Records:**
```
Type    Host    Value                       TTL     Priority
----------------------------------------------------------------------
MX      @       mx01.strato.de             300     10
MX      @       mx02.strato.de             300     20
TXT     @       "v=spf1 ..."               300     -
TXT     _dmarc  "v=DMARC1; ..."           300     -
```

#### Step 3: Increase TTL After Stabilization (7 Days Post-Migration)

Once the migration is stable for 7+ days:

```
Type    Host    Value                       TTL     Priority
----------------------------------------------------------------------
A       @       76.76.21.21                3600    -
CNAME   www     cname.vercel-dns.com       3600    -
MX      @       mx01.strato.de             3600    10
MX      @       mx02.strato.de             3600    20
```

---

## Strato-Specific DNS Management Guide

### How to Access Strato DNS Management

1. Go to: https://www.strato.de
2. Click "Login" (top right)
3. Enter customer number and password
4. Navigate to: **"Domains & SSL"**
5. Find **heizcenter.de** in domain list
6. Click **"Manage"** or **"DNS Settings"**

### Strato DNS Interface

**Typical Strato Interface Options:**
- **Expert Mode:** Shows all record types (recommended)
- **Wizard Mode:** Simplified interface (avoid for this migration)

**Switch to Expert Mode** to see all DNS records.

### How to Edit DNS Records in Strato

#### Edit A Record

1. Find the A record for **@** (apex domain)
2. Click **"Edit"** or pencil icon
3. Change:
   - **Type:** A (don't change)
   - **Host:** @ or blank (don't change)
   - **Points to:** 76.76.21.21
   - **TTL:** 300
4. Click **"Save"** or **"Update"**

#### Edit CNAME Record

1. Find the CNAME record for **www**
2. Click **"Edit"**
3. Change:
   - **Type:** CNAME (don't change)
   - **Host:** www (don't change)
   - **Points to:** cname.vercel-dns.com
   - **TTL:** 300
4. Click **"Save"**

#### Verify Email Records (DO NOT EDIT)

1. Find MX records - should have:
   - mx01.strato.de (Priority 10)
   - mx02.strato.de (Priority 20)
2. **DO NOT modify these** unless you're also migrating email

---

## DNS Verification Commands

### Check Current DNS Configuration

```bash
# Check apex domain
dig heizcenter.de

# Expected output BEFORE migration:
# heizcenter.de.  300  IN  A  [OLD_STRATO_IP]

# Expected output AFTER migration:
# heizcenter.de.  300  IN  A  76.76.21.21
```

```bash
# Check www subdomain
dig www.heizcenter.de

# Expected output BEFORE migration:
# www.heizcenter.de.  300  IN  CNAME  heizcenter.de.

# Expected output AFTER migration:
# www.heizcenter.de.  300  IN  CNAME  cname.vercel-dns.com.
```

```bash
# Check email records (should NOT change)
dig heizcenter.de MX

# Expected output (BOTH before and after):
# heizcenter.de.  300  IN  MX  10 mx01.strato.de.
# heizcenter.de.  300  IN  MX  20 mx02.strato.de.
```

### Monitor DNS Propagation

```bash
# Check from multiple DNS servers
dig @8.8.8.8 heizcenter.de +short        # Google DNS
dig @1.1.1.1 heizcenter.de +short        # Cloudflare DNS
dig @208.67.222.222 heizcenter.de +short # OpenDNS
dig @9.9.9.9 heizcenter.de +short        # Quad9 DNS

# All should return: 76.76.21.21 (after propagation)
```

### Check TTL

```bash
# Check current TTL value
dig heizcenter.de | grep -i ttl

# Output shows TTL (Time To Live) in seconds
# 300 = 5 minutes
# 3600 = 1 hour
# 86400 = 24 hours
```

---

## Email Preservation Details

### Why Email Records Matter

HEIZcenter likely uses email addresses like:
- info@heizcenter.de
- admin@heizcenter.de
- [name]@heizcenter.de

These are typically hosted by Strato. **If you delete MX records, email stops working.**

### Required Email DNS Records

#### MX Records (Mail Exchange)

```
Type    Host    Value               TTL     Priority
--------------------------------------------------------------
MX      @       mx01.strato.de      300     10
MX      @       mx02.strato.de      300     20
```

**What these mean:**
- **Priority 10** (primary): Email delivered here first
- **Priority 20** (backup): If primary fails, try this

#### SPF Record (Sender Policy Framework)

```
Type    Host    Value                                   TTL
--------------------------------------------------------------
TXT     @       "v=spf1 include:_spf.strato.de ~all"   300
```

**What this does:** Prevents email spoofing, tells recipients that Strato is authorized to send email for heizcenter.de

#### DMARC Record (Domain-based Message Authentication)

```
Type    Host    Value                                           TTL
--------------------------------------------------------------
TXT     _dmarc  "v=DMARC1; p=none; rua=mailto:admin@..."       300
```

**What this does:** Email authentication policy, helps prevent phishing

#### DKIM Record (DomainKeys Identified Mail)

May appear as:
```
Type    Host                    Value                   TTL
--------------------------------------------------------------
TXT     default._domainkey     "v=DKIM1; k=rsa; p=..." 300
```

**What this does:** Cryptographic signature for emails sent from domain

### Email Verification After DNS Change

```bash
# Test email delivery
echo "Test email after DNS migration" | mail -s "DNS Test" info@heizcenter.de

# Check MX records are still correct
dig heizcenter.de MX

# Verify SPF record
dig heizcenter.de TXT | grep spf
```

**If email stops working after DNS change:**
1. Check MX records are present and correct
2. Verify SPF record is intact
3. Check Strato email hosting is still active
4. Contact Strato support if issues persist

---

## Vercel DNS Requirements

### What Vercel Needs

Vercel requires one of the following configurations:

#### Option 1: A Record (Recommended for apex domain)

```
Type    Host    Value           TTL
--------------------------------------
A       @       76.76.21.21    300-3600
```

**Pros:**
- Faster DNS resolution
- Works with apex domain
- Standard configuration

#### Option 2: CNAME Flattening (Some DNS providers)

```
Type    Host    Value                   TTL
----------------------------------------------
CNAME   @       cname.vercel-dns.com   300-3600
```

**Note:** Strato may not support CNAME for apex domain. Use A record instead.

### WWW Subdomain

```
Type    Host    Value                   TTL
----------------------------------------------
CNAME   www     cname.vercel-dns.com   300-3600
```

**This is required** for www.heizcenter.de to work.

### Vercel IP Addresses

**Current Vercel IPv4:** 76.76.21.21

**Note:** Vercel uses anycast, so this IP is global. It may change in future - Vercel will notify customers.

**For IPv6 support (optional):**
```
Type    Host    Value                               TTL
--------------------------------------------------------------
AAAA    @       2606:4700:3030::6815:1715          300-3600
```

---

## Migration Timeline with DNS States

### T-24h: Preparation Phase

**DNS State:** Still pointing to old Strato server

```
A       @       [OLD_STRATO_IP]    300  ← TTL lowered
CNAME   www     heizcenter.de      300  ← TTL lowered
```

**Actions:**
- Lower TTL to 300 seconds
- Wait 24 hours for old TTL to expire globally

### T-0h: DNS Cutover (Migration Window)

**DNS State:** Changing to Vercel

```
A       @       76.76.21.21            300  ← NEW IP
CNAME   www     cname.vercel-dns.com   300  ← NEW TARGET
```

**Actions:**
- Update A record in Strato DNS
- Update CNAME record in Strato DNS
- Start monitoring propagation

### T+1h: Early Propagation

**Expected:** 60-80% of global DNS servers updated

```bash
# Test propagation
dig heizcenter.de +short
# Should return: 76.76.21.21

# Check globally
# https://www.whatsmydns.net/#A/heizcenter.de
```

### T+4h: Late Propagation

**Expected:** 95-99% of global DNS servers updated

**Actions:**
- Verify SSL certificate issued by Vercel
- Test website functionality
- Confirm email still working

### T+7d: Stabilization Complete

**DNS State:** Increase TTL for better performance

```
A       @       76.76.21.21            3600  ← TTL increased
CNAME   www     cname.vercel-dns.com   3600  ← TTL increased
```

---

## Common DNS Issues and Solutions

### Issue: DNS Not Propagating

**Symptoms:**
- dig still shows old IP after 2+ hours
- Some users see new site, others see old

**Solutions:**
1. Verify you saved changes in Strato DNS panel
2. Check TTL is low (300 seconds)
3. Clear local DNS cache:
   ```bash
   # macOS
   sudo killall -HUP mDNSResponder

   # Windows
   ipconfig /flushdns

   # Linux
   sudo systemd-resolve --flush-caches
   ```
4. Wait longer - can take up to 48 hours in rare cases

### Issue: WWW Not Working

**Symptoms:**
- heizcenter.de works
- www.heizcenter.de does not work

**Solutions:**
1. Verify CNAME record for www exists
2. Check CNAME points to cname.vercel-dns.com
3. Wait for DNS propagation
4. Verify in Vercel dashboard that both domains are added

### Issue: SSL Certificate Not Issuing

**Symptoms:**
- "Your connection is not private" error
- Certificate error in browser

**Solutions:**
1. Verify DNS A record points to 76.76.21.21
2. Wait 10-30 minutes for Vercel to issue certificate
3. Check Vercel dashboard: Domains → heizcenter.de → Certificate status
4. Remove and re-add domain in Vercel if needed
5. Ensure no CAA DNS records blocking Let's Encrypt

### Issue: Email Stopped Working

**Symptoms:**
- Cannot send/receive email
- Email bounces with "DNS error"

**Solutions:**
1. **Immediately** check MX records:
   ```bash
   dig heizcenter.de MX
   ```
2. If MX records missing, add them back:
   ```
   MX  @  mx01.strato.de  10
   MX  @  mx02.strato.de  20
   ```
3. Verify SPF record:
   ```bash
   dig heizcenter.de TXT | grep spf
   ```
4. Contact Strato support if email still not working

---

## DNS Testing Checklist

### Pre-Migration DNS Test

```
[ ] Current A record documented (IP address saved)
[ ] Current CNAME for www documented
[ ] MX records documented
[ ] SPF record documented
[ ] TTL lowered to 300 seconds
[ ] 24 hours elapsed since TTL change
```

### Post-Migration DNS Test

```
[ ] dig heizcenter.de returns 76.76.21.21
[ ] dig www.heizcenter.de returns cname.vercel-dns.com
[ ] dig heizcenter.de MX shows Strato mail servers
[ ] https://heizcenter.de loads correctly
[ ] https://www.heizcenter.de redirects or loads correctly
[ ] SSL certificate valid (green padlock in browser)
[ ] Email send/receive test successful
[ ] No DNS errors in browser console
```

### Global Propagation Test

```
[ ] Check from Germany (local ISP DNS)
[ ] Check from Google DNS (8.8.8.8)
[ ] Check from Cloudflare DNS (1.1.1.1)
[ ] Check via online tool: whatsmydns.net
[ ] Verify from mobile network (not WiFi)
[ ] Verify from different location/network
```

---

## Rollback DNS Configuration

### Emergency Rollback (If Migration Fails)

**Immediate action required if:**
- Site completely down for >30 minutes
- Critical functionality broken
- Email stopped working

**Rollback Steps:**

1. **Login to Strato DNS immediately**

2. **Restore A record to old value:**
   ```
   Type    Host    Value               TTL
   -------------------------------------------
   A       @       [OLD_STRATO_IP]    300
   ```

3. **Restore CNAME for www:**
   ```
   Type    Host    Value               TTL
   -------------------------------------------
   CNAME   www     heizcenter.de      300
   ```

4. **Verify MX records still intact:**
   ```bash
   dig heizcenter.de MX
   # Should show mx01.strato.de and mx02.strato.de
   ```

5. **Monitor rollback:**
   ```bash
   watch -n 10 'dig heizcenter.de +short'
   # Should return old IP within 5-15 minutes
   ```

6. **Test old site:**
   ```bash
   curl -I https://heizcenter.de
   # Should return 200 OK from old Strato site
   ```

**Timeline for rollback:**
- DNS change in Strato: Immediate
- Propagation start: 5-10 minutes
- Most users affected: 5-15 minutes
- Full global propagation: 1-4 hours

---

## Contact Information

### DNS Support

**Strato DNS Support:**
- Website: https://www.strato.de/faq/domains
- Support: Contact via customer portal
- Phone: (Check Strato account for support number)

**Vercel DNS Support:**
- Documentation: https://vercel.com/docs/custom-domains
- Support: https://vercel.com/support (for Pro accounts)
- Status: https://www.vercel-status.com

### Useful DNS Tools

**DNS Propagation Check:**
- https://www.whatsmydns.net
- https://dnschecker.org

**DNS Lookup:**
- https://mxtoolbox.com
- https://www.digwebinterface.com

**SSL Certificate Check:**
- https://www.ssllabs.com/ssltest
- https://www.sslshopper.com/ssl-checker.html

---

## Appendix: DNS Record Types Explained

### A Record (Address Record)

**Purpose:** Maps domain name to IPv4 address

**Example:**
```
heizcenter.de → 76.76.21.21
```

**When to use:** For apex domain (heizcenter.de)

### CNAME Record (Canonical Name)

**Purpose:** Maps domain name to another domain name

**Example:**
```
www.heizcenter.de → cname.vercel-dns.com → 76.76.21.21
```

**When to use:** For subdomains (www, blog, shop, etc.)

**Limitation:** Cannot be used for apex domain in most DNS systems

### MX Record (Mail Exchange)

**Purpose:** Specifies mail servers for domain

**Example:**
```
heizcenter.de → mx01.strato.de (Priority 10)
heizcenter.de → mx02.strato.de (Priority 20)
```

**When to use:** For email delivery

### TXT Record (Text Record)

**Purpose:** Stores text information for various uses

**Common uses:**
- SPF: Email sender verification
- DMARC: Email authentication policy
- DKIM: Email signature
- Domain verification (Google, etc.)

### TTL (Time To Live)

**Purpose:** How long DNS record is cached

**Common values:**
- 300 (5 minutes): For frequent changes, migrations
- 3600 (1 hour): Standard for active sites
- 86400 (24 hours): For stable, rarely-changing records

**Migration strategy:**
- Lower TTL before migration (fast propagation)
- Raise TTL after stabilization (better performance)

---

## Document Information

- **Version:** 1.0
- **Last Updated:** 2025-12-19
- **Purpose:** DNS configuration reference for HEIZcenter Vercel migration
- **Related:** VERCEL_MIGRATION_GUIDE.md, MIGRATION_COMMANDS.md
