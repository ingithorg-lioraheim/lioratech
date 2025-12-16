# COO-AGENT DEPLOYMENT GUIDE

**Created:** 2026-12-14
**Status:** Ready to deploy

---

## 🎯 DEPLOYMENT OPTIONS

### **RECOMMENDED: Cloudflare Tunnel (Best for your setup)**

Since the webhook receiver needs to save files to your Mac's filesystem, the best solution is to expose localhost securely using Cloudflare Tunnel.

**Why this is best:**
- ✅ Free
- ✅ No server needed
- ✅ Secure (no open ports)
- ✅ Files saved directly to your Mac
- ✅ Works with your existing setup

---

## 🚀 QUICK START: Cloudflare Tunnel

### Step 1: Install Cloudflare Tunnel

```bash
# Download cloudflared
cd ~/Downloads
curl -L https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-darwin-amd64.tgz -o cloudflared.tgz
tar -xzf cloudflared.tgz
chmod +x cloudflared
mv cloudflared /usr/local/bin/ || sudo mv cloudflared /usr/local/bin/
```

### Step 2: Login & Create Tunnel

```bash
# Login to Cloudflare (opens browser)
cloudflared tunnel login

# Create tunnel
cloudflared tunnel create coo-agent

# You'll get a tunnel ID, save it!
```

### Step 3: Configure Tunnel

Create config file: `~/.cloudflared/config.yml`

```yaml
tunnel: YOUR_TUNNEL_ID_HERE
credentials-file: /Users/ingithor/.cloudflared/YOUR_TUNNEL_ID.json

ingress:
  - hostname: coo.lioratech.is
    service: http://localhost:3001
  - service: http_status:404
```

### Step 4: Create DNS Record

```bash
cloudflared tunnel route dns coo-agent coo.lioratech.is
```

### Step 5: Start Tunnel

```bash
cloudflared tunnel run coo-agent
```

**Public URL:** `https://coo.lioratech.is/coo-agent/new-request`

---

## 🎯 ALTERNATIVE: Keep it Local (Simplest)

If you don't want to expose your Mac to the internet right now:

### Option: Email-Based Workflow

1. **n8n receives form**
   → Webhook at n8n cloud ✅

2. **n8n emails you the data**
   → You get JSON in email

3. **You save manually**
   → Copy JSON → save to `requests/pending/ORDER-ID.json`

4. **COO processes**
   → `./coo check` or `./coo watch`

**This works NOW with zero setup!**

---

## 📋 N8N WORKFLOW SETUP

### For Cloudflare Tunnel:

Update n8n HTTP Request node URL to:
```
https://coo.lioratech.is/coo-agent/new-request
```

### For Email-Based (Interim Solution):

Keep n8n workflow simple:
1. Webhook receives form
2. Generate Order ID
3. Email JSON to you at: `ingithorg@gmail.com`
4. You manually save to `requests/pending/`

---

## 🧪 TESTING

### Test Local Webhook:

```bash
curl -X POST http://localhost:3001/coo-agent/test
```

### Test Cloudflare Tunnel:

```bash
curl -X POST https://coo.lioratech.is/coo-agent/test
```

### Process Test Request:

```bash
cd /Users/ingithor/Downloads/lioratech---ai-ráðgjöf/coo-agent
./coo check
```

---

## 🔄 FULL AUTOMATION FLOW

```
Customer fills form at lioratech.is/roadmap
    ↓
n8n webhook receives (https://lioratech.app.n8n.cloud/webhook-test/roadmap-request)
    ↓
n8n generates Order ID
    ↓
n8n sends to: https://coo.lioratech.is/coo-agent/new-request
    ↓
Webhook receiver saves to: /Users/ingithor/Downloads/.../requests/pending/
    ↓
COO-Agent (running in watch mode) detects new file
    ↓
COO generates AI-greining (~1-3 minutes)
    ↓
Product saved: products/completed/ORDER-ID-Company-ai-greining.md
    ↓
CEO notification shown in terminal
    ↓
You review and send to customer
```

---

## 🎬 STARTUP COMMANDS

### Terminal 1: Webhook Receiver

```bash
cd /Users/ingithor/Downloads/lioratech---ai-ráðgjöf/coo-agent
node server/webhook-receiver.js
```

### Terminal 2: COO-Agent Watch Mode

```bash
cd /Users/ingithor/Downloads/lioratech---ai-ráðgjöf/coo-agent
./coo watch
```

### Terminal 3: Cloudflare Tunnel (if using)

```bash
cloudflared tunnel run coo-agent
```

---

## 📊 MONITORING

### Check Webhook Status:

```bash
curl http://localhost:3001/coo-agent/status
```

### Check COO Status:

```bash
cd /Users/ingithor/Downloads/lioratech---ai-ráðgjöf/coo-agent
./coo status
```

---

## 🆘 TROUBLESHOOTING

### Webhook not receiving requests:

1. Check webhook is running: `curl http://localhost:3001/`
2. Check Cloudflare tunnel is running
3. Check n8n workflow is active
4. Test with curl

### COO not processing:

1. Check `./coo watch` is running
2. Check `requests/pending/` for files
3. Run `./coo check` manually
4. Check for errors in terminal

---

## 💡 RECOMMENDED SETUP

**For Production:**

1. ✅ Cloudflare Tunnel → Secure, free, reliable
2. ✅ Webhook Receiver → Running on your Mac
3. ✅ COO Watch Mode → Auto-processing
4. ✅ n8n Workflow → Automated emails

**For Testing:**

1. ✅ Localhost webhook (port 3001)
2. ✅ Manual `./coo check`
3. ✅ Email-based workflow

---

**Ready to deploy? Pick one:**

1. **Cloudflare Tunnel** - Best for production (15 min setup)
2. **Email-based** - Quick start for testing (works now!)

What do you want to set up first?
