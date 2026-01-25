# Railway Email Configuration Guide

This guide explains how to configure email sending for your AI Association Platform deployed on Railway using your own SMTP server.

## Custom SMTP Configuration (Recommended)

Use your own email server or hosting provider's SMTP service.

### Step 1: Get SMTP Credentials

You'll need SMTP credentials from your email provider. Common providers:

- **Your hosting provider** (cPanel, Plesk, etc.)
- **Your domain email** (if you have email hosting)
- **Office 365 / Microsoft 365**
- **Google Workspace** (Gmail for business)
- **Any SMTP server** you have access to

### Step 2: SMTP Settings

You'll typically need:
- **SMTP Host**: e.g., `smtp.yourdomain.com`, `mail.yourdomain.com`, `smtp.office365.com`
- **SMTP Port**: Usually `587` (TLS) or `465` (SSL)
- **SMTP Username**: Your email address or SMTP username
- **SMTP Password**: Your email password or SMTP password
- **From Email**: The email address to send from (should match your SMTP user)

### Step 3: Add Environment Variables in Railway

In your Railway project dashboard:
1. Go to your service → **Variables** tab
2. Add these environment variables:

```
SMTP_HOST=smtp.yourdomain.com
SMTP_PORT=587
SMTP_USER=your-email@yourdomain.com
SMTP_PASS=your-email-password
SMTP_SECURE=false
EMAIL_FROM=noreply@yourdomain.com
```

**Notes:**
- `SMTP_PORT`: Use `587` for TLS or `465` for SSL
- `SMTP_SECURE`: Set to `true` for SSL (port 465), `false` for TLS (port 587)
- `EMAIL_FROM`: Should match or be related to `SMTP_USER`
- `SMTP_REJECT_UNAUTHORIZED`: Optional, set to `false` if you have self-signed certificates

### Step 4: Common SMTP Providers

#### Office 365 / Microsoft 365
```
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_USER=your-email@yourdomain.com
SMTP_PASS=your-password
SMTP_SECURE=false
EMAIL_FROM=your-email@yourdomain.com
```

#### Google Workspace (Gmail for Business)
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@yourdomain.com
SMTP_PASS=your-app-password
SMTP_SECURE=false
EMAIL_FROM=your-email@yourdomain.com
```

**Note:** For Google Workspace, you may need to:
1. Enable 2-Step Verification
2. Create an App Password in your Google Account settings
3. Use the App Password instead of your regular password

#### cPanel / Hosting Provider
```
SMTP_HOST=mail.yourdomain.com
SMTP_PORT=587
SMTP_USER=your-email@yourdomain.com
SMTP_PASS=your-email-password
SMTP_SECURE=false
EMAIL_FROM=your-email@yourdomain.com
```

#### Custom SMTP Server
```
SMTP_HOST=your-smtp-server.com
SMTP_PORT=587
SMTP_USER=your-username
SMTP_PASS=your-password
SMTP_SECURE=false
EMAIL_FROM=noreply@yourdomain.com
```

### Step 5: Redeploy

Railway will automatically redeploy when you add environment variables, or you can manually trigger a redeploy.

---

## Gmail (Personal Account - Testing Only)

**Note:** This is for personal Gmail accounts and testing only. Not recommended for production.

### Setup:
1. Enable 2-Step Verification in your Google Account
2. Go to Google Account → Security → App Passwords
3. Create an app password for "Mail"
4. Add to Railway:

```
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-16-char-app-password
EMAIL_FROM=your-email@gmail.com
```

---

## Required Environment Variables

### Always Required:
- `GEMINI_API_KEY` - Your Google Gemini API key
- `PORT` - Automatically set by Railway (don't override)

### For Email (Custom SMTP):
- `SMTP_HOST` - Your SMTP server hostname
- `SMTP_PORT` - SMTP port (usually 587 or 465)
- `SMTP_USER` - SMTP username (usually your email)
- `SMTP_PASS` - SMTP password
- `EMAIL_FROM` - Email address to send from
- `SMTP_SECURE` - `true` for SSL (port 465), `false` for TLS (port 587) - Optional, defaults to `false`
- `SMTP_REJECT_UNAUTHORIZED` - Optional, set to `false` for self-signed certificates

---

## Testing Email

After deployment:
1. Use any of the three tools (Skills Gap Analyzer, Learning Path Generator, or Job Skills Translator)
2. Generate results
3. Enter an email address and click "Send"
4. Check the recipient's inbox (and spam folder)

---

## Troubleshooting

### Emails not sending?
1. **Check Railway logs** for error messages
2. **Verify SMTP credentials** are correct
3. **Check SMTP port** - Try both 587 (TLS) and 465 (SSL)
4. **Verify SMTP_SECURE** matches your port:
   - Port 587 → `SMTP_SECURE=false` (TLS)
   - Port 465 → `SMTP_SECURE=true` (SSL)
5. **Check firewall** - Railway should allow outbound SMTP connections
6. **Test SMTP connection** - Use an SMTP testing tool to verify credentials

### Common Errors:

**"Connection timeout" (ETIMEDOUT)**
This is the most common issue on Railway. Possible causes:
- **Railway network restrictions**: Some Railway regions may block outbound SMTP connections
- **SMTP server blocking Railway IPs**: Your email provider may be blocking Railway's IP addresses
- **Incorrect SMTP host/port**: Double-check your SMTP settings
- **Firewall rules**: Your SMTP server may require whitelisting Railway IPs

**Solutions:**
1. **Verify SMTP settings** - Make sure `SMTP_HOST` and `SMTP_PORT` are correct
2. **Try different ports**:
   - Port 587 (TLS) - Most common
   - Port 465 (SSL) - Alternative
   - Port 25 - Sometimes used (may be blocked)
3. **Check with your email provider**:
   - Ask if they block connections from cloud providers
   - Request to whitelist Railway's IP ranges (if possible)
   - Verify if your account allows SMTP access
4. **Use a different email service**:
   - Some providers (like Gmail, Office 365) work better with cloud platforms
   - Consider using a dedicated email service that supports cloud deployments
5. **Enable debug mode** - Add `SMTP_DEBUG=true` to see detailed connection logs

**"Authentication failed"**
- Verify `SMTP_USER` and `SMTP_PASS` are correct
- For Gmail/Google Workspace, make sure you're using an App Password, not your regular password
- Check if your email provider requires special authentication

**"Self-signed certificate"**
- Add `SMTP_REJECT_UNAUTHORIZED=false` to your environment variables
- Only use this if you trust your SMTP server

**"Relay access denied"**
- Your SMTP server may require authentication
- Verify your credentials
- Some servers require the "from" address to match the authenticated user

**"Connection refused" (ECONNREFUSED)**
- The SMTP server is not reachable
- Check if the host and port are correct
- Verify the SMTP server is running and accessible

### Railway-Specific Issues

**⚠️ IMPORTANT: Railway may block outbound SMTP connections on port 587 (TLS).** This is a common limitation with cloud platforms to prevent spam.

### If you get "Connection timeout" errors:

1. **Try Port 465 (SSL) instead of 587 (TLS)**:
   ```
   SMTP_PORT=465
   SMTP_SECURE=true
   ```
   The code will automatically try port 465 if 587 times out, but you can set it directly.

2. **Verify Railway allows SMTP**:
   - Railway may block outbound SMTP on certain ports
   - Port 465 (SSL) is sometimes allowed when 587 (TLS) is blocked
   - Check Railway's documentation or support for SMTP restrictions

3. **Alternative Solutions**:
   - **Use Gmail/Google Workspace**: Often works better with cloud platforms
   - **Use Office 365 with port 465**: Try SSL instead of TLS
   - **Contact Railway Support**: Ask if SMTP is blocked and what alternatives they recommend
   - **Use Railway Email Plugin**: Check if Railway has an email service/plugin

4. **Test Connection Locally First**:
   - Test your SMTP settings locally before deploying to Railway
   - This helps identify if it's a Railway-specific issue

### Why Railway Blocks SMTP:

Many cloud platforms block outbound SMTP (especially port 587) to:
- Prevent spam and abuse
- Comply with email security policies
- Reduce network abuse

**Solution**: Use port 465 (SSL) or contact Railway support for SMTP access.

### Debug Mode

To enable detailed SMTP logging, add to Railway environment variables:
```
SMTP_DEBUG=true
```

This will show detailed connection logs in Railway's logs, helping you diagnose the issue.

### Test Account (Development Only)
If no email configuration is set, the app will use Ethereal (test account). Check the Railway logs for the preview URL to view test emails.

---

## Railway Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Railway project connected to GitHub repo
- [ ] `GEMINI_API_KEY` environment variable set
- [ ] SMTP credentials obtained from your email provider
- [ ] SMTP environment variables added to Railway
- [ ] Service redeployed
- [ ] Email functionality tested

---

## Getting SMTP Credentials

### From Your Hosting Provider:
- Check your hosting control panel (cPanel, Plesk, etc.)
- Look for "Email Accounts" or "SMTP Settings"
- Contact your hosting support if needed

### From Your Domain Registrar:
- If you have email hosting with your domain registrar
- Check their documentation or support for SMTP settings

### From Your IT Department:
- If using corporate email
- Ask your IT team for SMTP server details

---

## Security Notes

- **Never commit** SMTP passwords to Git
- Use Railway's environment variables (encrypted at rest)
- Consider using a dedicated email account for sending (not your personal email)
- Use strong passwords for SMTP accounts
- Enable 2FA if available

---

## Support

For issues specific to:
- **Railway**: [Railway Docs](https://docs.railway.app/)
- **SMTP Configuration**: Contact your email provider's support
- **Nodemailer**: [Nodemailer Docs](https://nodemailer.com/)
