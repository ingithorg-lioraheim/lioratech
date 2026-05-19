#!/usr/bin/env node

/**
 * COO-AGENT WEBHOOK RECEIVER
 *
 * Receives webhook requests from n8n and saves them to requests/pending/
 * Uses only Node.js built-in modules (no dependencies!)
 *
 * Usage:
 *   node webhook-receiver.js        # Start on port 3001
 *   PORT=3002 node webhook-receiver.js  # Custom port
 */

import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const PORT = process.env.PORT || 3001;
const BASE_DIR = path.join(__dirname, '..');
const PENDING_DIR = path.join(BASE_DIR, 'requests', 'pending');
const PROCESSING_DIR = path.join(BASE_DIR, 'requests', 'processing');
const COMPLETED_DIR = path.join(BASE_DIR, 'requests', 'completed');

// Ensure directories exist
[PENDING_DIR, PROCESSING_DIR, COMPLETED_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

/**
 * Helper: Send JSON response
 */
function sendJSON(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  });
  res.end(JSON.stringify(data, null, 2));
}

/**
 * Helper: Parse JSON body from request
 */
function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        reject(new Error('Invalid JSON'));
      }
    });
    req.on('error', reject);
  });
}

/**
 * Handler: Health check
 */
function handleHealth(req, res) {
  sendJSON(res, 200, {
    status: 'ok',
    service: 'COO-Agent Webhook Receiver',
    version: '1.0.0',
    uptime: process.uptime(),
    endpoints: {
      health: 'GET /',
      newRequest: 'POST /coo-agent/new-request',
      status: 'GET /coo-agent/status',
      test: 'POST /coo-agent/test'
    }
  });
}

/**
 * Handler: Status check
 */
function handleStatus(req, res) {
  try {
    const pending = fs.readdirSync(PENDING_DIR).filter(f => f.endsWith('.json'));
    const processing = fs.readdirSync(PROCESSING_DIR).filter(f => f.endsWith('.json'));
    const completed = fs.readdirSync(COMPLETED_DIR).filter(f => f.endsWith('.json'));

    sendJSON(res, 200, {
      status: 'operational',
      pipeline: {
        pending: pending.length,
        processing: processing.length,
        completed: completed.length
      },
      pendingRequests: pending
    });
  } catch (error) {
    sendJSON(res, 500, {
      status: 'error',
      message: error.message
    });
  }
}

/**
 * Handler: New request from n8n
 */
async function handleNewRequest(req, res) {
  try {
    console.log('\n🆕 NEW REQUEST RECEIVED');
    console.log('Timestamp:', new Date().toISOString());
    console.log('Source:', req.headers['user-agent'] || 'unknown');

    const data = await parseBody(req);

    // Validate required fields
    if (!data.email || !data.companyName) {
      console.error('❌ Missing required fields');
      return sendJSON(res, 400, {
        success: false,
        error: 'Missing required fields: email, companyName'
      });
    }

    // Generate order ID if not provided
    if (!data.orderId) {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const randomId = Math.random().toString(36).substr(2, 6).toUpperCase();
      data.orderId = `AI-${timestamp.slice(0, 10)}-${randomId}`;
    }

    // Add metadata
    data.timestamp = data.timestamp || new Date().toISOString();
    data.status = 'pending';
    data.productType = data.productType || 'ai-greining-free';

    // Save to pending directory
    const filename = `${data.orderId}.json`;
    const filepath = path.join(PENDING_DIR, filename);

    fs.writeFileSync(filepath, JSON.stringify(data, null, 2), 'utf8');

    console.log('✅ Request saved');
    console.log('   Order ID:', data.orderId);
    console.log('   Company:', data.companyName);
    console.log('   Email:', data.email);
    console.log('   File:', filename);
    console.log('   Path:', filepath);

    // Respond to n8n
    sendJSON(res, 200, {
      success: true,
      message: 'Request received and queued for processing',
      orderId: data.orderId,
      filename: filename,
      status: 'pending'
    });

    // Log to console
    console.log('\n━━━ REQUEST QUEUED ━━━');
    console.log(`Order ${data.orderId} is now in pending queue.`);
    console.log(`COO-Agent will process it automatically if running in watch mode.`);
    console.log(`Or run: ./coo check`);
    console.log('━━━━━━━━━━━━━━━━━━━━━\n');

  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
    console.error(error.stack);

    sendJSON(res, 500, {
      success: false,
      error: error.message
    });
  }
}

/**
 * Handler: Test endpoint
 */
async function handleTest(req, res) {
  console.log('\n🧪 TEST REQUEST');

  const testData = {
    orderId: `TEST-${Date.now()}`,
    timestamp: new Date().toISOString(),
    status: 'pending',
    productType: 'ai-greining-free',
    email: 'test@example.is',
    companyName: 'Test Company',
    industry: 'Technology',
    employees: '11-20',
    currentChallenges: 'Manual processes, Slow operations',
    goals: 'Automate 50% of tasks',
    currentTools: 'Excel, Email',
    timeline: 'asap'
  };

  const filename = `${testData.orderId}.json`;
  const filepath = path.join(PENDING_DIR, filename);

  fs.writeFileSync(filepath, JSON.stringify(testData, null, 2), 'utf8');

  console.log('✅ Test request created:', filename);

  sendJSON(res, 200, {
    success: true,
    message: 'Test request created',
    data: testData,
    next: 'Run: ./coo check'
  });
}

/**
 * Main HTTP server
 */
const server = http.createServer(async (req, res) => {
  const url = req.url;
  const method = req.method;

  // CORS preflight
  if (method === 'OPTIONS') {
    res.writeHead(200, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
    return res.end();
  }

  // Route handling
  try {
    if (url === '/' && method === 'GET') {
      return handleHealth(req, res);
    }

    if (url === '/coo-agent/status' && method === 'GET') {
      return handleStatus(req, res);
    }

    if (url === '/coo-agent/new-request' && method === 'POST') {
      return await handleNewRequest(req, res);
    }

    if (url === '/coo-agent/test' && method === 'POST') {
      return await handleTest(req, res);
    }

    // 404 Not Found
    sendJSON(res, 404, {
      error: 'Not found',
      availableEndpoints: [
        'GET /',
        'GET /coo-agent/status',
        'POST /coo-agent/new-request',
        'POST /coo-agent/test'
      ]
    });

  } catch (error) {
    console.error('Server error:', error);
    sendJSON(res, 500, {
      success: false,
      error: 'Internal server error',
      message: error.message
    });
  }
});

// Start server
server.listen(PORT, () => {
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🚀 COO-Agent Webhook Receiver');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`\n✅ Server running on: http://localhost:${PORT}`);
  console.log(`\n📋 Endpoints:`);
  console.log(`   Health:       GET  http://localhost:${PORT}/`);
  console.log(`   New Request:  POST http://localhost:${PORT}/coo-agent/new-request`);
  console.log(`   Status:       GET  http://localhost:${PORT}/coo-agent/status`);
  console.log(`   Test:         POST http://localhost:${PORT}/coo-agent/test`);
  console.log(`\n💾 Saving requests to: ${PENDING_DIR}`);
  console.log(`\n🔗 For production (ngrok):`);
  console.log(`   1. Run: ngrok http ${PORT}`);
  console.log(`   2. Copy ngrok URL (e.g., https://abc123.ngrok.io)`);
  console.log(`   3. Update n8n webhook to: https://abc123.ngrok.io/coo-agent/new-request`);
  console.log(`\n⚙️  Ready to receive requests!\n`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n\n👋 Shutting down webhook receiver...');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});

process.on('SIGTERM', () => {
  console.log('\n\n👋 Shutting down webhook receiver...');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});
