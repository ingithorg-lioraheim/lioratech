"""
AI-powered extraction of customs document information using GPT-4
"""
import os
import json
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

EXTRACTION_PROMPT = """
Þú ert sérfræðingur í tollafgreiðslu og skjalavinnslu.

Lestu eftirfarandi skjal og dragðu út allar mikilvægar upplýsingar fyrir tollafgreiðslu.

Skjalið:
{document_text}

Dragðu út eftirfarandi upplýsingar í JSON formati:

{{
  "shipper": {{
    "name": "Nafn sendanda",
    "address": "Heimilisfang",
    "country": "Land",
    "contact": "Tengiliður/símanúmer"
  }},
  "consignee": {{
    "name": "Nafn viðtakanda",
    "address": "Heimilisfang",
    "country": "Land",
    "contact": "Tengiliður/símanúmer"
  }},
  "shipment": {{
    "invoice_number": "Reikningsnúmer",
    "invoice_date": "Dagsetning reiknings",
    "incoterms": "Incoterms (t.d. FOB, CIF, DDP)",
    "currency": "Gjaldmiðill",
    "total_value": "Heildarverðmæti",
    "weight": "Þyngd",
    "packages": "Fjöldi pakka"
  }},
  "items": [
    {{
      "description": "Vörulýsing",
      "hs_code": "HS-kóði (ef til staðar)",
      "quantity": "Magn",
      "unit_price": "Einingaverð",
      "total_price": "Heildarverð",
      "origin": "Upprunaland"
    }}
  ],
  "transport": {{
    "mode": "Flutningsaðferð (air/sea/road)",
    "carrier": "Flytjandi",
    "tracking": "Tracking/AWB/BL númer"
  }}
}}

Ef upplýsingar vantar, settu "Ekki fundið" eða null.
Svaraðu AÐEINS með JSON - engan annan texta.
"""

def extract_customs_info(document_text: str) -> dict:
    """
    Extract structured customs information from document text using GPT-4

    Args:
        document_text: Raw text from OCR

    Returns:
        Dictionary with structured customs data
    """
    try:
        response = client.chat.completions.create(
            model="gpt-4-turbo-preview",
            messages=[
                {"role": "system", "content": "Þú ert sérfræðingur í tollafgreiðslu sem dregur út structured data úr skjölum."},
                {"role": "user", "content": EXTRACTION_PROMPT.format(document_text=document_text)}
            ],
            temperature=0.1,
            response_format={"type": "json_object"}
        )

        result = json.loads(response.choices[0].message.content)
        return result

    except Exception as e:
        return {
            "error": f"Villa við að draga út upplýsingar: {str(e)}",
            "raw_text": document_text[:500]  # First 500 chars for debugging
        }


def validate_and_suggest(extracted_data: dict) -> dict:
    """
    Validate extracted data and suggest improvements/corrections

    Args:
        extracted_data: Extracted customs data

    Returns:
        Dictionary with validation results and suggestions
    """
    validation_prompt = f"""
Þú ert tollafgreiðslusérfræðingur. Farðu yfir eftirfarandi upplýsingar og:
1. Athugaðu hvort eitthvað mikilvægt vantar
2. Finndu hugsanlegar villur (t.d. rangt format á HS-kóðum)
3. Gefðu tillögur um hvað þarf að laga

Upplýsingar:
{json.dumps(extracted_data, indent=2, ensure_ascii=False)}

Svaraðu í JSON formati:
{{
  "is_complete": true/false,
  "missing_fields": ["listi af reitum sem vantar"],
  "warnings": ["viðvaranir um mögulegar villur"],
  "suggestions": ["tillögur um úrbætur"]
}}
"""

    try:
        response = client.chat.completions.create(
            model="gpt-4-turbo-preview",
            messages=[
                {"role": "system", "content": "Þú ert tollafgreiðslusérfræðingur."},
                {"role": "user", "content": validation_prompt}
            ],
            temperature=0.1,
            response_format={"type": "json_object"}
        )

        return json.loads(response.choices[0].message.content)

    except Exception as e:
        return {
            "error": f"Villa við validation: {str(e)}"
        }


def generate_customs_declaration(extracted_data: dict) -> str:
    """
    Generate a filled customs declaration form based on extracted data

    Args:
        extracted_data: Extracted customs data

    Returns:
        Formatted customs declaration text
    """
    declaration = f"""
╔════════════════════════════════════════════════════════════════╗
║          TOLLAFGREIÐSLUSKJAL / CUSTOMS DECLARATION            ║
╚════════════════════════════════════════════════════════════════╝

────────────────────────────────────────────────────────────────
SENDANDI / SHIPPER
────────────────────────────────────────────────────────────────
Nafn:           {extracted_data.get('shipper', {}).get('name', 'N/A')}
Heimilisfang:   {extracted_data.get('shipper', {}).get('address', 'N/A')}
Land:           {extracted_data.get('shipper', {}).get('country', 'N/A')}
Tengiliður:     {extracted_data.get('shipper', {}).get('contact', 'N/A')}

────────────────────────────────────────────────────────────────
VIÐTAKANDI / CONSIGNEE
────────────────────────────────────────────────────────────────
Nafn:           {extracted_data.get('consignee', {}).get('name', 'N/A')}
Heimilisfang:   {extracted_data.get('consignee', {}).get('address', 'N/A')}
Land:           {extracted_data.get('consignee', {}).get('country', 'N/A')}
Tengiliður:     {extracted_data.get('consignee', {}).get('contact', 'N/A')}

────────────────────────────────────────────────────────────────
SENDINGARUPPLÝSINGAR / SHIPMENT DETAILS
────────────────────────────────────────────────────────────────
Reikningsnr:    {extracted_data.get('shipment', {}).get('invoice_number', 'N/A')}
Dagsetning:     {extracted_data.get('shipment', {}).get('invoice_date', 'N/A')}
Incoterms:      {extracted_data.get('shipment', {}).get('incoterms', 'N/A')}
Gjaldmiðill:    {extracted_data.get('shipment', {}).get('currency', 'N/A')}
Heildarverð:    {extracted_data.get('shipment', {}).get('total_value', 'N/A')}
Þyngd:          {extracted_data.get('shipment', {}).get('weight', 'N/A')}
Pakkar:         {extracted_data.get('shipment', {}).get('packages', 'N/A')}

────────────────────────────────────────────────────────────────
VÖRULISTI / ITEMS
────────────────────────────────────────────────────────────────
"""

    items = extracted_data.get('items', [])
    for i, item in enumerate(items, 1):
        declaration += f"""
Vara #{i}:
  Lýsing:       {item.get('description', 'N/A')}
  HS-kóði:      {item.get('hs_code', 'N/A')}
  Magn:         {item.get('quantity', 'N/A')}
  Einingarverð: {item.get('unit_price', 'N/A')}
  Heildarverð:  {item.get('total_price', 'N/A')}
  Uppruni:      {item.get('origin', 'N/A')}
"""

    transport = extracted_data.get('transport', {})
    declaration += f"""
────────────────────────────────────────────────────────────────
FLUTNINGUR / TRANSPORT
────────────────────────────────────────────────────────────────
Aðferð:         {transport.get('mode', 'N/A')}
Flytjandi:      {transport.get('carrier', 'N/A')}
Tracking:       {transport.get('tracking', 'N/A')}

────────────────────────────────────────────────────────────────
Búið til með LioraTech AI Customs System
Dagsetning: {json.dumps(extracted_data.get('shipment', {}).get('invoice_date', 'N/A'))}
────────────────────────────────────────────────────────────────
"""

    return declaration
