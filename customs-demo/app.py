"""
LioraTech AI-Powered Customs Clearance Demo
Icetransport / FedEx - Tollafgreiðsla Demo
"""
import streamlit as st
import json
from ocr_processor import (
    extract_text_from_pdf,
    extract_text_from_image,
    detect_document_type,
    get_confidence_score
)
from ai_extractor import (
    extract_customs_info,
    validate_and_suggest,
    generate_customs_declaration
)

# Page config
st.set_page_config(
    page_title="LioraTech - AI Tollafgreiðsla Demo",
    page_icon="📦",
    layout="wide"
)

# Custom CSS
st.markdown("""
<style>
    .main-header {
        font-size: 2.5rem;
        color: #1f77b4;
        text-align: center;
        padding: 1rem 0;
    }
    .sub-header {
        font-size: 1.2rem;
        color: #666;
        text-align: center;
        padding-bottom: 2rem;
    }
    .metric-card {
        background-color: #f0f2f6;
        padding: 1rem;
        border-radius: 0.5rem;
        margin: 0.5rem 0;
    }
    .success-box {
        background-color: #d4edda;
        border-left: 5px solid #28a745;
        padding: 1rem;
        margin: 1rem 0;
    }
    .warning-box {
        background-color: #fff3cd;
        border-left: 5px solid #ffc107;
        padding: 1rem;
        margin: 1rem 0;
    }
    .error-box {
        background-color: #f8d7da;
        border-left: 5px solid #dc3545;
        padding: 1rem;
        margin: 1rem 0;
    }
</style>
""", unsafe_allow_html=True)

# Header
st.markdown('<h1 class="main-header">🤖 AI-knúin Tollafgreiðsla</h1>', unsafe_allow_html=True)
st.markdown('<p class="sub-header">Demo fyrir Icetransport / FedEx - Powered by LioraTech</p>', unsafe_allow_html=True)

# Sidebar
with st.sidebar:
    st.image("https://via.placeholder.com/200x80/1f77b4/ffffff?text=LioraTech", use_container_width=True)
    st.markdown("---")
    st.markdown("### 📋 Um þessa Demo")
    st.markdown("""
    Þessi demo sýnir hvernig AI getur:

    1. **Lesið skjöl** - OCR les PDF og myndir
    2. **Dregið út gögn** - GPT-4 finnur allar upplýsingar
    3. **Fyllt út form** - Sjálfvirk tollafgreiðsla
    4. **Validation** - Finnur villur og vantar upplýsingar

    **Styður:**
    - 🇮🇸 Íslensku
    - 🇬🇧 Ensku
    - 📄 PDF og myndir
    - 🌍 Mörg skjalaform
    """)

    st.markdown("---")
    st.markdown("### ⚡ Helstu Kostir")
    st.markdown("""
    - ⏱️ **10-12 tímar/viku** sparnaður
    - 💰 **400-500k/mán** kostnaðarsparnaður
    - ✅ **90%** fækkun á villum
    - 🚀 **Hraðari** tollafgreiðsla
    """)

    st.markdown("---")
    st.markdown("### 📞 Tengiliður")
    st.markdown("""
    **Ingi Þór Gunnarsson**
    LioraTech ehf.
    📧 ingi@lioratech.is
    🌐 lioratech.is
    """)

# Main content
st.markdown("## 📤 1. Hlaða upp skjali")
st.markdown("Hlaða upp tollskjali (PDF eða mynd) til að prófa kerfið")

uploaded_file = st.file_uploader(
    "Veldu skjal",
    type=['pdf', 'png', 'jpg', 'jpeg'],
    help="Stuðningur við PDF, PNG, JPG"
)

if uploaded_file is not None:
    # Display file info
    col1, col2, col3 = st.columns(3)
    with col1:
        st.metric("Skráarnafn", uploaded_file.name)
    with col2:
        file_size_mb = uploaded_file.size / (1024 * 1024)
        st.metric("Stærð", f"{file_size_mb:.2f} MB")
    with col3:
        st.metric("Tegund", uploaded_file.type)

    st.markdown("---")

    # Process button
    if st.button("🚀 Vinna úr skjali", type="primary", use_container_width=True):

        with st.spinner("⏳ Vinnsla í gangi... Þetta getur tekið 10-30 sekúndur"):

            # Step 1: OCR
            st.markdown("## 📖 2. OCR - Lestur skjals")
            progress_bar = st.progress(0)
            status_text = st.empty()

            status_text.text("🔍 Les skjal með OCR...")
            progress_bar.progress(20)

            # Determine file type and extract text
            if uploaded_file.type == 'application/pdf':
                extracted_text = extract_text_from_pdf(uploaded_file)
            else:
                extracted_text = extract_text_from_image(uploaded_file)

            # Detect document type
            doc_type = detect_document_type(extracted_text)
            confidence = get_confidence_score(extracted_text)

            progress_bar.progress(40)
            status_text.text("✅ OCR lokið!")

            # Display OCR results
            col1, col2 = st.columns(2)
            with col1:
                st.metric("Skjalategund", doc_type)
            with col2:
                st.metric("OCR áreiðanleiki", f"{confidence*100:.0f}%")

            with st.expander("📄 Sjá ólúllaðan texta úr OCR"):
                st.text_area("Extracted Text", extracted_text, height=300)

            st.markdown("---")

            # Step 2: AI Extraction
            st.markdown("## 🤖 3. AI - Upplýsingavinnsla")
            status_text.text("🧠 GPT-4 dregur út upplýsingar...")
            progress_bar.progress(60)

            extracted_data = extract_customs_info(extracted_text)

            progress_bar.progress(80)
            status_text.text("✅ Upplýsingar dregnar út!")

            if 'error' in extracted_data:
                st.error(f"❌ Villa kom upp: {extracted_data['error']}")
            else:
                # Display extracted data
                st.success("✅ Tókst að draga út upplýsingar úr skjalinu!")

                # Tabs for different sections
                tab1, tab2, tab3, tab4 = st.tabs(["📦 Sendandi & Viðtakandi", "🚚 Sendingarupplýsingar", "📋 Vörulisti", "✈️ Flutningur"])

                with tab1:
                    col1, col2 = st.columns(2)
                    with col1:
                        st.markdown("### 📤 Sendandi (Shipper)")
                        shipper = extracted_data.get('shipper', {})
                        st.write(f"**Nafn:** {shipper.get('name', 'N/A')}")
                        st.write(f"**Heimilisfang:** {shipper.get('address', 'N/A')}")
                        st.write(f"**Land:** {shipper.get('country', 'N/A')}")
                        st.write(f"**Tengiliður:** {shipper.get('contact', 'N/A')}")

                    with col2:
                        st.markdown("### 📥 Viðtakandi (Consignee)")
                        consignee = extracted_data.get('consignee', {})
                        st.write(f"**Nafn:** {consignee.get('name', 'N/A')}")
                        st.write(f"**Heimilisfang:** {consignee.get('address', 'N/A')}")
                        st.write(f"**Land:** {consignee.get('country', 'N/A')}")
                        st.write(f"**Tengiliður:** {consignee.get('contact', 'N/A')}")

                with tab2:
                    st.markdown("### 📦 Sendingarupplýsingar")
                    shipment = extracted_data.get('shipment', {})

                    col1, col2, col3 = st.columns(3)
                    with col1:
                        st.metric("Reikningsnr.", shipment.get('invoice_number', 'N/A'))
                        st.metric("Incoterms", shipment.get('incoterms', 'N/A'))
                    with col2:
                        st.metric("Dagsetning", shipment.get('invoice_date', 'N/A'))
                        st.metric("Gjaldmiðill", shipment.get('currency', 'N/A'))
                    with col3:
                        st.metric("Heildarverð", shipment.get('total_value', 'N/A'))
                        st.metric("Þyngd", shipment.get('weight', 'N/A'))

                with tab3:
                    st.markdown("### 📋 Vörulisti")
                    items = extracted_data.get('items', [])
                    if items:
                        for i, item in enumerate(items, 1):
                            with st.expander(f"Vara #{i}: {item.get('description', 'N/A')[:50]}..."):
                                col1, col2 = st.columns(2)
                                with col1:
                                    st.write(f"**Lýsing:** {item.get('description', 'N/A')}")
                                    st.write(f"**HS-kóði:** {item.get('hs_code', 'N/A')}")
                                    st.write(f"**Uppruni:** {item.get('origin', 'N/A')}")
                                with col2:
                                    st.write(f"**Magn:** {item.get('quantity', 'N/A')}")
                                    st.write(f"**Einingarverð:** {item.get('unit_price', 'N/A')}")
                                    st.write(f"**Heildarverð:** {item.get('total_price', 'N/A')}")
                    else:
                        st.info("Engar vörur fundnar í skjalinu")

                with tab4:
                    st.markdown("### ✈️ Flutningsupplýsingar")
                    transport = extracted_data.get('transport', {})
                    col1, col2, col3 = st.columns(3)
                    with col1:
                        st.metric("Flutningsaðferð", transport.get('mode', 'N/A'))
                    with col2:
                        st.metric("Flytjandi", transport.get('carrier', 'N/A'))
                    with col3:
                        st.metric("Tracking Nr.", transport.get('tracking', 'N/A'))

                st.markdown("---")

                # Step 3: Validation
                st.markdown("## ✅ 4. Validation & Tillögur")
                status_text.text("🔍 Athuga hvort allt sé rétt...")
                progress_bar.progress(90)

                validation = validate_and_suggest(extracted_data)

                progress_bar.progress(100)
                status_text.text("✅ Vinnslu lokið!")

                if validation.get('is_complete'):
                    st.success("✅ Allar nauðsynlegar upplýsingar eru til staðar!")
                else:
                    st.warning("⚠️ Sumar upplýsingar vantar")

                if validation.get('missing_fields'):
                    st.markdown("### ❌ Vantar:")
                    for field in validation['missing_fields']:
                        st.write(f"- {field}")

                if validation.get('warnings'):
                    st.markdown("### ⚠️ Viðvaranir:")
                    for warning in validation['warnings']:
                        st.warning(warning)

                if validation.get('suggestions'):
                    st.markdown("### 💡 Tillögur:")
                    for suggestion in validation['suggestions']:
                        st.info(suggestion)

                st.markdown("---")

                # Step 4: Generate declaration
                st.markdown("## 📝 5. Tollafgreiðsluskjal")
                st.markdown("Kerfið hefur sjálfkrafa fyllt út tollafgreiðsluskjalið:")

                declaration = generate_customs_declaration(extracted_data)
                st.code(declaration, language=None)

                # Download button
                st.download_button(
                    label="📥 Sækja tollafgreiðsluskjal",
                    data=declaration,
                    file_name="tollafgreidsluskjal.txt",
                    mime="text/plain",
                    use_container_width=True
                )

                # JSON export
                with st.expander("🔧 Sækja sem JSON (fyrir integration)"):
                    json_data = json.dumps(extracted_data, indent=2, ensure_ascii=False)
                    st.download_button(
                        label="📥 Sækja JSON",
                        data=json_data,
                        file_name="customs_data.json",
                        mime="application/json",
                        use_container_width=True
                    )

else:
    # Instructions when no file is uploaded
    st.info("👆 Hlaða upp skjali til að byrja")

    st.markdown("### 📚 Dæmi um studda skjalaform:")
    col1, col2 = st.columns(2)

    with col1:
        st.markdown("""
        - ✅ Commercial Invoice
        - ✅ Packing List
        - ✅ Bill of Lading
        """)

    with col2:
        st.markdown("""
        - ✅ Certificate of Origin
        - ✅ Customs Declaration
        - ✅ Air Waybill (AWB)
        """)

    st.markdown("---")
    st.markdown("### 🎯 Hvernig virkar þetta?")

    col1, col2, col3 = st.columns(3)

    with col1:
        st.markdown("""
        **1️⃣ OCR Lestur**
        - Optical Character Recognition
        - Les PDF og myndir
        - 95-98% nákvæmni
        - Stuðningur við íslensku og ensku
        """)

    with col2:
        st.markdown("""
        **2️⃣ AI Greining**
        - GPT-4 dregur út upplýsingar
        - Skilur context og merkingu
        - Lærir af fyrri skjölum
        - Multi-language support
        """)

    with col3:
        st.markdown("""
        **3️⃣ Sjálfvirk útfylling**
        - Fyllir út tollform sjálfkrafa
        - Validation og villutékk
        - Tillögur um úrbætur
        - Export í mörg format
        """)

# Footer
st.markdown("---")
st.markdown("""
<div style='text-align: center; color: #666; padding: 2rem 0;'>
    <p>Demo búið til af <strong>LioraTech ehf.</strong> fyrir <strong>Icetransport / FedEx</strong></p>
    <p>📧 ingi@lioratech.is | 🌐 lioratech.is</p>
    <p style='font-size: 0.8rem; margin-top: 1rem;'>
        Þetta er proof-of-concept demo. Raunveruleg lausn myndi innihalda:<br>
        Integration við núverandi kerfi, mannleg yfirferð, áhættustýringu, og fullkomið compliance.
    </p>
</div>
""", unsafe_allow_html=True)
