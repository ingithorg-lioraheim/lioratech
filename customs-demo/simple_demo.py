"""
Simple command-line demo for AI Customs Clearance
Works without Streamlit - for quick testing
"""
import os
import json
from dotenv import load_dotenv
from ocr_processor import extract_text_from_pdf
from ai_extractor import extract_customs_info, generate_customs_declaration

# Load environment variables
load_dotenv()

print("╔════════════════════════════════════════════════════════════════╗")
print("║    🤖 LioraTech AI-Powered Customs Clearance Demo            ║")
print("║    Demo fyrir Icetransport / FedEx                             ║")
print("╚════════════════════════════════════════════════════════════════╝")
print()

# Use the sample invoice text we created
sample_text = """
════════════════════════════════════════════════════════════════
                    COMMERCIAL INVOICE
════════════════════════════════════════════════════════════════

Invoice Number: INV-2024-001234
Invoice Date: January 26, 2024
Incoterms: CIF (Cost, Insurance and Freight)
Payment Terms: Net 30 Days

────────────────────────────────────────────────────────────────
SHIPPER / EXPORTER
────────────────────────────────────────────────────────────────
Company Name:       TechGear Solutions Ltd.
Address:            123 Industrial Park, Unit 5B
                    Manchester M15 4FN
Country:            United Kingdom
Contact Person:     John Smith
Phone:              +44 161 234 5678
Email:              john.smith@techgear.co.uk
VAT Number:         GB123456789

────────────────────────────────────────────────────────────────
CONSIGNEE / IMPORTER
────────────────────────────────────────────────────────────────
Company Name:       Icetransport / FedEx ehf.
Address:            Selhella 7
                    221 Hafnarfjörður
Country:            Iceland
Contact Person:     Silfá Guðmundsdóttir
Phone:              +354 412 0120
Email:              silfa@icetransport.is
VAT Number:         IS99999

────────────────────────────────────────────────────────────────
SHIPMENT DETAILS
────────────────────────────────────────────────────────────────
Port of Loading:     Manchester Airport (MAN)
Port of Discharge:   Keflavik Airport (KEF)
Mode of Transport:   Air Freight
Carrier:            FedEx Express
AWB Number:         123-45678900
Flight Number:       FX0987
Departure Date:      January 28, 2024
Estimated Arrival:   January 29, 2024

Total Packages:      3 cartons
Total Weight:        45.5 kg (Gross)
                    42.0 kg (Net)
Dimensions:         120 x 80 x 60 cm (per carton)

────────────────────────────────────────────────────────────────
ITEMS / PRODUCTS
────────────────────────────────────────────────────────────────

Item 1:
Description:        Laptop Computers - Dell XPS 15
HS Code:            8471.30.00
Country of Origin:  China
Quantity:           10 units
Unit Price:         USD 1,250.00
Total Value:        USD 12,500.00

Item 2:
Description:        Wireless Mouse - Logitech MX Master 3
HS Code:            8471.60.70
Country of Origin:  China
Quantity:           50 units
Unit Price:         USD 85.00
Total Value:        USD 4,250.00

Item 3:
Description:        USB-C Charging Cables - 2m length
HS Code:            8544.42.90
Country of Origin:  Vietnam
Quantity:           100 units
Unit Price:         USD 12.50
Total Value:        USD 1,250.00

────────────────────────────────────────────────────────────────
FINANCIAL SUMMARY
────────────────────────────────────────────────────────────────
Subtotal (FOB):             USD 18,000.00
Freight Charges:            USD 850.00
Insurance:                  USD 150.00
────────────────────────────────────────────────────────────────
TOTAL CIF VALUE:            USD 19,000.00
════════════════════════════════════════════════════════════════
"""

print("📄 SKREF 1: Lesa skjal")
print("─" * 70)
print(f"Notar sample commercial invoice...")
print()

print("🤖 SKREF 2: AI dregur út upplýsingar (GPT-4)")
print("─" * 70)
print("⏳ Þetta tekur 10-20 sekúndur...")
print()

try:
    # Extract structured data using AI
    extracted_data = extract_customs_info(sample_text)

    if 'error' in extracted_data:
        print(f"❌ VILLA: {extracted_data['error']}")
    else:
        print("✅ Tókst að draga út upplýsingar!")
        print()

        # Display key information
        print("📦 SENDANDI:")
        print(f"   Nafn: {extracted_data.get('shipper', {}).get('name', 'N/A')}")
        print(f"   Land: {extracted_data.get('shipper', {}).get('country', 'N/A')}")
        print()

        print("📥 VIÐTAKANDI:")
        print(f"   Nafn: {extracted_data.get('consignee', {}).get('name', 'N/A')}")
        print(f"   Land: {extracted_data.get('consignee', {}).get('country', 'N/A')}")
        print()

        print("💰 SENDINGARUPPLÝSINGAR:")
        shipment = extracted_data.get('shipment', {})
        print(f"   Reikningsnr: {shipment.get('invoice_number', 'N/A')}")
        print(f"   Heildarverð: {shipment.get('total_value', 'N/A')}")
        print(f"   Þyngd: {shipment.get('weight', 'N/A')}")
        print()

        print("📋 VÖRUR:")
        items = extracted_data.get('items', [])
        for i, item in enumerate(items, 1):
            print(f"   Vara {i}: {item.get('description', 'N/A')[:50]}...")
            print(f"           HS-kóði: {item.get('hs_code', 'N/A')}")
            print(f"           Verð: {item.get('total_price', 'N/A')}")
        print()

        print("─" * 70)
        print()

        # Generate customs declaration
        print("📝 SKREF 3: Búa til tollafgreiðsluskjal")
        print("─" * 70)
        declaration = generate_customs_declaration(extracted_data)
        print(declaration)
        print()

        # Save to file
        output_file = "customs_declaration_output.txt"
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(declaration)

        print(f"💾 Tollafgreiðsluskjal vistað í: {output_file}")
        print()

        # Also save JSON
        json_file = "customs_data_output.json"
        with open(json_file, 'w', encoding='utf-8') as f:
            json.dump(extracted_data, f, indent=2, ensure_ascii=False)

        print(f"💾 JSON gögn vistuð í: {json_file}")
        print()

        print("╔════════════════════════════════════════════════════════════════╗")
        print("║                    ✅ DEMO TÓKST!                              ║")
        print("╚════════════════════════════════════════════════════════════════╝")
        print()
        print("🎯 HVAÐ GERÐIST:")
        print("   1. AI las commercial invoice")
        print("   2. Dró út öll structured data (sendandi, viðtakandi, vörur)")
        print("   3. Fyllti út tollafgreiðsluskjal sjálfkrafa")
        print("   4. Vistaði í tvennu lagi (text + JSON)")
        print()
        print("⚡ TÍMI: ~10-20 sekúndur (vs. 30-60 mínútur handvirkt)")
        print("💰 SPARNAÐUR: 400-500k kr/mán með þessu kerfi")
        print()
        print("📞 TENGILIÐUR:")
        print("   Ingi Þór Gunnarsson")
        print("   📧 ingi@lioratech.is")
        print("   🌐 lioratech.is")
        print()

except Exception as e:
    print(f"❌ VILLA KOM UPP: {str(e)}")
    print()
    print("Athugaðu:")
    print("1. OPENAI_API_KEY er rétt í .env")
    print("2. Þú ert með credit hjá OpenAI")
    print("3. Internet tenging virkar")
