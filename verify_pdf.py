import os

pdf_path = r"c:\Users\Asus\Downloads\portfolio\public\Charu_Sonker_Full_Stack_Developer_Resume.pdf"

# Simple PDF parser to count pages and find links without external dependencies
with open(pdf_path, 'rb') as f:
    content = f.read()

# Count pages
page_count = content.count(b"/Type /Page") - content.count(b"/Type /Pages")
print(f"Page Count in PDF: {page_count}")

# Check for URLs / Links in PDF
links = []
import re
uris = re.findall(rb'/URI \((.*?)\)', content)
print(f"Found {len(uris)} URI links in PDF:")
for uri in uris:
    print(" -", uri.decode('utf-8', errors='ignore'))

# Check if text is present
has_name = b"Charu" in content or b"CHARU" in content
print(f"Has Candidate Name in streams/text: {has_name}")
