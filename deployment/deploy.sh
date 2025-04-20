#!/bin/bash

# Script to deploy intrinsic.ai learning platform to production

# Set up colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}Starting deployment of intrinsic.ai learning platform...${NC}"

# Check if docker and docker-compose are installed
if ! command -v docker &> /dev/null || ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}Error: Docker and/or Docker Compose are not installed.${NC}"
    echo -e "${YELLOW}Please install Docker and Docker Compose before proceeding.${NC}"
    exit 1
fi

# Create necessary directories for certbot
echo -e "${GREEN}Creating directories for SSL certificates...${NC}"
mkdir -p ./infrastructure/certbot/conf
mkdir -p ./infrastructure/certbot/www

# Check if .env file exists
if [ ! -f ./.env ]; then
    echo -e "${RED}Error: .env file not found.${NC}"
    echo -e "${YELLOW}Please create a .env file with the required environment variables.${NC}"
    exit 1
fi

# Copy application files
echo -e "${GREEN}Copying application files...${NC}"

# Check if source directories exist
if [ ! -d ../frontend ] || [ ! -d ../backend ]; then
    echo -e "${RED}Error: Source directories not found.${NC}"
    echo -e "${YELLOW}Please ensure the application source code is available.${NC}"
    exit 1
fi

# Copy frontend files
echo -e "${GREEN}Copying frontend files...${NC}"
cp -r ../frontend/* ./frontend/

# Copy backend files
echo -e "${GREEN}Copying backend files...${NC}"
cp -r ../backend/* ./backend/

# Update package.json files with new name
echo -e "${GREEN}Updating package.json files...${NC}"
sed -i 's/"name": "frontend"/"name": "intrinsic-learning-ai-frontend"/g' ./frontend/package.json
sed -i 's/"name": "backend"/"name": "intrinsic-learning-ai-backend"/g' ./backend/package.json

# Build and start the containers
echo -e "${GREEN}Building and starting containers...${NC}"
docker-compose build
docker-compose up -d

echo -e "${GREEN}Deployment completed successfully!${NC}"
echo -e "${YELLOW}Note: You need to obtain SSL certificates by running:${NC}"
echo -e "${YELLOW}docker-compose run --rm certbot certonly --webroot -w /var/www/certbot -d intrinsic.yiagency.ch -d api.intrinsic.yiagency.ch${NC}"
echo -e "${YELLOW}After obtaining certificates, restart Nginx:${NC}"
echo -e "${YELLOW}docker-compose restart nginx${NC}"

echo -e "${GREEN}The intrinsic.ai learning platform is now deployed and available at:${NC}"
echo -e "${GREEN}https://intrinsic.yiagency.ch${NC}"
echo -e "${GREEN}API is available at:${NC}"
echo -e "${GREEN}https://api.intrinsic.yiagency.ch${NC}"
