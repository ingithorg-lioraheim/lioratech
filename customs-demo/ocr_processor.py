"""
OCR processing for customs documents
"""
import io
import os
from typing import Optional
import PyPDF2

# Optional imports - graceful fallback if not available
try:
    from PIL import Image
    PIL_AVAILABLE = True
except ImportError:
    PIL_AVAILABLE = False

try:
    import pytesseract
    TESSERACT_AVAILABLE = True
except ImportError:
    TESSERACT_AVAILABLE = False

try:
    from pdf2image import convert_from_bytes, convert_from_path
    PDF2IMAGE_AVAILABLE = True
except ImportError:
    PDF2IMAGE_AVAILABLE = False


def extract_text_from_pdf(pdf_file) -> str:
    """
    Extract text from PDF using multiple methods:
    1. Try direct text extraction (if PDF has text layer)
    2. Fall back to OCR if needed

    Args:
        pdf_file: File object or path to PDF

    Returns:
        Extracted text
    """
    text = ""

    # Method 1: Try direct text extraction first (faster, better quality)
    try:
        if isinstance(pdf_file, str):
            # File path
            with open(pdf_file, 'rb') as f:
                pdf_reader = PyPDF2.PdfReader(f)
                for page in pdf_reader.pages:
                    page_text = page.extract_text()
                    if page_text:
                        text += page_text + "\n"
        else:
            # File object
            pdf_reader = PyPDF2.PdfReader(pdf_file)
            for page in pdf_reader.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text + "\n"

        # If we got substantial text, return it
        if len(text.strip()) > 100:
            return text.strip()

    except Exception as e:
        print(f"Direct extraction failed: {e}, falling back to OCR...")

    # Method 2: Use OCR if direct extraction didn't work
    if PDF2IMAGE_AVAILABLE and TESSERACT_AVAILABLE:
        try:
            if isinstance(pdf_file, str):
                # File path
                images = convert_from_path(pdf_file, dpi=300)
            else:
                # File object - need to read bytes
                pdf_file.seek(0)
                pdf_bytes = pdf_file.read()
                images = convert_from_bytes(pdf_bytes, dpi=300)

            # OCR each page
            for i, image in enumerate(images):
                page_text = pytesseract.image_to_string(
                    image,
                    lang='eng+isl',  # English and Icelandic
                    config='--psm 6'  # Assume uniform block of text
                )
                text += f"\n--- Page {i+1} ---\n{page_text}"

            return text.strip()

        except Exception as e:
            return f"ERROR: Could not extract text from PDF: {str(e)}"
    else:
        # OCR not available, return what we have or error
        if text.strip():
            return text.strip()
        else:
            return "ERROR: PDF has no text layer and OCR is not available. Please use a text-based PDF or install Tesseract OCR."


def extract_text_from_image(image_file) -> str:
    """
    Extract text from image using OCR

    Args:
        image_file: File object or path to image

    Returns:
        Extracted text
    """
    if not PIL_AVAILABLE or not TESSERACT_AVAILABLE:
        return "ERROR: OCR not available. Please install Tesseract and PIL/Pillow to process images."

    try:
        if isinstance(image_file, str):
            # File path
            image = Image.open(image_file)
        else:
            # File object
            image = Image.open(image_file)

        # Perform OCR
        text = pytesseract.image_to_string(
            image,
            lang='eng+isl',  # English and Icelandic
            config='--psm 6'  # Assume uniform block of text
        )

        return text.strip()

    except Exception as e:
        return f"ERROR: Could not extract text from image: {str(e)}"


def preprocess_image(image):
    """
    Preprocess image to improve OCR accuracy

    Args:
        image: PIL Image

    Returns:
        Preprocessed image
    """
    if not PIL_AVAILABLE:
        return image

    # Convert to grayscale
    image = image.convert('L')

    # Increase contrast
    from PIL import ImageEnhance
    enhancer = ImageEnhance.Contrast(image)
    image = enhancer.enhance(2.0)

    # Increase sharpness
    enhancer = ImageEnhance.Sharpness(image)
    image = enhancer.enhance(2.0)

    return image


def detect_document_type(text: str) -> str:
    """
    Detect the type of customs document based on content

    Args:
        text: Extracted text from document

    Returns:
        Document type (invoice, packing_list, etc.)
    """
    text_lower = text.lower()

    if 'commercial invoice' in text_lower or 'invoice number' in text_lower:
        return 'Commercial Invoice'
    elif 'packing list' in text_lower or 'pakkalisti' in text_lower:
        return 'Packing List'
    elif 'bill of lading' in text_lower or 'farmskjal' in text_lower:
        return 'Bill of Lading'
    elif 'certificate of origin' in text_lower or 'upprunaskírteini' in text_lower:
        return 'Certificate of Origin'
    elif 'customs declaration' in text_lower or 'tollyfirlýsing' in text_lower:
        return 'Customs Declaration'
    else:
        return 'Unknown Document Type'


def get_confidence_score(text: str) -> float:
    """
    Estimate OCR confidence based on text quality indicators

    Args:
        text: Extracted text

    Returns:
        Confidence score (0-1)
    """
    if not text or len(text) < 50:
        return 0.0

    # Simple heuristics
    score = 1.0

    # Check for excessive special characters (indicates poor OCR)
    special_char_ratio = sum(1 for c in text if not c.isalnum() and not c.isspace()) / len(text)
    if special_char_ratio > 0.3:
        score -= 0.3

    # Check for reasonable word lengths
    words = text.split()
    if words:
        avg_word_length = sum(len(w) for w in words) / len(words)
        if avg_word_length < 2 or avg_word_length > 15:
            score -= 0.2

    # Check for presence of common words
    common_words = ['the', 'and', 'to', 'from', 'invoice', 'date', 'total']
    found_common = sum(1 for word in common_words if word in text.lower())
    if found_common < 2:
        score -= 0.2

    return max(0.0, min(1.0, score))
