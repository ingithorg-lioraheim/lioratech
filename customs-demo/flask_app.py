"""
LioraTech AI-Powered Customs Clearance Demo - Flask Version
Simple web interface fyrir Icetransport / FedEx Demo
"""
from flask import Flask, render_template_string, request, jsonify
import os
import json
from werkzeug.utils import secure_filename
from ai_extractor import extract_customs_info, generate_customs_declaration
from ocr_processor import extract_text_from_pdf, extract_text_from_image

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max
app.config['ALLOWED_EXTENSIONS'] = {'pdf', 'png', 'jpg', 'jpeg', 'txt'}

# Create uploads folder if it doesn't exist
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in app.config['ALLOWED_EXTENSIONS']

HTML_TEMPLATE = """
<!DOCTYPE html>
<html lang="is">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LioraTech - AI Tollafgreiðsla Demo</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
        }

        .header {
            background: white;
            border-radius: 10px;
            padding: 30px;
            margin-bottom: 30px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            text-align: center;
        }

        .header h1 {
            color: #667eea;
            font-size: 2.5em;
            margin-bottom: 10px;
        }

        .header p {
            color: #666;
            font-size: 1.2em;
        }

        .upload-section {
            background: white;
            border-radius: 10px;
            padding: 40px;
            margin-bottom: 30px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }

        .upload-area {
            border: 3px dashed #667eea;
            border-radius: 10px;
            padding: 50px;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s;
            background: #f8f9fa;
        }

        .upload-area:hover {
            border-color: #764ba2;
            background: #f0f0f5;
        }

        .upload-area.dragover {
            border-color: #28a745;
            background: #e8f5e9;
        }

        .upload-icon {
            font-size: 4em;
            margin-bottom: 20px;
        }

        .file-input {
            display: none;
        }

        .btn {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            padding: 15px 40px;
            font-size: 1.1em;
            border-radius: 5px;
            cursor: pointer;
            margin-top: 20px;
            transition: transform 0.2s;
        }

        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }

        .btn:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }

        .results {
            background: white;
            border-radius: 10px;
            padding: 30px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            display: none;
        }

        .results.show {
            display: block;
        }

        .loading {
            text-align: center;
            padding: 40px;
            display: none;
        }

        .loading.show {
            display: block;
        }

        .spinner {
            border: 4px solid #f3f3f3;
            border-top: 4px solid #667eea;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            animation: spin 1s linear infinite;
            margin: 0 auto 20px;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        .info-card {
            background: #f8f9fa;
            border-left: 4px solid #667eea;
            padding: 20px;
            margin: 15px 0;
            border-radius: 5px;
        }

        .info-card h3 {
            color: #667eea;
            margin-bottom: 10px;
        }

        .info-row {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid #e0e0e0;
        }

        .info-row:last-child {
            border-bottom: none;
        }

        .info-label {
            font-weight: 600;
            color: #555;
        }

        .info-value {
            color: #333;
        }

        .declaration-box {
            background: #f8f9fa;
            border: 1px solid #ddd;
            border-radius: 5px;
            padding: 20px;
            margin-top: 20px;
            font-family: 'Courier New', monospace;
            white-space: pre-wrap;
            font-size: 0.9em;
            max-height: 500px;
            overflow-y: auto;
        }

        .error {
            background: #f8d7da;
            border-left: 4px solid #dc3545;
            color: #721c24;
            padding: 20px;
            border-radius: 5px;
            margin: 20px 0;
        }

        .success {
            background: #d4edda;
            border-left: 4px solid #28a745;
            color: #155724;
            padding: 20px;
            border-radius: 5px;
            margin: 20px 0;
        }

        .download-btn {
            background: #28a745;
            color: white;
            border: none;
            padding: 10px 30px;
            border-radius: 5px;
            cursor: pointer;
            margin-top: 15px;
            font-size: 1em;
        }

        .download-btn:hover {
            background: #218838;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🤖 LioraTech AI Tollafgreiðsla</h1>
            <p>Demo fyrir Icetransport / FedEx - Sjálfvirk skjalavinnsla</p>
        </div>

        <div class="upload-section">
            <h2 style="margin-bottom: 20px; color: #333;">📄 Hlaða upp skjali</h2>

            <div class="upload-area" id="uploadArea">
                <div class="upload-icon">📁</div>
                <h3>Smelltu hér eða dragðu skjal hingað</h3>
                <p style="color: #666; margin-top: 10px;">Stuðningur fyrir PDF, PNG, JPG og TXT skjöl</p>
                <input type="file" id="fileInput" class="file-input" accept=".pdf,.png,.jpg,.jpeg,.txt">
            </div>

            <div style="text-align: center;">
                <button class="btn" id="processBtn" disabled>🚀 Vinna úr skjali</button>
            </div>

            <div id="fileInfo" style="margin-top: 20px; text-align: center; color: #666;"></div>
        </div>

        <div class="loading" id="loading">
            <div class="spinner"></div>
            <h3>⏳ AI er að vinna úr skjalinu...</h3>
            <p style="color: #666; margin-top: 10px;">Þetta getur tekið 10-30 sekúndur</p>
        </div>

        <div class="results" id="results">
            <h2 style="margin-bottom: 20px; color: #333;">✅ Niðurstöður</h2>
            <div id="resultsContent"></div>
        </div>
    </div>

    <script>
        const uploadArea = document.getElementById('uploadArea');
        const fileInput = document.getElementById('fileInput');
        const processBtn = document.getElementById('processBtn');
        const fileInfo = document.getElementById('fileInfo');
        const loading = document.getElementById('loading');
        const results = document.getElementById('results');
        const resultsContent = document.getElementById('resultsContent');

        let selectedFile = null;

        // Click to upload
        uploadArea.addEventListener('click', () => fileInput.click());

        // File selection
        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) handleFile(file);
        });

        // Drag and drop
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('dragover');
        });

        uploadArea.addEventListener('dragleave', () => {
            uploadArea.classList.remove('dragover');
        });

        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('dragover');
            const file = e.dataTransfer.files[0];
            if (file) handleFile(file);
        });

        function handleFile(file) {
            selectedFile = file;
            fileInfo.innerHTML = `✓ Valið skjal: <strong>${file.name}</strong> (${(file.size / 1024).toFixed(2)} KB)`;
            processBtn.disabled = false;
        }

        // Process button
        processBtn.addEventListener('click', async () => {
            if (!selectedFile) return;

            const formData = new FormData();
            formData.append('file', selectedFile);

            // Hide results, show loading
            results.classList.remove('show');
            loading.classList.add('show');
            processBtn.disabled = true;

            try {
                const response = await fetch('/process', {
                    method: 'POST',
                    body: formData
                });

                const data = await response.json();

                loading.classList.remove('show');

                if (data.success) {
                    displayResults(data);
                    results.classList.add('show');
                } else {
                    resultsContent.innerHTML = `<div class="error">❌ Villa: ${data.error}</div>`;
                    results.classList.add('show');
                }

                processBtn.disabled = false;

            } catch (error) {
                loading.classList.remove('show');
                resultsContent.innerHTML = `<div class="error">❌ Villa við að vinna úr skjali: ${error.message}</div>`;
                results.classList.add('show');
                processBtn.disabled = false;
            }
        });

        function displayResults(data) {
            const customs = data.customs_data;

            let html = '<div class="success">✅ Tókst að draga út upplýsingar úr skjali!</div>';

            // Shipper
            html += `
                <div class="info-card">
                    <h3>📦 Sendandi / Shipper</h3>
                    <div class="info-row">
                        <span class="info-label">Nafn:</span>
                        <span class="info-value">${customs.shipper?.name || 'N/A'}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Land:</span>
                        <span class="info-value">${customs.shipper?.country || 'N/A'}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Heimilisfang:</span>
                        <span class="info-value">${customs.shipper?.address || 'N/A'}</span>
                    </div>
                </div>
            `;

            // Consignee
            html += `
                <div class="info-card">
                    <h3>📥 Viðtakandi / Consignee</h3>
                    <div class="info-row">
                        <span class="info-label">Nafn:</span>
                        <span class="info-value">${customs.consignee?.name || 'N/A'}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Land:</span>
                        <span class="info-value">${customs.consignee?.country || 'N/A'}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Heimilisfang:</span>
                        <span class="info-value">${customs.consignee?.address || 'N/A'}</span>
                    </div>
                </div>
            `;

            // Shipment Info
            html += `
                <div class="info-card">
                    <h3>💰 Sendingarupplýsingar</h3>
                    <div class="info-row">
                        <span class="info-label">Reikningsnr:</span>
                        <span class="info-value">${customs.shipment_info?.invoice_number || 'N/A'}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Heildarverð:</span>
                        <span class="info-value">${customs.shipment_info?.currency || ''} ${customs.shipment_info?.total_value || 'N/A'}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Þyngd:</span>
                        <span class="info-value">${customs.shipment_info?.weight || 'N/A'}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Incoterms:</span>
                        <span class="info-value">${customs.shipment_info?.incoterms || 'N/A'}</span>
                    </div>
                </div>
            `;

            // Items
            if (customs.items && customs.items.length > 0) {
                html += '<div class="info-card"><h3>📋 Vörur</h3>';
                customs.items.forEach((item, index) => {
                    html += `
                        <div style="background: white; padding: 15px; margin: 10px 0; border-radius: 5px;">
                            <strong>Vara ${index + 1}:</strong> ${item.description || 'N/A'}<br>
                            <div style="margin-top: 8px; color: #666;">
                                HS-kóði: <strong>${item.hs_code || 'N/A'}</strong> |
                                Magn: <strong>${item.quantity || 'N/A'}</strong> |
                                Verð: <strong>${item.currency || ''} ${item.unit_price || 'N/A'}</strong>
                            </div>
                        </div>
                    `;
                });
                html += '</div>';
            }

            // Declaration
            if (data.declaration) {
                html += `
                    <div class="info-card">
                        <h3>📝 Tollafgreiðsluskjal</h3>
                        <div class="declaration-box">${data.declaration}</div>
                        <button class="download-btn" onclick="downloadDeclaration()">💾 Hlaða niður skjali</button>
                    </div>
                `;

                // Store declaration in global variable for download
                window.declarationText = data.declaration;
            }

            resultsContent.innerHTML = html;
        }

        function downloadDeclaration() {
            const blob = new Blob([window.declarationText], { type: 'text/plain' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'tollafgreiðsla_' + new Date().getTime() + '.txt';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }
    </script>
</body>
</html>
"""

@app.route('/')
def index():
    return render_template_string(HTML_TEMPLATE)

@app.route('/process', methods=['POST'])
def process_document():
    try:
        # Check if file was uploaded
        if 'file' not in request.files:
            return jsonify({'success': False, 'error': 'Ekkert skjal fannst'})

        file = request.files['file']

        if file.filename == '':
            return jsonify({'success': False, 'error': 'Ekkert skjal valið'})

        if not allowed_file(file.filename):
            return jsonify({'success': False, 'error': 'Ógild skráartegund'})

        # Save file
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)

        # Extract text based on file type
        file_ext = filename.rsplit('.', 1)[1].lower()

        if file_ext == 'txt':
            with open(filepath, 'r', encoding='utf-8') as f:
                text = f.read()
        elif file_ext == 'pdf':
            text = extract_text_from_pdf(filepath)
        else:  # image
            text = extract_text_from_image(filepath)

        if not text or len(text.strip()) < 50:
            return jsonify({'success': False, 'error': 'Gat ekki lesið texta úr skjali'})

        # Extract customs information using AI
        customs_data = extract_customs_info(text)

        if not customs_data:
            return jsonify({'success': False, 'error': 'Gat ekki dregið út upplýsingar úr skjali'})

        # Generate customs declaration
        declaration = generate_customs_declaration(customs_data)

        # Clean up uploaded file
        os.remove(filepath)

        return jsonify({
            'success': True,
            'customs_data': customs_data,
            'declaration': declaration
        })

    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})

if __name__ == '__main__':
    print("🚀 Starting LioraTech Customs Demo...")
    print("📡 Opening browser at http://localhost:5000")
    print("Press Ctrl+C to stop")
    app.run(debug=True, port=5000)
