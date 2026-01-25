# Resend Email Setup Guide

Resend is an API-based email service that works perfectly with Railway (no SMTP blocking issues).

## Quick Setup

### Step 1: Create a Resend Account
1. Go to [Resend](https://resend.com/) and sign up
2. Free tier: 3,000 emails/month, 100 emails/day

### Step 2: Get Your API Key
1. In Resend dashboard, go to **API Keys**
2. Click **Create API Key**
3. Name it (e.g., "Railway AI Platform")
4. Copy the API key (starts with `re_`)

### Step 3: Verify Your Domain (Optional but Recommended)
1. Go to **Domains** in Resend dashboard
2. Click **Add Domain**
3. Add your domain (e.g., `yourdomain.com`)
4. Add the DNS records Resend provides to your domain's DNS settings
5. Wait for verification (usually a few minutes)

**Note**: You can also use Resend's test domain for testing, but it's limited.

### Step 4: Add Environment Variables in Railway

In your Railway project dashboard:
1. Go to your service → **Variables** tab
2. Add these environment variables:

```
RESEND_API_KEY=re_your_api_key_here
RESEND_FROM=noreply@yourdomain.com
```

**Important**: 
- `RESEND_FROM` must be a verified domain in Resend
- If you haven't verified a domain, you can use Resend's test domain: `onboarding@resend.dev` (for testing only)

### Step 5: Redeploy

Railway will automatically redeploy when you add environment variables.

## Environment Variables

### Required:
- `RESEND_API_KEY` - Your Resend API key (starts with `re_`)

### Optional:
- `RESEND_FROM` - Email address to send from (must be verified in Resend)
- `EMAIL_FROM` - Alternative (will use this if `RESEND_FROM` is not set)

## Testing

After deployment:
1. Use any of the three tools (Skills Gap Analyzer, Learning Path Generator, or Job Skills Translator)
2. Generate results
3. Enter an email address and click "Send"
4. Check the recipient's inbox (and spam folder)

## Why Resend Works on Railway

- **API-based**: Uses HTTP API, not SMTP
- **No port blocking**: Railway doesn't block HTTP/HTTPS requests
- **Reliable**: Built for cloud platforms
- **Fast**: No connection timeouts
- **Simple**: Just an API key, no complex SMTP configuration

## Troubleshooting

### "Invalid API key"
- Verify your `RESEND_API_KEY` is correct
- Make sure it starts with `re_`
- Check if the key is active in Resend dashboard

### "Domain not verified"
- The `RESEND_FROM` email domain must be verified in Resend
- Go to Resend dashboard → Domains to verify
- Or use `onboarding@resend.dev` for testing (limited)

### "Email not received"
- Check spam folder
- Verify the recipient email is correct
- Check Resend dashboard → Logs for delivery status
- Free tier has rate limits (100 emails/day)

## Resend vs SMTP

| Feature | Resend (API) | SMTP |
|---------|--------------|------|
| Works on Railway | ✅ Yes | ❌ Blocked |
| Setup Complexity | Simple | Complex |
| Configuration | API key only | Host, port, user, pass |
| Reliability | High | Depends on provider |
| Rate Limits | 3,000/month free | Varies |

## Support

- **Resend Docs**: https://resend.com/docs
- **Resend Support**: https://resend.com/support
- **Resend Status**: https://status.resend.com

