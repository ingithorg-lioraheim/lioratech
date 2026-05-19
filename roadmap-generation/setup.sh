#!/bin/bash

# LioraTech - Roadmap Setup Helper
# This script helps you set up and test the roadmap generation system

clear
echo "╔════════════════════════════════════════════════════════╗"
echo "║   LioraTech - 30 Day Roadmap Setup & Test Helper      ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if n8n webhook URL is set
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${YELLOW}Step 1: n8n Webhook URL${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo "Hefurðu set up n8n og fengið webhook URL?"
echo ""
echo "1) Nei - sýndu mér hvernig"
echo "2) Já - ég er með webhook URL"
echo "3) Skip - ég vil bara testa locally"
echo ""
read -p "Veldu (1-3): " setup_choice

if [ "$setup_choice" == "1" ]; then
    echo ""
    echo -e "${GREEN}✓ Opening setup guide...${NC}"
    open "QUICK-START.md" 2>/dev/null || cat "QUICK-START.md"
    echo ""
    echo "Fylgdu leiðbeiningunum og komdu svo aftur!"
    echo "Run: ./setup.sh"
    exit 0
fi

if [ "$setup_choice" == "3" ]; then
    echo ""
    echo -e "${YELLOW}⚠️  Local testing ekki implemented ennþá.${NC}"
    echo "Þú þarft n8n til að prófa full workflow."
    echo ""
    echo "Install n8n locally:"
    echo "  npx n8n"
    echo ""
    exit 0
fi

# Get webhook URL
echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${YELLOW}Step 2: Enter Webhook URL${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo "Paste þína n8n webhook URL hér:"
echo "(t.d. https://xxx.app.n8n.cloud/webhook/roadmap-request)"
echo ""
read -p "URL: " webhook_url

if [ -z "$webhook_url" ]; then
    echo -e "${RED}❌ Error: Webhook URL vantar${NC}"
    exit 1
fi

echo ""
echo -e "${GREEN}✓ Webhook URL: $webhook_url${NC}"

# Test data choice
echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${YELLOW}Step 3: Choose Test Data${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo "1) Quick test (simple data)"
echo "2) Realistic test (bókhaldsstofa)"
echo "3) Custom (ég slæ inn sjálfur)"
echo ""
read -p "Veldu (1-3): " test_choice

# Set test data
if [ "$test_choice" == "1" ]; then
    # Quick test
    test_email="test@lioratech.is"
    test_company="Test Company"
    test_industry="Testing"
    test_employees="5"
    test_challenges="Testing the system"
    test_goals="See if it works"
    test_tools="Excel"
    test_timeline="asap"

elif [ "$test_choice" == "2" ]; then
    # Realistic test
    test_email="jon@bokhalds.is"
    test_company="Íslenska Bókhaldstofan ehf"
    test_industry="Bókhald og fjármálaþjónusta"
    test_employees="12"
    test_challenges="Of mikill tími fer í handvirkar skráningar, erfitt að halda utan um kvittanir, email chaos"
    test_goals="Spara tíma, sjálfvirka gagnavinnslu, bæta skjalastjórnun"
    test_tools="Excel, Outlook, Dynamics 365 Business Central, OneDrive"
    test_timeline="asap"

else
    # Custom
    echo ""
    read -p "Email: " test_email
    read -p "Company Name: " test_company
    read -p "Industry: " test_industry
    read -p "Employees (1-5, 6-20, etc): " test_employees
    read -p "Challenges: " test_challenges
    read -p "Goals: " test_goals
    read -p "Current Tools: " test_tools
    read -p "Timeline (asap/1-3-months/etc): " test_timeline
fi

# Show summary
echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${YELLOW}Test Summary${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo "Webhook: $webhook_url"
echo "Company: $test_company"
echo "Email: $test_email"
echo "Industry: $test_industry"
echo ""
read -p "Halda áfram með test? (y/n): " confirm

if [ "$confirm" != "y" ]; then
    echo "Test cancelled."
    exit 0
fi

# Send request
echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${YELLOW}Sending Request...${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

response=$(curl -s -w "\nHTTP_STATUS:%{http_code}" -X POST "$webhook_url" \
  -H "Content-Type: application/json" \
  -d "{
    \"email\": \"$test_email\",
    \"companyName\": \"$test_company\",
    \"industry\": \"$test_industry\",
    \"employees\": \"$test_employees\",
    \"currentChallenges\": \"$test_challenges\",
    \"goals\": \"$test_goals\",
    \"currentTools\": \"$test_tools\",
    \"timeline\": \"$test_timeline\"
  }")

# Extract HTTP status
http_status=$(echo "$response" | tr -d '\n' | sed -e 's/.*HTTP_STATUS://')
body=$(echo "$response" | sed -e 's/HTTP_STATUS:.*//g')

echo ""
if [ "$http_status" -eq 200 ]; then
    echo -e "${GREEN}╔════════════════════════════════════════════════════════╗${NC}"
    echo -e "${GREEN}║                  ✅ SUCCESS!                           ║${NC}"
    echo -e "${GREEN}╚════════════════════════════════════════════════════════╝${NC}"
    echo ""
    echo "Response (HTTP $http_status):"
    echo "$body" | jq . 2>/dev/null || echo "$body"
    echo ""
    echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${GREEN}Next Steps:${NC}"
    echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    echo "1. 📧 Check email: info@lioratech.is"
    echo "2. 👀 Review roadmap attachment"
    echo "3. ✅ Quality check"
    echo "4. ↗️  Forward to customer"
    echo ""
    echo "5. 📊 Check n8n execution log:"
    echo "   https://app.n8n.cloud/workflows"
    echo ""
    echo -e "${YELLOW}⏱️  This may take 30-60 seconds to complete...${NC}"
    echo ""
else
    echo -e "${RED}╔════════════════════════════════════════════════════════╗${NC}"
    echo -e "${RED}║                  ❌ ERROR!                             ║${NC}"
    echo -e "${RED}╚════════════════════════════════════════════════════════╝${NC}"
    echo ""
    echo -e "${RED}HTTP Status: $http_status${NC}"
    echo ""
    echo "Response:"
    echo "$body"
    echo ""
    echo -e "${YELLOW}Troubleshooting:${NC}"
    echo ""
    echo "• Check webhook URL er correct"
    echo "• Check n8n workflow er activated"
    echo "• Check credentials eru set up"
    echo "• Check n8n execution log for errors"
    echo ""
fi

echo ""
echo "════════════════════════════════════════════════════════"
echo ""
