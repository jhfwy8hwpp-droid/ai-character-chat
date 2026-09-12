#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}═══════════════════════════════════════════════${NC}"
echo -e "${BLUE}   Character AI Chat - Docker Deployment${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════${NC}"
echo ""

# Parse command
COMMAND=${1:-up}

case $COMMAND in
    up)
        echo -e "${YELLOW}Starting services...${NC}"
        docker-compose up -d
        if [ $? -eq 0 ]; then
            echo -e "${GREEN}✓ Services started${NC}"
            echo ""
            echo -e "${YELLOW}Waiting for services to be ready...${NC}"
            sleep 5
            echo ""
            echo -e "${GREEN}Services are running:${NC}"
            echo -e "  - App: ${BLUE}http://localhost:3000${NC}"
            echo -e "  - LiveKit: ${BLUE}ws://localhost:7880${NC}"
        else
            echo -e "${RED}✗ Failed to start services${NC}"
            exit 1
        fi
        ;;
    down)
        echo -e "${YELLOW}Stopping services...${NC}"
        docker-compose down
        echo -e "${GREEN}✓ Services stopped${NC}"
        ;;
    logs)
        docker-compose logs -f
        ;;
    restart)
        echo -e "${YELLOW}Restarting services...${NC}"
        docker-compose restart
        echo -e "${GREEN}✓ Services restarted${NC}"
        ;;
    build)
        echo -e "${YELLOW}Building images...${NC}"
        docker-compose build --no-cache
        echo -e "${GREEN}✓ Images built${NC}"
        ;;
    clean)
        echo -e "${YELLOW}Cleaning up...${NC}"
        docker-compose down -v
        docker system prune -f
        echo -e "${GREEN}✓ Cleanup complete${NC}"
        ;;
    status)
        echo -e "${YELLOW}Service status:${NC}"
        docker-compose ps
        ;;
    *)
        echo -e "${YELLOW}Usage:${NC}"
        echo -e "  ./deploy.sh up       - Start services"
        echo -e "  ./deploy.sh down     - Stop services"
        echo -e "  ./deploy.sh restart  - Restart services"
        echo -e "  ./deploy.sh logs     - View logs"
        echo -e "  ./deploy.sh build    - Build images"
        echo -e "  ./deploy.sh clean    - Clean up"
        echo -e "  ./deploy.sh status   - Show status"
        ;;
esac
