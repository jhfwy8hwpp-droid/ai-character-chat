# Troubleshooting Guide

## Common Issues

### WebSocket Connection Issues

**Problem**: WebSocket fails to connect

**Solutions**:
1. Check server is running: `curl http://localhost:3000/api/characters`
2. Verify WebSocket URL in client
3. Check CORS configuration
4. Review browser console for errors
5. Check firewall/network settings

### OpenAI API Errors

**Problem**: "Invalid API key" or "Unauthorized"

**Solutions**:
1. Verify API key in `.env`: `echo $OPENAI_API_KEY`
2. Check API key is valid on OpenAI dashboard
3. Ensure API key has correct permissions
4. Check API key hasn't been revoked
5. Verify billing account is active

**Problem**: "Rate limit exceeded"

**Solutions**:
1. Wait before retrying
2. Check OpenAI usage dashboard
3. Consider upgrading account tier
4. Implement exponential backoff in code

### Docker Issues

**Problem**: Container won't start

**Solutions**:
```bash
# Check logs
docker-compose logs app

# Verify image built correctly
docker images

# Rebuild image
docker-compose build --no-cache
```

**Problem**: Port already in use

**Solutions**:
```bash
# Find process using port
lsof -i :3000

# Kill process
kill -9 <PID>

# Or change port in docker-compose.yml
```

### Database Issues

**Problem**: Connection refused

**Solutions**:
1. Verify database service is running
2. Check connection string in `.env`
3. Verify database credentials
4. Check firewall allows connections
5. Review database logs

### Performance Issues

**Problem**: Slow response times

**Solutions**:
1. Check server logs for errors
2. Monitor CPU/memory usage
3. Check OpenAI API response times
4. Enable caching
5. Implement rate limiting

### Client-Side Issues

**Problem**: Blank page or errors

**Solutions**:
1. Clear browser cache: Ctrl+Shift+Delete
2. Check browser console: F12 → Console tab
3. Check network requests: F12 → Network tab
4. Verify server API endpoints
5. Try different browser

## Getting Help

### Check Logs

```bash
# Server logs
docker-compose logs -f app

# Client browser console
F12 → Console

# GitHub Actions logs
Github.com → Actions → Workflow run → Job
```

### Common Error Messages

| Error | Cause | Solution |
|-------|-------|----------|
| `ECONNREFUSED` | Server not running | Start server with `npm run dev` |
| `CORS error` | Cross-origin not allowed | Check CORS config in server/index.js |
| `401 Unauthorized` | Invalid token | Generate new token |
| `500 Internal Server Error` | Server error | Check server logs |
| `WebSocket is closed` | Connection dropped | Refresh page |

### Debug Mode

```bash
# Enable debug logging
DEBUG=* npm start

# Or in .env
LOG_LEVEL=debug
```

### Performance Debugging

```bash
# Measure response time
time curl http://localhost:3000/api/characters

# Load test with artillery
npm install -g artillery
artillery quick --count 100 --num 10 http://localhost:3000/api/characters
```

## Reporting Issues

When reporting issues:

1. **Describe the problem** clearly and concisely
2. **Steps to reproduce** the issue
3. **Expected vs actual** behavior
4. **Environment** information:
   - OS (Windows/Mac/Linux)
   - Node.js version: `node --version`
   - npm version: `npm --version`
   - Browser (if client issue)
5. **Logs and error messages** (full stack trace)
6. **Screenshots** if applicable

Example issue:
```
Title: Chat messages don't load after 5 minutes

Description:
When I keep a chat open for 5+ minutes, new messages from
the AI stop appearing.

Steps to reproduce:
1. Start a new chat
2. Send multiple messages
3. Wait 5 minutes
4. Send another message
5. No AI response appears

Environment:
- macOS 12.6
- Node.js 18.12.0
- Chrome 109

Logs:
[Error logs here]
```

## Performance Tips

1. **Enable caching** for character data
2. **Use rate limiting** to prevent abuse
3. **Monitor logs** for errors
4. **Update dependencies** regularly
5. **Profile code** to find bottlenecks
6. **Use CDN** for static assets
7. **Enable compression** in reverse proxy
8. **Set up load balancing** for scale

## Contact Support

- **GitHub Issues**: For bugs and feature requests
- **Discussions**: For general questions
- **Security Issues**: Use private disclosure

## Additional Resources

- [Express.js Troubleshooting](https://expressjs.com/en/guide/error-handling.html)
- [Vue.js Debugging](https://vuejs.org/guide/scaling-up/tooling.html#debugging)
- [Docker Troubleshooting](https://docs.docker.com/config/containers/logging/)
- [OpenAI API Documentation](https://platform.openai.com/docs/api-reference)
- [WebSocket Guide](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)
