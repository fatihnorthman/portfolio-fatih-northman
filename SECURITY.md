# Security Headers Configuration

## Apache (.htaccess)

For production deployment on Apache servers, add these headers to your `.htaccess` file:

```apache
# OWASP Top 10 Security Headers

# Prevent clickjacking
Header always set X-Frame-Options "DENY"

# Prevent MIME type sniffing
Header always set X-Content-Type-Options "nosniff"

# Enable XSS filter
Header always set X-XSS-Protection "1; mode=block"

# Referrer policy
Header always set Referrer-Policy "strict-origin-when-cross-origin"

# Permissions policy
Header always set Permissions-Policy "geolocation=(), microphone=(), camera=(), payment=(), usb=()"

# HSTS - Force HTTPS (only enable if you have SSL)
Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"

# Cross-Origin policies
Header always set Cross-Origin-Embedder-Policy "require-corp"
Header always set Cross-Origin-Opener-Policy "same-origin"
Header always set Cross-Origin-Resource-Policy "same-origin"

# Content Security Policy
Header always set Content-Security-Policy "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'"
```

## Nginx

For Nginx servers, add to your server block:

```nginx
# OWASP Security Headers
add_header X-Frame-Options "DENY" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Permissions-Policy "geolocation=(), microphone=(), camera=(), payment=(), usb=()" always;
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
add_header Cross-Origin-Embedder-Policy "require-corp" always;
add_header Cross-Origin-Opener-Policy "same-origin" always;
add_header Cross-Origin-Resource-Policy "same-origin" always;
add_header Content-Security-Policy "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'" always;
```

## Netlify

Create `netlify.toml` in project root:

```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Permissions-Policy = "geolocation=(), microphone=(), camera=(), payment=(), usb=()"
    Strict-Transport-Security = "max-age=31536000; includeSubDomains; preload"
    Cross-Origin-Embedder-Policy = "require-corp"
    Cross-Origin-Opener-Policy = "same-origin"
    Cross-Origin-Resource-Policy = "same-origin"
    Content-Security-Policy = "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'"
```

## Vercel

Create `vercel.json` in project root:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "geolocation=(), microphone=(), camera=(), payment=(), usb=()" },
        { "key": "Strict-Transport-Security", "value": "max-age=31536000; includeSubDomains; preload" },
        { "key": "Cross-Origin-Embedder-Policy", "value": "require-corp" },
        { "key": "Cross-Origin-Opener-Policy", "value": "same-origin" },
        { "key": "Cross-Origin-Resource-Policy", "value": "same-origin" },
        { "key": "Content-Security-Policy", "value": "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'" }
      ]
    }
  ]
}
```

## Security Checklist

- ✅ X-Frame-Options: Prevents clickjacking
- ✅ X-Content-Type-Options: Prevents MIME sniffing
- ✅ X-XSS-Protection: XSS filter
- ✅ Referrer-Policy: Controls referrer information
- ✅ Permissions-Policy: Restricts browser features
- ✅ HSTS: Forces HTTPS (production only)
- ✅ COEP, COOP, CORP: Cross-origin isolation
- ✅ CSP: Prevents XSS and injection attacks

## Testing

Test your security headers at:
- https://securityheaders.com
- https://observatory.mozilla.org
