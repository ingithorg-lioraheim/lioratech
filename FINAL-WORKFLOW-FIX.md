# ENDANLEG LAUSN - 30 Day Workflow Fix

## Vandamálið
Google Drive Upload node er að encode JSON sem binary blob óháð því hvað við gerum.

## Lausnin
Nota HTTP Request beint til Google Drive API með multipart upload.

## Skref:

### 1. EYÐA "Convert to Binary" node

### 2. Breyta "Generate OrderID1" til að búa til JSON string beint:

```javascript
const formData = $input.item.json;

// Generate unique order ID
const timestamp = new Date().toISOString();
const orderId = `AI-${timestamp.slice(0,10)}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;

// Extract key fields
const companyName = formData.companyName || 'Unknown Company';
const email = formData.email || 'no-email@example.com';
const name = formData.name || 'Unknown';

// Create the complete JSON object
const questionnaireData = {
  orderId: orderId,
  timestamp: timestamp,
  companyName: companyName,
  email: email,
  name: name,
  formData: formData
};

// Convert to JSON string
const jsonContent = JSON.stringify(questionnaireData, null, 2);

return {
  json: {
    orderId: orderId,
    companyName: companyName,
    fileName: `${orderId}-questionnaire.json`,
    jsonContent: jsonContent,
    folderId: '1vRP5yGFdvUZnY2DjSgIivSLywoJS2n-6' // pending-payment folder
  }
};
```

### 3. SKIPTA ÚT "Save to pending-payment1" fyrir HTTP Request node:

**Node type:** HTTP Request

**Parameters:**
- **Method:** POST
- **URL:** `https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart`
- **Authentication:** Predefined Credential Type → Google Drive OAuth2 API
- **Send Body:** Yes
- **Body Content Type:** Multipart-Form Data
- **Specify Body:** Using Fields
- **Body Parameters:**
  - Field 1:
    - **Name:** `metadata`
    - **Value:**
    ```json
    {
      "name": "={{ $json.fileName }}",
      "parents": ["={{ $json.folderId }}"],
      "mimeType": "text/plain"
    }
    ```
  - Field 2:
    - **Name:** `file`
    - **Value:** `={{ $json.jsonContent }}`

**Headers:**
Add header:
- **Name:** `Content-Type`
- **Value:** `multipart/related`

---

## Hvers vegna virkar þetta?

1. Við búum til JSON string beint (ekki binary)
2. Við notum Google Drive API multipart upload
3. Við setjum explicit `mimeType: "text/plain"`
4. Google Drive vistar þetta sem TEXT FILE

**MIKILVÆGT:** n8n Google Drive Upload node gerir ALLTAF binary encoding, þess vegna verðum við að nota HTTP Request beint til API.

---

## Alternative - Einfaldari lausn ef HTTP virkar ekki:

Nota Google Sheets í stað JSON files!

Einfaldara, engin encoding issues, auðveldara að lesa.

---

## IMPLEMENTATION STATUS

✅ Root cause identified: n8n Google Drive Upload node always encodes as binary
✅ Solution documented: Use HTTP Request to Google Drive API
⏳ Next step: Implement HTTP Request node in n8n workflow
