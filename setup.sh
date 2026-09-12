#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Character AI Chat - Setup${NC}"
echo ""

# Check if .env file exists
if [ ! -f .env ]; then
    echo -e "${YELLOW}Creating .env file...${NC}"
    cp .env.example .env
    echo -e "${GREEN}✓ .env file created${NC}"
    echo -e "${RED}⚠ Please edit .env and add your OpenAI API key${NC}"
    echo ""
else
    echo -e "${GREEN}✓ .env file already exists${NC}"
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}✗ Node.js is not installed${NC}"
    exit 1
else
    echo -e "${GREEN}✓ Node.js $(node --version) found${NC}"
fi

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo -e "${YELLOW}⚠ Docker is not installed (needed for production deployment)${NC}
else
    echo -e "${GREEN}✓ Docker $(docker --version | awk '{print $3}') found${NC}"
fi

# Install dependencies
echo ""
echo -e "${YELLOW}Installing dependencies...${NC}"
npm install
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Dependencies installed${NC}"
else
    echo -e "${RED}✗ Failed to install dependencies${NC}"
    exit 1
fi

echo ""
echo -e "${GREEN}Setup complete!${NC}"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo -e "  1. Edit .env file with your OpenAI API key"
echo -e "  2. Run: ${GREEN}npm run dev${NC} (for development)"
echo -e "  3. Or run: ${GREEN}docker-compose up${NC} (for production)"
echo ""
echo -e "${YELLOW}Development:${NC}"
echo -e "  - Server: http://localhost:3000"
echo -e "  - Client: http://localhost:5173"
echo ""
