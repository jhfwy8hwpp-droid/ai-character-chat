# Security Policy

## Reporting Security Issues

Please **do not** open public issues for security vulnerabilities.

Instead, please email security details to:
- Create a private security advisory on GitHub, or
- Contact the maintainers directly with details

## Security Best Practices

When using this application:

1. **API Keys**
   - Never commit API keys to the repository
   - Use environment variables
   - Rotate keys regularly
   - Use separate keys for different environments

2. **Authentication**
   - Use strong, unique passwords
   - Enable 2FA where available
   - Rotate JWT secrets regularly
   - Use HTTPS only in production

3. **Data Protection**
   - Enable encryption at rest and in transit
   - Implement proper access controls
   - Regular security audits
   - Compliance with data protection regulations

4. **Dependencies**
   - Keep all packages up to date
   - Monitor security advisories
   - Use `npm audit` regularly
   - Review dependency licenses

5. **Server Security**
   - Use firewall rules
   - Keep OS patched
   - Use SSH keys for deployment
   - Monitor logs for suspicious activity

## Dependency Security

We use several security tools:

- **npm audit**: Built-in vulnerability scanner
- **Trivy**: Comprehensive vulnerability scanning
- **GitHub Security**: Automated alerts
- **Dependabot**: Automated updates (if enabled)

## Compliance

This project aims to comply with:
- OWASP Top 10
- CWE/SANS Top 25
- GDPR (where applicable)
- Local data protection laws

## Supported Versions

Only the latest major version receives security updates.
Earlier versions are provided as-is without security support.

## Disclosure Policy

Once a security issue is reported:

1. We acknowledge receipt within 48 hours
2. We investigate and assess the severity
3. We develop and test a fix
4. We release a patch version
5. We disclose the vulnerability publicly
6. We credit the reporter (if desired)

## Security Headers

Recommended security headers:

```
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Content-Security-Policy: default-src 'self'
Referrer-Policy: strict-origin-when-cross-origin
```
