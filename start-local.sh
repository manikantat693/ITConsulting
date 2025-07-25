#!/bin/bash

# CloudFlex IT Local Development Server Startup Script
# This script starts the local development server with proper configuration

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Banner
echo -e "${PURPLE}"
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║                    CloudFlex IT Solutions                    ║"
echo "║                  Local Development Server                    ║"
echo "║                      Starting...                            ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo -e "${NC}"

# Load environment variables from .local file
if [ -f ".local" ]; then
    echo -e "${GREEN}✓ Loading configuration from .local file...${NC}"
    source .local
else
    echo -e "${YELLOW}⚠ .local file not found, using default settings${NC}"
    LOCAL_PORT=8000
    LOCAL_HOST=localhost
fi

# Check if port is available
PORT=${LOCAL_PORT:-8000}
HOST=${LOCAL_HOST:-localhost}

echo -e "${BLUE}🔍 Checking if port $PORT is available...${NC}"

if lsof -Pi :$PORT -sTCP:LISTEN -t >/dev/null ; then
    echo -e "${RED}❌ Port $PORT is already in use!${NC}"
    echo -e "${YELLOW}💡 Try using a different port or stop the existing service${NC}"
    echo -e "${CYAN}🔧 To kill existing process: sudo kill -9 \$(lsof -ti:$PORT)${NC}"
    exit 1
else
    echo -e "${GREEN}✓ Port $PORT is available${NC}"
fi

# Create necessary directories if they don't exist
echo -e "${BLUE}📁 Setting up directories...${NC}"
mkdir -p uploads/resumes
mkdir -p logs
mkdir -p backups

# Check for Python 3
if command -v node &> /dev/null; then
    echo -e "${GREEN}✓ Using Node.js for development server${NC}"
else
    echo -e "${RED}❌ Node.js is not installed or not in PATH${NC}"
    echo -e "${YELLOW}💡 Please install Node.js to run the development server${NC}"
    exit 1
fi

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo -e "${BLUE}📦 Installing dependencies...${NC}"
    npm install
fi

# Display startup information
echo -e "${CYAN}"
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║                    SERVER INFORMATION                        ║"
echo "╠══════════════════════════════════════════════════════════════╣"
echo "║  🌐 Local URL: http://$HOST:$PORT                           ║"
echo "║  🚀 AI Assistant: Enabled                                   ║"
echo "║  🎨 Glassmorphism UI: Active                                ║"
echo "║  🎙️ Voice Recognition: Available                            ║"
echo "║  📱 Mobile Responsive: Yes                                  ║"
echo "║  🔧 Development Mode: On                                    ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo -e "${NC}"

# Start the development server
echo -e "${GREEN}🚀 Starting CloudFlex IT development server with Node.js...${NC}"
echo -e "${YELLOW}💡 Press Ctrl+C to stop the server${NC}"
echo -e "${CYAN}🔗 Open http://$HOST:$PORT in your browser${NC}"
echo ""

# Create a simple server startup message
echo -e "${PURPLE}📋 Features to test:${NC}"
echo -e "${CYAN}   • Click the AI assistant brain icon (bottom-right)${NC}"
echo -e "${CYAN}   • Test voice input with the microphone button${NC}"
echo -e "${CYAN}   • Try capability cards (Immigration, Jobs, Consulting)${NC}"
echo -e "${CYAN}   • Test suggestion chips and quick actions${NC}"
echo -e "${CYAN}   • Check mobile responsiveness${NC}"
echo ""

# Log startup time
echo "$(date): Starting CloudFlex IT local server on port $PORT" >> logs/startup.log

# Start the Python HTTP server
echo -e "${GREEN}🎯 Server starting on http://$HOST:$PORT${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

# Trap Ctrl+C to gracefully shutdown
trap 'echo -e "\n${YELLOW}🛑 Shutting down CloudFlex IT development server...${NC}"; echo "$(date): Server stopped" >> logs/startup.log; exit 0' INT

# Start the server
npm start

# If we reach here, the server has stopped
echo -e "${YELLOW}🛑 CloudFlex IT development server stopped${NC}"
echo "$(date): Server stopped" >> logs/startup.log