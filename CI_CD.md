# CI/CD Pipeline Documentation

## Overview

This project uses GitHub Actions for continuous integration and continuous deployment.

## Features

### 1. Automated Testing
- Runs on Node.js 16.x and 18.x
- Unit tests
- Linting and code style checks
- Client build verification

### 2. Security Scanning
- Trivy vulnerability scanning
- NPM audit for dependencies
- SARIF report upload to GitHub Security

### 3. Docker Build & Push
- Builds Docker image on all branches
- Pushes to Docker Hub on main branch only
- Layer caching for faster builds

### 4. Staging Deployment
- Automatic deployment on develop branch
- SSH-based deployment
- Slack notifications

### 5. Production Deployment
- Automatic deployment on main branch
- Automatic release creation
- GitHub Release notes
- Slack notifications

## Environment Variables

### Development
```env
NODE_ENV=development
DEBUG=*
```

### Staging
```env
NODE_ENV=staging
LOG_LEVEL=debug
```

### Production
```env
NODE_ENV=production
LOG_LEVEL=warn
```

## GitHub Secrets Setup

Add these secrets to your repository settings:

### Docker Hub
- `DOCKER_USERNAME`: Your Docker Hub username
- `DOCKER_PASSWORD`: Your Docker Hub token

### Deployment
- `STAGING_DEPLOY_KEY`: SSH private key for staging
- `STAGING_HOST`: Staging server hostname
- `STAGING_USER`: Staging SSH username
- `PRODUCTION_DEPLOY_KEY`: SSH private key for production
- `PRODUCTION_HOST`: Production server hostname
- `PRODUCTION_USER`: Production SSH username

### Notifications
- `SLACK_WEBHOOK`: Slack webhook for notifications

## Deployment Flow

```
┌─────────────────────────────────────┐
│  Push to develop or main branch      │
└──────────────┬──────────────────────┘
               │
        ┌──────▼──────┐
        │ Run Tests   │
        │ Run Linter  │
        │ Run Security│
        └──────┬──────┘
               │
        ┌──────▼──────┐
        │Build Docker │
        └──────┬──────┘
               │
        ┌──────▼──────────┐
        │  Deploy Stage   │  (if develop)
        │ or Production   │  (if main)
        └──────┬──────────┘
               │
        ┌──────▼──────┐
        │Send Slack   │
        │Notification │
        └─────────────┘
```

## Additional Backend Features

### Database Service (`database-service.js`)
- Conversation persistence
- User profile management
- Ready for PostgreSQL/MongoDB integration

### Rate Limiter (`rate-limiter.js`)
- API rate limiting
- WebSocket message throttling
- Configurable limits

### Authentication (`auth.js`)
- JWT token generation
- Token verification
- Middleware for protected routes

### Analytics (`analytics.js`)
- Event tracking
- User statistics
- Character usage metrics
- Error tracking

### Logger (`logger.js`)
- Structured logging
- Multiple log levels
- Configurable verbosity

### Content Moderation (`moderation.js`)
- OpenAI moderation API integration
- Custom word filtering
- Safe content enforcement

### Cache Service (`cache.js`)
- In-memory caching
- TTL management
- Automatic cleanup

## Running Tests Locally

```bash
# Install dependencies
npm install

# Run all tests
npm test

# Run specific test file
npm test -- server/auth.js

# Run with coverage
npm test -- --coverage
```

## Troubleshooting

### Permission Denied Errors
- Verify SSH keys are correctly configured
- Check GitHub Secrets are properly set
- Ensure deploy key has correct permissions

### Docker Build Failures
- Check Dockerfile syntax
- Verify all dependencies are in package.json
- Review Docker build logs in GitHub Actions

### Deployment Issues
- Verify server connectivity: `ssh -i key user@host`
- Check server has Docker installed
- Review deployment logs: `docker-compose logs`

## Best Practices

1. **Branch Protection**
   - Require PR reviews before merge
   - Require status checks to pass
   - Dismiss stale reviews

2. **Secrets Management**
   - Never commit secrets to repository
   - Rotate SSH keys regularly
   - Use GitHub Secrets exclusively

3. **Version Control**
   - Use semantic versioning
   - Create meaningful commit messages
   - Tag releases appropriately

4. **Monitoring**
   - Set up Slack notifications
   - Monitor deployment status
   - Track error rates

## Support

For workflow issues:
1. Check GitHub Actions documentation
2. Review workflow logs in GitHub UI
3. Test locally with `act`
4. Open an issue on the repository
