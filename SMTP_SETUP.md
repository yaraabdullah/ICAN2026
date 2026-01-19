# Email SMTP Configuration Guide

Your email `info@aia.org.sa` needs SMTP settings. Here's how to find them:

## How to Find Your SMTP Settings:

1. **Check with your hosting provider** - If aia.org.sa is hosted with a company, check their documentation
2. **Check your email client settings** - If you use Outlook/Thunderbird, check the account settings
3. **Check your email provider** - If using Google Workspace or Microsoft 365

## Common SMTP Settings:

### If using Google Workspace (G Suite):
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
```

### If using Microsoft 365:
```
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_SECURE=false
```

### If using cPanel/hosting (check with your host):
```
SMTP_HOST=smtp.yourhost.com (or mail.yourhost.com)
SMTP_PORT=587 (or 465 for SSL)
SMTP_SECURE=false (or true for port 465)
```

## To Update:
Edit your .env file and update the SMTP_HOST, SMTP_PORT, and SMTP_SECURE values.
Then restart the server.
