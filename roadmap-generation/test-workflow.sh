#!/bin/bash

# Test script fyrir n8n roadmap workflow
# Usage: ./test-workflow.sh

echo "🧪 Testing 30 Day AI Roadmap Generation Workflow"
echo "================================================"
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# n8n webhook URL (update this with your actual webhook URL)
WEBHOOK_URL="https://lioratech.app.n8n.cloud/webhook-test/roadmap-request"

echo -e "${BLUE}📡 Sending test data to webhook...${NC}"
echo "URL: $WEBHOOK_URL"
echo ""

# Test data
response=$(curl -s -w "\nHTTP_STATUS:%{http_code}" -X POST "$WEBHOOK_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@lioratech.is",
    "companyName": "Test Bókhaldsstofa ehf",
    "industry": "Bókhald og fjármálaþjónusta",
    "employees": "8",
    "currentChallenges": "Of mikill tími fer í handvirkar skráningar í Excel, erfitt að halda utan um kvittanir og reikninga, tölvupóstaumferð frá viðskiptavinum er ringulreiðin",
    "goals": "Spara tíma í daglegum verkefnum, sjálfvirka gagnavinnslu, bæta skjalastjórnun og minnka villur í bókhaldi",
    "currentTools": "Excel, Outlook, Dynamics 365 Business Central, OneDrive",
    "timeline": "asap"
  }')

# Extract HTTP status
http_status=$(echo "$response" | tr -d '\n' | sed -e 's/.*HTTP_STATUS://')
body=$(echo "$response" | sed -e 's/HTTP_STATUS:.*//g')

echo ""
echo -e "${BLUE}Response Status: $http_status${NC}"
echo ""

if [ "$http_status" -eq 200 ]; then
    echo -e "${GREEN}✅ Success! Workflow executed.${NC}"
    echo ""
    echo "Response:"
    echo "$body" | jq . 2>/dev/null || echo "$body"
    echo ""
    echo -e "${GREEN}✉️  Check email: test@lioratech.is${NC}"
    echo ""
else
    echo -e "${RED}❌ Error! HTTP Status: $http_status${NC}"
    echo ""
    echo "Response:"
    echo "$body"
    echo ""
fi

echo "================================================"
echo ""
echo "Next steps:"
echo "1. Check n8n execution log"
echo "2. Check email inbox for test@lioratech.is"
echo "3. Verify roadmap quality"
echo ""
