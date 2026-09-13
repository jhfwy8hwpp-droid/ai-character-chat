# Contributing to Character AI Chat

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing.

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Report issues responsibly
- Help others learn and grow

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/yourusername/ai-character-chat.git`
3. Create a feature branch: `git checkout -b feature/your-feature-name`
4. Follow the development setup in README.md

## Development Workflow

### Setup Development Environment

```bash
# Install dependencies
npm install

# Start development servers
npm run dev
```

### Code Style

- Run ESLint: `npm run lint`
- Format code: `npm run format`
- Follow existing code patterns
- Use meaningful variable names
- Add comments for complex logic

### Testing

```bash
# Run all tests
npm test

# Run specific test file
npm test server/character-ai.js

# Watch mode
npm test -- --watch
```

### Commits

- Use conventional commits: `type(scope): description`
- Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`
- Keep commits atomic and focused
- Reference related issues: `Fixes #123`

Example:
```
feat(auth): add JWT token validation
fix(chat): resolve WebSocket reconnection issue
docs(readme): update installation instructions
```

## Pull Request Process

1. Update your branch: `git pull origin main`
2. Create a descriptive PR title
3. Fill in the PR template
4. Link related issues
5. Ensure all checks pass
6. Request review from maintainers
7. Address review feedback
8. Squash commits if requested

## Adding Features

### New Character

1. Add character definition to `server/character-ai.js`
2. Add system prompt and avatar
3. Test with WebSocket client
4. Document in README

### New API Endpoint

1. Add route to `server/index.js`
2. Implement handler function
3. Add rate limiting if needed
4. Add error handling
5. Document in README API section
6. Add tests

### New Frontend Component

1. Create component in `client/src/components/`
2. Use Vue 3 Composition API
3. Add props and emits
4. Style with scoped CSS
5. Document usage

## Bug Reports

Include:
- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Environment info (OS, Node version, etc.)
- Screenshots or error logs

## Feature Requests

Include:
- Clear description of the feature
- Use case and motivation
- Proposed implementation (optional)
- Related issues or discussions

## Documentation

- Update README.md for user-facing changes
- Add inline code comments for complex logic
- Update API documentation
- Add/update examples
- Keep DEPLOYMENT.md current

## Performance Considerations

- Profile code before optimizing
- Minimize API calls
- Cache when appropriate
- Use efficient algorithms
- Monitor bundle size

## Security

- Never commit secrets or API keys
- Validate and sanitize user input
- Use HTTPS in production
- Keep dependencies updated
- Report security issues privately

## Licensing

By contributing, you agree that your contributions will be licensed under the MIT License.

## Questions?

Feel free to:
- Open a discussion on GitHub
- Ask in issues
- Review existing documentation
- Reach out to maintainers

## Thank You!

Your contributions make this project better! 🎉
