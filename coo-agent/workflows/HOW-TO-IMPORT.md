# 📥 How to Import Email Workflow into n8n

## Quick 3-Step Import

### Step 1: Open n8n
Go to: https://lioratech.app.n8n.cloud

### Step 2: Import Workflow
1. Click **"+ Add workflow"** (top right)
2. Click the **"..." menu** (three dots)
3. Select **"Import from File"**
4. Choose file: `n8n-email-workflow.json` (from this folder)
5. Click **"Import"**

### Step 3: Activate Workflow
1. Workflow will open automatically
2. Click the **toggle switch** at the top to activate it
3. You'll see "Workflow active" ✅

---

## ✅ That's It!

Now the workflow is live and ready to receive requests from your form!

**Test it:**
1. Go to: https://lioratech.is/roadmap
2. Fill out the form
3. Submit
4. Check your email: **ingithorg@gmail.com**
5. You should receive an email with the JSON to copy-paste

---

## 📧 What Happens Next

When a customer fills the form:

1. ✅ n8n receives the form data
2. ✅ n8n generates Order ID (e.g., `AI-2026-12-14-X4J2K9`)
3. ✅ n8n sends **YOU** an email with:
   - All customer info
   - JSON ready to copy-paste
   - Step-by-step instructions
4. ✅ n8n sends **CUSTOMER** confirmation email
5. 👉 **YOU** copy-paste JSON to terminal (5 seconds)
6. ✅ COO processes automatically

---

## 🧪 Test Without Real Form

You can test the workflow directly in n8n:

1. Open the workflow
2. Click on **"Webhook - Form Submit"** node
3. Click **"Listen for Test Event"**
4. In another tab, submit the form at lioratech.is/roadmap
5. n8n will capture the data
6. Click **"Execute Workflow"** to test

---

## 🆘 Troubleshooting

**Not receiving emails?**
- Check workflow is **active** (toggle at top)
- Check Gmail node has correct credentials
- Check spam folder

**Form not reaching n8n?**
- Check webhook URL matches in form code
- Should be: `https://lioratech.app.n8n.cloud/webhook-test/roadmap-request`

---

**Ready? Import the workflow now and let's test it! 🚀**
