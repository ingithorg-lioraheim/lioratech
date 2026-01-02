/**
 * Test script to simulate a successful Rapyd payment callback
 *
 * Usage: node scripts/test-payment-callback.js <orderId>
 * Example: node scripts/test-payment-callback.js AI-2025-12-30-N2WGXJ
 */

const orderId = process.argv[2];

if (!orderId) {
  console.error('❌ Error: Please provide an orderId');
  console.log('Usage: node scripts/test-payment-callback.js <orderId>');
  console.log('Example: node scripts/test-payment-callback.js AI-2025-12-30-N2WGXJ');
  process.exit(1);
}

const webhookUrl = 'https://lioratech.app.n8n.cloud/webhook/30-day-payment-callback';

// Simulate Rapyd payment webhook data
const paymentData = {
  type: 'PAYMENT_COMPLETED',
  data: {
    id: `payment_${Date.now()}`,
    status: 'CLO', // Closed/Completed
    amount: 69900,
    currency: 'ISK',
    metadata: {
      orderId: orderId,
      product: '30-day-roadmap'
    },
    created_at: new Date().toISOString()
  }
};

console.log('🧪 Testing payment callback for orderId:', orderId);
console.log('📤 Sending to:', webhookUrl);
console.log('📦 Payment data:', JSON.stringify(paymentData, null, 2));

fetch(webhookUrl, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(paymentData)
})
  .then(response => {
    console.log('\n✅ Response status:', response.status, response.statusText);
    return response.text();
  })
  .then(text => {
    console.log('📥 Response body:', text);
    try {
      const json = JSON.parse(text);
      console.log('📋 Parsed response:', JSON.stringify(json, null, 2));
    } catch (e) {
      // Not JSON, that's ok
    }
    console.log('\n✅ Payment callback test completed!');
    console.log('🔍 Check your n8n workflow executions to see the result');
    console.log('📧 You should receive an email notification if successful');
  })
  .catch(error => {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  });
