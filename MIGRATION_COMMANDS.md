# HEIZcenter Migration - Command Reference

Quick reference for all commands needed during the migration process.

## Table of Contents
1. [Git Commands](#git-commands)
2. [Vercel CLI Commands](#vercel-cli-commands)
3. [DNS Testing Commands](#dns-testing-commands)
4. [Environment Setup](#environment-setup)
5. [Testing Scripts](#testing-scripts)

---

## Git Commands

### Check Current Setup
```bash
# Navigate to project
cd /Users/Q285389/Desktop/jedAI/ClaudeCode/HeizCenter-Website

# Check current remote
git remote -v

# Check current branch
git branch -a

# View recent commits
git log --oneline -10

# Check git status
git status
```

### Update Remote After Transfer
```bash
# Option 1: Update existing remote URL
git remote set-url origin https://github.com/HEIZcenter/HeizCenter-Website.git

# Option 2: Remove and add new remote
git remote remove origin
git remote add origin https://github.com/HEIZcenter/HeizCenter-Website.git

# Verify change
git remote -v

# Test connection
git fetch origin

# Push to new remote (if needed)
git push -u origin main
```

### Branch Workflow
```bash
# Create feature branch
git checkout -b feature/description

# Make changes, then:
git add .
git commit -m "feat: description of changes"
git push origin feature/description

# Create hotfix branch
git checkout -b hotfix/critical-fix
git add .
git commit -m "fix: critical issue description"
git push origin hotfix/critical-fix

# Return to main
git checkout main
git pull origin main
```

### Tag Releases
```bash
# Create version tag before migration
git tag -a v1.0.0-pre-migration -m "Version before Vercel migration"
git push origin v1.0.0-pre-migration

# Create tag after successful migration
git tag -a v1.0.0 -m "Production on HEIZcenter Vercel"
git push origin v1.0.0

# List all tags
git tag -l
```

---

## Vercel CLI Commands

### Installation
```bash
# Install Vercel CLI globally
npm install -g vercel

# Verify installation
vercel --version

# Login to Vercel
vercel login
# Enter HEIZcenter Vercel account email
```

### Project Setup
```bash
# Navigate to project
cd /Users/Q285389/Desktop/jedAI/ClaudeCode/HeizCenter-Website

# Link to Vercel project (one-time setup)
vercel link
# Select:
# - Scope: HEIZcenter (or correct account name)
# - Link to existing project: Yes
# - Project: HeizCenter-Website

# Verify link
cat .vercel/project.json
```

### Deployment Commands
```bash
# Deploy to preview (automatic preview URL)
vercel

# Deploy to preview with specific name
vercel --name test-migration

# Deploy to production
vercel --prod

# Deploy specific branch
git checkout feature/new-feature
vercel  # Creates preview for this branch
```

### Environment Variables
```bash
# List all environment variables
vercel env ls

# Add environment variable
vercel env add VARIABLE_NAME
# Follow prompts to set value and environments

# Pull environment variables to local
vercel env pull .env.local

# Remove environment variable
vercel env rm VARIABLE_NAME
```

### Project Management
```bash
# View project details
vercel inspect

# List all deployments
vercel ls

# View logs for specific deployment
vercel logs [deployment-url]

# View logs for production
vercel logs --prod

# Rollback to previous deployment
vercel rollback [deployment-url]

# Promote preview to production
vercel promote [deployment-url]
```

### Domain Management
```bash
# Add domain to project
vercel domains add heizcenter.de

# Add www subdomain
vercel domains add www.heizcenter.de

# List domains
vercel domains ls

# Remove domain
vercel domains rm heizcenter.de

# Check domain configuration
vercel domains inspect heizcenter.de
```

---

## DNS Testing Commands

### Basic DNS Queries
```bash
# Check A record for apex domain
dig heizcenter.de

# Check A record with specific DNS server
dig @8.8.8.8 heizcenter.de      # Google DNS
dig @1.1.1.1 heizcenter.de      # Cloudflare DNS
dig @9.9.9.9 heizcenter.de      # Quad9 DNS

# Check CNAME for www
dig www.heizcenter.de

# Short answer only
dig heizcenter.de +short
dig www.heizcenter.de +short

# Check all DNS records
dig heizcenter.de ANY
```

### Advanced DNS Diagnostics
```bash
# Check nameservers
dig heizcenter.de NS

# Check MX records (email)
dig heizcenter.de MX

# Check TXT records (SPF, DKIM, etc.)
dig heizcenter.de TXT

# Check SOA record (domain authority)
dig heizcenter.de SOA

# Trace DNS resolution path
dig heizcenter.de +trace
```

### DNS Propagation Testing
```bash
# Check DNS from multiple servers (requires nslookup)
nslookup heizcenter.de 8.8.8.8
nslookup heizcenter.de 1.1.1.1
nslookup heizcenter.de 208.67.222.222  # OpenDNS

# Continuous monitoring (check every 5 seconds)
watch -n 5 'dig heizcenter.de +short'

# Check TTL (Time To Live)
dig heizcenter.de | grep -i ttl
```

### SSL/TLS Testing
```bash
# Check SSL certificate
openssl s_client -connect heizcenter.de:443 -servername heizcenter.de

# Check SSL certificate expiry
echo | openssl s_client -connect heizcenter.de:443 -servername heizcenter.de 2>/dev/null | openssl x509 -noout -dates

# Verify SSL chain
openssl s_client -connect heizcenter.de:443 -servername heizcenter.de -showcerts
```

### HTTP/HTTPS Testing
```bash
# Check HTTP response
curl -I http://heizcenter.de

# Check HTTPS response
curl -I https://heizcenter.de

# Follow redirects
curl -IL https://www.heizcenter.de

# Test specific endpoint
curl https://heizcenter.de/api/health

# Check response time
curl -w "Time: %{time_total}s\n" -o /dev/null -s https://heizcenter.de
```

---

## Environment Setup

### Local Development Environment
```bash
# Navigate to project
cd /Users/Q285389/Desktop/jedAI/ClaudeCode/HeizCenter-Website

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Edit environment variables
# Use your editor to add values to .env.local

# Start development server
npm run dev

# Open in browser
open http://localhost:3000
```

### Production Environment Variables
```bash
# Create .env.production.local (for reference only, not committed)
cat > .env.production.local << EOF
N8N_WEBHOOK_BASE_URL=https://heizcenter.app.n8n.cloud
NEXT_PUBLIC_SITE_URL=https://heizcenter.de
NEXT_PUBLIC_SITE_NAME=HeizCenter
NEXT_PUBLIC_CONTACT_EMAIL=info@heizcenter.de
NEXT_PUBLIC_CONTACT_PHONE=+49 8234 9665900
EOF

# IMPORTANT: Do NOT commit this file
# Add to .gitignore if not already there
echo ".env.production.local" >> .gitignore
```

### Vercel Environment Variables Setup
```bash
# Add all production variables at once
vercel env add N8N_WEBHOOK_BASE_URL production
# Enter: https://heizcenter.app.n8n.cloud

vercel env add NEXT_PUBLIC_SITE_URL production preview
# Enter: https://heizcenter.de

vercel env add NEXT_PUBLIC_SITE_NAME production preview development
# Enter: HeizCenter

vercel env add NEXT_PUBLIC_CONTACT_EMAIL production preview development
# Enter: info@heizcenter.de

vercel env add NEXT_PUBLIC_CONTACT_PHONE production preview development
# Enter: +49 8234 9665900
```

---

## Testing Scripts

### Pre-Migration Test Script
```bash
#!/bin/bash
# save as: test-pre-migration.sh

echo "=== Pre-Migration Test ==="
echo ""

echo "1. Checking git status..."
git status
echo ""

echo "2. Checking current remote..."
git remote -v
echo ""

echo "3. Checking current DNS..."
dig heizcenter.de +short
echo ""

echo "4. Testing local build..."
npm run build
echo ""

echo "5. Checking environment variables..."
if [ -f .env.local ]; then
  echo ".env.local exists"
  grep -v '^#' .env.local | grep -v '^$' | wc -l | xargs echo "Variables defined:"
else
  echo "WARNING: .env.local not found"
fi
echo ""

echo "=== Pre-Migration Test Complete ==="
```

### Post-DNS-Change Test Script
```bash
#!/bin/bash
# save as: test-post-dns.sh

DOMAIN="heizcenter.de"
EXPECTED_IP="76.76.21.21"

echo "=== Post-DNS Change Test ==="
echo ""

echo "1. Checking DNS propagation..."
CURRENT_IP=$(dig $DOMAIN +short | head -n1)
echo "Current IP: $CURRENT_IP"
echo "Expected IP: $EXPECTED_IP"

if [ "$CURRENT_IP" = "$EXPECTED_IP" ]; then
  echo "✓ DNS propagated successfully"
else
  echo "✗ DNS not yet propagated (this may take time)"
fi
echo ""

echo "2. Checking WWW subdomain..."
dig www.$DOMAIN +short
echo ""

echo "3. Testing HTTPS..."
curl -I https://$DOMAIN | head -n1
echo ""

echo "4. Checking SSL certificate..."
echo | openssl s_client -connect $DOMAIN:443 -servername $DOMAIN 2>/dev/null | openssl x509 -noout -issuer -subject
echo ""

echo "5. Testing homepage..."
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" https://$DOMAIN)
echo "HTTP Status: $HTTP_STATUS"
if [ "$HTTP_STATUS" = "200" ]; then
  echo "✓ Homepage accessible"
else
  echo "✗ Homepage not accessible"
fi
echo ""

echo "=== Post-DNS Test Complete ==="
```

### Comprehensive Production Test Script
```bash
#!/bin/bash
# save as: test-production.sh

DOMAIN="heizcenter.de"
BASE_URL="https://$DOMAIN"

echo "=== Comprehensive Production Test ==="
echo ""

# Array of critical paths
PATHS=(
  "/"
  "/leistungen/waermepumpe"
  "/leistungen/heizung"
  "/leistungen/sanitaer"
  "/leistungen/klimaanlage"
  "/leistungen/solar"
  "/standorte/bobingen"
  "/standorte/gutenzell-huerbel"
  "/kontakt"
  "/notdienst"
)

echo "Testing critical pages..."
for path in "${PATHS[@]}"; do
  URL="$BASE_URL$path"
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" -L "$URL")

  if [ "$STATUS" = "200" ]; then
    echo "✓ $path (Status: $STATUS)"
  else
    echo "✗ $path (Status: $STATUS)"
  fi
done
echo ""

echo "Testing redirects..."
WWW_REDIRECT=$(curl -s -o /dev/null -w "%{redirect_url}" "https://www.$DOMAIN")
echo "www.$DOMAIN redirects to: $WWW_REDIRECT"
echo ""

echo "Testing API endpoints..."
# Add any API endpoints you have
# curl -s "$BASE_URL/api/health" | jq .
echo ""

echo "=== Production Test Complete ==="
```

### Make scripts executable
```bash
chmod +x test-pre-migration.sh
chmod +x test-post-dns.sh
chmod +x test-production.sh
```

### Run tests
```bash
# Before migration
./test-pre-migration.sh

# After DNS change
./test-post-dns.sh

# After migration complete
./test-production.sh
```

---

## Monitoring Commands

### Real-time Monitoring During Migration
```bash
# Terminal 1: Watch DNS propagation
watch -n 10 'dig heizcenter.de +short'

# Terminal 2: Monitor Vercel deployments
watch -n 30 'vercel ls | head -n 10'

# Terminal 3: Check website status
watch -n 30 'curl -s -o /dev/null -w "Status: %{http_code}, Time: %{time_total}s\n" https://heizcenter.de'
```

### Log Monitoring
```bash
# Stream production logs
vercel logs --prod --follow

# Check last 100 log entries
vercel logs --prod | tail -n 100

# Filter for errors
vercel logs --prod | grep -i error

# Check specific time range
vercel logs --prod --since 2024-01-01
```

### Performance Testing
```bash
# Basic load time
time curl -s https://heizcenter.de > /dev/null

# Detailed timing
curl -w "@curl-format.txt" -o /dev/null -s https://heizcenter.de

# Create curl-format.txt:
cat > curl-format.txt << EOF
    time_namelookup:  %{time_namelookup}s\n
       time_connect:  %{time_connect}s\n
    time_appconnect:  %{time_appconnect}s\n
   time_pretransfer:  %{time_pretransfer}s\n
      time_redirect:  %{time_redirect}s\n
 time_starttransfer:  %{time_starttransfer}s\n
                    ----------\n
         time_total:  %{time_total}s\n
EOF
```

---

## Emergency Rollback Commands

### Quick DNS Rollback
```bash
# IMPORTANT: Only use if you have the old IP address

# Get current DNS (before making changes)
OLD_IP=$(dig heizcenter.de +short)
echo "Current IP: $OLD_IP"
echo "Save this value!"

# During rollback, you'll manually change DNS in Strato to:
# A record: @ → [OLD_IP from above]

# Monitor rollback propagation
watch -n 10 'dig heizcenter.de +short'
```

### Vercel Deployment Rollback
```bash
# List recent deployments
vercel ls

# Rollback to previous deployment
vercel rollback [deployment-url-from-list]

# Alternative: Promote specific deployment
vercel promote [previous-working-deployment-url]

# Verify current production
vercel ls | grep PRODUCTION
```

---

## Backup Commands

### Pre-Migration Backups
```bash
# Backup DNS records (manual - take screenshots)
# Go to Strato DNS management and screenshot all records

# Backup current git state
git tag backup-pre-migration-$(date +%Y%m%d)
git push origin --tags

# Backup environment variables
vercel env pull .env.backup
# Store securely, do NOT commit

# Backup vercel.json (if exists)
if [ -f vercel.json ]; then
  cp vercel.json vercel.json.backup
fi
```

### Export DNS Records (for reference)
```bash
# Export all DNS records to file
dig heizcenter.de ANY +noall +answer > dns-backup-$(date +%Y%m%d).txt
dig www.heizcenter.de ANY +noall +answer >> dns-backup-$(date +%Y%m%d).txt

# Store securely
```

---

## Verification Checklist Script

```bash
#!/bin/bash
# save as: verify-migration.sh

echo "=== Migration Verification Checklist ==="
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

check_pass() {
  echo -e "${GREEN}✓${NC} $1"
}

check_fail() {
  echo -e "${RED}✗${NC} $1"
}

# DNS Checks
echo "DNS Verification:"
DNS_IP=$(dig heizcenter.de +short | head -n1)
if [ "$DNS_IP" = "76.76.21.21" ]; then
  check_pass "DNS points to Vercel (76.76.21.21)"
else
  check_fail "DNS not pointing to Vercel (Current: $DNS_IP)"
fi

WWW_DNS=$(dig www.heizcenter.de +short | grep vercel)
if [ ! -z "$WWW_DNS" ]; then
  check_pass "WWW subdomain configured"
else
  check_fail "WWW subdomain not configured"
fi
echo ""

# SSL Checks
echo "SSL Verification:"
SSL_CHECK=$(echo | openssl s_client -connect heizcenter.de:443 -servername heizcenter.de 2>/dev/null | grep "Verify return code: 0")
if [ ! -z "$SSL_CHECK" ]; then
  check_pass "SSL certificate valid"
else
  check_fail "SSL certificate issues"
fi
echo ""

# HTTP Checks
echo "HTTP Verification:"
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" https://heizcenter.de)
if [ "$HTTP_STATUS" = "200" ]; then
  check_pass "Homepage returns 200 OK"
else
  check_fail "Homepage returns $HTTP_STATUS"
fi

REDIRECT_STATUS=$(curl -s -o /dev/null -w "%{http_code}" https://www.heizcenter.de)
if [ "$REDIRECT_STATUS" = "200" ] || [ "$REDIRECT_STATUS" = "301" ] || [ "$REDIRECT_STATUS" = "308" ]; then
  check_pass "WWW redirect working"
else
  check_fail "WWW redirect issues (Status: $REDIRECT_STATUS)"
fi
echo ""

# Performance
echo "Performance Check:"
LOAD_TIME=$(curl -w "%{time_total}" -o /dev/null -s https://heizcenter.de)
LOAD_TIME_INT=$(echo "$LOAD_TIME" | cut -d. -f1)
if [ "$LOAD_TIME_INT" -lt 3 ]; then
  check_pass "Load time acceptable ($LOAD_TIME seconds)"
else
  check_fail "Load time slow ($LOAD_TIME seconds)"
fi
echo ""

echo "=== Verification Complete ==="
```

```bash
# Make it executable
chmod +x verify-migration.sh

# Run it
./verify-migration.sh
```

---

## Quick Reference Card

### Most Common Commands

```bash
# Check where DNS points
dig heizcenter.de +short

# Check website status
curl -I https://heizcenter.de

# Deploy to Vercel preview
vercel

# Deploy to production
vercel --prod

# View production logs
vercel logs --prod

# Update git remote
git remote set-url origin https://github.com/HEIZcenter/HeizCenter-Website.git

# Push to new repo
git push origin main

# Check Vercel deployments
vercel ls
```

### Emergency Contacts

```bash
# Vercel Status
# https://www.vercel-status.com

# DNS Propagation Check
# https://www.whatsmydns.net/#A/heizcenter.de

# SSL Test
# https://www.ssllabs.com/ssltest/analyze.html?d=heizcenter.de
```

---

## Document Info

- **Version:** 1.0
- **Last Updated:** 2025-12-19
- **Companion to:** VERCEL_MIGRATION_GUIDE.md
