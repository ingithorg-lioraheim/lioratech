#!/bin/bash

curl -X POST "https://lioratech.app.n8n.cloud/webhook-test/roadmap-request" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "companyName": "TEST COMPANY",
    "industry": "Technology",
    "employees": "10-50",
    "currentChallenges": "Testing automation",
    "goals": "Make sure workflow works",
    "currentTools": "None",
    "timeline": "Immediately"
  }'

echo ""
echo "Test request sent!"
