"""
Quick test to verify OpenAI API key works
"""
import os
from dotenv import load_dotenv
from openai import OpenAI

# Load environment variables
load_dotenv()

print("🔍 Testing OpenAI API connection...")
print()

# Check if API key exists
api_key = os.getenv('OPENAI_API_KEY')
if not api_key or api_key == 'your_openai_api_key_here':
    print("❌ ERROR: OPENAI_API_KEY not set in .env file")
    exit(1)

print(f"✅ API Key found: {api_key[:20]}...")
print()

# Try to make a simple API call
try:
    client = OpenAI(api_key=api_key)

    print("🤖 Testing API call...")
    response = client.chat.completions.create(
        model="gpt-4-turbo-preview",
        messages=[
            {"role": "user", "content": "Say 'API works!' in Icelandic"}
        ],
        max_tokens=50
    )

    result = response.choices[0].message.content
    print(f"✅ API Response: {result}")
    print()
    print("🎉 SUCCESS! API key is working correctly!")
    print()
    print("You can now run the demo with: streamlit run app.py")

except Exception as e:
    print(f"❌ ERROR: {str(e)}")
    print()
    print("Please check:")
    print("1. API key is correct")
    print("2. You have credits in your OpenAI account")
    print("3. Internet connection is working")
