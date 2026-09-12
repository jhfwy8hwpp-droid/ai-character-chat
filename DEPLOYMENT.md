# Character AI Chat - Deployment Guide

## Quick Start with Docker

### Prerequisites
- Docker and Docker Compose installed
- OpenAI API key
- Git

### One-Command Setup

```bash
# Clone and setup
git clone https://github.com/yourusername/ai-character-chat.git
cd ai-character-chat

# Make scripts executable
chmod +x setup.sh deploy.sh

# Run setup
./setup.sh

# Edit .env with your OpenAI API key
nano .env

# Deploy with Docker
./deploy.sh up
```

### Manual Docker Deployment

```bash
# Build and start
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## Environment Variables

Create a `.env` file in the root directory:

```env
# Server
NODE_ENV=production
PORT=3000

# OpenAI
OPENAI_API_KEY=sk-...

# LiveKit
LIVEKIT_URL=ws://livekit:7880
LIVEKIT_API_KEY=devkey
LIVEKIT_API_SECRET=secret

# CORS
CLIENT_URL=http://localhost:3000
```

## Deployment Options

### Option 1: Docker Compose (Local/Dev)

```bash
./deploy.sh up
```

**Pros:**
- Easy local development
- Includes LiveKit server
- All services in one command

**Cons:**
- Not suitable for production scale
- Single machine only

### Option 2: Kubernetes

Create `k8s/deployment.yaml`:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: character-ai-chat
spec:
  replicas: 3
  selector:
    matchLabels:
      app: character-ai-chat
  template:
    metadata:
      labels:
        app: character-ai-chat
    spec:
      containers:
      - name: app
        image: your-registry/character-ai-chat:latest
        ports:
        - containerPort: 3000
        env:
        - name: OPENAI_API_KEY
          valueFrom:
            secretKeyRef:
              name: api-keys
              key: openai
        - name: NODE_ENV
          value: production
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /api/characters
            port: 3000
          initialDelaySeconds: 10
          periodSeconds: 30
```

Deploy:

```bash
kubectl apply -f k8s/deployment.yaml
kubectl expose deployment character-ai-chat --type=LoadBalancer --port=80 --target-port=3000
```

### Option 3: Cloud Platforms

#### Heroku

```bash
# Create Procfile
echo "web: node server/index.js" > Procfile

# Deploy
heroku create character-ai-chat
heroku config:set OPENAI_API_KEY=sk-...
git push heroku main
```

#### AWS (Elastic Beanstalk)

```bash
eb init -p node.js-18 character-ai-chat
eb create production
eb setenv OPENAI_API_KEY=sk-...
eb deploy
```

#### Google Cloud Run

```bash
gcloud run deploy character-ai-chat \
  --source . \
  --platform managed \
  --region us-central1 \
  --set-env-vars OPENAI_API_KEY=sk-...
```

#### Azure Container Instances

```bash
az container create \
  --resource-group myResourceGroup \
  --name character-ai-chat \
  --image myregistry.azurecr.io/character-ai-chat:latest \
  --environment-variables OPENAI_API_KEY=sk-...
```

## Production Checklist

- [ ] Set up proper environment variables
- [ ] Configure CORS for your domain
- [ ] Set up SSL/TLS certificates
- [ ] Enable rate limiting
- [ ] Set up monitoring and logging
- [ ] Configure backups for conversation history
- [ ] Set up CI/CD pipeline
- [ ] Test load balancing
- [ ] Document deployment procedures
- [ ] Set up health checks
- [ ] Configure auto-scaling
- [ ] Set up alerting

## Scaling Considerations

### Horizontal Scaling

1. **Load Balancer**: Use Nginx or AWS ALB
2. **Database**: Move from in-memory to PostgreSQL
3. **Message Queue**: Use Redis for WebSocket state
4. **Session Storage**: Use Redis or memcached

### Example Docker Compose for Scaling

```yaml
version: '3.8'
services:
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
    depends_on:
      - app1
      - app2

  app1:
    build: .
    environment:
      - NODE_ENV=production
      - OPENAI_API_KEY=${OPENAI_API_KEY}

  app2:
    build: .
    environment:
      - NODE_ENV=production
      - OPENAI_API_KEY=${OPENAI_API_KEY}

  redis:
    image: redis:alpine

  postgres:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=character_ai
      - POSTGRES_PASSWORD=secret
```

## Monitoring

### Health Checks

```bash
curl http://localhost:3000/api/characters
```

### Logging

```bash
# View Docker logs
docker-compose logs -f app

# With timestamps
docker-compose logs -f --timestamps app
```

### Performance Metrics

Add to `server/index.js`:

```javascript
import prometheus from 'prom-client';

const httpRequestDuration = new prometheus.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
});

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', prometheus.register.contentType);
  res.end(await prometheus.register.metrics());
});
```

## Troubleshooting

### Container won't start

```bash
# Check logs
docker-compose logs app

# Check if port is in use
lsof -i :3000
```

### WebSocket connection issues

```bash
# Test connection
wscat -c ws://localhost:3000
```

### OpenAI API errors

```bash
# Verify API key
curl https://api.openai.com/v1/models \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

## Maintenance

### Regular Updates

```bash
# Update dependencies
npm update

# Rebuild and deploy
./deploy.sh build
./deploy.sh restart
```

### Backup

```bash
# Backup conversation data
docker-compose exec app npm run backup
```

## Support

For issues with deployment, check:
- [Docker Documentation](https://docs.docker.com)
- [Docker Compose Reference](https://docs.docker.com/compose/compose-file/)
- [Node.js Best Practices](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/)
